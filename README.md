<div align="center">

# 📱 Todo List Ionic - SaaS Edition
### Gestión de Tareas Profesional con Arquitectura Limpia

[![Ionic](https://img.shields.io/badge/Ionic-8.0-3880FF?style=for-the-badge&logo=ionic&logoColor=white)](https://ionicframework.com/)
[![Angular](https://img.shields.io/badge/Angular-19.0-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12.7-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)

**"Organiza tu vida con una interfaz moderna, rápida y escalable."** 🚀

[📥 Descargar APK](#-recursos-del-proyecto) • [🏗️ Arquitectura](#-arquitectura-del-proyecto) • [🚀 Instalación](#-instalación)

</div>

---

## 📋 Tabla de Contenidos

- [Descripción del Proyecto](#-descripción-del-proyecto)
- [Características Principales](#-características-principales)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Estructura de Carpetas](#-estructura-del-proyecto)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Ejecución y Compilación](#-ejecución-de-la-aplicación)
- [Optimizaciones de Rendimiento](#-optimizaciones-de-rendimiento)
- [Recursos del Proyecto](#-recursos-del-proyecto)

---

## 🎯 Descripción del Proyecto

**Todo List Ionic** es una aplicación móvil híbrida de alto rendimiento diseñada para la gestión eficiente de actividades diarias. Implementa una **Arquitectura Limpia (Clean Architecture)** desacoplada, lo que permite un mantenimiento sencillo y una escalabilidad garantizada.

La aplicación utiliza las últimas capacidades de **Angular 19**, como el nuevo control flow nativo y componentes standalone, logrando una experiencia de usuario fluida y una interfaz tipo SaaS moderna.

---

## ✨ Características Principales

### 📝 Gestión de Tareas Pro
- **CRUD Avanzado**: Crear, editar y eliminar tareas con estados (*Nueva, Programada, En Progreso, Completada*).
- **Jerarquía Visual**: Diseño de tarjetas con sombras sutiles, efectos glow y tipografía moderna.
- **Control de Estado**: Marca tareas como finalizadas con un solo toque y feedback visual instantáneo.

### 🏷️ Sistema de Categorías Inteligente
- **Categorización Dinámica**: Organiza tus tareas por etiquetas personalizables.
- **Selector de Color**: Asigna colores únicos a tus categorías para un escaneo visual rápido.
- **Filtrado en Tiempo Real**: Dashboard segmentado por categorías desde el encabezado.

### 🔐 Seguridad y Persistencia Dual
- **Firebase Auth**: Registro e inicio de sesión seguro.
- **Sincronización Híbrida**: Almacenamiento persistente en **Firestore** con respaldo automático en **LocalStorage** para soporte offline (Upsert Logic).

---

## 🏗️ Arquitectura del Proyecto

El proyecto se rige por los principios **SOLID** y **Clean Architecture**, dividiendo la aplicación en capas de responsabilidad única:

```
┌─────────────────────────────────────────┐
│         Presentation Layer (UI)         │
│      (Angular Standalone Components)    │
├─────────────────────────────────────────┤
│         Application Layer (Logic)       │
│      (Use Cases & Todo Interactors)     │
├─────────────────────────────────────────┤
│          Domain Layer (Entities)        │
│     (Plain Objects & Repo Contracts)    │
├─────────────────────────────────────────┤
│       Infrastructure Layer (Data)       │
│   (Firebase, LocalStorage, Services)    │
└─────────────────────────────────────────┘
```

---

## 📁 Estructura del Proyecto

```
src/app/
├── core/                    # Clases base, contratos y tipos globales
├── features/                # Módulos de funcionalidad (Modular Architecture)
│   ├── auth/                # Registro, Login y seguridad
│   └── todo/                # Feature Core: Tareas y Categorías
│       ├── application/     # Casos de uso (Lógica de negocio)
│       ├── domain/          # Entidades y definición de interfaces
│       ├── data/            # Implementación de repositorios y datasources
│       └── presentation/    # Componentes standalone, páginas y SCSS
├── shared/                  # Componentes reutilizables, mocks y servicios globales
└── theme/                   # Diseño SaaS: Variables y estilos globales
```

---

## 📦 Requisitos Previos

| Software | Versión Mínima | Comando de Verificación |
| -------------- | -------------- | ----------------------- |
| **Node.js** | 18.x | `node --version` |
| **npm** | 10.x | `npm --version` |
| **Ionic CLI** | 7.x | `ionic --version` |
| **Cordova** | 12.x | `cordova --version` |

---

## 🚀 Instalación

1. **Clonar el Repositorio**
   ```bash
   git clone https://github.com/SoffiaSanchezz/ToDo-List.git
   cd ToDo-List
   ```

2. **Instalar Dependencias**
   ```bash
   npm install
   ```

3. **Configurar Entorno**
   Configura tus credenciales de Firebase en `src/environments/environment.ts`.

---

## 💻 Ejecución de la Aplicación

### Desarrollo
```bash
# Servidor de desarrollo (Navegador)
ionic serve

# Android con Live Reload
ionic cordova run android --livereload
```

### Compilación (Build)
```bash
# Generar APK de Debug
ionic cordova build android

# Generar Build de Producción optimizada
ionic cordova build android --prod --release
```

---

## ⚡ Optimizaciones de Rendimiento

1. **Angular 19 Control Flow**: Implementación de `@if`, `@for` y `@switch` nativos para una reducción del 15% en el tiempo de renderizado.
2. **Infinite Scroll**: Carga segmentada de 50 items para mantener la fluidez en listas masivas.
3. **TrackBy Logic**: Reducción de re-renders innecesarios en el DOM al manipular listas de tareas.
4. **Standalone Components**: Eliminación de módulos pesados para un bundle inicial más ligero.
5. **Upsert Storage**: Algoritmo de sincronización local que evita errores de consistencia de datos.

---

## 🤖 Recursos del Proyecto

<div style="display: flex; justify-content: center; gap: 30px; flex-wrap: wrap;">
  
  <!-- APK Card -->
  <div style="border: 1px solid #e2e8f0; padding: 24px; border-radius: 20px; text-align: center; width: 240px; background: #fff; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
    <h3>📥 APK Móvil</h3>
    <a href="https://drive.google.com/file/d/1goMBCKXdXOcD4Wx7rOiaL3czC5TtBDAY/view?usp=sharing" target="_blank" style="text-decoration: none; font-weight: bold; color: #3880FF; font-size: 1.1rem;">Descargar</a>
    <p style="font-size: 12px; color: #64748b; margin-top: 12px;"><b>Usuario:</b> user@admin.com<br/><b>Password:</b> password1234</p>
  </div>

  <!-- Trello Card -->
  <div style="border: 1px solid #e2e8f0; padding: 24px; border-radius: 20px; text-align: center; width: 240px; background: #fff; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
    <h3>📋 Roadmap</h3>
    <a href="https://trello.com/b/3C8tf2PE/todolist" target="_blank" style="text-decoration: none; font-weight: bold; color: #0079BF; font-size: 1.1rem;">Ver Trello</a>
    <p style="font-size: 12px; color: #64748b; margin-top: 12px;">Gestión de tareas y seguimiento del desarrollo.</p>
  </div>

</div>

---

## 📄 Licencia
Este proyecto está bajo la Licencia **MIT**. Siéntete libre de usarlo como base para tus propios desarrollos.

---

<div align="center">

**Desarrollado con ❤️ por [SofiaSanchez](https://github.com/SoffiaSanchezz)**

[⬆️ Volver al inicio](#-todo-list-app)

</div>
