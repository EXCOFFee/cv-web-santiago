/**
 * Componente Header - Barra de navegación principal
 * 
 * PRINCIPIO SOLID: Single Responsibility Principle (SRP)
 * - Responsabilidad única: renderizar la barra de navegación y manejar la UI del menú
 * 
 * PRINCIPIO SOLID: Dependency Inversion Principle (DIP)
 * - Depende de abstracciones (NavigationService) en lugar de implementaciones concretas
 * 
 * PRINCIPIO SOLID: Open/Closed Principle (OCP)
 * - Abierto para extensión: se pueden agregar nuevos elementos de navegación
 * - Cerrado para modificación: la lógica central no cambia
 * 
 * BUENAS PRÁCTICAS:
 * - Manejo de estado local para UI (menú móvil, scroll)
 * - Efectos de scroll con cleanup
 * - Accesibilidad (aria-labels, roles)
 * - Responsive design
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';

// Importar servicios y hooks personalizados
import navigationService from '../services/NavigationService';
import useScrollAnimation from '../hooks/useScrollAnimation';

/**
 * Configuración de animaciones para el header
 * Centralizada para facilitar mantenimiento
 */
const HEADER_ANIMATIONS = {
  initial: { y: -100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.8, ease: 'easeOut' }
};

/**
 * Configuración de animaciones para los elementos del menú
 */
const MENU_ITEM_ANIMATIONS = {
  hidden: { opacity: 0, y: -20 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1 + 0.5,
      duration: 0.5,
      ease: 'easeOut'
    }
  })
};

/**
 * Configuración de animaciones para el menú móvil
 */
const MOBILE_MENU_ANIMATIONS = {
  hidden: { opacity: 0, height: 0 },
  visible: { 
    opacity: 1, 
    height: 'auto',
    transition: { 
      duration: 0.3,
      ease: 'easeInOut'
    }
  },
  exit: { 
    opacity: 0, 
    height: 0,
    transition: { 
      duration: 0.2,
      ease: 'easeInOut'
    }
  }
};

/**
 * Hook personalizado para manejar el estado del scroll
 * Optimizado con useCallback para evitar re-renders innecesarios
 */
const useScrollState = (threshold = 50) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const offset = window.scrollY;
    setIsScrolled(offset > threshold);
  }, [threshold]);

  useEffect(() => {
    // Verificar el estado inicial
    handleScroll();

    // Añadir listener de scroll
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup: remover listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return isScrolled;
};

/**
 * Componente para el logo del header
 * Separado para mejorar la organización y reutilización
 */
const HeaderLogo = ({ onClick, className = '' }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`text-2xl font-bold text-neon-blue font-jetbrains transition-colors duration-300 hover:text-neon-blue/80 focus:outline-none focus:ring-2 focus:ring-neon-blue/50 focus:ring-offset-2 focus:ring-offset-dark-bg rounded-lg px-2 py-1 ${className}`}
    aria-label="Ir al inicio"
  >
    &lt;Santiago /&gt;
  </motion.button>
);

HeaderLogo.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string
};

/**
 * Componente para los elementos de navegación del desktop
 * Separado para mejor organización del código
 */
