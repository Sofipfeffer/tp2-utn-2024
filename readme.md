# Proyecto Web de Harry Potter

Este es un proyecto de página web sobre el universo de Harry Potter, desarrollado utilizando HTML, CSS y JavaScript. La página presenta información sobre las casas, hechizos y profesores de Hogwarts, y una sección especial para personajes, al estilo de los cromos de las ranas de chocolate.

## Características del Proyecto

### Página de Inicio
- **Texto Mágico**: La página de inicio presenta un texto mágico que aparece como en el diario de Tom Riddle.
- **Categorías Principales**: La página de inicio incluye tres categorías principales:
  - **Casas**: Información sobre las casas de Hogwarts.
  - **Hechizos**: Listado y detalles de los hechizos.
  - **Profesores**: Listado de los profesores de Hogwarts.

### Funcionalidades
- **APIs de Harry Potter**: Toda la información es obtenida de dos APIs de Harry Potter:
  - API de personajes.
  - API de hechizos.
- **Filtrado de Hechizos**: Los hechizos pueden ser filtrados por nombre.
- **Filtrado de Profesores**: Los profesores pueden ser filtrados por casa.
- **Descripción de Casas**: Cada sección de casa contiene una breve descripción.

### Página de Personajes
- **Estilo de Cromos**: La página de personajes está diseñada al estilo de los cromos de las ranas de chocolate.
- **Listado de Personajes**: Se muestran todos los personajes que tienen foto.
- **Filtrado por Casa**: Al hacer clic en el escudo de una casa, se muestran únicamente los personajes de esa casa.

## Estructura del Proyecto

```plaintext
/
├── index.html          # Página de inicio con las categorías y el texto mágico
├── personajes.html     # Página de personajes al estilo de cromos
├── css/
│   ├── styles.css      # Estilos generales de las páginas
│   └── titulo.css      # Estilos específicos para el titulo del index
├── js/
│   ├── app.js         # Funcionalidades de la página de inicio
│   └── fetch.js       # Funcionalidades de la página de personajes
├── assets             # Archivos multimedia (imagenes, iconos, tipografias) utilizados en el proyecto
└── README.md          # Archivo con la descripción del proyecto
