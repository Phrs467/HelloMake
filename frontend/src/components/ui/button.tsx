import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    let classes = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
    
    if (variant === "default") classes += " bg-gray-900 text-white hover:bg-gray-900/90 shadow"
    if (variant === "ghost") classes += " hover:bg-gray-100 hover:text-gray-900"
    
    if (size === "default") classes += " h-9 px-4 py-2"
    if (size === "lg") classes += " h-10 rounded-md px-8"
    if (size === "icon") classes += " h-9 w-9"
    
    return (
      <button
        className={`${classes} ${className || ""}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
