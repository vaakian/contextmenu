import { render } from '@testing-library/vue'
import { ContextMenu } from '@contextmenu/vue'
import { h } from 'vue'
import type { RenderResult } from '@testing-library/react'
import { expectToBeHidden } from '../utils'

describe('@contextmenu/vue', () => {
  let app: RenderResult
  beforeEach(() => {
    app = render(h(ContextMenu, {}, [
      h('button', 'Hello World'),
    ])) as unknown as RenderResult
  })

  it('should be defined', () => {
    expect(ContextMenu).toBeDefined()
  })

  it('`ContextMenu` should work', async () => {
    expectToBeHidden(app.container.firstElementChild as HTMLElement)
    expect((await app.findByText('Hello World')).tagName).toBe('BUTTON')
  })
})

