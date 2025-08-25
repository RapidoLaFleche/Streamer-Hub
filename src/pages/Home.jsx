import SocialLinkCard from '../components/SocialLinkCard.jsx'
import { TWITCH_CHANNEL } from '../config.js'

const twitchParent = window.location.hostname

export default function Home() {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 card overflow-hidden">
        <div className="relative aspect-[16/9] w-full">
          <iframe
            src={`https://player.twitch.tv/?channel=${TWITCH_CHANNEL}&parent=${twitchParent}&muted=true`}
            height="100%"
            width="100%"
            allowFullScreen={true}
            frameBorder="0"
            className="absolute inset-0 w-full h-full"
          ></iframe>
        </div>
        <iframe
          src="https://www.twitch.tv/embed/rayzopp/chat?parent=techtwins.fr&darkpopout"
          height="500px"
          width="100%">
        </iframe>
      </div>

      <div className="space-y-6">
        <SocialLinkCard
          title="TWITCH"
          subtitle="Tous les soirs à 20h30 !"
          href={`https://www.twitch.tv/${TWITCH_CHANNEL}`}
          imageUrl="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop"
        />
        <SocialLinkCard
          title="YOUTUBE"
          subtitle="Chaîne YouTube"
          href="https://www.youtube.com/@Rayzopp"
          imageUrl="https://panels.twitch.tv/panel-446780376-image-128837d6-327d-4ffd-9c74-092ca8901c8e"
        />
        <SocialLinkCard
          title="TWITTER"
          subtitle="Me suivre sur Twitter"
          href="https://twitter.com/rayzopp"
          imageUrl="https://panels.twitch.tv/panel-446780376-image-6a6b27ab-0e26-4514-bf10-c0fce56a0cdf"
        />
        <SocialLinkCard
          title="DISCORD"
          subtitle="Rejoins la communauté"
          href="https://discord.com/invite/XJjkzPtUjA"
          imageUrl="https://panels.twitch.tv/panel-446780376-image-0c87ce79-6fe1-4d26-9a8c-2c80c31b896a"
        />
      </div>
    </div>
  )
}