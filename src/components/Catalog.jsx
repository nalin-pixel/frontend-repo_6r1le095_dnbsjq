import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Search, SlidersHorizontal, GitCompare } from 'lucide-react'

const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Catalog() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [fav, setFav] = useState(() => new Set())
  const [compare, setCompare] = useState(() => new Set())
  const [sort, setSort] = useState('relevance')

  useEffect(() => {
    const controller = new AbortController()
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (category) params.set('category', category)
    if (sort) params.set('sort', sort)
    fetch(`${backend}/api/products?${params.toString()}`, { signal: controller.signal })
      .then(r => r.json())
      .then(data => setItems(data.items || []))
      .catch(() => {})
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [query, category, sort])

  const categories = useMemo(() => {
    const set = new Set(items.map(i => i.category).filter(Boolean))
    return ['Todas', ...Array.from(set)]
  }, [items])

  const toggleFav = (id) => setFav(prev => {
    const n = new Set(prev)
    n.has(id) ? n.delete(id) : n.add(id)
    return n
  })

  const toggleCompare = (id) => setCompare(prev => {
    const n = new Set(prev)
    n.has(id) ? n.delete(id) : n.add(id)
    return n
  })

  return (
    <section id="catalogo" className="py-20 bg-white dark:bg-black">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight dark:text-white">Catálogo</h2>
          <div className="flex-1 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"/>
              <input
                placeholder="Pesquisar produtos..."
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-sm text-neutral-900 dark:text-neutral-100 outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-700"
              />
            </div>
            <div className="flex items-center gap-2">
              <select value={category} onChange={(e)=>setCategory(e.target.value === 'Todas' ? '' : e.target.value)} className="px-3 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select value={sort} onChange={(e)=>setSort(e.target.value)} className="px-3 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
                <option value="relevance">Relevância</option>
                <option value="price_asc">Preço ↑</option>
                <option value="price_desc">Preço ↓</option>
              </select>
              <button className="px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 text-sm flex items-center gap-2"><SlidersHorizontal className="h-4 w-4"/>Filtros</button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({length:6}).map((_,i)=> (
              <div key={i} className="h-48 rounded-xl bg-neutral-100 dark:bg-neutral-900 animate-pulse"/>
            ))
          ) : (
            items.map(item => (
              <motion.div
                layout
                key={item._id}
                className="group rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-white dark:bg-neutral-950"
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="aspect-video bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800" />
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-medium dark:text-white">{item.title}</h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">{item.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-neutral-500">desde</div>
                      <div className="text-lg font-semibold dark:text-white">€ {Number(item.price).toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button onClick={()=>toggleFav(item._id)} aria-label="Favorito" className={`p-2 rounded-full border ${fav.has(item._id) ? 'text-red-500 border-red-500' : 'text-neutral-500 border-neutral-300 dark:border-neutral-700'}`}>
                        <Heart className="h-4 w-4"/>
                      </button>
                      <button onClick={()=>toggleCompare(item._id)} aria-label="Comparar" className={`p-2 rounded-full border ${compare.has(item._id) ? 'text-blue-500 border-blue-500' : 'text-neutral-500 border-neutral-300 dark:border-neutral-700'}`}>
                        <GitCompare className="h-4 w-4"/>
                      </button>
                    </div>
                    <button className="px-4 py-2 rounded-full bg-black text-white text-sm dark:bg-white dark:text-black">Configurar</button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
