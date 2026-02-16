import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@/contexts/ThemeContext';

const AllTheProviders = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

const customRender = (ui, options = {}) =>
  render(ui, {
    wrapper: AllTheProviders,
    ...options,
  });

export * from '@testing-library/react-native';
export { customRender as render };
