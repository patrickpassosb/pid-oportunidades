import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "soft" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  variant?: ButtonVariant;
  children: ReactNode;
};

export function Button({
  href,
  variant = "primary",
  children,
  className,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = cn(
    "btn",
    `btn--${variant}`,
    disabled && "btn--disabled",
    className,
  );

  if (href && !disabled) {
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled} type={type} {...props}>
      {children}
    </button>
  );
}
