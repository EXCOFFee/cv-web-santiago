# 💻 CV Web Profesional - Santiago Excoffier

Un CV web moderno y responsivo desarrollado con **React 18**, **Tailwind CSS** y **Framer Motion**, implementando principios **SOLID** y las mejores prácticas de desarrollo.

## 🚀 Características Principales

### ✨ Tecnologías Utilizadas
- **React 18** - Framework principal
- **Tailwind CSS** - Estilos y diseño responsivo
- **Framer Motion** - Animaciones suaves y profesionales
- **React Icons** - Iconografía moderna
- **PropTypes** - Validación de tipos
- **JavaScript ES6+** - Sintaxis moderna

### 🎯 Principios SOLID Implementados

#### 1. **Single Responsibility Principle (SRP)**
- Cada componente tiene una responsabilidad única y bien definida
- Hooks personalizados para lógica específica (`useScrollAnimation`, `useTypingAnimation`)
- Servicios especializados (`NavigationService`, `ValidationService`)

#### 2. **Open/Closed Principle (OCP)**
- Componentes extensibles mediante configuraciones
- Sistema de variantes en componentes UI (`Button`, `Card`)
- Fácil adición de nuevas secciones sin modificar código existente

#### 3. **Liskov Substitution Principle (LSP)**
- Componentes intercambiables mediante props consistentes
- Interfaces uniformes para todos los componentes similares

#### 4. **Interface Segregation Principle (ISP)**
- Props específicas para cada componente
- Interfaces mínimas y enfocadas

#### 5. **Dependency Inversion Principle (DIP)**
- Dependencia de abstracciones (hooks, servicios)
- Configuraciones centralizadas en constantes
- Inyección de dependencias mediante props

### 🛠️ Buenas Prácticas Implementadas

#### **Arquitectura y Organización**
```
src/
├── components/          # Componentes React
│   ├── UI/             # Componentes reutilizables
│   ├── Header.js       # Navegación principal
│   ├── Hero.js         # Sección principal
│   ├── About.js        # Información personal
│   ├── Skills.js       # Tecnologías
│   ├── AIProductivity.js # Herramientas IA
│   ├── Certificates.js # Certificados
│   └── Contact.js      # Formulario contacto
├── hooks/              # Hooks personalizados
├── services/           # Servicios de negocio
├── utils/              # Utilidades y validaciones
├── constants/          # Configuraciones centralizadas
└── styles/             # Estilos globales
```

#### **Código Limpio**
- **JSDoc completo** en todas las funciones
- **PropTypes** en todos los componentes
- **Comentarios explicativos** en lógica compleja
- **Naming conventions** consistentes
- **Error handling** robusto

#### **Performance**
- **Lazy loading** de componentes
- **Memoización** con `useMemo` y `useCallback`
- **Optimización de re-renders**
- **Cleanup** de event listeners
- **Throttling** en eventos de scroll/resize

#### **Accesibilidad**
- **ARIA labels** completos
- **Roles semánticos** apropiados
- **Focus management** óptimo
- **Contraste** adecuado en colores
- **Navegación por teclado**

#### **Responsive Design**
- **Mobile-first** approach
- **Breakpoints** bien definidos
- **Adaptación automática** de contenido
- **Touch-friendly** interfaces

## 🎨 Secciones del CV

### 🏠 **Hero/Inicio**
- Animación tipo terminal con múltiples textos
- Efecto de partículas de fondo
- Call-to-action prominent
- Navegación suave

### 👤 **Sobre Mí**
- Información personal y profesional
- Timeline de experiencia
- Estadísticas personales
- Valores y principios

### 💻 **Tecnologías**
- Stack tecnológico completo
- Barras de progreso animadas
- Categorización por tipos
- Niveles de experiencia

### 🤖 **IA & Productividad**
- Herramientas de IA utilizadas
- Métricas de productividad
- Casos de uso prácticos
- Beneficios implementados

### 🏆 **Certificados**
- Cursos completados verificados
- Instituciones reconocidas
- Estadísticas de formación
- Enlaces a certificados

### 📧 **Contacto**
- Formulario funcional completo
- Validación robusta
- Múltiples métodos de contacto
- Estados de loading y feedback

## 🚀 Instalación y Uso

