import { render } from '@testing-library/react'
import { createRef } from 'react'
import { ContextMenu, MenuGroup, MenuItem } from '@contextmenu/react'
import type { UseContextMenuReturn } from '@contextmenu/react'
import { delayedPromise, dispatchCtxEvent, expectToBeHidden, expectToBeVisible } from '../utils'

describe('@contextmenu/react', () => {
  it('`MenuGroup` should read ref', async () => {
    const ref = createRef<HTMLDivElement>()
    const vDOM = <MenuGroup ref={ref}>content</MenuGroup>
    const ret = await render(vDOM)
    expect(ref.current).toBeTruthy()
    expect(ret.findAllByText('content')).toBeTruthy()
  })
  it('`MenuItem` should read ref', async () => {
    const ref = createRef<HTMLDivElement>()
    const vDOM = <MenuItem ref={ref}>content</MenuItem>
    const ret = await render(vDOM)
    expect(ref.current).toBeTruthy()
    expect(ret.findAllByText('content')).toBeTruthy()
  })

  it('`ContextMenu` should read ref', async () => {
    const ref = createRef<UseContextMenuReturn>()
    // const vDOM = createElement(ContextMenu, { ref }, 'content')
    const vDOM = <ContextMenu ref={ref}>content</ContextMenu>
    const ret = await render(vDOM)

    expect(ref.current).toBeTruthy()

    const realDOM = await ret.findByText('content')

    // hidden on init
    expectToBeHidden(realDOM)
    expect(ref.current?.visible).toBe(false)

    // do a right click
    dispatchCtxEvent()

    expectToBeVisible(realDOM)
    await delayedPromise(1)
    // should sync state
    expect(ref.current?.visible).toBe(true)
    dispatchEvent(new MouseEvent('scroll'))
    expectToBeHidden(realDOM)

    dispatchCtxEvent()

    expectToBeVisible(realDOM)
    dispatchEvent(new MouseEvent('click'))
    expectToBeHidden(realDOM)
  })
})
