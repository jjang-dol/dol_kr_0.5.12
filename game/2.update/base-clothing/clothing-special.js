// @ts-check
// prettier-ignore

function initSpecialClothes() {
	/* name: should ALWAYS match the clothing item's setup "name" property.
	 * sets: which setup sets the clothes are a part of. Sets are defined in the object after this one.
	 * hint, requirements: Should ONLY be used if item is not part of its own set, and we know for sure it never will be, such as with simple items like the daisy and flower crown.
	 * Otherwise, hint and requirements should be part of the sets setup further down.
	*/
	setup.specialClothes = [
		{ name: "witch dress",					sets: ["halloween", "witch"] },
		{ name: "witch hat",					sets: ["halloween", "witch"] },
		{ name: "witch shoes",					sets: ["halloween", "witch"] },
		{ name: "gothic witch dress",			sets: ["halloween", "witch"] },
		{ name: "gothic witch hat",				sets: ["halloween", "witch"] },
		{ name: "starry witch hat",				sets: ["halloween", "witch"] },
		{ name: "broomstick", 					sets: ["halloween", "witch"] },
		{ name: "vampire jacket", 				sets: ["halloween", "vampire"] },
		{ name: "classy vampire jacket",		sets: ["halloween", "vampire"] },
		{ name: "mummy facewrap", 				sets: ["halloween", "mummy"] },
		{ name: "mummy top", 					sets: ["halloween", "mummy"] },
		{ name: "mummy skirt", 					sets: ["halloween", "mummy"] },
		{ name: "scarecrow shirt", 				sets: ["halloween", "scarecrow"] },
		{ name: "scarecrow hat", 				sets: ["halloween", "scarecrow"] },
		{ name: "skeleton mask", 				sets: ["halloween", "skeleton"] },
		{ name: "skeleton outfit", 				sets: ["halloween", "skeleton"] },
		{ name: "futuristic bodysuit", 			sets: ["halloween", "future_suit"] },
		{ name: "futuristic shades", 			sets: ["halloween", "future_suit"] },
		{ name: "mini pumpkin", 				sets: ["halloween", "pumpkin"] },
		{ name: "pumpkin dress", 				sets: ["halloween", "pumpkin"] },
		{ name: "pumpkin hat", 					sets: ["halloween", "pumpkin"] },

		{ name: "christmas dress", 				sets: ["christmas"] },
		{ name: "christmas shirt", 				sets: ["christmas"] },
		{ name: "christmas trousers",			sets: ["christmas"] },
		{ name: "jingle-bell dress", 			sets: ["christmas"] },
		{ name: "sleeveless jingle-bell dress", sets: ["christmas"] },
		{ name: "christmas hat", 				sets: ["christmas"] },
		{ name: "christmas leg warmers", 		sets: ["christmas"] },
		{ name: "christmas boots", 				sets: ["christmas"] },
		{ name: "mini snowman", 				sets: ["christmas"] },
		{ name: "reindeer slippers", 			sets: ["christmas"] },
		{ name: "candy cane", 					sets: ["christmas"] },

		{ name: "rose", 						sets: ["valentines", "flowers"], requirements: () => V.gwylanSeen?.includes("rose"), hint: "장미에게 키스를 받기" },
		{ name: "rose eyepatch", 				sets: ["valentines", "rose_wedding"] },
		{ name: "rose wedding veil", 			sets: ["valentines", "rose_wedding"] },
		{ name: "long rose wedding veil", 		sets: ["valentines", "rose_wedding"] },
		{ name: "rose wedding dress", 			sets: ["valentines", "rose_wedding"] },
		{ name: "mini rose wedding dress", 		sets: ["valentines", "rose_wedding"] },
		{ name: "rose wedding suit", 			sets: ["valentines", "rose_wedding"] },
		{ name: "frilly rose wedding suit", 	sets: ["valentines", "rose_wedding"] },
		{ name: "gift wrap top", 				sets: ["valentines", "wrap"] },
		{ name: "gift wrap bottom", 			sets: ["valentines", "wrap"] },
		{ name: "gift wrappings", 				sets: ["valentines", "wrap"] },
		{ name: "gift wrap footwrap", 			sets: ["valentines", "wrap"] },
		{ name: "gift wrap bow", 				sets: ["valentines", "wrap"] },

		{ name: "slut shirt", 					sets: ["bad_end", "underground_brothel"] },
		{ name: "cow bell", 					sets: ["bad_end", "underground_farm", "transformation"] },
		{ name: "cow bra", 						sets: ["bad_end", "underground_farm"] },
		{ name: "cow panties", 					sets: ["bad_end", "underground_farm"] },
		{ name: "cow socks", 					sets: ["bad_end", "underground_farm"] },
		{ name: "cow sleeves", 					sets: ["bad_end", "underground_farm"] },
		{ name: "loincloth", 					sets: ["bad_end", "loincloth"] },
		{ name: "feathered hair clip", 			sets: ["bad_end", "bird", "transformation"] },
		{ name: "feather necklace", 			sets: ["bad_end", "bird", "transformation"] },
		{ name: "prison shirt", 				sets: ["bad_end", "prison"] },
		{ name: "prison trousers", 				sets: ["bad_end", "prison"] },
		{ name: "prison jumpsuit", 				sets: ["bad_end", "prison"] },
		{ name: "unbound straightjacket", 		sets: ["bad_end", "asylum"] },

		{ name: "initiate's robe", 				sets: ["temple", "temple_initiate"] },
		{ name: "monk's habit", 				sets: ["temple", "temple_monk_and_nun"] },
		{ name: "nun's habit", 					sets: ["temple", "temple_monk_and_nun"] },
		{ name: "nun's veil", 					sets: ["temple", "temple_monk_and_nun"] },
		{ name: "long nun's habit", 			sets: ["temple", "temple_monk_and_nun"] },
		{ name: "long nun's veil", 				sets: ["temple", "temple_monk_and_nun"] },
		{ name: "novice nun's habit", 			sets: ["temple", "temple_monk_and_nun"] },
		{ name: "novice nun's veil", 			sets: ["temple", "temple_monk_and_nun"] },
		{ name: "lolita nun's habit", 			sets: ["temple", "temple_monk_and_nun"] },
		{ name: "lolita nun's veil", 			sets: ["temple", "temple_monk_and_nun"] },
		{ name: "avowed nun's habit", 			sets: ["temple", "temple_monk_and_nun"] },
		{ name: "avowed nun's veil", 			sets: ["temple", "temple_monk_and_nun"] },
		{ name: "evangelist's uniform", 		sets: ["temple", "temple_evangelist"] },
		{ name: "confessor's robe", 			sets: ["temple", "temple_confessor"] },
		{ name: "confessor's habit", 			sets: ["temple", "temple_confessor"] },
		{ name: "exorcist's cassock", 			sets: ["temple", "temple_exorcist"] },
		{ name: "exorcist's habit", 			sets: ["temple", "temple_exorcist"] },
		{ name: "monk's sparring habit", 		sets: ["temple", "temple_sparring"] },
		{ name: "nun's sparring habit", 		sets: ["temple", "temple_sparring"] },

		{ name: "sexy nun's habit", 			sets: ["temple", "temple_sexy"] },
		{ name: "sexy nun's gloves", 			sets: ["temple", "temple_sexy"] },
		{ name: "sexy nun's stockings", 		sets: ["temple", "temple_sexy"] },
		{ name: "sexy nun's veil", 				sets: ["temple", "temple_sexy"] },
		{ name: "sexy nun's ornate veil", 		sets: ["temple", "temple_sexy"] },
		{ name: "sexy priest's vestments", 		sets: ["temple", "temple_sexy"] },

		{ name: "holy stole", 					sets: ["temple", "holy_stole"] },
		{ name: "long holy stole", 				sets: ["temple", "holy_stole"] },

		{ name: "holy pendant", 				sets: ["temple", "pendant", "holy_pendant"] },
		{ name: "stone pendant", 				sets: ["temple", "pendant", "stone_pendant"] },
		{ name: "dark pendant", 				sets: ["pendant", "dark_pendant"] },

		{ name: "rag top", 						sets: ["historic", "museum_rags"] },
		{ name: "rag skirt", 					sets: ["historic", "museum_rags"] },
		{ name: "vintage pantsuit", 			sets: ["historic", "vintage"] },
		{ name: "vintage skirtsuit", 			sets: ["historic", "vintage"] },
		{ name: "bowler hat", 					sets: ["historic", "vintage"] },
		{ name: "military beret", 				sets: ["historic", "vintage"] },
		{ name: "chain tunic", 					sets: ["historic", "chain_tunic"] },
		{ name: "chain leggings", 				sets: ["historic", "chain_tunic"] },
		{ name: "chain boots", 					sets: ["historic", "chain_tunic"] },

		{ name: "serafuku", 					sets: ["foreign_school"] },
		{ name: "classic serafuku", 			sets: ["foreign_school"] },
		{ name: "gakuran", 						sets: ["foreign_school"] },
		{ name: "sailor ribbon", 				sets: ["foreign_school"] },
		{ name: "serafuku dress", 				sets: ["foreign_school"] },

		{ name: "belly dancer's top", 			sets: ["brothel"] },
		{ name: "belly dancer's bottoms", 		sets: ["brothel"] },
		{ name: "belly dancer's veil", 			sets: ["brothel"] },
		{ name: "belly dancer's shoes", 		sets: ["brothel"] },
		{ name: "harem vest", 					sets: ["brothel"] },
		{ name: "harem pants", 					sets: ["brothel"] },

		{ name: "chef hat", 					sets: ["chef"] },
		{ name: "chef jacket", 					sets: ["chef"] },

		{ name: "esoteric spectacles", 			sets: ["hookah"] },

		{ name: "islander mask", 				sets: ["mask", "islander"] },
		{ name: "fox mask", 					sets: ["mask", "fox", "fox_mask"] },

		{ name: "fedora", 						sets: ["fedora"] },

		{ name: "catsuit", 						sets: ["catsuit"] },

		{ name: "daisy", 						sets: ["flowers"], requirements: () => V.plants_known?.includes("daisy"), hint: "데이지 씨앗 찾기" },
		{ name: "flower crown", 				sets: ["flowers"], requirements: () => V.robinSeen?.includes("flowerCrown") || V.specialClothesEvents?.includes("flowerCrownGH"), hint: "소중한 사람과 함께 만들기" },

		{ name: "janet dress",					sets: ["janet"] },

		{ name: "swan lake dress",				sets: ["dance_studio"] },
		{ name: "fancy swan lake dress",		sets: ["dance_studio"] },
		{ name: "swan feathers",				sets: ["dance_studio"] },
		{ name: "swan tiara",					sets: ["dance_studio"] },
		{ name: "ballet shoes",					sets: ["dance_studio"] },

		{ name: "spirit mask", 					sets: ["shrine", "fox", "transformation"] },
		{ name: "shrine maiden robes", 			sets: ["shrine", "fox"] },

		{ name: "jasper pendant", 				sets: ["jasper", "fox"] },

		{ name: "butterfly dress",				sets: ["butterfly"] },
		{ name: "butterfly bow",				sets: ["butterfly"] },
		{ name: "butterfly eyepatch",			sets: ["butterfly"] },

		{ name: "succubus top",					sets: ["succubus"] },
		{ name: "succubus lower back wings",	sets: ["succubus", "transformation"] },
		{ name: "succubus gloves",				sets: ["succubus"] },
		{ name: "succubus heels",				sets: ["succubus"] },

		{ name: "sage witch hat", 				sets: ["sage_witch_hat"] },
		{ name: "familiar collar",				sets: ["familiar_collar"] },
	];

	/* must match set names above.
	 * text: display name for links. Be sure to change as appropriate if adding new items to an existing set.
	 * requirements: function that resolves to true or false based on provided parameter. Optional.
	 * hint: hint string that displays in shops.
	 * shop: for future support for unlockable clothes in other shops.
	 * subsetOf: Designates a set that can't be talked about unless all of its subsets are talked about first. Example: the "halloween" set can't be talked about until all individual halloween costumes are talked about first. Also for controlling hint text in the feat boost menu. Optional.
	 * feat: whether the set can be unlocked with the special clothes feat booster.
	 * icon: icon to use. For clothing items that need a coloured icon, use "clothes" and provide item's slot and setup index, as well as desired colour. Yes I know it's annoying that the parameter uses the spelling 'color' but it's standard to have code use the american spelling.
	 */

	/* To prevent a set from contributing to Gwylan love and remove talk option, simply remove "forest" from shops array.
	 * It can still be available in the forest shop despite this. Will be automatically removed from Gwylan love calculation even if already talked about in a save.
	 */
	setup.specialClothesSets = {
		// Holiday sets
		// Halloween
		halloween: {
			text: "할로윈 의상 컬렉션",
			requirements: () => Time.hasDatePassed(10, 21),
			hint: "<<= getFormattedDate(new DateTime(Time.year, 10, 21))>>에 입고",
			shop: ["forest"],
			feat: false,
			icon: "food/halloween.png",
		},
		witch: {
			text: "마녀 의상",
			requirements: () => V.tentacletrait >= 1,
			hint: "촉수에 익숙해지기",
			shop: ["forest"],
			subsetOf: ["halloween"],
			feat: true,
			featCost: 2,
			icon: "clothes",
			iconSlot: "head",
			iconIndex: 7,
			iconColor: "black",
			iconAccColor: "green",
		},
		vampire: {
			text: "뱀파이어 의상",
			requirements: () => V.syndromekylar >= 1,
			hint: "질투심 많은 연인의 갈망에 굴복하기",
			shop: ["forest"],
			subsetOf: ["halloween"],
			feat: true,
			featCost: 2,
			icon: "clothes",
			iconSlot: "upper",
			iconIndex: 106,
			iconColor: "red",
		},
		mummy: {
			text: "미라 의상",
			requirements: () => V.specialClothesEvents?.includes("cocoon"),
			hint: "거미줄에 휘감기",
			shop: ["forest"],
			subsetOf: ["halloween"],
			feat: true,
			featCost: 2,
			icon: "clothes/mummy_facewrap.png",
		},
		scarecrow: {
			text: "허수아비 의상",
			requirements: () => V.specialClothesEvents?.includes("farm_defended"),
			hint: "수많은 밭을 공격으로부터 완벽하게 지켜내기",
			shop: ["forest"],
			subsetOf: ["halloween"],
			feat: true,
			featCost: 2,
			icon: "clothes/scarecrow_hat.png",
		},
		skeleton: {
			text: "해골 의상",
			requirements: () => V.crypt_intro === 1,
			hint: "지하 묘지 발견하기",
			shop: ["forest"],
			subsetOf: ["halloween"],
			feat: true,
			featCost: 2,
			icon: "clothes/skeleton_mask.png",
		},
		future_suit: {
			text: "미래형 바디수트 의상",
			requirements: () => V.tenyclusPlayCount >= 7,
			hint: "이상한 아케이드 게임에 지나치게 빠져들기",
			shop: ["forest"],
			subsetOf: ["halloween"],
			feat: true,
			featCost: 2,
			icon: "clothes",
			iconSlot: "upper",
			iconIndex: 108,
			iconColor: "black",
			iconAccColor: "red",
		},
		pumpkin: {
			text: "호박 의상",
			requirements: () => Object.values(V.foodstuff).filter(food => food.knows_recipe).length >= 15,
			hint: "요리법 15개 익히기",
			shop: ["forest"],
			subsetOf: ["halloween"],
			feat: true,
			featCost: 2,
			icon: "clothes/pumpkin_dress.png",
		},
		// Christmas
		christmas: {
			text: "크리스마스 의상",
			requirements: () => Time.hasDatePassed(12, 18) || V.specialClothesEvents?.includes("skulduggery_gift"),
			hint: "<<= getFormattedDate(new DateTime(Time.year, 12, 18))>>에 입고 되거나, 도움이 필요한 가족에게 후한 선물을 남기기",
			shop: ["forest"],
			feat: true,
			featCost: 5,
			icon: "clothes/christmas_hat.png",
		},
		// Valentines
		valentines: {
			text: "발렌타인데이 의상 컬렉션",
			requirements: () => Time.hasDatePassed(2, 6),
			hint: "<<= getFormattedDate(new DateTime(Time.year, 2, 7))>>에 입고",
			shop: ["forest"],
			feat: false,
			icon: "gift_vday.png",
		},
		rose_wedding: {
			text: "장미 웨딩 의상",
			requirements: () => V.kylarSeen?.includes("basement"),
			hint: "강제 결혼식에서 탈출하기",
			shop: ["forest"],
			subsetOf: ["valentines"],
			feat: true,
			featCost: 5,
			icon: "clothes",
			iconSlot: "head",
			iconIndex: 79,
			iconColor: "white",
			iconAccColor: "red",
		},
		wrap: {
			text: "선물 포장",
			requirements: () => V.robinSeen?.includes("unwrap") || V.gwylanSeen?.includes("steal_wrap"),
			hint: "옷을 훔친 대가로 특별한 벌 받기",
			shop: ["forest"],
			subsetOf: ["valentines"],
			feat: true,
			featCost: 3,
			icon: "clothes",
			iconSlot: "upper",
			iconIndex: 185,
			iconColor: "pink",
		},

		// Bad end or Stockholm syndrome sets
		bad_end: {
			text: "불미스러운 장소에서 온 의상 컬렉션",
			shop: ["forest"],
			feat: false,
			icon: "cage.png",
		},
		underground_brothel: {
			text: "걸레 셔츠",
			requirements: () => V.undergroundbrothelescaped,
			hint: "지하 창관의 노예 생활에서 살아남기",
			shop: ["forest", "adult"],
			subsetOf: ["bad_end", "fox"],
			feat: true,
			featCost: 5,
			icon: "clothes",
			iconSlot: "upper",
			iconIndex: 27,
			iconColor: "pink",
			iconAccColor: "black",
		},
		underground_farm: {
			text: "젖소 무늬 세트",
			requirements: () => V.livestock?.intro !== undefined,
			hint: "가축이 되기",
			shop: ["forest", "adult"],
			subsetOf: ["bad_end", "transformation"],
			feat: true,
			featCost: 15,
			icon: "tf-cow.png",
		},
		loincloth: {
			text: "샅바",
			requirements: () => V.syndromeeden === 1 || V.syndromewolves === 1,
			hint: "외로운 사냥꾼과 친해지거나 늑대 무리에 합류하기",
			shop: ["forest"],
			subsetOf: ["bad_end", "fox"],
			feat: true,
			featCost: 2,
			icon: "clothes",
			iconSlot: "under_lower",
			iconIndex: 21,
			iconColor: "white",
		},
		bird: {
			text: "깃털 머리핀",
			requirements: () => V.syndromebird === 1,
			hint: "새와 사랑에 빠지기",
			shop: ["forest"],
			subsetOf: ["bad_end", "transformation"],
			feat: true,
			featCost: 15,
			icon: "clothes",
			iconSlot: "head",
			iconIndex: 31,
			iconColor: "tan",
		},
		prison: {
			text: "죄수복",
			requirements: () => V.prison_intro === 1,
			hint: "교도소에 수감되기",
			shop: ["forest"],
			subsetOf: ["bad_end"],
			feat: true,
			featCost: 5,
			icon: "clothes/prison_jumpsuit.png",
		},
		asylum: {
			text: "구속복",
			requirements: () => V.asylumescaped === 1,
			hint: "정신병원에서 탈출하기",
			shop: ["forest"],
			subsetOf: ["bad_end"],
			feat: true,
			featCost: 5,
			icon: "clothes/straightjacket.png",
		},

		// Temple
		temple: {
			text: "신전 의복 컬렉션",
			shop: ["forest", "temple"],
			feat: false,
			icon: "wolf.png",
		},
		temple_initiate: {
			text: "수련자 로브",
			requirements: () => ["initiate","monk","priest"].includes(V.temple_rank),
			hint: "순결함을 증명하기",
			shop: ["forest", "temple"],
			subsetOf: ["temple"],
			feat: true,
			featCost: 5,
			icon: "clothes/initiate_robes.png",
		},
		temple_monk_and_nun: {
			text: "수도사와 수녀 수단",
			requirements: () => ["monk","priest"].includes(V.temple_rank),
			hint: "신전에서 지위를 올리기",
			shop: ["forest", "temple"],
			subsetOf: ["temple"],
			feat: true,
			featCost: 5,
			icon: "clothes/monks_habit.png",
		},
		temple_evangelist: {
			text: "전도사 제복",
			requirements: () => V.specialClothesEvents?.includes("temple_solicitation"),
			hint: "신전 기부 권유에 성공하기",
			shop: ["forest", "temple"],
			subsetOf: ["temple"],
			feat: true,
			featCost: 5,
			icon: "clothes/evangelist_uniform.png",
		},
		temple_confessor: {
			text: "고해사제 제복",
			requirements: () => V.temple_confessor_intro,
			hint: "신전의 가장 고귀한 존재를 소개받기",
			shop: ["forest", "temple"],
			subsetOf: ["temple"],
			feat: true,
			featCost: 5,
			icon: "clothes/confessor_robes.png",
		},
		temple_exorcist: {
			text: "구마사제 제복",
			requirements: () => V.jordan_ritual_dance === 4,
			hint: "이단 의식을 방해하기",
			shop: ["forest", "temple"],
			subsetOf: ["temple"],
			feat: true,
			featCost: 5,
			icon: "clothes/exorcist_cassock.png",
		},
		temple_sparring: {
			text: "수련용 제복",
			requirements: () => V.prof?.whip >= 600 || V.prof?.baton >= 600,
			hint: "신전의 성스러운 도구 중 하나에 숙련되기",
			shop: ["forest", "temple"],
			subsetOf: ["temple"],
			feat: true,
			featCost: 10,
			icon: "clothes/monk's_sparring_habit.png",
		},
		temple_sexy: {
			text: "음란한 종교 의복",
			requirements: () => V.world_corruption_reduced >= 30,
			hint: "충분한 타락을 정화하기",
			shop: ["forest", "adult"],
			subsetOf: ["temple"],
			feat: true,
			featCost: 10,
			icon: "clothes/sexy_nuns_habit.png",
		},
		holy_stole: {
			text: "성스러운 스톨",
			requirements: () => V.grace >= 100,
			hint: "충분한 헌신 필요",
			shop: ["forest", "temple"],
			subsetOf: ["temple"],
			feat: true,
			featCost: 5,
			icon: "clothes",
			iconSlot: "neck",
			iconIndex: 19,
			iconColor: "purple",
		},

		// Pendant trio
		pendant: {
			text: "세 개의 펜던트",
			shop: ["forest"],
			feat: false,
			icon: "altar.gif",
		},
		holy_pendant: {
			text: "성스러운 펜던트",
			requirements: () => V.soup_kitchen_known === 1,
			hint: "무료 급식소 발견하기",
			shop: ["forest", "temple"],
			subsetOf: ["pendant", "temple"],
			feat: true,
			featCost: 15,
			icon: "clothes/holy-pendant.png",
		},
		stone_pendant: {
			text: "돌 펜던트",
			requirements: () => V.stone_pendant_found === 1,
			hint: "신전의 헐거운 돌 밑에서 찾기",
			shop: ["forest", "temple"],
			subsetOf: ["pendant", "temple"],
			feat: true,
			featCost: 15,
			icon: "clothes/stone_pendant.png",
		},
		dark_pendant: {
			text: "어두운 펜던트",
			requirements: () => V.loft_known === 1,
			hint: "베일리의 두려움 발견하기",
			shop: ["forest", "temple"],
			subsetOf: ["pendant"],
			feat: true,
			featCost: 15,
			icon: "clothes/dark_pendant.png",
		},

		// Museum and paintings
		historic: {
			text: "역사적인 의상 컬렉션",
			shop: ["forest"],
			feat: false,
			icon: "museum.png",
		},
		museum_rags: {
			text: "박물관의 누더기",
			// Second case is for legacy compatibility, because the museum rags were previously feat-locked for some reason
			requirements: () => V.museum_horse_success && V.museum_stool_success || V.feats?.currentSave["Pain Rider"] !== undefined && V.feats?.currentSave.Submerged !== undefined,
			hint: "역사적 고문 기구 시연을 끝까지 마치기",
			shop: ["forest"],
			subsetOf: ["historic"],
			feat: true,
			featCost: 3,
			icon: "clothes/rag_top.png",
		},
		vintage: {
			text: "빈티지 수트",
			requirements: () => V.museumAntiques?.paintings?.paintingward === "museum",
			hint: "늙은 화석이 기억해내도록 돕기",
			shop: ["forest"],
			subsetOf: ["historic"],
			feat: true,
			featCost: 5,
			icon: "clothes",
			iconSlot: "head",
			iconIndex: 69,
			iconColor: "forest-green",
			iconAccColor: "tan",
		},
		chain_tunic: {
			text: "사슬 튜닉",
			requirements: () => V.hcEndings?.includes("S"),
			hint: "마녀와 간수에 얽힌 여러 이야기를 배우기",
			shop: ["forest"],
			subsetOf: ["historic"],
			feat: true,
			featCost: 50,
			icon: "clothes",
			iconSlot: "upper",
			iconIndex: 170,
			iconColor: "black",
			iconAccColor: "white",
		},

		// Special event sets
		foreign_school: {
			text: "외국 교복",
			requirements: () => V.headdrive === 1,
			hint: "교장의 비밀 발견하기",
			shop: ["forest", "school"],
			feat: true,
			featCost: 5,
			icon: "clothes",
			iconSlot: "upper",
			iconIndex: 125,
			iconColor: "blue",
			iconAccColor: "white",
		},
		brothel: {
			text: "무용수 의상",
			requirements: () => V.brothelshowdata?.intro,
			hint: "창관 공연의 주연 제안을 받기",
			shop: ["forest", "adult"],
			feat: true,
			featCost: 5,
			icon: "clothes",
			iconSlot: "upper",
			iconIndex: 34,
			iconColor: "red",
		},
		chef: {
			text: "요리사 제복",
			requirements: () => V.chef_state >= 9,
			hint: "크림빵으로 유명해지기",
			shop: ["forest"],
			feat: true,
			featCost: 5,
			icon: "clothes",
			iconSlot: "head",
			iconIndex: 9,
			iconColor: "white",
			iconAccColor: "white",
		},
		hookah: {
			text: "난해한 안경",
			requirements: () => V.hookah_state >= 2,
			hint: "스승을 계승하기",
			shop: ["forest"],
			feat: true,
			featCost: 10,
			icon: "clothes",
			iconSlot: "face",
			iconIndex: 31,
			iconColor: "black",
		},
		islander: {
			text: "섬 주민 가면",
			requirements: () => V.islander_mask >= 100,
			hint: "이국의 목재로 만들기",
			shop: ["forest"],
			subsetOf: ["mask"],
			feat: true,
			featCost: 5,
			icon: "clothes/islander_mask.png",
		},
		fox_mask: {
			text: "여우 가면",
			requirements: () => V.auriga_artefact !== undefined,
			hint: "초대받은 사람만의 파티에 참석하기",
			shop: ["forest"],
			subsetOf: ["mask", "fox"],
			feat: true,
			featCost: 5,
			icon: "clothes/fox_mask.png",
		},
		fedora: {
			text: "페도라",
			requirements: () => V.specialClothesEvents?.includes("smuggling"),
			hint: "바텐더로 일하며 엿듣고 범죄 계획 알아내기",
			shop: ["forest"],
			feat: true,
			featCost: 2,
			icon: "clothes/fedora.png",
		},
		catsuit: {
			text: "캣수트",
			requirements: () => V.catsuit_found,
			hint: "화물을 약탈하기",
			shop: ["forest"],
			feat: true,
			featCost: 15,
			icon: "clothes",
			iconSlot: "upper",
			iconIndex: 75,
			iconColor: "black",
		},
		janet: {
			text: "자넷 드레스",
			requirements: () => V.janet_book_read === 1,
			hint: "고전 로맨스 이야기에 빠져들기",
			shop: ["forest"],
			feat: true,
			featCost: 5,
			icon: "clothes",
			iconSlot: "upper",
			iconIndex: 189,
			iconColor: "white",
			iconAccColor: "red",
		},
		dance_studio: {
			text: "백조의 호수 드레스",
			requirements: () => V.danceStudio?.jobOffered,
			hint: "특별한 춤 일거리 제안을 받기",
			shop: ["forest"],
			feat: true,
			featCost: 5,
			icon: "dance-studio.png",
		},
		sage_witch_hat: {
			text: "이상한 마녀 모자",
			requirements: () => V.gwylanSeen?.includes("ritual_sex"),
			hint: "은밀한 합일에 참여하기",
			shop: ["forest"],
			feat: false,
			icon: "clothes/witch_hat_sage.png",
		},
		familiar_collar: {
			text: "사역마 목걸이",
			requirements: () => V.gwylanSeen?.includes("familiar_collar"),
			hint: "마침내 간직할 수 있게 되기",
			shop: ["forest"],
			feat: false,
			icon: "clothes/familiar_collar.png",
		},

		// Misc
		shrine: {
			text: "정령 가면과 신사 로브",
			requirements: () => V.fox >= 6 || V.moorLuck !== undefined,
			hint: "충분히 여우다워지거나 황야의 야생 신사에서 기도하기",
			shop: ["forest"],
			subsetOf: ["fox", "transformation"],
			feat: true,
			featCost: 15,
			icon: "clothes",
			iconSlot: "head",
			iconIndex: 48,
			iconColor: "white",
			iconAccColor: "red",
		},
		jasper: {
			text: "벽옥 펜던트",
			requirements: () => V.gwylanSeen?.includesAny("request_gold_accessories", "chastity_gold"),
			hint: "즉석 과학 수업을 받기",
			shop: ["forest"],
			subsetOf: ["fox"],
			feat: true,
			featCost: 15,
			icon: "clothes",
			iconSlot: "neck",
			iconIndex: 39,
		},
		butterfly: {
			text: "나비 의상",
			requirements: () => V.backgroundTraits?.includes("plantlover"),
			hint: "넥타르에 중독되기",
			shop: ["forest"],
			feat: true,
			featCost: 5,
			icon: "clothes",
			iconSlot: "upper",
			iconIndex: 192,
			iconColor: "tangerine",
		},
		succubus: {
			text: "서큐버스 의상",
			requirements: () => V.demon >= 6 || Object.values(V.virginTaken)?.flat().length >= 15,
			hint: "충분히 불순해지거나 처녀나 동정 15명을 빼앗기",
			shop: ["forest"],
			subsetOf: ["transformation"],
			feat: true,
			featCost: 10,
			icon: "clothes",
			iconSlot: "lower",
			iconIndex: 183,
			iconColor: "purple",
		},
		// The flowers set is made up of items that all have different unlock requirements, which individually wouldn't really be worth an entire conversation option or feat entry.
		flowers: {
			text: "꽃",
			shop: ["forest"],
			feat: true,
			featCost: 3,
			icon: "clothes/flower_crown.png"
		},

		// Sets for talking only
		transformation: {
			text: "기묘한 장신구 컬렉션",
			shop: ["forest"],
			subsetOf: ["fox"],
			feat: false,
			icon: "transformation.png"
		},
		mask: {
			text: "가면",
			shop: ["forest"],
			subsetOf: ["fox"],
			feat: false,
			icon: "clothes/islander-mask.png"
		},
		fox: {
			text: "여우 테마 아이템",
			shop: ["forest"],
			feat: false,
			icon: "clothes/fox-mask.png",
		},
	};
}
window.initSpecialClothes = initSpecialClothes;

