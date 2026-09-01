const Furniture = (() => {
	setup.furniture = new Map();

	/* Keep set to false, unless during developer testing. If on true, set to false unless in use. */
	const FORCE_UPDATE = false; /* IMPORTANT: Switch to false before the next update. */
	const DEBUG_ENABLED = false;

	const print = (...args) => {
		if (DEBUG_ENABLED) console.debug(...args);
	};

	const Categories = Object.freeze({
		/* Generic categories */
		bed: "bed",
		table: "table",
		chair: "chair",
		desk: "desk",
		wardrobe: "wardrobe",
		decoration: "decoration",
		windowsill: "windowsill",
		poster: "poster",
		wallpaper: "wallpaper",
		/* Special category for Kylar event */
		owlplushie: "owlplushie",
	});

	const Locations = Object.freeze({
		bedroom: "bedroom",
		cabin: "cabin",
		cottage: "cottage",
	});

	let target = Locations.bedroom;

	function furnitureInit() {
		const mapper = setup.furniture;

		/*
		mapper.chairs.set('name', {
			name: "stools",					Name in lowercase.
			nameCap: "Wooden stools",		Capitalised name.
			category: ["chair"],			Used in the shop interface.
			type: ["chair", "expensive"],	Traits, can be multiple, shouldn't be shown because I'm too lazy to make a description /j
			cost: 160,						Cost, 100 is one pound.
			description: "A set of stools on which to sit on.",			Description for the shop interface to show.
			iconFile: "stool",		    	Used in image widgets; <<furnitureicon "stool">>
		});

		Egg armchairs are here to stay.
		Egg.
		*/

		/* ------------- CHAIRS ------------- */
		mapper.set("chair", {
			name: "의자",
			nameCap: "의자",
			article: "",
			nameSolo: "의자",
			category: ["chair"],
			type: ["starter"],
			cost: 0,
			description: "낡고 물려받은 의자다. 흔들리고 불편하다.",
			iconFile: "basicChair",
			iconFile2: "basic-chair-desk",
			tier: 0,
		});
		mapper.set("stool", {
			name: "스툴",
			nameCap: "나무 스툴",
			article: "",
			nameSolo: "나무 스툴",
			category: ["chair"],
			type: [],
			cost: 460,
			description: "스툴 세트다. 불편하지만 없는 것보다는 낫다.",
			iconFile: "stool",
			iconFile2: "stool-desk",
			tier: 0,
		});
		mapper.set("woodenchair", {
			name: "나무 의자",
			nameCap: "나무 의자",
			article: "",
			nameSolo: "나무 의자",
			category: ["chair"],
			type: [],
			cost: 1280,
			description: "평범한 나무 의자 세트다. 그다지 편하지는 않다.",
			iconFile: "chair",
			iconFile2: "chair-desk",
			tier: 0,
		});
		mapper.set("swivelchair", {
			name: "회전 의자",
			nameCap: "회전 의자",
			article: "",
			nameSolo: "회전 의자",
			category: ["chair"],
			type: ["comfy"],
			cost: 1480,
			description: "회전 의자 한 쌍이다. 편안하고 인체공학적이다.",
			iconFile: "swivel-chair",
			iconFile2: "swivel-chair-desk",
			tier: 1,
		});
		mapper.set("shellchair", {
			name: "쉘 의자",
			nameCap: "쉘 의자",
			article: "",
			nameSolo: "쉘 의자",
			category: ["chair"],
			type: ["comfy"],
			cost: 1750,
			description: "조개 모양의 등받이가 있는 바퀴 달린 의자 세트다. 고급스럽다.",
			iconFile: "shell-chair",
			iconFile2: "shell-chair-desk",
			tier: 1,
		});
		mapper.set("armchair", {
			name: "안락의자",
			nameCap: "안락의자",
			article: "",
			nameSolo: "안락의자",
			category: ["chair"],
			type: ["comfy"],
			cost: 1970,
			description: "안락의자 세트다. 부드럽고 편안하며 비싸다.",
			iconFile: "armchair",
			iconFile2: "armchair-desk",
			tier: 1,
		});
		mapper.set("egg", {
			name: "에그 안락의자",
			nameCap: "에그 안락의자",
			article: "",
			nameSolo: "에그 안락의자",
			category: ["chair"],
			type: ["comfy"],
			cost: 2420,
			description: "이국적인 색상의 둥근 등받이가 있는 안락의자 세트다. 설치하기 까다롭다.",
			iconFile: "armchair-egg",
			iconFile2: "armchair-egg-desk",
			tier: 1,
		});

		/* ------------- TABLES ------------- */
		mapper.set("woodentable", {
			name: "나무 탁자",
			nameCap: "나무 탁자",
			category: ["table"],
			type: [],
			cost: 1100,
			description: "작업이나 모임 장소로 사용할 수 있다. 의자만 추가하면 된다.",
			iconFile: "table",
			tier: 0,
		});
		mapper.set("marbletable", {
			name: "대리석 탁자",
			nameCap: "대리석 탁자",
			category: ["table"],
			type: [],
			cost: 1430,
			description: "평범한 나무 탁자에 변화를 주었다.",
			iconFile: "marble-table",
			tier: 1,
		});

		/* ------------- DESKS ------------- */
		mapper.set("desk", {
			name: "기본 책상",
			nameCap: "기본 책상",
			nameSolo: "책상",
			category: ["desk"],
			type: ["stable", "starter"],
			cost: 0,
			description: "낡고 물려받은 책상이다. 옛날 고아들이 새겨놓은 낙서들로 훼손되어 있다.",
			iconFile: "desk",
		});
		mapper.set("deskGlass", {
			name: "유리 책상",
			nameCap: "유리 책상",
			nameSolo: "유리 책상",
			category: ["desk"],
			type: ["fragile"],
			cost: 1250,
			description: "세련되고 현대적인 책상이다. 깨지기 쉽다.",
			iconFile: "desk-glass",
		});
		mapper.set("deskMidcentury", {
			name: "미드센추리 모던 책상",
			nameCap: "미드센추리 모던 책상",
			nameSolo: "모던 책상",
			category: ["desk"],
			type: ["stable"],
			cost: 1550,
			description: "모더니스트의 매력을 지닌 단순한 책상이다. 20세기 중반에 유행했다.",
			iconFile: "desk-midcentury",
		});
		mapper.set("deskAntique", {
			name: "골동품 책상",
			nameCap: "골동품 책상",
			nameSolo: "골동품 책상",
			category: ["desk"],
			type: ["sturdy"],
			cost: 3820,
			description: "화려한 골동품 책상이다. 평생 쓸 수 있게 튼튼하게 만들어졌다.",
			iconFile: "desk-antique",
		});

		/* ------------- BEDS ------------- */
		mapper.set("bed", {
			name: "기본 침대",
			nameCap: "기본 침대",
			category: ["bed"],
			type: ["single", "starter"],
			cost: 0,
			description: "낡고 형편없는 침대다. 불편하다.",
			iconFile: "bed",
			tier: 0,
		});
		mapper.set("singlebed", {
			name: "싱글 침대",
			nameCap: "싱글 침대",
			category: ["bed"],
			type: ["single"],
			cost: 1680,
			description: "1인용 침대다.",
			iconFile: "single-bed",
			tier: 0,
		});
		mapper.set("singlebeddeluxe", {
			name: "디럭스 싱글 침대",
			nameCap: "디럭스 싱글 침대",
			category: ["bed"],
			type: ["single", "comfy"],
			cost: 2400,
			description: "인체공학적으로 디자인된 침대다. 매우 편안하다.",
			iconFile: "single-bed-deluxe",
			tier: 1,
		});
		mapper.set("doublebed", {
			name: "더블 침대",
			nameCap: "더블 침대",
			category: ["bed"],
			type: ["double"],
			cost: 3400,
			description: "단순한 침대다. 두 명이 누울 수 있다.",
			iconFile: "double-bed",
			tier: 1,
			showCheck: "notBedroom",
		});
		mapper.set("doublebeddeluxe", {
			name: "디럭스 더블 침대",
			nameCap: "디럭스 더블 침대",
			category: ["bed"],
			type: ["double", "comfy"],
			cost: 2840,
			description: "부드러운 매트리스가 있는 아름다운 침대다. 매우 편안하며 두 명이 누울 수 있다.",
			iconFile: "double-bed-deluxe",
			tier: 2,
			showCheck: "notBedroom",
		});
		mapper.set("doublebedexotic", {
			name: "이국적인 더블 침대",
			nameCap: "이국적인 더블 침대",
			category: ["bed"],
			type: ["double", "comfy"],
			cost: 4884,
			description: "현대적이고 미니멀한 스타일로 만들어진 침대다. 매우 편안하며 두 명이 누울 수 있다.",
			iconFile: "double-bed-exotic",
			tier: 2,
			showCheck: "notBedroom",
		});
		mapper.set("doublebedwicker", {
			name: "고리버들 더블 침대",
			nameCap: "고리버들 더블 침대",
			category: ["bed"],
			type: ["double", "comfy"],
			cost: 4860,
			description: "등나무 프레임의 정통 침대다. 매우 편안하며 두 명이 누울 수 있다.",
			iconFile: "double-bed-wicker",
			tier: 2,
			showCheck: "notBedroom",
		});

		/* ------------- MISC ------------- */
		mapper.set("plantpot", {
			name: "화분",
			nameCap: "화분",
			category: ["windowsill"],
			type: [],
			cost: 680,
			description: "좋은 흙이 담긴 점토 화분이다. 꽃이 미리 심어져 있다. 창턱에 놓을 수 있다.",
			handheld: "plant pot",
			iconFile: "flower",
		});
		mapper.set("bunnySucculent", {
			name: "토끼 다육이",
			nameCap: "토끼 다육이",
			category: ["windowsill"],
			type: [],
			cost: 840,
			description: "작은 다육 식물을 위한 시멘트 화분이다. 토끼 다육이라고도 불리는 '모닐라리아 옵코니카'가 심어져 있다.",
			iconFile: "bunny-succulent",
		});
		mapper.set("jar", {
			name: "병",
			nameCap: "병",
			category: ["windowsill"],
			type: [],
			cost: 1380,
			description: "원통형 병이다. 창턱에 놓을 수 있다.",
			iconFile: "jar",
		});
		mapper.set("penguinplushie", {
			name: "펭귄 인형",
			nameCap: "펭귄 인형",
			category: ["windowsill"],
			type: [],
			cost: 1030,
			description: "부드럽고 껴안기 좋다. 창턱에 놓을 수 있다.",
			handheld: "penguin plushie",
			iconFile: "penguin-plushie",
		});
		mapper.set("yespillow", {
			name: "동의 쿠션",
			nameCap: "동의 쿠션",
			category: ["windowsill"],
			type: [],
			cost: 725,
			description: "열렬히 동의한다. 창턱에 놓을 수 있다.",
			handheld: "yes pillow",
			iconFile: "yes-pillow",
		});
		mapper.set("nopillow", {
			name: "거부 쿠션",
			nameCap: "거부 쿠션",
			category: ["windowsill"],
			type: [],
			cost: 725,
			description: "싫은 건 싫은 거다. 창턱에 놓을 수 있다.",
			handheld: "no pillow",
			iconFile: "no-pillow",
		});

		/* ------------- DECORATIONS ------------- */
		mapper.set("calendar", {
			name: "달력",
			nameCap: "달력",
			category: ["decoration"],
			type: [],
			cost: 360,
			description: "이 달력에는 날짜가 적혀 있다.",
			iconFile: "calendar",
		});
		mapper.set("painting", {
			name: "그림",
			nameCap: "그림",
			category: ["decoration"],
			type: [],
			cost: 680,
			description: "사실 그림이 아니다. 일러스트레이션이다.",
			iconFile: "painting",
		});
		mapper.set("banner", {
			name: "배너",
			nameCap: "배너",
			category: ["decoration"],
			type: [],
			cost: 620,
			description: "옛날 영화의 인물이 중앙에 자리 잡고 있다.",
			iconFile: "banner",
		});
		mapper.set("bannerlewd", {
			name: "음란한 배너",
			nameCap: "음란한 배너",
			category: ["decoration"],
			type: [],
			cost: 790,
			description: "촉수가 그려진 배너다.",
			iconFile: "banner-lewd",
		});
		mapper.set("bannerfestive", {
			name: "축제 배너",
			nameCap: "축제 배너",
			category: ["decoration"],
			type: [],
			cost: 670,
			description: "시즌에 맞을 수도 안 맞을 수도 있지만, 여전히 멋져 보인다.",
			iconFile: "banner-festive",
		});
		mapper.set("bearplushie", {
			name: "거대한 곰 인형",
			nameCap: "거대한 곰 인형",
			category: ["decoration"],
			type: [],
			cost: 1380,
			description: "부드럽고 껴안기 좋으며, 영원히 충성스럽다.",
			handheld: "large teddy bear",
			iconFile: "bear-plushie",
		});
		mapper.set("candypillow", {
			name: "거대한 사탕 베개",
			nameCap: "거대한 사탕 베개",
			category: ["decoration"],
			type: [],
			cost: 1380,
			description: "부드럽고 달콤하다.",
			handheld: "candy pillow",
			iconFile: "candy-pillow",
		});
		mapper.set("owlplushie", {
			name: "부엉이 인형",
			nameCap: "부엉이 인형",
			category: ["owlplushie"],
			type: [],
			cost: 0,
			description: "커다란 눈으로 세상을 응시하고 있다.",
			iconFile: "owl-plushie",
			handheld: "kylar owl",
			showCheck: "disabled",
		});
		/* ------------- WARDROBES ------------- */
		/*	starter - 20 clothing slots for every type
			spacious - 30 clothing slots for every type
			organised - 40 clothing slots for every type */
		mapper.set("wardrobe", {
			name: "삐걱거리는 옷장",
			nameCap: "삐걱거리는 옷장",
			category: ["wardrobe"],
			type: ["starter"],
			cost: 0,
			description: "낡고 삐걱거리는 옷장이다. 옷이 많이 들어가지 않는다.",
			iconFile: "wardrobe",
			tier: 0,
			showCheck: "disabled",
		});
		mapper.set("wardrobebasic", {
			name: "옷장",
			nameCap: "옷장",
			category: ["wardrobe"],
			type: ["spacious"],
			cost: 3160,
			description: "기본적인 옷장 캐비닛이다.",
			iconFile: "wardrobe-basic",
			tier: 1,
			showCheck: "isWardrobeHigherTier",
		});
		mapper.set("armoire", {
			name: "대형 옷장",
			nameCap: "대형 옷장",
			category: ["wardrobe"],
			type: ["spacious"],
			cost: 3258,
			description: "널찍한 나무 대형 옷장이다.",
			iconFile: "armoire",
			tier: 1,
			showCheck: "isWardrobeHigherTier",
		});
		mapper.set("organiser", {
			name: "정리형 옷장",
			nameCap: "정리형 옷장",
			category: ["wardrobe"],
			type: ["organiser"],
			cost: 4296,
			description: "수납 공간이 많은 옷장이다.",
			iconFile: "wardrobe-organiser",
			tier: 2,
			showCheck: "isWardrobeHigherTier",
		});
		mapper.set("carved", {
			name: "조각된 대형 옷장",
			nameCap: "조각된 대형 옷장",
			category: ["wardrobe"],
			type: ["organiser"],
			cost: 4620,
			description: "손으로 직접 조각했으며, 여러 개의 서랍과 옷걸이 봉이 있다.",
			iconFile: "armoire-carved",
			tier: 2,
			showCheck: "isWardrobeHigherTier",
		});
		/* --------------- POSTERS --------------- */
		mapper.set("poster", {
			name: "빈 포스터",
			nameCap: "빈 포스터",
			category: ["poster"],
			type: ["poster", "starter"],
			cost: 135,
			description: "포스터가 현재 비어 있다.",
			handheld: "rolled poster",
			iconFile: "poster",
		});
		/* ------------- WALLPAPERS -------------- */
		mapper.set("wallpaper", {
			name: "빈 벽지",
			nameCap: "빈 벽지",
			category: ["wallpaper"],
			type: ["wallpaper", "starter"],
			cost: 135,
			description: "벽지가 현재 비어 있다.",
			iconFile: "wallpaper",
		});
	}

	function furnitureGet(category, onlySetup = false) {
		print("Furniture.get > getting:", category);
		if (typeof category !== "string") {
			print("Furniture.Get expected an argument of type: string.", category);
			return null;
		}
		if (onlySetup) {
			return setup.furniture.get(category);
		}
		if (!V) {
			print("Furniture.Get called before SugarCube is ready, postpone execution next time.", category);
			return null;
		}
		const area = V.furniture[target];
		if (typeof area !== "object" && area === null) {
			print("Furniture.Get called with a location that doesn't exist:", target, area);
			return null;
		}
		const current = area[category];
		if (typeof current === "object" && current !== null) {
			const defaults = setup.furniture.get(current.id);
			const composite = Object.assign({}, defaults, current);
			return composite;
		} else {
			return null;
		}
	}

	function furnitureSet(id, category, overrides) {
		print("Furniture.set > setting:", id, category, overrides);
		if (!setup.furniture.has(id)) {
			Errors.report(`Furniture.Set에 furniture 목록에 없는 id가 잘못 전달되었습니다: ${id}`);
			return false;
		}
		if (!Categories[category]) {
			Errors.report(`Furniture.Set에 잘못된 category가 전달되었습니다: ${category}`);
			return false;
		}
		const home = V.furniture[target];

		home[category] = { id };
		if (typeof overrides === "object" && overrides !== null) {
			/* Object.defineProperties(home[category], propertyMap); */
			Object.assign(home[category], overrides);
		}
		// Log the id in case mistakes in the future occur and we need to track previous ownership.
		furnitureLog(id);
		return true;
	}

	function furnitureDelete(category) {
		print("Furniture.delete > Deleting:", category);
		delete V.furniture[target][category];
		return true;
	}

	function furnitureIn(location) {
		if (Object.values(Locations).includes(location)) {
			target = location;
		} else {
			Errors.report(`전달된 location(${location})은 가구 시스템에 존재하지 않습니다.`);
		}
		return Furniture;
	}

	function furnitureUpdate(fromBackComp = false) {
		print("Furniture.update > Updating - from backcomp:", fromBackComp);
		const versions = V.objectVersion;
		let wallpaper;
		let decoration;
		let poster;
		if (versions.furniture === undefined || FORCE_UPDATE) {
			versions.furniture = 0;
		}
		switch (versions.furniture) {
			case 0:
				if (!V.settings.furnitureCostModifier) V.settings.furnitureCostModifier = 1;
				V.furniture = {
					bedroom: {
						bed: {
							id: "bed",
						},
						wardrobe: {
							id: fromBackComp ? "organiser" : "wardrobe",
						},
						desk: {
							id: "desk",
						},
					},
				};
				wardrobeSpaceUpdater();
			// eslint-disable-next-line no-fallthrough
			case 1:
				/* Set the target to the bedroom in the unlikely event it wasn't preset. */
				furnitureIn(Locations.bedroom);
				/* Search for the wallpaper object, returns null if not found. */
				wallpaper = furnitureGet(Categories.wallpaper);
				if (wallpaper != null && wallpaper.name.includes("<<")) {
					const name = Util.escape(wallpaper.name);
					furnitureSet("wallpaper", Categories.wallpaper, {
						name,
						nameCap: name.toUpperFirst(),
					});
				}
				/* Search for the poster object, returns null if not found. */
				poster = furnitureGet(Categories.poster);
				if (poster != null && poster.name.includes("<<")) {
					const name = Util.escape(poster.name);
					furnitureSet("poster", Categories.poster, {
						name,
						nameCap: name.toUpperFirst(),
					});
				}
				versions.furniture = 2;
			// eslint-disable-next-line no-fallthrough
			case 2:
				/* Start log of existing items owned. */
				updaterLogAll();
				/* Fix owl-plushie being in the decoration category, as it can then be deleted,
					or potentially lock out decorations in the current system. */
				furnitureIn(Locations.bedroom);
				decoration = furnitureGet(Categories.decoration);
				if (decoration !== null && decoration.id === "owlplushie") {
					furnitureSet("owlplushie", Categories.owlplushie, {
						name: "owl plushie",
						nameCap: "Owl plushie",
					});
					furnitureDelete(Categories.decoration);
				}
				if ([2, 4, 7].includes(V.kylar_camera)) {
					furnitureSet("owlplushie", Categories.owlplushie, {
						name: "owl plushie",
						nameCap: "Owl plushie",
					});
				}
				versions.furniture = 3;
				break;
		}
	}

	function getWardrobeTier(wardrobe) {
		const type = wardrobe.type.find(e => ["spacious", "organiser"].includes(e)) || "starter";
		const tier = { starter: 0, spacious: 1, organiser: 2 }[type];
		return tier;
	}

	function isWardrobeHigherTier(wardrobe) {
		const current = Furniture.get("wardrobe");
		if (current) {
			const targetTier = getWardrobeTier(wardrobe);
			const currentTier = getWardrobeTier(current);
			if (targetTier <= currentTier) {
				return false;
			}
		}
		return true;
	}

	function showFn(item) {
		switch (item.showCheck) {
			case "isWardrobeHigherTier":
				// console.log("isWardrobeHigherTier", isWardrobeHigherTier(item));
				return isWardrobeHigherTier(item);
			case "notBedroom":
				// console.log("notBedroom", target !== "bedroom", target);
				return target !== "bedroom";
			case "disabled":
				// console.log("disabled");
				return false;
			default:
				return null;
		}
	}

	function wardrobeSpaceUpdater() {
		const wardrobe = V.wardrobe;
		const furniture = furnitureGet("wardrobe");
		if (typeof furniture !== "object") return;
		if (!(furniture.type instanceof Array)) return;
		/* Wardrobe object appears to be good: Is an object, type is an array. */
		if (furniture.type.includes("organiser")) {
			wardrobe.space = 40;
		} else if (furniture.type.includes("spacious")) {
			wardrobe.space = 30;
		} else {
			wardrobe.space = 20;
		}
	}

	function setPrice(pounds, pence = 0) {
		return Math.floor((pounds * 100 + pence) * V.settings.furnitureCostModifier);
	}

	function updaterLogAll() {
		print("updaterLogAll > Logging all existing items.");
		for (const location in V.furniture) {
			const items = V.furniture[location];
			if (typeof items !== "object" || items === null) continue;
			for (const key in items) {
				const item = items[key];
				if (typeof item !== "object" || item === null) continue;
				furnitureLog(item.id);
			}
		}
	}

	function furnitureLog(id) {
		print("Furniture.log > Logging:", id);
		// Ensure furniture log exists.
		if (!Array.isArray(V.furnitureLog)) V.furnitureLog = [];
		if (!V.furnitureLog.includes(id)) V.furnitureLog.push(id);
	}

	/* Call the initiator function immediately. This happens when the game starts up and is loading. (Spinny wheel) */
	furnitureInit();

	return Object.freeze({
		init: furnitureInit,
		get: furnitureGet,
		set: furnitureSet,
		delete: furnitureDelete,
		in: furnitureIn,
		update: furnitureUpdate,
		wardrobeUpdate: wardrobeSpaceUpdater,
		log: furnitureLog,
		setPrice,
		showFn,
		get target() {
			return target;
		},
	});
})();
window.Furniture = Furniture;

