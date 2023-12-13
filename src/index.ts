import "./translations"

import {
	Announcer,
	Building,
	Color,
	Courier,
	Creep,
	Entity,
	EventsSDK,
	Fort,
	Fountain,
	GameState,
	MangoTree,
	Miniboss,
	npc_dota_base_blocker,
	npc_dota_beastmaster_boar,
	npc_dota_beastmaster_hawk,
	npc_dota_brewmaster_earth,
	npc_dota_brewmaster_fire,
	npc_dota_brewmaster_storm,
	npc_dota_brewmaster_void,
	npc_dota_broodmother_spiderling,
	npc_dota_clinkz_skeleton_archer,
	npc_dota_elder_titan_ancestral_spirit,
	npc_dota_ignis_fatuus,
	npc_dota_invoker_forged_spirit,
	npc_dota_lich_ice_spire,
	npc_dota_shadowshaman_serpentward,
	npc_dota_techies_minefield_sign,
	npc_dota_templar_assassin_psionic_trap,
	npc_dota_treant_eyes,
	npc_dota_unit_undying_tombstone,
	npc_dota_venomancer_plagueward,
	npc_dota_visage_familiar,
	npc_dota_wisp_spirit,
	npc_dota_zeus_cloud,
	ParticleAttachment,
	ParticlesSDK,
	SpiritBear,
	Team,
	TechiesMines,
	Thinker,
	TwinGate,
	UnderlordPortal,
	Unit,
	Vector3,
	WardObserver,
	WardTrueSight
} from "github.com/octarine-public/wrapper/index"

import { MenuManager } from "./menu/index"