function specialClothesUpdate() {
	// Runs in start2 and when $objectVersion.specialClothes is incremented in backcomp.
	if (V.specialClothes === undefined || !Array.isArray(V.specialClothes)) {
		// Initialise from setup, or convert old system to new system
		V.specialClothes = [];
		setup.specialClothes.forEach(item => {
			if (!V.specialClothes.some(entry => entry.name === item.name)) V.specialClothes.push({ name: item.name, unlocked: 0 });
		});
	}

	// This array is used for any clothes that can't conveniently use existing story vars for unlock requirements or alt unlocks. Keeps them all in one place. Do not abuse this to be lazy. >:( -->
	if (!V.specialClothesEvents) V.specialClothesEvents = [];

	/* The following lines are for backwards compatibility with older saves.
	 * When adding new items, don't forget to also update $objectVersion.specialClothes in versionUpdate.
	 * Cleared out as of version 0.5.5.0, as the object was changed to an array and the above initialisation was forced to re-run. Use below as template for adding any new clothes.
	 * Remember to add the clothes to 'initSpecialClothes' above, with the requirements and groupings needed.
	 */

	if (!V.specialClothes.some(item => item.name === "flower crown")) V.specialClothes.push({ name: "flower crown", unlocked: 0 });
	if (!V.specialClothes.some(item => item.name === "sage witch hat")) V.specialClothes.push({ name: "sage witch hat", unlocked: 0 });
	if (!V.specialClothes.some(item => item.name === "jasper pendant")) V.specialClothes.push({ name: "jasper pendant", unlocked: 0 });
	if (!V.specialClothes.some(item => item.name === "familiar collar")) V.specialClothes.push({ name: "familiar collar", unlocked: 0 });
	if (!V.specialClothes.some(item => item.name === "butterfly eyepatch")) V.specialClothes.push({ name: "butterfly eyepatch", unlocked: 0 });
	if (!V.specialClothes.some(item => item.name === "rose eyepatch")) V.specialClothes.push({ name: "rose eyepatch", unlocked: 0 });

	// Delete any entries that do not have a matching setup object.
	V.specialClothes.forEach((clothing, index) => {
		if (!setup.specialClothes.some(item => item.name === clothing.name)) V.specialClothes.deleteAt(index);
	});
}
window.specialClothesUpdate = specialClothesUpdate;
DefineMacro("specialClothesUpdate", specialClothesUpdate);

