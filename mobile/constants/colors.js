const coffeeTheme = {
  primary: "#8B593E",
  background: "#FFF8F3",
  text: "#4A3428",
  border: "#E5D3B7",
  white: "#FFFFFF",
  textLight: "#9A8478",
  card: "#FFFFFF",
  shadow: "#000000",
};

const forestTheme = {
  primary: "#2E7D32",
  background: "#E8F5E9",
  text: "#1B5E20",
  border: "#C8E6C9",
  white: "#FFFFFF",
  textLight: "#66BB6A",
  card: "#FFFFFF",
  shadow: "#000000",
};

const purpleTheme = {
  primary: "#6A1B9A",
  background: "#F3E5F5",
  text: "#4A148C",
  border: "#D1C4E9",
  white: "#FFFFFF",
  textLight: "#BA68C8",
  card: "#FFFFFF",
  shadow: "#000000",
};

const oceanTheme = {
  primary: "#0277BD",
  background: "#E1F5FE",
  text: "#01579B",
  border: "#B3E5FC",
  white: "#FFFFFF",
  textLight: "#4FC3F7",
  card: "#FFFFFF",
  shadow: "#000000",
};

const sunsetTheme = {
  primary: "#FF7E67",
  background: "#FFF3F0",
  text: "#2C1810",
  border: "#FFD5CC",
  white: "#FFFFFF",
  textLight: "#FFA494",
  card: "#FFFFFF",
  shadow: "#000000",
};

const mintTheme = {
  primary: "#00B5B5",
  background: "#E8F6F6",
  text: "#006666",
  border: "#B2E8E8",
  white: "#FFFFFF",
  textLight: "#66D9D9",
  card: "#FFFFFF",
  shadow: "#000000",
};

const midnightTheme = {
  primary: "#2C3E50",
  background: "#F4F6F7",
  text: "#1A2530",
  border: "#D5D8DC",
  white: "#FFFFFF",
  textLight: "#7F8C8D",
  card: "#FFFFFF",
  shadow: "#000000",
};

const roseGoldTheme = {
  primary: "#E0BFB8",
  background: "#FDF6F5",
  text: "#4A3B38",
  border: "#F2D9D5",
  white: "#FFFFFF",
  textLight: "#C9A9A6",
  card: "#FFFFFF",
  shadow: "#000000",
};

// Costomize color theme
const dietAIOceanTheme = {
  // Keep your ocean blues but add health greens
  primary: "#0277BD",           // Your ocean blue
  secondary: "#10B981",         // Health green
  
  background: "#E1F5FE",        // Your light cyan
  backgroundAlt: "#F0F9FF",     // Slightly more neutral
  
  text: "#01579B",              // Your dark blue
  textSecondary: "#047857",     // Dark green for variety
  textLight: "#4FC3F7",         // Your light blue
  
  border: "#B3E5FC",            // Your light blue border
  card: "#FFFFFF",              // White cards
  
  // Additional colors for diet app
  success: "#73c5abff",           // Ocean-tinted green
  warning: "#0891B2",           // Ocean-tinted orange
  accent: "#7C3AED",            // Purple accent
}

const dietlyTheme = {
  background: "#F0FDF4",
  primary: "#10B981", //#1c644cff
  secondary: "#3B82F6",
  accent: "#14B8A6",
  text: "#111827",
  textLight: "#6B7280",
  border: "#D1D5DB",
  success: "#1b7d3fff",
  warning: "#F59E0B",
  error: "#EF4444",
  white: "#FFFFFF",
};

export const Colors = {
  primary: "#16a34a",
  secondary: "#22c55e",
  accent: "#0ea5e9",
  background: "#f9fafb",
  textDark: "#111827",
  textLight: "#6b7280",
};

export const THEMES = {
  coffee: coffeeTheme,
  forest: forestTheme,
  purple: purpleTheme,
  ocean: oceanTheme,
  sunset: sunsetTheme,
  mint: mintTheme,
  midnight: midnightTheme,
  roseGold: roseGoldTheme,
  dieAI: dietAIOceanTheme,
  dietly: dietlyTheme,
  color: Colors,
};

// 👇 change this to switch theme
export const COLORS = THEMES.dietly;