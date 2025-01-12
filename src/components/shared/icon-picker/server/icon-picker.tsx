import React from "react";
import { icons as HeroIcons } from "lucide-react";

type Icons = {
  // the name of the component
  name: string;
  // a more human-friendly name
  friendly_name: string;
  Component: React.FC<React.ComponentPropsWithoutRef<"svg">>;
};

export const useIconPicker = (): {
  icons: Icons[];
} => {
  return {
    icons: Object.entries(HeroIcons).map(([iconName, IconComponent]) => ({
      name: iconName,
      // split the icon name at capital letters and join them with a space
      friendly_name: iconName.match(/[A-Z][a-z]+/g)?.join(" ") ?? iconName,
      Component: IconComponent,
    })),
  };
};

export const IconRenderer = ({
  icon,
  ...rest
}: {
  icon: string;
} & React.ComponentPropsWithoutRef<"svg">) => {
  const IconComponent = HeroIcons[icon as keyof typeof HeroIcons];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent data-slot="icon" {...rest} />;
};
