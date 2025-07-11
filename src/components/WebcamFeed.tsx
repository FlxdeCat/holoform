import { useHolistic } from '../hooks/useHolistic'

interface WebcamFeedProps {
  onResults: (results: any) => void
}

export default function WebcamFeed({ onResults }: WebcamFeedProps) {
  const videoRef = useHolistic(onResults)

  return (
    <video
      ref={videoRef}
      className="absolute w-full h-full object-cover z-10 opacity-30"
      autoPlay
      muted
      playsInline
    />
  )
}