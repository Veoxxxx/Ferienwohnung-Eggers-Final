"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

interface AnimatedSectionProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
    duration?: number;
}

export function AnimatedSection({
    children,
    className = "",
    delay = 0,
    direction = "up",
    duration = 0.6,
}: AnimatedSectionProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const shouldReduceMotion = useReducedMotion();

    const directionOffset = {
        up: { y: 40 },
        down: { y: -40 },
        left: { x: 40 },
        right: { x: -40 },
    };

    // If reduced motion is preferred, we simply fade in without movement
    const initial = shouldReduceMotion
        ? { opacity: 0 }
        : { opacity: 0, ...directionOffset[direction] };

    const animate = isInView
        ? { opacity: 1, x: 0, y: 0 }
        : {};

    return (
        <motion.div
            ref={ref}
            initial={initial}
            animate={animate}
            transition={{
                duration: shouldReduceMotion ? 0.3 : duration,
                delay: shouldReduceMotion ? 0 : delay,
                ease: [0.25, 0.4, 0.25, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
