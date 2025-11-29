"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    loading?: boolean;
}

const variantStyles = {
    primary:
        "bg-luxury-navy-900 dark:bg-luxury-sand-500 text-white dark:text-luxury-navy-900 hover:bg-luxury-navy-800 dark:hover:bg-luxury-sand-600 shadow-md hover:shadow-lg",
    secondary:
        "bg-luxury-sand-500 dark:bg-luxury-navy-800 text-luxury-navy-900 dark:text-slate-100 hover:bg-luxury-sand-600 dark:hover:bg-luxury-navy-700 shadow-md hover:shadow-lg",
    outline:
        "border-2 border-luxury-navy-900 dark:border-slate-100 text-luxury-navy-900 dark:text-slate-100 hover:bg-luxury-navy-50 dark:hover:bg-luxury-navy-900",
    ghost:
        "text-luxury-navy-900 dark:text-slate-100 hover:bg-luxury-navy-100 dark:hover:bg-luxury-navy-800",
};

const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", loading = false, children, disabled, ...props }, ref) => {
        return (
            <motion.button
                ref={ref}
                whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
                whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
                className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luxury-navy-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-luxury-navy-950",
                    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
                    variantStyles[variant],
                    sizeStyles[size],
                    className
                )}
                disabled={disabled || loading}
                {...props}
            >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {children}
            </motion.button>
        );
    }
);

Button.displayName = "Button";
