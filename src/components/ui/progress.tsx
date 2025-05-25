"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

// Extend props to include indicatorStyle and indicatorClassName
interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  indicatorStyle?: React.CSSProperties;
  indicatorClassName?: string;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps // Use extended props interface
>(({ className, value, indicatorStyle, indicatorClassName, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-primary/20", // Default background
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
          "h-full w-full flex-1 transition-all", // Base styles
          !indicatorStyle && !indicatorClassName ? "bg-primary" : "", // Default bg only if no style/class passed
          indicatorClassName // Apply custom class if provided
      )}
      style={{ 
          transform: `translateX(-${100 - (value || 0)}%)`,
          ...indicatorStyle // Apply custom style if provided
      }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }

