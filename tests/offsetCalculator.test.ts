import type { Position, Size } from '@contextmenu/shared'
import { calculateOffset } from '@contextmenu/core'

describe('offsetCalculator', () => {
  const menuSize: Size = {
    width: 50,
    height: 50,
  }
  const containerSize: Size = {
    width: 100,
    height: 100,
  }

  it('should set left & top', () => {
    const noOverflow: Position = {
      x: 20,
      y: 30,
    }

    const { left, right, top, bottom } = calculateOffset(noOverflow, menuSize, containerSize)

    expect(left).toBe(noOverflow.x)
    expect(top).toBe(noOverflow.y)
    expect(right).toBeNull()
    expect(bottom).toBeNull()
  })

  it('should set right & top', () => {
    const overflowX: Position = {
      x: 60,
      y: 30,
    }

    const { left, right, top, bottom } = calculateOffset(overflowX, menuSize, containerSize)

    expect(left).toBeNull()
    expect(top).toBe(overflowX.y)
    expect(right).toBe(containerSize.width - overflowX.x)
    expect(bottom).toBeNull()
  })

  it('should set left & bottom', () => {
    const overflowY: Position = {
      x: 30,
      y: 60,
    }

    const { left, right, top, bottom } = calculateOffset(overflowY, menuSize, containerSize)

    expect(left).toBe(overflowY.x)
    expect(bottom).toBe(containerSize.height - overflowY.y)
    expect(right).toBeNull()
    expect(top).toBeNull()
  })

  it('should set right & bottom', () => {
    const overflowY: Position = {
      x: 60,
      y: 60,
    }

    const { left, right, top, bottom } = calculateOffset(overflowY, menuSize, containerSize)

    expect(right).toBe(containerSize.width - overflowY.x)
    expect(bottom).toBe(containerSize.height - overflowY.y)
    expect(left).toBeNull()
    expect(top).toBeNull()
  })
})
