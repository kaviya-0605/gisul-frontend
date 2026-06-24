import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, BrainCircuit, Check, Eye, EyeOff, LockKeyhole, Mail, Sparkles, UserRound } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'

function AuthVisual({ signup }) {
  return (
    <div className="grid-noise relative hidden overflow-hidden bg-gradient-to-br from-blue-950 via-indigo-950 to-violet-950 p-12 lg:flex lg:flex-col lg:justify-between">
      <div className="absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
      <Logo />
      <div className="relative mx-auto max-w-md">
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity }} className="glass mb-8 rounded-3xl p-7 shadow-2xl">
          <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500"><BrainCircuit /></div>
          <div className="space-y-3">{['Understand every question', 'Find meaningful connections', 'Build lasting knowledge'].map((x, i) => <div key={x} className="flex items-center gap-3 rounded-xl bg-white/[0.04] p-3 text-sm text-slate-300"><span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-500/10 text-emerald-400"><Check size={13} /></span>{x}<span className="ml-auto text-xs text-slate-600">0{i + 1}</span></div>)}</div>
        </motion.div>
        <h1 className="text-4xl font-bold leading-tight">{signup ? 'Turn curiosity into your greatest advantage.' : 'Welcome back to smarter learning.'}</h1>
        <p className="mt-4 leading-7 text-slate-400">One workspace for your questions, connections, and steady progress.</p>
      </div>
      <p className="relative text-xs text-slate-600">Trusted by 5,000+ ambitious students</p>
    </div>
  )
}

export default function Auth({ signup = false }) {
  const [show, setShow] = useState(false)
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const strength = Math.min(4, [password.length > 7, /[A-Z]/.test(password), /\d/.test(password), /[^A-Za-z0-9]/.test(password)].filter(Boolean).length)
  const submit = e => { e.preventDefault(); navigate('/dashboard') }
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <AuthVisual signup={signup} />
      <div className="flex items-center justify-center p-5 sm:p-10">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Link to="/" className="mb-10 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-white"><ArrowLeft size={16} />Back to home</Link>
          <div className="mb-8 lg:hidden"><Logo /></div>
          <span className="eyebrow mb-4"><Sparkles size={13} />{signup ? 'Create your workspace' : 'Welcome back'}</span>
          <h2 className="text-3xl font-bold tracking-tight">{signup ? 'Start learning smarter' : 'Log in to StudySync'}</h2>
          <p className="mt-2 text-sm text-slate-500">{signup ? 'Your AI study companion is ready when you are.' : 'Continue your learning journey where you left off.'}</p>
          <form onSubmit={submit} className="mt-8 space-y-5">
            {signup && <div><label className="label">Full name</label><div className="relative"><UserRound size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" /><input required className="input !pl-10" placeholder="Alex Kim" /></div></div>}
            <div><label className="label">Email address</label><div className="relative"><Mail size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" /><input required type="email" className="input !pl-10" placeholder="you@example.com" /></div></div>
            <div>
              <label className="label">Password</label>
              <div className="relative"><LockKeyhole size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" /><input required value={password} onChange={e => setPassword(e.target.value)} type={show ? 'text' : 'password'} className="input !px-10" placeholder="Enter your password" /><button type="button" onClick={() => setShow(!show)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500">{show ? <EyeOff size={17} /> : <Eye size={17} />}</button></div>
              {signup && <div className="mt-3"><div className="flex gap-1.5">{[1,2,3,4].map(x => <span key={x} className={`h-1 flex-1 rounded-full ${x <= strength ? ['bg-red-400','bg-amber-400','bg-cyan-400','bg-emerald-400'][strength - 1] : 'bg-white/10'}`} />)}</div><p className="mt-2 text-[11px] text-slate-500">Use 8+ characters, a number, and a symbol.</p></div>}
            </div>
            {signup && <div><label className="label">Confirm password</label><input required type={show ? 'text' : 'password'} className="input" placeholder="Repeat your password" /></div>}
            {!signup && <div className="flex items-center justify-between text-xs"><label className="flex items-center gap-2 text-slate-400"><input type="checkbox" className="accent-indigo-500" />Remember me</label><a href="#" className="font-medium text-indigo-400 hover:text-indigo-300">Forgot password?</a></div>}
            <button className="button-primary w-full !py-3.5">{signup ? 'Create free account' : 'Log in'}<ArrowRight size={17} /></button>
          </form>
          <p className="mt-7 text-center text-sm text-slate-500">{signup ? 'Already have an account?' : 'New to StudySync?'} <Link to={signup ? '/login' : '/signup'} className="font-semibold text-indigo-400 hover:text-indigo-300">{signup ? 'Log in' : 'Create an account'}</Link></p>
        </motion.div>
      </div>
    </div>
  )
}
