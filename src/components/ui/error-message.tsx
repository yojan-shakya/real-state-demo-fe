import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import { CircleAlert, TriangleAlert } from "lucide-react"

const errorMessage = cva("", {
  variants: {
    error: {
      true: "flex",
      false: "hidden",
    },
  },
  defaultVariants: {
    error: false,
  },
})

interface ErrorMessageProps {
  error?: string
  className?: string
}
export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
  className,
}) => {
  return (
    <div
      className={cn(
        errorMessage({ error: !!error }),
        "items-center gap-1 text-xs text-red-500 transition ease-in-out",
        className
      )}
    >
      <span>{error}</span>
    </div>
  )
}
