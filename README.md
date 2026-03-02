# 📱 Todo List Ionic

> Aplicación móvil híbrida profesional desarrollada con **Ionic 8**, **Angular 20** y **Cordova** como parte de una solución de gestión de tareas escalable.

[![Ionic](https://img.shields.io/badge/Ionic-8.0-blue.svg)](https://ionicframework.com/)
[![Angular](https://img.shields.io/badge/Angular-20.0-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-11.10-orange.svg)](https://firebase.google.com/)

---

## 📋 Tabla de Contenidos

- [Descripción del Proyecto](#-descripción-del-proyecto)
- [Características Principales](#-características-principales)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Ejecución de la Aplicación](#-ejecución-de-la-aplicación)
- [Compilación para Android](#-compilación-para-android)
- [Configuración de Firebase](#-configuración-de-firebase)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Optimizaciones de Rendimiento](#-optimizaciones-de-rendimiento)
- [Recursos del Proyecto](#-recursos-del-proyecto)

---

## 🎯 Descripción del Proyecto

**Todo List Ionic** es una aplicación móvil robusta diseñada bajo el paradigma de **Clean Architecture**. Su objetivo es proporcionar una herramienta fluida para organizar actividades diarias, permitiendo la sincronización en la nube y el funcionamiento offline.

### Funcionalidades Core

- ✅ **Gestión de Tareas**: Flujo CRUD completo con estados dinámicos.
- 🏷️ **Categorización**: Clasificación por etiquetas con colores personalizados.
- 🔍 **Filtrado Avanzado**: Segmentación por categoría y estado desde el Dashboard.
- 💾 **Persistencia Híbrida**: Sincronización con Firestore y respaldo en LocalStorage (Upsert Logic).
- 🔐 **Autenticación**: Registro e inicio de sesión seguro gestionado por Firebase.

---

## ✨ Características Principales

### 1. Gestión de Tareas Pro
- Interfaz moderna tipo SaaS con componentes personalizados.
- Estados de tarea: **Nueva, Programada, En Progreso y Completada**.
- Feedback visual instantáneo mediante efectos glow y sombras sutiles.

### 2. Sistema de Categorías
- Creación de categorías con selector de color.
- Gestión centralizada de categorías mediante modal dedicado.
- Filtrado rápido mediante segmentos dinámicos.

### 3. Rendimiento Optimizado
- Implementación de **Angular 20 Control Flow** (`@if`, `@for`).
- Paginación técnica para manejo de grandes volúmenes de datos.
- Arquitectura desacoplada para fácil mantenimiento.

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

| Software       | Versión Mínima | Comando de Verificación |
| -------------- | -------------- | ----------------------- |
| Node.js        | 18.x           | `node --version`        |
| npm            | 10.x           | `npm --version`         |
| Ionic CLI      | 7.x            | `ionic --version`       |
| Cordova        | 12.x           | `cordova --version`     |
| Android Studio | Latest         | -                       |

---

## 🚀 Instalación

### 1. Clonar el Repositorio
```bash
git clone https://github.com/SoffiaSanchezz/ToDo-List.git
cd Todo_List
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Configurar Entornos
Crea el archivo `src/environments/environment.ts` basándote en la configuración de Firebase (ver sección correspondiente).

### 4. Herramientas Globales (Si no las tienes)
```bash
npm install -g @ionic/cli cordova native-run
```

---

## 💻 Ejecución de la Aplicación

### Modo Navegador (Desarrollo Web)
La forma más rápida de probar la UI:
```bash
ionic serve
```
Disponible en: `http://localhost:8100`

### Modo Dispositivo/Emulador Android
Para probar funcionalidades nativas y plugins:
```bash
# Con Live Reload (recomendado para desarrollo)
ionic cordova run android --livereload

# Ejecución estándar
ionic cordova run android
```

---

## 📱 Compilación para Android

### Generar APK de Desarrollo
```bash
ionic cordova build android
```
**Ubicación del APK:** `platforms/android/app/build/outputs/apk/debug/app-debug.apk`

### Compilación para Producción
```bash
ionic cordova build android --prod --release
```

### Abrir en Android Studio
Si necesitas realizar ajustes nativos o debugging avanzado:
1. Abre Android Studio.
2. Selecciona **Open** y navega a `platforms/android`.

---

## 🔥 Configuración de Firebase

### 1. Crear el Proyecto
1. Ve a [Firebase Console](https://console.firebase.google.com/).
2. Añade un nuevo proyecto llamado `Todo-List`.
3. Habilita **Authentication** (Email/Password).
4. Crea una base de datos **Firestore** en modo prueba.

### 2. Integración en la App
Copia tus credenciales de la consola de Firebase y actualiza:
`src/environments/environment.ts`

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: "TU_API_KEY",
    authDomain: "TU_DOMINIO.firebaseapp.com",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_BUCKET.firebasestorage.app",
    messagingSenderId: "TU_SENDER_ID",
    appId: "TU_APP_ID"
  }
};
```

---

## 📁 Estructura del Proyecto

El proyecto sigue una estructura **Modular y de Arquitectura Limpia**:

```
src/app/
├── core/                    # Clases base, contratos y tipos globales
├── features/                # Características modulares
│   ├── auth/                # Registro, Login y seguridad
│   └── todo/                # Tareas y Categorías (Domain, Data, UI)
├── shared/                  # Componentes reutilizables y servicios globales
└── theme/                   # Estilos SaaS y variables globales
```

### Arquitectura de Capas
1. **Presentation**: Componentes Standalone y lógica de UI.
2. **Application**: Casos de uso (Interactors).
3. **Domain**: Entidades puras y contratos de repositorios.
4. **Infrastructure**: Implementaciones de Firebase y LocalStorage.

---

## ⚡ Optimizaciones de Rendimiento

- **Angular Control Flow**: Renderización nativa ultrarrápida.
- **Lazy Loading**: Los módulos se cargan solo bajo demanda.
- **TrackBy**: Optimización de listas de tareas.
- **Upsert Local Logic**: Evita latencias de red mediante gestión local inteligente.

---

## 🤖 Recursos del Proyecto

<div style="display: flex; justify-content: center; gap: 30px; flex-wrap: wrap;">
  
  <div style="border: 1px solid #ddd; padding: 20px; border-radius: 12px; text-align: center; width: 220px; background: #fff;">
    <h3>📥 APK</h3>
    <a href="https://drive.google.com/file/d/1goMBCKXdXOcD4Wx7rOiaL3czC5TtBDAY/view?usp=sharing" target="_blank" style="text-decoration: none; font-weight: bold; color: #3880FF;">Descargar</a>
    <p style="font-size: 12px; color: #666; margin-top: 10px;">User: user@admin.com<br/>Pass: password1234</p>
  </div>

  <div style="border: 1px solid #ddd; padding: 20px; border-radius: 12px; text-align: center; width: 220px; background: #fff;">
    <h3>📋 Roadmap</h3>
    <a href="https://trello.com/b/3C8tf2PE/todolist" target="_blank" style="text-decoration: none; font-weight: bold; color: #0079BF;">Ver Trello</a>
  </div>

</div>

---

## 📄 Licencia
Este proyecto está bajo la Licencia **MIT**.

---

<div align="center">

**Desarrollado con ❤️ por [SofiaSanchez](https://github.com/SoffiaSanchezz)**

</div>
