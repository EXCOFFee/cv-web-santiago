/**
 * Componente Skills - Sección de tecnologías y habilidades técnicas
 * 
 * PRINCIPIO SOLID: Single Responsibility Principle (SRP)
 * - Responsabilidad única: mostrar las tecnologías, frameworks y herramientas dominadas
 * 
 * PRINCIPIO SOLID: Open/Closed Principle (OCP)
 * - Abierto para extensión: se pueden agregar nuevas categorías de tecnologías sin modificar el código base
 * - Cerrado para modificación: la estructura central no cambia
 * 
 * PRINCIPIO SOLID: Dependency Inversion Principle (DIP)
 * - Depende de abstracciones (hooks personalizados, datos centralizados) en lugar de implementaciones concretas
 * 
 * BUENAS PRÁCTICAS:
 * - Datos centralizados en constantes
 * - Componentes especializados para cada tipo de skill
 * - Animaciones configurables
 * - Responsive design
 * - Accesibilidad completa
 */

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  FaJs, FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaPhp, FaJava, FaPython, 
  FaGitAlt, FaGithub, FaServer, FaWordpress, FaBrain, FaBug, FaLightbulb, 
  FaChartLine, FaComments, FaRandom, FaProjectDiagram, FaGraduationCap, 
  FaCode, FaLaptopCode, FaBookOpen, FaTrello, FaJira, FaCertificate, 
  FaClock, FaStar, FaUniversity
} from 'react-icons/fa';
import { 
  SiMysql, SiExpress, SiTailwindcss, SiNextdotjs, SiVuedotjs, SiAngular, 
  SiCsharp, SiOpenai, SiDotnet
} from 'react-icons/si';
import PropTypes from 'prop-types';

// Importar hooks personalizados y componentes
import useScrollAnimation from '../hooks/useScrollAnimation';
import Card, { CardHeader, CardTitle, CardContent } from './UI/Card';

/**
 * Configuración de animaciones para la sección Skills
 * Centralizada para facilitar mantenimiento
 */
const SKILLS_ANIMATIONS = {
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

  skillCard: {
    hidden: { opacity: 0, y: 30 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.05,
        duration: 0.6,
        ease: 'easeOut'
      }
    })
  },

  skillIcon: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  },

  progressBar: {
    hidden: { width: 0 },
    visible: (level) => ({
      width: `${level}%`,
      transition: {
        duration: 1.2,
        ease: 'easeOut',
        delay: 0.3
      }
    })
  }
};

/**
 * Configuración de tecnologías principales
 * Organizadas por categorías para mejor presentación
 */