function specialClothesRefresh() {
	/* Runs on version update, when entering the forest shop, and when new clothes are unlocked in-passage */
	/* values:
	 * 0: locked
	 * 1: unlocked with cheats but true unlock requirements not met
	 * 2: unlocked with feat booster but true unlock requirements not met (this value and up contributes to Gwylan love)
	 * 3: unlocked by meeting requirement or event trigger (can then be talked about with Gwylan, which provides more love)
	 * see 'initSpecialClothes' above for group names and requirements
	 */

	// For any clothes with unlock value <= 2, set to 3 if requirements have been met
	V.specialClothes
		.filter(clothing => clothing.unlocked <= 2)
		.forEach(clothing => {
			const baseItem = setup.specialClothes.find(item => item.name === clothing.name);
			// Check if the individual item has its own requirement first
			if (baseItem?.requirements && baseItem.requirements()) {
				clothing.unlocked = 3;
			}
			// Then check set requirements
			baseItem?.sets.forEach(set => {
				const baseItemSet = setup.specialClothesSets[set];
				if (baseItemSet?.requirements && baseItemSet.requirements()) clothing.unlocked = 3;
			});
		});

	if (getUnlockedSpecialSets().length >= getSpecialSets().length / 2) wikifier("earnFeat", "'Curious Attire'");
	if (getUnlockedSpecialSets().length >= getSpecialSets().length) wikifier("earnFeat", "'Wicked Wardrobe'");

	statusCheck("Gwylan");
}
window.specialClothesRefresh = specialClothesRefresh;
DefineMacro("specialClothesRefresh", specialClothesRefresh);

