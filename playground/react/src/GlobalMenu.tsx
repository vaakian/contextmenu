import { ContextMenu, MenuGroup, MenuItem } from '@contextmenu/react'

function CustomMenu() {
  return (
    <div>
      Welcome Man!
    </div>
  )
}

export default function GlobalMenu() {
  return (
    <ContextMenu>
      <MenuGroup>
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
}
