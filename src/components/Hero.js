/**
 * Componente Hero - Sección de presentación principal
 * 
 * PRINCIPIO SOLID: Single Responsibility Principle (SRP)
 * - Responsabilidad única: mostrar la presentación principal del desarrollador
 * 
 * PRINCIPIO SOLID: Dependency Inversion Principle (DIP)
 * - Depende de abstracciones (hooks personalizados, servicios) en lugar de implementaciones concretas
 * 
 * PRINCIPIO SOLID: Open/Closed Principle (OCP)
 * - Abierto para extensión: se pueden agregar nuevos elementos sin modificar el código base
 * - Cerrado para modificación: la lógica central no cambia
 * 
 * BUENAS PRÁCTICAS:
 * - Separación de lógica en hooks personalizados
 * - Componentes especializados para diferentes partes
 * - Configuración centralizada
 * - Animaciones optimizadas
 * - Accesibilidad mejorada
 */

import React, { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaArrowDown } from 'react-icons/fa';
import PropTypes from 'prop-types';

// Importar hooks personalizados y servicios
import useTypingAnimation from '../hooks/useTypingAnimation';
import navigationService from '../services/NavigationService';
import { personalData } from '../constants/personalData';
import Button, { PrimaryButton, OutlinedButton } from './UI/Button';

/**
 * Configuración de animaciones para el Hero
 * Centralizada para facilitar mantenimiento y reutilización
 */
const HERO_ANIMATIONS = {
  container: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8, staggerChildren: 0.2 }
  },
  
  title: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.2, duration: 0.8, ease: 'easeOut' }
  },
  
  subtitle: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { delay: 0.4, duration: 0.6 }
  },
  
  description: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.6, duration: 0.6 }
  },
  
  buttons: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.8, duration: 0.6 }
  },
  
  social: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 1.0, duration: 0.6 }
  },
  
  scrollIndicator: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { delay: 1.5, duration: 0.5 }
  }
};

/**
 * Configuración de animaciones para elementos flotantes
 */
const FLOATING_ELEMENTS_ANIMATIONS = {
  float: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

/**
 * Configuración de animaciones para iconos sociales
 */
const SOCIAL_ICON_ANIMATIONS = {
  hover: { scale: 1.2, y: -5 },
  tap: { scale: 0.9 }
};

/**
 * Textos para la animación de escritura
 * Configuración centralizada para fácil modificación
 */
const TYPING_TEXTS = [
  'Desarrollador Web Full Stack',
  'Estudiante de Análisis de Sistemas',
  'Especialista en uso de herramientas de IA & Productividad',
  'Programador Freelance'
];

/**
 * Configuración de redes sociales
 * Centralizada para facilitar mantenimiento
 */
const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    icon: FaGithub,
    url: personalData.github,
    color: 'hover:text-gray-300',
    ariaLabel: 'Ver perfil de GitHub'
  },
  {
    name: 'LinkedIn',
    icon: FaLinkedin,
    url: personalData.linkedin,
    color: 'hover:text-blue-400',
    ariaLabel: 'Ver perfil de LinkedIn'
  }
];

/**
 * Componente para el texto con animación de escritura
 * Separado para mejor organización y reutilización
 */
const TypingText = ({ texts, className = '' }) => {
  // Hook personalizado para la animación de escritura
  const { currentText } = useTypingAnimation(texts, {
    typingSpeed: 100,
    deletingSpeed: 50,
    pauseTime: 2000,
    loop: true,
    startDelay: 500
  });

  return (
    <motion.div
      variants={HERO_ANIMATIONS.subtitle}
      className={`font-jetbrains h-8 ${className}`}
    >
      <span className="typing-animation">
        {currentText}
      </span>
    </motion.div>
  );
};

TypingText.propTypes = {
  texts: PropTypes.array.isRequired,
  className: PropTypes.string
};

/**
 * Componente para elementos de código flotante de fondo
 * Separado para mejor organización
 */
