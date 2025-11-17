import { useEffect, useRef, useState } from 'react'
import { Send } from 'lucide-react'

const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Olá! Sou o assistente AMN. Em que posso ajudar?' }])
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const send = async () => {
    if (!input.trim()) return
    const userMsg = { role: 'user', content: input }
    setMessages(m => [...m, userMsg])
    setInput('')
    try {
      const res = await fetch(`${backend}/api/chatbot`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: userMsg.content }) })
      const data = await res.json()
      const assistant = { role: 'assistant', content: data.reply }
      setMessages(m => [...m, assistant])
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: 'Desculpe, estou indisponível no momento.' }])
    }
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="fixed bottom-6 right-6 rounded-full bg-black text-white px-4 py-3 shadow-lg dark:bg-white dark:text-black">
        Chat
      </button>
      {open && (
        <div className="fixed bottom-6 right-6 w-full max-w-sm rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
            <div className="text-sm font-medium">Assistente AMN</div>
            <button onClick={() => setOpen(false)} className="text-xs text-neutral-500">Fechar</button>
          </div>
          <div className="h-80 overflow-y-auto p-4 space-y-3 text-sm">
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'assistant' ? 'text-neutral-900 dark:text-neutral-100' : 'text-right'}>
                <div className={`inline-block px-3 py-2 rounded-2xl ${m.role === 'assistant' ? 'bg-neutral-100 dark:bg-neutral-900' : 'bg-black text-white dark:bg-white dark:text-black'}`}>{m.content}</div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="p-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center gap-2">
            <input value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={(e)=> e.key==='Enter' && send()} placeholder="Escreva uma mensagem" className="flex-1 px-3 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 outline-none" />
            <button onClick={send} className="p-2 rounded-lg bg-black text-white dark:bg-white dark:text-black"><Send className="h-4 w-4"/></button>
          </div>
        </div>
      )}
    </>
  )
}
