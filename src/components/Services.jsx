import { motion } from 'framer-motion'
import { Wrench, Palette, Layers, Cube, Truck, ShieldCheck } from 'lucide-react'

const services = [
  {
    icon: Palette,
    title: 'Design & Pré‑Impressão',
    desc: 'Direção de arte, DTP, revisão e normalização de ficheiros com prova digital.',
  },
  {
    icon: Layers,
    title: 'Offset & Digital',
    desc: 'Miolo, capas, catálogos e embalagens com acabamentos premium e prazos rápidos.',
  },
  {
    icon: Cube,
    title: 'Impressão 3D',
    desc: 'Prototipagem rápida, maquetes e peças funcionais com precisão milimétrica.',
  },
  {
    icon: Wrench,
    title: 'Acabamentos',
    desc: 'Hot stamping, verniz UV, laminação, dobra/cola e corte personalizado.',
  },
  {
    icon: Truck,
    title: 'Logística & Fulfillment',
    desc: 'Armazenamento, picking e distribuição nacional e internacional.',
  },
  {
    icon: ShieldCheck,
    title: 'Sustentabilidade',
    desc: 'Materiais certificados, tintas ecológicas e processos com menor impacto.',
  },
]

export default function Services() {
  return (
    <section id="servicos" className="py-20 bg-neutral-50 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight dark:text-white">Serviços</h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400 max-w-2xl">Soluções ponta‑a‑ponta para marcas e equipas criativas — do conceito ao produto final, com controlo de qualidade em cada etapa.</p>
          </div>
          <a href="#catalogo" className="self-start md:self-auto inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-white/50 dark:hover:bg-white/10">Ver catálogo</a>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6"
            >
              <div className="h-10 w-10 rounded-xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
                <s.icon className="h-5 w-5 text-neutral-900 dark:text-neutral-100" />
              </div>
              <h3 className="mt-4 text-lg font-medium dark:text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
