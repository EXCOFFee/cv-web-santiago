/**
 * Componente Card Reutilizable
 * 
 * PRINCIPIO SOLID: Single Responsibility Principle (SRP)
 * - Responsabilidad única: renderizar tarjetas con diferentes estilos y contenido
 * 
 * PRINCIPIO SOLID: Open/Closed Principle (OCP)
 * - Abierto para extensión: se pueden agregar nuevas variantes sin modificar el código base
 * - Cerrado para modificación: la lógica central de la tarjeta no cambia
 * 
 * PRINCIPIO: Liskov Substitution Principle (LSP)
 * - Los diferentes tipos de Card pueden usarse intercambiablemente
 * 
 * PRINCIPIO: Interface Segregation Principle (ISP)
 * - Proporciona interfaces específicas para diferentes tipos de contenido
 */

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Configuración de variantes de tarjeta
 * Define los estilos base para diferentes tipos de tarjetas
 */
const CARD_VARIANTS = {
  default: {
    background: 'bg-dark-card/50',
    border: 'border-dark-border',
    backdrop: 'backdrop-blur-sm'
  },
  solid: {
    background: 'bg-dark-card',
    border: 'border-dark-border',
    backdrop: ''
  },
  glass: {
    background: 'bg-dark-card/30',
    border: 'border-dark-border/50',
    backdrop: 'backdrop-blur-md'
  },
  gradient: {
    background: 'bg-gradient-to-br from-dark-card/60 to-dark-card/40',
    border: 'border-dark-border',
    backdrop: 'backdrop-blur-sm'
  },
  neon: {
    background: 'bg-dark-card/50',
    border: 'border-neon-blue/30',
    backdrop: 'backdrop-blur-sm'
  }
};

/**
 * Configuración de tamaños de padding
 */
const CARD_PADDING = {
  none: '',
  xs: 'p-2',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10'
};

/**
 * Configuración de bordes redondeados
 */
const CARD_RADIUS = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  xl: 'rounded-2xl',
  full: 'rounded-full'
};

/**
 * Configuración de sombras
 */
const CARD_SHADOWS = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  glow: 'shadow-lg shadow-neon-blue/20'
};

/**
 * Animaciones predefinidas para tarjetas
 */
const CARD_ANIMATIONS = {
  none: {},
  hover: {
    whileHover: { y: -5 }
  },
  scale: {
    whileHover: { scale: 1.02 }
  },
  glow: {
    whileHover: { 
      boxShadow: '0 0 30px rgba(0, 212, 255, 0.3)',
      transition: { duration: 0.3 }
    }
  },
  rotate: {
    whileHover: { rotate: 1 }
  }
};

/**
 * Componente Card principal
 * 
 * @param {Object} props - Propiedades del componente
 * @param {React.Ref} ref - Referencia del elemento DOM
 */
const Card = forwardRef(({
  children,
  variant = 'default',
  padding = 'md',
  radius = 'lg',
  shadow = 'md',
  animation = 'hover',
  interactive = false,
  clickable = false,
  className = '',
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...props
}, ref) => {

  /**
   * Genera las clases CSS de la tarjeta basadas en las props
   * 
   * @returns {string} - String con todas las clases CSS
   */
  const getCardClasses = () => {
    const baseClasses = [
      'border',
      'transition-all',
      'duration-300',
      'relative'
    ];

    // Obtener configuración de variante
    const variantConfig = CARD_VARIANTS[variant] || CARD_VARIANTS.default;
    
    // Añadir clases de variante
    if (variantConfig.background) baseClasses.push(variantConfig.background);
    if (variantConfig.border) baseClasses.push(variantConfig.border);
    if (variantConfig.backdrop) baseClasses.push(variantConfig.backdrop);

    // Añadir padding
    const paddingClass = CARD_PADDING[padding] || CARD_PADDING.md;
    if (paddingClass) baseClasses.push(paddingClass);

    // Añadir radio
    const radiusClass = CARD_RADIUS[radius] || CARD_RADIUS.lg;
    if (radiusClass) baseClasses.push(radiusClass);

    // Añadir sombra
    const shadowClass = CARD_SHADOWS[shadow] || CARD_SHADOWS.md;
    if (shadowClass) baseClasses.push(shadowClass);

    // Añadir clases de interactividad
    if (interactive || clickable) {
      baseClasses.push('card-glow', 'cursor-pointer');
    }

    // Añadir clases personalizadas
    if (className) {
      baseClasses.push(className);
    }

    return baseClasses.join(' ');
  };

  /**
   * Maneja el evento click de la tarjeta
   * 
   * @param {Event} event - Evento del click
   */
  const handleClick = (event) => {
    if (clickable && onClick && typeof onClick === 'function') {
      onClick(event);
    }
  };

  // Obtener configuración de animación
  const animationConfig = CARD_ANIMATIONS[animation] || CARD_ANIMATIONS.hover;

  // Renderizar con motion si hay animaciones
  if (animation !== 'none') {
    return (
      <motion.div
        ref={ref}
        className={getCardClasses()}
        onClick={handleClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...animationConfig}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  // Renderizar sin animaciones
  return (
    <div
      ref={ref}
      className={getCardClasses()}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
});

// Asignar displayName para debugging
Card.displayName = 'Card';

/**
 * PropTypes para validación de tipos
 */
Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'solid', 'glass', 'gradient', 'neon']),
  padding: PropTypes.oneOf(['none', 'xs', 'sm', 'md', 'lg', 'xl']),
  radius: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl', 'full']),
  shadow: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl', 'glow']),
  animation: PropTypes.oneOf(['none', 'hover', 'scale', 'glow', 'rotate']),
  interactive: PropTypes.bool,
  clickable: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
};

