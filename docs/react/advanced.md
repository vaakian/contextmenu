# Advanced Usage
You can use `useContextMenu` hook to create a shallow one-level menu programmatically, while you can also create nested menus by using `MenuGroup` and `MenuItem` components. 

```jsx
import { MenuGroup, MenuItem, ContextMenu } from '@contextmenu/react'

function App() {
  return (
    <div>
      <ContextMenu>
        <MenuGroup>
          <MenuItem>Item 1</MenuItem>
          <MenuItem>Item 2</MenuItem>
          <MenuItem>
            <p>Item 3</p>
             {/* nested sub menu content */}
            <MenuGroup>
              <MenuItem>Apple</MenuItem>
              <MenuItem>Orange</MenuItem>
              <MenuItem>Banana</MenuItem>
            </MenuGroup>
          </MenuItem>
        </MenuGroup>
      </ContextMenu>
    </div>
  )
}
```