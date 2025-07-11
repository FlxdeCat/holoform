import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

import { mapLandmarkToBone } from '../utils/mapLandmarksToBones'
import { applyIdleAnimation } from '../utils/applyIdleAnimation'

interface AvatarProps {
  landmarkData: any
  visibleSections: {
    face: boolean
    body: boolean
    hands: boolean
  }
}

const BoneMap = {
  rightWrist: 'CC_Base_R_Hand_083',
  leftWrist: 'CC_Base_L_Hand_055',
  rightElbow: 'CC_Base_R_Forearm_079',
  leftElbow: 'CC_Base_L_Forearm_051',
  head: 'CC_Base_Head_038',
  spine: 'CC_Base_Spine01_034',
  eyelids: ['CC_Base_L_Eye_046', 'CC_Base_R_Eye_045'],
  rightHand: 'CC_Base_R_Hand_083',
  leftHand: 'CC_Base_L_Hand_055',
  neck: 'CC_Base_NeckTwist01_036',
  hips: 'CC_Base_Pelvis_03',
  jaw: 'CC_Base_JawRoot_040',
  chest: 'CC_Base_Chest_032',
}

export default function Avatar({ landmarkData, visibleSections }: AvatarProps) {
  const { scene } = useGLTF('/avatar.glb')

  const skinnedMesh = scene.getObjectByProperty('type', 'SkinnedMesh') as THREE.SkinnedMesh | null
  const skeleton = skinnedMesh?.skeleton

  const bonesRef = useRef<Record<string, THREE.Bone | null>>({})
  const lastPose = useRef<any>(null)
  const idleTimeline = useRef<gsap.core.Timeline | null>(null)
  const idlePauseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!skeleton) return

    const bones = Object.fromEntries(
      Object.entries(BoneMap).flatMap(([key, name]) => {
        if (Array.isArray(name)) {
          return name.map((n, i) => [`${key}${i}`, skeleton.bones.find(b => b.name === n) || null])
        }
        return [[key, skeleton.bones.find(b => b.name === name) || null]]
      })
    )

    bonesRef.current = bones

    idleTimeline.current = applyIdleAnimation({
      head: bones.head,
      spine: bones.spine,
      hips: bones.hips,
      jaw: bones.jaw,
    })

    if (bones.chest) {
      gsap.to(bones.chest.scale, {
        y: '+=0.02',
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }

    if (bones.neck) {
      gsap.to(bones.neck.rotation, {
        x: "+=0.03",
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }
  }, [skeleton])

  useEffect(() => {
    const blink = () => {
      const left = bonesRef.current.eyelids0
      const right = bonesRef.current.eyelids1
      if (!left || !right) return
      gsap.to([left.scale, right.scale], {
        y: 0.1,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
      })
    }

    const interval = setInterval(() => {
      blink()
    }, 3000 + Math.random() * 2000)

    return () => clearInterval(interval)
  }, [])

  useFrame(() => {
    if (!landmarkData || !skeleton) return

    const currentRightWrist = landmarkData.poseLandmarks?.[16]
    const lastRightWrist = lastPose.current?.poseLandmarks?.[16]

    const moved =
      !lastRightWrist ||
      Math.abs(currentRightWrist.x - lastRightWrist.x) > 0.01 ||
      Math.abs(currentRightWrist.y - lastRightWrist.y) > 0.01

    if (moved) {
      idleTimeline.current?.pause()
      if (idlePauseTimeout.current) clearTimeout(idlePauseTimeout.current)
      idlePauseTimeout.current = setTimeout(() => {
        idleTimeline.current?.resume()
      }, 1000)
    }

    lastPose.current = landmarkData

    const map = (idx: number, boneKey: keyof typeof BoneMap) => {
      const lm = landmarkData.poseLandmarks?.[idx]
      const bone = bonesRef.current[boneKey]
      if (lm && bone) mapLandmarkToBone(lm, bone)
    }

    if (visibleSections.body) {
      map(16, 'rightWrist')
      map(15, 'leftWrist')
      map(14, 'rightElbow')
      map(13, 'leftElbow')
    }

    if (visibleSections.face) {
      const nose = landmarkData.faceLandmarks?.[1]
      const head = bonesRef.current.head
      if (nose && head) mapLandmarkToBone(nose, head)
    }

    if (visibleSections.hands) {
      const rightHand = landmarkData.rightHandLandmarks?.[0]
      const rightHandBone = bonesRef.current.rightHand
      if (rightHand && rightHandBone) mapLandmarkToBone(rightHand, rightHandBone)

      const leftHand = landmarkData.leftHandLandmarks?.[0]
      const leftHandBone = bonesRef.current.leftHand
      if (leftHand && leftHandBone) mapLandmarkToBone(leftHand, leftHandBone)
    }
  })

  return <primitive object={scene} />
}