const DesktopNavigation = ({ items, activeSection, onItemClick }) => (
  <ul className="hidden md:flex space-x-8" role="menubar">
    {items.map((item, index) => (
      <motion.li
        key={item.id}
        custom={index}
        initial="hidden"
        animate="visible"
        variants={MENU_ITEM_ANIMATIONS}
        role="none"
      >
        <button
          onClick={() => onItemClick(item.href)}
          className={`
            relative px-3 py-2 text-sm font-medium font-jetbrains 
            transition-all duration-300 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-neon-blue/50 
            focus:ring-offset-2 focus:ring-offset-dark-bg
            ${activeSection === item.id 
              ? 'text-neon-blue bg-neon-blue/10' 
              : 'text-dark-text hover:text-neon-blue hover:bg-dark-card/50'
            }
          `}
          aria-current={activeSection === item.id ? 'page' : undefined}
          role="menuitem"
        >
          {item.name}
          
          {/* Indicador de sección activa */}
          {activeSection === item.id && (
            <motion.div
              layoutId="activeIndicator"
              className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-neon-blue rounded-full"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </button>
      </motion.li>
    ))}
  </ul>
);

DesktopNavigation.propTypes = {
  items: PropTypes.array.isRequired,
  activeSection: PropTypes.string,
  onItemClick: PropTypes.func.isRequired
};

/**
 * Componente para el botón del menú móvil
 * Separado para mejor organización
 */
const MobileMenuButton = ({ isOpen, onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="md:hidden text-neon-blue text-2xl p-2 rounded-lg hover:bg-dark-card/50 focus:outline-none focus:ring-2 focus:ring-neon-blue/50 focus:ring-offset-2 focus:ring-offset-dark-bg transition-colors duration-300"
    aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
    aria-expanded={isOpen}
    aria-controls="mobile-menu"
  >
    <motion.div
      initial={false}
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {isOpen ? <FaTimes /> : <FaBars />}
    </motion.div>
  </motion.button>
);

MobileMenuButton.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

/**
 * Componente para la navegación móvil
 * Separado para mejor organización
 */
const MobileNavigation = ({ items, activeSection, isOpen, onItemClick }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        id="mobile-menu"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={MOBILE_MENU_ANIMATIONS}
        className="md:hidden overflow-hidden border-t border-dark-border"
        role="menu"
        aria-orientation="vertical"
      >
        <ul className="py-4 space-y-2 bg-dark-bg/95 backdrop-blur-md">
          {items.map((item, index) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                transition: { delay: index * 0.1, duration: 0.3 }
              }}
              role="none"
            >
              <button
                onClick={() => onItemClick(item.href)}
                className={`
                  block w-full text-left py-3 px-6 font-jetbrains font-medium
                  transition-all duration-300 rounded-lg mx-2
                  focus:outline-none focus:ring-2 focus:ring-neon-blue/50 
                  focus:ring-offset-2 focus:ring-offset-dark-bg
                  ${activeSection === item.id 
                    ? 'text-neon-blue bg-neon-blue/10 border-l-4 border-neon-blue' 
                    : 'text-dark-text hover:text-neon-blue hover:bg-dark-card/50 hover:border-l-4 hover:border-neon-blue/50'
                  }
                `}
                aria-current={activeSection === item.id ? 'page' : undefined}
                role="menuitem"
              >
                <span className="flex items-center">
                  {item.name}
                  {activeSection === item.id && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="ml-2 w-2 h-2 bg-neon-blue rounded-full"
                    />
                  )}
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    )}
  </AnimatePresence>
);

MobileNavigation.propTypes = {
  items: PropTypes.array.isRequired,
  activeSection: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onItemClick: PropTypes.func.isRequired
};

/**
 * Componente Header principal
 * Componente principal que orquesta todos los sub-componentes
 */
const Header = () => {
  // Estados locales para UI
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Hook personalizado para detectar scroll
  const isScrolled = useScrollState(50);

  // Obtener elementos de navegación del servicio
  // Usamos useMemo para evitar recálculos innecesarios
  const navigationItems = useMemo(() => {
    return navigationService.getNavigationItems();
  }, []);

  /**
   * Maneja la navegación a una sección
   * Usa useCallback para optimización de rendimiento
   */
  const handleNavigation = useCallback((href) => {
    // Usar el servicio de navegación para manejar el scroll
    const success = navigationService.navigateToHref(href);
    
    if (success) {
      // Actualizar la sección activa
      const sectionId = href.replace('#', '');
      setActiveSection(sectionId);
      
      // Cerrar el menú móvil si está abierto
      setIsMobileMenuOpen(false);
    }
  }, []);

  /**
   * Maneja la navegación al logo (inicio)
   */
  const handleLogoClick = useCallback(() => {
    handleNavigation('#hero');
  }, [handleNavigation]);

  /**
   * Alterna el estado del menú móvil
   */
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  // Efecto para cerrar el menú móvil al redimensionar la ventana
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Efecto para detectar la sección activa basada en el scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map(item => document.querySelector(item.href));
      const scrollPosition = window.scrollY + 100; // Offset para el header

      let currentSection = 'hero';
      
      sections.forEach((section, index) => {
        if (section && section.offsetTop <= scrollPosition) {
          currentSection = navigationItems[index].id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navigationItems]);

  /**
   * Genera las clases CSS dinámicas del header
   */
  const getHeaderClasses = useMemo(() => {
    return `
      fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${isScrolled 
        ? 'bg-dark-bg/90 backdrop-blur-md border-b border-dark-border shadow-lg' 
        : 'bg-transparent'
      }
    `;
  }, [isScrolled]);

  return (
    <motion.header
      initial={HEADER_ANIMATIONS.initial}
      animate={HEADER_ANIMATIONS.animate}
      transition={HEADER_ANIMATIONS.transition}
      className={getHeaderClasses}
      role="banner"
    >
      <nav 
        className="container mx-auto px-4 py-4" 
        role="navigation" 
        aria-label="Navegación principal"
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <HeaderLogo onClick={handleLogoClick} />

          {/* Navegación Desktop */}
          <DesktopNavigation
            items={navigationItems}
            activeSection={activeSection}
            onItemClick={handleNavigation}
          />

          {/* Botón de menú móvil */}
          <MobileMenuButton
            isOpen={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          />
        </div>

        {/* Navegación móvil */}
        <MobileNavigation
          items={navigationItems}
          activeSection={activeSection}
          isOpen={isMobileMenuOpen}
          onItemClick={handleNavigation}
        />
      </nav>
    </motion.header>
  );
};

// Asignar displayName para debugging
Header.displayName = 'Header';

export default Header; 