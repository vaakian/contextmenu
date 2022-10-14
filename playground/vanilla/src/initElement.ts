import { createElement } from './createElement'

export function initTargetMenuElement() {
  document.querySelector<HTMLDivElement>('#app')!.append(createElement(`
    <div>
      <div 
          id="menu" 
          style="display: inline-block; border: 1px solid; color: blue; background: yellow"
      >
          Menu Target
      </div>
      <div id="target" style="width: 100px; height: 100px; background: red;">
      Right Click.
      </div>
    </div>
`))
}
export function initNestedMenuElement() {
  document.querySelector<HTMLDivElement>('#app')!.append(createElement(`
    <div>
      <div id="group">
        <div id="item1">item1</div>
        <div id="item2">item2</div>
        <div id="item3">
          item3
          <div id="group_1">
          Hello
          </div>
        </div>
      </div>
    </div>
`))
}
