/**
 * Componente principal App - Aplicación de CV web
 * 
 * PRINCIPIO SOLID: Single Responsibility Principle (SRP)
 * - Responsabilidad única: orquestar todos los componentes de la aplicación
 * 
 * PRINCIPIO SOLID: Open/Closed Principle (OCP)
 * - Abierto para extensión: se pueden agregar nuevas secciones sin modificar el código base
 * - Cerrado para modificación: la estructura central no cambia
 * 
 * PRINCIPIO SOLID: Dependency Inversion Principle (DIP)
 * - Depende de abstracciones (componentes modulares, servicios) en lugar de implementaciones concretas
 * 
 * BUENAS PRÁCTICAS:
 * - Estructura modular y escalable
 * - Lazy loading para optimización
 * - Error boundaries para manejo de errores
 * - Configuración centralizada
 * - Accesibilidad completa
 * - SEO optimizado
 */

import React, { Suspense, lazy, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSpinner, FaExclamationTriangle, FaArrowUp } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ParticleBackground from './components/ParticleBackground';
import Portfolio from './components/Portfolio';
import { NavigationService } from './services/NavigationService';
import { personalData } from './constants/personalData';

// Lazy loading de componentes para optimización
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const AIProductivity = lazy(() => import('./components/AIProductivity'));
const Certificates = lazy(() => import('./components/Certificates'));
const Contact = lazy(() => import('./components/Contact'));

/**
 * Configuración de la aplicación
 * Centralizada para fácil mantenimiento
 */
const APP_CONFIG = {
  title: `${personalData.name} - ${personalData.title}`,
  description: personalData.bio,
  theme: {
    primary: '#00d4ff',
    background: '#0a0a0a',
    text: '#ffffff'
  },
  scrollBehavior: 'smooth',
  loadingTimeout: 10000, // 10 segundos
  retryAttempts: 3
};

/**
 * Configuración de animaciones globales
 */
const APP_ANIMATIONS = {
  pageTransition: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5, ease: 'easeInOut' }
  },

  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8 }
  },

  slideUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },

  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.4, ease: 'easeOut' }
  }
};

/**
 * Componente de loading personalizado
 * Muestra un spinner elegante mientras cargan los componentes
 */
const LoadingSpinner = ({ message = 'Cargando...' }) => (
  <motion.div
    variants={APP_ANIMATIONS.fadeIn}
    initial="initial"
    animate="animate"
    className="flex flex-col items-center justify-center py-20"
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className="mb-4"
    >
      <FaSpinner className="text-4xl text-neon-blue" />
    </motion.div>
    <p className="text-dark-text/70 text-lg">{message}</p>
    <div className="mt-4 w-32 h-1 bg-dark-border rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-neon-blue"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  </motion.div>
);

LoadingSpinner.propTypes = {
  message: PropTypes.string
};

/**
 * Componente de error personalizado
 * Muestra errores de carga de manera elegante
 */
const ErrorFallback = ({ error, resetError, componentName }) => (
  <motion.div
    variants={APP_ANIMATIONS.slideUp}
    initial="initial"
    animate="animate"
    className="flex flex-col items-center justify-center py-20 text-center"
  >
    <FaExclamationTriangle className="text-6xl text-red-400 mb-6" />
    <h2 className="text-2xl font-bold text-dark-text mb-4">
      Error al cargar {componentName}
    </h2>
    <p className="text-dark-text/70 mb-6 max-w-md">
      Hubo un problema al cargar esta sección. Por favor, intenta nuevamente.
    </p>
    <div className="space-x-4">
      <button
        onClick={resetError}
        className="px-6 py-3 bg-neon-blue text-dark-bg rounded-lg hover:bg-neon-blue/90 transition-colors"
      >
        Reintentar
      </button>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-3 bg-dark-border text-dark-text rounded-lg hover:bg-dark-border/80 transition-colors"
      >
        Recargar página
      </button>
    </div>
    {process.env.NODE_ENV === 'development' && (
      <details className="mt-6 p-4 bg-dark-card rounded-lg max-w-2xl">
        <summary className="cursor-pointer text-sm text-dark-text/70 mb-2">
          Detalles del error (desarrollo)
        </summary>
        <pre className="text-xs text-red-400 overflow-auto">
          {error.message}
        </pre>
      </details>
    )}
  </motion.div>
);

