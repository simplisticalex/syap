// Пример использования наследования для переиспользования кода
export class BaseComponent {
  constructor(props) {
    this.props = props;
    this.state = {};
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
  }

  componentDidMount() {
    // Базовая логика при монтировании
    console.log('Base component mounted');
  }

  componentWillUnmount() {
    // Базовая логика при размонтировании
    console.log('Base component unmounted');
  }
}

// Пример декоратора для логирования
export function withLogging(WrappedComponent) {
  return function EnhancedComponent(props) {
    console.log(`Rendering component: ${WrappedComponent.name}`);
    
    return WrappedComponent(props);
  };
}

// Пример декоратора для обработки ошибок
export function withErrorBoundary(WrappedComponent) {
  return function ErrorBoundary(props) {
    try {
      return WrappedComponent(props);
    } catch (error) {
      console.error(`Error in ${WrappedComponent.name}:`, error);
      return { type: 'div', props: { children: 'An error occurred' } };
    }
  };
}

// Функция для создания memoized селекторов (альтернатива reselect если нужно больше)
export const createSelector = (...functions) => {
  let lastArgs = null;
  let lastResult = null;

  return (...args) => {
    if (lastArgs && args.every((arg, index) => arg === lastArgs[index])) {
      return lastResult;
    }

    lastArgs = args;
    lastResult = functions.reduce((acc, fn) => fn(acc), args[0]);
    return lastResult;
  };
};