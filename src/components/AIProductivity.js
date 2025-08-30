/**
 * Componente AIProductivity - Sección de herramientas de IA y productividad
 * 
 * PRINCIPIO SOLID: Single Responsibility Principle (SRP)
 * - Responsabilidad única: mostrar herramientas de IA y productividad utilizadas
 * 
 * PRINCIPIO SOLID: Open/Closed Principle (OCP)
 * - Abierto para extensión: se pueden agregar nuevas herramientas sin modificar el código base
 * - Cerrado para modificación: la estructura central no cambia
 * 
 * PRINCIPIO SOLID: Dependency Inversion Principle (DIP)
 * - Depende de abstracciones (hooks personalizados, datos centralizados) en lugar de implementaciones concretas
 * 
 * BUENAS PRÁCTICAS:
 * - Datos centralizados en constantes
 * - Componentes especializados para cada herramienta
 * - Animaciones configurables
 * - Responsive design
 * - Accesibilidad completa
 */

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaCode, FaLightbulb, FaRocket, FaBrain, FaSearch, FaEdit, FaChartLine } from 'react-icons/fa';
import { SiOpenai, SiGithub, SiVisualstudiocode, SiNotion } from 'react-icons/si';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { MdAutoAwesome, MdSmartToy } from 'react-icons/md';
import PropTypes from 'prop-types';

// Importar hooks personalizados y componentes
import useScrollAnimation from '../hooks/useScrollAnimation';
import Card, { CardHeader, CardTitle, CardContent } from './UI/Card';

/**
 * Configuración de animaciones para la sección AIProductivity
 * Centralizada para facilitar mantenimiento
 */
const AI_ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  },

  section: {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  },

  toolCard: {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: index * 0.1,
        duration: 0.6,
        ease: 'easeOut'
      }
    })
  },

  benefitItem: {
    hidden: { opacity: 0, x: -20 },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        ease: 'easeOut'
      }
    })
  },

  float: {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  }
};

/**
 * Configuración de herramientas de IA y productividad
 * Organizadas por categorías con información detallada
 */
const AI_TOOLS = {
  aiAssistants: {
    title: 'Asistentes de IA',
    description: 'Herramientas de IA conversacional para desarrollo y productividad',
    icon: GiArtificialIntelligence,
    color: 'text-purple-400',
    bgColor: 'from-purple-500/10 to-purple-600/5',
    tools: [
      {
        name: 'ChatGPT',
        icon: SiOpenai,
        description: 'Asistente de IA para resolución de problemas, documentación y brainstorming',
        usage: 'Diario',
        experience: '1.5 años',
        productivity: 85,
        features: ['Debugging', 'Documentación', 'Brainstorming', 'Explicaciones técnicas'],
        color: '#00A67E'
      },
      {
        name: 'Claude',
        icon: FaBrain,
        description: 'IA avanzada para análisis complejo, arquitectura de software y revisión de código',
        usage: 'Diario',
        experience: '10 meses',
        productivity: 80,
        features: ['Arquitectura', 'Análisis de código', 'Documentación técnica', 'Debugging complejo'],
        color: '#D97706'
      },
      {
        name: 'GitHub Copilot',
        icon: SiGithub,
        description: 'Autocompletado inteligente de código y sugerencias en tiempo real',
        usage: 'Diario',
        experience: '1 año',
        productivity: 90,
        features: ['Autocompletado', 'Generación de código', 'Comentarios', 'Tests unitarios'],
        color: '#000000'
      },
      {
        name: 'Cursor',
        icon: SiVisualstudiocode,
        description: 'Editor de código con IA integrada para desarrollo más eficiente',
        usage: 'Diario',
        experience: '8 meses',
        productivity: 95,
        features: ['Edición con IA', 'Refactoring', 'Generación de código', 'Chat integrado'],
        color: '#007ACC'
      }
    ]
  },

  developmentTools: {
    title: 'Herramientas de Desarrollo',
    description: 'Editores y extensiones potenciadas con IA',
    icon: FaCode,
    color: 'text-blue-400',
    bgColor: 'from-blue-500/10 to-blue-600/5',
    tools: [
      {
        name: 'VS Code + IA Extensions',
        icon: SiVisualstudiocode,
        description: 'Visual Studio Code con extensiones de IA para desarrollo optimizado',
        usage: 'Frecuente',
        experience: '2 años',
        productivity: 85,
        features: ['IntelliSense', 'Code Actions', 'Debugging', 'Extensions IA'],
        color: '#007ACC'
      },
      {
        name: 'Cursor',
        icon: SiVisualstudiocode, // Puedes cambiar el icono si tienes uno específico para Cursor
        description: 'Cursor: editor de código con IA integrada para acelerar el desarrollo',
        usage: 'Frecuente',
        experience: '1 año',
        productivity: 80,
        features: ['AI Autocomplete', 'Refactorización', 'Chat IA', 'Integración con repositorios'],
        color: '#3A76F0'
      },
    ]
  },

  productivityTools: {
    title: 'Productividad',
    description: 'Herramientas para optimizar flujos de trabajo',
    icon: FaRocket,
    color: 'text-green-400',
    bgColor: 'from-green-500/10 to-green-600/5',
    tools: [
      {
        name: 'Notion AI',
        icon: SiNotion,
        description: 'Gestión de proyectos y documentación con capacidades de IA',
        usage: 'Diario',
        experience: '1 año',
        productivity: 75,
        features: ['Documentación', 'Gestión de proyectos', 'Planificación', 'Automatización'],
        color: '#000000'
      },
      {
        name: 'AI Content Tools',
        icon: MdAutoAwesome,
        description: 'Herramientas diversas para generación y optimización de contenido',
        usage: 'Frecuente',
        experience: '1 año',
        productivity: 70,
        features: ['Generación de contenido', 'Optimización SEO', 'Corrección', 'Traducción'],
        color: '#FF6B6B'
      }
    ]
  }
};

