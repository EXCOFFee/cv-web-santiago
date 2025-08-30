/**
 * Componente Button Reutilizable
 * 
 * PRINCIPIO SOLID: Single Responsibility Principle (SRP)
 * - Responsabilidad única: renderizar botones con diferentes variantes y estados
 * 
 * PRINCIPIO SOLID: Open/Closed Principle (OCP)
 * - Abierto para extensión: se pueden agregar nuevas variantes sin modificar el código base
 * - Cerrado para modificación: la lógica central del botón no cambia
 * 
 * PRINCIPIO: Interface Segregation Principle (ISP)
 * - Proporciona una interfaz simple y específica para botones
 * - No fuerza a los componentes a depender de propiedades que no usan
 */

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Configuración de variantes de botón
 * Centralizada para facilitar mantenimiento y extensión
 */
const BUTTON_VARIANTS = {
  primary: {
    base: 'bg-neon-blue text-dark-bg hover:bg-neon-blue/90',
    outlined: 'border-2 border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-dark-bg',
    ghost: 'text-neon-blue hover:bg-neon-blue/10'
  },
  secondary: {
    base: 'bg-dark-card text-dark-text hover:bg-dark-border',
    outlined: 'border-2 border-dark-border text-dark-text hover:bg-dark-border',
    ghost: 'text-dark-text hover:bg-dark-card'
  },
  danger: {
    base: 'bg-red-500 text-white hover:bg-red-600',
    outlined: 'border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white',
    ghost: 'text-red-500 hover:bg-red-500/10'
  },
  success: {
    base: 'bg-green-500 text-white hover:bg-green-600',
    outlined: 'border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white',
    ghost: 'text-green-500 hover:bg-green-500/10'
  }
};

/**
 * Configuración de tamaños de botón
 */
const BUTTON_SIZES = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl'
};

/**
 * Animaciones predefinidas para botones
 */
const BUTTON_ANIMATIONS = {
  scale: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 }
  },
  glow: {
    whileHover: { 
      boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)',
      transition: { duration: 0.2 }
    }
  },
  slide: {
    whileHover: { x: 5 },
    whileTap: { x: 0 }
  },
  none: {}
};

/**
 * Componente Button con forwardRef para acceso a la referencia del DOM
 * 
 * @param {Object} props - Propiedades del componente
 * @param {React.Ref} ref - Referencia del elemento DOM
 */
const Button = forwardRef(({
  children,
  variant = 'primary',
  type = 'base',
  buttonType = 'button',
  size = 'md',
  animation = 'scale',
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon = null,
  rightIcon = null,
  className = '',
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}, ref) => {

  /**
   * Genera las clases CSS del botón basadas en las props
   * Función pura que siempre retorna el mismo resultado para las mismas entradas
   * 
   * @returns {string} - String con todas las clases CSS
   */
  const getButtonClasses = () => {
    // Clases base comunes a todos los botones
    const baseClasses = [
      'inline-flex',
      'items-center',
      'justify-center',
      'font-jetbrains',
      'font-medium',
      'rounded-lg',
      'transition-all',
      'duration-300',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-neon-blue/50',
      'focus:ring-offset-2',
      'focus:ring-offset-dark-bg'
    ];

    // Añadir clase de ancho completo si es necesario
    if (fullWidth) {
      baseClasses.push('w-full');
    }

    // Añadir clases de estado deshabilitado
    if (disabled) {
      baseClasses.push(
        'opacity-50',
        'cursor-not-allowed',
        'pointer-events-none'
      );
    }

    // Añadir clases de estado de carga
    if (loading) {
      baseClasses.push('cursor-wait');
    }

    // Obtener clases de variante y tipo
    const variantClasses = BUTTON_VARIANTS[variant]?.[type] || BUTTON_VARIANTS.primary.base;
    
    // Obtener clases de tamaño
    const sizeClasses = BUTTON_SIZES[size] || BUTTON_SIZES.md;

    // Combinar todas las clases
    return [
      ...baseClasses,
      variantClasses,
      sizeClasses,
      className
    ].filter(Boolean).join(' ');
  };

  /**
   * Maneja el evento click del botón
   * Previene la ejecución si el botón está deshabilitado o cargando
   * 
   * @param {Event} event - Evento del click
   */
  const handleClick = (event) => {
    // Prevenir ejecución si está deshabilitado o cargando
    if (disabled || loading) {
      event.preventDefault();
      return;
    }

    // Ejecutar callback de onClick si existe
    if (onClick && typeof onClick === 'function') {
      onClick(event);
    }
  };

  /**
   * Renderiza el icono de carga
   * 
   * @returns {JSX.Element} - Spinner de carga
   */
  const renderLoadingSpinner = () => (
    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
  );

  /**
   * Renderiza el contenido del botón
   * Incluye iconos izquierdo/derecho, spinner de carga y children
   * 
   * @returns {JSX.Element} - Contenido del botón
   */
  const renderButtonContent = () => (
    <>
      {/* Spinner de carga */}
      {loading && renderLoadingSpinner()}
      
      {/* Icono izquierdo */}
      {leftIcon && !loading && (
        <span className="mr-2 flex items-center">
          {leftIcon}
        </span>
      )}
      
      {/* Contenido principal */}
      <span className="flex items-center">
        {children}
      </span>
      
      {/* Icono derecho */}
      {rightIcon && !loading && (
        <span className="ml-2 flex items-center">
          {rightIcon}
        </span>
      )}
    </>
  );

  // Obtener configuración de animación
  const animationConfig = BUTTON_ANIMATIONS[animation] || BUTTON_ANIMATIONS.scale;

  // Renderizar el botón con motion si hay animaciones, o button normal si no
  if (animation !== 'none') {
    return (
      <motion.button
        ref={ref}
        type={buttonType}
        className={getButtonClasses()}
        onClick={handleClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        {...animationConfig}
        {...props}
      >
        {renderButtonContent()}
      </motion.button>
    );
  }

  // Botón sin animaciones
  return (
    <button
      ref={ref}
      type={buttonType}
      className={getButtonClasses()}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled}
      {...props}
    >
      {renderButtonContent()}
    </button>
  );
});

// Asignar displayName para debugging
Button.displayName = 'Button';

/**
 * PropTypes para validación de tipos en desarrollo
 * Ayuda a detectar errores temprano y documenta la API del componente
 */
Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success']),
  type: PropTypes.oneOf(['base', 'outlined', 'ghost']),
  buttonType: PropTypes.oneOf(['button', 'submit', 'reset']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  animation: PropTypes.oneOf(['scale', 'glow', 'slide', 'none']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
};

/**
 * Componentes especializados para casos de uso comunes
 * Siguiendo el principio de composición sobre herencia
 */

/**
 * Botón primario - para acciones principales
 */
export const PrimaryButton = (props) => (
  <Button variant="primary" type="base" {...props} />
);

/**
 * Botón secundario - para acciones secundarias
 */
export const SecondaryButton = (props) => (
  <Button variant="secondary" type="base" {...props} />
);

/**
 * Botón outlined - para acciones menos prominentes
 */
export const OutlinedButton = (props) => (
  <Button variant="primary" type="outlined" {...props} />
);

/**
 * Botón ghost - para acciones sutiles
 */
export const GhostButton = (props) => (
  <Button variant="primary" type="ghost" {...props} />
);

/**
 * Botón de peligro - para acciones destructivas
 */
export const DangerButton = (props) => (
  <Button variant="danger" type="base" {...props} />
);

/**
 * Botón de éxito - para confirmaciones
 */
export const SuccessButton = (props) => (
  <Button variant="success" type="base" {...props} />
);

export default Button; 