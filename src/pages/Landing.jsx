import { motion } from 'framer-motion'
import { ArrowRight, BrainCircuit, Check, Github, Instagram, Linkedin, MessageCircleQuestion, Orbit, Play, Quote, Search, Sparkles, Tags, Twitter } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import PublicNav from '../components/PublicNav'

const features = [
  { icon: Search, title: 'Semantic search', text: 'Go beyond keywords. Find conceptually related questions using contextual AI.' },
  { icon: Tags, title: 'AI topic tagging', text: 'Every question is organized automatically into clear, useful study topics.' },
  { icon: Orbit, title: 'Learning history', text: 'Build a searchable knowledge trail and return to insights whenever you need them.' },
  { icon: BrainCircuit, title: 'Smart recommendations', text: 'Discover what to learn next based on your questions and developing strengths.' },
]
const stats = [['10K+', 'Questions processed'], ['5K+', 'Active students'], ['100+', 'Topics explored'], ['95%', 'Matching accuracy']]
const steps = [
  ['01', 'Ask a question', 'Write naturally—just like you would ask a tutor.'],
  ['02', 'AI analysis', 'StudySync understands meaning, context, and topic.'],
  ['03', 'Similarity search', 'It scans a rich question library for close matches.'],
  ['04', 'Get results', 'Explore ranked matches and continue learning.'],
]