/**
 * @param {"item" | "set"} nameSpace Whether to unlock clothes by individual name or by set
 * @param {string} name Clothing name or set name
 * @param {1 | 2 | 3} unlockLevel Unlock level, 1 = bypassed with cheats, 2 = unlocked with feat booster, 3 = unlocked with requirement or by in-passage call
 */
function specialClothesUnlock(nameSpace = "set", name, unlockLevel = 3) {
	let toUnlock = [];
	const toUnlockMessages = [];
	if (nameSpace === "set") {
		if (!getSpecialSets().includes(name)) {
			return Errors.report(`ERROR: invalid ${nameSpace} name ${name} provided for special clothing unlock function`);
		}
		// Array of all special clothes that have provided type
		toUnlock = setup.specialClothes.filter(special => special.sets.includes(name));
	} else if (nameSpace === "item") {
		if (!setup.specialClothes.some(special => special.name === name)) {
			return Errors.report(`ERROR: invalid ${nameSpace} name ${name} provided for special clothing unlock function`);
		}
		// Array of 1 with only the special clothes item with the provided name
		toUnlock.push(setup.specialClothes.find(special => special.name === name));
	} else {
		return Errors.report(`ERROR: invalid ${nameSpace} name ${name} provided for special clothing unlock function`);
	}

	// Unlock clothing items
	toUnlock.forEach(item => {
		const newItem = V.specialClothes.find(clothes => clothes.name === item?.name && clothes.unlocked < unlockLevel);
		if (newItem) {
			newItem.unlocked = unlockLevel;
			toUnlockMessages.pushUnique(newItem.name);
		}
	});

	const group = nameSpace === "set" ? name : null;
	specialClothesRefresh();
	return specialClothesUnlockText(toUnlockMessages, group);
}
window.specialClothesUnlock = specialClothesUnlock;
DefineMacroS("specialClothesUnlock", specialClothesUnlock);

