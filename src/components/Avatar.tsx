import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

import { mapLandmarkToBone } from '../utils/mapLandmarksToBones'

interface AvatarProps {
  landmarkData: any
  visibleSections: {
    face: boolean
    body: boolean
    hands: boolean
  }
}

const BoneMap = {
  rightWrist: 'RightWrist',
  leftWrist: 'LeftWrist',
  rightElbow: 'RightElbow',
  leftElbow: 'LeftElbow',
  head: 'Head',
  spine: 'Spine',
  eyelids: ['EyeLid.L', 'EyeLid.R'],
  rightHand: 'RightHand',
  leftHand: 'LeftHand',
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

    const bones = {
      rightWrist: skeleton.bones.find(b => b.name === BoneMap.rightWrist) || null,
      leftWrist: skeleton.bones.find(b => b.name === BoneMap.leftWrist) || null,
      rightElbow: skeleton.bones.find(b => b.name === BoneMap.rightElbow) || null,
      leftElbow: skeleton.bones.find(b => b.name === BoneMap.leftElbow) || null,
      head: skeleton.bones.find(b => b.name === BoneMap.head) || null,
      spine: skeleton.bones.find(b => b.name === BoneMap.spine) || null,
      rightHand: skeleton.bones.find(b => b.name === BoneMap.rightHand) || null,
      leftHand: skeleton.bones.find(b => b.name === BoneMap.leftHand) || null,
      eyelidL: skeleton.bones.find(b => b.name === BoneMap.eyelids[0]) || null,
      eyelidR: skeleton.bones.find(b => b.name === BoneMap.eyelids[1]) || null,
    }

    bonesRef.current = bones

    const tl = gsap.timeline({ repeat: -1, yoyo: true, paused: false })

    if (bones.head) {
      tl.to(bones.head.position, { y: '+=0.03', duration: 2.5, ease: 'sine.inOut' }, 0)
      tl.to(bones.head.position, { x: '+=0.01', duration: 4, ease: 'sine.inOut' }, 0)
    }

    if (bones.spine) {
      tl.to(bones.spine.position, { y: '+=0.02', duration: 3, ease: 'sine.inOut' }, 0)
    }

    idleTimeline.current = tl
  }, [skeleton])

  useEffect(() => {
    const blink = () => {
      const left = bonesRef.current.eyelidL
      const right = bonesRef.current.eyelidR
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
