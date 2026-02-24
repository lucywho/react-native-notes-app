import { render } from '@testing-library/react-native';

const customRender = (ui, options = {}) =>
  render(ui, {
    ...options,
  });
export * from '@testing-library/react-native';
export { customRender as render };
