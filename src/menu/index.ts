import { TrueSightIcons } from "../icons"
import { AnyEntityMenu } from "./any"
import { MenuBuilding } from "./buildings"
import { MenuCreep } from "./creeps"
import { MenuHero } from "./heroes"

export class MenuManager {
	public readonly State: Menu.Toggle

	public readonly Hero: MenuHero
	public readonly Creep: MenuCreep
	public readonly Building: MenuBuilding

	public readonly Any: AnyEntityMenu
	public readonly Ward: Menu.Toggle
	public readonly Courier: Menu.Toggle
	public readonly Roshan: Menu.Toggle

	constructor() {
		const visualNode = Menu.AddEntry("Visual")
		const menu = visualNode.AddNode(
			"True sight",
			TrueSightIcons.TrueSight,
			"Marks your units the enemy sees\nthrough invisibility: sentries, gem, towers"
		)
		menu.SortNodes = false

		this.State = menu.AddToggle("State", true)
		this.State.IconPath = TrueSightIcons.State
		menu.HeaderControl = this.State
		menu.Gate = this.State

		this.Ward = menu.AddToggle("Wards", true)
		this.Ward.IconPath = TrueSightIcons.Ward
		this.Roshan = menu.AddToggle("Roshan", true)
		this.Roshan.IconPath = TrueSightIcons.Roshan
		this.Courier = menu.AddToggle("Couriers", true)
		this.Courier.IconPath = TrueSightIcons.Courier

		this.Hero = new MenuHero(menu)
		this.Creep = new MenuCreep(menu)
		this.Building = new MenuBuilding(menu)
		this.Any = new AnyEntityMenu(menu.AddNode("Any units", TrueSightIcons.Units))
	}

	public OnChanged(callback: () => void) {
		this.State.OnValue(() => callback())
		this.Ward.OnValue(() => callback())
		this.Any.OnChanged(() => callback())
		this.Roshan.OnValue(() => callback())
		this.Hero.OnChanged(() => callback())
		this.Courier.OnValue(() => callback())
		this.Creep.OnChanged(() => callback())
		this.Building.OnChanged(() => callback())
	}
}
