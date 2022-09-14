import { ContextMenu, useContextMenu } from '@contextmenu/react'
import React, { forwardRef, useCallback, useRef, useState } from 'react'
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
  const [hideOnClick, setHideOnClick] = useState(false)

  const menu = useRef<HTMLDivElement>(null)
  const target = useRef<HTMLDivElement>(null)

  const onContextMenu = useCallback((e: MouseEvent) => {
    // eslint-disable-next-line no-console
    console.log(e.target)
  }, [])

  const ctx = useContextMenu(menu, {
    hideOnClick,
    target,
    onContextMenu,
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
      <button
      onClick={() => setHideOnClick(pre => !pre)}>
        <span>hideOnClick {'=>'} </span>
        <BooleanString value={hideOnClick} />
        </button>
      <ContextMenu
      onContextMenu={onContextMenu}
      hideOnClick={hideOnClick}>
        <div>OK!</div>
      </ContextMenu>
    </div>
  )
}

export default App