ErrorFallback.propTypes = {
  error: PropTypes.object.isRequired,
  resetError: PropTypes.func.isRequired,
  componentName: PropTypes.string.isRequired
};

/**
 * Higher-Order Component para manejo de errores
 * Envuelve componentes con error boundary
 */
const withErrorBoundary = (Component, componentName) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
      console.error(`Error en ${componentName}:`, error, errorInfo);
    }

    render() {
      if (this.state.hasError) {
        return (
          <ErrorFallback
            error={this.state.error}
            resetError={() => this.setState({ hasError: false, error: null })}
            componentName={componentName}
          />
        );
      }

      return <Component {...this.props} />;
    }
  };
};

/**
 * Componente de sección lazy con error boundary
 */
const LazySection = ({ component: Component, name, ...props }) => {
  const [retryCount, setRetryCount] = useState(0);
  const [hasError, setHasError] = useState(false);

  const resetError = useCallback(() => {
    setHasError(false);
    setRetryCount(prev => prev + 1);
  }, []);

  const WrappedComponent = withErrorBoundary(Component, name);

  return (
    <Suspense 
      fallback={
        <LoadingSpinner message={`Cargando ${name}...`} />
      }
    >
      <WrappedComponent key={retryCount} {...props} />
    </Suspense>
  );
};

LazySection.propTypes = {
  component: PropTypes.elementType.isRequired,
  name: PropTypes.string.isRequired
};

/**
 * Componente del botón "Volver arriba"
 */
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 bg-neon-blue text-dark-bg rounded-full shadow-lg hover:shadow-neon-blue/50 transition-all duration-300 hover:scale-110"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Volver arriba"
        >
          <FaArrowUp className="text-xl" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

/**
 * Hook personalizado para configurar la aplicación
 */
const useAppSetup = () => {
  useEffect(() => {
    // Configurar título y meta tags
    document.title = APP_CONFIG.title;
    
    // Configurar meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = APP_CONFIG.description;
    }

    // Configurar theme color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.content = APP_CONFIG.theme.primary;
    }

    // Configurar scroll behavior
    document.documentElement.style.scrollBehavior = APP_CONFIG.scrollBehavior;

    // Configurar variables CSS personalizadas
    const root = document.documentElement;
    root.style.setProperty('--primary-color', APP_CONFIG.theme.primary);
    root.style.setProperty('--background-color', APP_CONFIG.theme.background);
    root.style.setProperty('--text-color', APP_CONFIG.theme.text);

    // Cleanup
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Configurar service worker para PWA (si está disponible)
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    }
  }, []);
};

/**
 * Componente principal de la aplicación
 * Orquesta todos los componentes y secciones
 */
const App = () => {
  // Configurar la aplicación
  useAppSetup();

  // Instanciar servicio de navegación
  const navigationService = new NavigationService();

  // Configurar navegación suave
  useEffect(() => {
    navigationService.setupSmoothScrolling();
    
    return () => {
      navigationService.cleanup();
    };
  }, [navigationService]);

  return (
    <Router>
      <div className="App">
        <ParticleBackground />
        <Header />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Hero />
          <LazySection component={About} name="Sobre mí" />
          <LazySection component={Skills} name="Tecnologías" />
          <Portfolio />
          <LazySection component={AIProductivity} name="IA & Productividad" />
          <LazySection component={Certificates} name="Certificados" />
          <LazySection component={Contact} name="Contacto" />
        </motion.main>
        <footer className="bg-dark-card/50 backdrop-blur-sm border-t border-dark-border py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <p className="text-dark-text/70">
                  © {new Date().getFullYear()} Santiago Excofier. Todos los derechos reservados.
                </p>
                <p className="text-dark-text/50 text-sm mt-1">
                  Desarrollado con React, Tailwind CSS y ❤️
                </p>
              </div>
              <div className="flex gap-4 text-sm text-dark-text/70">
                <a href="#privacy" className="hover:text-neon-blue transition-colors">
                  Privacidad
                </a>
                <a href="#terms" className="hover:text-neon-blue transition-colors">
                  Términos
                </a>
                <a href="#cookies" className="hover:text-neon-blue transition-colors">
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </footer>
        <ScrollToTopButton />
      </div>
    </Router>
  );
};

// Configurar displayName para debugging
App.displayName = 'App';

export default App; 