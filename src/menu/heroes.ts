import { TrueSightIcons } from "../icons"

export class MenuHero {
	public readonly State: Menu.Toggle
	public readonly Clone: Menu.Toggle
	public readonly OnlySelf: Menu.Toggle
	public readonly Illusion: Menu.Toggle

	constructor(node: Menu.Node) {
		const menu = node.AddNode("Heroes", TrueSightIcons.Heroes)
		menu.SortNodes = false
		this.State = menu.AddToggle("State", true)
		menu.HeaderControl = this.State
		this.Clone = menu.AddToggle("Clones", true)
		this.Clone.IconPath = TrueSightIcons.Clone
		this.Illusion = menu.AddToggle("Illusion", true)
		this.Illusion.IconPath = TrueSightIcons.Illusion
		this.OnlySelf = menu.AddToggle("Only self", false)
		this.OnlySelf.IconPath = TrueSightIcons.Self
	}

	public OnChanged(callback: () => void) {
		this.State.OnValue(() => callback())
		this.Clone.OnValue(() => callback())
		this.OnlySelf.OnValue(() => callback())
		this.Illusion.OnValue(() => callback())
	}
}
