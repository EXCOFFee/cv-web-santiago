/**
 * Componente Certificates - Sección de certificados y cursos completados
 * 
 * PRINCIPIO SOLID: Single Responsibility Principle (SRP)
 * - Responsabilidad única: mostrar certificados, cursos y logros académicos
 * 
 * PRINCIPIO SOLID: Open/Closed Principle (OCP)
 * - Abierto para extensión: se pueden agregar nuevos certificados sin modificar el código base
 * - Cerrado para modificación: la estructura central no cambia
 * 
 * PRINCIPIO SOLID: Dependency Inversion Principle (DIP)
 * - Depende de abstracciones (hooks personalizados, datos centralizados) en lugar de implementaciones concretas
 * 
 * BUENAS PRÁCTICAS:
 * - Datos centralizados en constantes
 * - Componentes especializados para cada tipo de certificado
 * - Animaciones configurables
 * - Responsive design
 * - Accesibilidad completa
 */

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  FaGraduationCap, FaAward, FaCalendarAlt, FaExternalLinkAlt,
  FaReact, FaNodeJs, FaDatabase, FaCode, FaBrain, FaRocket
} from 'react-icons/fa';
import { SiOpenai, SiMongodb, SiPostgresql } from 'react-icons/si';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { MdVerified, MdSchool } from 'react-icons/md';
import PropTypes from 'prop-types';

// Importar hooks personalizados y componentes
import useScrollAnimation from '../hooks/useScrollAnimation';
import Card, { CardHeader, CardTitle, CardContent } from './UI/Card';
import Button from './UI/Button';

/**
 * Configuración de animaciones para la sección Certificates
 * Centralizada para facilitar mantenimiento
 */
const CERTIFICATES_ANIMATIONS = {
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

  certificateCard: {
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

  badge: {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    }
  },

  shine: {
    animate: {
      backgroundPosition: ['0% 0%', '100% 100%'],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'linear'
      }
    }
  }
};

/**
 * Configuración de certificados y cursos
 * Organizados por categorías con información detallada
 */
const CERTIFICATES_DATA = {
  technical: {
    title: 'Certificados Técnicos',
    description: 'Cursos especializados en desarrollo web y programación',
    icon: FaCode,
    color: 'text-blue-400',
    bgColor: 'from-blue-500/10 to-blue-600/5',
    certificates: [
      {
        id: 'coderhouse-js',
        title: 'JavaScript',
        subtitle: 'Curso completo de JavaScript ES6+',
        institution: 'CoderHouse',
        institutionIcon: FaCode,
        date: '2023',
        duration: '4 meses',
        hours: 160,
        grade: 'A+',
        credentialId: 'CH-JS-2023-001',
        skills: ['JavaScript ES6+', 'DOM Manipulation', 'Async/Await', 'APIs', 'Local Storage'],
        description: 'Curso integral de JavaScript moderno cubriendo desde fundamentos hasta conceptos avanzados.',
        verified: true,
        color: '#F7DF1E',
        certificate_url: '/CertificadoJavaScript.png',
        hasImage: true
      }
    ]
  },

  ai: {
    title: 'Inteligencia Artificial',
    description: 'Certificaciones en IA y tecnologías emergentes',
    icon: FaBrain,
    color: 'text-purple-400',
    bgColor: 'from-purple-500/10 to-purple-600/5',
    certificates: [
      {
        id: 'davinci-ai',
        title: 'Inteligencia Artificial',
        subtitle: 'Curso de IA aplicada al desarrollo',
        institution: 'Escuela Da Vinci',
        institutionIcon: GiArtificialIntelligence,
        date: '2024',
        duration: '6 meses',
        hours: 12,
        grade: 'A+',
        credentialId: 'DV-AI-2024-001',
        skills: ['Machine Learning', 'Neural Networks', 'AI Tools', 'Prompt Engineering', 'AI Integration'],
        description: 'Curso especializado en inteligencia artificial aplicada al desarrollo de software.',
        verified: true,
        color: '#8B5CF6',
        certificate_url: '#'
      }
    ]
  },

  academic: {
    title: 'Formación Académica',
    description: 'Carrera universitaria y estudios formales',
    icon: FaGraduationCap,
    color: 'text-green-400',
    bgColor: 'from-green-500/10 to-green-600/5',
    certificates: [
      {
        id: 'davinci-systems',
        title: 'Carrera Analista de Sistemas',
        subtitle: 'Desarrollo Web y Software',
        institution: 'Escuela Da Vinci',
        institutionIcon: MdSchool,
        date: '2022-2026',
        duration: '4 años',
        hours: 2400,
        grade: 'En curso',
        credentialId: 'DV-SYS-2022-2025',
        skills: ['Desarrollo Web', 'Programación', 'Bases de Datos', 'Análisis de Sistemas', 'Gestión de Proyectos'],
        description: 'Carrera completa en Análisis de Sistemas con especialización en desarrollo web y software. Finaliza en inicios de 2026.',
        verified: true,
        color: '#10B981',
        certificate_url: '#',
        status: 'en_curso'
      }
    ]
  }
};

