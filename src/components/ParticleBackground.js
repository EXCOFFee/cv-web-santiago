/**
 * Componente ParticleBackground - Fondo animado con partículas
 * 
 * PRINCIPIO SOLID: Single Responsibility Principle (SRP)
 * - Responsabilidad única: crear y manejar el fondo animado con partículas
 * 
 * PRINCIPIO SOLID: Open/Closed Principle (OCP)
 * - Abierto para extensión: se pueden agregar nuevos tipos de partículas sin modificar el código base
 * - Cerrado para modificación: la lógica central no cambia
 * 
 * PRINCIPIO SOLID: Dependency Inversion Principle (DIP)
 * - Depende de abstracciones (configuraciones) en lugar de implementaciones concretas
 * 
 * BUENAS PRÁCTICAS:
 * - Optimización de rendimiento con requestAnimationFrame
 * - Responsive design adaptativo
 * - Cleanup de recursos al desmontar
 * - Configuración centralizada
 * - Throttling para eventos de resize
 */

import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Configuración de las partículas
 * Centralizada para fácil personalización
 */
const PARTICLE_CONFIG = {
  // Configuración básica
  count: {
    desktop: 150,
    tablet: 100,
    mobile: 50
  },
  
  // Propiedades de las partículas
  size: {
    min: 1,
    max: 3
  },
  
  speed: {
    min: 0.1,
    max: 0.5
  },
  
  // Colores y opacidad
  colors: [
    'rgba(0, 212, 255, 0.6)',    // Neon blue
    'rgba(0, 212, 255, 0.4)',    // Neon blue lighter
    'rgba(255, 255, 255, 0.3)',  // White
    'rgba(100, 150, 255, 0.5)'   // Light blue
  ],
  
  // Configuración de conexiones
  connections: {
    enabled: true,
    maxDistance: 100,
    opacity: 0.2,
    color: 'rgba(0, 212, 255, 0.3)'
  },
  
  // Interactividad
  mouse: {
    enabled: true,
    radius: 100,
    repulsion: 50
  },
  
  // Configuración de animación
  animation: {
    fps: 60,
    bounceWalls: true,
    floatEffect: true
  }
};

/**
 * Breakpoints para responsive design
 */
const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024
};

/**
 * Clase para manejar una partícula individual
 */
class Particle {
  constructor(canvas, config) {
    this.canvas = canvas;
    this.config = config;
    this.reset();
  }

