'use client'

import React, { useState } from 'react'
import { Send, Sparkles, User, ArrowLeft, RotateCcw } from 'lucide-react'
import Link from 'next/link'

interface Message {
  id: string
  role: 'assistant' | 'user'
  content: string
}

export default function AIStylistPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your Branded Shopping Personal Stylist. How can I help you elevate your wardrobe today? Whether you're looking for a specific item or need outfit inspiration, I'm here to assist."
    }
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "That's a great request. I'm currently analyzing our heritage collections to find the perfect match for you. Based on current 2026 trends, I'd recommend looking at our 'Aura Luxury' overcoats which pair perfectly with 'Chronos' timepieces."
      }
      setMessages(prev => [...prev, aiMsg])
    }, 1000)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-muted/30">
      {/* Chat Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-background border-b">
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:text-primary transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-none">AI Personal Stylist</h1>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Active Now</span>
            </div>
          </div>
        </div>
        <button className="text-muted-foreground hover:text-primary transition-colors">
          <RotateCcw className="h-5 w-5" />
        </button>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${msg.role === 'assistant' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                {msg.role === 'assistant' ? <Sparkles className="h-4 w-4" /> : <User className="h-4 w-4" />}
              </div>
              <div className={`rounded-2xl px-4 py-3 text-sm shadow-sm ${
                msg.role === 'user' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-background border'
              }`}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Suggestions */}
      {messages.length === 1 && (
        <div className="px-6 pb-4 flex flex-wrap gap-2">
          {["Style an outfit for a gala", "Find me a casual weekend look", "Recommend a premium watch", "What's trending this season?"].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setInput(suggestion)}
              className="px-3 py-1.5 rounded-full border bg-background text-xs hover:border-primary hover:text-primary transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="p-6 bg-background border-t">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask your stylist anything..."
            className="w-full h-12 pl-4 pr-12 rounded-xl border border-input bg-muted/50 focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="absolute right-2 h-8 w-8 flex items-center justify-center rounded-lg bg-primary text-primary-foreground disabled:opacity-50 transition-all hover:scale-105"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-3 text-[10px] text-center text-muted-foreground uppercase tracking-widest">
          Powered by Branded Shopping Intelligence
        </p>
      </div>
    </div>
  )
}
