'use client'

import { useEffect, useState } from 'react'

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || 'https://formspree.io/f/mnpqodbw'
const WHATSAPP_NUMBER = '2348157143387'
const WHATSAPP_MESSAGE = "Hi Vivian! I found your portfolio and I'm interested in discussing a project with you."

const projects = [
  {
    number: '01',
    title: 'ClareBags',
    type: 'Custom ecommerce storefront',
    description: 'A polished shopping experience for a WhatsApp and Instagram-based bag business, with cart, Paystack checkout, and admin tools.',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Paystack'],
    github: 'https://github.com/Vivianclare-codes/clarebags1.git',
    live: 'https://clarebags1.vercel.app/',
    accent: 'burgundy',
  },
  {
    number: '02',
    title: 'Amara & Co.',
    type: 'Shopify theme build',
    description: 'A considered Shopify storefront shaped around the brand, products, and the small details that make browsing feel easy.',
    tags: ['Shopify', 'Liquid', 'Theme customisation'],
    github: 'https://github.com/Vivianclare-codes/amaracodes.git',
    live: 'https://amara-co-xkd9y8gn.myshopify.com/',
    accent: 'sand',
  },
]

function ArrowUpRight() { return <span aria-hidden="true" className="arrow">↗</span> }
function GithubIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M15 22v-3.3c.03-1-.4-1.8-1.1-2.2 3.6-.4 7.4-1.8 7.4-8a6.2 6.2 0 0 0-1.7-4.3 5.8 5.8 0 0 0-.1-4.3S18.1-.4 15 1.7a16.4 16.4 0 0 0-6 0C5.9-.4 4.4-.1 4.4-.1a5.8 5.8 0 0 0-.1 4.3 6.2 6.2 0 0 0-1.7 4.3c0 6.2 3.8 7.6 7.4 8-.7.4-1.1 1.2-1.1 2.2V22"/><path d="M8.9 18.2c-3.3 1.1-4-1.6-4-1.6-.7-1.7-1.6-2.1-1.6-2.1-1.3-.9.1-.9.1-.9 1.4.1 2.2 1.5 2.2 1.5 1.3 2.2 3.4 1.6 4.2 1.2"/></svg> }
function LinkedinIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V8h4v2.2A4.6 4.6 0 0 1 16 8Z"/><path d="M2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/></svg> }

function getWhatsAppUrl() {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
}

function ProjectInquiryModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', projectType: '', description: '', budget: '' })
  const [confirmation, setConfirmation] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isOpen) return undefined

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
    setConfirmation('')
  }

  async function submitInquiry(event) {
    event.preventDefault()
    setIsSubmitting(true)
    setConfirmation('')

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          _subject: `New Project Inquiry from ${form.name}`,
        }),
      })

      if (!response.ok) throw new Error('Form submission failed')
      setConfirmation("Thanks for reaching out. I've received your message and will get back to you soon.")
      setForm({ name: '', email: '', projectType: '', description: '', budget: '' })
    } catch {
      setConfirmation('Something went wrong while sending your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className="inquiry-modal" role="dialog" aria-modal="true" aria-labelledby="inquiry-title">
      <button className="modal-close" type="button" onClick={onClose} aria-label="Close project inquiry">×</button>
      <p className="eyebrow">Start a conversation</p>
      <h2 id="inquiry-title">Let&apos;s talk about your project</h2>
      <p className="modal-description">Tell me a little about what you&apos;re building, and I&apos;ll get back to you to schedule a call.</p>
      <form onSubmit={submitInquiry}>
        <label>Full Name<input name="name" value={form.name} onChange={updateField} required /></label>
        <label>Email Address<input name="email" type="email" value={form.email} onChange={updateField} required /></label>
        <label>Project Type<select name="projectType" value={form.projectType} onChange={updateField} required><option value="">Select a project type</option><option>E-commerce Website</option><option>WhatsApp Store</option><option>Website Redesign</option><option>Landing Page</option><option>Custom Web Application</option><option>SaaS / Startup Website</option><option>Other</option></select></label>
        <label>Project Description<textarea name="description" value={form.description} onChange={updateField} required rows="4" /></label>
        <label>Estimated Budget (optional)<select name="budget" value={form.budget} onChange={updateField}><option value="">Select a budget</option><option>Under $500</option><option>$500 – $1,000</option><option>$1,000 – $2,500</option><option>$2,500+</option><option>Not Sure Yet</option></select></label>
        <button className="primary-button cta-button" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Continue'} <ArrowUpRight /></button>
      </form>
      {confirmation && <p className="modal-confirmation" role="status">{confirmation}</p>}
    </section>
  </div>
}

function ProjectCard({ project }) {
  return <article className={`project-card ${project.accent}`}>
    <div className="project-visual"><span>{project.number}</span><div className="visual-orb" /><div className="visual-label">Ecommerce<br />experience</div></div>
    <div className="project-content"><p className="eyebrow">{project.type}</p><h3>{project.title}</h3><p className="project-description">{project.description}</p><div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="project-links"><a href={project.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight /></a><a href={project.live} target="_blank" rel="noreferrer">Live store <ArrowUpRight /></a></div></div>
  </article>
}

export default function Page() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false)
  const openInquiry = () => setIsInquiryOpen(true)
  const closeInquiry = () => setIsInquiryOpen(false)

  return <main>
    <nav className="site-nav page-width" aria-label="Main navigation"><a className="brand" href="#top"><span className="brand-mark">V</span> Vivian Okechukwu</a><div className="nav-links"><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a></div><button className="nav-cta cta-button" type="button" onClick={openInquiry}>Book a call <ArrowUpRight /></button></nav>
    <section className="hero page-width" id="top"><div className="hero-copy"><p className="eyebrow hero-eyebrow"><span className="status-dot" /> Available for select projects</p><h1>Ecommerce that<br /><em>feels considered.</em></h1><p className="hero-intro">I&apos;m Vivian, an ecommerce developer helping vendors, brands, and agencies build storefronts that are easy to use and good to come back to.</p><div className="hero-actions"><button className="primary-button cta-button" type="button" onClick={openInquiry}>Book a call <ArrowUpRight /></button><a className="text-link" href={getWhatsAppUrl()} target="_blank" rel="noreferrer">Chat on WhatsApp <ArrowUpRight /></a><a className="text-link" href="#work">See my work <span aria-hidden="true">↓</span></a></div></div><div className="hero-note"><span className="note-line" /><p>Shopify &amp;<br /><strong>Headless ecommerce</strong><br /><span>Working worldwide</span></p></div></section>
    <section className="services-strip page-width" aria-label="Services"><span>Shopify builds</span><span>Theme customisation</span><span>Headless storefronts</span><span>Conversion-minded UX</span></section>
    <section className="work-section page-width" id="work"><div className="section-heading"><div><p className="eyebrow">Selected work</p><h2>Stores built to<br /><em>sell naturally.</em></h2></div><p className="section-caption">A mix of custom storefronts<br />and Shopify builds.</p></div><div className="project-grid">{projects.map((project) => <ProjectCard key={project.number} project={project} />)}</div></section>
    <section className="about-section page-width" id="about"><p className="eyebrow">A little about me</p><div className="about-grid"><h2>Good ecommerce<br /><em>doesn&apos;t shout.</em></h2><div><p>I build quiet, useful storefronts for people who have something worth selling — from independent founders and growing brands to global teams looking for reliable Shopify or headless support.</p><button className="text-link cta-button" type="button" onClick={openInquiry}>Work with me <ArrowUpRight /></button></div></div></section>
    <section className="contact-section page-width" id="contact"><p className="eyebrow">Have a store in mind?</p><h2>Let&apos;s make shopping<br /><em>feel simple.</em></h2><button className="primary-button cta-button" type="button" onClick={openInquiry}>Book a call <ArrowUpRight /></button></section>
    <footer className="site-footer page-width"><a className="brand" href="#top"><span className="brand-mark">V</span> Vivian Okechukwu</a><p>© 2026 Vivian Okechukwu. Built with intention.</p><div className="footer-socials"><a href="https://www.linkedin.com/in/vivian-okechukwu" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedinIcon /></a><a href="https://github.com/Vivianclare-codes" target="_blank" rel="noreferrer" aria-label="GitHub"><GithubIcon /></a></div></footer>
    <ProjectInquiryModal isOpen={isInquiryOpen} onClose={closeInquiry} />
  </main>
}

export { ProjectCard }
