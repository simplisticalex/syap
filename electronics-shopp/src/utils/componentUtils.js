export class BaseComponent {
  constructor(props) {
    this.props = props;
    this.state = {};
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
  }

  componentDidMount() {
    console.log('Base component mounted');
  }

  componentWillUnmount() {
    console.log('Base component unmounted');
  }
}

export function withLogging(WrappedComponent) {
  return function EnhancedComponent(props) {
    console.log(`Rendering component: ${WrappedComponent.name}`);
    
    return WrappedComponent(props);
  };
}

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