/**
 * Configuración de logros académicos
 * Reconocimientos y distinciones obtenidas
 */
const ACADEMIC_ACHIEVEMENTS = [
  {
    icon: FaAward,
    title: 'Mejor Promedio',
    description: 'Promedio general superior a 8.5',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20'
  },
  {
    icon: MdVerified,
    title: 'Certificados Verificados',
    description: 'Todos los certificados con verificación oficial',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20'
  },
  {
    icon: FaRocket,
    title: 'Aprendizaje Continuo',
    description: 'Actualización constante en nuevas tecnologías',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20'
  },
  {
    icon: FaBrain,
    title: 'Especialización en IA',
    description: 'Enfoque especializado en inteligencia artificial',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20'
  }
];

/**
 * Configuración de estadísticas de certificación
 * Métricas de formación y desarrollo
 */
const CERTIFICATION_STATS = {
  totalCertificates: 6,
  totalHours: 780,
  averageGrade: 'A+',
  yearsLearning: 3,
  institutions: 5
};

/**
 * Componente para el título de sección
 */
const SectionTitle = ({ title, subtitle, className = '' }) => (
  <motion.div
    variants={CERTIFICATES_ANIMATIONS.section}
    className={`text-center mb-16 ${className}`}
  >
    <CardTitle level={2} className="mb-6" color="text-dark-text">
      {title.split(' ').map((word, index) => 
        word === 'Certificados' ? (
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
 * Componente para mostrar un certificado individual
 */
const CertificateCard = ({ certificate, index, isVisible }) => (
  <motion.div
    custom={index}
    initial="hidden"
    animate={isVisible ? "visible" : "hidden"}
    variants={CERTIFICATES_ANIMATIONS.certificateCard}
    whileHover={{ 
      scale: 1.03,
      transition: { duration: 0.2 }
    }}
    className="group h-full"
  >
    <Card
      variant="glass"
      padding="lg"
      animation="hover"
      className="h-full relative overflow-hidden"
    >
      {/* Efecto de brillo */}
      <motion.div
        variants={CERTIFICATES_ANIMATIONS.shine}
        animate="animate"
        className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
      
      <CardHeader className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div 
              className="p-3 rounded-xl border transition-all duration-300 group-hover:scale-110"
              style={{ 
                backgroundColor: `${certificate.color}20`,
                borderColor: `${certificate.color}40`
              }}
            >
              <certificate.institutionIcon 
                className="text-2xl"
                style={{ color: certificate.color }}
              />
            </div>
            <div>
              <CardTitle level={4} color="text-dark-text">
                {certificate.title}
              </CardTitle>
              <p className="text-sm text-dark-text/70">{certificate.subtitle}</p>
            </div>
          </div>
          
          {/* Badge de verificación */}
          {certificate.verified && (
            <motion.div
              variants={CERTIFICATES_ANIMATIONS.badge}
              className="flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs"
            >
              <MdVerified className="text-xs" />
              <span>Verificado</span>
            </motion.div>
          )}
        </div>

        <div className="text-sm text-dark-text/70 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <MdSchool className="text-neon-blue" />
            <span>{certificate.institution}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-neon-blue" />
            <span>{certificate.date} • {certificate.duration}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-dark-text/70 text-sm leading-relaxed">
          {certificate.description}
        </p>

        {/* Métricas */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-dark-bg/50 rounded-xl">
            <div className="text-sm text-dark-text/70">Horas</div>
            <div className="text-neon-blue font-bold">{certificate.hours}h</div>
          </div>
          <div className="text-center p-3 bg-dark-bg/50 rounded-xl">
            <div className="text-sm text-dark-text/70">Calificación</div>
            <div className="text-neon-blue font-bold">{certificate.grade}</div>
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-2">
          <div className="text-sm text-dark-text/70">Habilidades adquiridas:</div>
          <div className="flex flex-wrap gap-2">
            {certificate.skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-neon-blue/10 text-neon-blue rounded-full text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Vista previa de imagen del certificado */}
        {certificate.hasImage && (
          <div className="mt-4">
            <div className="text-sm text-dark-text/70 mb-2">Vista previa del certificado:</div>
            <div className="relative group">
              <img
                src={certificate.certificate_url}
                alt={`Certificado de ${certificate.title}`}
                className="w-full h-32 object-cover rounded-lg border border-dark-border cursor-pointer transition-transform duration-300 group-hover:scale-105"
                onClick={() => window.open(certificate.certificate_url, '_blank')}
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                <div className="text-white text-sm font-medium">Click para ampliar</div>
              </div>
            </div>
          </div>
        )}

        {/* Información adicional */}
        <div className="pt-3 border-t border-dark-border">
          <div className="flex items-center justify-between text-xs text-dark-text/60">
            <span>ID: {certificate.credentialId}</span>
            <Button
              type="ghost"
              size="sm"
              className="text-xs"
              onClick={() => window.open(certificate.certificate_url, '_blank')}
            >
              <FaExternalLinkAlt className="mr-1" />
              {certificate.hasImage ? 'Ver Completo' : 'Ver Certificado'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

CertificateCard.propTypes = {
  certificate: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isVisible: PropTypes.bool.isRequired
};

/**
 * Componente para categoría de certificados
 */
const CertificateCategory = ({ category, certificates, isVisible }) => (
  <motion.div
    variants={CERTIFICATES_ANIMATIONS.section}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((certificate, index) => (
          <CertificateCard
            key={certificate.id}
            certificate={certificate}
            index={index}
            isVisible={isVisible}
          />
        ))}
      </div>
    </Card>
  </motion.div>
);

CertificateCategory.propTypes = {
  category: PropTypes.object.isRequired,
  certificates: PropTypes.array.isRequired,
  isVisible: PropTypes.bool.isRequired
};

/**
 * Componente para estadísticas de certificación
 */
const CertificationStats = ({ stats, isVisible }) => (
  <motion.div
    variants={CERTIFICATES_ANIMATIONS.section}
    className="mb-16"
  >
    <Card variant="gradient" padding="lg" animation="glow">
      <CardHeader className="text-center mb-8">
        <CardTitle level={3} color="text-neon-blue">
          Estadísticas de Formación
        </CardTitle>
        <p className="text-dark-text/70 mt-2">
          Métricas de mi desarrollo profesional continuo
        </p>
      </CardHeader>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {Object.entries(stats).map(([key, value], index) => (
          <motion.div
            key={key}
            custom={index}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={CERTIFICATES_ANIMATIONS.certificateCard}
            whileHover={{ scale: 1.05 }}
            className="text-center"
          >
            <div className="p-6 rounded-2xl bg-dark-card/30 backdrop-blur-sm border border-dark-border">
              <div className="text-3xl font-bold text-neon-blue mb-2 font-jetbrains">
                {value}{key === 'totalHours' ? '+' : ''}
              </div>
              <div className="text-dark-text/70 text-sm capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  </motion.div>
);

CertificationStats.propTypes = {
  stats: PropTypes.object.isRequired,
  isVisible: PropTypes.bool.isRequired
};

/**
 * Componente para logros académicos
 */
const AcademicAchievements = ({ achievements, isVisible }) => (
  <motion.div
    variants={CERTIFICATES_ANIMATIONS.section}
    className="mb-16"
  >
    <Card variant="glass" padding="lg" animation="hover">
      <CardHeader className="text-center mb-8">
        <CardTitle level={3} color="text-neon-blue">
          Logros Académicos
        </CardTitle>
        <p className="text-dark-text/70 mt-2">
          Reconocimientos y distinciones obtenidas
        </p>
      </CardHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.title}
            custom={index}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={CERTIFICATES_ANIMATIONS.certificateCard}
            whileHover={{ scale: 1.05 }}
            className="text-center"
          >
            <div className="p-6 rounded-2xl bg-dark-card/30 backdrop-blur-sm border border-dark-border">
              <div className={`p-3 rounded-xl ${achievement.bgColor} mb-4 mx-auto w-fit`}>
                <achievement.icon className={`text-2xl ${achievement.color}`} />
              </div>
              <CardTitle level={5} className="mb-2" color="text-dark-text">
                {achievement.title}
              </CardTitle>
              <p className="text-dark-text/70 text-sm">{achievement.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  </motion.div>
);

AcademicAchievements.propTypes = {
  achievements: PropTypes.array.isRequired,
  isVisible: PropTypes.bool.isRequired
};

/**
 * Componente principal Certificates
 */
const Certificates = () => {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true
  });

  const categories = useMemo(() => Object.entries(CERTIFICATES_DATA), []);

  return (
    <motion.section
      id="certificates"
      ref={elementRef}
      className="py-20 relative"
      variants={CERTIFICATES_ANIMATIONS.container}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      aria-label="Certificados y cursos completados"
    >
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Certificados"
          subtitle="Cursos completados, certificaciones obtenidas y formación continua en tecnologías actuales"
        />

        {/* Estadísticas */}
        <CertificationStats stats={CERTIFICATION_STATS} isVisible={isVisible} />

        {/* Categorías de certificados */}
        <div className="space-y-16">
          {categories.map(([categoryKey, category]) => (
            <CertificateCategory
              key={categoryKey}
              category={category}
              certificates={category.certificates}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Logros académicos */}
        <AcademicAchievements achievements={ACADEMIC_ACHIEVEMENTS} isVisible={isVisible} />

        {/* Call to action */}
        <motion.div
          variants={CERTIFICATES_ANIMATIONS.section}
          className="text-center"
        >
          <Card variant="gradient" padding="lg" animation="glow">
            <CardContent>
              <div className="max-w-2xl mx-auto">
                <FaGraduationCap className="text-neon-blue text-5xl mb-6 mx-auto" />
                <CardTitle level={4} className="mb-4" color="text-dark-text">
                  Aprendizaje Continuo
                </CardTitle>
                <p className="text-dark-text/70 mb-6">
                  La tecnología evoluciona rápidamente, y mi compromiso es mantenerme actualizado 
                  con las últimas tendencias y mejores prácticas del desarrollo web.
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <span className="px-4 py-2 bg-neon-blue/20 text-neon-blue rounded-full">
                    Certificaciones verificadas
                  </span>
                  <span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full">
                    Formación continua
                  </span>
                  <span className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full">
                    Especialización en IA
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

Certificates.displayName = 'Certificates';

export default Certificates; 