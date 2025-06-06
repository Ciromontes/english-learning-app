# 🌟 English Learning Hub

Una aplicación interactiva para aprender inglés con lecciones estructuradas, práctica de vocabulario y quizzes engaging.

## ✨ Características

- 📚 **Lecciones Interactivas**: Aprende vocabulario esencial con pronunciación, significados y ejemplos
- 🎯 **Quizzes Inteligentes**: Pon a prueba tus conocimientos con preguntas interactivas
- 🔊 **Pronunciación Audio**: Escucha la pronunciación correcta de cada palabra
- 📱 **Diseño Responsivo**: Funciona perfectamente en todos los dispositivos
- 🎨 **Interfaz Moderna**: Diseño atractivo con animaciones suaves
- 🏆 **Seguimiento de Progreso**: Monitorea tu avance con el sistema de puntuación

## 🚀 Tecnologías Utilizadas

- **React 18** - Biblioteca de interfaz de usuario
- **Vite** - Herramienta de construcción rápida
- **Tailwind CSS** - Framework de CSS utilitario
- **Lucide React** - Iconos modernos
- **Speech Synthesis API** - Pronunciación de audio

## 📦 Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/Ciromontes/english-learning-app.git
   cd english-learning-app
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abre tu navegador**
   Visita `http://localhost:5173` para ver la aplicación

## 🛠️ Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la versión de producción
- `npm run lint` - Ejecuta ESLint para verificar el código

## 📁 Estructura del Proyecto

```
english-learning-app/
├── public/
│   └── vite.svg
├── src/
│   ├── App.jsx          # Componente principal de la aplicación
│   ├── main.jsx         # Punto de entrada de React
│   └── index.css        # Estilos globales y Tailwind
├── index.html           # Plantilla HTML
├── package.json         # Dependencias y scripts
├── tailwind.config.js   # Configuración de Tailwind CSS
├── postcss.config.js    # Configuración de PostCSS
├── vite.config.js       # Configuración de Vite
└── README.md           # Documentación del proyecto
```

## 🎯 Funcionalidades Principales

### 📖 Lecciones
- **Saludos Básicos**: Aprende saludos esenciales en inglés
- **Miembros de la Familia**: Vocabulario familiar
- **Colores**: Colores básicos con ejemplos

### 🧠 Quiz Interactivo
- Preguntas de opción múltiple
- Retroalimentación inmediata
- Sistema de puntuación
- Celebración de respuestas correctas
- Progreso visual

### 🔊 Características de Audio
- Pronunciación nativa usando Speech Synthesis API
- Control de velocidad optimizado para aprendizaje
- Soporte para múltiples navegadores

## 🎨 Personalización

### Modificar el Contenido
El contenido de las lecciones se encuentra en el archivo `src/App.jsx`:

```javascript
const lessons = [
  {
    id: 1,
    title: "Tu Título",
    content: "Descripción de la lección",
    vocabulary: [
      {
        word: "Palabra",
        pronunciation: "/pronunciación/",
        meaning: "Significado",
        example: "Ejemplo de uso"
      }
    ]
  }
];
```

### Agregar Nuevas Preguntas de Quiz
Las preguntas del quiz también están en `src/App.jsx`:

```javascript
const quizQuestions = [
  {
    question: "Tu pregunta aquí?",
    options: ["Opción 1", "Opción 2", "Opción 3", "Opción 4"],
    correct: 1 // Índice de la respuesta correcta (0-3)
  }
];
```

### Personalizar Estilos
Los estilos están configurados con Tailwind CSS. Puedes:
- Modificar `tailwind.config.js` para colores y temas personalizados
- Agregar estilos personalizados en `src/index.css`
- Utilizar las clases utilitarias de Tailwind directamente en los componentes

## 🌐 Deployment

### Vercel (Recomendado)
1. Conecta tu repositorio a Vercel
2. Vercel detectará automáticamente que es un proyecto Vite
3. Deploy automático en cada push

### Netlify
1. Ejecuta `npm run build`
2. Sube la carpeta `dist` a Netlify
3. Configura redirects si es necesario

### GitHub Pages
1. Instala `gh-pages`: `npm install --save-dev gh-pages`
2. Agrega a `package.json`:
   ```json
   "homepage": "https://tu-usuario.github.io/english-learning-app",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Ejecuta `npm run deploy`

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 🐛 Reportar Problemas

Si encuentras algún bug o tienes una sugerencia:

1. Verifica que no exista un issue similar
2. Crea un nuevo issue con:
   - Descripción clara del problema
   - Pasos para reproducirlo
   - Capturas de pantalla si es aplicable
   - Información del navegador/dispositivo

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Autores

- **Ciro Montes** - [@Ciromontes](https://github.com/Ciromontes)

## 🙏 Agradecimientos

- Iconos por [Lucide](https://lucide.dev/)
- Fuentes por [Google Fonts](https://fonts.google.com/)
- Inspiración en las mejores prácticas de UI/UX modernas

---

¡Esperamos que disfrutes aprendiendo inglés con nuestra aplicación! 🎉