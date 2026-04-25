"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Home,
  TrendingUp,
  Building2,
  Phone,
  Mail,
  MapPin,
  Languages,
  Star,
  Menu,
  X,
  ChevronDown,
  Search,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

// ─── Translation data ──────────────────────────────────────────────────────

const t = {
  en: {
    nav: {
      about: "About",
      services: "Services",
      process: "Process",
      testimonials: "Testimonials",
      contact: "Contact",
      cta: "Let's Talk",
    },
    hero: {
      title: "Carmita Galarza",
      subtitle: "Licensed Realtor · Boca Raton",
      tagline: "Luxury service. Personal touch. Results that speak for themselves.",
      cta1: "Start Your Search",
      cta2: "Meet Carmita",
      cta3: "Contact Me",
    },
    stats: [
      { value: "10+", label: "Years Experience" },
      { value: "200+", label: "Homes Sold" },
      { value: "98%", label: "Client Satisfaction" },
      { value: "FL", label: "Licensed in Florida" },
    ],
    about: {
      title: "About Carmita",
      eyebrow: "Who I Am",
      body: "I'm Carmita Galarza, a dedicated real estate professional in Boca Raton. With years of experience navigating Florida's dynamic market, I bring expertise, integrity, and a deeply personalized approach to every client relationship. Fluent in English and Spanish, I proudly serve the diverse communities of Boca Raton with the care and commitment every family deserves.",
      quote:
        "I don't just help you buy or sell a home — I guide you toward a life you love.",
      tags: ["Buyers", "Sellers", "Investments", "Pre-Construction", "Bilingual"],
    },
    services: {
      eyebrow: "What I Do",
      title: "My Services",
      cards: [
        {
          num: "01",
          title: "Buying",
          desc: "Finding the right home takes more than a search bar. I listen closely to what you need, then open doors — literally — to properties that match your vision and your life.",
        },
        {
          num: "02",
          title: "Selling",
          desc: "Your home deserves a strategy, not a sign. I price it right, market it well, and negotiate on your behalf until we close at the number you deserve.",
        },
        {
          num: "03",
          title: "Investing",
          desc: "Boca Raton's market rewards the informed. Whether you're eyeing a rental, a flip, or pre-construction opportunity, I'll walk you through the numbers before you commit.",
        },
      ],
    },
    process: {
      eyebrow: "How It Works",
      title: "The Path to Your New Home",
      steps: [
        { num: "01", title: "Discovery Call", desc: "We start with a conversation. I learn your goals, timeline, and priorities." },
        { num: "02", title: "Market Analysis", desc: "I pull the data and show you exactly what the market looks like for your situation." },
        { num: "03", title: "Active Search", desc: "I handle the search so you spend time on showings, not scrolling." },
        { num: "04", title: "Successful Close", desc: "From offer to keys, I guide every step and protect your interests at the table." },
      ],
    },
    testimonial: {
      quote:
        "Carmita made the entire process feel effortless. She knew the market inside and out, communicated every step of the way, and got us an offer above asking price in less than a week. I can't recommend her enough.",
      author: "Maria & Roberto Fuentes",
      location: "Miami, FL",
    },
    contact: {
      eyebrow: "Get in Touch",
      title: "Ready to Start?",
      info: {
        phone: "+1 (754) 273-0617",
        email: "cgalarealtor@gmail.com",
        location: "Boca Raton, FL",
        languages: "English & Spanish",
      },
      form: {
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        phone: "Phone",
        interest: "I'm interested in...",
        interestOptions: ["Buying a Home", "Selling a Home", "Investing", "Pre-Construction", "Other"],
        message: "Message",
        submit: "Send Message",
        whatsapp: "Send via WhatsApp",
        placeholder: {
          firstName: "Maria",
          lastName: "Fuentes",
          email: "maria@email.com",
          phone: "(305) 555-0100",
          message: "Tell me about your real estate goals...",
        },
      },
    },
    footer: {
      tagline: "Luxury service. Personal touch.",
      license: "Licensed Real Estate Agent · Lokation Real Estate · State of Florida",
      copyright: "© 2026 Carmita Galarza. All rights reserved.",
      credit: "Built by",
    },
  },
  es: {
    nav: {
      about: "Sobre Mí",
      services: "Servicios",
      process: "Proceso",
      testimonials: "Testimonios",
      contact: "Contacto",
      cta: "Hablemos",
    },
    hero: {
      title: "Carmita Galarza",
      subtitle: "Agente de Bienes Raíces · Boca Raton",
      tagline: "Servicio de lujo. Toque personal. Resultados que hablan por sí solos.",
      cta1: "Comenzar Búsqueda",
      cta2: "Conoce a Carmita",
      cta3: "Contáctame",
    },
    stats: [
      { value: "10+", label: "Años de Experiencia" },
      { value: "200+", label: "Casas Vendidas" },
      { value: "98%", label: "Satisfacción de Clientes" },
      { value: "FL", label: "Licenciada en Florida" },
    ],
    about: {
      title: "Sobre Carmita",
      eyebrow: "Quién Soy",
      body: "Soy Carmita Galarza, una profesional de bienes raíces dedicada en Boca Raton. Con años de experiencia navigando el dinámico mercado de Florida, aporto experiencia, integridad y un enfoque profundamente personalizado a cada relación con mis clientes. Fluida en inglés y español, sirvo con orgullo a las diversas comunidades de Boca Raton con el cuidado y compromiso que cada familia merece.",
      quote:
        "No solo te ayudo a comprar o vender una casa — te guío hacia la vida que mereces.",
      tags: ["Compradores", "Vendedores", "Inversiones", "Pre-Construcción", "Bilingüe"],
    },
    services: {
      eyebrow: "Lo Que Hago",
      title: "Mis Servicios",
      cards: [
        {
          num: "01",
          title: "Compra",
          desc: "Encontrar el hogar correcto requiere más que una búsqueda en línea. Escucho tus necesidades y abro puertas — literalmente — a propiedades que coincidan con tu visión.",
        },
        {
          num: "02",
          title: "Venta",
          desc: "Tu hogar merece una estrategia, no solo un letrero. Lo precio correctamente, lo comercializo bien y negocio en tu nombre hasta cerrar al precio que mereces.",
        },
        {
          num: "03",
          title: "Inversión",
          desc: "El mercado de Boca Raton recompensa a quienes están informados. Te guío a través de los números antes de que tomes una decisión.",
        },
      ],
    },
    process: {
      eyebrow: "Cómo Funciona",
      title: "El Camino a Tu Nuevo Hogar",
      steps: [
        { num: "01", title: "Llamada de Descubrimiento", desc: "Comenzamos con una conversación. Aprendo tus metas, tiempos y prioridades." },
        { num: "02", title: "Análisis de Mercado", desc: "Analizo los datos y te muestro exactamente cómo está el mercado para tu situación." },
        { num: "03", title: "Búsqueda Activa", desc: "Me encargo de la búsqueda para que tú te concentres en las visitas, no en el scroll." },
        { num: "04", title: "Cierre Exitoso", desc: "De la oferta a las llaves, guío cada paso y protejo tus intereses en la mesa." },
      ],
    },
    testimonial: {
      quote:
        "Carmita hizo que todo el proceso se sintiera fácil. Conocía el mercado a la perfección, nos comunicó cada paso del camino y nos consiguió una oferta por encima del precio pedido en menos de una semana. No puedo recomendarla lo suficiente.",
      author: "Maria & Roberto Fuentes",
      location: "Miami, FL",
    },
    contact: {
      eyebrow: "Ponte en Contacto",
      title: "¿Lista para Comenzar?",
      info: {
        phone: "+1 (754) 273-0617",
        email: "cgalarealtor@gmail.com",
        location: "Boca Raton, FL",
        languages: "Inglés y Español",
      },
      form: {
        firstName: "Nombre",
        lastName: "Apellido",
        email: "Correo",
        phone: "Teléfono",
        interest: "Me interesa...",
        interestOptions: ["Comprar una Casa", "Vender una Casa", "Invertir", "Pre-Construcción", "Otro"],
        message: "Mensaje",
        submit: "Enviar Mensaje",
        whatsapp: "Enviar por WhatsApp",
        placeholder: {
          firstName: "Maria",
          lastName: "Fuentes",
          email: "maria@correo.com",
          phone: "(305) 555-0100",
          message: "Cuéntame sobre tus metas inmobiliarias...",
        },
      },
    },
    footer: {
      tagline: "Servicio de lujo. Toque personal.",
      license: "Agente de Bienes Raíces Licenciada · Lokation Real Estate · Estado de Florida",
      copyright: "© 2026 Carmita Galarza. Todos los derechos reservados.",
      credit: "Construido por",
    },
  },
};

