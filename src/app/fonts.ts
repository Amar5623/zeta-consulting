import { Hanken_Grotesk, Instrument_Serif } from "next/font/google";
// import localFont from "next/font/local";

/**
 * design.md specifies PP Neue Montreal (sans) and Ivyora Display (serif accent).
 * Both are commercial fonts, so free stand-ins are used until you have licenses.
 *
 * To switch to Neue Montreal: put the .woff2 files in src/app/fonts/ and replace `sans` with:
 *
 *   export const sans = localFont({
 *     src: [
 *       { path: "./fonts/PPNeueMontreal-Regular.woff2", weight: "400" },
 *       { path: "./fonts/PPNeueMontreal-Medium.woff2", weight: "500" },
 *       { path: "./fonts/PPNeueMontreal-SemiBold.woff2", weight: "600" },
 *     ],
 *     variable: "--font-sans-family",
 *     display: "swap",
 *   });
 */
export const sans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans-family",
  display: "swap",
});

export const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif-family",
  display: "swap",
});
