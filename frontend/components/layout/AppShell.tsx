import type { ReactNode } from "react";

import { AppHeader } from "./AppHeader";
import { Sidebar } from "./Sidebar";

type AppShellProps = {
  active?: string;
  children: ReactNode;
  summary?: string;
  withSidebar?: boolean;
};

export function AppShell({
  active,
  children,
  summary,
  withSidebar = true,
}: AppShellProps) {
  return (
    <div className="app-shell">
      <AppHeader summary={summary} />
      <div className={withSidebar ? "app-shell__layout" : "app-shell__layout app-shell__layout--plain"}>
        {withSidebar ? <Sidebar active={active} /> : null}
        <main className="app-shell__main">{children}</main>
      </div>
    </div>
  );
}
