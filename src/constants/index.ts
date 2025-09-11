// Color constants
export const COLORS = {
  PRIMARY: '#034EA2',
  PRIMARY_DARK: '#023A7A',
  PRIMARY_DARKER: '#012A5C',
  SUCCESS: '#368A04',
  WARNING: '#FFB03C',
  GRAY: '#D0D0D0',
  LIGHT_GRAY: '#F3F6F9',
  WHITE: '#FFFFFF',
  BLACK: '#333333',
  BORDER: '#DDDDDD',
  TEXT_SECONDARY: '#666666',
  TEXT_PLACEHOLDER: '#999999',
  BACKGROUND: '#F8F9FA',
  ERROR: '#DC3545'
};

// Status configuration
export const STATUS_CONFIG = {
  'pending': { label: 'Pending', color: COLORS.GRAY },
  'in-progress': { label: 'In Progress', color: COLORS.WARNING },
  'completed': { label: 'Completed', color: COLORS.SUCCESS }
};

// Font families
export const FONT_FAMILIES = {
  PRIMARY: 'Arial, Helvetica, sans-serif',
  SYSTEM: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
};

// Breakpoints
export const BREAKPOINTS = {
  MOBILE: '767px',
  TABLET: '768px',
  DESKTOP: '1024px'
};

// Z-index values
export const Z_INDEX = {
  MODAL: 1000,
  DROPDOWN: 100,
  HEADER: 10
};

// Animation durations
export const ANIMATION_DURATION = {
  FAST: '0.2s',
  NORMAL: '0.3s',
  SLOW: '0.5s'
};
