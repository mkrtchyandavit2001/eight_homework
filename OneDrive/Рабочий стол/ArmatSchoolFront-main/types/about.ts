import type { ComponentType, ReactNode, SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;
export type IconComponent = ComponentType<IconProps>;

export type PillarKey = "mission" | "vision" | "values";
export type StatKey = "lessonsDone" | "countries" | "satisfaction";
export type TeacherKey = "ani" | "mariam" | "narine";
export type TestimonialKey = "sarah" | "armen" | "lena";

export interface SectionLabelProps {
  children: ReactNode;
  className?: string;
}
