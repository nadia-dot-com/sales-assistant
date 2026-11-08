import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
  theme: {
    breakpoints: {
      xs: "384px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1152px",
      xxl: "1536px",
    },
    tokens: {
      fonts: {
        body: { value: "var(--text-font-family)" },
        heading: { value: "var(--heading-font-family)" },
      },
    },
    keyframes: {
      popIn: {
        "0%": { transform: "scale(0)", opacity: 0 },
        "70%": { transform: "scale(1.15)", opacity: 1 },
        "100%": { transform: "scale(1)", opacity: 1 },
      },
      voicePulse: {
        "0%": { transform: "scale(1)" },
        "70%": { transform: "scaleY(1.15)" },
        "100%": { transform: "scale(1)" },
      },
    },
    semanticTokens: {
      colors: {
        "active-text-color": { value: "var(--active-text-color)" },
        "background-color": { value: "var(--background-color)" },
        "destructive-color": { value: "var(--destructive-color)" },
        "dark-background-color": { value: "var(--dark-background-color)" },
        "light-gray-background-color": {
          value: "var(--light-gray-background-color)",
        },
        "light-primary-color": { value: "var(--light-primary-color)" },
        "foreground-color": {
          DEFAULT: { value: "var(--foreground-color)" },
          muted: { value: "var(--muted-text-color)" },
        },
        "input-border-color": {
          value: "var(--input-border-color)",
        },
        "input-dark-border-color": {
          value: "var(--input-dark-border-color)",
        },
        "heading-color": { value: "var(--heading-color)" },
        "primary-color": {
          DEFAULT: { value: "var(--primary-color)" },
          hover: { value: "var(--primary-hover-color)" },
        },
        "inverse-text-color": { value: "var(--inverse-text-color)" },
        "success-color": {
          DEFAULT: { value: "var(--success-color)" },
          subtle: { value: "var(--success-color-subtle)" },
        },
        "neutral-color": { value: "var(--neutral-color)" },
        "progress-color": { value: "var(--progress-color )" },
      },
    },
  },
});
