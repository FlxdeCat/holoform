import gsap from 'gsap'
import * as THREE from 'three'

export interface IdleBoneMap {
  head?: THREE.Bone | null
  spine?: THREE.Bone | null
  hips?: THREE.Bone | null
  jaw?: THREE.Bone | null
}

export function applyIdleAnimation(bones: IdleBoneMap): gsap.core.Timeline {
  const tl = gsap.timeline({ repeat: -1, yoyo: true, paused: false })

  if (bones.head) {
    tl.to(bones.head.position, { y: '+=0.03', duration: 2.5, ease: 'sine.inOut' }, 0)
    tl.to(bones.head.position, { x: '+=0.01', duration: 4, ease: 'sine.inOut' }, 0)
  }

  if (bones.spine) {
    tl.to(bones.spine.position, { y: '+=0.02', duration: 3, ease: 'sine.inOut' }, 0)
    tl.to(bones.spine.rotation, { z: '+=0.05', duration: 3.2, ease: 'sine.inOut' }, 0)
  }

  if (bones.hips) {
    tl.to(bones.hips.position, { x: '+=0.015', duration: 3.2, ease: 'sine.inOut' }, 0)
  }

  if (bones.jaw) {
    tl.to(bones.jaw.rotation, { x: '+=0.05', duration: 2, ease: 'power1.inOut' }, 1)
  }

  return tl
}