/**
 * Componente Contact - Sección de información de contacto
 * 
 * PRINCIPIO SOLID: Single Responsibility Principle (SRP)
 * - Responsabilidad única: mostrar información de contacto de manera organizada
 * 
 * PRINCIPIO SOLID: Open/Closed Principle (OCP)
 * - Abierto para extensión: se pueden agregar nuevos métodos de contacto
 * - Cerrado para modificación: la estructura central no cambia
 * 
 * PRINCIPIO SOLID: Dependency Inversion Principle (DIP)
 * - Depende de abstracciones (hooks personalizados, componentes UI)
 * 
 * BUENAS PRÁCTICAS:
 * - Información de contacto bien organizada
 * - Enlaces directos a diferentes medios de contacto
 * - Accesibilidad completa
 * - Responsive design
 * - Animaciones suaves y atractivas
 */

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, 
  FaClock, FaRocket
} from 'react-icons/fa';
import { SiGmail, SiWhatsapp } from 'react-icons/si';
import PropTypes from 'prop-types';

// Importar hooks personalizados, servicios y componentes
import useScrollAnimation from '../hooks/useScrollAnimation';
import Card, { CardHeader, CardTitle, CardContent } from './UI/Card';
import Button from './UI/Button';

/**
 * Configuración de animaciones para la sección Contact
 */
const CONTACT_ANIMATIONS = {
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

  slideLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  },

  slideRight: {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  },

  contactItem: {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.6,
        ease: 'easeOut'
      }
    })
  },

  pulse: {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  }
};

/**
 * Configuración de información de contacto
 */
const CONTACT_INFO = {
  primary: [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'excofier.santi@gmail.com',
      href: 'mailto:excofier.santi@gmail.com',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    },
    {
      icon: FaPhone,
      label: 'Teléfono',
      value: '+54 11 6812-9155',
      href: 'tel:+541168129155',
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Ubicación',
      value: 'Argentina',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20'
    }
  ],

  social: [
    {
      icon: FaGithub,
      label: 'GitHub',
      value: '@EXCOFFee',
      href: 'https://github.com/EXCOFFee',
      color: 'text-gray-400',
      bgColor: 'bg-gray-500/20'
    },
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      value: '/santiago-excofier-4649982b9',
      href: 'https://www.linkedin.com/in/santiago-excofier-4649982b9/',
      color: 'text-blue-600',
      bgColor: 'bg-blue-600/20'
    }
  ],

  messaging: [
    {
      icon: SiWhatsapp,
      label: 'WhatsApp',
      value: '+54 11 6812-9155',
      href: 'https://wa.me/541168129155',
      color: 'text-green-500',
      bgColor: 'bg-green-500/20'
    },
    {
      icon: SiGmail,
      label: 'Gmail',
      value: 'Enviar email',
      href: 'mailto:excofier.santi@gmail.com',
      color: 'text-red-500',
      bgColor: 'bg-red-500/20'
    }
  ]
};

/**
 * Configuración de disponibilidad
 */
const AVAILABILITY_INFO = {
  status: 'Disponible',
  statusColor: 'text-green-400',
  statusBg: 'bg-green-500/20',
  workingHours: 'Lun - Vie: 9:00 - 18:00 (UTC-3)',
  responseTime: 'Respuesta en 24 horas',
  timezone: 'Zona horaria: UTC-3 (Argentina)'
};

/**
 * Componente para el título de sección
 */
