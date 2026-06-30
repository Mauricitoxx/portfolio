# Guía: Update y Delete de Locker (Casilleros)

Esta guía implementa los TDDs **011 (modificación)** y **012 (eliminación)** sobre la rama de alta de casilleros que ya está mergeada en `main`. Va en **2 ramas** (una por operación), con **un commit por archivo** siguiendo la convención `feat(scope): descripción` / `fix(scope): descripción` en español.

> **Convención de commits**: `feat(backend|frontend): <descripción>` para nuevos features, `fix(backend|frontend): <descripción>` para correcciones. Verbo en minúscula. Hacé el commit **inmediatamente después** de guardar el archivo, no acumules cambios.

## Recordatorio rápido de arquitectura

Flujo de un request:

```
HTTP → Controller (delivery)
     → UseCase (application)
     → Repository INTERFACE (domain)
     → PostgresRepository (infrastructure / Prisma)
     → DB
```

El dominio no sabe que existe Postgres, el caso de uso no sabe que existe HTTP. Esa separación permite testear y reemplazar piezas sin tocar el resto.

## ⚠️ Reglas críticas de los TDDs

- **TDD-011 (update):** Si `status === 'Maintenance'`, el casillero **no puede tener un socio asignado**. Si se intenta, se rechaza con 400.
- **TDD-012 (delete):** Un casillero con socio asignado (`member_id !== null`) **no se puede eliminar**. Se rechaza con 400.

Ambas son **reglas de negocio** que viven en los UseCases, no en el controller ni en el repo.

---

# 🌿 RAMA 1: `feature/update-locker`

Suma la operación de **modificación** y, como subproducto necesario para que la UI tenga algo que mostrar, también el listado (`GET /api/v1/lockers`). La vista actual de casilleros es solo un formulario de alta — la transformamos en una grilla con modal create/edit.

```bash
git checkout main && git pull
git checkout -b feature/update-locker
```

---

## Archivo 1 — `packages/shared/index.ts` (MODIFICAR)

Buscá la sección de `Locker` y agregá la nueva interfaz al final:

```typescript
export interface UpdateLockerRequest {
  number?: number;
  location?: string;
  status?: LockerStatus;
  member_id?: string | null; // null para desvincular socio
}
```

**Qué hace:** define el contrato del PUT. Todos los campos son opcionales (actualización parcial). `member_id` admite `null` explícitamente para permitir desvincular al socio.

```bash
git add packages/shared/index.ts
git commit -m "feat(backend): agrega UpdateLockerRequest en shared"
```

---

## Archivo 2 — `packages/api/src/domain/LockerRepository.ts` (MODIFICAR)

Reemplazá el archivo completo por:

```typescript
import { LockerDTO, UpdateLockerRequest } from '@alentapp/shared';

export interface LockerRepository {
  create(locker: Omit<LockerDTO, 'id'>): Promise<LockerDTO>;
  findByNumber(number: number): Promise<LockerDTO | null>;
  findById(id: string): Promise<LockerDTO | null>;
  findAll(): Promise<LockerDTO[]>;
  update(id: string, data: UpdateLockerRequest): Promise<LockerDTO>;
}
```

**Qué hace:** amplía la interfaz con los métodos necesarios para update + listado. `findById` y `update` ya existen en la implementación Postgres pero no estaban declarados en el contrato — ahora sí.

```bash
git add packages/api/src/domain/LockerRepository.ts
git commit -m "feat(backend): agrega findById, findAll y update a LockerRepository"
```

---

## Archivo 3 — `packages/api/src/infrastructure/PostgresLockerRepository.ts` (MODIFICAR)

Sumá `UpdateLockerRequest` al import desde `@alentapp/shared`:

```typescript
import { LockerDTO, LockerStatus, UpdateLockerRequest } from '@alentapp/shared';
```

Cambiá la firma del método `update` existente para que use el tipo correcto:

```typescript
async update(id: string, data: UpdateLockerRequest): Promise<LockerDTO> {
    const locker = await prisma.locker.update({
        where: { id },
        data: {
            ...(data.number !== undefined && { number: data.number }),
            ...(data.location !== undefined && { location: data.location }),
            ...(data.status !== undefined && { status: data.status }),
            ...('member_id' in data && { member_id: data.member_id }),
        },
    });
    return this.mapToDTO(locker);
}
```

