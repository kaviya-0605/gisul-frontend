import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'

export default function PublicNav() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const links = [
    ['Home', '/'],
    ['Features', isHome ? '#features' : '/#features'],
    ['How It Works', isHome ? '#how' : '/#how'],
  ]
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-ink/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo />
        <div className="hidden items-center gap-8 md:flex">
          {links.map(([label, href]) => <a key={label} href={href} className="text-sm text-slate-400 transition hover:text-white">{label}</a>)}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <Link to="/login" className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white">Log in</Link>
          <Link to="/signup" className="button-primary !px-4 !py-2.5">Sign up</Link>
        </div>
        <button onClick={() => setOpen(!open)} className="rounded-lg p-2 text-slate-300 md:hidden">{open ? <X /> : <Menu />}</button>
      </nav>
      {open && (
        <div className="glass mx-4 mb-4 rounded-2xl p-4 md:hidden">
          {links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm text-slate-300">{label}</a>)}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link to="/login" className="button-secondary !py-2.5">Log in</Link>
            <Link to="/signup" className="button-primary !py-2.5">Sign up</Link>
          </div>
        </div>
      )}
    </header>
  )
}
