import { useEffect, useState } from 'react'
import { Moon, Sun, Menu } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState('system')

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const apply = () => {
      const isDark = theme === 'dark' || (theme === 'system' && mq.matches)
      document.documentElement.classList.toggle('dark', isDark)
    }
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [theme])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/40 border-b border-black/10 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
        <a href="#" className="text-xl font-semibold tracking-tight dark:text-white">AMN <span className="text-neutral-500">LDA</span></a>
        <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-700 dark:text-neutral-200">
          <a href="#catalogo" className="hover:text-black dark:hover:text-white transition-colors">Catálogo</a>
          <a href="#servicos" className="hover:text-black dark:hover:text-white transition-colors">Serviços</a>
          <a href="#noticias" className="hover:text-black dark:hover:text-white transition-colors">Notícias</a>
          <a href="#contactos" className="hover:text-black dark:hover:text-white transition-colors">Contactos</a>
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme((t) => (t === 'dark' ? 'light' : t === 'light' ? 'system' : 'dark'))}
            aria-label="Alternar tema"
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
          >
            <Sun className="h-5 w-5 hidden dark:block" />
            <Moon className="h-5 w-5 block dark:hidden" />
          </button>
          <button onClick={() => setOpen(!open)} className="p-2 rounded md:hidden hover:bg-black/5 dark:hover:bg-white/10" aria-label="Abrir menu">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-black/10 dark:border-white/10 bg-white dark:bg-black">
          <nav className="px-6 py-3 flex flex-col text-sm">
            <a href="#catalogo" className="py-2">Catálogo</a>
            <a href="#servicos" className="py-2">Serviços</a>
            <a href="#noticias" className="py-2">Notícias</a>
            <a href="#contactos" className="py-2">Contactos</a>
          </nav>
        </div>
      )}
    </header>
  )
}
