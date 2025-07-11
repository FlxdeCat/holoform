import { useEffect, useRef } from 'react'
import { Holistic } from '@mediapipe/holistic'
import type { ResultsListener } from '@mediapipe/holistic'
import { Camera } from '@mediapipe/camera_utils'

export const useHolistic = (onResults: ResultsListener) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!videoRef.current) return

    const holistic = new Holistic({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`,
    })

    holistic.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      refineFaceLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    })

    holistic.onResults(onResults)

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        await holistic.send({ image: videoRef.current! })
      },
      width: 640,
      height: 480,
    })

    camera.start()

    return () => {
      camera.stop()
      holistic.close()
    }
  }, [onResults])

  return videoRef
}