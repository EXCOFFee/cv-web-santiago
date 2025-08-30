/**
 * Hook personalizado para manejar efectos de escritura tipo terminal
 * 
 * PRINCIPIO SOLID: Single Responsibility Principle (SRP)
 * - Responsabilidad única: manejar la lógica de animación de escritura
 * 
 * PRINCIPIO: Open/Closed Principle (OCP)
 * - Abierto para extensión: se pueden agregar nuevas opciones sin modificar el código base
 * - Cerrado para modificación: la lógica central no necesita cambios
 * 
 * @param {string[]} texts - Array de textos para rotar
 * @param {Object} options - Opciones de configuración
 * @param {number} options.typingSpeed - Velocidad de escritura en ms
 * @param {number} options.deletingSpeed - Velocidad de borrado en ms
 * @param {number} options.pauseTime - Pausa entre textos en ms
 * @returns {Object} - Estado actual del texto y configuración
 */

import { useState, useEffect, useCallback } from 'react';

const useTypingAnimation = (texts = [], options = {}) => {
  // Configuración por defecto con destructuring y valores predeterminados
  const {
    typingSpeed = 100,
    deletingSpeed = 50,
    pauseTime = 2000,
    loop = true,
    startDelay = 500
  } = options;

  // Estados para controlar la animación
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isStarted, setIsStarted] = useState(false);

  /**
   * Función para avanzar al siguiente texto en el array
   * Utiliza useCallback para optimización de rendimiento
   */
  const moveToNextText = useCallback(() => {
    setCurrentTextIndex(prevIndex => 
      loop ? (prevIndex + 1) % texts.length : Math.min(prevIndex + 1, texts.length - 1)
    );
  }, [texts.length, loop]);

  /**
   * Función para resetear el estado de escritura
   */
  const resetTypingState = useCallback(() => {
    setCurrentText('');
    setIsTyping(true);
  }, []);

  // Efecto principal para manejar la animación de escritura
  useEffect(() => {
    // Validación: verificar que hay textos para mostrar
    if (!texts.length) return;

    // Delay inicial antes de comenzar
    if (!isStarted) {
      const startTimer = setTimeout(() => {
        setIsStarted(true);
      }, startDelay);
      
      return () => clearTimeout(startTimer);
    }

    const currentFullText = texts[currentTextIndex];
    let timeoutId;

    /**
     * Función interna para manejar la lógica de escritura/borrado
     */
    const handleTyping = () => {
      if (isTyping) {
        // Modo escritura: agregar caracteres
        if (currentText.length < currentFullText.length) {
          setCurrentText(currentFullText.slice(0, currentText.length + 1));
          timeoutId = setTimeout(handleTyping, typingSpeed);
        } else {
          // Texto completo escrito, pausar antes de borrar
          timeoutId = setTimeout(() => {
            setIsTyping(false);
          }, pauseTime);
        }
      } else {
        // Modo borrado: eliminar caracteres
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
          timeoutId = setTimeout(handleTyping, deletingSpeed);
        } else {
          // Texto completamente borrado, pasar al siguiente
          moveToNextText();
          resetTypingState();
        }
      }
    };

    // Iniciar la animación
    timeoutId = setTimeout(handleTyping, isTyping ? typingSpeed : deletingSpeed);

    // Cleanup function
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [
    texts, 
    currentTextIndex, 
    currentText, 
    isTyping, 
    isStarted,
    typingSpeed, 
    deletingSpeed, 
    pauseTime, 
    startDelay,
    moveToNextText, 
    resetTypingState
  ]);

  /**
   * Función para reiniciar la animación desde el principio
   */
  const restart = useCallback(() => {
    setCurrentTextIndex(0);
    setCurrentText('');
    setIsTyping(true);
    setIsStarted(false);
  }, []);

  /**
   * Función para pausar/reanudar la animación
   */
  const [isPaused, setIsPaused] = useState(false);
  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  // Retornar el estado y funciones de control
  return {
    // Estado actual
    currentText,
    currentTextIndex,
    isTyping,
    isPaused,
    isStarted,
    
    // Funciones de control
    restart,
    togglePause,
    
    // Información útil
    progress: texts.length > 0 ? (currentTextIndex + 1) / texts.length : 0,
    totalTexts: texts.length
  };
};

export default useTypingAnimation; 