/**
 * @param {string[]} toUnlock Array of items being unlocked
 * @param {string?} group Optional set name
 */
function specialClothesUnlockText(toUnlock, group) {
	let output = "";
	if (V.forest_shop_intro === 1) {
		if (toUnlock.length) {
			output += "<<shopicon 'forest'>>";
			if (group === "halloween") {
				output += '<span class="gold">숲속 상점에 </span><span class="orange">할로윈 의상</span><span class="gold">이 해금되었습니다!</span><br>';
				return output;
			}
			if (group === "christmas") {
				output += '<span class="gold">숲속 상점에 </span><span class="green">크리스마스 의상</span><span class="gold">이 해금되었습니다!</span><br>';
				return output;
			}
			if (group === "valentines") {
				output += `<span class="gold">숲속 상점에 </span><span class="pink">발렌타인 데이 의상</span><span class="gold">이 해금되었습니다!</span><br>`;
				return output;
			}
			if (toUnlock.length === 1) {
				const clothingObject = setup.clothes.all.find(item => item.name === toUnlock[0]);
				const pluralText = clothingObject.plural === 1 ? "【와과】" : "【은는】";
				if (clothingObject.name === "familiar collar") {
					output += `<span class="gold">숲속 상점에 </span><span class="forest-green">당신의 목줄</span><span class="gold">이 해금되었습니다.</span><br><br>`;
					return output;
				}
				output +=
					'<span class="gold">숲속 상점에 새로 </span>' +
					'<span class="teal">' +
					toUnlock[0].toUpperFirst() +
					'</span><span class="gold">【이가】 입고되었습니다!</span><br><br>';
				return output;
			}
			const fullSetBeingUnlocked =
				group && setup.specialClothes.filter(clothes => clothes.sets.includes(group)).every(item => toUnlock.includes(item.name));
			if (fullSetBeingUnlocked) {
				switch (group) {
					case "witch":
					case "vampire":
					case "mummy":
					case "scarecrow":
					case "skeleton":
					case "pumpkin":
						output +=
							'<span class="gold">숲속 상점에 </span><span class="orange">' + group + ' 코스튬</span><span class="gold">【이가】 해금되었습니다!</span><br><br>';
						break;
					case "future_suit":
						output +=
							'<span class="gold">숲속 상점에 </span><span class="orange">미래형 바디수트 코스튬</span><span class="gold">이 해금되었습니다!</span><br><br>';
						break;
					case "foreign_school":
						output += '<span class="gold">숲속 상점에 </span><span class="blue">외국 교복</span><span class="gold">이 해금되었습니다!</span><br><br>';
						break;
					case "brothel":
						output += `<span class="gold">숲속 상점에 </span><span class="lewd">벨리댄서 세트와 하렘 세트</span><span class="gold">가 해금되었습니다!</span><br><br>`;
						break;
					case "underground_farm":
						output +=
							'<span class="gold">숲속 상점에 </span><span class="lewd">소 무늬 의상과 소 방울</span><span class="gold">이 해금되었습니다.</span><br><br>';
						break;
					case "chain_tunic":
						output += '<span class="gold">숲속 상점에 </span><span class="grey">고대 사슬 갑옷 세트</span><span class="gold">가 해금되었습니다!</span><br><br>';
						break;
					case "vintage":
						output += '<span class="gold">숲속 상점에 </span><span class="green">빈티지 수트</span><span class="gold">가 해금되었습니다!</span><br><br>';
						break;
					case "temple_initiate":
						output += `<span class="gold">숲속 상점에 </span><span class="purple">수련자 로브</span><span class="gold">가 해금되었습니다!</span><br><br>`;
						break;
					case "temple_monk_and_nun":
						output += '<span class="gold">숲속 상점에 수사와 수녀 의상이 해금되었습니다!</span><br><br>';
						break;
					case "temple_confessor":
						output += `<span class="gold">숲속 상점에 </span><span class="black">고해 신부 로브</span><span class="gold">가 해금되었습니다...</span><br><br>`;
						break;
					case "temple_sexy":
						output +=
							'<span class="gold">숲속 상점에 </span><span class="lewd">섹시 수녀 및 신부 의상</span><span class="gold">이 해금되었습니다!</span><br><br>';
						break;
					case "butterfly":
						output += '<span class="gold">숲속 상점에 </span><span class="teal">나비 코스튬</span><span class="gold">이 해금되었습니다!</span><br><br>';
						break;
					case "succubus":
						output += '<span class="gold">숲속 상점에 </span><span class="lewd">서큐버스 코스튬</span><span class="gold">이 해금되었습니다!</span><br><br>';
						break;
					case "bird":
						output += '<span class="gold">숲속 상점에 </span><span class="brown">깃털 장신구</span><span class="gold">가 해금되었습니다!</span><br><br>';
						break;
					default:
						output +=
							'<span class="gold">숲 상점에 </span><span class="teal">' +
							formatList(toUnlock, "【와과】", true).toUpperFirst() +
							'</span><span class="gold">【이가】 새로 입고되었습니다!</span><br><br>';
						break;
				}
			} else {
				output +=
					'<span class="gold">숲 상점에 </span><span class="teal">' +
					formatList(toUnlock, "【와과】", true).toUpperFirst() +
					'</span><span class="gold">【이가】 새로 입고되었습니다!</span><br><br>';
			}
		}
	}
	return output;
}

