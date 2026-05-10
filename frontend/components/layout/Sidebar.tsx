import Link from "next/link";

export function Sidebar() {
  return (
    <nav className="bg-surface dark:bg-on-surface docked h-full w-72 border-r border-outline-variant dark:border-outline flat no shadows flex flex-col fixed left-0 top-0 h-screen z-50 py-lg hidden md:flex">
      <div className="px-lg mb-8">
        <div className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/pid-logo.svg"
            alt="PID Logo"
            className="h-15 w-auto"
          />
        </div>
      </div>
      <ul className="flex flex-col gap-unit px-sm flex-grow">
        <li>
          <Link
            href="/"
            className="flex items-center gap-md px-md py-sm rounded-lg text-secondary dark:text-secondary-fixed-dim font-bold border-r-4 border-secondary bg-surface-container-high font-body-md text-body-md"
          >
            <span className="material-symbols-outlined fill">dashboard</span>
            Overview
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-lowest hover:text-primary transition-all font-body-md text-body-md"
          >
            <span className="material-symbols-outlined">database</span>
            PID Data
          </Link>
        </li>
        <li>
          <Link
            href="/mapa"
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-lowest hover:text-primary transition-all font-body-md text-body-md"
          >
            <span className="material-symbols-outlined">rocket_launch</span>
            Onde Investir?
          </Link>
        </li>
        <li>
          <Link
            href="/relatorio"
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-lowest hover:text-primary transition-all font-body-md text-body-md"
          >
            <span className="material-symbols-outlined">analytics</span>
            Reports
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-lowest hover:text-primary transition-all font-body-md text-body-md"
          >
            <span className="material-symbols-outlined">cloud_done</span>
            Data Sources
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-lowest hover:text-primary transition-all font-body-md text-body-md"
          >
            <span className="material-symbols-outlined">help</span>
            Help
          </Link>
        </li>
      </ul>
      <div className="px-lg mt-auto">
        <button className="w-full py-sm px-md bg-transparent border-2 border-primary text-primary rounded-full font-label-md text-label-md hover:bg-surface-container-high transition-colors">
          Export Data
        </button>
      </div>
    </nav>
  );
}