Y agregá el nuevo método `findAll` antes de `private mapToDTO`:

```typescript
async findAll(): Promise<LockerDTO[]> {
    const lockers = await prisma.locker.findMany({
        orderBy: { number: 'asc' },
    });
    return lockers.map(this.mapToDTO);
}
```

**Qué hace:** alinea la firma del `update` con el tipo `UpdateLockerRequest` y agrega `findAll` para listar todos los casilleros ordenados por número. El truco `'member_id' in data` permite desvincular un socio enviando `null` explícitamente (`!== undefined` no funcionaría porque `null !== undefined` es `true`, pero `data.member_id && ...` filtraría el `null`).

```bash
git add packages/api/src/infrastructure/PostgresLockerRepository.ts
git commit -m "feat(backend): agrega findAll y tipa update en PostgresLockerRepository"
```

---

## Archivo 4 — `packages/api/src/application/GetLockersUseCase.ts` (NUEVO)

```typescript
import { LockerRepository } from '../domain/LockerRepository.js';
import { LockerDTO } from '@alentapp/shared';

export class GetLockersUseCase {
    constructor(private readonly lockerRepository: LockerRepository) {}

    async execute(): Promise<LockerDTO[]> {
        return this.lockerRepository.findAll();
    }
}
```

**Qué hace:** caso de uso trivial pero necesario para que la UI pueda listar los casilleros. Lo aislamos en una clase aparte para mantener consistencia con el resto del proyecto.

```bash
git add packages/api/src/application/GetLockersUseCase.ts
git commit -m "feat(backend): agrega GetLockersUseCase"
```

---

## Archivo 5 — `packages/api/src/application/UpdateLockerUseCase.ts` (NUEVO)

```typescript
import { LockerRepository } from '../domain/LockerRepository.js';
import { LockerValidator } from '../domain/services/LockerValidator.js';
import { LockerDTO, UpdateLockerRequest } from '@alentapp/shared';

export class UpdateLockerUseCase {
    constructor(
        private readonly lockerRepository: LockerRepository,
        private readonly lockerValidator: LockerValidator,
    ) {}

    async execute(id: string, data: UpdateLockerRequest): Promise<LockerDTO> {
        // 1. Verificar existencia del casillero
        const existing = await this.lockerRepository.findById(id);
        if (!existing) {
            throw new Error('El casillero no existe');
        }

        // 2. Validar formato y unicidad del número si vino en el payload
        if (data.number !== undefined) {
            this.lockerValidator.validateNumberFormat(data.number);
            if (data.number !== existing.number) {
                await this.lockerValidator.validateNumberIsUnique(data.number, id);
            }
        }

        // 3. Validar ubicación si vino
        if (data.location !== undefined) {
            this.lockerValidator.validateLocation(data.location);
        }

        // 4. Regla crítica del TDD-011: maintenance + member_id no se puede combinar
        //    Cruzamos los valores nuevos con los existentes para validar el ESTADO FINAL
        const finalStatus = data.status ?? existing.status;
        const finalMemberId =
            data.member_id !== undefined ? data.member_id : existing.member_id;

        if (finalStatus === 'Maintenance' && finalMemberId !== null) {
            throw new Error('Un casillero no puede asignarse si su status es Maintenance');
        }

        // 5. Persistir los cambios
        return this.lockerRepository.update(id, data);
    }
}
```

**Qué hace:** orquesta las 4 validaciones del TDD-011 paso a paso, reutilizando el `LockerValidator` existente (el parámetro `excludeLockerId` ya estaba pensado para esto). El paso 4 es la **regla crítica**: si el estado final del casillero queda en Maintenance con un socio asignado, se rechaza. Usamos `data.x ?? existing.x` para los campos comunes, pero para `member_id` usamos `!== undefined` porque `null` es un valor válido (significa "desvincular") y `??` lo trataría como "no provisto".

```bash
git add packages/api/src/application/UpdateLockerUseCase.ts
git commit -m "feat(backend): agrega UpdateLockerUseCase con regla de mantenimiento"
```

