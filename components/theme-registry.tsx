import { siteContent } from "@/lib/content";
import { hexToHsl } from "@/lib/utils";

export function ThemeRegistry() {
    // Helper to convert camelCase to kebab-case
    const toKebabCase = (str: string) => str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

    const generateCssVars = (colors: Record<string, any>, prefix: string = "") => {
        let css = "";
        Object.entries(colors).forEach(([key, value]) => {
            if (typeof value === "string") {
                const varName = prefix ? `${prefix}-${toKebabCase(key)}` : toKebabCase(key);
                const cssVar = `--${varName}`;
                if (value.startsWith("#")) {
                    css += `${cssVar}: ${hexToHsl(value)};\n`;
                } else {
                    css += `${cssVar}: ${value};\n`;
                }
            } else if (typeof value === "object") {
                // Recursive for nested objects (like palette)
                const newPrefix = prefix ? `${prefix}-${toKebabCase(key)}` : toKebabCase(key);
                css += generateCssVars(value, newPrefix);
            }
        });
        return css;
    };

    if (!siteContent.theme) return null;

    const lightVars = generateCssVars(siteContent.theme.colors.light);
    const darkVars = generateCssVars(siteContent.theme.colors.dark);
    
    // Generate vars for palette (always in root/light, unless we want dark mode palette overrides)
    // For now, palette is static across modes unless specified otherwise.
    // We'll put it in :root.
    const paletteVars = siteContent.theme.palette ? generateCssVars(siteContent.theme.palette) : "";
    const gradientVars = siteContent.theme.gradient ? generateCssVars(siteContent.theme.gradient, "gradient") : "";

    const borderRadius = siteContent.theme.borderRadius;

    const css = `
        :root {
            ${lightVars}
            ${paletteVars}
            ${gradientVars}
            --radius: ${borderRadius};
        }
        .dark {
            ${darkVars}
        }
    `;

    return (
        <style dangerouslySetInnerHTML={{ __html: css }} />
    );
}

