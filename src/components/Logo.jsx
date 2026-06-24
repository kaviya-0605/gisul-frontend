import { Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Logo({ compact = false }) {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/25">
        <Sparkles size={18} />
        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-ink bg-emerald-400" />
      </span>
      {!compact && <span className="text-lg font-bold tracking-tight">StudySync <span className="text-indigo-400">AI</span></span>}
    </Link>
  )
}