/**
 * Componente CardHeader
 * Para el encabezado de las tarjetas
 */
export const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
);

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

/**
 * Componente CardTitle
 * Para títulos de tarjetas
 */
export const CardTitle = ({ 
  children, 
  level = 3, 
  className = '', 
  color = 'text-dark-text',
  ...props 
}) => {
  const baseClasses = `font-jetbrains font-bold ${color} ${className}`;
  
  const levelClasses = {
    1: 'text-3xl md:text-4xl',
    2: 'text-2xl md:text-3xl',
    3: 'text-xl md:text-2xl',
    4: 'text-lg md:text-xl',
    5: 'text-base md:text-lg',
    6: 'text-sm md:text-base'
  };

  const Tag = `h${level}`;
  const sizeClass = levelClasses[level] || levelClasses[3];

  return (
    <Tag className={`${baseClasses} ${sizeClass}`} {...props}>
      {children}
    </Tag>
  );
};

CardTitle.propTypes = {
  children: PropTypes.node.isRequired,
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  className: PropTypes.string,
  color: PropTypes.string
};

/**
 * Componente CardContent
 * Para el contenido principal de las tarjetas
 */
export const CardContent = ({ children, className = '', ...props }) => (
  <div className={`text-dark-text/80 leading-relaxed ${className}`} {...props}>
    {children}
  </div>
);

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

/**
 * Componente CardFooter
 * Para el pie de las tarjetas
 */
export const CardFooter = ({ 
  children, 
  className = '', 
  justify = 'end',
  ...props 
}) => {
  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around'
  };

  const justifyClass = justifyClasses[justify] || justifyClasses.end;

  return (
    <div 
      className={`flex items-center gap-3 mt-6 ${justifyClass} ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
};

CardFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  justify: PropTypes.oneOf(['start', 'center', 'end', 'between', 'around'])
};

/**
 * Componente CardIcon
 * Para iconos en tarjetas
 */
export const CardIcon = ({ 
  icon: IconComponent, 
  size = 'md', 
  color = 'text-neon-blue',
  className = '',
  ...props 
}) => {
  const sizeClasses = {
    xs: 'text-lg',
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  };

  const sizeClass = sizeClasses[size] || sizeClasses.md;

  return (
    <div className={`${color} ${sizeClass} ${className}`} {...props}>
      {IconComponent && <IconComponent />}
    </div>
  );
};

CardIcon.propTypes = {
  icon: PropTypes.elementType.isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  color: PropTypes.string,
  className: PropTypes.string
};

/**
 * Componentes especializados para casos de uso comunes
 */

/**
 * Tarjeta de estadística
 */
export const StatCard = ({ 
  title, 
  value, 
  icon, 
  change, 
  changeType = 'neutral',
  ...props 
}) => (
  <Card variant="glass" animation="scale" interactive {...props}>
    <div className="flex items-center justify-between">
      <div>
        <CardContent className="text-sm text-dark-text/60 mb-1">
          {title}
        </CardContent>
        <CardTitle level={2} className="mb-2">
          {value}
        </CardTitle>
        {change && (
          <div className={`text-sm ${
            changeType === 'positive' ? 'text-green-400' :
            changeType === 'negative' ? 'text-red-400' :
            'text-dark-text/60'
          }`}>
            {change}
          </div>
        )}
      </div>
      {icon && (
        <CardIcon icon={icon} size="lg" />
      )}
    </div>
  </Card>
);

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.elementType,
  change: PropTypes.string,
  changeType: PropTypes.oneOf(['positive', 'negative', 'neutral'])
};

/**
 * Tarjeta de feature/característica
 */
export const FeatureCard = ({ 
  title, 
  description, 
  icon, 
  action,
  ...props 
}) => (
  <Card variant="default" animation="glow" interactive {...props}>
    <CardHeader>
      {icon && (
        <CardIcon icon={icon} size="lg" className="mb-4" />
      )}
      <CardTitle level={3} color="text-neon-blue">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      {description}
    </CardContent>
    {action && (
      <CardFooter>
        {action}
      </CardFooter>
    )}
  </Card>
);

FeatureCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  action: PropTypes.node
};

export default Card; 