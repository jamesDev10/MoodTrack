MoodTrack

Aplicación móvil desarrollada en Ionic + React, utilizando Vite como bundler y Capacitor para la integración con funcionalidades nativas.
Este proyecto forma parte del desarrollo académico para la creación de una aplicación móvil funcional.

🚀 Tecnologías utilizadas

Ionic React 8

React 19

React Router 5

Vite 5

TypeScript

Capacitor 7

Recharts (gráficas)

Swiper

Cypress (testing E2E)

Vitest (testing unitario)

📦 Dependencias principales

"@capacitor/app": "7.1.0",
"@capacitor/core": "7.4.4",
"@capacitor/haptics": "7.0.2",
"@capacitor/keyboard": "7.0.3",
"@capacitor/preferences": "^7.0.2",
"@capacitor/status-bar": "7.0.3",
"@ionic/react": "^8.5.0",
"@ionic/react-router": "^8.5.0",
"ionicons": "^7.4.0",
"react": "19.0.0",
"react-dom": "19.0.0",
"react-router-dom": "^5.3.4",
"recharts": "^3.4.1",
"swiper": "^12.0.3"

📦 Dependencias de desarrollo

"@capacitor/cli": "7.4.4",
"@vitejs/plugin-react": "^4.0.1",
"eslint": "^9.20.1",
"typescript": "^5.1.6",
"vite": "~5.2.0",
"vitest": "^0.34.6",
"cypress": "^13.5.0"

⚙️ Instalación del proyecto
1️⃣ Clonar el repositorio
git clone https://github.com/jamesDev10/MoodTrack.git
cd mood-track

2️⃣ Instalar dependencias
npm install

▶️ Ejecutar el proyecto en modo desarrollo

El proyecto se inicia con Vite, usando el script:

npm run dev


Esto levantará el servidor en:

http://localhost:5173/

🛠️ Build para producción
npm run build


Este comando genera la carpeta dist/.



📁 Estructura del proyecto
mood-track/
│── node_modules/
│── public/
│── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── theme/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
│── package.json
│── tsconfig.json
│── vite.config.ts

📝 Descripción del proyecto

MoodTrack es una aplicación centrada en el bienestar emocional del usuario.
Permite registrar estados de ánimo, visualizar gráficas, navegar entre pantallas de forma fluida y usar funcionalidades nativas del dispositivo mediante Capacitor.