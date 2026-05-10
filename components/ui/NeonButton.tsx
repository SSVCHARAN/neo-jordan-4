import React from 'react'
import { cn } from '@/lib/utils'
import { motion } from "framer-motion"

export interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
}

const NeonButton = React.forwardRef<HTMLButtonElement, NeonButtonProps>(
    ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
        const sizeClasses = {
            sm: "px-6 py-2 text-xs",
            md: "px-10 py-4 text-sm",
            lg: "px-14 py-6 text-base"
        }

        const variantStyles = {
            primary: "bg-gradient-to-r from-[#FF3366] via-[#FF6B35] to-[#FFD700] text-white",
            secondary: "bg-white text-black",
            outline: "bg-transparent border border-white/20 text-white hover:border-white/40",
            ghost: "bg-white/5 backdrop-blur-md border-2 border-white text-white hover:bg-white hover:text-black"
        }

        return (
            <button
                ref={ref}
                className={cn(
                    "group relative overflow-hidden rounded-full font-bold tracking-[0.2em] uppercase transition-all duration-500 hover:scale-105 active:scale-95",
                    sizeClasses[size],
                    variantStyles[variant],
                    variant === 'primary' ? "shadow-[0_0_30px_rgba(255,51,102,0.4)] hover:shadow-[0_0_50px_rgba(255,51,102,0.6)]" : "",
                    className
                )}
                {...props}
            >
                {/* Background layers */}
                {variant === 'primary' && (
                    <>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#FF3366] via-[#FF6B35] to-[#FFD700] transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] via-[#FF6B35] to-[#FF3366] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </>
                )}

                {/* Glass sheen */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full duration-[1.5s] ease-in-out" />

                {/* Inner Glow */}
                {variant !== 'ghost' && (
                    <div className="absolute inset-[1px] rounded-full bg-inherit opacity-50 group-hover:opacity-0 transition-opacity" />
                )}

                <span className="relative z-10 flex items-center justify-center gap-2">
                    {children}
                </span>
            </button>
        )
    }
)

NeonButton.displayName = 'NeonButton'

export { NeonButton }

