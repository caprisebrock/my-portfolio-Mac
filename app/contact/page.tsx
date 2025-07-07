'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    console.log('🔵 [contact] handleSubmit fired', form)
    setStatus('sending')
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    console.log('🟢 [contact] fetch response:', res.status, await res.json())
    if (res.ok) {
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } else {
      setStatus('error')
    }
  }

  return (
    <main className="max-w-lg mx-auto p-6 bg-black text-white rounded-xl">
      <h1 className="text-2xl mb-4">Get In Touch</h1>

      {status === 'success' && (
        <p className="text-green-400 mb-4">✔️ Message sent!</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="w-full bg-gray-800 text-white p-2 rounded"
        />
        <input
          required
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="w-full bg-gray-800 text-white p-2 rounded"
        />
        <input
          type="text"
          placeholder="Subject"
          value={form.subject}
          onChange={e => setForm({ ...form, subject: e.target.value })}
          className="w-full bg-gray-800 text-white p-2 rounded"
        />
        <textarea
          required
          placeholder="Message"
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
          className="w-full bg-gray-800 text-white p-2 rounded h-32"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded"
        >
          {status === 'sending' ? 'Sending…' : 'Send Message'}
        </button>
      </form>
    </main>
  )
}