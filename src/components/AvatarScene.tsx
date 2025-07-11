import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'
import Avatar from './Avatar'

interface AvatarSceneProps {
  landmarkData: any
  visibleSections: {
    face: boolean
    body: boolean
    hands: boolean
  }
}

export default function AvatarScene({ landmarkData, visibleSections }: AvatarSceneProps) {
  return (
    <Canvas camera={{ position: [0, 0, 2.5] }} className="z-20">
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <Stage environment="city">
          <Avatar landmarkData={landmarkData} visibleSections={visibleSections} />
        </Stage>
      </Suspense>
      <OrbitControls />
    </Canvas>
  )
}
