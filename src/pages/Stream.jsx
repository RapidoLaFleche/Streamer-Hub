import { TWITCH_CHANNEL } from '../config.js'
const twitchParent = window.location.hostname

export default function Stream() {
  return (
    <div className="card overflow-hidden">
      <div className="relative aspect-[16/9] w-full">
        <iframe
          src={`https://player.twitch.tv/?channel=${TWITCH_CHANNEL}&parent=${twitchParent}`}
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
  )
}