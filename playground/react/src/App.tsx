import { ContextMenu, useContextMenu } from '@contextmenu/react'
import React, { forwardRef, useCallback, useRef } from 'react'
import './App.css'

const BooleanString = ({ value }: { value: boolean }) => {
  return (
    <span style={{
      color: value ? 'green' : 'orange',
    }}>{JSON.stringify(value)}</span>
  )
}

const Menu = React.memo(
  forwardRef<HTMLDivElement>(
    (_props, ref) => {
      return (
    <div className="menu" ref={ref}>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </div>
      )
    },
  ),
)

Menu.displayName = 'MenuX'

function App() {
  const menu = useRef<HTMLDivElement>(null)
  const target = useRef<HTMLDivElement>(null)
  const ctx = useContextMenu(menu, {
    target,
    onContextMenu: useCallback((e: MouseEvent) => {
      // eslint-disable-next-line no-console
      console.log(e.target)
    }, []),
  })
  return (
    <div>
      <Menu ref={menu} />
      <div className="target" ref={target}>
        <h3>target</h3>
      </div>
      <div>
        <p>visible: <BooleanString value={ctx.visible} /></p>
        <p>enabled: <BooleanString value={ctx.enabled} /></p>
      </div>
      <ContextMenu>
        <div>OK!</div>
      </ContextMenu>
    </div>
  )
}

export default App

