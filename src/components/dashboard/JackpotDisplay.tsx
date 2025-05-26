"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { cn } from "@/lib/utils";

interface JackpotDigitProps {
  digit: string;
}

const JackpotDigit: React.FC<JackpotDigitProps> = ({ digit }) => {
  return (
    <div className={cn(
      "h-16 w-10 sm:h-20 sm:w-12", // Responsive size
      "flex items-center justify-center",
      "bg-gradient-to-b from-primary/80 via-primary to-primary/90", // Ciano gradient
      "border-2 border-primary/70 rounded-md shadow-lg", // Border and shadow
      "text-3xl sm:text-4xl font-bold text-white", // Text style - mudado para branco para melhor contraste
      "relative overflow-hidden" // For potential shine effect
    )}>
      {/* Optional: Add a subtle shine effect */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/30 to-transparent"></div>
      {digit}
    </div>
  );
};

interface JackpotDisplayProps {
  value: number;
  duration?: number;
  className?: string;
}

// Simple easing function (linear)
const easeLinear = (t: number) => t;

const JackpotDisplay: React.FC<JackpotDisplayProps> = ({ value, duration = 2, className }) => {
  const [displayValue, setDisplayValue] = useState(0);

  const formatValue = useCallback((num: number): string[] => {
    // Format to 2 decimal places, remove comma/dot, pad to 7 digits
    const formatted = Math.floor(num * 100).toString().padStart(7, '0');
    return formatted.split(''); // Return array of digits
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(1, elapsedTime / (duration * 1000));
      const easedProgress = easeLinear(progress); // Use easing function
      const currentValue = easedProgress * value;

      setDisplayValue(currentValue);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value); // Ensure final value is exact
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [value, duration]);

  const digits = formatValue(displayValue);

  return (
    <div className={cn("flex items-center justify-center space-x-1 sm:space-x-2", className)}>
      <span className="text-2xl sm:text-3xl font-bold text-primary mr-1">R$</span>
      {/* Render the digit boxes based on the state */}
      {digits.map((digit, index) => (
          <React.Fragment key={index}>
            {/* Insert separator before the last two digits */}
            {index === digits.length - 2 && (
                <span className="text-3xl sm:text-4xl font-bold text-primary">,</span>
            )}
             <JackpotDigit digit={digit} />
          </React.Fragment>
      ))}
    </div>
  );
};

export default JackpotDisplay;
