/**
 * Utilidades de Validación
 * 
 * PRINCIPIO SOLID: Single Responsibility Principle (SRP)
 * - Cada función tiene una responsabilidad específica de validación
 * 
 * PRINCIPIO SOLID: Open/Closed Principle (OCP)
 * - Abierto para extensión: se pueden agregar nuevas validaciones
 * - Cerrado para modificación: las validaciones existentes no cambian
 * 
 * PRINCIPIO: Dependency Inversion Principle (DIP)
 * - Los componentes dependen de estas abstracciones, no de implementaciones específicas
 */

/**
 * Expresiones regulares para validaciones comunes
 * Centralizadas para facilitar mantenimiento y reutilización
 */
export const VALIDATION_PATTERNS = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE: /^[\+]?[1-9][\d]{0,15}$/,
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  NAME: /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]{2,50}$/,
  USERNAME: /^[a-zA-Z0-9_-]{3,20}$/
};

/**
 * Mensajes de error estándar para validaciones
 * Centralizados para consistencia y mantenimiento
 */
export const VALIDATION_MESSAGES = {
  REQUIRED: 'Este campo es obligatorio',
  EMAIL_INVALID: 'Por favor, ingresa un email válido',
  PHONE_INVALID: 'Por favor, ingresa un teléfono válido',
  URL_INVALID: 'Por favor, ingresa una URL válida',
  NAME_INVALID: 'El nombre debe contener solo letras y tener entre 2-50 caracteres',
  USERNAME_INVALID: 'El usuario debe tener entre 3-20 caracteres (letras, números, _, -)',
  MIN_LENGTH: (min) => `Debe tener al menos ${min} caracteres`,
  MAX_LENGTH: (max) => `No puede tener más de ${max} caracteres`,
  CUSTOM: (message) => message
};

/**
 * Clase para resultados de validación
 * Proporciona una estructura consistente para los resultados
 */
export class ValidationResult {
  /**
   * Constructor del resultado de validación
   * @param {boolean} isValid - Si la validación es válida
   * @param {string} message - Mensaje de error o éxito
   * @param {*} value - Valor validado
   */
  constructor(isValid, message = '', value = null) {
    this.isValid = isValid;
    this.message = message;
    this.value = value;
  }

  /**
   * Crea un resultado exitoso
   * @param {*} value - Valor válido
   * @param {string} message - Mensaje opcional
   * @returns {ValidationResult}
   */
  static success(value, message = '') {
    return new ValidationResult(true, message, value);
  }

  /**
   * Crea un resultado de error
   * @param {string} message - Mensaje de error
   * @param {*} value - Valor que falló la validación
   * @returns {ValidationResult}
   */
  static error(message, value = null) {
    return new ValidationResult(false, message, value);
  }
}

/**
 * Validador base que implementa validaciones comunes
 */
export class BaseValidator {
  /**
   * Valida si un valor está presente (no es null, undefined o string vacío)
   * @param {*} value - Valor a validar
   * @param {string} customMessage - Mensaje personalizado
   * @returns {ValidationResult}
   */
  static required(value, customMessage = VALIDATION_MESSAGES.REQUIRED) {
    const isEmpty = value === null || 
                   value === undefined || 
                   (typeof value === 'string' && value.trim() === '') ||
                   (Array.isArray(value) && value.length === 0);
    
    return isEmpty 
      ? ValidationResult.error(customMessage)
      : ValidationResult.success(value);
  }

  /**
   * Valida longitud mínima de un string
   * @param {string} value - Valor a validar
   * @param {number} minLength - Longitud mínima
   * @param {string} customMessage - Mensaje personalizado
   * @returns {ValidationResult}
   */
  static minLength(value, minLength, customMessage = null) {
    if (typeof value !== 'string') {
      return ValidationResult.error('El valor debe ser un string');
    }

    const message = customMessage || VALIDATION_MESSAGES.MIN_LENGTH(minLength);
    
    return value.length >= minLength
      ? ValidationResult.success(value)
      : ValidationResult.error(message);
  }

  /**
   * Valida longitud máxima de un string
   * @param {string} value - Valor a validar
   * @param {number} maxLength - Longitud máxima
   * @param {string} customMessage - Mensaje personalizado
   * @returns {ValidationResult}
   */
  static maxLength(value, maxLength, customMessage = null) {
    if (typeof value !== 'string') {
      return ValidationResult.error('El valor debe ser un string');
    }

    const message = customMessage || VALIDATION_MESSAGES.MAX_LENGTH(maxLength);
    
    return value.length <= maxLength
      ? ValidationResult.success(value)
      : ValidationResult.error(message);
  }

  /**
   * Valida usando una expresión regular
   * @param {string} value - Valor a validar
   * @param {RegExp} pattern - Patrón de validación
   * @param {string} message - Mensaje de error
   * @returns {ValidationResult}
   */
  static pattern(value, pattern, message) {
    if (typeof value !== 'string') {
      return ValidationResult.error('El valor debe ser un string');
    }

    return pattern.test(value)
      ? ValidationResult.success(value)
      : ValidationResult.error(message);
  }
}

/**
 * Validadores específicos para diferentes tipos de datos
 */
