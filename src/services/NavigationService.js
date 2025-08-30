/**
 * Servicio de Navegación
 * 
 * PRINCIPIO SOLID: Dependency Inversion Principle (DIP)
 * - Los componentes de alto nivel no dependen de implementaciones concretas
 * - Dependen de abstracciones (este servicio)
 * 
 * PRINCIPIO SOLID: Single Responsibility Principle (SRP)
 * - Responsabilidad única: manejar toda la lógica de navegación
 * 
 * PRINCIPIO: Interface Segregation Principle (ISP)
 * - Proporciona métodos específicos para diferentes tipos de navegación
 */

/**
 * Configuración de navegación de la aplicación
 * Define todas las secciones disponibles y sus propiedades
 */
export const NAVIGATION_CONFIG = {
  HERO: {
    id: 'hero',
    name: 'Inicio',
    href: '#hero',
    order: 1
  },
  ABOUT: {
    id: 'about',
    name: 'Sobre mí',
    href: '#about',
    order: 2
  },
  SKILLS: {
    id: 'skills',
    name: 'Habilidades',
    href: '#skills',
    order: 3
  },
  AI_PRODUCTIVITY: {
    id: 'ai-productivity',
    name: 'IA & Productividad',
    href: '#ai-productivity',
    order: 4
  },
  CERTIFICATES: {
    id: 'certificates',
    name: 'Certificados',
    href: '#certificates',
    order: 5
  },
  CONTACT: {
    id: 'contact',
    name: 'Contacto',
    href: '#contact',
    order: 6
  }
};

/**
 * Clase NavigationService
 * Maneja toda la lógica de navegación de la aplicación
 */
class NavigationService {
  /**
   * Constructor del servicio
   * Inicializa las configuraciones por defecto
   */
  constructor() {
    // Configuración por defecto para el scroll suave
    this.scrollOptions = {
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    };
    
    // Offset para compensar el header fijo
    this.headerOffset = 80;
  }

  /**
   * Navega a una sección específica por ID
   * 
   * @param {string} sectionId - ID de la sección destino
   * @param {Object} options - Opciones adicionales para el scroll
   * @returns {boolean} - True si la navegación fue exitosa
   */
  navigateToSection(sectionId, options = {}) {
    try {
      // Validar que el sectionId es válido
      if (!sectionId || typeof sectionId !== 'string') {
        console.warn('NavigationService: sectionId inválido', sectionId);
        return false;
      }

      // Buscar el elemento en el DOM
      const element = document.querySelector(`#${sectionId}`);
      
      if (!element) {
        console.warn(`NavigationService: No se encontró la sección con ID "${sectionId}"`);
        return false;
      }

      // Calcular la posición final considerando el offset del header
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - this.headerOffset;

      // Realizar el scroll suave
      window.scrollTo({
        top: offsetPosition,
        ...this.scrollOptions,
        ...options
      });

      // Actualizar la URL sin recargar la página
      this.updateURL(sectionId);

      return true;
    } catch (error) {
      console.error('NavigationService: Error al navegar a la sección', error);
      return false;
    }
  }

  /**
   * Navega usando un href (formato #section)
   * 
   * @param {string} href - Href de la sección (ej: "#about")
   * @param {Object} options - Opciones adicionales
   * @returns {boolean} - True si la navegación fue exitosa
   */
  navigateToHref(href, options = {}) {
    try {
      // Extraer el ID de la sección del href
      const sectionId = href.replace('#', '');
      return this.navigateToSection(sectionId, options);
    } catch (error) {
      console.error('NavigationService: Error al navegar con href', error);
      return false;
    }
  }

  /**
   * Obtiene todas las secciones de navegación ordenadas
   * 
   * @returns {Array} - Array de secciones ordenadas
   */
  getNavigationItems() {
    return Object.values(NAVIGATION_CONFIG)
      .sort((a, b) => a.order - b.order);
  }

  /**
   * Obtiene información de una sección específica
   * 
   * @param {string} sectionId - ID de la sección
   * @returns {Object|null} - Información de la sección o null
   */
  getSectionInfo(sectionId) {
    return Object.values(NAVIGATION_CONFIG)
      .find(section => section.id === sectionId) || null;
  }

  /**
   * Verifica si una sección existe
   * 
   * @param {string} sectionId - ID de la sección a verificar
   * @returns {boolean} - True si la sección existe
   */
  sectionExists(sectionId) {
    return this.getSectionInfo(sectionId) !== null;
  }

  /**
   * Actualiza la URL del navegador sin recargar la página
   * 
   * @param {string} sectionId - ID de la sección para la URL
   */
  updateURL(sectionId) {
    try {
      // Verificar si el browser soporta History API
      if (window.history && window.history.pushState) {
        const newURL = `${window.location.origin}${window.location.pathname}#${sectionId}`;
        window.history.replaceState(null, '', newURL);
      }
    } catch (error) {
      console.error('NavigationService: Error al actualizar URL', error);
    }
  }

  /**
   * Obtiene la sección activa basada en la URL actual
   * 
   * @returns {string|null} - ID de la sección activa o null
   */
  getCurrentSection() {
    try {
      const hash = window.location.hash.replace('#', '');
      return this.sectionExists(hash) ? hash : null;
    } catch (error) {
      console.error('NavigationService: Error al obtener sección actual', error);
      return null;
    }
  }

  /**
   * Configura el offset para el header fijo
   * 
   * @param {number} offset - Nuevo offset en píxeles
   */
  setHeaderOffset(offset) {
    if (typeof offset === 'number' && offset >= 0) {
      this.headerOffset = offset;
    }
  }

  /**
   * Configura opciones de scroll personalizadas
   * 
   * @param {Object} options - Nuevas opciones de scroll
   */
  setScrollOptions(options) {
    this.scrollOptions = { ...this.scrollOptions, ...options };
  }

  /**
   * Configura el scroll suave para toda la aplicación
   * Este método se llama al inicializar la aplicación
   */
  setupSmoothScrolling() {
    try {
      // Configurar scroll behavior global
      document.documentElement.style.scrollBehavior = 'smooth';
      
      // Configurar event listeners para navegación por hash
      this.setupHashNavigation();
      
      console.log('NavigationService: Scroll suave configurado correctamente');
    } catch (error) {
      console.error('NavigationService: Error al configurar scroll suave', error);
    }
  }

  /**
   * Configura la navegación por hash en la aplicación
   */
  setupHashNavigation() {
    // Manejar navegación por hash al cargar la página
    if (window.location.hash) {
      const sectionId = window.location.hash.replace('#', '');
      if (this.sectionExists(sectionId)) {
        // Usar setTimeout para asegurar que el DOM esté listo
        setTimeout(() => {
          this.navigateToSection(sectionId);
        }, 100);
      }
    }

    // Escuchar cambios en el hash
    window.addEventListener('hashchange', () => {
      const sectionId = window.location.hash.replace('#', '');
      if (this.sectionExists(sectionId)) {
        this.navigateToSection(sectionId);
      }
    });
  }

  /**
   * Limpia los event listeners y configuraciones
   * Se llama al desmontar la aplicación
   */
  cleanup() {
    try {
      // Remover scroll behavior global
      document.documentElement.style.scrollBehavior = 'auto';
      
      // Aquí se podrían remover event listeners si fuera necesario
      console.log('NavigationService: Limpieza completada');
    } catch (error) {
      console.error('NavigationService: Error durante la limpieza', error);
    }
  }
}

// Crear y exportar una instancia singleton del servicio
const navigationService = new NavigationService();

// Exportar tanto la clase como la instancia
export { NavigationService };
export default navigationService; 