import { ArrowLeft, BarChart3, BookOpen, CalendarDays, Sparkles } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ResultCard } from '../components/UI'
import { historyItems, similarQuestions, topicData } from '../data'

const similarity = [{ range: '70–79', count: 3 }, { range: '80–89', count: 7 }, { range: '90–100', count: 12 }]
const tipStyle = { background: '#111827', border: '1px solid rgba(255,255,255,.1)', borderRadius: 12, fontSize: 12 }

export default function QuestionDetails() {
  const { id } = useParams()
  const original = historyItems.find(x => x.id === Number(id)) || historyItems[0]
  return (
    <>
      <Link to="/history" className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white"><ArrowLeft size={16} />Back to history</Link>
      <section className="relative overflow-hidden rounded-3xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500/15 via-white/[0.045] to-violet-500/10 p-6 sm:p-8">
        <div className="absolute right-4 top-4 text-indigo-400/10"><Sparkles size={100} /></div>
        <div className="relative"><div className="mb-5 flex flex-wrap items-center gap-3"><span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/15 px-3 py-1.5 text-xs font-semibold text-indigo-300"><BookOpen size={13} />{original.topic}</span><span className="inline-flex items-center gap-1.5 text-xs text-slate-500"><CalendarDays size={13} />Asked {original.date}</span></div><p className="text-xs font-medium uppercase tracking-[.16em] text-slate-600">Original question</p><h1 className="mt-3 max-w-4xl text-2xl font-bold leading-tight sm:text-4xl">{original.question}</h1><div className="mt-7 inline-flex items-center gap-2 rounded-xl border border-emerald-400/15 bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-300"><Sparkles size={14} />{original.score}% best match</div></div>
      </section>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.3fr_1fr]">
        <section><div className="mb-4"><h2 className="text-xl font-semibold">Similar questions</h2><p className="mt-1 text-xs text-slate-500">Ranked by semantic similarity</p></div><div className="space-y-3">{similarQuestions.map((x, i) => <ResultCard item={x} index={i} key={x.title} />)}</div></section>
        <div className="space-y-5">
          <section className="glass rounded-2xl p-5"><div className="mb-5 flex items-center gap-2"><BarChart3 size={17} className="text-indigo-300" /><h3 className="text-sm font-semibold">Similarity distribution</h3></div><div className="h-52"><ResponsiveContainer width="100%" height="100%"><BarChart data={similarity}><CartesianGrid stroke="rgba(255,255,255,.05)" vertical={false} /><XAxis dataKey="range" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} /><YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} /><Tooltip contentStyle={tipStyle} cursor={{ fill: 'rgba(99,102,241,.08)' }} /><Bar dataKey="count" fill="#6366f1" radius={[6,6,0,0]} /></BarChart></ResponsiveContainer></div></section>
          <section className="glass rounded-2xl p-5"><h3 className="text-sm font-semibold">Topic frequency</h3><div className="flex items-center"><div className="h-44 flex-1"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={topicData} dataKey="value" innerRadius={42} outerRadius={66} paddingAngle={4}>{topicData.map(x => <Cell key={x.name} fill={x.color} />)}</Pie><Tooltip contentStyle={tipStyle} /></PieChart></ResponsiveContainer></div><div className="space-y-2">{topicData.map(x => <div key={x.name} className="flex items-center gap-2 text-xs text-slate-400"><span className="h-2 w-2 rounded-full" style={{ background: x.color }} />{x.name}<span className="ml-auto text-slate-600">{x.value}%</span></div>)}</div></div></section>
        </div>
      </div>
    </>
  )
}
