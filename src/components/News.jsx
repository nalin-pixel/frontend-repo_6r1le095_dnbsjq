import { useEffect, useState } from 'react'

const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function News() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch(`${backend}/api/posts`)
      .then(r => r.json())
      .then(d => setPosts(d.items || []))
      .catch(()=>{})
  }, [])

  return (
    <section id="noticias" className="py-20 bg-neutral-50 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight dark:text-white">Novidades & Artigos</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(p => (
            <article key={p._id} className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black p-6">
              <h3 className="text-lg font-medium dark:text-white">{p.title}</h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{p.excerpt}</p>
              <div className="mt-4 text-xs text-neutral-500">{p.category} · {p.date}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