const SectionTitle = ({ title, subtitle, className = '' }) => (
  <motion.div
    variants={CONTACT_ANIMATIONS.section}
    className={`text-center mb-16 ${className}`}
  >
    <CardTitle level={2} className="mb-6" color="text-dark-text">
      {title.split(' ').map((word, index) => 
        word === 'Contacto' ? (
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
 * Componente para información de contacto
 */
const ContactInfoItem = ({ item, index, isVisible }) => (
  <motion.div
    custom={index}
    initial="hidden"
    animate={isVisible ? "visible" : "hidden"}
    variants={CONTACT_ANIMATIONS.contactItem}
    whileHover={{ scale: 1.05 }}
    className="group"
  >
    <div className="flex items-center gap-4 p-4 rounded-xl bg-dark-card/30 backdrop-blur-sm border border-dark-border transition-all duration-300 hover:border-neon-blue/50">
      <div className={`p-3 rounded-xl ${item.bgColor} transition-all duration-300 group-hover:scale-110`}>
        <item.icon className={`text-xl ${item.color}`} />
      </div>
      <div className="flex-grow">
        <div className="text-dark-text font-medium">{item.label}</div>
        <div className="text-dark-text/70 text-sm">{item.value}</div>
      </div>
      {item.href && (
        <Button
                          type="ghost"
          size="sm"
          onClick={() => window.open(item.href, '_blank')}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          Abrir
        </Button>
      )}
    </div>
  </motion.div>
);

ContactInfoItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isVisible: PropTypes.bool.isRequired
};

/**
 * Componente para información de disponibilidad
 */
const AvailabilityInfo = ({ isVisible }) => (
  <motion.div
    variants={CONTACT_ANIMATIONS.section}
    className="mb-8"
  >
    <Card variant="gradient" padding="lg" animation="glow">
      <CardContent>
        <div className="flex items-center justify-center gap-4 mb-6">
          <motion.div
            variants={CONTACT_ANIMATIONS.pulse}
            animate="animate"
            className={`w-3 h-3 rounded-full ${AVAILABILITY_INFO.statusBg}`}
          />
          <span className={`font-medium ${AVAILABILITY_INFO.statusColor}`}>
            {AVAILABILITY_INFO.status}
          </span>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <FaClock className="text-neon-blue" />
            <span className="text-sm text-dark-text/70">{AVAILABILITY_INFO.workingHours}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <FaEnvelope className="text-neon-blue" />
            <span className="text-sm text-dark-text/70">{AVAILABILITY_INFO.responseTime}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <FaMapMarkerAlt className="text-neon-blue" />
            <span className="text-sm text-dark-text/70">{AVAILABILITY_INFO.timezone}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

AvailabilityInfo.propTypes = {
  isVisible: PropTypes.bool.isRequired
};

/**
 * Componente principal Contact
 */
const Contact = () => {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <motion.section
      id="contact"
      ref={elementRef}
      className="py-20 relative"
      variants={CONTACT_ANIMATIONS.container}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      aria-label="Información de contacto"
    >
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Contacto"
          subtitle="¿Tienes un proyecto en mente? ¡Hablemos! Estoy disponible para nuevas oportunidades y colaboraciones."
        />

        {/* Información de disponibilidad */}
        <AvailabilityInfo isVisible={isVisible} />

        {/* Información de contacto centrada */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={CONTACT_ANIMATIONS.slideLeft}
            className="space-y-8"
          >
            <Card variant="glass" padding="lg" animation="hover">
              <CardHeader>
                <CardTitle level={3} color="text-neon-blue">
                  Información de Contacto
                </CardTitle>
                <p className="text-dark-text/70 mt-2">
                  Múltiples formas de ponerte en contacto conmigo
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Contacto principal */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-dark-text mb-4">Principal</h4>
                  {CONTACT_INFO.primary.map((item, index) => (
                    <ContactInfoItem
                      key={item.label}
                      item={item}
                      index={index}
                      isVisible={isVisible}
                    />
                  ))}
                </div>

                {/* Redes sociales */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-dark-text mb-4">Redes Sociales</h4>
                  {CONTACT_INFO.social.map((item, index) => (
                    <ContactInfoItem
                      key={item.label}
                      item={item}
                      index={index + 3}
                      isVisible={isVisible}
                    />
                  ))}
                </div>

                {/* Mensajería */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-dark-text mb-4">Mensajería</h4>
                  {CONTACT_INFO.messaging.map((item, index) => (
                    <ContactInfoItem
                      key={item.label}
                      item={item}
                      index={index + 6}
                      isVisible={isVisible}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Call to action final */}
        <motion.div
          variants={CONTACT_ANIMATIONS.section}
          className="mt-16 text-center"
        >
          <Card variant="gradient" padding="lg" animation="glow">
            <CardContent>
              <div className="max-w-2xl mx-auto">
                <FaRocket className="text-neon-blue text-4xl mb-4 mx-auto" />
                <CardTitle level={4} className="mb-4" color="text-dark-text">
                  ¡Construyamos algo increíble juntos!
                </CardTitle>
                <p className="text-dark-text/70 mb-6">
                  Cada proyecto es una oportunidad para crear algo único. 
                  Si tienes una idea, yo tengo las herramientas para hacerla realidad.
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <span className="px-4 py-2 bg-neon-blue/20 text-neon-blue rounded-full">
                    Respuesta rápida
                  </span>
                  <span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full">
                    Proyectos personalizados
                  </span>
                  <span className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full">
                    Colaboración profesional
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

Contact.displayName = 'Contact';

export default Contact; 