import gsap from 'gsap'
import * as THREE from 'three'

export function mapLandmarkToBone(
  landmark: { x: number; y: number; z: number },
  bone: THREE.Bone,
  duration = 0.1
) {
  const target = {
    x: (landmark.x - 0.5) * 2,
    y: -(landmark.y - 0.5) * 2,
    z: -landmark.z,
  }

  gsap.to(bone.position, {
    ...target,
    duration,
    ease: 'power2.out',
    overwrite: true,
  })
}
