/**
 * Datos personales centralizados
 * 
 * PRINCIPIO SOLID: Single Responsibility Principle (SRP)
 * - Responsabilidad única: almacenar y exportar datos personales
 * 
 * PRINCIPIO SOLID: Open/Closed Principle (OCP)
 * - Abierto para extensión: se pueden agregar nuevos campos fácilmente
 * - Cerrado para modificación: la estructura base no cambia
 * 
 * BUENAS PRÁCTICAS:
 * - Datos centralizados para fácil mantenimiento
 * - Estructura clara y bien documentada
 * - Fácil personalización
 * - Separación de configuración y lógica
 */

/**
 * Información personal básica
 * Datos principales del desarrollador
 */
export const personalData = {
  // Información básica
  name: 'Santiago Excofier',
  title: 'Desarrollador Full-Stack',
  subtitle: 'Especializado en JavaScript & IA',
  bio: 'Graduado en Desarrollo Web y Software en Escuela Da Vinci (finalizado en diciembre 2025) con más de 3 años de experiencia en desarrollo web y software. Apasionado por la inteligencia artificial, desarrollo web y productividad.',
  
  // Ubicación y contacto
  location: 'Argentina',
  timezone: 'UTC-3',
  
  // Formación académica
  university: 'Analista de Sistemas - Escuela Da Vinci',
  graduationYear: '2026',
  expectedGraduation: 'Inicios de 2026',
  
  // Experiencia profesional
  experienceYears: '3',
  freelanceStartYear: '2022',
  workStatus: 'Freelance',
  availability: 'Disponible para proyectos',
  
  // Especialización
  specialization: 'Full-Stack Development & IA',
  mainTechnologies: ['JavaScript', 'React', 'Python', 'Java', 'PHP'],
  
  // Estadísticas
  projectsCompleted: '20+',
  clientsServed: '10+',
  technologiesUsed: '15+',
  
  // Valores y principios
  workingStyle: 'Remoto/Presencial',
  methodology: 'Metodologías Ágiles',
  focusAreas: ['Desarrollo Web', 'Desarrollo de Software', 'IA/Productividad', 'Desarrollo Full-Stack'],
  
  // Intereses
  interests: ['Inteligencia Artificial', 'Desarrollo Web', 'Desarrollo de Software', 'Productividad', 'Nuevas Tecnologías'],
  
  // Idiomas
  languages: [
    { name: 'Español', level: 'Nativo' },
    { name: 'Inglés', level: 'Intermedio' }
  ]
};

/**
 * Información de contacto
 * Datos de contacto y redes sociales
 */
export const contactData = {
  email: 'excofier.santi@gmail.com',
  phone: '+54 11 6812-9155',
  freelanceStartYear: '',
  workStatus: '',
  // Redes sociales (agregar URLs reales)
  social: {
    github: 'https://github.com/EXCOFFee',
    linkedin: 'https://www.linkedin.com/in/santiago-excofier-4649982b9/',
    portfolio: 'https://santiagoexcofier.dev'
  },
  
  // Disponibilidad
  availability: {
    status: 'Respuesta a la Brevedad',
    workingHours: '9:00 - 18:00 (UTC-3)',
    responseTime: '24 horas',
    preferredContact: 'email'
  }
};

/**
 * Configuración de marca personal
 * Colores, tipografías y elementos visuales
 */
export const brandData = {
  // Colores principales
  colors: {
    primary: '#00d4ff',
    secondary: '#1a1a1a',
    accent: '#ffffff',
    background: '#0a0a0a'
  },
  
  // Tipografías
  fonts: {
    primary: 'JetBrains Mono',
    secondary: 'Inter',
    display: 'Space Grotesk'
  },
  
  // Logo y elementos visuales
  logo: {
    text: 'SE',
    fullName: 'Santiago Excofier',
    tagline: 'Desarrollador Full-Stack'
  }
};

/**
 * Textos predefinidos para la animación del hero
 * Frases que se mostrarán en el efecto typewriter
 */
export const heroTexts = [
  'Desarrollador Full-Stack',
  'Especialista en JavaScript',
  'Entusiasta de la IA',
  'Desarrollador Web',
  'Estudiante de Desarrollo Web',
  'Innovador Tecnológico'
];

/**
 * Configuración de animaciones y transiciones
 * Valores para consistencia visual
 */
export const animationConfig = {
  // Duraciones
  durations: {
    fast: 0.3,
    medium: 0.6,
    slow: 1.0,
    typewriter: 100
  },
  
  // Delays
  delays: {
    stagger: 0.1,
    section: 0.2,
    item: 0.05
  },
  
  // Easings
  easings: {
    default: 'easeOut',
    bounce: 'easeInOut',
    spring: 'spring'
  }
};

/**
 * Configuración de contacto del formulario
 * Configuración para el formulario de contacto
 */
export const formConfig = {
  // Campos requeridos
  requiredFields: ['name', 'email', 'message'],
  
  // Validaciones
  validation: {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[\+]?[1-9][\d]{0,15}$/,
    minMessageLength: 10,
    maxMessageLength: 500
  },
  
  // Mensajes
  messages: {
    success: '¡Mensaje enviado correctamente! Te responderé pronto.',
    error: 'Hubo un error al enviar el mensaje. Por favor intenta nuevamente.',
    loading: 'Enviando mensaje...'
  }
};

/**
 * Configuración de navegación
 * Elementos del menú de navegación
 */
export const navigationConfig = {
  // Menú principal
  mainMenu: [
    { id: 'home', label: 'Inicio', href: '#home' },
    { id: 'about', label: 'Sobre mí', href: '#about' },
    { id: 'skills', label: 'Tecnologías', href: '#skills' },
    { id: 'ai-productivity', label: 'IA & Productividad', href: '#ai-productivity' },
    { id: 'certificates', label: 'Certificados', href: '#certificates' },
    { id: 'contact', label: 'Contacto', href: '#contact' }
  ],
  
  // Configuración del header
  header: {
    logo: 'SE',
    showSocial: true,
    sticky: true
  }
};

/**
 * Función para obtener el saludo según la hora
 * @returns {string} Saludo apropiado para la hora actual
 */
export const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();
  
  if (hour < 12) {
    return '¡Buenos días!';
  } else if (hour < 18) {
    return '¡Buenas tardes!';
  } else {
    return '¡Buenas noches!';
  }
};

/**
 * Función para calcular la edad
 * @param {string} birthDate - Fecha de nacimiento en formato YYYY-MM-DD
 * @returns {number} Edad actual
 */
export const calculateAge = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

/**
 * Función para formatear la fecha de última actualización
 * @returns {string} Fecha formateada
 */
export const getLastUpdated = () => {
  return new Date().toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Exportar todo como un objeto default para facilitar importación
export default {
  personalData,
  contactData,
  brandData,
  heroTexts,
  animationConfig,
  formConfig,
  navigationConfig,
  getTimeBasedGreeting,
  calculateAge,
  getLastUpdated
}; 