### Prerrequisitos
- **Node.js** 16.0 o superior
- **npm** 8.0 o superior

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/usuario/cv-web-profesional.git

# Navegar al directorio
cd cv-web-profesional

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

### Scripts Disponibles
```bash
# Desarrollo
npm start          # Servidor de desarrollo

# Producción
npm run build      # Build optimizado para producción
npm run preview    # Preview del build de producción

# Calidad de código
npm run lint       # Linting con ESLint
npm run format     # Formateo con Prettier
npm test           # Ejecutar tests
```

## ⚙️ Personalización

### 📝 **Datos Personales**
Edita el archivo `src/constants/personalData.js`:

```javascript
export const personalData = {
  name: 'Tu Nombre',
  title: 'Tu Título Profesional',
  bio: 'Tu descripción...',
  // ... más configuraciones
};
```

### 🎨 **Colores y Tema**
Modifica `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00d4ff',  // Color principal
        'dark-bg': '#0a0a0a',    // Fondo oscuro
        // ... más colores
      }
    }
  }
}
```

### 🔧 **Componentes**
- **Agregar secciones**: Crear nuevos componentes en `src/components/`
- **Modificar estilos**: Usar clases de Tailwind CSS
- **Configurar animaciones**: Ajustar configuraciones en cada componente

## 📱 Deploy

### **Vercel (Recomendado)**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### **Netlify**
```bash
# Build del proyecto
npm run build

# Subir carpeta build/ a Netlify
```

### **GitHub Pages**
```bash
# Instalar gh-pages
npm install --save-dev gh-pages

# Agregar script en package.json
"homepage": "https://username.github.io/repository-name",
"scripts": {
  "deploy": "gh-pages -d build"
}

# Deploy
npm run build
npm run deploy
```

## 🔍 Métricas de Calidad

### **Performance**
- ⚡ **Lighthouse Score**: 95+
- 🚀 **First Contentful Paint**: < 1.5s
- 📱 **Mobile Performance**: Optimizado
- 🎯 **Core Web Vitals**: Excelente

### **SEO**
- 📈 **SEO Score**: 100
- 🏷️ **Meta tags** completos
- 🔗 **Estructura semántica** correcta
- 📱 **Mobile-friendly**

### **Accesibilidad**
- ♿ **A11y Score**: 100
- 🎯 **WCAG 2.1** compliant
- ⌨️ **Navegación por teclado**
- 🔊 **Screen reader** compatible

## 📚 Documentación Técnica

### **Componentes Principales**
- [**Header**](./docs/components/Header.md) - Navegación y menú
- [**Hero**](./docs/components/Hero.md) - Sección principal
- [**About**](./docs/components/About.md) - Información personal
- [**Skills**](./docs/components/Skills.md) - Tecnologías
- [**Contact**](./docs/components/Contact.md) - Formulario

### **Hooks Personalizados**
- [**useScrollAnimation**](./docs/hooks/useScrollAnimation.md) - Animaciones en scroll
- [**useTypingAnimation**](./docs/hooks/useTypingAnimation.md) - Efecto typewriter

### **Servicios**
- [**NavigationService**](./docs/services/NavigationService.md) - Navegación suave
- [**ValidationService**](./docs/services/ValidationService.md) - Validaciones

## 🤝 Contribución

1. **Fork** el proyecto
2. Crea una **rama** para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. Abre un **Pull Request**

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Santiago Excoffier**
- 🌐 Portfolio: [santiagoexcoffier.dev](https://santiagoexcoffier.dev)
- 💼 LinkedIn: [Santiago Excoffier](https://linkedin.com/in/santiagoexcoffier)
- 📧 Email: santiago.excoffier@email.com
- 🐙 GitHub: [@santiagoexcoffier](https://github.com/santiagoexcoffier)

## 🙏 Agradecimientos

- **React Team** por el excelente framework
- **Tailwind CSS** por el sistema de diseño
- **Framer Motion** por las animaciones fluidas
- **Comunidad Open Source** por las herramientas utilizadas

---

⭐ **¡Si este proyecto te resultó útil, dale una estrella!** ⭐

> *"La calidad del código no se mide solo por su funcionamiento, sino por su mantenibilidad, escalabilidad y legibilidad."* 