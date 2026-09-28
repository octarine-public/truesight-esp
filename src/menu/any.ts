import { TrueSightIcons } from "../icons"

export class AnyEntityMenu {
	public readonly Bear: Menu.Toggle
	public readonly Mine: Menu.Toggle
	public readonly Cloud: Menu.Toggle

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
	public readonly RoshanBanner: Menu.Toggle

	constructor(node: Menu.Node) {
		node.SortNodes = false
		this.AllAnyUnitsState = node.AddToggle("State", true)
		node.HeaderControl = this.AllAnyUnitsState

		this.HiddenUnitsState = node.AddToggle(
			"Hidden units",
			false,
			"NOTE: Displayed on hidden units, for example:\nMirana, Windranger, Hoodwink arrows, but some units may interfere",
			-1,
			TrueSightIcons.Hidden
		)

		this.Bear = node.AddToggle("Bear", true, undefined, -1, TrueSightIcons.Bear)

		this.RoshanBanner = node.AddToggle(
			"Roshan banner",
			true,
			undefined,
			-1,
			TrueSightIcons.RoshanBanner
		)

		this.Cloud = node.AddToggle("Nimbus", true, undefined, -1, TrueSightIcons.Nimbus)

		this.Tormenter = node.AddToggle(
			"Tormenter",
			true,
			undefined,
			-1,
			TrueSightIcons.Tormentor
		)

		this.SerpentWard = node.AddToggle(
			"Serpent wards",
			true,
			undefined,
			-1,
			TrueSightIcons.SerpentWard
		)

		this.WispSpirit = node.AddToggle(
			"Wisp spirits",
			false,
			undefined,
			-1,
			TrueSightIcons.WispSpirit
		)

		this.Mine = node.AddToggle("Mines", true, undefined, -1, TrueSightIcons.Mine)

		this.PsionicTrap = node.AddToggle(
			"Psionic traps",
			true,
			undefined,
			-1,
			TrueSightIcons.PsionicTrap
		)

		this.MinefieldSign = node.AddToggle(
			"Minefield sign",
			true,
			undefined,
			-1,
			TrueSightIcons.MinefieldSign
		)

		this.EyesInTheForest = node.AddToggle(
			"Eyes in the forest",
			true,
			undefined,
			-1,
			TrueSightIcons.EyesInTheForest
		)

		this.PlagueWard = node.AddToggle(
			"Plague ward",
			true,
			undefined,
			-1,
			TrueSightIcons.PlagueWard
		)

		this.IceSpire = node.AddToggle(
			"Ice spire",
			true,
			undefined,
			-1,
			TrueSightIcons.IceSpire
		)

		this.Tombstone = node.AddToggle(
			"Tombstone",
			true,
			undefined,
			-1,
			TrueSightIcons.Tombstone
		)

		this.SkeletonArmy = node.AddToggle(
			"Skeleton army",
			true,
			undefined,
			-1,
			TrueSightIcons.SkeletonArmy
		)

		this.IngisFatuus = node.AddToggle(
			"Will-O-Wisp",
			true,
			undefined,
			-1,
			TrueSightIcons.WillOWisp
		)

		this.AncestralSpirit = node.AddToggle(
			"Ancestral spirit",
			true,
			undefined,
			-1,
			TrueSightIcons.AncestralSpirit
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
		this.RoshanBanner.OnValue(() => callback())
	}

	public ResetSettings() {
		this.Mine.value = this.Mine.defaultValue
		this.Bear.value = this.Bear.defaultValue
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
		this.RoshanBanner.value = this.RoshanBanner.defaultValue
	}
}
