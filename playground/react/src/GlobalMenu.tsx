import { ContextMenu, MenuGroup, MenuItem } from '@contextmenu/react'
import { memo, useRef } from 'react'

function CustomMenu() {
  return (
    <div style={{
      borderRadius: '5px',
      width: 100,
      height: 120,
      paddingTop: 20,
      backgroundColor: '#efd7d7',
    }}>
      Welcome!🎉
    </div>
  )
}

const GlobalMenu = memo(
  () => {
    // access the wrapper
    const ref = useRef<HTMLDivElement>(null)
    return (
    <ContextMenu>
      <MenuGroup ref={ref}>
        <MenuItem>Item1</MenuItem>
        <MenuItem>Item2</MenuItem>
        <MenuItem>
          <span>Item3</span>
        <MenuGroup>
            <MenuItem>Sub1</MenuItem>
            <MenuItem>
              <span>Sub3</span>
              <MenuGroup>
                <CustomMenu />
              </MenuGroup>
            </MenuItem>
            <MenuItem>Sub3</MenuItem>
          </MenuGroup>
        </MenuItem>
      </MenuGroup>
    </ContextMenu>
    )
  },
)
GlobalMenu.displayName = 'GlobalMenu'

export default GlobalMenu