/**
 * Configuración de beneficios del uso de IA
 * Métricas e impacto en productividad
 */
const AI_BENEFITS = [
  {
    icon: FaChartLine,
    title: 'Productividad',
    value: '+75%',
    description: 'Aumento en velocidad de desarrollo',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20'
  },
  {
    icon: FaLightbulb,
    title: 'Calidad de Código',
    value: '+60%',
    description: 'Mejora en estándares y buenas prácticas',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20'
  },
  {
    icon: FaSearch,
    title: 'Debugging',
    value: '+80%',
    description: 'Reducción en tiempo de resolución',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20'
  },
  {
    icon: FaEdit,
    title: 'Documentación',
    value: '+90%',
    description: 'Mejora en documentación técnica',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20'
  }
];

/**
 * Configuración de casos de uso específicos
 * Ejemplos prácticos de aplicación
 */
const USE_CASES = [
  {
    title: 'Desarrollo de Features',
    description: 'Uso de IA para acelerar el desarrollo de nuevas funcionalidades',
    steps: [
      'Análisis de requisitos con Claude',
      'Generación de código base con Copilot',
      'Optimización con Cursor',
      'Documentación con ChatGPT'
    ],
    icon: FaRocket,
    color: 'text-blue-400'
  },
  {
    title: 'Debugging y Optimización',
    description: 'Resolución eficiente de problemas técnicos complejos',
    steps: [
      'Identificación del problema',
      'Análisis de código con IA',
      'Sugerencias de solución',
      'Implementación optimizada'
    ],
    icon: FaSearch,
    color: 'text-green-400'
  },
  {
    title: 'Documentación Técnica',
    description: 'Creación de documentación completa y profesional',
    steps: [
      'Análisis de código existente',
      'Generación de documentación',
      'Revisión y mejora',
      'Mantenimiento automatizado'
    ],
    icon: FaEdit,
    color: 'text-purple-400'
  }
];

/**
 * Componente para el título de sección
 */
const SectionTitle = ({ title, subtitle, className = '' }) => (
  <motion.div
    variants={AI_ANIMATIONS.section}
    className={`text-center mb-16 ${className}`}
  >
    <CardTitle level={2} className="mb-6" color="text-dark-text">
      {title.split(' ').map((word, index) => 
        word === 'IA' || word === 'Productividad' ? (
          <span key={index} className="text-neon-blue"> {word}</span>
        ) : (
          <span key={index}> {word}</span>
        )
      )}
    </CardTitle>
    <div className="w-20 h-1 bg-neon-blue mx-auto mb-8"></div>
    {subtitle && (
      <p className="text-lg text-dark-text/70 max-w-2xl mx-auto">
        {subtitle}
      </p>
    )}
  </motion.div>
);

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  className: PropTypes.string
};