/* Bailey Confiscation System */

const BAILEY_FURNITURE_TABS = ["bed", "table", "chair", "desk", "decoration", "windowsill"];

// Bailey only takes stuff that can be rebought "easily"
function baileyClothingEligible(item, slot) {
	if (V.specialClothes.some(sc => sc.name === item.name)) return false;
	if (item.type.includes("event")) return false;
	if (item.cursed || item.type.includes("heavy")) return false;
	const base = setup.clothes[slot][clothesIndex(slot, item)];
	if (!base || base.name !== item.name || !Array.isArray(base.shop)) return false;
	return base.shop.includes("clothing");
}

function baileyFurnitureEligible(id, category) {
	if (!BAILEY_FURNITURE_TABS.includes(category)) return false;
	const f = setup.furniture.get(id);
	if (!f) return false;
	if (f.type.includes("starter")) return false; // skips starter furniture
	if (f.showCheck === "disabled") return false;
	return true;
}

// Gather everything Bailey can take
// Returns { clothing:[{slot,index,name,value}], furniture:[{category,id,name,value}] }.
window.baileyConfiscationPool = function () {
	Furniture.in("bedroom");

	const clothing = [];
	const furniture = [];

	setup.clothes_all_slots.forEach(slot => {
		if (!Array.isArray(V.wardrobe[slot])) return;
		V.wardrobe[slot].forEach((item, index) => {
			if (!baileyClothingEligible(item, slot)) return;
			const value = getClothingCost(item, slot);
			if (value <= 0) return;
			clothing.push({ source: "clothing", slot, index, name: item.name, value });
		});
	});

	const bedroom = V.furniture.bedroom;
	Object.keys(bedroom).forEach(category => {
		const id = bedroom[category].id;
		if (!id || !baileyFurnitureEligible(id, category)) return;
		const f = Furniture.get(id, true);
		furniture.push({ source: "furniture", category, id, name: f.name, value: Furniture.setPrice(f.cost) });
	});

	return { clothing, furniture };
};

