export const CATEGORIES = [
  "cctv",
  "network-solution",
  "softwares",
  "computer-laptops",
  "satellite",
  "fiber-solution",
  "interphone-solution",
  "3d-printers-cnc",
  "automation-system",
] as const;

export type Category = typeof CATEGORIES[number]; 