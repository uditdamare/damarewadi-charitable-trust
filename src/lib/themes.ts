// Single source of truth for the theme system. Adding a 6th theme later means
// adding an entry here + a matching `html[data-theme="..."]` block in
// src/app/globals.css — no component changes required either way.

export type ThemeId =
  | "trust-community"
  | "heritage-tradition"
  | "modern-nonprofit"
  | "warm-service"
  | "konkan-inspired";

export type ThemeDefinition = {
  id: ThemeId;
  label: string;
  description: string;
  swatches: string[];
};

export const THEMES: ThemeDefinition[] = [
  {
    id: "trust-community",
    label: "Trust & Community",
    description: "Navy, green, and gold — steady and institutional.",
    swatches: ["#283D5E", "#327F51", "#EEB64B"],
  },
  {
    id: "heritage-tradition",
    label: "Heritage & Tradition",
    description: "Warm brown and mustard gold — rooted and traditional.",
    swatches: ["#6B4226", "#2F6B3C", "#C9A227"],
  },
  {
    id: "modern-nonprofit",
    label: "Modern Non-Profit",
    description: "Cool blue and teal — clean and contemporary.",
    swatches: ["#1E3A5F", "#0F766E", "#F59E0B"],
  },
  {
    id: "warm-service",
    label: "Warm Service",
    description: "Terracotta and olive — earthy and approachable.",
    swatches: ["#8A3B12", "#4F7D42", "#E8B84A"],
  },
  {
    id: "konkan-inspired",
    label: "Konkan Inspired",
    description: "Coastal greens and a sunset coral accent.",
    swatches: ["#283D5E", "#327F51", "#EEB64B", "#64A47F", "#FC9460"],
  },
];

export const DEFAULT_THEME: ThemeId = "trust-community";
export const THEME_STORAGE_KEY = "dct-theme";

export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;
