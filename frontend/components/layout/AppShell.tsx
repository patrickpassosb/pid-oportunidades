import type { ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({
  children,
}: AppShellProps) {
  return (
    <div className="app-shell flex-1 flex flex-col">
      <main className="app-shell__main">{children}</main>
    </div>
  );
}
