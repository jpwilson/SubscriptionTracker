export const theme = {
  // Primary gradient
  gradient: {
    primary: 'from-emerald-500 to-teal-500',
    primaryHover: 'from-emerald-600 to-teal-600',
    text: 'from-emerald-400 to-teal-400',
  },
  
  // Single colors
  colors: {
    primary: 'emerald-500',
    primaryLight: 'emerald-400',
    primaryDark: 'emerald-600',
    secondary: 'teal-500',
    secondaryLight: 'teal-400',
    secondaryDark: 'teal-600',
    accent: 'mint-400',
  },
  
  // Background effects
  effects: {
    glow: 'emerald-500/20',
    glowStrong: 'emerald-500/30',
    blur: 'teal-500/20',
    blurStrong: 'teal-500/30',
  },
  
  // Text colors
  text: {
    gradient: 'bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent',
    primary: 'text-emerald-400',
    secondary: 'text-teal-400',
    hover: 'hover:text-emerald-300',
  },
  
  // Border colors
  border: {
    primary: 'border-emerald-500',
    light: 'border-emerald-400',
    dark: 'border-emerald-600',
  },
  
  // Button styles
  button: {
    primary: 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600',
    secondary: 'bg-emerald-500 hover:bg-emerald-600',
    outline: 'border-emerald-500 text-emerald-500 hover:bg-emerald-500/10',
  },
  
  // Chart colors
  chart: {
    primary: '#10b981', // emerald-500
    secondary: '#14b8a6', // teal-500
    accent: '#34d399', // emerald-400
  },
} as const