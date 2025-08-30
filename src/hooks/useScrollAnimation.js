/**
 * Hook personalizado para manejar animaciones basadas en scroll
 * 
 * PRINCIPIO SOLID: Single Responsibility Principle (SRP)
 * - Este hook tiene una sola responsabilidad: manejar la lógica de scroll y visibilidad
 * 
 * @param {Object} options - Opciones de configuración para el observer
 * @param {number} options.threshold - Umbral de visibilidad (0-1)
 * @param {boolean} options.triggerOnce - Si la animación debe ejecutarse solo una vez
 * @returns {Object} - Ref y estado de visibilidad
 */

import { useEffect, useRef, useState } from 'react';

const useScrollAnimation = (options = {}) => {
  // Configuración por defecto siguiendo el principio de valores predeterminados
  const { 
    threshold = 0.1, 
    triggerOnce = true,
    rootMargin = '0px 0px -50px 0px' 
  } = options;

  // Estado para controlar la visibilidad del elemento
  const [isVisible, setIsVisible] = useState(false);
  
  // Referencia al elemento DOM que queremos observar
  const elementRef = useRef(null);

  useEffect(() => {
    // Referencia actual del elemento para evitar problemas de closure
    const currentElement = elementRef.current;
    
    // Verificar si el browser soporta IntersectionObserver
    if (!currentElement || !window.IntersectionObserver) {
      return;
    }

    /**
     * Callback del IntersectionObserver
     * Se ejecuta cuando la visibilidad del elemento cambia
     * 
     * @param {IntersectionObserverEntry[]} entries - Array de entradas observadas
     */
    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        // Si el elemento está visible en el viewport
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Si solo queremos que se ejecute una vez, dejamos de observar
          if (triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else if (!triggerOnce) {
          // Si no es triggerOnce, permitimos que la animación se revierta
          setIsVisible(false);
        }
      });
    };

    // Crear el observer con las opciones configuradas
    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin
    });

    // Comenzar a observar el elemento
    observer.observe(currentElement);

    // Cleanup function: dejar de observar cuando el componente se desmonte
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, triggerOnce, rootMargin]); // Dependencias del useEffect

  // Retornar la referencia y el estado de visibilidad
  return { elementRef, isVisible };
};

export default useScrollAnimation; 