const bootstrap = new (class CVisibleByEnemy {
	private lastCameraDist = 0
	private readonly units: Unit[] = []

	private readonly menu = new MenuManager()
	private readonly pSDK = new ParticlesSDK()
	private readonly offsetCameraCache = new Set<Unit>()
	private readonly particlePathName = "particles/vbe/ward_true_sight_true_sight.vpcf_c"

	constructor() {
		this.menu.OnChanged(() => this.OnChangedMenu())
	}

	protected get IsCourierState() {
		return this.menu.Courier.value
	}

	protected get IsWardState() {
		return this.menu.Ward.value
	}

	private get state() {
		return this.menu.State.value
	}

	public PostDataUpdate() {
		if (!this.state || !GameState.IsConnected || !this.offsetCameraCache.size) {
			return
		}
		const currCamear = Camera.Distance
		if (this.lastCameraDist === currCamear) {
			return
		}
		this.offsetCameraCache.forEach(unit => {
			const key = this.KeyName(unit)
			const offset = this.GetHeightOffset(unit)
			const vecOffset = new Vector3(offset, 0, 0)
			this.pSDK.SetConstrolPointByKey(key, 3, vecOffset)
		})
		this.lastCameraDist = currCamear
	}

	public EntityCreated(entity: Entity) {
		if (entity instanceof Unit) {
			this.units.push(entity)
			this.UpdateUnits(entity)
		}
	}

	public EntityDestroyed(entity: Entity) {
		if (entity instanceof Unit) {
			this.UpdateUnits(entity)
			this.units.remove(entity)
		}
	}

	public LifeStateChanged(entity: Entity) {
		if (entity instanceof Unit) {
			this.UpdateUnits(entity)
		}
	}

	public EntityTeamChanged(entity: Entity) {
		if (entity instanceof Unit) {
			this.UpdateUnits(entity)
		}
	}

	public TrueSightedChanged(unit: Unit) {
		this.UpdateUnits(unit)
	}

	public UnitPropertyChanged(unit: Unit) {
		this.UpdateUnits(unit)
	}

	public GameChanged() {
		this.menu.GameChanged()
		this.lastCameraDist = 0
		this.offsetCameraCache.clear()
	}

	protected IsUnitShouldBeHighlighted(unit: Unit) {
		if (
			!this.state ||
			!unit.IsAlive ||
			(unit instanceof npc_dota_wisp_spirit && unit.IsNeutral) ||
			(unit instanceof SpiritBear && !unit.ShouldRespawn)
		) {
			return false
		}
		if (unit.IsEnemy() && unit.Team !== Team.Neutral) {
			return false
		}
		if (unit.IsHero) {
			return this.IsHero(unit)
		}
		if (unit.IsCreep) {
			return this.IsCreep(unit)
		}
		if (unit.IsBuilding) {
			return this.IsBuilding(unit)
		}
		if (unit instanceof Courier) {
			return this.IsCourierState
		}
		if (unit instanceof WardObserver || unit instanceof WardTrueSight) {
			return this.IsWardState
		}
		return this.IsOtherUnit(unit)
	}

	protected UpdateUnits(unit: Unit) {
		if (!unit.ClassName.length || unit instanceof Fountain) {
			return
		}
		if (unit instanceof Announcer || unit instanceof npc_dota_base_blocker) {
			return
		}

		const key = this.KeyName(unit)
		const isVisibleForEnemies = unit.IsTrueSightedForEnemies
		const shouldBeHighlighted = this.IsUnitShouldBeHighlighted(unit)
		const isVisibleValid = isVisibleForEnemies && shouldBeHighlighted

		if (!isVisibleValid) {
			this.pSDK.DestroyByKey(key)
			this.offsetCameraCache.delete(unit)
			return
		}
		this.pSDK.AddOrUpdate(
			key,
			this.particlePathName,
			ParticleAttachment.PATTACH_ABSORIGIN_FOLLOW,
			unit,
			[1, Color.White],
			[2, Color.White.a],
			[3, new Vector3(this.GetHeightOffset(unit), 0, 0)]
		)
		this.offsetCameraCache.add(unit)
	}

	protected KeyName(unit: Unit) {
		return `truesight_${unit.Index}`
	}

	protected OnChangedMenu() {
		for (let index = this.units.length - 1; index > -1; index--) {
			this.UpdateUnits(this.units[index])
		}
	}

	protected IsCreep(unit: Unit) {
		const menu = this.menu.Creep
		if (unit.IsCreep && !menu.State.value) {
			return false
		}
		if (!(unit instanceof Creep)) {
			return false
		}
		if (menu.AllState.value) {
			return true
		}
		if (unit.IsLaneCreep) {
			return menu.Types.Lane.value
		}
		if (unit.IsEidolon) {
			return menu.Types.Eidolon.value
		}
		if (unit.IsNeutral) {
			return menu.Types.Neutral.value
		}
		if (unit instanceof npc_dota_visage_familiar) {
			return menu.Types.Familiar.value
		}
		if (unit instanceof npc_dota_beastmaster_hawk) {
			return menu.Types.Hawk.value
		}
		if (unit instanceof npc_dota_beastmaster_boar) {
			return menu.Types.Boar.value
		}
		if (unit instanceof npc_dota_invoker_forged_spirit) {
			return menu.Types.ForgedSpirit.value
		}
		if (unit instanceof npc_dota_broodmother_spiderling) {
			return menu.Types.Spider.value
		}
		if (
			unit instanceof npc_dota_brewmaster_earth ||
			unit instanceof npc_dota_brewmaster_fire ||
			unit instanceof npc_dota_brewmaster_storm ||
			unit instanceof npc_dota_brewmaster_void
		) {
			return menu.Types.Panda.value
		}
		return false
	}

	protected IsHero(unit: Unit) {
		const menu = this.menu.Hero
		if (unit.IsHero && !menu.State.value) {
			return false
		}
		if (menu.OnlySelf.value) {
			return unit.IsMyHero
		}
		if (unit.IsClone) {
			return menu.Clone.value
		}
		if (unit.IsIllusion) {
			return menu.Illusion.value
		}
		return true
	}

	protected IsBuilding(unit: Unit) {
		const menu = this.menu.Building
		if (!menu.State.value && unit.IsBuilding) {
			return false
		}
		// outpost not supported
		if (unit.IsShop || unit.IsOutpost /* && menu.Outpost.value */) {
			return false
		}
		if (!(unit instanceof Building)) {
			return false
		}
		if (unit instanceof MangoTree || unit instanceof TwinGate) {
			return false
		}
		if (menu.AllState.value) {
			return true
		}
		if (unit.IsTower) {
			return menu.Tower.value
		}
		if (unit.IsBarrack) {
			return menu.Barrack.value
		}
		if (unit.IsFiller) {
			return menu.Filler.value
		}
		if (unit.IsWatcher) {
			return menu.Watcher.value
		}
		if (unit instanceof Fort) {
			return menu.Fort.value
		}
		if (unit instanceof UnderlordPortal) {
			return menu.UnderlordPortal.value
		}
		return false
	}

	protected IsOtherUnit(unit: Unit) {
		const menu = this.menu.Any
		if (!menu.AllAnyUnitsState.value || unit instanceof Courier) {
			return false
		}
		if (unit.IsHero || unit.IsCreep || unit.IsBuilding) {
			return false
		}
		if (unit instanceof Thinker) {
			return menu.Thinker.value
		}
		if (unit.IsSpiritBear) {
			return menu.Bear.value
		}
		if (unit.IsRoshan) {
			return this.menu.Roshan.value
		}
		if (unit instanceof Miniboss) {
			return menu.Tormenter.value
		}
		if (unit instanceof TechiesMines) {
			return menu.Mine.value
		}
		if (unit instanceof npc_dota_techies_minefield_sign) {
			return menu.MinefieldSign.value
		}
		if (unit instanceof npc_dota_zeus_cloud) {
			return menu.Cloud.value
		}
		if (unit instanceof npc_dota_wisp_spirit) {
			return menu.WispSpirit.value
		}
		if (unit instanceof npc_dota_shadowshaman_serpentward) {
			return menu.SerpentWard.value
		}
		if (unit instanceof npc_dota_lich_ice_spire) {
			return menu.IceSpire.value
		}
		if (unit instanceof npc_dota_clinkz_skeleton_archer) {
			return menu.SkeletonArmy.value
		}
		if (unit instanceof npc_dota_ignis_fatuus) {
			return menu.IngisFatuus.value
		}
		if (unit instanceof npc_dota_unit_undying_tombstone) {
			return menu.Tombstone.value
		}
		if (unit instanceof npc_dota_venomancer_plagueward) {
			return menu.PlagueWard.value
		}
		if (unit instanceof npc_dota_treant_eyes) {
			return menu.EyesInTheForest.value
		}
		if (unit instanceof npc_dota_templar_assassin_psionic_trap) {
			return menu.PsionicTrap.value
		}
		if (unit instanceof npc_dota_elder_titan_ancestral_spirit) {
			return menu.AncestralSpirit.value
		}
		return menu.HiddenUnitsState.value
	}

	protected GetHeightOffset(unit: Unit) {
		let offset = 0
		if (unit.IsHero || unit.IsSpiritBear) {
			offset = 2
		}
		const distCam = Camera.Distance
		switch (true) {
			case distCam >= 2000 && distCam <= 2800:
				if (unit.IsHero) {
					offset = 3
				}
				if (unit.IsCreep || unit instanceof Courier) {
					offset = 1
				}
				break
			case distCam >= 2800 && distCam <= 3000:
				if (unit.IsHero || unit.IsSpiritBear) {
					offset = 4
				}
				if (unit.IsCreep || unit instanceof Courier) {
					offset = 1
				}
				break
			case distCam > 3000:
				if (unit.IsHero || unit.IsSpiritBear) {
					offset = 5
				}
				if (unit.IsCreep || unit instanceof Courier) {
					offset = 1
				}
				break
		}
		return offset
	}
})()

EventsSDK.on("GameEnded", () => bootstrap.GameChanged())

EventsSDK.on("GameStarted", () => bootstrap.GameChanged())

EventsSDK.on("PostDataUpdate", () => bootstrap.PostDataUpdate())

EventsSDK.on("EntityCreated", entity => bootstrap.EntityCreated(entity))

EventsSDK.on("EntityDestroyed", entity => bootstrap.EntityDestroyed(entity))

EventsSDK.on("LifeStateChanged", entity => bootstrap.LifeStateChanged(entity))

EventsSDK.on("TrueSightedChanged", unit => bootstrap.TrueSightedChanged(unit))

EventsSDK.on("EntityTeamChanged", entity => bootstrap.EntityTeamChanged(entity))

EventsSDK.on("UnitPropertyChanged", unit => bootstrap.UnitPropertyChanged(unit))
