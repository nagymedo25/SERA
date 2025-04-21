/**
 * Converts a hex color string to an RGB object
 * @param {string} hex - Hex color code (with or without #)
 * @returns {{r: number, g: number, b: number}} RGB color object
 */
export function hexToRgb(hex: string): { r: number, g: number, b: number } | null {
  // Check if input is already rgba format
  const rgbaMatch = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/.exec(hex);
  if (rgbaMatch) {
    return {
      r: parseInt(rgbaMatch[1], 10),
      g: parseInt(rgbaMatch[2], 10),
      b: parseInt(rgbaMatch[3], 10)
    };
  }

  // Remove the hash if it exists
  const cleanHex = hex.startsWith('#') ? hex.slice(1) : hex;
  
  // Check for valid hex format (3 or 6 characters)
  const validHex = /^([A-Fa-f0-9]{3}){1,2}$/.test(cleanHex);
  
  if (!validHex) {
    console.warn(`Invalid hex color: ${hex}`);
    return null;
  }
  
  // If shorthand hex (e.g. #FFF), convert to full form
  const fullHex = cleanHex.length === 3
    ? cleanHex.split('').map(char => char + char).join('')
    : cleanHex;
    
  // Parse the hex values
  const r = parseInt(fullHex.slice(0, 2), 16);
  const g = parseInt(fullHex.slice(2, 4), 16);
  const b = parseInt(fullHex.slice(4, 6), 16);
  
  return { r, g, b };
}

/**
 * Converts an RGB object to a CSS rgba string
 * @param {{r: number, g: number, b: number}} rgb - RGB color object
 * @param {number} alpha - Alpha value (0-1)
 * @returns {string} CSS rgba string
 */
export function rgbToRgbaString(rgb: { r: number, g: number, b: number }, alpha: number = 1): string {
  if (!rgb) return 'rgba(0, 0, 0, 0)';
  const { r, g, b } = rgb;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Converts a hex color directly to an rgba string
 * @param {string} hex - Hex color code
 * @param {number} alpha - Alpha value (0-1)
 * @returns {string} CSS rgba string
 */
export function hexToRgba(hex: string, alpha: number = 1): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return 'rgba(0, 0, 0, 0)';
  return rgbToRgbaString(rgb, alpha);
} 