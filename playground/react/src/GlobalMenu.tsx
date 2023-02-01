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
const refresh = () => window.location.reload()
const GlobalMenu = memo(
  () => {
    // access the wrapper
    const ref = useRef<HTMLDivElement>(null)
    return (
    <ContextMenu style={{ textAlign: 'left' }}>
      <MenuGroup ref={ref}>
        <MenuItem>Setting</MenuItem>
        <MenuItem>General</MenuItem>
        <MenuItem onClick={refresh}>Reload</MenuItem>
        <MenuItem>
          <span>More{' =>'}</span>
        <MenuGroup>
            <MenuItem>Sub1</MenuItem>
            <MenuItem>
              <span>Sub2</span>
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