window.baileyConfiscationBundle = function (target) {
	const pool = window.baileyConfiscationPool();
	const clothing = pool.clothing.slice().sort((a, b) => b.value - a.value);
	const furniture = pool.furniture.slice();

	let baseMask = 0;
	let baseTotal = 0;
	for (let mask = 1; mask < 1 << furniture.length; mask++) {
		let sum = 0;
		for (let i = 0; i < furniture.length; i++) {
			if (mask & (1 << i)) sum += furniture[i].value;
		}
		if (sum <= target && sum > baseTotal) {
			baseTotal = sum;
			baseMask = mask;
		}
	}

	const items = [];
	let total = 0;
	for (let i = 0; i < furniture.length; i++) {
		if (baseMask & (1 << i)) {
			items.push(furniture[i]);
			total += furniture[i].value;
		}
	}
	for (const c of clothing) {
		if (total >= target) break;
		items.push(c);
		total += c.value;
	}
	if (total < target) {
		for (let i = 0; i < furniture.length; i++) {
			if (!(baseMask & (1 << i))) {
				items.push(furniture[i]);
				total += furniture[i].value;
			}
		}
	}

	return { items, total };
};

// Take the chosen items out of the bedroom and into Bailey's hold
// Dye and colours are maintained
window.baileyConfiscationApply = function (bundle) {
	if (!bundle.items.length) return;
	if (V.bailey_confiscation) return;
	Furniture.in("bedroom");

	const clothing = bundle.items.filter(i => i.source === "clothing").sort((a, b) => b.index - a.index);
	const furniture = bundle.items.filter(i => i.source === "furniture");

	const held = [];
	clothing.forEach(c => held.push({ source: "clothing", slot: c.slot, item: clone(V.wardrobe[c.slot][c.index]), name: c.name, value: c.value }));
	furniture.forEach(f => held.push({ source: "furniture", category: f.category, id: f.id, name: f.name, value: f.value }));

	V.bailey_confiscation = { items: held, day: Time.days };

	clothing.forEach(c => V.wardrobe[c.slot].deleteAt(c.index));
	furniture.forEach(f => {
		Furniture.delete(f.category);
		// replaces with original starter furniture
		for (const [key, cand] of setup.furniture) {
			if (Array.isArray(cand.type) && cand.type.includes("starter") && Array.isArray(cand.category) && cand.category[0] === f.category) {
				Furniture.set(key, f.category);
				break;
			}
		}
	});
	Furniture.wardrobeUpdate();
};

