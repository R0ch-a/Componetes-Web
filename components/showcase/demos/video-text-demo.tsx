import { VideoText } from "@/components/ui/video-text";

/**
 * Mesmo uso da doc do Magic UI. O vídeo foi baixado para public/videos/, então
 * o componente não depende da CDN em runtime.
 */
const VideoTextDemo = () => {
  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-xl bg-neutral-950">
      <VideoText src="/videos/ocean-small.webm">OCEAN</VideoText>
    </div>
  );
};

export { VideoTextDemo };
