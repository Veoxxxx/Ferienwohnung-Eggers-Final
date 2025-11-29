"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HoverCardProps {
    children: React.ReactNode;
    className?: string;
    hoverScale?: number;
    hoverShadow?: boolean;
}

export function HoverCard({
    children,
    className = "",
    hoverScale = 1.02,
    hoverShadow = true,
}: HoverCardProps) {
    return (
        <motion.div
            whileHover={{
                scale: hoverScale,
                boxShadow: hoverShadow
                    ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    : undefined,
            }}
            transition={{
                duration: 0.2,
                ease: "easeOut",
            }}
            className={cn("cursor-pointer", className)}
        >
            {children}
        </motion.div>
    );
}
