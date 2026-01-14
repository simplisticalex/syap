import { useState, useEffect } from 'react';

// Кастомный хук для debounce
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Устанавливаем таймаут для обновления значения после задержки
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Очищаем таймаут при изменении значения
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};