const FloatingCodeElements = () => {
  const codeElements = useMemo(() => [
    { 
      text: 'function hello() {', 
      position: 'top-20 left-10', 
      delay: 0 
    },
    { 
      text: "console.log('Welcome');", 
      position: 'top-40 right-20', 
      delay: 1000 
    },
    { 
      text: "const dev = 'Santiago';", 
      position: 'bottom-40 left-20', 
      delay: 2000 
    },
    { 
      text: '}', 
      position: 'bottom-20 right-10', 
      delay: 3000 
    }
  ], []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {codeElements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.position} text-neon-blue/10 font-jetbrains text-sm`}
          animate={FLOATING_ELEMENTS_ANIMATIONS.float}
          style={{ 
            animationDelay: `${element.delay}ms`,
            animationDuration: '3s'
          }}
        >
          {element.text}
        </motion.div>
      ))}
    </div>
  );
};

/**
 * Componente para el título principal
 * Separado para mejor legibilidad
 */
const HeroTitle = () => (
  <motion.h1
    variants={HERO_ANIMATIONS.title}
    className="text-4xl md:text-6xl font-bold text-dark-text mb-4 font-jetbrains"
  >
    Hola, Soy{' '}
    <span className="text-neon-blue">{personalData.name}</span>
  </motion.h1>
);

/**
 * Componente para la descripción principal
 * Separado para mejor organización
 */
const HeroDescription = () => (
  <motion.p
    variants={HERO_ANIMATIONS.description}
    className="text-lg text-dark-text/70 mb-8 max-w-2xl mx-auto leading-relaxed"
  >
    {personalData.bio}
  </motion.p>
);

/**
 * Componente para los botones de acción principales
 * Separado para mejor organización y reutilización
 */
const HeroButtons = ({ onAboutClick, onDownloadClick }) => (
  <motion.div
    variants={HERO_ANIMATIONS.buttons}
    className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
  >
    <PrimaryButton
      onClick={onAboutClick}
      leftIcon={<FaArrowDown className="text-sm" />}
      animation="glow"
      size="lg"
      aria-label="Ver perfil completo"
    >
      Ver Perfil Completo
    </PrimaryButton>
    
    <OutlinedButton
      onClick={onDownloadClick}
      leftIcon={null}
      animation="scale"
      size="lg"
      aria-label="Contáctame"
    >
      Contáctame
    </OutlinedButton>
  </motion.div>
);

HeroButtons.propTypes = {
  onAboutClick: PropTypes.func.isRequired,
  onDownloadClick: PropTypes.func.isRequired
};

/**
 * Componente para los enlaces sociales
 * Separado para mejor organización
 */
const SocialLinks = () => (
  <motion.div
    variants={HERO_ANIMATIONS.social}
    className="flex justify-center gap-6"
    role="list"
    aria-label="Enlaces a redes sociales"
  >
    {SOCIAL_LINKS.map((social) => (
      <motion.a
        key={social.name}
        href={social.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-dark-text/70 ${social.color} transition-colors duration-300 text-2xl focus:outline-none focus:ring-2 focus:ring-neon-blue/50 focus:ring-offset-2 focus:ring-offset-dark-bg rounded-lg p-2`}
        aria-label={social.ariaLabel}
        whileHover={SOCIAL_ICON_ANIMATIONS.hover}
        whileTap={SOCIAL_ICON_ANIMATIONS.tap}
        role="listitem"
      >
        <social.icon />
      </motion.a>
    ))}
  </motion.div>
);

/**
 * Componente para el indicador de scroll
 * Separado para mejor organización
 */
const ScrollIndicator = ({ onClick }) => (
  <motion.div
    variants={HERO_ANIMATIONS.scrollIndicator}
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
  >
    <motion.button
      onClick={onClick}
      className="text-neon-blue/50 text-2xl cursor-pointer hover:text-neon-blue transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-neon-blue/50 focus:ring-offset-2 focus:ring-offset-dark-bg rounded-lg p-2"
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      aria-label="Desplazarse hacia abajo"
    >
      <FaArrowDown />
    </motion.button>
  </motion.div>
);

ScrollIndicator.propTypes = {
  onClick: PropTypes.func.isRequired
};

/**
 * Componente Hero principal
 * Orquesta todos los sub-componentes y maneja la lógica de interacción
 */
const Hero = () => {
  /**
   * Maneja la navegación a la sección About
   * Usa useCallback para optimización de rendimiento
   */
  const handleScrollToAbout = useCallback(() => {
    navigationService.navigateToSection('about');
  }, []);

  /**
   * Maneja la navegación a la sección de contacto para descarga
   * En una implementación real, esto podría abrir un modal o descargar directamente
   */
  const handleDownloadCV = useCallback(() => {
    // Por ahora navegamos a contacto, pero se puede implementar descarga directa
    navigationService.navigateToSection('contact');
    
    // TODO: Implementar descarga directa del CV
    // const link = document.createElement('a');
    // link.href = '/cv-nitemplem.pdf';
    // link.download = 'CV-Nitemplem-Developer.pdf';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  }, []);

  return (
    <motion.section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      variants={HERO_ANIMATIONS.container}
      initial="initial"
      animate="animate"
      role="banner"
      aria-label="Sección de presentación principal"
    >
      {/* Elementos flotantes de fondo */}
      <FloatingCodeElements />

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={HERO_ANIMATIONS.container}
        >
          {/* Título principal */}
          <HeroTitle />

          {/* Texto con animación de escritura */}
          <TypingText 
            texts={TYPING_TEXTS}
            className="text-xl md:text-2xl text-dark-text/80 mb-8"
          />

          {/* Descripción */}
          <HeroDescription />

          {/* Botones de acción */}
          <HeroButtons
            onAboutClick={handleScrollToAbout}
            onDownloadClick={handleDownloadCV}
          />

          {/* Enlaces sociales */}
          <SocialLinks />
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <ScrollIndicator onClick={handleScrollToAbout} />
    </motion.section>
  );
};

// Asignar displayName para debugging
Hero.displayName = 'Hero';

export default Hero; 