import { Menu } from "github.com/octarine-public/wrapper/index"

export class MenuHero {
	public readonly State: Menu.Toggle
	public readonly Clone: Menu.Toggle
	public readonly OnlySelf: Menu.Toggle
	public readonly Illusion: Menu.Toggle

	constructor(node: Menu.Node) {
		const menu = node.AddNode("Heroes", "menu/icons/juggernaut.svg")
		menu.SortNodes = false
		this.State = menu.AddToggle("State", true)
		this.Clone = menu.AddToggle("Clones", true)
		this.Illusion = menu.AddToggle("Illusion", true)
		this.OnlySelf = menu.AddToggle("Only self", false)
	}

	public OnChanged(callback: () => void) {
		this.State.OnValue(() => callback())
		this.Clone.OnValue(() => callback())
		this.OnlySelf.OnValue(() => callback())
		this.Illusion.OnValue(() => callback())
	}
}
