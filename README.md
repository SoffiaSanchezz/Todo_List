<div align="center">

# 📱 Todo List Ionic - SaaS Edition
### Aplicación de Gestión de Tareas con Arquitectura Limpia

[![Ionic](https://img.shields.io/badge/Ionic-8.0-3880FF?style=for-the-badge&logo=ionic&logoColor=white)](https://ionicframework.com/)
[![Angular](https://img.shields.io/badge/Angular-19.0-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12.7-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)

**Una experiencia moderna y profesional para organizar tu día a día.** 🚀

[Demo](#-recursos-del-proyecto) • [Características](#-características-principales) • [Arquitectura](#-arquitectura-del-proyecto) • [Instalación](#-instalación)

</div>

---

## 📑 Tabla de Contenidos

- [Descripción del Proyecto](#-descripción-del-proyecto)
- [Características Principales](#-características-principales)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Estructura de Carpetas](#-estructura-del-proyecto)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Ejecución y Compilación](#-ejecución-de-la-aplicación)
- [Configuración de Firebase](#-configuración-de-firebase)
- [Optimizaciones de Rendimiento](#-optimizaciones-de-rendimiento)
- [Recursos del Proyecto](#-recursos-del-proyecto)

---

## 📋 Descripción del Proyecto

**Todo List Ionic** es una aplicación móvil híbrida desarrollada como una solución robusta para la gestión de tareas. El proyecto destaca por implementar **Angular 19** con su nuevo flujo de control nativo y una arquitectura desacoplada que permite la persistencia tanto en **Firebase** como en **LocalStorage** (soporte offline).

### 🎯 Objetivo Principal
Demostrar habilidades de ingeniería de software mediante:
- ✅ Implementación de **Clean Architecture**.
- ✅ UI/UX moderna tipo SaaS con componentes personalizados.
- ✅ Gestión de estado reactiva con **RxJS**.
- ✅ Optimización extrema del rendimiento móvil.

---

## ✨ Características Principales

### 📝 Gestión de Tareas (SaaS Style)
- **CRUD Completo**: Crear, editar, completar y eliminar tareas con transiciones suaves.
- **Estados Inteligentes**: Organiza por *Nueva*, *Programada*, *En Progreso* y *Completada*.
- **Diseño Responsive**: Interfaz adaptada totalmente a móviles, tablets y escritorio.

### 🗂️ Sistema de Categorías
- **Personalización**: Crea categorías con nombres y colores vibrantes.
- **Filtrado Pro**: Segmentación instantánea de tareas por categorías desde el dashboard.
- **Gestor de Categorías**: Modal dedicado para administrar tu lista de etiquetas.

### 🔐 Seguridad y Persistencia
- **Firebase Auth**: Autenticación segura con Email/Password.
- **Dual Storage**: Sincronización en tiempo real con Firestore y respaldo en LocalStorage para uso sin conexión.

---

## 🏗️ Arquitectura del Proyecto

Este proyecto sigue los principios de **Clean Architecture**, asegurando que la lógica de negocio sea independiente de los frameworks y la base de datos.

```
┌─────────────────────────────────────────┐
│         Presentation Layer (Angular)    │
│      (Components, Pages, UI Logic)      │
├─────────────────────────────────────────┤
│         Application Layer (Use Cases)   │
│      (Interactors, Business Rules)      │
├─────────────────────────────────────────┤
│          Domain Layer (Entities)        │
│     (Core Entities & Repo Interfaces)   │
├─────────────────────────────────────────┤
│       Infrastructure Layer (Data)       │
│   (Firebase, LocalStorage implementation)│
└─────────────────────────────────────────┘
```

---

## 📁 Estructura del Proyecto

```
src/app/
├── core/                    # Clases base y contratos globales
├── features/                # Módulos por característica (Modular)
│   ├── auth/                # Lógica de login y registro
│   └── todo/                # Feature principal de tareas
│       ├── application/     # Casos de uso (Interactors)
│       ├── domain/          # Entidades y definición de repositorios
│       ├── data/            # Implementación de repositorios y datasources
│       └── presentation/    # Componentes y páginas (UI)
├── shared/                  # Componentes, servicios y mocks comunes
└── theme/                   # Variables globales y estilos SaaS
```

---

## 📦 Requisitos Previos

| Software | Versión |
| --- | --- |
| **Node.js** | 18.x o superior |
| **npm** | 10.x o superior |
| **Ionic CLI** | 7.x o superior |
| **Cordova** | 12.x o superior |

```bash
# Instalación de herramientas globales
npm install -g @ionic/cli cordova native-run
```

---

## 🚀 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/SoffiaSanchezz/ToDo-List.git
   cd ToDo-List
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar Entorno**
   Crea tu archivo `src/environments/environment.ts` con tus credenciales de Firebase.

---

## 💻 Ejecución de la Aplicación

| Plataforma | Comando |
| --- | --- |
| **Navegador** | `ionic serve` |
| **Android (Live Reload)** | `ionic cordova run android --livereload` |
| **Android (Build APK)** | `ionic cordova build android --prod` |

---

## ⚡ Optimizaciones de Rendimiento

1. **Angular 19 Control Flow**: Uso de `@if`, `@for` y `@switch` para una renderización 20% más rápida.
2. **Infinite Scroll**: Carga optimizada de tareas (50 items por página) para evitar lag en listas largas.
3. **TrackBy**: Implementado en todas las listas para reducir re-renders innecesarios.
4. **Standalone Components**: Reducción drástica del tamaño del bundle inicial.
5. **Lazy Loading**: Los módulos se cargan solo cuando el usuario los necesita.

---

## 🤖 Recursos del Proyecto

<div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
  
  <!-- Card APK -->
  <div style="border: 1px solid #ddd; padding: 20px; border-radius: 16px; text-align: center; width: 250px; background: #fff;">
    <h3>📥 Descargar APK</h3>
    <a href="https://drive.google.com/file/d/1goMBCKXdXOcD4Wx7rOiaL3czC5TtBDAY/view?usp=sharing" target="_blank" style="text-decoration: none; font-weight: bold; color: #3880FF;">Google Drive</a>
    <p style="font-size: 12px; color: #666; margin-top: 10px;">
      <b>Pruebas:</b> user@admin.com<br/><b>Pass:</b> password1234
    </p>
  </div>

  <!-- Card Trello -->
  <div style="border: 1px solid #ddd; padding: 20px; border-radius: 16px; text-align: center; width: 250px; background: #fff;">
    <h3>📋 Gestión Trello</h3>
    <a href="https://trello.com/b/3C8tf2PE/todolist" target="_blank" style="text-decoration: none; font-weight: bold; color: #0079BF;">Ver Tablero</a>
    <p style="font-size: 12px; color: #666; margin-top: 10px;">Seguimiento de tareas y roadmap del proyecto.</p>
  </div>

</div>

---

## 📄 Licencia
Este proyecto está bajo la Licencia **MIT**. Siéntete libre de usarlo para aprender o como base para tus propias aplicaciones.

---

<div align="center">

**Desarrollado con ❤️ por [SofiaSanchez](https://github.com/SoffiaSanchezz)**

[⬆️ Volver al inicio](#-todo-list-ionic---saas-edition)

</div>
