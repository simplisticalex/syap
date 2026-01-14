import { useState, useEffect } from 'react';

// Кастомный хук для работы с localStorage
export const useLocalStorage = (key, initialValue) => {
  // Получаем значение из localStorage или используем initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Обновляем localStorage при изменении значения
  const setValue = (value) => {
    try {
      // Позволяем обновлять значение через функцию
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};