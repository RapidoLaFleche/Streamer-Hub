import { useEffect, useState } from 'react'

export default function Videos() {
  const [latest, setLatest] = useState(null)
  const [list, setList] = useState([])
  const [activeVideoId, setActiveVideoId] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const [latestRes, listRes] = await Promise.all([
          fetch('/api/youtube/latest'),
          fetch('/api/youtube/videos?maxResults=5')
        ])
        const latestJson = await latestRes.json()
        const listJson = await listRes.json()
        setLatest(latestJson.item)
        setList(listJson.items)
        setActiveVideoId(latestJson.item?.videoId || listJson.items?.[0]?.videoId)
      } catch (e) {
        console.error('YouTube API error', e)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 card overflow-hidden">
        <div className="relative aspect-[16/9] w-full">
          {activeVideoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${activeVideoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            ></iframe>
          ) : (
            <div className="absolute inset-0 grid place-items-center text-white/50">Chargement…</div>
          )}
        </div>
        <div className="p-4 border-t border-white/10">
          <h2 className="text-lg font-semibold">{latest?.title ?? 'Dernière vidéo'}</h2>
          <p className="text-white/60 text-sm">{latest?.publishedAt ? new Date(latest.publishedAt).toLocaleString() : ''}</p>
        </div>
      </div>

      <aside className="space-y-3 max-h-[60vh] overflow-auto pr-2">
        {list.map(v => (
          <button
            key={v.videoId}
            onClick={() => setActiveVideoId(v.videoId)}
            className={`w-full text-left card flex gap-3 p-2 hover:bg-white/5 ${activeVideoId===v.videoId ? 'ring-2 ring-white/30' : ''}`}
          >
            <img src={v.thumbnail} alt={v.title} className="w-40 h-24 object-cover rounded-xl" />
            <div className="flex-1 min-w-0">
              <div className="font-medium line-clamp-2">{v.title}</div>
              <div className="text-xs text-white/60">{new Date(v.publishedAt).toLocaleDateString()}</div>
            </div>
          </button>
        ))}
      </aside>
    </div>
  )
}