window.baileyConfiscationRestore = function () {
	const hold = V.bailey_confiscation;
	if (!hold) {
		V.bailey_confiscation = null;
		return;
	}
	Furniture.in("bedroom");

	hold.items.forEach(entry => {
		if (entry.source === "clothing") {
			V.wardrobe[entry.slot].push(clone(entry.item));
		} else if (entry.source === "furniture") {
			// If player buys furniture while furniture is confiscated and Bailey returns furniture to the same slot, it keeps whatever is more expensive.
			const current = Furniture.get(entry.category);
			const seizedCost = setup.furniture.get(entry.id).cost;
			const currentCost = current ? current.cost : -1;
			if (seizedCost >= currentCost) {
				Furniture.set(entry.id, entry.category);
			}
		}
	});

	Furniture.wardrobeUpdate();
	V.bailey_confiscation = null;
};

function finalizeParts(parts) {
	parts.sort((a, b) => b.value - a.value || a.name.localeCompare(b.name));
	const total = parts.length;
	parts.forEach((p, i) => {
		p.sep = i === 0 ? "" : i === total - 1 ? (total > 2 ? ", and " : " and ") : ", ";
	});
	return parts;
}

window.baileyConfiscationParts = function () {
	const items = V.bailey_confiscation && Array.isArray(V.bailey_confiscation.items) ? V.bailey_confiscation.items : [];
	const furniture = items.filter(i => i.source === "furniture");
	const clothing = items.filter(i => i.source === "clothing").sort((a, b) => b.value - a.value);
	const shown = clothing.slice(0, 5);
	const rest = Math.max(0, clothing.length - 5);

	const parts = [];
	furniture.forEach(f => {
		const fd = Furniture.get(f.id, true);
		parts.push({ kind: "furniture", icon: fd && fd.iconFile ? fd.iconFile : "", name: f.name, value: f.value });
	});
	shown.forEach(c => parts.push({ kind: "clothing", item: c.item, slot: c.slot, name: c.name, value: c.value }));
	if (rest > 0) parts.push({ kind: "text", name: rest + (rest === 1 ? " piece" : " pieces") + " of your clothing", value: -1 });

	return finalizeParts(parts);
};

window.baileyConfiscationGrouped = function () {
	const items = V.bailey_confiscation && Array.isArray(V.bailey_confiscation.items) ? V.bailey_confiscation.items : [];
	const parts = [];

	items
		.filter(i => i.source === "furniture")
		.forEach(f => {
			const fd = Furniture.get(f.id, true);
			parts.push({ kind: "furniture", icon: fd && fd.iconFile ? fd.iconFile : "", name: f.name, count: 1, value: f.value });
		});

	const groups = new Map();
	items
		.filter(i => i.source === "clothing")
		.forEach(c => {
			const g = groups.get(c.name);
			if (g) g.count++;
			else groups.set(c.name, { kind: "clothing", item: c.item, slot: c.slot, name: c.name, count: 1, value: c.value });
		});
	groups.forEach(g => parts.push(g));

	return finalizeParts(parts);
};

window.baileyConfiscationTick = function () {
	const hold = V.bailey_confiscation;
	if (hold && Time.days >= hold.day + 8) {
		V.bailey_confiscation = null;
		V.bailey_confiscation_lost = 1;
	}
};
