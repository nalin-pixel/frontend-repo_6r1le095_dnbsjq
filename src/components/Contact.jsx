import { useState } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Contact() {
  const [status, setStatus] = useState('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const submit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await new Promise((r) => setTimeout(r, 600))
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="py-20 bg-white dark:bg-black">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight dark:text-white">Contacte‑nos</h2>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">Estamos disponíveis para esclarecer dúvidas e preparar o seu orçamento.</p>

          <div className="mt-6 space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
            <div className="flex items-center gap-3"><Mail className="h-4 w-4"/> geral@amnlda.com</div>
            <div className="flex items-center gap-3"><Phone className="h-4 w-4"/> +351 210 000 000</div>
            <div className="flex items-center gap-3"><MapPin className="h-4 w-4"/> Lisboa, Portugal</div>
          </div>
        </div>
        <form onSubmit={submit} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 bg-neutral-50 dark:bg-neutral-950">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-neutral-500">Nome</label>
              <input value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} required className="mt-1 w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900" />
            </div>
            <div>
              <label className="text-xs text-neutral-500">Email</label>
              <input type="email" value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} required className="mt-1 w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs text-neutral-500">Mensagem</label>
              <textarea value={form.message} onChange={(e)=>setForm({...form, message: e.target.value})} required rows={4} className="mt-1 w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <button disabled={status==='loading'} className="px-5 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm">
              {status==='loading' ? 'A enviar…' : 'Enviar'}
            </button>
            {status==='success' && <span className="text-xs text-green-600">Mensagem enviada.</span>}
            {status==='error' && <span className="text-xs text-red-600">Ocorreu um erro.</span>}
          </div>
        </form>
      </div>
    </section>
  )
}
