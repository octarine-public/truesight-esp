import { ImageData, Menu } from "github.com/octarine-public/wrapper/index"

export class MenuBuilding {
	public readonly State: Menu.Toggle
	public readonly Tower: Menu.Toggle
	public readonly Barrack: Menu.Toggle
	public readonly Fort: Menu.Toggle
	public readonly Filler: Menu.Toggle
	public readonly Watcher: Menu.Toggle
	public readonly Outpost: Menu.Toggle
	public readonly AllState: Menu.Toggle
	public readonly UnderlordPortal: Menu.Toggle

	private readonly tree: Menu.Node

	constructor(node: Menu.Node) {
		this.tree = node.AddNode("Buildings", ImageData.Icons.icon_svg_tower)
		this.tree.SortNodes = false
		this.State = this.tree.AddToggle("State", true)
		this.AllState = this.tree.AddToggle("All buildings", true)

		this.Fort = this.tree.AddToggle("Fort", true)
		this.Fort.IsHidden = true
		this.Tower = this.tree.AddToggle("Towers", true)
		this.Tower.IsHidden = true
		this.Filler = this.tree.AddToggle("Fillers", true)
		this.Filler.IsHidden = true
		this.Watcher = this.tree.AddToggle("Watchers", true)
		this.Watcher.IsHidden = true
		// outposts not supported
		this.Outpost = this.tree.AddToggle("Outposts", true)
		this.Outpost.IsHidden = true
		this.Barrack = this.tree.AddToggle("Barraks", true)
		this.Barrack.IsHidden = true
		this.UnderlordPortal = this.tree.AddToggle("Underlord portal", true)
		this.UnderlordPortal.IsHidden = true
	}

	public OnChanged(callback: () => void) {
		this.Fort.OnValue(() => callback())
		this.State.OnValue(() => callback())
		this.Tower.OnValue(() => callback())
		this.Filler.OnValue(() => callback())
		this.Watcher.OnValue(() => callback())
		this.UnderlordPortal.OnValue(() => callback())
		// not supported
		// this.Outpost.OnValue(() => callback())
		this.Barrack.OnValue(() => callback())
		this.AllState.OnValue(call => {
			callback()
			this.HideUnhide(call.value)
		})
	}

	protected HideUnhide(state = this.AllState.value) {
		this.Fort.IsHidden = state
		this.Tower.IsHidden = state
		this.Filler.IsHidden = state
		this.Watcher.IsHidden = state
		this.UnderlordPortal.IsHidden = state
		// not supported
		// this.Outpost.IsHidden = state
		this.Barrack.IsHidden = state
		this.tree.Update()
	}
}
