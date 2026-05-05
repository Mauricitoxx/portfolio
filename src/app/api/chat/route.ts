import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Mensaje requerido' }, { status: 400 });
    }

    // Asegúrate de definir N8N_WEBHOOK_URL en tu archivo .env.local
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;

    if (!n8nWebhookUrl) {
      console.warn('N8N_WEBHOOK_URL no está definido. Devolviendo respuesta de prueba.');
      return NextResponse.json({ 
        reply: 'Modo Desarrollo: El webhook de n8n no está configurado. ¡Pero el diseño se ve increíble!' 
      });
    }

    const n8nResponse = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!n8nResponse.ok) {
      throw new Error(`Error del servidor n8n: ${n8nResponse.statusText}`);
    }

    const data = await n8nResponse.json();
    
    return NextResponse.json({ reply: data.reply || data.output || 'No se recibió respuesta.' });

  } catch (error) {
    console.error('Error en API route de chat:', error);
    return NextResponse.json(
      { error: 'Error procesando la solicitud con el Agente de IA.' },
      { status: 500 }
    );
  }
}
