import { ImageData, Menu } from "github.com/octarine-public/wrapper/index"

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
		const menu = visualNode.AddNode("True sight", "menu/icons/eye_true_sight.svg")
		menu.SortNodes = false

		this.State = menu.AddToggle("State", true)
		this.Ward = menu.AddToggle(
			"Wards",
			true,
			undefined,
			-1,
			ImageData.Icons.icon_ward
		)
		this.Roshan = menu.AddToggle(
			"Roshan",
			true,
			undefined,
			-1,
			ImageData.Icons.icon_roshan
		)

		this.Courier = menu.AddToggle(
			"Couriers",
			true,
			undefined,
			-1,
			ImageData.Icons.icon_svg_courier
		)

		this.Hero = new MenuHero(menu)
		this.Creep = new MenuCreep(menu)
		this.Building = new MenuBuilding(menu)

		this.Any = new AnyEntityMenu(
			menu.AddNode("Any units", ImageData.Icons.icon_svg_other)
		)
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
