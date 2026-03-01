<div align="center">

# ✅ To-Do List App
### Aplicación Ionic con Gestión de Tareas y Categorías

<img src="https://img.shields.io/badge/Ionic-7.0-3880FF?style=for-the-badge&logo=ionic&logoColor=white" alt="Ionic">
<img src="https://img.shields.io/badge/Angular-17-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular">
<img src="https://img.shields.io/badge/Cordova-11.0-E8E8E8?style=for-the-badge&logo=apachecordova&logoColor=black" alt="Cordova">
<img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
<img src="https://img.shields.io/badge/Firebase-Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase">

**Una aplicación móvil moderna para gestionar tus tareas con estilo** 🚀


[Demo](#-capturas-de-pantalla) • [Características](#-características-principales) • [Instalación](#-instalación) • [Documentación](#-documentación)

</div>

---


## 📑 Tabla de Contenidos

- [Descripción](#-descripción-del-proyecto)
- [Características Principales](#-características-principales)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Arquitectura](#-arquitectura-del-proyecto)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Contribución](#-contribución)
- [Licencia](#-licencia)
- [Contacto](#-contacto)

---

## 📋 Descripción del Proyecto

Este proyecto es una aplicación móvil desarrollada con **Ionic y Angular** que implementa una lista de tareas (To-Do List) con gestión avanzada de categorías.

Permite a los usuarios **organizar tareas**, **marcarlas como completadas** y **clasificarlas** mediante un sistema de categorías personalizable con una interfaz moderna y responsive.

### 🎯 Objetivo Principal

Demostrar habilidades profesionales en:

```
✓ Desarrollo de aplicaciones híbridas
✓ Clean Architecture
✓ Gestión de estado local
✓ Integración con Firebase
✓ Optimización de rendimiento en Angular
```

---

## ✨ Características Principales

<table>
<tr>
<td width="50%">

### 📝 Gestión de Tareas (CRUD)
- ✅ Crear tareas con título y descripción
- ✏️ Editar tareas existentes
- ☑️ Marcar como completadas/incompletas
- 🗑️ Eliminar tareas
- 🔄 Cambiar estados:
  - 🆕 Nueva
  - 📅 Programada
  - ⏳ En Progreso
  - ✔️ Completada

</td>
<td width="50%">

### 🗂️ Gestión de Categorías
- ➕ Crear categorías personalizadas
- 🎨 Asignar colores únicos
- ✏️ Editar categorías existentes
- 🗑️ Eliminar categorías
- 🏷️ Asociar a tareas
- 🔍 Filtrar por categoría

</td>
</tr>
</table>

### 🔐 Autenticación y Seguridad

- 🔑 **Firebase Authentication** integrado
- 📧 Login con Email/Password
- 🔍 Login con Google Sign-In
- 🛡️ Sesiones seguras

### 💾 Persistencia de Datos

- 💿 Almacenamiento local con `localStorage`
- 🔄 Sincronización automática
- 📦 Datos persistentes entre sesiones

---

## 📸 Capturas de Pantalla




<!-- <img width="300" align="center" src="https://github.com/SoffiaSanchezz/AgroSena/blob/main/img/Logo(1).png" /> -->
<img align="center" src="https://github.com/SoffiaSanchezz/ToDo-List/blob/56b74c69522f2937e54217f8be86a2b5e13aa0f1/src/assets/img/vista.jpg" />

---

## 🚀 Tecnologías Utilizadas

<div align="center">

| Categoría | Tecnologías |
|-----------|-------------|
| **Frontend** | ![Ionic](https://img.shields.io/badge/Ionic-7.0-3880FF?logo=ionic&logoColor=white) ![Angular](https://img.shields.io/badge/Angular-17-DD0031?logo=angular&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white) |
| **Mobile Platform** | ![Cordova](https://img.shields.io/badge/Cordova-11.0-E8E8E8?logo=apachecordova&logoColor=black) |
| **Estado** | ![LocalStorage](https://img.shields.io/badge/LocalStorage-gray?logo=javascript&logoColor=white) |
| **Autenticación** | ![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?logo=firebase&logoColor=black) |
| **Estilos** | ![SCSS](https://img.shields.io/badge/SCSS-CC6699?logo=sass&logoColor=white) |
| **Arquitectura** | ![Clean Architecture](https://img.shields.io/badge/Clean-Architecture-blue) |

</div>

---

## 🏗️ Arquitectura del Proyecto

Este proyecto sigue los principios de **Clean Architecture**, separando las responsabilidades en capas:

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│     (Components, Pages, UI Logic)       │
├─────────────────────────────────────────┤
│         Application Layer               │
│      (Services, State Management)       │
├─────────────────────────────────────────┤
│          Domain Layer                   │
│     (Entities, Business Logic)          │
├─────────────────────────────────────────┤
│       Infrastructure Layer              │
│   (Firebase, LocalStorage, APIs)        │
└─────────────────────────────────────────┘
```

---

## 💻 Instalación

### 📌 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- ![Node.js](https://img.shields.io/badge/Node.js-LTS-339933?logo=node.js&logoColor=white) [Node.js](https://nodejs.org/) (versión LTS recomendada)
- ![npm](https://img.shields.io/badge/npm-latest-CB3837?logo=npm&logoColor=white) npm (incluido con Node.js)
- ![Ionic CLI](https://img.shields.io/badge/Ionic-CLI-3880FF?logo=ionic&logoColor=white) [Ionic CLI](https://ionicframework.com/docs/cli)

### 🔧 Paso 1: Instalar Ionic CLI

```bash
npm install -g @ionic/cli
```

### 📦 Paso 2: Clonar el Repositorio

```bash
https://github.com/SoffiaSanchezz/ToDo-List.git
```

### ⚙️ Paso 3: Instalar Dependencias

```bash
npm install
```

### 🔥 Paso 4: Configurar Firebase

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilita **Authentication** (Email/Password y Google)
3. Copia la configuración de Firebase
4. Crea un archivo `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
  }
};
```

### ▶️ Paso 5: Ejecutar la Aplicación

```bash
# Modo desarrollo (navegador)
ionic serve

# Modo desarrollo con livereload
ionic serve --lab

# Modo desarrollo (Android)
ionic cordova run android

# Modo desarrollo (iOS)
ionic cordova run ios
```

---

## ⚙️ Configuración

### Variables de Entorno

El proyecto utiliza archivos de entorno para diferentes modos:

- `environment.ts` - Desarrollo
- `environment.prod.ts` - Producción

### Scripts Disponibles

```bash
# Desarrollo
npm start                 # Inicia el servidor de desarrollo

# Build
npm run build            # Construye para producción

# Tests
npm test                 # Ejecuta tests unitarios
npm run e2e             # Ejecuta tests end-to-end

# Linting
npm run lint            # Verifica el código

# Capacitor
npm run android         # Ejecuta en Android
npm run ios             # Ejecuta en iOS
```

---

## 📖 Uso

### Crear una Tarea

1. Presiona el botón **"+"** en la pantalla principal
2. Ingresa el título y descripción
3. Selecciona una categoría (opcional)
4. Presiona **"Guardar"**

### Gestionar Categorías

1. Ve a la sección **"Categorías"**
2. Presiona **"Nueva Categoría"**
3. Elige un nombre y color
4. Las categorías aparecerán en el filtro de tareas

### Filtrar Tareas

- Usa el selector de categorías en la parte superior
- Selecciona **"Todas"** para ver todas las tareas
- Las tareas se filtran automáticamente

---

## 📁 Estructura del Proyecto

```
todo-list-ionic/
├── src/
│   ├── app/
│   │   ├── core/               # Servicios core, guards, interceptors
│   │   ├── features/           # Módulos de características
│   │   │   ├── auth/          # Autenticación
│   │   │   ├── tasks/         # Gestión de tareas
│   │   │   └── categories/    # Gestión de categorías
│   │   ├── shared/            # Componentes y utilidades compartidas
│   │   └── models/            # Modelos e interfaces
│   ├── assets/                # Recursos estáticos
│   ├── environments/          # Configuraciones de entorno
│   └── theme/                 # Estilos globales
├── capacitor.config.ts        # Configuración de Capacitor
├── ionic.config.json          # Configuración de Ionic
└── package.json               # Dependencias del proyecto
```

<div style="text-align: center;">
  <!-- Primera imagen con título -->
  <div style="display: inline-block; text-align: center; margin-right: 40px;">
    <h4>Estructura Base</h4>
    <img src="https://github.com/SoffiaSanchezz/ToDo-List/blob/56b74c69522f2937e54217f8be86a2b5e13aa0f1/src/assets/img/arqbase.png" alt="Arquitectura Base" width="300"/>
  </div>

  <!-- Segunda imagen con título -->
  <div style="display: inline-block; text-align: center;">
    <h4>Arquitectura Limpia</h4>
    <img src="https://github.com/SoffiaSanchezz/ToDo-List/blob/56b74c69522f2937e54217f8be86a2b5e13aa0f1/src/assets/img/image.png" alt="Arquitectura Limpia" width="300"/>
  </div>
</div>

---
<h2>🤖 Recursos del Proyecto</h2>

<div style="display: flex; justify-content: center; gap: 30px; flex-wrap: wrap; margin-top: 10px;">
  <!-- APK -->
  <div style="border: 1px solid #ddd; padding: 20px; border-radius: 12px; text-align: center; width: 220px; box-shadow: 2px 2px 8px rgba(0,0,0,0.1);">
    <h3>📥 APK</h3>
    <a 
      href="https://drive.google.com/file/d/1goMBCKXdXOcD4Wx7rOiaL3czC5TtBDAY/view?usp=sharing"
      target="_blank"
      rel="noopener noreferrer"
      style="text-decoration: none; font-weight: bold; color: #1e90ff;"
    >
      Descargar
    </a>
    <p style="font-size: 13px; color: #555; margin-top: 10px; line-height: 1.4;">
      ⚠️ Para pruebas:<br/>
      <b>Usuario:</b> user@admin.com<br/>
      <b>Contraseña:</b> password1234
    </p>
  </div>

  <!-- Trello -->
  <div style="border: 1px solid #ddd; padding: 20px; border-radius: 12px; text-align: center; width: 220px; box-shadow: 2px 2px 8px rgba(0,0,0,0.1);">
    <h3>📋 Trello</h3>
    <a 
      href="https://trello.com/b/3C8tf2PE/todolist"
      target="_blank"
      rel="noopener noreferrer"
      style="text-decoration: none; font-weight: bold; color: #1e90ff;"
    >
      Ver tablero
    </a>
  </div>
</div>



## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

```
MIT License - Siéntete libre de usar este proyecto para aprender y crear
```

---

## ❤️ Autor

- [SofiaSanchez](https://github.com/SoffiaSanchezz)


---

<div align="center">

### 🌟 Si este proyecto te resultó útil, ¡dale una estrella! ⭐

**Hecho con ❤️ y Ionic**

[⬆️ Volver arriba](#-to-do-list-app)

</div>
