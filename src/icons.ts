import { Paths } from "./paths"

const icon = (name: string) => `${Paths.Icons}/${name}.svg`

/** Outline glyphs of the menu: the SDK set where it has one, our own next to it otherwise. */
export const TrueSightIcons = {
	/** The page itself: an eye inside the corners of a scan. */
	TrueSight: icon("truesight"),
	State: Menu.Icons.Power,
	/** A row that stands for every kind the card lists below it. */
	All: Menu.Icons.SquareStack,

	Ward: icon("ward"),
	Roshan: icon("roshan"),
	Courier: icon("courier"),

	Heroes: icon("heroes"),
	Clone: icon("clone"),
	Illusion: icon("illusion"),
	Self: icon("self"),

	Creeps: icon("creeps"),
	Lane: icon("lane"),
	Neutral: icon("neutral"),
	Boar: icon("boar"),
	Hawk: icon("hawk"),
	Panda: icon("pandas"),
	Eidolon: icon("eidolon"),
	Spider: icon("spider"),
	Zombie: icon("zombie"),
	Familiar: icon("familiars"),
	ForgedSpirit: icon("forged-spirit"),

	Buildings: icon("tower"),
	Fort: icon("fort"),
	Tower: icon("tower"),
	Filler: icon("filler"),
	Watcher: icon("watcher"),
	Outpost: icon("outpost"),
	Barrack: icon("barracks"),
	UnderlordPortal: icon("portal"),

	Units: icon("units"),
	Hidden: Menu.Icons.EyeOff,
	Bear: icon("bear"),
	RoshanBanner: icon("banner"),
	Nimbus: icon("nimbus"),
	Tormentor: icon("tormentor"),
	SerpentWard: icon("serpent-ward"),
	WispSpirit: icon("wisp"),
	Mine: Menu.Icons.Bomb,
	PsionicTrap: icon("psionic-trap"),
	MinefieldSign: icon("minefield-sign"),
	EyesInTheForest: icon("eyes-forest"),
	PlagueWard: icon("plague-ward"),
	IceSpire: icon("ice-spire"),
	Tombstone: icon("tombstone"),
	SkeletonArmy: icon("skeleton"),
	WillOWisp: icon("will-o-wisp"),
	AncestralSpirit: icon("ancestral-spirit")
} as const