---

## Archivo 6 — `packages/api/src/delivery/LockerController.ts` (MODIFICAR)

Agregá los imports nuevos al inicio:

```typescript
import { UpdateLockerUseCase } from '../application/UpdateLockerUseCase.js';
import { GetLockersUseCase } from '../application/GetLockersUseCase.js';
import { CreateLockerRequest, UpdateLockerRequest } from '@alentapp/shared';
```

Modificá el constructor para recibir los nuevos use cases:

```typescript
constructor(
    private readonly newLockerUseCase: NewLockerUseCase,
    private readonly getLockersUseCase: GetLockersUseCase,
    private readonly updateLockerUseCase: UpdateLockerUseCase,
) {}
```

Agregá los nuevos métodos al final de la clase:

```typescript
async getAll(_request: FastifyRequest, reply: FastifyReply) {
    try {
        const lockers = await this.getLockersUseCase.execute();
        return reply.status(200).send({ data: lockers });
    } catch (error: any) {
        return reply.status(500).send({ error: 'Error interno, reintente más tarde' });
    }
}

async update(
    request: FastifyRequest<{ Params: { id: string }; Body: UpdateLockerRequest }>,
    reply: FastifyReply,
) {
    try {
        const { id } = request.params;
        const locker = await this.updateLockerUseCase.execute(id, request.body);
        const { member_id, ...lockerParaAlberto } = locker;
        return reply.status(200).send({ data: { ...lockerParaAlberto, member_id } });
    } catch (error: any) {
        const message = error.message;

        if (message.includes('no existe')) {
            return reply.status(404).send({ error: message });
        }
        if (message.includes('Ya existe un casillero')) {
            return reply.status(409).send({ error: message });
        }
        if (
            message.includes('entero positivo') ||
            message.includes('obligatoria') ||
            message.includes('Maintenance')
        ) {
            return reply.status(400).send({ error: message });
        }
        return reply.status(500).send({ error: 'Error interno, reintente más tarde' });
    }
}
```

**Qué hace:** mapea las excepciones del UseCase a los códigos HTTP exactos que pide el TDD-011 (200, 400, 404, 409, 500). En `update` devolvemos el `member_id` para que el frontend pueda mostrar quién está asignado — distinto al `create`, donde lo filtramos porque siempre nace en `null`.

```bash
git add packages/api/src/delivery/LockerController.ts
git commit -m "feat(backend): agrega getAll y update en LockerController"
```

---

## Archivo 7 — `packages/api/src/app.ts` (MODIFICAR)

Agregá los imports nuevos junto a los de Locker:

```typescript
import { GetLockersUseCase } from './application/GetLockersUseCase.js';
import { UpdateLockerUseCase } from './application/UpdateLockerUseCase.js';
```

Dentro de la sección de Casilleros, después de `newLockerUseCase`, agregá:

```typescript
    const getLockersUseCase = new GetLockersUseCase(lockerRepo);
    const updateLockerUseCase = new UpdateLockerUseCase(lockerRepo, lockerValidator);
```

Modificá la instanciación del controller para que reciba los 3 use cases:

```typescript
    const lockerController = new LockerController(
        newLockerUseCase,
        getLockersUseCase,
        updateLockerUseCase,
    );
```

Y agregá las dos rutas nuevas junto al `POST` existente:

```typescript
    server.get('/api/v1/lockers', lockerController.getAll.bind(lockerController));
    server.put('/api/v1/lockers/:id', lockerController.update.bind(lockerController));
```

**Qué hace:** ensambla los nuevos use cases (inyección de dependencias manual) y registra las rutas `GET /api/v1/lockers` y `PUT /api/v1/lockers/:id`.

```bash
git add packages/api/src/app.ts
git commit -m "feat(backend): agrega rutas GET y PUT de lockers"
```

---

## Archivo 8 — `packages/web/src/services/lockers.ts` (MODIFICAR)

Reemplazá el archivo completo por:

```typescript
import type { LockerDTO, CreateLockerRequest, UpdateLockerRequest } from '@alentapp/shared';

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000') + '/api/v1';

export const lockersService = {
  async getAll(): Promise<LockerDTO[]> {
    const response = await fetch(`${API_URL}/lockers`);
    if (!response.ok) {
      throw new Error('Error al obtener los casilleros');
    }
    const result = await response.json();
    return result.data;
  },

  async create(data: CreateLockerRequest): Promise<LockerDTO> {
    const response = await fetch(`${API_URL}/lockers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al crear el casillero');
    }
    const result = await response.json();
    return result.data;
  },

  async update(id: string, data: UpdateLockerRequest): Promise<LockerDTO> {
    const response = await fetch(`${API_URL}/lockers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al actualizar el casillero');
    }
    const result = await response.json();
    return result.data;
  },
};
```

**Qué hace:** capa única donde el frontend habla con la API. Sumamos `getAll` y `update`, manteniendo el `create` existente.

```bash
git add packages/web/src/services/lockers.ts
git commit -m "feat(frontend): agrega getAll y update en servicio de lockers"
```

---

## Archivo 9 — `packages/web/src/views/Lockers.tsx` (MODIFICAR)

Reemplazá el archivo completo por la nueva vista con tabla + modal create/edit. **Reutilizamos el `MemberCombobox` que ya existe** del feature de Discipline:

```tsx
import {
  Table, Button, Heading, HStack, Stack, Text, Box, Flex, Spinner, Center, Input, IconButton, Badge,
} from '@chakra-ui/react';
import { LuPlus, LuRefreshCw, LuPencil } from 'react-icons/lu';
import { useEffect, useState } from 'react';
import { lockersService } from '../services/lockers';
import { membersService } from '../services/members';
import type {
  LockerDTO, CreateLockerRequest, UpdateLockerRequest, MemberDTO, LockerStatus,
} from '@alentapp/shared';
import {
  DialogRoot, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter,
  DialogActionTrigger, DialogCloseTrigger,
} from '../components/ui/dialog';
import { Field } from '../components/ui/field';
import { MemberCombobox } from '../components/MemberCombobox';

const STATUS_OPTIONS: LockerStatus[] = ['Available', 'Occupied', 'Maintenance'];

const statusColor = (status: LockerStatus) =>
  status === 'Available' ? 'green' : status === 'Occupied' ? 'blue' : 'orange';

export function LockersView() {
  const [lockers, setLockers] = useState<LockerDTO[]>([]);
  const [members, setMembers] = useState<MemberDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<{
    number: string;
    location: string;
    status: LockerStatus;
    member_id: string | null;
  }>({
    number: '',
    location: '',
    status: 'Available',
    member_id: null,
  });

  const fetchAll = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [lck, mem] = await Promise.all([
        lockersService.getAll(),
        membersService.getAll(),
      ]);
      setLockers(lck);
      setMembers(mem);
    } catch (err: any) {
      setError(err.message || 'Error al cargar los datos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const memberNameById = (id: string | null) => {
    if (!id) return '—';
    return members.find((m) => m.id === id)?.name || id;
  };

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({ number: '', location: '', status: 'Available', member_id: null });
    setIsDialogOpen(true);
  };

  const openEditModal = (l: LockerDTO) => {
    setEditingId(l.id);
    setFormData({
      number: String(l.number),
      location: l.location,
      status: l.status,
      member_id: l.member_id,
    });
    setIsDialogOpen(true);
  };

  const handleStatusChange = (newStatus: LockerStatus) => {
    // Regla del TDD-011: si el usuario pone Maintenance, se desvincula el socio automáticamente
    if (newStatus === 'Maintenance') {
      setFormData({ ...formData, status: newStatus, member_id: null });
    } else {
      setFormData({ ...formData, status: newStatus });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const parsedNumber = parseInt(formData.number, 10);

      if (editingId) {
        const payload: UpdateLockerRequest = {
          number: parsedNumber,
          location: formData.location.trim(),
          status: formData.status,
          member_id: formData.member_id,
        };
        await lockersService.update(editingId, payload);
      } else {
        const payload: CreateLockerRequest = {
          number: parsedNumber,
          location: formData.location.trim(),
          status: formData.status,
        };
        await lockersService.create(payload);
      }

      setIsDialogOpen(false);
      fetchAll();
    } catch (err: any) {
      alert(err.message || 'Error al guardar el casillero');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DialogRoot open={isDialogOpen} onOpenChange={(e) => setIsDialogOpen(e.open)}>
      <Stack gap="8">
        <Flex justify="space-between" align="center">
          <Stack gap="1">
            <Heading size="2xl" fontWeight="bold">Casilleros</Heading>
            <Text color="fg.muted" fontSize="md">
              Gestiona los casilleros físicos del club, su estado y asignación.
            </Text>
          </Stack>
          <HStack gap="3">
            <Button variant="outline" onClick={fetchAll} disabled={isLoading}>
              <LuRefreshCw /> Actualizar
            </Button>
            <Button colorPalette="blue" size="md" onClick={openCreateModal}>
              <LuPlus /> Nuevo Casillero
            </Button>
          </HStack>
        </Flex>

        <DialogContent>
          <form onSubmit={handleSubmit} noValidate>
            <DialogHeader>
              <DialogTitle>
                {editingId ? 'Editar Casillero' : 'Registrar Nuevo Casillero'}
              </DialogTitle>
            </DialogHeader>
            <DialogBody>
              <Stack gap="4">
                <Field label="Número de Casillero" required>
                  <Input
                    type="number"
                    min="1"
                    step="1"
                    placeholder="Ej. 104"
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    required
                  />
                </Field>

                <Field label="Localidad / Ubicación" required>
                  <Input
                    placeholder="Ej. Pasillo Central - Planta Alta"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </Field>

                <Field label="Estado">
                  <select
                    value={formData.status}
                    onChange={(e) => handleStatusChange(e.target.value as LockerStatus)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: '1px solid var(--chakra-colors-border)',
                      background: 'var(--chakra-colors-bg-panel)',
                      color: 'inherit',
                    }}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </Field>

                {editingId && (
                  <Field
                    label="Socio asignado"
                    helperText={
                      formData.status === 'Maintenance'
                        ? 'No se puede asignar un socio mientras el casillero esté en mantenimiento.'
                        : 'Dejar vacío para mantener el casillero libre.'
                    }
                  >
                    <MemberCombobox
                      key={editingId}
                      members={members}
                      selectedId={formData.member_id ?? ''}
                      onSelect={(id) => setFormData({ ...formData, member_id: id || null })}
                      disabled={formData.status === 'Maintenance'}
                    />
                  </Field>
                )}
              </Stack>
            </DialogBody>
            <DialogFooter>
              <DialogActionTrigger asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogActionTrigger>
              <Button type="submit" colorPalette="blue" loading={isSubmitting}>
                {editingId ? 'Guardar Cambios' : 'Crear Casillero'}
              </Button>
            </DialogFooter>
            <DialogCloseTrigger />
          </form>
        </DialogContent>

        {error && (
          <Box p="4" bg="red.50" color="red.700" borderRadius="md" border="1px solid" borderColor="red.200">
            <Text fontWeight="bold">Error:</Text>
            <Text>{error}</Text>
          </Box>
        )}

        <Box bg="bg.panel" borderRadius="xl" boxShadow="sm" borderWidth="1px" overflow="hidden" minH="300px">
          {isLoading ? (
            <Center h="300px">
              <Stack align="center" gap="4">
                <Spinner size="xl" color="blue.500" />
                <Text color="fg.muted">Cargando casilleros...</Text>
              </Stack>
            </Center>
          ) : lockers.length === 0 ? (
            <Center h="300px">
              <Text color="fg.muted">No hay casilleros registrados.</Text>
            </Center>
          ) : (
            <Table.Root size="md" variant="line" interactive>
              <Table.Header>
                <Table.Row bg="bg.muted/50">
                  <Table.ColumnHeader py="4">Número</Table.ColumnHeader>
                  <Table.ColumnHeader py="4">Ubicación</Table.ColumnHeader>
                  <Table.ColumnHeader py="4">Estado</Table.ColumnHeader>
                  <Table.ColumnHeader py="4">Socio asignado</Table.ColumnHeader>
                  <Table.ColumnHeader py="4" textAlign="end">Acciones</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {lockers.map((l) => (
                  <Table.Row key={l.id}>
                    <Table.Cell fontWeight="semibold">#{l.number}</Table.Cell>
                    <Table.Cell color="fg.muted">{l.location}</Table.Cell>
                    <Table.Cell>
                      <Badge colorPalette={statusColor(l.status)}>{l.status}</Badge>
                    </Table.Cell>
                    <Table.Cell color="fg.muted">{memberNameById(l.member_id)}</Table.Cell>
                    <Table.Cell textAlign="end">
                      <HStack gap="2" justify="flex-end">
                        <IconButton variant="ghost" size="sm" aria-label="Editar casillero" onClick={() => openEditModal(l)}>
                          <LuPencil />
                        </IconButton>
                      </HStack>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          )}
        </Box>
      </Stack>
    </DialogRoot>
  );
}
```

**Qué hace:** convierte la vista de "form de alta solo" en una **grilla con modal create/edit** (mismo patrón que Disciplines). Reutiliza el `MemberCombobox` que ya creaste para sanciones. El detalle importante: `handleStatusChange` aplica la regla del TDD-011 en tiempo real — si el usuario elige `Maintenance`, se limpia automáticamente el socio asignado **y** el combobox se deshabilita, evitando que ni siquiera pueda intentar el caso inválido. El campo de socio asignado solo se muestra en modo edición (el alta siempre crea el casillero libre).

```bash
git add packages/web/src/views/Lockers.tsx
git commit -m "feat(frontend): agrega modo edición y grilla de casilleros"
```

---

## ✅ Cerrar rama 1

```bash
git push -u origin feature/update-locker
```

PR a `main`, mergear, volver a `main`:

```bash
git checkout main && git pull
```

---

# 🌿 RAMA 2: `feature/delete-locker`

```bash
git checkout -b feature/delete-locker
```

---

## Archivo 1 — `packages/api/src/domain/LockerRepository.ts` (MODIFICAR)

Agregá la firma del `delete` a la interfaz:

```typescript
import { LockerDTO, UpdateLockerRequest } from '@alentapp/shared';

export interface LockerRepository {
  create(locker: Omit<LockerDTO, 'id'>): Promise<LockerDTO>;
  findByNumber(number: number): Promise<LockerDTO | null>;
  findById(id: string): Promise<LockerDTO | null>;
  findAll(): Promise<LockerDTO[]>;
  update(id: string, data: UpdateLockerRequest): Promise<LockerDTO>;
  delete(id: string): Promise<void>;
}
```

**Qué hace:** declara que cualquier implementación de `LockerRepository` debe poder eliminar por id.

```bash
git add packages/api/src/domain/LockerRepository.ts
git commit -m "feat(backend): agrega delete a interfaz LockerRepository"
```

---

## Archivo 2 — `packages/api/src/infrastructure/PostgresLockerRepository.ts` (MODIFICAR)

Agregá el método antes de `private mapToDTO`:

```typescript
async delete(id: string): Promise<void> {
    await prisma.locker.delete({ where: { id } });
}
```

**Qué hace:** borrado físico (hard delete) usando Prisma. El TDD-012 lo pide explícitamente así.

```bash
git add packages/api/src/infrastructure/PostgresLockerRepository.ts
git commit -m "feat(backend): agrega delete en PostgresLockerRepository"
```

---

## Archivo 3 — `packages/api/src/application/DeleteLockerUseCase.ts` (NUEVO)

```typescript
import { LockerRepository } from '../domain/LockerRepository.js';

export class DeleteLockerUseCase {
    constructor(private readonly lockerRepository: LockerRepository) {}

    async execute(id: string): Promise<void> {
        // 1. Verificar existencia
        const existing = await this.lockerRepository.findById(id);
        if (!existing) {
            throw new Error('El casillero no existe');
        }

        // 2. Regla del TDD-012: no se puede eliminar un casillero con socio asignado
        if (existing.member_id !== null) {
            throw new Error('No se puede eliminar un casillero que está ocupado por un socio');
        }

        // 3. Borrado físico
        await this.lockerRepository.delete(id);
    }
}
```

**Qué hace:** orquesta las dos verificaciones del TDD-012 (existe y está libre) antes del borrado físico. Si el casillero tiene un socio asignado, se rechaza — el flujo correcto es desvincular primero (vía update) y después eliminar.

```bash
git add packages/api/src/application/DeleteLockerUseCase.ts
git commit -m "feat(backend): agrega DeleteLockerUseCase con regla de socio asignado"
```

---

## Archivo 4 — `packages/api/src/delivery/LockerController.ts` (MODIFICAR)

Agregá el import:

```typescript
import { DeleteLockerUseCase } from '../application/DeleteLockerUseCase.js';
```

Modificá el constructor para recibir el nuevo use case:

```typescript
constructor(
    private readonly newLockerUseCase: NewLockerUseCase,
    private readonly getLockersUseCase: GetLockersUseCase,
    private readonly updateLockerUseCase: UpdateLockerUseCase,
    private readonly deleteLockerUseCase: DeleteLockerUseCase,
) {}
```

Agregá el método al final de la clase:

```typescript
async delete(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
) {
    try {
        const { id } = request.params;
        await this.deleteLockerUseCase.execute(id);
        return reply.status(204).send();
    } catch (error: any) {
        const message = error.message;

        if (message.includes('no existe')) {
            return reply.status(404).send({ error: message });
        }
        if (message.includes('ocupado por un socio')) {
            return reply.status(400).send({ error: message });
        }
        return reply.status(500).send({ error: 'Error interno, reintente más tarde' });
    }
}
```

**Qué hace:** devuelve `204 No Content` cuando el borrado es exitoso (sin body) y traduce los errores del use case a los códigos HTTP del TDD-012 (400, 404, 500).

```bash
git add packages/api/src/delivery/LockerController.ts
git commit -m "feat(backend): agrega método delete en LockerController"
```

---

## Archivo 5 — `packages/api/src/app.ts` (MODIFICAR)

Agregá el import:

```typescript
import { DeleteLockerUseCase } from './application/DeleteLockerUseCase.js';
```

Dentro de la sección de wiring de Casilleros, agregá:

```typescript
    const deleteLockerUseCase = new DeleteLockerUseCase(lockerRepo);
```

Modificá la instanciación del controller para incluir el nuevo use case:

```typescript
    const lockerController = new LockerController(
        newLockerUseCase,
        getLockersUseCase,
        updateLockerUseCase,
        deleteLockerUseCase,
    );
```

Agregá la nueva ruta:

```typescript
    server.delete('/api/v1/lockers/:id', lockerController.delete.bind(lockerController));
```

**Qué hace:** instancia el use case y registra `DELETE /api/v1/lockers/:id`.

```bash
git add packages/api/src/app.ts
git commit -m "feat(backend): agrega ruta DELETE de lockers"
```

---

## Archivo 6 — `packages/web/src/services/lockers.ts` (MODIFICAR)

Agregá el método dentro del objeto `lockersService`:

```typescript
  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/lockers/${id}`, { method: 'DELETE' });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al eliminar el casillero');
    }
  },
