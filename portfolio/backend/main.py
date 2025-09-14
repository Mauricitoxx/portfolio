from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MODELOS
class Proyecto(BaseModel):
    nombre: str
    etapa: str  # fecha en string
    link: str
    imagen: str

class Tecnologia(BaseModel):
    nombre: str
    imagen: str

# ALMACENAMIENTO EN MEMORIA
proyectos_db: List[Proyecto] = []
tecnologias_db: List[Tecnologia] = []

# ENDPOINTS PROYECTOS
@app.get("/proyectos", response_model=List[Proyecto])
def get_proyectos():
    return proyectos_db

@app.post("/proyectos", response_model=Proyecto)
def add_proyecto(proyecto: Proyecto):
    proyectos_db.append(proyecto)
    return proyecto

# ENDPOINTS TECNOLOGIAS
@app.get("/tecnologias", response_model=List[Tecnologia])
def get_tecnologias():
    return tecnologias_db

@app.post("/tecnologias", response_model=Tecnologia)
def add_tecnologia(tecnologia: Tecnologia):
    tecnologias_db.append(tecnologia)
    return tecnologia
