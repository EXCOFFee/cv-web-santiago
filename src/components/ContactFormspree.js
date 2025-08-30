/**
 * ContactFormspree.js - Versión del formulario para GitHub Pages con Formspree
 * 
 * Reemplaza el formulario PHP por integración con Formspree
 * Para usar en GitHub Pages donde PHP no está disponible
 */

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  FaEnvelope, FaPaperPlane, FaCheck, FaExclamationTriangle,
  FaSpinner, FaUser
} from 'react-icons/fa';
import PropTypes from 'prop-types';

// Importar componentes necesarios
import { BaseValidator, FieldValidators } from '../utils/validationUtils';
import { formConfig } from '../constants/personalData';
import Card, { CardHeader, CardTitle, CardContent } from './UI/Card';
import Button from './UI/Button';

/**
 * CONFIGURACIÓN DE FORMSPREE
 * 
 * 1. Ve a https://formspree.io
 * 2. Crea una cuenta gratuita
 * 3. Crea un nuevo formulario
 * 4. Reemplaza 'YOUR_FORM_ID' con tu ID real de Formspree
 */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

/**
 * Estados del formulario
 */
const FORM_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
};

/**
 * Configuración inicial del formulario
 */
const INITIAL_FORM_DATA = {
  name: '',
  email: '',
  subject: '',
  message: ''
};

/**
 * Componente para el campo de formulario
 */
const FormField = ({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  error, 
  placeholder,
  required = false,
  rows = null,
  disabled = false,
  icon: Icon = null
}) => {
  const Component = rows ? 'textarea' : 'input';
  
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-dark-text">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-text/50" />
        )}
        <Component
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          required={required}
          className={`w-full px-4 py-3 ${Icon ? 'pl-10' : ''} bg-dark-bg border rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neon-blue/50 focus:border-neon-blue disabled:opacity-50 disabled:cursor-not-allowed ${
            error 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' 
              : 'border-dark-border hover:border-neon-blue/50'
          } text-dark-text placeholder-dark-text/50`}
        />
      </div>
      {error && (
        <div className="flex items-center gap-2 text-red-400 text-sm">
          <FaExclamationTriangle className="text-xs" />
          {error}
        </div>
      )}
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  rows: PropTypes.number,
  disabled: PropTypes.bool,
  icon: PropTypes.elementType
};

/**
 * Componente para el formulario de contacto con Formspree
 */
