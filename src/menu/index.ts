import {
	ImageData,
	Menu,
	NotificationsSDK,
	ResetSettingsUpdated,
	Sleeper
} from "github.com/octarine-public/wrapper/index"

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

	private readonly reset: Menu.Button
	private readonly sleeper = new Sleeper()

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
			ImageData.Paths.Icons.icon_ward
		)
		this.Roshan = menu.AddToggle(
			"Roshan",
			true,
			undefined,
			-1,
			ImageData.Paths.Icons.icon_roshan
		)

		this.Courier = menu.AddToggle(
			"Couriers",
			true,
			undefined,
			-1,
			ImageData.Paths.Icons.icon_svg_courier
		)

		this.Hero = new MenuHero(menu)
		this.Creep = new MenuCreep(menu)
		this.Building = new MenuBuilding(menu)

		this.Any = new AnyEntityMenu(
			menu.AddNode("Any units", ImageData.Paths.Icons.icon_svg_other)
		)

		this.reset = menu.AddButton("Reset", "Reset settings")
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

		this.reset.OnValue(() => {
			if (this.sleeper.Sleeping("ResetSettings")) {
				return
			}
			this.ResetSettings()
			this.sleeper.Sleep(1000, "ResetSettings")
			NotificationsSDK.Push(new ResetSettingsUpdated())
			callback()
		})
	}

	public GameChanged() {
		this.sleeper.FullReset()
	}

	public ResetSettings() {
		this.Ward.value = this.Ward.defaultValue
		this.State.value = this.State.defaultValue
		this.Roshan.value = this.Roshan.defaultValue
		this.Courier.value = this.Courier.defaultValue
		this.Any.ResetSettings()
		this.ResetSettingsUnits()
	}

	protected ResetSettingsUnits() {
		this.Any.ResetSettings()
		this.Hero.ResetSettings()
		this.Creep.ResetSettings()
		this.Building.ResetSettings()
	}
}