/**
 * Componente para mostrar una herramienta de IA
 */
const AIToolCard = ({ tool, index, isVisible }) => (
  <motion.div
    custom={index}
    initial="hidden"
    animate={isVisible ? "visible" : "hidden"}
    variants={AI_ANIMATIONS.toolCard}
    whileHover={{ 
      scale: 1.05,
      transition: { duration: 0.2 }
    }}
    className="group"
  >
    <Card
      variant="glass"
      padding="lg"
      animation="hover"
      className="h-full"
    >
      <CardHeader className="text-center">
        <motion.div
          variants={AI_ANIMATIONS.float}
          animate="animate"
          className="flex flex-col items-center gap-4"
        >
          <div 
            className="p-4 rounded-2xl transition-all duration-300 group-hover:scale-110"
            style={{ backgroundColor: `${tool.color}20` }}
          >
            <tool.icon 
              className="text-4xl transition-colors duration-300"
              style={{ color: tool.color }}
            />
          </div>
          
          <CardTitle level={4} color="text-dark-text">
            {tool.name}
          </CardTitle>
        </motion.div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-dark-text/70 text-center text-sm">
          {tool.description}
        </p>

        {/* Métricas */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-sm text-dark-text/70">Uso</div>
            <div className="text-neon-blue font-medium">{tool.usage}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-dark-text/70">Experiencia</div>
            <div className="text-neon-blue font-medium">{tool.experience}</div>
          </div>
        </div>

        {/* Barra de productividad */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-dark-text/70">Productividad</span>
            <span className="text-sm font-medium text-neon-blue">{tool.productivity}%</span>
          </div>
          <div className="w-full bg-dark-bg rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={isVisible ? { width: `${tool.productivity}%` } : { width: 0 }}
              transition={{ duration: 1.5, delay: index * 0.1 }}
              className="h-full bg-gradient-to-r from-neon-blue to-blue-400 rounded-full"
            />
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2">
          <div className="text-sm text-dark-text/70">Características:</div>
          <div className="flex flex-wrap gap-2">
            {tool.features.map((feature, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-neon-blue/10 text-neon-blue rounded-full text-xs"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

AIToolCard.propTypes = {
  tool: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isVisible: PropTypes.bool.isRequired
};

/**
 * Componente para categoría de herramientas
 */
const AIToolCategory = ({ category, tools, isVisible }) => (
  <motion.div
    variants={AI_ANIMATIONS.section}
    className="mb-16"
  >
    <Card
      variant="glass"
      padding="lg"
      animation="glow"
      className={`bg-gradient-to-br ${category.bgColor} border-dark-border`}
    >
      <CardHeader className="text-center mb-8">
        <div className="flex items-center justify-center gap-4 mb-4">
          <category.icon className={`text-3xl ${category.color}`} />
          <CardTitle level={3} color={category.color}>
            {category.title}
          </CardTitle>
        </div>
        <p className="text-dark-text/70">{category.description}</p>
      </CardHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <AIToolCard
            key={tool.name}
            tool={tool}
            index={index}
            isVisible={isVisible}
          />
        ))}
      </div>
    </Card>
  </motion.div>
);

AIToolCategory.propTypes = {
  category: PropTypes.object.isRequired,
  tools: PropTypes.array.isRequired,
  isVisible: PropTypes.bool.isRequired
};

/**
 * Componente para beneficios de la IA
 */
const AIBenefits = ({ benefits, isVisible }) => (
  <motion.div
    variants={AI_ANIMATIONS.section}
    className="mb-16"
  >
    <Card variant="gradient" padding="lg" animation="glow">
      <CardHeader className="text-center mb-8">
        <CardTitle level={3} color="text-neon-blue">
          Impacto en Productividad
        </CardTitle>
        <p className="text-dark-text/70 mt-2">
          Métricas de mejora utilizando herramientas de IA
        </p>
      </CardHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.title}
            custom={index}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={AI_ANIMATIONS.benefitItem}
            whileHover={{ scale: 1.05 }}
            className="text-center"
          >
            <div className="p-6 rounded-2xl bg-dark-card/30 backdrop-blur-sm border border-dark-border">
              <div className={`p-3 rounded-xl ${benefit.bgColor} mb-4 mx-auto w-fit`}>
                <benefit.icon className={`text-2xl ${benefit.color}`} />
              </div>
              <div className={`text-3xl font-bold ${benefit.color} mb-2 font-jetbrains`}>
                {benefit.value}
              </div>
              <div className="text-dark-text font-medium mb-2">{benefit.title}</div>
              <div className="text-dark-text/70 text-sm">{benefit.description}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  </motion.div>
);

AIBenefits.propTypes = {
  benefits: PropTypes.array.isRequired,
  isVisible: PropTypes.bool.isRequired
};

/**
 * Componente para casos de uso
 */
const UseCases = ({ useCases, isVisible }) => (
  <motion.div
    variants={AI_ANIMATIONS.section}
    className="mb-16"
  >
    <Card variant="glass" padding="lg" animation="hover">
      <CardHeader className="text-center mb-8">
        <CardTitle level={3} color="text-neon-blue">
          Casos de Uso Prácticos
        </CardTitle>
        <p className="text-dark-text/70 mt-2">
          Ejemplos de cómo integro la IA en mis flujos de trabajo
        </p>
      </CardHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {useCases.map((useCase, index) => (
          <motion.div
            key={useCase.title}
            custom={index}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={AI_ANIMATIONS.toolCard}
            className="group"
          >
            <div className="p-6 rounded-2xl bg-dark-card/30 backdrop-blur-sm border border-dark-border h-full">
              <div className="flex items-center gap-3 mb-4">
                <useCase.icon className={`text-2xl ${useCase.color}`} />
                <CardTitle level={5} color="text-dark-text">
                  {useCase.title}
                </CardTitle>
              </div>
              
              <p className="text-dark-text/70 text-sm mb-4">
                {useCase.description}
              </p>
              
              <div className="space-y-2">
                {useCase.steps.map((step, stepIndex) => (
                  <div
                    key={stepIndex}
                    className="flex items-center gap-3 text-sm"
                  >
                    <div className="w-6 h-6 rounded-full bg-neon-blue/20 text-neon-blue flex items-center justify-center text-xs font-bold">
                      {stepIndex + 1}
                    </div>
                    <span className="text-dark-text/80">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  </motion.div>
);

UseCases.propTypes = {
  useCases: PropTypes.array.isRequired,
  isVisible: PropTypes.bool.isRequired
};

/**
 * Componente principal AIProductivity
 */
const AIProductivity = () => {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true
  });

  const categories = useMemo(() => Object.entries(AI_TOOLS), []);

  return (
    <motion.section
      id="ai-productivity"
      ref={elementRef}
      className="py-20 relative"
      variants={AI_ANIMATIONS.container}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      aria-label="Herramientas de IA y productividad"
    >
      <div className="container mx-auto px-4">
        <SectionTitle
          title="IA & Productividad"
          subtitle="Herramientas de inteligencia artificial que uso para optimizar mi desarrollo y aumentar la productividad"
        />

        {/* Beneficios */}
        <AIBenefits benefits={AI_BENEFITS} isVisible={isVisible} />

        {/* Categorías de herramientas */}
        <div className="space-y-16">
          {categories.map(([categoryKey, category]) => (
            <AIToolCategory
              key={categoryKey}
              category={category}
              tools={category.tools}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Casos de uso */}
        <UseCases useCases={USE_CASES} isVisible={isVisible} />

        {/* Call to action */}
        <motion.div
          variants={AI_ANIMATIONS.section}
          className="text-center"
        >
          <Card variant="gradient" padding="lg" animation="glow">
            <CardContent>
              <div className="max-w-2xl mx-auto">
                <motion.div
                  variants={AI_ANIMATIONS.float}
                  animate="animate"
                  className="text-neon-blue text-4xl mb-4"
                >
                  <MdSmartToy className="mx-auto" />
                </motion.div>
                <CardTitle level={4} className="mb-4" color="text-dark-text">
                  El Futuro es Ahora
                </CardTitle>
                <p className="text-dark-text/70 mb-6">
                  La IA no reemplaza al desarrollador, lo potencia. Uso estas herramientas para crear 
                  soluciones más eficientes, código más limpio y documentación más clara.
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <span className="px-4 py-2 bg-neon-blue/20 text-neon-blue rounded-full">
                    Desarrollo asistido por IA
                  </span>
                  <span className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full">
                    Productividad optimizada
                  </span>
                  <span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full">
                    Calidad mejorada
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
};

AIProductivity.displayName = 'AIProductivity';

export default AIProductivity; 