const ContactFormspree = ({ isVisible }) => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(FORM_STATUS.IDLE);
  const [submitMessage, setSubmitMessage] = useState('');

  /**
   * Maneja los cambios en los campos del formulario
   */
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo si existe
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  }, [errors]);

  /**
   * Valida el formulario completo
   */
  const validateForm = useCallback(() => {
    const newErrors = {};

    // Validar nombre
    const nameValidation = BaseValidator.required(formData.name);
    if (!nameValidation.isValid) {
      newErrors.name = 'El nombre es requerido';
    } else {
      const nameLengthValidation = BaseValidator.minLength(formData.name, 2);
      if (!nameLengthValidation.isValid) {
        newErrors.name = 'El nombre debe tener al menos 2 caracteres';
      }
    }

    // Validar email
    const emailRequiredValidation = BaseValidator.required(formData.email);
    if (!emailRequiredValidation.isValid) {
      newErrors.email = 'El email es requerido';
    } else {
      const emailValidation = FieldValidators.email(formData.email);
      if (!emailValidation.isValid) {
        newErrors.email = 'El email no es válido';
      }
    }

    // Validar asunto
    const subjectValidation = BaseValidator.required(formData.subject);
    if (!subjectValidation.isValid) {
      newErrors.subject = 'El asunto es requerido';
    } else {
      const subjectLengthValidation = BaseValidator.minLength(formData.subject, 5);
      if (!subjectLengthValidation.isValid) {
        newErrors.subject = 'El asunto debe tener al menos 5 caracteres';
      }
    }

    // Validar mensaje
    const messageValidation = BaseValidator.required(formData.message);
    if (!messageValidation.isValid) {
      newErrors.message = 'El mensaje es requerido';
    } else {
      const messageMinValidation = BaseValidator.minLength(formData.message, formConfig.validation.minMessageLength);
      if (!messageMinValidation.isValid) {
        newErrors.message = `El mensaje debe tener al menos ${formConfig.validation.minMessageLength} caracteres`;
      } else {
        const messageMaxValidation = BaseValidator.maxLength(formData.message, formConfig.validation.maxMessageLength);
        if (!messageMaxValidation.isValid) {
          newErrors.message = `El mensaje no puede exceder ${formConfig.validation.maxMessageLength} caracteres`;
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  /**
   * Envía el formulario a Formspree
   */
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setStatus(FORM_STATUS.LOADING);
    setSubmitMessage('');

    try {
      // Enviar datos a Formspree
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus(FORM_STATUS.SUCCESS);
        setSubmitMessage('¡Mensaje enviado correctamente! Te responderé pronto.');
        setFormData(INITIAL_FORM_DATA);
      } else {
        throw new Error('Error al enviar el mensaje');
      }
    } catch (error) {
      setStatus(FORM_STATUS.ERROR);
      setSubmitMessage('Error al enviar el mensaje. Inténtalo de nuevo o contáctame directamente.');
    }
  }, [formData, validateForm]);

  /**
   * Resetea el estado del formulario
   */
  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setStatus(FORM_STATUS.IDLE);
    setSubmitMessage('');
  }, []);

  return (
    <div className="space-y-6">
      <Card variant="glass" padding="lg" animation="hover">
        <CardHeader>
          <CardTitle level={3} color="text-neon-blue">
            Envía un Mensaje
          </CardTitle>
          <p className="text-dark-text/70 mt-2">
            Completa el formulario y me pondré en contacto contigo lo antes posible.
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                label="Nombre"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={errors.name}
                placeholder="Tu nombre completo"
                required
                disabled={status === FORM_STATUS.LOADING}
                icon={FaUser}
              />

              <FormField
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                placeholder="tu@email.com"
                required
                disabled={status === FORM_STATUS.LOADING}
                icon={FaEnvelope}
              />
            </div>

            <FormField
              label="Asunto"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              error={errors.subject}
              placeholder="¿Sobre qué quieres hablar?"
              required
              disabled={status === FORM_STATUS.LOADING}
            />

            <FormField
              label="Mensaje"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              error={errors.message}
              placeholder="Describe tu proyecto o consulta..."
              required
              rows={5}
              disabled={status === FORM_STATUS.LOADING}
            />

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                buttonType="submit"
                variant="primary"
                size="lg"
                disabled={status === FORM_STATUS.LOADING}
                className="flex-grow"
              >
                {status === FORM_STATUS.LOADING ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="mr-2" />
                    Enviar Mensaje
                  </>
                )}
              </Button>

              {status !== FORM_STATUS.IDLE && (
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  onClick={resetForm}
                  disabled={status === FORM_STATUS.LOADING}
                >
                  Resetear
                </Button>
              )}
            </div>
          </form>

          {/* Mensaje de estado */}
          {submitMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-4 rounded-xl flex items-center gap-3 ${
                status === FORM_STATUS.SUCCESS 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-red-500/20 text-red-400'
              }`}
            >
              {status === FORM_STATUS.SUCCESS ? (
                <FaCheck className="text-xl" />
              ) : (
                <FaExclamationTriangle className="text-xl" />
              )}
              <span>{submitMessage}</span>
            </motion.div>
          )}

          {/* Información sobre Formspree */}
          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
            <div className="flex items-start gap-3">
              <FaEnvelope className="text-blue-400 mt-1" />
              <div className="text-sm">
                <p className="text-blue-400 font-medium mb-1">Formulario powered by Formspree</p>
                <p className="text-dark-text/70">
                  Este formulario está configurado para GitHub Pages. 
                  Los mensajes se enviarán directamente a mi email.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

ContactFormspree.propTypes = {
  isVisible: PropTypes.bool.isRequired
};

export default ContactFormspree;
