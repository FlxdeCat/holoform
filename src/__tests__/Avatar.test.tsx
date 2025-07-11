import { render } from '@testing-library/react'
import Avatar from '../components/Avatar'
import { describe, it } from 'vitest'

describe('Avatar Component', () => {
  it('renders Avatar with mock data and visibleSections', () => {
    const mockData = {
      poseLandmarks: Array(33).fill({ x: 0.5, y: 0.5, z: 0.5 }),
      faceLandmarks: Array(10).fill({ x: 0.4, y: 0.4, z: 0.4 }),
      rightHandLandmarks: Array(21).fill({ x: 0.3, y: 0.3, z: 0.3 }),
      leftHandLandmarks: Array(21).fill({ x: 0.3, y: 0.3, z: 0.3 }),
    }

    render(
      <Avatar
        landmarkData={mockData}
        visibleSections={{ face: true, body: true, hands: true }}
      />
    )
  })
})
