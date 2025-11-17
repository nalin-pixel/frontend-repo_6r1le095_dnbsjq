import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Catalog from './components/Catalog'
import News from './components/News'
import CTA from './components/CTA'
import Contact from './components/Contact'
import Chatbot from './components/Chatbot'

function App() {
  const onPrimary = () => {
    const el = document.getElementById('catalogo')
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen scroll-smooth bg-white text-neutral-900 dark:bg-black dark:text-white">
      <Navbar />
      <main>
        <Hero onPrimary={onPrimary} />
        <Services />
        <Catalog />
        <News />
        <CTA />
        <Contact />
      </main>
      <footer id="contactos" className="border-t border-neutral-200 dark:border-neutral-800 py-12">
        <div className="mx-auto max-w-7xl px-6 text-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} AMN LDA. Todos os direitos reservados.</div>
          <div className="flex items-center gap-4 text-neutral-500">
            <a href="#">RGPD</a>
            <a href="#">Cookies</a>
            <a href="#">Termos</a>
          </div>
        </div>
      </footer>
      <Chatbot />
    </div>
  )
}

export default App
