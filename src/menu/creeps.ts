import { TrueSightIcons } from "../icons"

class CreepTypes {
	public readonly Hawk: Menu.Toggle
	public readonly Boar: Menu.Toggle
	public readonly Lane: Menu.Toggle
	public readonly Eidolon: Menu.Toggle
	public readonly Neutral: Menu.Toggle
	public readonly Zombies: Menu.Toggle
	public readonly Familiar: Menu.Toggle
	public readonly Spider: Menu.Toggle
	public readonly Panda: Menu.Toggle
	public readonly ForgedSpirit: Menu.Toggle

	constructor(menu: Menu.Node) {
		this.Lane = menu.AddToggle("Lines", false)
		this.Lane.IconPath = TrueSightIcons.Lane
		this.Lane.IsHidden = true

		this.Neutral = menu.AddToggle("Neutrals", true)
		this.Neutral.IconPath = TrueSightIcons.Neutral
		this.Neutral.IsHidden = true

		this.Boar = menu.AddToggle("Boars", true)
		this.Boar.IconPath = TrueSightIcons.Boar
		this.Boar.IsHidden = true

		this.Hawk = menu.AddToggle("Hawks", true)
		this.Hawk.IconPath = TrueSightIcons.Hawk
		this.Hawk.IsHidden = true

		this.Panda = menu.AddToggle("Pandas", true)
		this.Panda.IconPath = TrueSightIcons.Panda
		this.Panda.IsHidden = true

		this.Eidolon = menu.AddToggle("Eidolons", true)
		this.Eidolon.IconPath = TrueSightIcons.Eidolon
		this.Eidolon.IsHidden = true

		this.Spider = menu.AddToggle("Spiders", false)
		this.Spider.IconPath = TrueSightIcons.Spider
		this.Spider.IsHidden = true

		this.Zombies = menu.AddToggle("Zombies", false)
		this.Zombies.IconPath = TrueSightIcons.Zombie
		this.Zombies.IsHidden = true

		this.Familiar = menu.AddToggle("Familiars", true)
		this.Familiar.IconPath = TrueSightIcons.Familiar
		this.Familiar.IsHidden = true

		this.ForgedSpirit = menu.AddToggle("Forged spirit", true)
		this.ForgedSpirit.IconPath = TrueSightIcons.ForgedSpirit
		this.ForgedSpirit.IsHidden = true
	}

	public OnChanged(callback: () => void) {
		this.Lane.OnValue(() => callback())
		this.Panda.OnValue(() => callback())
		this.Boar.OnValue(() => callback())
		this.Hawk.OnValue(() => callback())
		this.Spider.OnValue(() => callback())
		this.Neutral.OnValue(() => callback())
		this.Zombies.OnValue(() => callback())
		this.Familiar.OnValue(() => callback())
		this.Eidolon.OnValue(() => callback())
		this.ForgedSpirit.OnValue(() => callback())
	}

	public ResetSettings(hideUnhide: boolean) {
		this.Lane.value = this.Lane.defaultValue
		this.Boar.value = this.Boar.defaultValue
		this.Hawk.value = this.Hawk.defaultValue
		this.Panda.value = this.Panda.defaultValue
		this.Spider.value = this.Spider.defaultValue
		this.Neutral.value = this.Neutral.defaultValue
		this.Zombies.value = this.Zombies.defaultValue
		this.Familiar.value = this.Familiar.defaultValue
		this.Eidolon.value = this.Eidolon.defaultValue
		this.ForgedSpirit.value = this.ForgedSpirit.defaultValue
		this.HideUnhide(hideUnhide)
	}

	public HideUnhide(state: boolean) {
		this.Lane.IsHidden = state
		this.Boar.IsHidden = state
		this.Hawk.IsHidden = state
		this.Panda.IsHidden = state
		this.Spider.IsHidden = state
		this.Neutral.IsHidden = state
		this.Zombies.IsHidden = state
		this.Familiar.IsHidden = state
		this.Eidolon.IsHidden = state
		this.ForgedSpirit.IsHidden = state
	}
}

export class MenuCreep {
	public readonly State: Menu.Toggle
	public readonly AllState: Menu.Toggle
	public readonly Types: CreepTypes

	private readonly tree: Menu.Node

	constructor(node: Menu.Node) {
		this.tree = node.AddNode("Creeps", TrueSightIcons.Creeps)
		this.tree.SortNodes = false
		this.State = this.tree.AddToggle("State", true)
		this.tree.HeaderControl = this.State
		this.AllState = this.tree.AddToggle("All creeps", false)
		this.AllState.IconPath = TrueSightIcons.All
		this.Types = new CreepTypes(this.tree)
	}

	public OnChanged(callback: () => void) {
		this.State.OnValue(() => callback())
		this.Types.OnChanged(() => callback())
		this.AllState.OnValue(call => {
			this.Types.HideUnhide(call.value)
			this.tree.Update()
			callback()
		})
	}
}
