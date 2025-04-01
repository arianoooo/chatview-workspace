
import { useTheme as useNextTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import { useTheme } from "@/contexts/ThemeContext";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme: systemTheme = "system" } = useNextTheme();
  const { theme } = useTheme();

  return (
    <Sonner
      theme={systemTheme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            `group-[.toast]:bg-primary group-[.toast]:text-primary-foreground`,
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
        style: {
          // Use theme colors for the action button
          '--toast-primary': theme.primaryColor
        } as React.CSSProperties
      }}
      {...props}
    />
  );
};

export { Toaster };
