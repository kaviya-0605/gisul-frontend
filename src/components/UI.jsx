import { motion } from 'framer-motion'
import { ArrowUpRight, SearchX, Sparkles } from 'lucide-react'

export function PageIntro({ eyebrow, title, description, action }) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div>
        {eyebrow && <span className="eyebrow mb-4"><Sparkles size={13} />{eyebrow}</span>}
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h1>
        {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{description}</p>}
      </div>
      {action}
    </div>
  )
}

export function StatCard({ icon: Icon, label, value, detail, color = 'indigo' }) {
  const shades = {
    indigo: 'from-indigo-500/20 text-indigo-300',
    cyan: 'from-cyan-500/20 text-cyan-300',
    emerald: 'from-emerald-500/20 text-emerald-300',
    amber: 'from-amber-500/20 text-amber-300',
  }
  return (
    <motion.div whileHover={{ y: -4 }} className="glass rounded-2xl p-5">
      <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${shades[color]} to-transparent`}>
        <Icon size={19} />
      </div>
      <p className="text-2xl font-bold tracking-tight text-white">{value}</p>
      <p className="mt-1 text-sm text-slate-400">{label}</p>
      {detail && <p className="mt-3 text-xs font-medium text-emerald-400">{detail}</p>}
    </motion.div>
  )
}

export function Score({ value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
        <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: .8 }} className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500" />
      </div>
      <span className="w-10 text-right text-xs font-semibold text-cyan-300">{value}%</span>
    </div>
  )
}

export function EmptyState({ title = 'Nothing here yet', text = 'Your learning journey is ready when you are.', button }) {
  return (
    <div className="glass flex min-h-72 flex-col items-center justify-center rounded-2xl p-8 text-center">
      <div className="mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-indigo-500/10 text-indigo-300">
        <SearchX size={28} />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-slate-400">{text}</p>
      {button && <div className="mt-5">{button}</div>}
    </div>
  )
}

export function Skeleton({ rows = 3 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="glass animate-pulse rounded-2xl p-5">
          <div className="mb-4 h-4 w-2/3 rounded bg-white/10" />
          <div className="h-3 w-full rounded bg-white/[0.07]" />
          <div className="mt-2 h-3 w-3/4 rounded bg-white/[0.07]" />
        </div>
      ))}
    </div>
  )
}

export function ResultCard({ item, index = 0 }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .1 }} className="glass glass-hover rounded-2xl p-5">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <span className="mb-2 inline-block rounded-md bg-indigo-500/10 px-2 py-1 text-[11px] font-semibold text-indigo-300">{item.topic}</span>
          <h3 className="font-semibold leading-6 text-slate-100">{item.title}</h3>
        </div>
        <ArrowUpRight size={17} className="mt-1 shrink-0 text-slate-500" />
      </div>
      <Score value={item.score} />
      {item.date && <p className="mt-3 text-xs text-slate-500">Added {item.date}</p>}
    </motion.div>
  )
}