// ─── Fade-in wrapper ───────────────────────────────────────────────────────

function FadeIn({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const initial =
    direction === "up"
      ? { opacity: 0, y: 32 }
      : direction === "left"
      ? { opacity: 0, x: -32 }
      : direction === "right"
      ? { opacity: 0, x: 32 }
      : { opacity: 0 };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Gold eyebrow ──────────────────────────────────────────────────────────

function Eyebrow({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-px bg-[#c9a84c]" />
      <span
        className="text-[#c9a84c] text-xs tracking-[0.25em] uppercase"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {text}
      </span>
      <div className="w-8 h-px bg-[#c9a84c]" />
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────

export default function LandingPage() {
  const [lang, setLang] = useState<"en" | "es">("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phone: "", interest: "", message: "" });
  const copy = t[lang];

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleWhatsApp = () => {
    const { firstName, lastName, email, phone, interest, message } = formData;
    const text = lang === "es"
      ? `Hola Carmita, soy ${firstName} ${lastName}.\nTeléfono: ${phone}\nCorreo: ${email}\nInterés: ${interest}\nMensaje: ${message}`
      : `Hello Carmita, I'm ${firstName} ${lastName}.\nPhone: ${phone}\nEmail: ${email}\nInterest: ${interest}\nMessage: ${message}`;
    window.open(`https://wa.me/17542730617?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleEmail = () => {
    const { firstName, lastName, email, phone, interest, message } = formData;
    const body = lang === "es"
      ? `Nombre: ${firstName} ${lastName}\nTeléfono: ${phone}\nCorreo: ${email}\nInterés: ${interest}\nMensaje: ${message}`
      : `Name: ${firstName} ${lastName}\nPhone: ${phone}\nEmail: ${email}\nInterest: ${interest}\nMessage: ${message}`;
    window.open(`mailto:cgalarealtor@gmail.com?subject=Real Estate Inquiry&body=${encodeURIComponent(body)}`);
  };

  // Cursor
  useEffect(() => {
    const move = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll("a, button, [data-hover]");
    const on = () => setHovering(true);
    const off = () => setHovering(false);
    els.forEach((el) => {
      el.addEventListener("mouseenter", on);
      el.addEventListener("mouseleave", off);
    });
    return () => {
      els.forEach((el) => {
        el.removeEventListener("mouseenter", on);
        el.removeEventListener("mouseleave", off);
      });
    };
  }, [lang]);

  // Nav scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      {/* Custom cursor */}
      <div
        id="custom-cursor"
        className={hovering ? "hovering" : ""}
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />

      {/* Language toggle bar */}
      <div className="w-full bg-[#0d0d0d] border-b border-[#c9a84c20] py-2 px-6">
        <div className="max-w-7xl mx-auto flex justify-end items-center gap-1">
          <button
            onClick={() => setLang("en")}
            className={`px-3 py-1 text-xs tracking-widest transition-all duration-200 ${
              lang === "en"
                ? "text-[#c9a84c] border border-[#c9a84c40]"
                : "text-[#888] hover:text-[#f0ece4]"
            }`}
            style={{ fontFamily: "var(--font-inter)" }}
          >
            EN
          </button>
          <span className="text-[#444] text-xs">/</span>
          <button
            onClick={() => setLang("es")}
            className={`px-3 py-1 text-xs tracking-widest transition-all duration-200 ${
              lang === "es"
                ? "text-[#c9a84c] border border-[#c9a84c40]"
                : "text-[#888] hover:text-[#f0ece4]"
            }`}
            style={{ fontFamily: "var(--font-inter)" }}
          >
            ES
          </button>
        </div>
      </div>

      {/* Sticky Nav */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0a0aee] backdrop-blur-md border-b border-[#c9a84c20] py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo("hero")}
            className="flex flex-col leading-none"
          >
            <span
              className="text-xl text-[#f0ece4] tracking-wide"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Carmita Galarza
            </span>
            <span
              className="text-[10px] text-[#c9a84c] tracking-[0.2em] uppercase"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Lokation Real Estate
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {[
              { key: "about", id: "about" },
              { key: "services", id: "services" },
              { key: "process", id: "process" },
              { key: "testimonials", id: "testimonial" },
              { key: "contact", id: "contact" },
            ].map(({ key, id }) => (
              <button
                key={key}
                onClick={() => scrollTo(id)}
                className="text-sm text-[#a09888] hover:text-[#f0ece4] transition-colors tracking-wider"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {copy.nav[key as keyof typeof copy.nav]}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollTo("contact")}
              className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-[#c9a84c] text-[#0a0a0a] text-sm font-medium tracking-wide hover:bg-[#e2c97e] transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {copy.nav.cta}
            </button>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-[#f0ece4] p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#111111] border-t border-[#c9a84c20] overflow-hidden"
            >
              <div className="px-6 py-6 flex flex-col gap-5">
                {[
                  { label: copy.nav.about, id: "about" },
                  { label: copy.nav.services, id: "services" },
                  { label: copy.nav.process, id: "process" },
                  { label: copy.nav.testimonials, id: "testimonial" },
                  { label: copy.nav.contact, id: "contact" },
                ].map(({ label, id }) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className="text-left text-[#a09888] hover:text-[#f0ece4] text-sm tracking-wide"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {label}
                  </button>
                ))}
                <button
                  onClick={() => scrollTo("contact")}
                  className="w-full py-3 bg-[#c9a84c] text-[#0a0a0a] text-sm font-medium tracking-wide"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {copy.nav.cta}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section
          id="hero"
          className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#0a0a0a]"
        >
          {/* Background texture */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, #c9a84c 0px, #c9a84c 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #c9a84c 0px, #c9a84c 1px, transparent 1px, transparent 60px)",
            }}
          />
          {/* Gold gradient glow */}
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 80% 40%, #c9a84c 0%, transparent 65%)",
              }}
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 w-full py-20 grid lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-10 h-px bg-[#c9a84c]" />
                <span
                  className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Lokation Real Estate
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-6xl sm:text-7xl lg:text-8xl font-light text-[#f0ece4] leading-[0.95] mb-4"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {copy.hero.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="text-[#c9a84c] text-lg tracking-[0.1em] mb-8"
                style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
              >
                {copy.hero.subtitle}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
                className="text-[#a09888] text-xl leading-relaxed max-w-md mb-10"
                style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic" }}
              >
                &ldquo;{copy.hero.tagline}&rdquo;
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55 }}
                className="flex flex-wrap gap-4"
              >
                <button
                  onClick={() => scrollTo("contact")}
                  className="flex items-center gap-2 px-7 py-3.5 bg-[#c9a84c] text-[#0a0a0a] text-sm font-medium tracking-wide hover:bg-[#e2c97e] transition-all duration-200 hover:gap-3"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  <Search size={15} />
                  {copy.hero.cta1}
                </button>
                <button
                  onClick={() => scrollTo("about")}
                  className="flex items-center gap-2 px-7 py-3.5 border border-[#c9a84c50] text-[#f0ece4] text-sm tracking-wide hover:border-[#c9a84c] transition-all duration-200"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {copy.hero.cta2}
                  <ArrowRight size={15} />
                </button>
                <a
                  href="https://wa.me/17542730617"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-7 py-3.5 border border-[#c9a84c50] text-[#f0ece4] text-sm tracking-wide hover:border-[#c9a84c] transition-all duration-200"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="#c9a84c">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {copy.hero.cta3}
                </a>
              </motion.div>
            </div>

            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Gold frame decoration */}
                <div className="absolute -top-4 -left-4 w-full h-full border border-[#c9a84c30]" />
                <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#c9a84c15]" />
                <div className="relative w-[320px] sm:w-[380px] lg:w-[420px] aspect-[3/4] overflow-hidden">
                  <Image
                    src="/images/carmita2.png"
                    alt="Carmita Galarza — Licensed Realtor, Boca Raton"
                    fill
                    className="object-cover object-top carmita-photo"
                    priority
                    sizes="(max-width: 768px) 320px, 420px"
                  />
                  {/* Warm overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a60] via-transparent to-transparent" />
                </div>
                {/* Gold badge */}
                <div className="absolute -bottom-5 -left-5 bg-[#111111] border border-[#c9a84c40] px-5 py-3">
                  <p
                    className="text-[#c9a84c] text-xs tracking-widest uppercase"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Boca Raton
                  </p>
                  <p
                    className="text-[#f0ece4] text-sm"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    Licensed Realtor
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span
              className="text-[#555] text-[10px] tracking-widest uppercase"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            >
              <ChevronDown size={16} className="text-[#c9a84c]" />
            </motion.div>
          </motion.div>
        </section>

        {/* ── Stats Bar ────────────────────────────────────────────────── */}
        <section className="bg-[#0d0d0d] border-y border-[#c9a84c20] py-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {copy.stats.map((stat, i) => (
                <FadeIn key={i} delay={i * 0.1} direction="up">
                  <div className="text-center">
                    <p
                      className="text-4xl lg:text-5xl font-light text-[#c9a84c] mb-2"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      {stat.value}
                    </p>
                    <p
                      className="text-[#888] text-xs tracking-widest uppercase"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {stat.label}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── About ────────────────────────────────────────────────────── */}
        <section id="about" className="py-28 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            {/* Photo with gold frame */}
            <FadeIn direction="left">
              <div className="relative mx-auto lg:mx-0 w-fit">
                {/* Decorative gold frame */}
                <div className="absolute -top-6 -left-6 w-full h-full border-2 border-[#c9a84c20] pointer-events-none" />
                <div className="absolute -top-3 -left-3 w-full h-full border border-[#c9a84c30] pointer-events-none" />
                <div className="relative w-[300px] sm:w-[360px] aspect-[3/4] overflow-hidden">
                  <Image
                    src="/images/carmita.png"
                    alt="Carmita Galarza"
                    fill
                    className="object-cover object-top carmita-photo"
                    sizes="360px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#c9a84c10]" />
                </div>
                {/* Corner accent */}
                <div className="absolute -bottom-6 -right-6 w-20 h-20 border-r-2 border-b-2 border-[#c9a84c]" />
              </div>
            </FadeIn>

            {/* Text */}
            <div>
              <FadeIn delay={0.1}>
                <Eyebrow text={copy.about.eyebrow} />
                <h2
                  className="text-5xl lg:text-6xl font-light text-[#f0ece4] mb-8 leading-tight"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {copy.about.title}
                </h2>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p
                  className="text-[#a09888] leading-relaxed text-base mb-8"
                  style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                >
                  {copy.about.body}
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <blockquote className="border-l-2 border-[#c9a84c] pl-6 mb-8">
                  <p
                    className="text-[#f0ece4] text-xl italic leading-relaxed"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    &ldquo;{copy.about.quote}&rdquo;
                  </p>
                </blockquote>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="flex flex-wrap gap-2">
                  {copy.about.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 border border-[#c9a84c40] text-[#c9a84c] text-xs tracking-wider"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── Services ─────────────────────────────────────────────────── */}
        <section id="services" className="py-28 bg-[#0d0d0d]">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn className="text-center mb-16">
              <Eyebrow text={copy.services.eyebrow} />
              <h2
                className="text-5xl lg:text-6xl font-light text-[#f0ece4]"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {copy.services.title}
              </h2>
            </FadeIn>

            <div className="grid lg:grid-cols-3 gap-6">
              {copy.services.cards.map((card, i) => (
                <FadeIn key={i} delay={i * 0.12}>
                  <div
                    className="group relative p-8 border border-[#c9a84c15] bg-[#111111] hover:border-[#c9a84c40] transition-all duration-300"
                    data-hover
                  >
                    {/* Number */}
                    <span
                      className="block text-[#c9a84c20] text-7xl font-light mb-4 leading-none select-none group-hover:text-[#c9a84c30] transition-colors"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      {card.num}
                    </span>
                    {/* Icon */}
                    <div className="mb-5 text-[#c9a84c]">
                      {i === 0 ? <Home size={22} /> : i === 1 ? <TrendingUp size={22} /> : <Building2 size={22} />}
                    </div>
                    <h3
                      className="text-2xl font-light text-[#f0ece4] mb-4"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="text-[#888880] text-sm leading-relaxed"
                      style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                    >
                      {card.desc}
                    </p>
                    {/* Bottom gold line on hover */}
                    <div className="absolute bottom-0 left-0 h-px w-0 bg-[#c9a84c] group-hover:w-full transition-all duration-500" />
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process ──────────────────────────────────────────────────── */}
        <section id="process" className="py-28 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn className="text-center mb-16">
              <Eyebrow text={copy.process.eyebrow} />
              <h2
                className="text-5xl lg:text-6xl font-light text-[#f0ece4]"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {copy.process.title}
              </h2>
            </FadeIn>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {copy.process.steps.map((step, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="relative">
                    {/* Connector line */}
                    {i < copy.process.steps.length - 1 && (
                      <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-gradient-to-r from-[#c9a84c30] to-transparent z-0" />
                    )}
                    <div className="relative z-10">
                      <div className="w-12 h-12 border border-[#c9a84c40] flex items-center justify-center mb-5">
                        <span
                          className="text-[#c9a84c] text-sm font-light"
                          style={{ fontFamily: "var(--font-cormorant)" }}
                        >
                          {step.num}
                        </span>
                      </div>
                      <h3
                        className="text-xl font-light text-[#f0ece4] mb-3"
                        style={{ fontFamily: "var(--font-cormorant)" }}
                      >
                        {step.title}
                      </h3>
                      <p
                        className="text-[#888880] text-sm leading-relaxed"
                        style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                      >
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonial ──────────────────────────────────────────────── */}
        <section
          id="testimonial"
          className="py-28 bg-[#0d0d0d] border-y border-[#c9a84c15]"
        >
          <div className="max-w-4xl mx-auto px-6 text-center">
            <FadeIn>
              <div className="flex justify-center gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-[#c9a84c] text-[#c9a84c]" />
                ))}
              </div>
              <blockquote
                className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#f0ece4] leading-snug mb-10 italic"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                &ldquo;{copy.testimonial.quote}&rdquo;
              </blockquote>
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-px bg-[#c9a84c] mb-3" />
                <p
                  className="text-[#f0ece4] text-base"
                  style={{ fontFamily: "var(--font-inter)", fontWeight: 500 }}
                >
                  {copy.testimonial.author}
                </p>
                <p
                  className="text-[#888] text-sm"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {copy.testimonial.location}
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── Contact ──────────────────────────────────────────────────── */}
        <section id="contact" className="py-28 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn className="text-center mb-16">
              <Eyebrow text={copy.contact.eyebrow} />
              <h2
                className="text-5xl lg:text-6xl font-light text-[#f0ece4]"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {copy.contact.title}
              </h2>
            </FadeIn>

            <div className="grid lg:grid-cols-2 gap-16">
              {/* Left — contact info */}
              <FadeIn direction="left">
                <div className="space-y-8">
                  {[
                    { icon: <Phone size={16} />, label: copy.contact.info.phone },
                    { icon: <Mail size={16} />, label: copy.contact.info.email },
                    { icon: <MapPin size={16} />, label: copy.contact.info.location },
                    { icon: <Languages size={16} />, label: copy.contact.info.languages },
                  ].map(({ icon, label }, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="mt-0.5 text-[#c9a84c]">{icon}</div>
                      <span
                        className="text-[#a09888] text-sm"
                        style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                      >
                        {label}
                      </span>
                    </div>
                  ))}

                  <div className="pt-6 border-t border-[#c9a84c15]">
                    <p
                      className="text-[#f0ece4] text-2xl italic mb-2"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      &ldquo;{copy.hero.tagline}&rdquo;
                    </p>
                    <p
                      className="text-[#c9a84c] text-xs tracking-widest uppercase"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      — Carmita Galarza
                    </p>
                  </div>
                </div>
              </FadeIn>

              {/* Right — contact form */}
              <FadeIn direction="right" delay={0.1}>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-[#888] text-xs tracking-widest uppercase mb-2"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {copy.contact.form.firstName}
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleFormChange}
                        placeholder={copy.contact.form.placeholder.firstName}
                        className="w-full bg-[#111111] border border-[#c9a84c20] text-[#f0ece4] text-sm px-4 py-3 focus:outline-none focus:border-[#c9a84c60] transition-colors placeholder:text-[#444]"
                        style={{ fontFamily: "var(--font-inter)" }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-[#888] text-xs tracking-widest uppercase mb-2"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {copy.contact.form.lastName}
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleFormChange}
                        placeholder={copy.contact.form.placeholder.lastName}
                        className="w-full bg-[#111111] border border-[#c9a84c20] text-[#f0ece4] text-sm px-4 py-3 focus:outline-none focus:border-[#c9a84c60] transition-colors placeholder:text-[#444]"
                        style={{ fontFamily: "var(--font-inter)" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-[#888] text-xs tracking-widest uppercase mb-2"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {copy.contact.form.email}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder={copy.contact.form.placeholder.email}
                      className="w-full bg-[#111111] border border-[#c9a84c20] text-[#f0ece4] text-sm px-4 py-3 focus:outline-none focus:border-[#c9a84c60] transition-colors placeholder:text-[#444]"
                      style={{ fontFamily: "var(--font-inter)" }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-[#888] text-xs tracking-widest uppercase mb-2"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {copy.contact.form.phone}
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleFormChange}
                      placeholder={copy.contact.form.placeholder.phone}
                      className="w-full bg-[#111111] border border-[#c9a84c20] text-[#f0ece4] text-sm px-4 py-3 focus:outline-none focus:border-[#c9a84c60] transition-colors placeholder:text-[#444]"
                      style={{ fontFamily: "var(--font-inter)" }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="interest"
                      className="block text-[#888] text-xs tracking-widest uppercase mb-2"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {copy.contact.form.interest}
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleFormChange}
                      className="w-full bg-[#111111] border border-[#c9a84c20] text-[#a09888] text-sm px-4 py-3 focus:outline-none focus:border-[#c9a84c60] transition-colors appearance-none"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      <option value="">—</option>
                      {copy.contact.form.interestOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-[#888] text-xs tracking-widest uppercase mb-2"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {copy.contact.form.message}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleFormChange}
                      placeholder={copy.contact.form.placeholder.message}
                      className="w-full bg-[#111111] border border-[#c9a84c20] text-[#f0ece4] text-sm px-4 py-3 focus:outline-none focus:border-[#c9a84c60] transition-colors placeholder:text-[#444] resize-none"
                      style={{ fontFamily: "var(--font-inter)" }}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-1">
                    <button
                      type="button"
                      onClick={handleEmail}
                      className="flex-1 py-4 bg-[#c9a84c] text-[#0a0a0a] text-sm font-medium tracking-widest uppercase hover:bg-[#e2c97e] transition-colors flex items-center justify-center gap-2"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      <Mail size={16} />
                      {copy.contact.form.submit}
                    </button>
                    <button
                      type="button"
                      onClick={handleWhatsApp}
                      className="flex-1 py-4 bg-[#25D366] text-white text-sm font-medium tracking-widest uppercase hover:bg-[#1ebe5d] transition-colors flex items-center justify-center gap-2"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      {copy.contact.form.whatsapp}
                    </button>
                  </div>
                </form>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="bg-[#080808] border-t border-[#c9a84c15] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-10">
            {/* Logo block */}
            <div>
              <h2
                className="text-3xl text-[#f0ece4] font-light mb-1"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Carmita Galarza
              </h2>
              <p
                className="text-[#c9a84c] text-xs tracking-widest uppercase"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Lokation Real Estate
              </p>
              <p
                className="text-[#666] text-sm mt-3 max-w-xs italic"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {copy.footer.tagline}
              </p>
            </div>

            {/* Nav links */}
            <nav className="flex flex-wrap gap-x-8 gap-y-3">
              {[
                { label: copy.nav.about, id: "about" },
                { label: copy.nav.services, id: "services" },
                { label: copy.nav.process, id: "process" },
                { label: copy.nav.testimonials, id: "testimonial" },
                { label: copy.nav.contact, id: "contact" },
              ].map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="text-[#888] hover:text-[#f0ece4] text-xs tracking-widest uppercase transition-colors"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>

          <div className="border-t border-[#c9a84c10] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <p
                className="text-[#555] text-xs mb-1"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {copy.footer.license}
              </p>
              <p
                className="text-[#444] text-xs"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {copy.footer.copyright}
              </p>
            </div>
            <p
              className="text-[#444] text-xs text-center"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {copy.footer.credit}{" "}
              <a
                href="https://aj-digital-studio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#666] hover:text-[#c9a84c] transition-colors"
              >
                AJ Digital Studio
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
