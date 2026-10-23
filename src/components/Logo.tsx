import Image from "next/image";

// The official Armours Edge logo (shield mark + wordmark).
// public/logo.svg is the dark-green version; public/logo-light.svg is the white version for dark backgrounds.
export function Logo({ light = false, className = "h-14 w-auto" }: { light?: boolean; className?: string }) {
  return (
    <Image
      src={light ? "/logo-light.svg" : "/logo.svg"}
      alt="Armours Edge Landscape Construction"
      width={445}
      height={182}
      unoptimized
      priority={!light}
      className={className}
    />
  );
}