```

**Qué hace:** expone la operación de borrado al frontend. No parsea body porque el back devuelve `204 No Content`.

```bash
git add packages/web/src/services/lockers.ts
git commit -m "feat(frontend): agrega delete en servicio de lockers"
```

---

## Archivo 7 — `packages/web/src/views/Lockers.tsx` (MODIFICAR)

Sumá el ícono al import:

```typescript
import { LuPlus, LuRefreshCw, LuPencil, LuTrash2 } from 'react-icons/lu';
```

Agregá la función `handleDelete` después de `handleSubmit`:

```typescript
const handleDelete = async (l: LockerDTO) => {
    // Criterio del TDD-012: confirmación visual antes de borrar
    const ok = window.confirm(
      `¿Eliminar el casillero #${l.number} (${l.location})? Esta acción no se puede deshacer.`,
    );
    if (!ok) return;
    try {
      await lockersService.delete(l.id);
      fetchAll();
    } catch (err: any) {
      alert(err.message || 'Error al eliminar el casillero');
    }
};
```

Agregá un segundo `IconButton` (rojo) en la columna de Acciones, al lado del de editar:

```tsx
<IconButton
  variant="ghost"
  size="sm"
  colorPalette="red"
  aria-label="Eliminar casillero"
  onClick={() => handleDelete(l)}
