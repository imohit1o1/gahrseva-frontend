import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-right"
      icons={{
        success: <CircleCheckIcon className="size-5 text-emerald-600" />,
        info: <InfoIcon className="size-5 text-blue-600" />,
        warning: <TriangleAlertIcon className="size-5 text-amber-600" />,
        error: <OctagonXIcon className="size-5 text-destructive" />,
        loading: <Loader2Icon className="size-5 animate-spin text-primary" />,
      }}
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-2xl group-[.toaster]:rounded-2xl p-4 gap-3",
          title: "font-black text-[13px] group-data-[type=success]:!text-emerald-700 group-data-[type=error]:!text-destructive group-data-[type=warning]:!text-amber-700 group-data-[type=info]:!text-blue-700",
          description: "text-[12px] font-bold !text-black !opacity-100 dark:!text-white",
          icon: "group-data-[type=success]:text-emerald-600 group-data-[type=error]:text-destructive group-data-[type=warning]:text-amber-600 group-data-[type=info]:text-blue-600",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-bold rounded-xl",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground font-bold rounded-xl",
        },
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
