import Link from "next/link";

export function AppHeader() {
  return (
    <header className="bg-surface dark:bg-on-surface docked full-width top-0 border-b border-outline-variant dark:border-outline flat no shadows w-full h-16 sticky z-40 transition-all flex items-center px-margin">
      {/* Mobile-only part */}
      <div className="flex md:hidden justify-between items-center w-full">
        <div className="flex items-center gap-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/pid-icon.svg"
            alt="PID Logo"
            className="w-8 h-8"
          />
        </div>
        <div className="flex items-center gap-md">
          <span className="material-symbols-outlined text-on-surface-variant">
            notifications
          </span>
          <span className="material-symbols-outlined text-on-surface-variant">
            account_circle
          </span>
        </div>
      </div>

      {/* Desktop-only part */}
      <div className="hidden md:flex justify-between items-center w-full">
        <div className="flex items-center">
          <span className="font-headline-md text-headline-md font-black tracking-tight text-primary dark:text-inverse-primary">
            Inteligência de Descarbonização
          </span>
        </div>
        <div className="flex-1 flex justify-center px-xl">
          <nav className="flex gap-lg">
            <Link
              href="/"
              className="font-label-md text-label-md text-secondary font-bold border-b-2 border-secondary pb-1"
            >
              Painel
            </Link>
            <Link
              href="/mapa"
              className="font-label-md text-label-md text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors"
            >
              Mapa regional
            </Link>
            <Link
              href="#"
              className="font-label-md text-label-md text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors"
            >
              Políticas
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-md">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
              search
            </span>
            <input
              className="pl-10 pr-4 py-sm border border-outline-variant rounded-full bg-surface-container-lowest focus:border-primary focus:ring-0 font-body-md text-body-md w-48 transition-all"
              placeholder="Buscar..."
              type="text"
            />
          </div>
          <button className="font-label-md text-label-md text-primary hover:underline">
            Suporte
          </button>
          <button className="font-label-md text-label-md bg-secondary text-on-primary px-md py-sm rounded-full hover:bg-secondary-container transition-colors border-none">
            Simular agora
          </button>
          <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors">
            notifications
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Perfil do usuário"
            className="w-8 h-8 rounded-full border border-outline-variant cursor-pointer"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuATqax_Obs520fL3M4xR8YVjZwje8db8BumKVMGE9MAGzhlBwZT4aDVD29vW8stw9UZwA2pF83FSSeTNdDbvIhq68-Bct1Vm3zwz5kAOQ3QeXs4VM-Bijr54tB_hr1__I0lQ0ZgsMfM6Fd5OXDde5KCJJdIUafzQq_EGshhhBwOkv7j7rAQ9L2qs8-BHClIaGmy-9tAjnd9F34m8Ml0rS3f_eEs4uJubFs4loBjabGuFdP4H-If0SMYYPERghFZXh3BjXXKUwno92Nm"
          />
        </div>
      </div>
    </header>

  );
}
