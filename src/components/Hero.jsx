import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Spline from '@splinetool/react-spline'

const slides = [
  {
    id: 1,
    title: 'Artes Gráficas de Alto Desempenho',
    subtitle: 'Precisão, escala e acabamentos premium',
    cta: 'Pedir Orçamento',
  },
  {
    id: 2,
    title: 'Tecnologia • Design • Sustentabilidade',
    subtitle: 'Qualidade europeia com prazos competitivos',
    cta: 'Ver Catálogo',
  },
  {
    id: 3,
    title: 'Impressão 3D e Prototipagem',
    subtitle: 'Visualize antes de produzir',
    cta: 'Falar com Especialista',
  },
]

export default function Hero({ onPrimary }) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  const slide = slides[index]

  return (
    <section className="relative min-h-[85vh] w-full overflow-hidden bg-neutral-950 text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/VyGeZv58yuk8j7Yy/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-28 md:py-32">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-2xl"
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
              {slide.title}
            </h1>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-neutral-200">
              {slide.subtitle}
            </p>
            <div className="mt-8 flex gap-3">
              <button
                onClick={onPrimary}
                className="rounded-full bg-white text-neutral-900 px-6 py-3 text-sm font-medium shadow hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                {slide.cta}
              </button>
              <a
                href="#catalogo"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white/90 hover:bg-white/10 transition-colors"
              >
                Explorar
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
