import { render, screen, fireEvent } from '@testing-library/react'
import Controls from '../components/Controls'
import { describe, it, expect, vi } from 'vitest'
import '@testing-library/jest-dom'

describe('Controls Component', () => {
  it('renders all toggle buttons', () => {
    render(
      <Controls
        showFace={true}
        showBody={true}
        showHands={true}
        onToggle={() => { }}
      />
    )

    expect(screen.getByText(/Face/i)).toBeInTheDocument()
    expect(screen.getByText(/Body/i)).toBeInTheDocument()
    expect(screen.getByText(/Hands/i)).toBeInTheDocument()
  })

  it('calls onToggle when Face is clicked', () => {
    const mockToggle = vi.fn()
    render(
      <Controls
        showFace={true}
        showBody={true}
        showHands={true}
        onToggle={mockToggle}
      />
    )

    fireEvent.click(screen.getByText(/Face/i))
    expect(mockToggle).toHaveBeenCalledWith('face')
  })
})