export class FieldValidators {
  /**
   * Valida un email
   * @param {string} email - Email a validar
   * @param {string} customMessage - Mensaje personalizado
   * @returns {ValidationResult}
   */
  static email(email, customMessage = VALIDATION_MESSAGES.EMAIL_INVALID) {
    return BaseValidator.pattern(email, VALIDATION_PATTERNS.EMAIL, customMessage);
  }

  /**
   * Valida un teléfono
   * @param {string} phone - Teléfono a validar
   * @param {string} customMessage - Mensaje personalizado
   * @returns {ValidationResult}
   */
  static phone(phone, customMessage = VALIDATION_MESSAGES.PHONE_INVALID) {
    return BaseValidator.pattern(phone, VALIDATION_PATTERNS.PHONE, customMessage);
  }

  /**
   * Valida una URL
   * @param {string} url - URL a validar
   * @param {string} customMessage - Mensaje personalizado
   * @returns {ValidationResult}
   */
  static url(url, customMessage = VALIDATION_MESSAGES.URL_INVALID) {
    return BaseValidator.pattern(url, VALIDATION_PATTERNS.URL, customMessage);
  }

  /**
   * Valida un nombre
   * @param {string} name - Nombre a validar
   * @param {string} customMessage - Mensaje personalizado
   * @returns {ValidationResult}
   */
  static name(name, customMessage = VALIDATION_MESSAGES.NAME_INVALID) {
    return BaseValidator.pattern(name, VALIDATION_PATTERNS.NAME, customMessage);
  }

  /**
   * Valida un username
   * @param {string} username - Username a validar
   * @param {string} customMessage - Mensaje personalizado
   * @returns {ValidationResult}
   */
  static username(username, customMessage = VALIDATION_MESSAGES.USERNAME_INVALID) {
    return BaseValidator.pattern(username, VALIDATION_PATTERNS.USERNAME, customMessage);
  }
}

/**
 * Validador de formularios que permite validar múltiples campos
 */
export class FormValidator {
  constructor() {
    this.rules = new Map();
    this.errors = new Map();
  }

  /**
   * Añade una regla de validación para un campo
   * @param {string} fieldName - Nombre del campo
   * @param {Function[]} validators - Array de funciones validadoras
   * @returns {FormValidator} - Permite method chaining
   */
  addRule(fieldName, validators) {
    this.rules.set(fieldName, Array.isArray(validators) ? validators : [validators]);
    return this;
  }

  /**
   * Valida un campo específico
   * @param {string} fieldName - Nombre del campo
   * @param {*} value - Valor del campo
   * @returns {ValidationResult}
   */
  validateField(fieldName, value) {
    const validators = this.rules.get(fieldName);
    
    if (!validators) {
      return ValidationResult.success(value);
    }

    // Ejecutar todas las validaciones para el campo
    for (const validator of validators) {
      const result = validator(value);
      
      if (!result.isValid) {
        this.errors.set(fieldName, result.message);
        return result;
      }
    }

    // Si llegamos aquí, todas las validaciones pasaron
    this.errors.delete(fieldName);
    return ValidationResult.success(value);
  }

  /**
   * Valida todos los campos de un objeto
   * @param {Object} data - Objeto con los datos a validar
   * @returns {Object} - Resultado de la validación
   */
  validateAll(data) {
    const results = {};
    let isValid = true;

    // Validar cada campo que tiene reglas
    for (const [fieldName] of this.rules) {
      const value = data[fieldName];
      const result = this.validateField(fieldName, value);
      
      results[fieldName] = result;
      
      if (!result.isValid) {
        isValid = false;
      }
    }

    return {
      isValid,
      results,
      errors: Object.fromEntries(this.errors),
      data: isValid ? data : null
    };
  }

  /**
   * Obtiene todos los errores actuales
   * @returns {Object} - Objeto con los errores por campo
   */
  getErrors() {
    return Object.fromEntries(this.errors);
  }

  /**
   * Obtiene el error de un campo específico
   * @param {string} fieldName - Nombre del campo
   * @returns {string|null} - Mensaje de error o null
   */
  getFieldError(fieldName) {
    return this.errors.get(fieldName) || null;
  }

  /**
   * Limpia todos los errores
   */
  clearErrors() {
    this.errors.clear();
  }

  /**
   * Limpia el error de un campo específico
   * @param {string} fieldName - Nombre del campo
   */
  clearFieldError(fieldName) {
    this.errors.delete(fieldName);
  }
}

/**
 * Función de utilidad para crear validadores comunes para formularios
 */
export const createContactFormValidator = () => {
  return new FormValidator()
    .addRule('nombre', [
      (value) => BaseValidator.required(value),
      (value) => BaseValidator.minLength(value, 2),
      (value) => BaseValidator.maxLength(value, 50),
      (value) => FieldValidators.name(value)
    ])
    .addRule('email', [
      (value) => BaseValidator.required(value),
      (value) => FieldValidators.email(value)
    ])
    .addRule('mensaje', [
      (value) => BaseValidator.required(value),
      (value) => BaseValidator.minLength(value, 10),
      (value) => BaseValidator.maxLength(value, 1000)
    ]);
};

// Exportar por defecto el objeto con todas las utilidades
export default {
  BaseValidator,
  FieldValidators,
  FormValidator,
  ValidationResult,
  VALIDATION_PATTERNS,
  VALIDATION_MESSAGES,
  createContactFormValidator
}; 