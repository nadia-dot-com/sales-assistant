import { DM_Sans, Instrument_Sans } from "next/font/google";

export const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument",
  fallback: ["sans-serif"],
  adjustFontFallback: false,
});
export const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  fallback: ["sans-serif"],
  variable: "--font-dm",
});
