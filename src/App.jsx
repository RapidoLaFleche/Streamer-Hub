import { Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Stream from './pages/Stream.jsx'
import Videos from './pages/Videos.jsx'
import Lounge from './pages/Lounge.jsx'
import { TvMinimal, Youtube, Twitter, Bot } from 'lucide-react'

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 bg-neutral-950/70 backdrop-blur border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4">
          <nav className="flex items-center gap-6 h-16">
            <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/b91c37af-14d7-4311-8333-d0802d6b7723-profile_image-70x70.png" alt="rayzopp_logo" class="rounded-full"/><a href="/" className="font-black tracking-wide text-xl">Rayzopp</a>
            <div className="flex-1" />
            <NavLink to="/" className={({isActive}) => 'px-3 py-1.5 rounded-lg transition ' + (isActive ? 'bg-white text-black' : 'hover:bg-white/10')}>Accueil</NavLink>
            <NavLink to="/stream" className={({isActive}) => 'px-3 py-1.5 rounded-lg transition ' + (isActive ? 'bg-white text-black' : 'hover:bg-white/10')}>Stream</NavLink>
            <NavLink to="/videos" className={({isActive}) => 'px-3 py-1.5 rounded-lg transition ' + (isActive ? 'bg-white text-black' : 'hover:bg-white/10')}>Vidéos</NavLink>
            <NavLink to="/lounge" className={({isActive}) => 'px-3 py-1.5 rounded-lg transition ' + (isActive ? 'bg-white text-black' : 'hover:bg-white/10')}>Lounge</NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stream" element={<Stream />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/lounge" element={<Lounge />} />
        </Routes>
      </main>

      <footer className="border-t border-white/10 py-8 mt-10">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row gap-3 items-center justify-between text-white/60">
          <p>© {new Date().getFullYear()} Rayzopp - Entierrement Développé et Designé par le fidèle viewer <a href="https://twitch.tv/rapidolafleche" target='blank_' className="mt-2 text-lg font-semibold">Rapido</a> ➜</p>
          <div className="flex gap-4">
            <a href="https://twitch.tv/rayzopp" target="_blank" className="hover:text-white"><TvMinimal className="inline w-5 h-5 mr-1"/>Twitch</a>
            <a href="https://youtube.com/@Rayzopp" target="_blank" className="hover:text-white"><Youtube className="inline w-5 h-5 mr-1"/>YouTube</a>
            <a href="https://twitter.com/rayzopp" target="_blank" className="hover:text-white"><Twitter className="inline w-5 h-5 mr-1"/>Twitter</a>
            <a href="https://discord.com/invite/XJjkzPtUjA" target="_blank" className="hover:text-white"><Bot className="inline w-5 h-5 mr-1"/>Discord</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