/**
 * @param {Function?} filterfn array filter
 */
function getSpecialSets(filterfn = null) {
	if (typeof filterfn !== "function") filterfn = () => true;
	const specialSets = Object.keys(setup.specialClothesSets);
	const filteredSets = specialSets.filter(set => filterfn(setup.specialClothesSets[set]));

	return filteredSets;
}
window.getSpecialSets = getSpecialSets;

/**
 * @param {Array} from Which array to use. In feats.js, this is used on a converted special clothes name list for importing feats from saves that use the old system.
 */
function getUnlockedSpecialSets(from = V.specialClothes.filter(c => c.unlocked >= 3).map(c => c.name)) {
	const groupTracker = new Map(); // { total: X, unlocked: Y }

	setup.specialClothes.forEach(item => {
		item.sets.forEach(group => {
			if (!groupTracker.has(group)) groupTracker.set(group, { total: 0, unlocked: 0 });
			const groupData = groupTracker.get(group);
			groupData.total++;
			if (from.includes(item.name)) groupData.unlocked++;
		});
	});

	return [...groupTracker].flatMap(([groupName, { total, unlocked }]) => (unlocked === total ? groupName : []));
}
window.getUnlockedSpecialSets = getUnlockedSpecialSets;

// Does NOT need to be updated with new clothes. Adds spaces to old spaceless names to actually match clothing setup names. Required for updating localStorage object.
function updateSpecialClothesNames(object) {
	const ConversionObject = {
		name: {
			witchdress: "witch dress",
			witchhat: "witch hat",
			witchshoes: "witch shoes",
			broomstick: "broomstick",
			vampirejacket: "vampire jacket",
			classyvampirejacket: "classy vampire jacket",
			mummyfacewrap: "mummy facewrap",
			mummytop: "mummy top",
			mummyskirt: "mummy skirt",
			scarecrowshirt: "scarecrow shirt",
			scarecrowhat: "scarecrow hat",
			skeletonmask: "skeleton mask",
			skeletonoutfit: "skeleton outfit",
			futuristicbodysuit: "futuristic bodysuit",
			minipumpkin: "mini pumpkin",
			christmasdress: "christmas dress",
			christmasshirt: "christmas shirt",
			christmastrousers: "christmas trousers",
			jinglebelldress: "jingle-bell dress",
			sleevelessjinglebelldress: "sleeveless jingle-bell dress",
			christmashat: "christmas hat",
			christmaslegwarmers: "christmas leg warmers",
			minisnowman: "mini snowman",
			rose: "rose",
			serafuku: "serafuku",
			classicserafuku: "classic serafuku",
			gakuran: "gakuran",
			sailorribbon: "sailor ribbon",
			slutshirt: "slut shirt",
			"bellydancer'stop": "belly dancer's top",
			"bellydancer'sbottoms": "belly dancer's bottoms",
			"bellydancer'sveil": "belly dancer's veil",
			"bellydancer'sshoes": "belly dancer's shoes",
			haremvest: "harem vest",
			harempants: "harem pants",
			loincloth: "loincloth",
			chefhat: "chef hat",
			fedora: "fedora",
			daisy: "daisy",
			catsuit: "catsuit",
			holypendant: "holy pendant",
			darkpendant: "dark pendant",
			stonependant: "stone pendant",
			holystole: "holy stole",
			cowbell: "cow bell",
			cowbra: "cow bra",
			cowpanties: "cow panties",
			cowsocks: "cow socks",
			cowsleeves: "cow sleeves",
			featheredhairclip: "feathered hair clip",
			esotericspectacles: "esoteric spectacles",
			spiritmask: "spirit mask",
			shrinemaidenrobes: "shrine maiden robes",
			ragtop: "rag top",
			ragskirt: "rag skirt",
			islandermask: "islander mask",
			foxmask: "fox mask",
			"sexynun'shabit": "sexy nun's habit",
			"sexynun'sgloves": "sexy nun's gloves",
			"sexynun'sstockings": "sexy nun's stockings",
			"sexynun'sveil": "sexy nun's veil",
			"sexynun'sornateveil": "sexy nun's ornate veil",
			"sexypriest'svestments": "sexy priest's vestments",
		},
		convert(obj) {
			return Object.keys(obj).map(key => this.name[key]);
		},
	};
	return ConversionObject.convert(object);
}
window.updateSpecialClothesNames = updateSpecialClothesNames;
