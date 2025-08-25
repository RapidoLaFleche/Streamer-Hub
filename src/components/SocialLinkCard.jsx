import { ArrowRight } from 'lucide-react'

export default function SocialLinkCard({ title, subtitle, href, imageUrl, gradient='' }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="block card card-hover overflow-hidden">
      <div className="relative aspect-[16/9] w-full">
        <img src={imageUrl} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="inline-block bg-black/70 px-3 py-1 rounded-full text-xs tracking-wide">{title}</div>
          <div className="mt-2 text-lg font-semibold">{subtitle}</div>
          <div className="mt-2 text-sm opacity-80 flex items-center gap-1">Visiter <ArrowRight className="w-4 h-4"/></div>
        </div>
      </div>
    </a>
  )
}
