import { cn } from "@/lib"
import type { ReactNode } from "react"

interface EmptyPageProps {
  children: ReactNode
  className?: string
}
export const EmptyPage: React.FC<EmptyPageProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex w-full flex-1 flex-col items-center justify-center bg-white text-center",
        className
      )}
    >
      {children}
    </div>
  )
}

interface EmptyPageImageProps {
  src: string
  className?: string
}
export const EmptyPageImage: React.FC<EmptyPageImageProps> = ({
  src,
  className,
}) => {
  return (
    <div className={cn("w-32 md:w-40", className)}>
      <img src={src} className="h-full w-full" />
    </div>
  )
}

interface EmptyPageTitleProps {
  children: ReactNode
  className?: string
}
export const EmptyPageTitle: React.FC<EmptyPageTitleProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("mt-6 text-center font-semibold md:text-lg", className)}>
      {children}
    </div>
  )
}

interface EmptyPageDescriptionProps {
  children: ReactNode
  className?: string
}
export const EmptyPageDescription: React.FC<EmptyPageDescriptionProps> = ({
  children,
  className,
}) => {
  return (
    <p className={cn("mt-2 text-center text-xs md:text-sm", className)}>
      {children}
    </p>
  )
}
