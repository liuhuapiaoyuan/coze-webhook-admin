import { icons as LucideIcons } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * 根据提供的图标名称获取对应的图标组件。
 *
 * @param {string} icon - 要获取的图标名称。
 * @returns {React.ComponentType<React.SVGProps<SVGSVGElement>> | null} 如果找到图标组件则返回该组件，否则返回 null。
 *
 * @example
 * const DashboardIcon = getIconComponent('LayoutDashboard');
 * if (DashboardIcon) {
 *   return <DashboardIcon size={24} />;
 * }
 */
export function getIconComponent(icon: string | null): LucideIcon | null {
  return icon ? LucideIcons[icon as keyof typeof LucideIcons] || null : null;
}