const TECH_CATEGORIES = {
  languages: {
    title: 'Lenguajes de Programación',
    description: 'Lenguajes de programación principales',
    color: 'text-blue-400',
    bgColor: 'from-blue-500/10 to-blue-600/5',
    technologies: [
      { name: 'JavaScript', icon: FaJs, level: 100, experience: '3 años', color: '#F7DF1E' },
      { name: 'Java', icon: FaJava, level: 100, experience: '3 años', color: '#ED8B00' },
      { name: 'Python', icon: FaPython, level: 85, experience: '2 años', color: '#3776AB' },
      { name: 'PHP', icon: FaPhp, level: 100, experience: '3 años', color: '#777BB4' },
      { name: 'C#', icon: SiCsharp, level: 30, experience: '6 meses', color: '#239120' },
      { name: 'SQL', icon: SiMysql, level: 100, experience: '3 años', color: '#4479A1' }
    ]
  },

  web: {
    title: 'Frameworks y Tecnologías Web/Software',
    description: 'Tecnologías para desarrollo web y software',
    color: 'text-green-400',
    bgColor: 'from-green-500/10 to-green-600/5',
    technologies: [
      { name: 'React.js', icon: FaReact, level: 85, experience: '2 años', color: '#61DAFB' },
      { name: 'Node.js', icon: FaNodeJs, level: 80, experience: '2 años', color: '#339933' },
      { name: 'Express.js', icon: SiExpress, level: 75, experience: '1.5 años', color: '#000000' },
      { name: 'Laravel', icon: FaPhp, level: 80, experience: '2 años', color: '#FF2D20' },
      { name: 'API REST', icon: FaServer, level: 85, experience: '2 años', color: '#FF6B35' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, level: 85, experience: '1.5 años', color: '#06B6D4' },
      { name: 'HTML5', icon: FaHtml5, level: 100, experience: '3+ años', color: '#E34F26' },
      { name: 'CSS', icon: FaCss3Alt, level: 100, experience: '3+ años', color: '#1572B6' }
    ]
  },

  ai: {
    title: 'Inteligencia Artificial / Productividad',
    description: 'Herramientas de IA y productividad',
    color: 'text-purple-400',
    bgColor: 'from-purple-500/10 to-purple-600/5',
    technologies: [
      { name: 'ChatGPT', icon: SiOpenai, level: 100, experience: '2 años', color: '#10A37F' },
      { name: 'Anthropic Claude', icon: SiOpenai, level: 85, experience: '1.5 años', color: '#D97706' },
      { name: 'Cursor', icon: FaCode, level: 90, experience: '1.5 años', color: '#007ACC' },
      { name: 'GitHub Copilot', icon: FaGithub, level: 85, experience: '1.5 años', color: '#181717' },
      { name: 'Prompts de IA', icon: FaBrain, level: 80, experience: '2 años', color: '#8B5CF6' },
      { name: 'IA para Debug', icon: FaBug, level: 85, experience: '2 años', color: '#EF4444' }
    ]
  },

  tools: {
    title: 'Herramientas de Desarrollo y Hosting',
    description: 'Herramientas de desarrollo y hosting',
    color: 'text-orange-400',
    bgColor: 'from-orange-500/10 to-orange-600/5',
    technologies: [
      { name: 'Git', icon: FaGitAlt, level: 100, experience: '3 años', color: '#F05032' },
      { name: 'GitHub', icon: FaGithub, level: 100, experience: '3 años', color: '#181717' },
      { name: 'XAMPP', icon: FaServer, level: 100, experience: '3 años', color: '#FB7A24' },
      { name: 'PhpMyAdmin', icon: SiMysql, level: 100, experience: '3 años', color: '#4479A1' },
      { name: 'Hostinger', icon: FaServer, level: 100, experience: '3 años', color: '#0066FF' },
      { name: 'WordPress', icon: FaWordpress, level: 100, experience: '3 años', color: '#21759B' },
      { name: 'Trello', icon: FaTrello, level: 100, experience: '2 años', color: '#0052CC' },
      { name: 'Jira', icon: FaJira, level: 85, experience: '1 año', color: '#0052CC' }
    ]
  },

  database: {
    title: 'Bases de Datos',
    description: 'Sistemas de gestión de datos',
    color: 'text-cyan-400',
    bgColor: 'from-cyan-500/10 to-cyan-600/5',
    technologies: [
      { name: 'MySQL', icon: SiMysql, level: 100, experience: '3 años', color: '#4479A1' }
    ]
  },

  softSkills: {
    title: 'Habilidades Blandas y Técnicas',
    description: 'Habilidades complementarias',
    color: 'text-pink-400',
    bgColor: 'from-pink-500/10 to-pink-600/5',
    technologies: [
      { name: 'Resolución de Problemas', icon: FaLightbulb, level: 100, experience: 'Experto', color: '#F59E0B' },
      { name: 'Capacidad de Análisis', icon: FaChartLine, level: 100, experience: 'Experto', color: '#10B981' },
      { name: 'Comunicación', icon: FaComments, level: 100, experience: 'Experto', color: '#3B82F6' },
      { name: 'Adaptación', icon: FaRandom, level: 100, experience: 'Experto', color: '#8B5CF6' },
      { name: 'Gestión de Proyectos', icon: FaProjectDiagram, level: 100, experience: 'Experto', color: '#EF4444' },
      { name: 'Formación', icon: FaGraduationCap, level: 100, experience: 'Experto', color: '#06B6D4' },
      { name: 'Programación', icon: FaCode, level: 100, experience: '3 años', color: '#F7DF1E' },
      { name: 'Desarrollo de Software', icon: FaLaptopCode, level: 100, experience: '3 años', color: '#10B981' },
      { name: 'Aprendizaje Activo', icon: FaBookOpen, level: 100, experience: 'Experto', color: '#8B5CF6' }
    ]
  },

  education: {
    title: 'Formación Académica',
    description: 'Estudios y certificaciones',
    color: 'text-indigo-400',
    bgColor: 'from-indigo-500/10 to-indigo-600/5',
    technologies: [
      { name: 'Escuela Da Vinci', icon: FaGraduationCap, level: 100, experience: 'Graduado (Diciembre 2025)', color: '#6366F1', description: 'Analista de Sistemas (graduado)' },
      { name: 'CoderHouse', icon: FaGraduationCap, level: 100, experience: 'Completado', color: '#10B981', description: 'Frontend y Backend' }
    ]
  },

  developmentTypes: {
    title: 'Tipos de Desarrollo',
    description: 'Especialidades de desarrollo',
    color: 'text-teal-400',
    bgColor: 'from-teal-500/10 to-teal-600/5',
    technologies: [
      { name: 'Desarrollo Frontend', icon: FaCode, level: 85, experience: '2 años', color: '#14B8A6' },
      { name: 'Desarrollo Backend', icon: FaServer, level: 85, experience: '2 años', color: '#0EA5E9' },
      { name: 'Desarrollo Full Stack', icon: FaLaptopCode, level: 85, experience: '2 años', color: '#8B5CF6' },
      { name: 'Desarrollo Web', icon: FaHtml5, level: 90, experience: '2 años', color: '#F59E0B' },
      { name: 'Desarrollo de Software', icon: FaCode, level: 85, experience: '2 años', color: '#9333EA' }
    ]
  }
};

