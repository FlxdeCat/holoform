interface ControlsProps {
  showFace: boolean
  showBody: boolean
  showHands: boolean
  onToggle: (section: 'face' | 'body' | 'hands') => void
}

export default function Controls({
  showFace,
  showBody,
  showHands,
  onToggle,
}: ControlsProps) {
  return (
    <div className="absolute top-4 left-4 bg-white/90 text-sm shadow-md rounded-xl p-4 z-50 space-y-2">
      <h2 className="font-bold text-lg mb-2">Controls</h2>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={showFace}
          onChange={() => onToggle('face')}
        />
        <span>Face Landmarks</span>
      </label>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={showBody}
          onChange={() => onToggle('body')}
        />
        <span>Body Landmarks</span>
      </label>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={showHands}
          onChange={() => onToggle('hands')}
        />
        <span>Hand Landmarks</span>
      </label>
    </div>
  )
}
