export const useRouter = jest.fn(() => ({
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
}));

export const usePathname = jest.fn(() => '/');

export const useSegments = jest.fn(() => []);

export const useLocalSearchParams = jest.fn(() => ({}));

export const useGlobalSearchParams = jest.fn(() => ({}));

export const Stack = jest.fn(({ children }) => children);

export const Slot = jest.fn(({ children }) => children);

export const Redirect = jest.fn(() => null);

export const Link = jest.fn(({ children, ...props }) => ({ type: 'Link', children, ...props }));

export const Tabs = jest.fn(({ children }) => children);
