import { useState } from 'react'
import WebcamFeed from './components/WebcamFeed'
import AvatarScene from './components/AvatarScene'
import Controls from './components/Controls'

function App() {
  const [landmarks, setLandmarks] = useState<any>(null)

  const [showSections, setShowSections] = useState({
    face: true,
    body: true,
    hands: true,
  })

  const toggleSection = (section: 'face' | 'body' | 'hands') => {
    setShowSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="flex-1 relative">
        <WebcamFeed onResults={setLandmarks} />
        <AvatarScene landmarkData={landmarks} visibleSections={showSections} />
        <Controls
          showFace={showSections.face}
          showBody={showSections.body}
          showHands={showSections.hands}
          onToggle={toggleSection}
        />
      </div>
    </div>
  )
}

export default App
