export { useStyles, styles } from './styles';
export { useLayoutStyles, layoutStyles } from './layout-styles';
export { useButtonStyles, buttonStyles } from './buttons';
export { useModalStyles, modalStyles } from './modals';

//Note: the static styles are fallbacks for when the hook styles are not available. However, since the default theme is alreadyset to "light" in the ThemeProvider, the static styles are not needed in this project. Leaving them here for reference.