/**
 * Configuración de frameworks y librerías adicionales
 * Tecnologías complementarias y en aprendizaje
 */
const ADDITIONAL_FRAMEWORKS = [
  { name: 'Next.js', icon: SiNextdotjs, status: 'learning', color: '#000000' },
  { name: 'Vue.js', icon: SiVuedotjs, status: 'learning', color: '#4FC08D' },
  { name: 'Angular', icon: SiAngular, status: 'basic', color: '#DD0031' },
  { name: 'C#', icon: SiCsharp, status: 'beginner', color: '#239120' },
  { name: '.NET', icon: SiDotnet, status: 'beginner', color: '#512BD4' }
];

/**
 * Configuración de niveles de experiencia
 * Para mostrar badges y descripciones
 */
const EXPERIENCE_LEVELS = {
  expert: { label: 'Experto', color: 'text-green-400', bgColor: 'bg-green-500/20', min: 100 },
  advanced: { label: 'Avanzado', color: 'text-blue-400', bgColor: 'bg-blue-500/20', min: 85 },
  advancedSpecial: { label: 'Avanzado', color: 'text-purple-400', bgColor: 'bg-purple-500/20', min: 85 },
  intermediate: { label: 'Intermedio', color: 'text-yellow-400', bgColor: 'bg-yellow-500/20', min: 75 },
  beginner: { label: 'Principiante', color: 'text-red-400', bgColor: 'bg-red-500/20', min: 0 }
};

/**
 * Función para obtener el nivel de experiencia basado en el porcentaje
 * @param {number} level - Nivel de habilidad (0-100)
 * @returns {Object} Información del nivel de experiencia
 */
const getExperienceLevel = (level) => {
  // Ordenar niveles de mayor a menor para encontrar el nivel más alto que coincida
  const levels = Object.entries(EXPERIENCE_LEVELS).sort(([, a], [, b]) => b.min - a.min);
  const foundLevel = levels.find(([, config]) => level >= config.min);
  return foundLevel ? foundLevel[1] : EXPERIENCE_LEVELS.beginner;
};

/**
 * Componente para el título de sección
 * Reutilizable con animaciones consistentes
 */
