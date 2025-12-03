import { hexToHsl } from "@/lib/utils";
import fs from 'fs';
import path from 'path';
import { siteContent } from "@/lib/content";

// Lese Theme aus JSON (vom Admin-Dashboard bearbeitet) mit Fallback auf statische content.ts
function getThemeData() {
    try {
        const filePath = path.join(process.cwd(), 'data', 'content.json');
        const data = fs.readFileSync(filePath, 'utf-8');
        const content = JSON.parse(data);
        return content.theme;
    } catch {
        // Fallback zur statischen content.ts wenn JSON nicht verfügbar
        return siteContent.theme;
    }
}

export function ThemeRegistry() {
    // Helper to convert camelCase to kebab-case
    const toKebabCase = (str: string) => str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

    const generateCssVars = (colors: Record<string, unknown>, prefix: string = ""): string => {
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
            } else if (typeof value === "object" && value !== null) {
                // Recursive for nested objects (like palette)
                const newPrefix = prefix ? `${prefix}-${toKebabCase(key)}` : toKebabCase(key);
                css += generateCssVars(value as Record<string, unknown>, newPrefix);
            }
        });
        return css;
    };

    const theme = getThemeData();
    if (!theme) return null;

    const lightVars = generateCssVars(theme.colors.light);
    const darkVars = generateCssVars(theme.colors.dark);
    
    // Generate vars for palette
    const paletteVars = theme.palette ? generateCssVars(theme.palette) : "";
    const gradientVars = theme.gradient ? generateCssVars(theme.gradient, "gradient") : "";

    const borderRadius = theme.borderRadius;

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