function DemoCard() {
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .8 }} className="relative mx-auto w-full max-w-xl">
      <div className="absolute -inset-8 rounded-full bg-white/[0.03] blur-3xl" />
      <div className="glass relative overflow-hidden rounded-[28px] border-white/15 p-3 shadow-2xl shadow-indigo-950/50">
        <div className="rounded-2xl border border-white/[0.07] bg-card p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-red-400/70" /><span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" /></div>
            <span className="rounded-full bg-indigo-500/10 px-2.5 py-1 text-[10px] text-indigo-300">AI question finder</span>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.035] p-4">
            <p className="text-xs text-slate-500">Your question</p>
            <p className="mt-2 text-sm font-medium">Why does photosynthesis need sunlight?</p>
            <div className="mt-4 flex justify-end"><span className="rounded-lg bg-primary text-black px-3 py-2 text-[11px] font-semibold">Find matches <ArrowRight size={11} className="ml-1 inline" /></span></div>
          </div>
          <div className="my-5 flex items-center gap-3"><div className="h-px flex-1 bg-white/[0.06]" /><span className="text-[10px] uppercase tracking-widest text-slate-600">3 matches found</span><div className="h-px flex-1 bg-white/[0.06]" /></div>
          {[
            ['How is light converted into chemical energy?', '97%'],
            ['What role does chlorophyll play in plants?', '93%'],
            ['Can plants grow without direct sunlight?', '87%'],
          ].map(([question, score], i) => (
            <motion.div key={question} animate={{ y: [0, -3, 0] }} transition={{ duration: 4, delay: i * .5, repeat: Infinity }} className="mb-2.5 flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.035] p-3.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/10 text-xs font-semibold text-white">0{i + 1}</span>
              <p className="flex-1 text-xs text-slate-300">{question}</p>
              <span className="text-xs font-semibold text-cyan-300">{score}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="glass absolute -right-3 -top-5 hidden rounded-xl px-3 py-2 text-xs font-semibold text-emerald-300 shadow-xl sm:block"><Sparkles size={13} className="mr-1.5 inline" />Powered by AI</motion.div>
    </motion.div>
  )
}

export default function Landing() {
  return (
    <div className="overflow-hidden">
      <PublicNav />
      <main>
        <section className="grid-noise relative flex min-h-screen items-center pt-24">
          <div className="absolute left-[8%] top-32 h-64 w-64 rounded-full bg-white/[0.02] blur-3xl" />
          <div className="absolute right-[8%] top-48 h-72 w-72 rounded-full bg-white/[0.02] blur-3xl" />
          <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 py-20 lg:grid-cols-2 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
              <span className="eyebrow mb-6"><Sparkles size={13} />Your AI-powered learning copilot</span>
              <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.06] tracking-[-.045em] text-white sm:text-6xl lg:text-7xl">Find similar questions <span className="gradient-text">instantly using AI</span></h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">Ask study questions, discover related concepts, and organize your learning journey—all in one beautifully simple workspace.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link to="/signup" className="button-primary !px-6 !py-3.5">Get started free <ArrowRight size={17} /></Link>
                <Link to="/ask" className="button-secondary !px-6 !py-3.5"><Play size={16} fill="currentColor" />Live demo</Link>
              </div>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
                <span><Check size={13} className="mr-1 inline text-emerald-400" />No credit card</span>
                <span><Check size={13} className="mr-1 inline text-emerald-400" />Free to explore</span>
                <span><Check size={13} className="mr-1 inline text-emerald-400" />Set up in seconds</span>
              </div>
            </motion.div>
            <DemoCard />
          </div>
        </section>

        <section className="border-y border-white/[0.06] bg-white/[0.018]">
          <div className="mx-auto grid max-w-7xl grid-cols-2 px-5 py-10 md:grid-cols-4 lg:px-8">
            {stats.map(([value, label], i) => <motion.div key={label} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * .1 }} viewport={{ once: true }} className="border-white/[0.07] p-5 text-center md:border-r md:last:border-0"><p className="text-3xl font-bold gradient-text">{value}</p><p className="mt-1 text-xs text-slate-500">{label}</p></motion.div>)}
          </div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-5 py-28 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center"><span className="eyebrow mb-4">Built to help you learn</span><h2 className="text-3xl font-bold tracking-tight sm:text-5xl">Everything you need to study <span className="gradient-text">more intelligently</span></h2><p className="mt-5 text-slate-400">Turn scattered questions into a connected, searchable learning system.</p></div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, text }, i) => <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * .1 }} viewport={{ once: true }} className="glass glass-hover group rounded-2xl p-6"><div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-white transition group-hover:scale-110"><Icon size={21} /></div><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{text}</p></motion.div>)}
          </div>
        </section>

        <section id="how" className="border-y border-white/[0.06] bg-white/[0.018] py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="mb-16 max-w-2xl"><span className="eyebrow mb-4">A simple workflow</span><h2 className="text-3xl font-bold tracking-tight sm:text-5xl">From question to clarity in <span className="gradient-text">seconds</span></h2></div>
            <div className="relative grid gap-5 md:grid-cols-4">
              <div className="absolute left-[12%] right-[12%] top-7 hidden h-px bg-gradient-to-r from-transparent via-white/20 to-transparent md:block" />
              {steps.map(([n, title, text], i) => <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * .12 }} viewport={{ once: true }} className="relative"><div className="relative z-10 mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/5 text-sm font-bold text-white shadow-lg shadow-black/50">{n}</div><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{text}</p></motion.div>)}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-28 lg:px-8">
          <div className="mb-12 text-center"><span className="eyebrow mb-4">Loved by curious minds</span><h2 className="text-3xl font-bold sm:text-5xl">Built for the way students think</h2></div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ['“StudySync turns one question into an entire study path. It feels like having a tutor who already knows what I need next.”', 'Maya Chen', 'Biology student'],
              ['“The similarity scores make research so much faster. I find useful variations I would never have thought to search.”', 'Jordan Lee', 'Engineering student'],
              ['“Finally, my questions are not lost across notebooks and tabs. The history view alone has changed how I revise.”', 'Sofia Patel', 'Computer science student'],
            ].map(([quote, name, role]) => <div key={name} className="glass glass-hover rounded-2xl p-6"><Quote size={23} className="mb-5 text-white/50" /><p className="text-sm leading-7 text-slate-300">{quote}</p><div className="mt-6 flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-full bg-white text-black text-xs font-bold">{name.split(' ').map(x => x[0]).join('')}</div><div><p className="text-sm font-semibold">{name}</p><p className="text-xs text-slate-500">{role}</p></div></div></div>)}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-28 lg:px-8">
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02] px-6 py-16 text-center shadow-2xl shadow-black/40 sm:px-12">
            <div className="absolute inset-0 grid-noise opacity-30" /><div className="relative"><MessageCircleQuestion className="mx-auto mb-5 text-white" size={38} /><h2 className="text-3xl font-bold sm:text-5xl">Your next breakthrough starts with a question.</h2><p className="mx-auto mt-4 max-w-xl text-slate-400">Join thousands of students connecting ideas and learning with more confidence.</p><Link to="/signup" className="button-primary mt-8 !bg-white !px-6 !py-3.5 !text-black">Start learning free <ArrowRight size={17} /></Link></div>
          </div>
        </section>
      </main>
      <footer className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div><Logo /><p className="mt-3 text-xs text-slate-600">© 2026 StudySync AI. Learn in sync.</p></div>
          <div className="flex flex-wrap gap-6 text-sm text-slate-500">{['About', 'Contact', 'Privacy', 'Terms'].map(x => <a href="#" key={x} className="hover:text-white">{x}</a>)}</div>
          <div className="flex gap-2">{[Twitter, Instagram, Linkedin, Github].map((Icon, i) => <a href="#" key={i} className="rounded-lg border border-white/[0.07] p-2 text-slate-500 hover:text-white"><Icon size={16} /></a>)}</div>
        </div>
      </footer>
    </div>
  )
}
