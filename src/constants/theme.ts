import { Platform } from 'react-native';

export const Colors = {
  primary: '#FF4500',
  primaryDark: '#CC3700',
  primaryLight: '#FF6B3D',
  secondary: '#1A1A2E',
  accent: '#FFD700',
  surface: '#FFFFFF',
  surfaceElevated: '#FFF8F5',
  background: '#F5F0EB',
  backgroundDark: '#1A1A2E',
  text: '#1A1A2E',
  textSecondary: '#6B7280',
  textLight: '#FFFFFF',
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  shadow: 'rgba(255, 69, 0, 0.15)',
  overlay: 'rgba(26, 26, 46, 0.6)',
  statusNew: '#3B82F6',
  statusCooking: '#F59E0B',
  statusDelivering: '#8B5CF6',
  statusDelivered: '#22C55E',

  light: {
    text: '#1A1A2E',
    background: '#F5F0EB',
    tint: '#FF4500',
    icon: '#6B7280',
    tabIconDefault: '#9CA3AF',
    tabIconSelected: '#FF4500',
  },
  dark: {
    text: '#FFFFFF',
    background: '#1A1A2E',
    tint: '#FF6B3D',
    icon: '#9CA3AF',
    tabIconDefault: '#6B7280',
    tabIconSelected: '#FF6B3D',
  },
};

export const Typography = {
  displayLarge: { fontSize: 36, fontWeight: '800' as const, letterSpacing: -1 },
  displayMedium: { fontSize: 28, fontWeight: '700' as const, letterSpacing: -0.5 },
  headlineLarge: { fontSize: 24, fontWeight: '700' as const },
  headlineMedium: { fontSize: 20, fontWeight: '600' as const },
  titleLarge: { fontSize: 18, fontWeight: '600' as const },
  titleMedium: { fontSize: 16, fontWeight: '600' as const },
  bodyLarge: { fontSize: 16, fontWeight: '400' as const },
  bodyMedium: { fontSize: 14, fontWeight: '400' as const },
  labelLarge: { fontSize: 14, fontWeight: '600' as const },
  labelMedium: { fontSize: 12, fontWeight: '500' as const },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  full: 999,
};

export const Shadow = {
  small: {
    shadowColor: '#FF4500',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  medium: {
    shadowColor: '#FF4500',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  large: {
    shadowColor: '#1A1A2E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});