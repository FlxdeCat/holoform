import { render } from '@testing-library/react'
import WebcamFeed from '../components/WebcamFeed'
import { describe, it, expect, vi } from 'vitest'

describe('WebcamFeed Component', () => {
  it('renders video element', () => {
    const mockResults = vi.fn()
    const { container } = render(<WebcamFeed onResults={mockResults} />)

    const video = container.querySelector('video')
    expect(video).toBeInTheDocument()
  })
})
