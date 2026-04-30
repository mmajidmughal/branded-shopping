import { Sparkles, ShieldCheck, Globe, Zap } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-20 py-20">
      {/* Hero */}
      <section className="container px-4 md:px-6 text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Redefining <span className="text-primary">Luxury</span> for the Digital Age</h1>
        <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
          Branded Shopping was born from a simple observation: the world of luxury retail hadn't kept pace with the intelligence of modern technology.
        </p>
      </section>

      {/* Values */}
      <section className="bg-muted/30 py-20">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: Sparkles, title: "AI-First Styling", desc: "Every recommendation is backed by a personalized understanding of your unique style." },
              { icon: ShieldCheck, title: "Verified Authenticity", desc: "Our Digital Product Passports ensure every item is 100% genuine and traceable." },
              { icon: Globe, title: "Global Heritage", desc: "We source exclusively from heritage brands that value craftsmanship over trends." },
              { icon: Zap, title: "Zero Friction", desc: "From discovery to doorstep, we've optimized every second for the modern connoisseur." }
            ].map((value, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="container px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            We believe that shopping should be more than a transaction—it should be an exploration. By combining the high-touch service of traditional luxury boutiques with the precision of artificial intelligence, we empower you to build a wardrobe that truly reflects who you are.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            In 2026, convenience is expected. At Branded Shopping, we go beyond convenience to deliver inspiration.
          </p>
        </div>
        <div className="aspect-video bg-muted rounded-2xl overflow-hidden relative">
           <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
           <div className="flex items-center justify-center h-full">
              <span className="text-primary font-bold tracking-tighter text-4xl opacity-20 italic">BRANDED SHOPPING</span>
           </div>
        </div>
      </section>
    </div>
  )
}
