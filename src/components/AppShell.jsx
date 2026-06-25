import { AnimatePresence, motion } from 'framer-motion'
import { Bell, ChevronLeft, ChevronRight, CircleHelp, History, LayoutDashboard, LogOut, Menu, Search, UserRound, WandSparkles, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from './Logo'

const nav = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Ask Question', path: '/ask', icon: WandSparkles },
  { label: 'History', path: '/history', icon: History },
]

export default function AppShell() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobile, setMobile] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  
  const handleLogout = (e) => {
    e.preventDefault()
    logout()
    navigate('/login')
  }
  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-20 items-center justify-between px-4">
        <Logo compact={collapsed} />
        <button onClick={() => setMobile(false)} className="p-2 text-slate-400 lg:hidden"><X size={19} /></button>
      </div>
      <div className="px-3 py-3">
        <p className={`mb-3 px-3 text-[10px] font-semibold uppercase tracking-[.18em] text-slate-600 ${collapsed ? 'text-center' : ''}`}>{collapsed ? '•••' : 'Workspace'}</p>
        <div className="space-y-1">
          {nav.map(({ label, path, icon: Icon }) => (
            <NavLink key={path} to={path} onClick={() => setMobile(false)} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${isActive ? 'bg-indigo-500/15 text-indigo-300' : 'text-slate-400 hover:bg-white/[0.05] hover:text-white'} ${collapsed ? 'justify-center' : ''}`}>
              <Icon size={19} />
              {!collapsed && label}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="mt-auto p-3">
        {!collapsed && (
          <div className="mb-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <CircleHelp size={18} className="mb-3 text-indigo-300" />
            <p className="text-xs font-semibold">Need a study nudge?</p>
            <p className="mt-1 text-[11px] leading-5 text-slate-500">Explore examples in the question finder.</p>
          </div>
        )}
        <button onClick={handleLogout} className={`w-full flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-500 transition hover:bg-red-500/10 hover:text-red-300 ${collapsed ? 'justify-center' : ''}`}>
          <LogOut size={19} />{!collapsed && 'Log out'}
        </button>
        <button onClick={() => setCollapsed(!collapsed)} className="mt-2 hidden w-full items-center justify-center rounded-xl border border-white/[0.06] py-2 text-slate-500 transition hover:text-white lg:flex">
          {collapsed ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <aside className={`fixed inset-y-0 left-0 z-40 hidden border-r border-white/[0.06] bg-card/95 backdrop-blur-xl transition-all lg:block ${collapsed ? 'w-20' : 'w-64'}`}>{sidebar}</aside>
      <AnimatePresence>{mobile && <><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobile(false)} className="fixed inset-0 z-40 bg-black/70 lg:hidden" /><motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} className="fixed inset-y-0 left-0 z-50 w-64 border-r border-white/10 bg-card lg:hidden">{sidebar}</motion.aside></>}</AnimatePresence>
      <div className={`transition-all ${collapsed ? 'lg:pl-20' : 'lg:pl-64'}`}>
        <header className="sticky top-0 z-30 flex h-20 items-center gap-4 border-b border-white/[0.06] bg-background/80 px-5 backdrop-blur-xl lg:px-8">
          <button onClick={() => setMobile(true)} className="p-2 text-slate-300 lg:hidden"><Menu /></button>
          <div className="relative hidden max-w-md flex-1 sm:block">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input className="input !py-2.5 !pl-10" placeholder="Search your workspace..." />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-slate-600">⌘ K</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button className="relative rounded-xl border border-white/[0.08] bg-white/[0.04] p-2.5 text-slate-400 hover:text-white"><Bell size={18} /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-indigo-400" /></button>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-sm font-bold text-black">
                {user?.name ? user.name.substring(0, 2).toUpperCase() : 'AK'}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold">{user?.name || 'Alex Kim'}</p>
                <p className="text-[11px] text-slate-500">{user?.email || 'Student'}</p>
              </div>
            </div>
          </div>
        </header>
        <AnimatePresence mode="wait">
          <motion.main key={location.pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mx-auto max-w-[1500px] p-5 lg:p-8">
            <Outlet />
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  )
}