>
  <LuTrash2 />
</IconButton>
```

**Qué hace:** suma el botón rojo con la confirmación nativa del navegador. Si el back devuelve 400 porque el casillero está ocupado, el `alert` muestra el mensaje exacto del TDD-012 ("No se puede eliminar un casillero que está ocupado por un socio").

```bash
git add packages/web/src/views/Lockers.tsx
git commit -m "feat(frontend): agrega botón de eliminar en vista de Casilleros"
```

---

## ✅ Cerrar rama 2

```bash
git push -u origin feature/delete-locker
```

PR a main, mergear. Listo, casilleros con CRUD completo.

---

# 📋 Resumen de commits por rama

**Rama 1 — `feature/update-locker`** (9 commits)
1. `feat(backend): agrega UpdateLockerRequest en shared`
2. `feat(backend): agrega findById, findAll y update a LockerRepository`
3. `feat(backend): agrega findAll y tipa update en PostgresLockerRepository`
4. `feat(backend): agrega GetLockersUseCase`
5. `feat(backend): agrega UpdateLockerUseCase con regla de mantenimiento`
6. `feat(backend): agrega getAll y update en LockerController`
7. `feat(backend): agrega rutas GET y PUT de lockers`
8. `feat(frontend): agrega getAll y update en servicio de lockers`
9. `feat(frontend): agrega modo edición y grilla de casilleros`

**Rama 2 — `feature/delete-locker`** (7 commits)
1. `feat(backend): agrega delete a interfaz LockerRepository`
2. `feat(backend): agrega delete en PostgresLockerRepository`
3. `feat(backend): agrega DeleteLockerUseCase con regla de socio asignado`
4. `feat(backend): agrega método delete en LockerController`
5. `feat(backend): agrega ruta DELETE de lockers`
6. `feat(frontend): agrega delete en servicio de lockers`
7. `feat(frontend): agrega botón de eliminar en vista de Casilleros`

---

# 💡 Tips finales

- **No hay cambios de schema en ninguna rama** — el modelo `Locker` ya está en `schema.prisma` desde el alta. No tenés que correr `npx prisma migrate dev` para estas dos ramas.
- **Reutilizás el `MemberCombobox`** que ya existe en `packages/web/src/components/`. Si todavía no lo tenés mergeado a `main` desde tu rama de Discipline, mergeá esa primero.
- **El servicio de members ya existe** (`packages/web/src/services/members.ts`) y se importa para poblar el combobox.
- **Antes de mergear cada rama**, asegurate de que el back y el front compilen y arranquen sin errores: `npm run dev` en `packages/api` y `packages/web`.
- **Para probar la regla del TDD-011**: editá un casillero, cambialo a `Maintenance` con un socio asignado y verificá que el front limpia el socio automáticamente. Probá también vía `curl` para verificar que el back rechaza con 400 si lo intentás saltear.
- **Para probar la regla del TDD-012**: intentá eliminar un casillero que tenga `member_id` asignado y verificá que devuelve 400 con el mensaje exacto.

## 🎯 Casos de prueba para validar en la PR

**Rama 1 (update):**
- [ ] Editar la ubicación de un casillero existente → 200.
- [ ] Cambiar el número a uno ya usado por otro casillero → 409.
- [ ] Cambiar el número a uno propio (no cambia nada) → 200 (porque el validador excluye el id actual).
- [ ] Intentar asignar un socio en un casillero con status Maintenance → 400.
- [ ] Asignar un socio en un casillero Available → 200 y aparece el socio en la grilla.
- [ ] Desvincular un socio mandando `member_id: null` → 200 y el campo muestra "—".

**Rama 2 (delete):**
- [ ] Eliminar un casillero libre (sin socio) → 204 y desaparece de la grilla.
- [ ] Intentar eliminar un casillero con socio asignado → 400 con mensaje del TDD.
- [ ] Cancelar en el diálogo de confirmación → el casillero no se borra.
- [ ] Intentar eliminar un id inexistente vía curl → 404.
