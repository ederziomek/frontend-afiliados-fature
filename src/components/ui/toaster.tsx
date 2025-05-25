"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { CheckCircle } from "lucide-react"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        return (
          <Toast key={id} {...props} className={
            variant === "success" 
              ? "bg-gray-800 border-[rgb(18,201,185)]/30 text-white" 
              : undefined
          }>
            <div className="grid gap-1">
              {title && (
                <ToastTitle className={variant === "success" ? "flex items-center text-[rgb(18,201,185)]" : ""}>
                  {variant === "success" && <CheckCircle className="mr-2 h-4 w-4" />}
                  {title}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription className={variant === "success" ? "text-gray-300" : ""}>
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className={variant === "success" ? "text-[rgb(18,201,185)] hover:text-white" : ""} />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
