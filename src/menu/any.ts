import { ImageData, Menu } from "github.com/octarine-public/wrapper/index"

export class AnyEntityMenu {
	public readonly Bear: Menu.Toggle
	public readonly Mine: Menu.Toggle
	public readonly Cloud: Menu.Toggle

	public readonly Thinker: Menu.Toggle
	public readonly Tormenter: Menu.Toggle
	public readonly WispSpirit: Menu.Toggle
	public readonly PlagueWard: Menu.Toggle
	public readonly PsionicTrap: Menu.Toggle
	public readonly SerpentWard: Menu.Toggle
	public readonly MinefieldSign: Menu.Toggle

	public readonly EyesInTheForest: Menu.Toggle
	public readonly HiddenUnitsState: Menu.Toggle
	public readonly AllAnyUnitsState: Menu.Toggle

	public readonly IceSpire: Menu.Toggle
	public readonly Tombstone: Menu.Toggle
	public readonly SkeletonArmy: Menu.Toggle
	public readonly IngisFatuus: Menu.Toggle
	public readonly AncestralSpirit: Menu.Toggle

	constructor(node: Menu.Node) {
		node.SortNodes = false
		this.AllAnyUnitsState = node.AddToggle("State", true)

		this.Thinker = node.AddToggle(
			"Thinker",
			false,
			"NOTE: Displayed on hidden units, for example:\nVoid Spirit (aether remnant)",
			-1,
			ImageData.Paths.Icons.icon_svg_other
		)

		this.HiddenUnitsState = node.AddToggle(
			"Hidden units",
			false,
			"NOTE: Displayed on hidden units, for example:\nMirana, Windranger, Hoodwink arrows, but some units may interfere",
			-1,
			ImageData.Paths.Icons.icon_svg_other
		)

		this.Bear = node.AddToggle(
			"Bear",
			true,
			undefined,
			-1,
			ImageData.GetBearTexture(),
			0
		)

		this.Cloud = node.AddToggle(
			"Nimbus",
			true,
			undefined,
			-1,
			ImageData.GetSpellTexture("zuus_cloud"),
			0
		)

		this.Tormenter = node.AddToggle(
			"Tormenter",
			true,
			undefined,
			-1,
			ImageData.GetSpellTexture("miniboss_reflect"),
			0
		)

		this.SerpentWard = node.AddToggle(
			"Serpent wards",
			true,
			undefined,
			-1,
			ImageData.GetSpellTexture("shadow_shaman_mass_serpent_ward"),
			0
		)

		this.WispSpirit = node.AddToggle(
			"Wisp spirits",
			false,
			undefined,
			-1,
			ImageData.GetSpellTexture("wisp_spirits"),
			0
		)

		this.Mine = node.AddToggle(
			"Mines",
			true,
			undefined,
			-1,
			ImageData.GetSpellTexture("techies_land_mines"),
			0
		)

		this.PsionicTrap = node.AddToggle(
			"Psionic traps",
			true,
			undefined,
			-1,
			ImageData.GetSpellTexture("templar_assassin_psionic_trap"),
			0
		)

		this.MinefieldSign = node.AddToggle(
			"Minefield sign",
			true,
			undefined,
			-1,
			ImageData.GetSpellTexture("techies_minefield_sign"),
			0
		)

		this.EyesInTheForest = node.AddToggle(
			"Eyes in the forest",
			true,
			undefined,
			-1,
			ImageData.GetSpellTexture("treant_eyes_in_the_forest"),
			0
		)

		this.PlagueWard = node.AddToggle(
			"Plague ward",
			true,
			undefined,
			-1,
			ImageData.GetSpellTexture("venomancer_plague_ward"),
			0
		)

		this.IceSpire = node.AddToggle(
			"Ice spire",
			true,
			undefined,
			-1,
			ImageData.GetSpellTexture("lich_ice_spire"),
			0
		)

		this.Tombstone = node.AddToggle(
			"Tombstone",
			true,
			undefined,
			-1,
			ImageData.GetSpellTexture("undying_tombstone"),
			0
		)

		this.SkeletonArmy = node.AddToggle(
			"Skeleton army",
			true,
			undefined,
			-1,
			ImageData.GetUnitTexture("npc_dota_hero_clinkz", true),
			0
		)

		this.IngisFatuus = node.AddToggle(
			"Will-O-Wisp",
			true,
			undefined,
			-1,
			ImageData.GetSpellTexture("keeper_of_the_light_will_o_wisp"),
			0
		)

		this.AncestralSpirit = node.AddToggle(
			"Ancestral spirit",
			true,
			undefined,
			-1,
			ImageData.GetSpellTexture("elder_titan_return_spirit"),
			0
		)
	}

	public OnChanged(callback: () => void) {
		this.Bear.OnValue(() => callback())
		this.Cloud.OnValue(() => callback())
		this.Tormenter.OnValue(() => callback())
		this.SerpentWard.OnValue(() => callback())
		this.WispSpirit.OnValue(() => callback())
		this.Mine.OnValue(() => callback())
		this.PsionicTrap.OnValue(() => callback())
		this.MinefieldSign.OnValue(() => callback())
		this.EyesInTheForest.OnValue(() => callback())
		this.PlagueWard.OnValue(() => callback())
		this.IceSpire.OnValue(() => callback())
		this.Tombstone.OnValue(() => callback())
		this.SkeletonArmy.OnValue(() => callback())
		this.IngisFatuus.OnValue(() => callback())
		this.AncestralSpirit.OnValue(() => callback())
		this.AllAnyUnitsState.OnValue(() => callback())
		this.HiddenUnitsState.OnValue(() => callback())
	}

	public ResetSettings() {
		this.Mine.value = this.Mine.defaultValue
		this.Bear.value = this.Bear.defaultValue
		this.Thinker.value = this.Thinker.defaultValue
		this.Tormenter.value = this.Tormenter.defaultValue
		this.WispSpirit.value = this.WispSpirit.defaultValue
		this.PsionicTrap.value = this.PsionicTrap.defaultValue
		this.PlagueWard.value = this.PlagueWard.defaultValue
		this.Cloud.value = this.Cloud.defaultValue
		this.SerpentWard.value = this.SerpentWard.defaultValue
		this.IceSpire.value = this.IceSpire.defaultValue
		this.Tombstone.value = this.Tombstone.defaultValue
		this.SkeletonArmy.value = this.SkeletonArmy.defaultValue
		this.IngisFatuus.value = this.IngisFatuus.defaultValue
		this.AncestralSpirit.value = this.AncestralSpirit.defaultValue
		this.MinefieldSign.value = this.MinefieldSign.defaultValue
		this.EyesInTheForest.value = this.EyesInTheForest.defaultValue
		this.AllAnyUnitsState.value = this.AllAnyUnitsState.defaultValue
		this.HiddenUnitsState.value = this.HiddenUnitsState.defaultValue
	}
}
