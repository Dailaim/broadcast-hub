# The Broadcast Hub

![Project Architecture](https://img.shields.io/badge/architecture-modular-brightgreen)
![Backend](https://img.shields.io/badge/backend-FastAPI-blue)
![Frontend](https://img.shields.io/badge/frontend-React-9cf)

Sistema modular para gestión de órdenes de cerveza en un bar con backend en FastAPI y frontend en React.

## 🚀 Configuración Rápida

### Requisitos Previos
- BunJS 1.2.3 (Frontend)
- Python 3.12 (Backend)

## ⚙️ Configuración del Proyecto

### **Backend (FastAPI)**
**Estructura Modular:**
```
/backend
│
├── /Modules
│   └── /Messages
│       ├── /handlers      # Manejo de lógica de endpoints
│       ├── /models        # Modelos Pydantic
│       ├── /routers       # Definición de rutas API
│       └── /services      # Lógica de negocio
│
├── /database             # Configuración de base de datos
├── main.py               # Punto de entrada
└── requirements.txt
```

**Instalación:**
```bash
# Crear y activar entorno virtual
python -m venv .venv
source .venv/bin/activate  # Linux/Mac
# .venv\Scripts\activate   # Windows

# Instalar dependencias
pip install -r requirements.txt
```

**Ejecución:**
```bash
python main.py
````





### **Frontend (Next.js)**
**Estructura Modular:**
```
/frontend
│
├── /src
│   └── /Modules
│       └── /orders
│           ├── /components  # Componentes UI específicos
│           ├── /screens     # Vistas/páginas
│           └── /services    # Lógica API cliente
│
├── .env                  # Variables de entorno
└── next.config.js
```

**Configuración:**
1. Copiar archivo de entorno:
```bash
cp .example.env .env # configuración las variables de whatsapp api Y CLIENT_PHONE_NUMBER Numero al que se le enviará el mensaje
```
2. Configurar variable:
```env
VITE_API_URL=http://localhost:8000
```

**Instalación:**
```bash
bun install
```

**Ejecución:**
```bash
bun run dev  # Depende de la ejecución de backend
```

### **Ejecutar con Docker Compose**
Si prefieres ejecutar ambos servicios (backend y frontend) con Docker, puedes usar el archivo `docker-compose.yml` proporcionado.

**Requisitos:**
- Docker / Podman / cualquier otro gestor de contenedores
- Docker Compose

**Ejecución:**
1. Construir y levantar los contenedores:
```bash
docker-compose up --build
```

2. Accede al frontend en `http://localhost:5173` y al backend en `http://localhost:8080`.

**Estructura de Docker Compose:**
El archivo `docker-compose.yml` define los contenedores para el backend y frontend y configura sus puertos y dependencias.


## 🏗️ Diagrama de Estructura
```
/proyecto
│
├── /backend
│   ├── /Modules
│   │   └── /orders
│   │       ├── handlers/
│   │       ├── models/
│   │       ├── routers/
│   │       └── services/
│   ├── /database
│   ├── main.py
│   └── requirements.txt
│
├── /frontend
│   ├── /src
│   │   └── /Modules
│   │       └── /orders
│   │           ├── components/
│   │           ├── screens/
│   │           └── services/
│   ├── .env
│   └── next.config.js
│
└── README.md
```
