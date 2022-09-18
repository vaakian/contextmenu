import type { StylableElement } from '@contextmenu/shared'
import type { MenuGroup } from './MenuGroup'

export class MenuItem {
  constructor(
    public readonly el: StylableElement,
    public readonly subMenuGroup: MenuGroup,
  ) {}
}