const SectionTitle = ({ title, subtitle, className = '' }) => (
  <motion.div
    variants={SKILLS_ANIMATIONS.section}
    className={`text-center mb-16 ${className}`}
  >
    <CardTitle level={2} className="mb-6" color="text-dark-text">
      {title.split(' ').map((word, index) => 
        word === 'Tecnologías' ? (
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
 * Componente para mostrar una tecnología individual
 * Tarjeta con información detallada de cada skill
 */
const TechnologyCard = ({ tech, index, isVisible }) => {
  const experienceLevel = useMemo(() => {
    const level = getExperienceLevel(tech.level);
    // Color especial para Python y C# cuando son avanzados (85-99%)
    if ((tech.name === 'Python' || tech.name === 'C#') && tech.level >= 85 && tech.level < 100) {
      return EXPERIENCE_LEVELS.advancedSpecial;
    }
    return level;
  }, [tech.level, tech.name]);

  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={SKILLS_ANIMATIONS.skillCard}
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
            variants={SKILLS_ANIMATIONS.skillIcon}
            className="flex flex-col items-center gap-4"
          >
            {/* Icono de la tecnología */}
            <div 
              className="p-4 rounded-2xl transition-all duration-300 group-hover:scale-110"
              style={{ backgroundColor: `${tech.color}20` }}
            >
              {tech.icon ? (
                <tech.icon 
                  className="text-4xl transition-colors duration-300"
                  style={{ color: tech.color }}
                />
              ) : (
                <div className="text-4xl text-red-500">⚠️</div>
              )}
            </div>
            
            {/* Nombre de la tecnología */}
            <CardTitle level={4} color="text-dark-text">
              {tech.name}
            </CardTitle>
          </motion.div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Barra de progreso */}
          <div className="relative">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-dark-text/70">Nivel</span>
              <span className="text-sm font-medium text-neon-blue">{tech.level}%</span>
            </div>
            <div className="w-full bg-dark-bg rounded-full h-2 overflow-hidden">
              <motion.div
                custom={tech.level}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={SKILLS_ANIMATIONS.progressBar}
                className="h-full bg-gradient-to-r from-neon-blue to-blue-400 rounded-full"
              />
            </div>
          </div>

          {/* Información adicional */}
          <div className="space-y-2">
            {tech.experience !== 'Experto' && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-dark-text/70">Experiencia:</span>
                <span className="text-sm font-medium text-dark-text">{tech.experience}</span>
              </div>
            )}
            
            {tech.experience !== 'Experto' && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-dark-text/70">Nivel:</span>
                <span className={`text-xs px-2 py-1 rounded-full ${experienceLevel.bgColor} ${experienceLevel.color}`}>
                  {tech.name === 'Programación' || tech.name === 'Desarrollo de Software' ? 'Siempre Aprendiendo!!' : experienceLevel.label}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

TechnologyCard.propTypes = {
  tech: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isVisible: PropTypes.bool.isRequired
};

/**
 * Componente para una categoría de tecnologías
 * Organiza las tecnologías por categorías
 */
const TechnologyCategory = ({ category, technologies, isVisible }) => (
  <motion.div
    variants={SKILLS_ANIMATIONS.section}
    className="mb-16"
  >
    <Card
      variant="glass"
      padding="lg"
      animation="glow"
      className={`bg-gradient-to-br ${category.bgColor} border-dark-border`}
    >
      <CardHeader className="text-center mb-8">
        <CardTitle level={3} color={category.color}>
          {category.title}
        </CardTitle>
        <p className="text-dark-text/70 mt-2">{category.description}</p>
      </CardHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {technologies.map((tech, index) => (
          <TechnologyCard
            key={tech.name}
            tech={tech}
            index={index}
            isVisible={isVisible}
          />
        ))}
      </div>
    </Card>
  </motion.div>
);

TechnologyCategory.propTypes = {
  category: PropTypes.object.isRequired,
  technologies: PropTypes.array.isRequired,
  isVisible: PropTypes.bool.isRequired
};

/**
 * Componente para tecnologías en aprendizaje
 * Muestra frameworks y librerías adicionales
 */
const AdditionalFrameworks = ({ frameworks, isVisible }) => (
  <motion.div
    variants={SKILLS_ANIMATIONS.section}
    className="mb-16"
  >
    <Card variant="gradient" padding="lg" animation="glow">
      <CardHeader className="text-center mb-8">
        <CardTitle level={3} color="text-neon-blue">
          En Aprendizaje
        </CardTitle>
        <p className="text-dark-text/70 mt-2">
          Tecnologías que estoy explorando y aprendiendo actualmente
        </p>
      </CardHeader>

      <div className="flex flex-wrap justify-center gap-6">
        {frameworks.map((framework, index) => (
          <motion.div
            key={framework.name}
            custom={index}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={SKILLS_ANIMATIONS.skillCard}
            whileHover={{ scale: 1.1 }}
            className="group"
          >
            <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-dark-card/30 backdrop-blur-sm border border-dark-border">
              <div 
                className="p-3 rounded-xl transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${framework.color}20` }}
              >
                <framework.icon 
                  className="text-3xl transition-colors duration-300"
                  style={{ color: framework.color }}
                />
              </div>
              <span className="text-sm font-medium text-dark-text">{framework.name}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                framework.status === 'learning' 
                  ? 'bg-yellow-500/20 text-yellow-400' 
                  : framework.status === 'beginner'
                  ? 'bg-red-500/20 text-red-400'
                  : 'bg-blue-500/20 text-blue-400'
              }`}>
                {framework.status === 'learning' ? 'Aprendiendo' : 
                 framework.status === 'beginner' ? 'Principiante' : 'Básico'}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  </motion.div>
);

AdditionalFrameworks.propTypes = {
  frameworks: PropTypes.array.isRequired,
  isVisible: PropTypes.bool.isRequired
};

/**
 * Componente de resumen de habilidades
 * Estadísticas y métricas generales
 */
const SkillsSummary = ({ isVisible }) => {
  const stats = [
    { label: 'total Certificates', value: '3', icon: FaCertificate },
    { label: 'total Hours', value: '1600+', icon: FaClock },
    { label: 'average Grade', value: 'A+', icon: FaStar },
    { label: 'years Learning', value: '3', icon: FaGraduationCap },
    { label: 'institutions', value: '2', icon: FaUniversity }
  ];

  return (
    <motion.div
      variants={SKILLS_ANIMATIONS.section}
      className="mb-16"
    >
      <Card variant="glass" padding="lg" animation="hover">
        <CardHeader className="text-center mb-8">
          <CardTitle level={3} color="text-neon-blue">
            Resumen de Habilidades
          </CardTitle>
          <p className="text-dark-text/70 mt-2">
            Métricas generales de mi stack tecnológico
          </p>
        </CardHeader>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              custom={index}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={SKILLS_ANIMATIONS.skillCard}
              className="text-center"
            >
              <div className="p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                <div className="text-3xl font-bold text-blue-400 mb-2 font-jetbrains">
                  {stat.value}
                </div>
                <div className="text-dark-text/70 text-sm">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};

SkillsSummary.propTypes = {
  isVisible: PropTypes.bool.isRequired
};

/**
 * Componente principal Skills
 * Orquesta todas las sub-secciones de tecnologías
 */
const Skills = () => {
  // Hook personalizado para detectar visibilidad
  const { elementRef } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true
  });

  // Memoizar categorías para optimización
  const categories = useMemo(() => Object.entries(TECH_CATEGORIES), []);

  // Debug: forzar visibilidad para testing
  const debugIsVisible = true;

  return (
    <motion.section
      id="skills"
      ref={elementRef}
      className="py-20 relative"
      variants={SKILLS_ANIMATIONS.container}
      initial="hidden"
      animate={debugIsVisible ? "visible" : "hidden"}
      aria-label="Tecnologías y habilidades técnicas"
    >
      <div className="container mx-auto px-4">
        {/* Título de la sección */}
        <SectionTitle
          title="Tecnologías"
          subtitle="Stack tecnológico, frameworks y herramientas que domino para crear soluciones eficientes"
        />

        {/* Resumen de habilidades */}
        <SkillsSummary isVisible={debugIsVisible} />

        {/* Categorías de tecnologías */}
        <div className="space-y-16">
          {categories.map(([categoryKey, category]) => (
            <TechnologyCategory
              key={categoryKey}
              category={category}
              technologies={category.technologies}
              isVisible={debugIsVisible}
            />
          ))}
        </div>

        {/* Frameworks adicionales */}
        <AdditionalFrameworks 
          frameworks={ADDITIONAL_FRAMEWORKS} 
          isVisible={debugIsVisible} 
        />

        {/* Call to action */}
        <motion.div
          variants={SKILLS_ANIMATIONS.section}
          className="text-center"
        >
          <Card variant="gradient" padding="lg" animation="glow">
            <CardContent>
              <div className="max-w-2xl mx-auto">
                <div className="text-neon-blue text-4xl mb-4">🚀</div>
                <CardTitle level={4} className="mb-4" color="text-dark-text">
                  Siempre Aprendiendo
                </CardTitle>
                <p className="text-dark-text/70 mb-6">
                  La tecnología evoluciona constantemente, y yo evoluciono con ella. 
                  Siempre estoy explorando nuevas herramientas y metodologías para mejorar mis soluciones.
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <span className="px-4 py-2 bg-neon-blue/20 text-neon-blue rounded-full">
                    Aprendizaje continuo
                  </span>
                  <span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full">
                    Mejores prácticas
                  </span>
                  <span className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full">
                    Innovación constante
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

// Asignar displayName para debugging
Skills.displayName = 'Skills';

export default Skills; 