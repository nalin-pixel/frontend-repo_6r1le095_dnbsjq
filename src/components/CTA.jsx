import { motion } from 'framer-motion'

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-b from-neutral-100 to-white dark:from-neutral-900 dark:to-black">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-semibold tracking-tight dark:text-white"
        >
          Pronto para dar o próximo passo?
        </motion.h2>
        <p className="mt-3 text-neutral-600 dark:text-neutral-400">Fale connosco, receba uma proposta em 24–48h e acelere o seu projeto.</p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="#contactos" className="px-6 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm">Pedir Orçamento</a>
          <a href="#catalogo" className="px-6 py-3 rounded-full border border-neutral-200 dark:border-neutral-800 text-sm">Explorar Catálogo</a>
        </div>
      </div>
    </section>
  )
}
