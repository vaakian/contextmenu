import type { MenuItem } from './MenuItem'

export class MenuGroup {
  constructor(
    public readonly menuItems: MenuItem[],
  ) {}
}
