import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  elevated?: boolean;
};

export function Card({ children, className, elevated = false, ...props }: CardProps) {
  return (
    <div className={cn("card", elevated && "card--elevated", className)} {...props}>
      {children}
    </div>
  );
}