  /**
   * Reinicia la partícula con valores aleatorios
   */
  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.size = Math.random() * (this.config.size.max - this.config.size.min) + this.config.size.min;
    this.speedX = (Math.random() - 0.5) * (this.config.speed.max - this.config.speed.min) + this.config.speed.min;
    this.speedY = (Math.random() - 0.5) * (this.config.speed.max - this.config.speed.min) + this.config.speed.min;
    this.color = this.config.colors[Math.floor(Math.random() * this.config.colors.length)];
    this.opacity = Math.random() * 0.5 + 0.3;
    this.originalSpeedX = this.speedX;
    this.originalSpeedY = this.speedY;
  }

  /**
   * Actualiza la posición y estado de la partícula
   */
  update(mouseX, mouseY) {
    // Efecto de mouse
    if (this.config.mouse.enabled && mouseX !== null && mouseY !== null) {
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < this.config.mouse.radius) {
        const force = (this.config.mouse.radius - distance) / this.config.mouse.radius;
        const repulsion = this.config.mouse.repulsion * force;
        
        this.speedX = this.originalSpeedX - (dx / distance) * repulsion * 0.01;
        this.speedY = this.originalSpeedY - (dy / distance) * repulsion * 0.01;
      } else {
        // Volver gradualmente a la velocidad original
        this.speedX += (this.originalSpeedX - this.speedX) * 0.02;
        this.speedY += (this.originalSpeedY - this.speedY) * 0.02;
      }
    }

    // Actualizar posición
    this.x += this.speedX;
    this.y += this.speedY;

    // Rebote en las paredes
    if (this.config.animation.bounceWalls) {
      if (this.x < 0 || this.x > this.canvas.width) {
        this.speedX = -this.speedX;
        this.x = Math.max(0, Math.min(this.canvas.width, this.x));
      }
      if (this.y < 0 || this.y > this.canvas.height) {
        this.speedY = -this.speedY;
        this.y = Math.max(0, Math.min(this.canvas.height, this.y));
      }
    } else {
      // Reaparecer en el lado opuesto
      if (this.x < 0) this.x = this.canvas.width;
      if (this.x > this.canvas.width) this.x = 0;
      if (this.y < 0) this.y = this.canvas.height;
      if (this.y > this.canvas.height) this.y = 0;
    }

    // Efecto de flotación
    if (this.config.animation.floatEffect) {
      this.opacity = 0.3 + Math.sin(Date.now() * 0.001 + this.x * 0.01) * 0.2;
    }
  }

  /**
   * Dibuja la partícula en el canvas
   */
  draw(ctx) {
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

/**
 * Clase para manejar el sistema de partículas
 */
class ParticleSystem {
  constructor(canvas, config) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.config = config;
    this.particles = [];
    this.animationId = null;
    this.mouseX = null;
    this.mouseY = null;
    this.lastTime = 0;
    this.fps = config.animation.fps;
    this.fpsInterval = 1000 / this.fps;
    
    this.initializeParticles();
    this.setupEventListeners();
  }

  /**
   * Inicializa las partículas
   */
  initializeParticles() {
    const particleCount = this.getParticleCount();
    this.particles = [];
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push(new Particle(this.canvas, this.config));
    }
  }

  /**
   * Obtiene el número de partículas según el tamaño de pantalla
   */
  getParticleCount() {
    const width = window.innerWidth;
    
    if (width < BREAKPOINTS.mobile) {
      return this.config.count.mobile;
    } else if (width < BREAKPOINTS.tablet) {
      return this.config.count.tablet;
    } else {
      return this.config.count.desktop;
    }
  }

  /**
   * Configura los event listeners
   */
  setupEventListeners() {
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleResize = this.throttle(this.handleResize.bind(this), 250);
    
    this.canvas.addEventListener('mousemove', this.handleMouseMove);
    this.canvas.addEventListener('mouseleave', this.handleMouseLeave);
    window.addEventListener('resize', this.handleResize);
  }

  /**
   * Throttle function para optimizar eventos
   */
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  /**
   * Maneja el movimiento del mouse
   */
  handleMouseMove(event) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouseX = event.clientX - rect.left;
    this.mouseY = event.clientY - rect.top;
  }

  /**
   * Maneja cuando el mouse sale del canvas
   */
  handleMouseLeave() {
    this.mouseX = null;
    this.mouseY = null;
  }

  /**
   * Maneja el redimensionamiento de la ventana
   */
  handleResize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.initializeParticles();
  }

  /**
   * Dibuja conexiones entre partículas cercanas
   */
  drawConnections() {
    if (!this.config.connections.enabled) return;
    
    const { maxDistance, opacity, color } = this.config.connections;
    
    this.ctx.globalAlpha = opacity;
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 1;
    
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          const alpha = (maxDistance - distance) / maxDistance;
          this.ctx.globalAlpha = alpha * opacity;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }
    
    this.ctx.globalAlpha = 1;
  }

  /**
   * Actualiza todas las partículas
   */
  updateParticles() {
    this.particles.forEach(particle => {
      particle.update(this.mouseX, this.mouseY);
    });
  }

  /**
   * Dibuja todas las partículas
   */
  drawParticles() {
    this.particles.forEach(particle => {
      particle.draw(this.ctx);
    });
  }

  /**
   * Limpia el canvas
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Loop principal de animación
   */
  animate(currentTime) {
    this.animationId = requestAnimationFrame(this.animate.bind(this));
    
    // Control de FPS
    const elapsed = currentTime - this.lastTime;
    if (elapsed > this.fpsInterval) {
      this.lastTime = currentTime - (elapsed % this.fpsInterval);
      
      this.clearCanvas();
      this.updateParticles();
      this.drawConnections();
      this.drawParticles();
    }
  }

  /**
   * Inicia la animación
   */
  start() {
    this.animate(0);
  }

  /**
   * Detiene la animación
   */
  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  /**
   * Limpia los recursos
   */
  cleanup() {
    this.stop();
    this.canvas.removeEventListener('mousemove', this.handleMouseMove);
    this.canvas.removeEventListener('mouseleave', this.handleMouseLeave);
    window.removeEventListener('resize', this.handleResize);
  }
}

/**
 * Hook personalizado para el sistema de partículas
 */
const useParticleSystem = (canvasRef, config) => {
  const particleSystemRef = useRef(null);

  // Inicializar el sistema
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Configurar canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Crear sistema de partículas
    particleSystemRef.current = new ParticleSystem(canvas, config);
    particleSystemRef.current.start();

    // Cleanup al desmontar
    return () => {
      if (particleSystemRef.current) {
        particleSystemRef.current.cleanup();
        particleSystemRef.current = null;
      }
    };
  }, [canvasRef, config]);

  return particleSystemRef.current;
};

/**
 * Componente principal ParticleBackground
 */
const ParticleBackground = ({ 
  config = PARTICLE_CONFIG,
  className = '',
  style = {},
  ...props 
}) => {
  const canvasRef = useRef(null);
  
  // Memoizar configuración para evitar re-renders innecesarios
  const memoizedConfig = useMemo(() => ({
    ...PARTICLE_CONFIG,
    ...config
  }), [config]);

  // Inicializar sistema de partículas
  const particleSystem = useParticleSystem(canvasRef, memoizedConfig);

  // Callback para pausar/reanudar animación en visibilidad
  const handleVisibilityChange = useCallback(() => {
    if (!particleSystem) return;
    
    if (document.hidden) {
      particleSystem.stop();
    } else {
      particleSystem.start();
    }
  }, [particleSystem]);

  // Escuchar cambios de visibilidad para optimización
  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleVisibilityChange]);

  return (
    <motion.div
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: 'easeInOut' }}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ 
          background: 'transparent',
          mixBlendMode: 'normal'
        }}
        aria-hidden="true"
      />
      
      {/* Gradiente overlay sutil */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-bg/10 pointer-events-none"
        aria-hidden="true"
      />
    </motion.div>
  );
};

ParticleBackground.propTypes = {
  config: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object
};

// Asignar displayName para debugging
ParticleBackground.displayName = 'ParticleBackground';

export default ParticleBackground; 