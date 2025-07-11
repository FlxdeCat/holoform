import gsap from 'gsap'
import * as THREE from 'three'

export function applyIdleAnimation(bone: THREE.Bone, axis: 'x' | 'y' | 'z', range = 0.05, duration = 2) {
  const target = { [axis]: bone.position[axis] + range }

  gsap.to(bone.position, {
    [axis]: target[axis],
    duration,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  })
}
