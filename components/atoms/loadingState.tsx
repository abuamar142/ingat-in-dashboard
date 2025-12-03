import NextImage from "next/image";

interface LoadingStateProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

export function LoadingState({ message = "Loading...", size = "md" }: LoadingStateProps) {
  const sizeConfig = {
    sm: {
      ring: "h-16 w-16",
      logo: "h-12 w-12",
      logoSize: "48px",
      title: "text-sm",
      message: "text-xs",
    },
    md: {
      ring: "h-24 w-24",
      logo: "h-18 w-18",
      logoSize: "72px",
      title: "text-base",
      message: "text-sm",
    },
    lg: {
      ring: "h-32 w-32",
      logo: "h-24 w-24",
      logoSize: "96px",
      title: "text-lg",
      message: "text-sm",
    },
  };

  const config = sizeConfig[size];

  return (
    <div className="flex flex-col items-center justify-center py-16 gap-6">
      <div className="relative flex items-center justify-center">
        {/* Spinning ring */}
        <div
          className={`absolute ${config.ring} animate-spin rounded-full border-2 border-primary/20 border-t-primary`}
        ></div>
        {/* Logo */}
        <div className={`relative ${config.logo} overflow-hidden rounded-full bg-white shadow-lg`}>
          <NextImage
            src="/logo.webp"
            alt="Ingat-in Logo"
            fill
            sizes={config.logoSize}
            className="object-cover"
            priority
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <h3 className={`${config.title} font-semibold text-foreground tracking-tight`}>Ingat-in</h3>
        <p className={`${config.message} text-muted-foreground animate-pulse`}>{message}</p>
      </div>
    </div>
  );
}
