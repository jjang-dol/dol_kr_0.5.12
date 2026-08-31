/* global initOverUpper, initOverLower, initUpper, initLower, initUnderUpper, initUnderLower, initGenitals, initOverHead, initHead, initFace, initNeck, initHands, initHandheld, initLegs, initFeet, initSpecialClothes, initProps, wardrobesUpdate, clothesDataTrimmerLoop, npcAssignClothesToSet */

function clothingDataInit() {
	setup.clothes = {};
	setup.moddedClothes = {};
	initOverUpper();
	initOverLower();
	initUpper();
	initLower();
	initUnderUpper();
	initUnderLower();
	initGenitals();
	initOverHead();
	initHead();
	initFace();
	initNeck();
	initHands();
	initHandheld();
	initLegs();
	initFeet();
	initSpecialClothes();
	initProps();

	setup.clothes_all_slots = [
		"over_upper",
		"over_lower",
		"upper",
		"lower",
		"under_upper",
		"under_lower",
		"over_head",
		"head",
		"face",
		"neck",
		"hands",
		"handheld",
		"legs",
		"feet",
		"genitals",
	];

	// Throw an error if any clothing item has an index which is not correct for its position in its array.
	// TODO: removeme
	Object.keys(setup.clothes).forEach(slot => {
		setup.clothes[slot].forEach((item, i) => {
			if (item.index !== i) throw new Error(item.name + "의 인덱스는 " + i + "이어야 합니다. 현재 값: " + item.index);
		});
	});

	// create an "all" category in setup.clothes
	const clothes = [];
	setup.clothes_all_slots.forEach(slot => {
		// do not include over_ layers until they are properly implemented
		if (["over_head", "over_upper", "over_lower"].includes(slot)) return;
		setup.clothes[slot].forEach(c => clothes.push(c));
	});
	setup.clothes.all = clothes;

	// Find all unique traits (types) clothes can have
	setup.clothingTraits = [...new Set(Object.values(setup.clothes.all).flatMap(x => x.type))].sort();

	initNpcClothes();
}
DefineMacro("clothing_data", clothingDataInit);

function clothingArrays() {
	V.clothes = {};
	V.store = {};
	V.wardrobe = { space: 20 };
	V.outfitTmp = {};
	V.carried = {};
	V.worn = {};
	V.outfit = [
		{
			index: 0,
			name: "잠옷",
			over_upper: "naked",
			over_lower: "naked",
			upper: "pyjama shirt",
			lower: "pyjama bottoms",
			under_upper: "naked",
			under_lower: "naked",
			over_head: "naked",
			head: "naked",
			face: "naked",
			neck: "naked",
			hands: "naked",
			handheld: "naked",
			legs: "naked",
			feet: "naked",
			type: ["sleep"],
			colors: false,
		},
	];

	setup.clothes_all_slots.forEach(slot => {
		V.store[slot] = [];
		V.wardrobe[slot] = [];
		V.carried[slot] = clone(setup.clothes[slot][0]);
		V.worn[slot] = clone(setup.clothes[slot][0]);
	});

	wardrobesUpdate();
}

function clothingInit() {
	clothingArrays();
	V.upperoff = 0;
	V.loweroff = 0;
	V.underloweroff = 0;
	V.underupperoff = 0;
	V.upperwet = 0;
	V.lowerwet = 0;
	V.underlowerwet = 0;
	V.underupperwet = 0;
	V.upperwetstage = 0;
	V.lowerwetstage = 0;
	V.underupperwetstage = 0;
	V.underlowerwetstage = 0;
	V.waterwash = 0;
	V.wear_over_upper = "none";
	V.wear_over_lower = "none";
	V.wear_upper = "none";
	V.wear_lower = "none";
	V.wear_under_upper = "none";
	V.wear_under_lower = "none";
	V.wear_over_head = "none";
	V.wear_head = "none";
	V.wear_face = "none";
	V.wear_neck = "none";
	V.wear_hands = "none";
	V.wear_handheld = "none";
	V.wear_legs = "none";
	V.wear_feet = "none";
	V.wear_genitals = "none";
	V.wear_outfit = "none";
}
DefineMacro("clothinginit", clothingInit);

function givestartclothing() {
	setup.clothes_all_slots.forEach(slot => (V.worn[slot] = clone(setup.clothes[slot][0])));

	let clothesType;
	if (V.player.gender === "m") {
		clothesType = "male";
	} else if (V.player.gender === "f") {
		clothesType = "female";
	} else {
		if (V.player.gender_body === "m" || (V.player.gender_body === "a" && V.player.breastsize <= 3)) {
			clothesType = "male";
		} else {
			// if $player.gender_body is "f" or ($player.gender_body is "a" and $player.breastsize gt 3))
			clothesType = "female";
		}
	}

	if (V.background === "crossdresser") clothesType = V.player.sex === "m" ? "female" : "male";

	if (clothesType === "female") {
		V.outfit.push(
			{
				index: V.outfit.length,
				name: "평상복",
				over_upper: "naked",
				over_lower: "naked",
				upper: "sundress",
				lower: "sundress skirt",
				under_upper: "naked",
				under_lower: "plain panties",
				over_head: "naked",
				head: "naked",
				face: "naked",
				neck: "naked",
				handheld: "naked",
				hands: "naked",
				legs: "girl's gym socks",
				feet: "school shoes",
				type: ["normal"],
				colors: false,
			},
			{
				index: V.outfit.length,
				name: "교복",
				over_upper: "naked",
				over_lower: "naked",
				upper: "school shirt",
				lower: "school skirt",
				under_upper: "naked",
				under_lower: "plain panties",
				over_head: "naked",
				head: "hairpin",
				face: "naked",
				neck: "naked",
				handheld: "backpack",
				hands: "naked",
				legs: "girl's gym socks",
				feet: "school shoes",
				type: ["school"],
				colors: false,
			},
			{
				index: V.outfit.length,
				name: "수영복",
				over_upper: "naked",
				over_lower: "naked",
				upper: "naked",
				lower: "naked",
				under_upper: "school swimsuit",
				under_lower: "school swimsuit bottom",
				over_head: "naked",
				head: "naked",
				face: "naked",
				neck: "naked",
				handheld: "naked",
				hands: "naked",
				legs: "naked",
				feet: "naked",
				type: ["swim"],
				colors: false,
			}
		);

		V.worn.upper = clone(setup.clothes.upper[1]);
		V.worn.upper.colour = "white";
		V.worn.lower = clone(setup.clothes.lower[1]);
		V.worn.lower.colour = "white";
		V.worn.under_lower = clone(setup.clothes.under_lower[1]);
		V.worn.under_lower.colour = "pale white";
		V.worn.legs = clone(setup.clothes.legs[3]);
		V.worn.head = clone(setup.clothes.head[1]);
		V.worn.head.colour = "white";
		V.worn.head.accessory_colour = "white";
		V.worn.feet = clone(setup.clothes.feet[1]);

		if (V.player.breastsize <= 3) {
			V.wardrobe.under_upper.push(clone(setup.clothes.under_upper[12]));
			V.wardrobe.under_upper.last().colour = "pale white";
		} else {
			V.worn.under_upper = clone(setup.clothes.under_upper[12]);
			V.worn.under_upper.colour = "pale white";
			V.outfit[1].under_upper = "plain bra";
			V.outfit[2].under_upper = "plain bra";
		}

		V.wardrobe.upper.push(clone(setup.clothes.upper[5]));
		V.wardrobe.upper.last().colour = "white";
		V.wardrobe.upper.last().accessory_colour = "light blue";
		V.wardrobe.lower.push(clone(setup.clothes.lower[7]));
		V.wardrobe.lower.last().colour = "black";
		V.wardrobe.upper.push(clone(setup.clothes.upper[2]));
		V.wardrobe.upper.last().colour = "blue";
		V.wardrobe.lower.push(clone(setup.clothes.lower[2]));
		V.wardrobe.lower.last().colour = "blue";
		V.wardrobe.under_upper.push(clone(setup.clothes.under_upper[2]));
		V.wardrobe.under_upper.last().colour = "blue";
		V.wardrobe.under_lower.push(clone(setup.clothes.under_lower[6]));
		V.wardrobe.under_lower.last().colour = "blue";
		V.wardrobe.handheld.push(clone(setup.clothes.handheld[8]));
		V.wardrobe.handheld.last().colour = "purple";
	} else {
		V.outfit.push(
			{
				index: V.outfit.length,
				name: "평상복",
				over_upper: "naked",
				over_lower: "naked",
				upper: "t-shirt",
				lower: "shorts",
				under_upper: "naked",
				under_lower: "briefs",
				over_head: "naked",
				head: "naked",
				face: "naked",
				neck: "naked",
				handheld: "naked",
				hands: "naked",
				legs: "boy's gym socks",
				feet: "school shoes",
				type: ["normal"],
				colors: false,
			},
			{
				index: V.outfit.length,
				name: "교복",
				over_upper: "naked",
				over_lower: "naked",
				upper: "school shirt",
				lower: "school shorts",
				under_upper: "naked",
				under_lower: "briefs",
				over_head: "naked",
				head: "naked",
				face: "naked",
				neck: "naked",
				handheld: "backpack",
				hands: "naked",
				legs: "boy's gym socks",
				feet: "school shoes",
				type: ["school"],
				colors: false,
			},
			{
				index: V.outfit.length,
				name: "수영복",
				over_upper: "naked",
				over_lower: "naked",
				upper: "naked",
				lower: "naked",
				under_upper: "naked",
				under_lower: "school swim shorts",
				over_head: "naked",
				head: "naked",
				face: "naked",
				neck: "naked",
				handheld: "naked",
				hands: "naked",
				legs: "naked",
				feet: "naked",
				type: ["swim"],
				colors: false,
			}
		);

		V.worn.upper = clone(setup.clothes.upper[4]);
		V.worn.upper.colour = "tangerine";
		V.worn.lower = clone(setup.clothes.lower[5]);
		V.worn.lower.colour = "blue";
		V.worn.under_lower = clone(setup.clothes.under_lower[4]);
		V.worn.under_lower.colour = "black";
		V.worn.legs = clone(setup.clothes.legs[2]);
		V.worn.feet = clone(setup.clothes.feet[1]);

		V.wardrobe.upper.push(clone(setup.clothes.upper[5]));
		V.wardrobe.upper.last().colour = "white";
		V.wardrobe.upper.last().accessory_colour = "light blue";
		V.wardrobe.lower.push(clone(setup.clothes.lower[6]));
		V.wardrobe.lower.last().colour = "black";
		V.wardrobe.upper.push(clone(setup.clothes.upper[2]));
		V.wardrobe.upper.last().colour = "blue";
		V.wardrobe.lower.push(clone(setup.clothes.lower[2]));
		V.wardrobe.lower.last().colour = "blue";
		V.wardrobe.under_lower.push(clone(setup.clothes.under_lower[7]));
		V.wardrobe.under_lower.last().colour = "blue";
		V.wardrobe.under_lower.last().accessory_colour = "white";
		V.wardrobe.head.push(clone(setup.clothes.head[1]));
		V.wardrobe.handheld.push(clone(setup.clothes.handheld[8]));
		V.wardrobe.handheld.last().colour = "blue";
	}
	// strip the unneeded vars from starting clothes
	clothesDataTrimmerLoop();
}
DefineMacro("givestartclothing", givestartclothing);

/* eslint-disable prettier/prettier */
function initNpcClothes() {
	T.npcClothesItems = {
		"upper": {
			"shirt":					{ name: "shirt",					integrity_max: 100, word: "", action: "lift" },
			"naked":					{ name: "naked",					integrity_max: 100, word: "", action: "none" },
			"school shirt":				{ name: "school shirt",				integrity_max: 100, word: "", action: "unbutton" },
			"school blouse":			{ name: "school blouse",			integrity_max: 100, word: "", action: "unbutton" },
			"dress shirt":				{ name: "dress shirt",				integrity_max: 100, word: "", action: "unbutton" },
			"school blazer":			{ name: "school blazer",			integrity_max: 100, word: "", action: "pull" },
			"teacher's uniform":		{ name: "teacher's uniform",		integrity_max: 100, word: "", action: "unbutton" },
			"swim shirt":				{ name: "swim shirt",				integrity_max: 100, word: "", action: "lift" },
			"school swimsuit top":		{ name: "school swimsuit top",		integrity_max: 100, word: "", action: "pull" },
			"bikini top":				{ name: "bikini top",				integrity_max: 100, word: "", action: "pull" },
			"microkini top":			{ name: "microkini top",			integrity_max: 100, word: "", action: "pull" },
			"diving suit":				{ name: "diving suit",				integrity_max: 100, word: "", action: "unzip" },
			"sailor shirt":				{ name: "sailor shirt",				integrity_max: 100, word: "", action: "unbutton" },
			"hi-vis jacket":			{ name: "hi-vis jacket",			integrity_max: 100, word: "", action: "unzip" },
			"denim shirt":				{ name: "denim shirt",				integrity_max: 100, word: "", action: "unbutton" },
			"hoodie":					{ name: "hoodie",					integrity_max: 100, word: "", action: "lift" },
			"vest":						{ name: "vest",						integrity_max: 100, word: "", action: "lift" },
			"police shirt":				{ name: "police shirt",				integrity_max: 100, word: "", action: "unbutton" },
			"uniform shirt":			{ name: "uniform shirt",			integrity_max: 100, word: "", action: "unbutton" },
			"monk robe top":			{ name: "monk robe top",			integrity_max: 100, word: "", action: "open" },
			"nun robe top":				{ name: "nun robe top",				integrity_max: 100, word: "", action: "open" },
			"robe top":					{ name: "robe top",					integrity_max: 100, word: "", action: "open" },
			"black robe top":			{ name: "black robe top",			integrity_max: 100, word: "", action: "open" },
			"jumpsuit shirt":			{ name: "jumpsuit shirt",			integrity_max: 100, word: "", action: "unzip" },
			"tuxedo shirt":				{ name: "tuxedo shirt",				integrity_max: 100, word: "", action: "unbutton" },
			"evening gown top":			{ name: "evening gown top",			integrity_max: 100, word: "", action: "pull" },
			"ballgown top":				{ name: "ballgown top",				integrity_max: 100, word: "", action: "pull" },
			"gothic jacket and vest":	{ name: "gothic jacket and vest",	integrity_max: 100, word: "", action: "unbutton" },
			"gothic gown top":			{ name: "gothic gown top",			integrity_max: 100, word: "", action: "pull" },
			"business suit top":		{ name: "business suit top",		integrity_max: 100, word: "", action: "unbutton" },
			"t-shirt":					{ name: "t-shirt",					integrity_max: 100, word: "", action: "lift" },
			"sundress top":				{ name: "sundress top",				integrity_max: 100, word: "", action: "pull" },
			"tracksuit top":			{ name: "tracksuit top",			integrity_max: 100, word: "", action: "unzip" },
			"peacoat":					{ name: "peacoat",					integrity_max: 100, word: "", action: "unbutton" },
			"turtleneck":				{ name: "turtleneck",				integrity_max: 100, word: "", action: "lift" },
			"collared shirt":			{ name: "collared shirt",			integrity_max: 100, word: "", action: "unbutton" },
			"blazer":					{ name: "blazer",					integrity_max: 100, word: "", action: "lift" },
			"sports jersey":			{ name: "sports jersey",			integrity_max: 100, word: "", action: "lift" },
			"sweater vest":				{ name: "sweater vest",				integrity_max: 100, word: "", action: "lift" },
			"v neck":					{ name: "v neck",					integrity_max: 100, word: "", action: "lift" },
			"tank top":					{ name: "tank top",					integrity_max: 100, word: "", action: "pull" },
			"blouse":					{ name: "blouse",					integrity_max: 100, word: "", action: "lift" },
			"crop top":					{ name: "crop top",					integrity_max: 100, word: "", action: "pull" },
			"bra":						{ name: "bra",						integrity_max: 100, word: "", action: "undo" },
			"puffer jacket":			{ name: "puffer jacket",			integrity_max: 100, word: "", action: "unzip" },
			"trenchcoat":				{ name: "trenchcoat",				integrity_max: 100, word: "", action: "open" },
			"coat":						{ name: "coat",						integrity_max: 100, word: "", action: "open" },
			"sweater":					{ name: "sweater",					integrity_max: 100, word: "", action: "lift" },
			"rain coat":				{ name: "rain coat",				integrity_max: 100, word: "", action: "unzip" },
			"flannel":					{ name: "flannel",					integrity_max: 100, word: "", action: "unbutton" },
			"woolen jumper":			{ name: "woolen jumper",			integrity_max: 100, word: "", action: "lift" },
			"fleece jumper":			{ name: "fleece jumper",			integrity_max: 100, word: "", action: "lift" },
			"jacket":					{ name: "jacket",					integrity_max: 100, word: "", action: "unzip" },
			"camo jacket":				{ name: "camo jacket",				integrity_max: 100, word: "", action: "unzip" },
			"trench coat":				{ name: "trench coat",				integrity_max: 100, word: "", action: "open" },
			"leather vest":				{ name: "leather vest",				integrity_max: 100, word: "", action: "open" },
			"leather harness":			{ name: "leather harness",			integrity_max: 100, word: "", action: "open" },
			"bathrobe":					{ name: "bathrobe",					integrity_max: 100, word: "", action: "open" },
			"lab coat":					{ name: "lab coat",					integrity_max: 100, word: "", action: "unbutton" },
			"security vest":			{ name: "security vest",			integrity_max: 100, word: "", action: "unbutton" },
			"doctor's coat":			{ name: "doctor's coat",			integrity_max: 100, word: "", action: "unbutton" },
			"nurse's coat":				{ name: "nurse's coat",				integrity_max: 100, word: "", action: "unbutton" },
			"patient gown":				{ name: "patient gown",				integrity_max: 100, word: "", action: "pull" },
			"jumpsuit top":				{ name: "jumpsuit top",				integrity_max: 100, word: "", action: "unzip" },
			"coverall top":				{ name: "coverall top",				integrity_max: 100, word: "", action: "unzip" },
			"dance shirt":				{ name: "dance shirt",				integrity_max: 100, word: "", action: "pull" },
			"shirtless suit":			{ name: "shirtless suit",			integrity_max: 100, word: "", action: "open" },
			"low-neck dress":			{ name: "low-neck dress",			integrity_max: 100, word: "", action: "pull" },
			"riding top":				{ name: "riding top",				integrity_max: 100, word: "", action: "unbutton" },
			"shadbelly coat":			{ name: "shadbelly coat",			integrity_max: 100, word: "", action: "unbutton" },
			"ramshackle hunting coat":	{ name: "ramshackle hunting coat",	integrity_max: 100, word: "", action: "unbutton" },
			"ruined suit":				{ name: "ruined suit",				integrity_max: 100, word: "", action: "open" },
			"grey sweater":				{ name: "grey sweater",				integrity_max: 100, word: "", action: "lift" },
			"grey cardigan":			{ name: "grey cardigan",			integrity_max: 100, word: "", action: "open" },
			"leather jacket":			{ name: "leather jacket",			integrity_max: 100, word: "", action: "open" },
			"jacaranda vest":			{ name: "jacaranda vest",			integrity_max: 100, word: "", action: "pull" },
			"blossoming growths":		{ name: "blossoming growths",		integrity_max: 100, word: "", action: "pull" },
			"leaf shirt":				{ name: "leaf shirt",				integrity_max: 100, word: "", action: "pull" },
			"leaf corset":				{ name: "leaf corset",				integrity_max: 100, word: "", action: "pull" },
			"pine top":					{ name: "pine top",					integrity_max: 100, word: "", action: "pull" },
			"plant top":				{ name: "plant top",				integrity_max: 100, word: "", action: "pull" },
			"sundress":					{ name: "sundress",					integrity_max: 100, word: "", action: "lift" },
			"tuxedo":					{ name: "tuxedo",					integrity_max: 100, word: "", action: "unbutton" },
			"gothic gown":				{ name: "gothic gown",				integrity_max: 100, word: "", action: "pull" },
			"kimono":					{ name: "kimono",					integrity_max: 100, word: "", action: "pull" },
			"christmas top":			{ name: "christmas top",			integrity_max: 100, word: "", action: "pull" },
			"ribbons":					{ name: "ribbons",					integrity_max: 100, word: "", action: "unwrap" },
			"pyjama shirt":				{ name: "pyjama shirt",				integrity_max: 100, word: "", action: "lift" },
			"ghost sheet":				{ name: "ghost sheet",				integrity_max: 100, word: "", action: "lift" },
			"vampire jacket":			{ name: "vampire jacket",			integrity_max: 100, word: "", action: "open" },
			"witch dress":				{ name: "witch dress",				integrity_max: 100, word: "", action: "pull" },
			"flowing robe":				{ name: "flowing robe",				integrity_max: 100, word: "", action: "lift" },
			"belted tunic":				{ name: "belted tunic",				integrity_max: 100, word: "", action:"pull"},
			"ritual robes":				{ name: "ritual robes",				integrity_max: 100, word: "", action:"lift"},
			"vintage pantsuit":			{ name: "vintage pantsuit",			integrity_max: 100, word: "", action:"pull"},
			"vintage skirtsuit":		{ name: "vintage skirtsuit",		integrity_max: 100, word: "", action:"lift"},
			"winter jacket":			{ name: "winter jacket",			integrity_max: 100, word: "", action:"pull"}
		},
		"lower": {
			"naked":					{ name: "naked",					integrity_max: 100, word: "", action: "none" },
			"trousers":					{ name: "trousers",					integrity_max: 100, word: "", action: "pull" },
			"skirt":					{ name: "skirt",					integrity_max: 100, word: "", action: "lift" },
			"school shorts":			{ name: "school shorts",			integrity_max: 100, word: "", action: "pull" },
			"school skirt":				{ name: "school skirt",				integrity_max: 100, word: "", action: "lift" },
			"short school skirt":		{ name: "short school skirt",		integrity_max: 100, word: "", action: "lift" },
			"school trousers":			{ name: "school trousers",			integrity_max: 100, word: "", action: "pull" },
			"long school skirt":		{ name: "long school skirt",		integrity_max: 100, word: "", action: "lift" },
			"teacher's slacks":			{ name: "teacher's slacks",			integrity_max: 100, word: "", action: "unzip" },
			"school swim shorts":		{ name: "school swim shorts",		integrity_max: 100, word: "", action: "pull" },
			"school swimsuit bottoms":	{ name: "school swimsuit bottoms",	integrity_max: 100, word: "", action: "aside" },
			"swim shorts":				{ name: "swim shorts",				integrity_max: 100, word: "", action: "pull" },
			"board shorts":				{ name: "board shorts",				integrity_max: 100, word: "", action: "pull" },
			"bikini bottoms":			{ name: "bikini bottoms",			integrity_max: 100, word: "", action: "pull" },
			"microkini bottoms":		{ name: "microkini bottoms",		integrity_max: 100, word: "", action: "pull" },
			"diving suit bottoms":		{ name: "diving suit bottoms",		integrity_max: 100, word: "", action: "unzip" },
			"sailor trousers":			{ name: "sailor trousers",			integrity_max: 100, word: "", action: "unzip" },
			"cargo trousers":			{ name: "cargo trousers",			integrity_max: 100, word: "", action: "pull" },
			"police trousers":			{ name: "police trousers",			integrity_max: 100, word: "", action: "unzip" },
			"police skirt":				{ name: "police skirt",				integrity_max: 100, word: "", action: "lift" },
			"uniform trousers":			{ name: "uniform trousers",			integrity_max: 100, word: "", action: "unzip" },
			"monk robes":				{ name: "monk robes",				integrity_max: 100, word: "", action: "aside" },
			"nun robe skirt":			{ name: "nun robe skirt",			integrity_max: 100, word: "", action: "lift" },
			"robes":					{ name: "robes",					integrity_max: 100, word: "", action: "aside" },
			"black robes":				{ name: "black robes",				integrity_max: 100, word: "", action: "aside" },
			"jumpsuit bottoms":			{ name: "jumpsuit bottoms",			integrity_max: 100, word: "", action: "unzip" },
			"tuxedo trousers":			{ name: "tuxedo trousers",			integrity_max: 100, word: "", action: "unzip" },
			"evening gown":				{ name: "evening gown",				integrity_max: 100, word: "", action: "lift" },
			"ballgown skirt":			{ name: "ballgown skirt",			integrity_max: 100, word: "", action: "lift" },
			"breeches":					{ name: "breeches",					integrity_max: 100, word: "", action: "pull" },
			"gothic trousers":			{ name: "gothic trousers",			integrity_max: 100, word: "", action: "unzip" },
			"gothic gown":				{ name: "gothic gown",				integrity_max: 100, word: "", action: "lift" },
			"business trousers":		{ name: "business trousers",		integrity_max: 100, word: "", action: "unzip" },
			"sundress skirt":			{ name: "sundress skirt",			integrity_max: 100, word: "", action: "lift" },
			"tracksuit bottoms":		{ name: "tracksuit bottoms",		integrity_max: 100, word: "", action: "pull" },
			"slacks":					{ name: "slacks",					integrity_max: 100, word: "", action: "unzip" },
			"jeans":					{ name: "jeans",					integrity_max: 100, word: "", action: "unbutton" },
			"khakis":					{ name: "khakis",					integrity_max: 100, word: "", action: "unzip" },
			"shorts":					{ name: "shorts",					integrity_max: 100, word: "", action: "pull" },
			"miniskirt":				{ name: "miniskirt",				integrity_max: 100, word: "", action: "lift" },
			"boyshorts":				{ name: "boyshorts",				integrity_max: 100, word: "", action: "pull" },
			"panties":					{ name: "panties",					integrity_max: 100, word: "", action: "pull" },
			"boxers":					{ name: "boxers",					integrity_max: 100, word: "", action: "unbutton" },
			"briefs":					{ name: "briefs",					integrity_max: 100, word: "", action: "pull" },
			"jorts":					{ name: "jorts",					integrity_max: 100, word: "", action: "pull" },
			"sweatpants":				{ name: "sweatpants",				integrity_max: 100, word: "", action: "pull" },
			"rain bottoms":				{ name: "rain bottoms",				integrity_max: 100, word: "", action: "pull" },
			"camo bottoms":				{ name: "camo bottoms",				integrity_max: 100, word: "", action: "unzip" },
			"assless chaps":			{ name: "assless chaps",			integrity_max: 100, word: "", action: "pull" },
			"hot pants":				{ name: "hot pants",				integrity_max: 100, word: "", action: "pull" },
			"leather trousers":			{ name: "leather trousers",			integrity_max: 100, word: "", action: "pull" },
			"bathrobe":					{ name: "bathrobe",					integrity_max: 100, word: "", action: "lift" },
			"lab trousers":				{ name: "lab trousers",				integrity_max: 100, word: "", action: "unzip" },
			"security trousers":		{ name: "security trousers",		integrity_max: 100, word: "", action: "unzip" },
			"white trousers":			{ name: "white trousers",			integrity_max: 100, word: "", action: "pull" },
			"white skirt":				{ name: "white skirt",				integrity_max: 100, word: "", action: "lift" },
			"gown skirt":				{ name: "gown skirt",				integrity_max: 100, word: "", action: "lift" },
			"jumpsuit trousers":		{ name: "jumpsuit trousers",		integrity_max: 100, word: "", action: "pull" },
			"coverall bottoms":			{ name: "coverall bottoms",			integrity_max: 100, word: "", action: "unzip" },
			"dance shorts":				{ name: "dance shorts",				integrity_max: 100, word: "", action: "pull" },
			"formal trousers":			{ name: "formal trousers",			integrity_max: 100, word: "", action: "pull" },
			"cropped dress skirt":		{ name: "cropped dress skirt",		integrity_max: 100, word: "", action: "lift" },
			"riding trousers":			{ name: "riding trousers",			integrity_max: 100, word: "", action: "pull" },
			"chapette breeches":		{ name: "chapette breeches",		integrity_max: 100, word: "", action: "pull" },
			"torn hunting trousers":	{ name: "torn hunting trousers",	integrity_max: 100, word: "", action: "pull" },
			"ruined trousers":			{ name: "ruined trousers",			integrity_max: 100, word: "", action: "pull" },
			"dark trousers":			{ name: "dark trousers",			integrity_max: 100, word: "", action: "pull" },
			"torn jeans":				{ name: "torn jeans",				integrity_max: 100, word: "", action: "unbutton" },
			"bloomers":					{ name: "bloomers",					integrity_max: 100, word: "", action: "lift" },
			"bell flower dress":		{ name: "bell flower dress",		integrity_max: 100, word: "", action: "lift" },
			"lotus skirt":				{ name: "lotus skirt",				integrity_max: 100, word: "", action: "lift" },
			"leaf skirt":				{ name: "leaf skirt",				integrity_max: 100, word: "", action: "lift" },
			"evergreen dress":			{ name: "evergreen dress",			integrity_max: 100, word: "", action: "lift" },
			"plant skirt":				{ name: "plant skirt",				integrity_max: 100, word: "", action: "lift" },
			"kimono bottoms":			{ name: "kimono bottoms",			integrity_max: 100, word: "", action: "lift" },
			"christmas bottoms":		{ name: "christmas bottoms",		integrity_max: 100, word: "", action: "pull" },
			"ribbons":					{ name: "ribbons",					integrity_max: 100, word: "", action: "unwrap" },
			"pyjama bottoms":			{ name: "pyjama bottoms",			integrity_max: 100, word: "", action: "pull" },
			"ghost sheet":				{ name: "ghost sheet",				integrity_max: 100, word: "", action: "lift" },
			"vampire trousers":			{ name: "vampire trousers",			integrity_max: 100, word: "", action: "pull" },
			"witch dress skirt":		{ name: "witch dress skirt",		integrity_max: 100, word: "", action: "lift" },
			"flowing robe":				{ name: "flowing robe",				integrity_max: 100, word: "", action: "lift" },
			"belted tunic skirt":		{ name: "belted tunic skirt",		integrity_max: 100, word: "", action: "pull"},
			"ritual skirt":				{ name: "ritual skirt",				integrity_max: 100, word: "", action: "lift"},
			"vintage pants":			{ name: "vintage pants",			integrity_max: 100, word: "", action: "pull"},
			"vintage skirt":			{ name: "vintage skirt",			integrity_max: 100, word: "", action: "lift"},
			"black trousers":			{ name: "black trousers",			integrity_max: 100, word: "", action: "pull"},
		},
	};

	setup.npcClothesSets = [
		{ name: "naked",				type: "naked", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("naked", "naked"), desc: "알몸" },
		{ name: "maleDefault",			type: "default", gender: "m", outfit: 0, clothes: npcAssignClothesToSet("shirt", "trousers"), desc: "셔츠와 바지" },
		{ name: "femaleDefault",		type: "default", gender: "f", outfit: 0, clothes: npcAssignClothesToSet("shirt", "skirt"), desc: "셔츠와 치마" },
		/* -------------------------------------------------------------------------------------------------------------------------------------------------- */
		{ name: "maleSchool",			type: "school", gender: "m", outfit: 0, clothes: npcAssignClothesToSet("school shirt", "school shorts"), desc: "교복" },
		{ name: "femaleSchool",			type: "school", gender: "f", outfit: 0, clothes: npcAssignClothesToSet("school shirt", "school skirt"), desc: "교복" },
		{ name: "femaleSchoolShort",	type: "school", gender: "f", outfit: 0, clothes: npcAssignClothesToSet("school shirt", "short school skirt"), desc: "교복" },
		{ name: "maleSchoolLong",		type: "school", gender: "m", outfit: 0, clothes: npcAssignClothesToSet("school blouse", "school trousers"), desc: "교복" },
		{ name: "femaleSchoolLong",		type: "school", gender: "f", outfit: 0, clothes: npcAssignClothesToSet("school blouse", "long school skirt"), desc: "교복" },
		{ name: "maleSchoolDress",		type: "school", gender: "m", outfit: 0, clothes: npcAssignClothesToSet("dress shirt", "school trousers"), desc: "교복" },
		{ name: "femaleSchoolDress",	type: "school", gender: "f", outfit: 0, clothes: npcAssignClothesToSet("dress shirt", "school skirt"), desc: "교복" },
		{ name: "maleSchoolBlazer",		type: "school", gender: "m", outfit: 0, clothes: npcAssignClothesToSet("school blazer", "school trousers"), desc: "교복" },
		{ name: "femaleSchoolBlazer",	type: "school", gender: "f", outfit: 0, clothes: npcAssignClothesToSet("school blazer", "long school skirt"), desc: "교복" },
		{ name: "teacher",				type: "teacher", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("teacher's uniform", "teacher's slacks"), desc: "선생님 제복" },
		/* -------------------------------------------------------------------------------------------------------------------------------------------------- */
		{ name: "maleSchoolSwim",		type: "schoolSwim", gender: "m", outfit: 0, clothes: npcAssignClothesToSet("naked", "school swim shorts"), desc: "학교 수영복" },
		{ name: "maleSchoolSwimShirt",	type: "schoolSwim", gender: "m", outfit: 0, clothes: npcAssignClothesToSet("swim shirt", "school swim shorts"), desc: "학교 수영복" },
		{ name: "femaleSchoolSwim",		type: "schoolSwim", gender: "f", outfit: 1, clothes: npcAssignClothesToSet("school swimsuit top", "school swimsuit bottoms"), desc: "학교 수영복" },
		{ name: "maleSwim1",			type: "beach", gender: "m", outfit: 0, clothes: npcAssignClothesToSet("naked", "swim shorts"), desc: "수영복" },
		{ name: "maleSwim2",			type: "beach", gender: "m", outfit: 0, clothes: npcAssignClothesToSet("naked", "board shorts"), desc: "수영복" },
		{ name: "femaleSwim1",			type: "beach", gender: "f", outfit: 0, clothes: npcAssignClothesToSet("bikini top", "bikini bottoms"), desc: "비키니" },
		{ name: "femaleSwim2",			type: "beach", gender: "f", outfit: 0, clothes: npcAssignClothesToSet("microkini top", "microkini bottoms"), desc: "마이크로 비키니" },
		{ name: "neutralSwim",			type: "beach", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("swim shirt", "board shorts"), desc: "수영복" },
		{ name: "divingSuit",			type: "beachDive", gender: "n", outfit: 1, clothes: npcAssignClothesToSet("diving suit", "diving suit bottoms"), desc: "잠수복" },
		{ name: "sailor",				type: "sailor", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("sailor shirt", "sailor trousers"), desc: "선원복" },
		{ name: "docker1",				type: "docker", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("hi-vis jacket", "cargo trousers"), desc: "형광 재킷과 카고 바지" },
		{ name: "docker2",				type: "docker", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("denim shirt", "jeans"), desc: "청남방과 청바지" },
		{ name: "docker3",				type: "docker", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("hoodie", "cargo trousers"), desc: "후드티와 카고 바지" },
		{ name: "docker4",				type: "docker", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("vest", "jeans"), desc: "조끼와 청바지" },
		/* -------------------------------------------------------------------------------------------------------------------------------------------------- */
		{ name: "malePolice",			type: "police", gender: "m", outfit: 0, clothes: npcAssignClothesToSet("police shirt", "police trousers"), desc: "경찰복" },
		{ name: "femalePolice",			type: "police", gender: "f", outfit: 0, clothes: npcAssignClothesToSet("police shirt", "police skirt"), desc: "경찰복" },
		{ name: "neutralPolice",		type: "police", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("uniform shirt", "uniform trousers"), desc: "경찰복" },
		{ name: "maleRobe",				type: "temple", gender: "m", outfit: 1, clothes: npcAssignClothesToSet("monk robe top", "monk robes"), desc: "로브" },
		{ name: "femaleRobe",			type: "temple", gender: "f", outfit: 1, clothes: npcAssignClothesToSet("nun robe top", "nun robe skirt"), desc: "로브" },
		{ name: "neutralRobe",			type: "temple", gender: "n", outfit: 1, clothes: npcAssignClothesToSet("robe top", "robes"), desc: "로브" },
		{ name: "neutralRobeBlack",		type: "templeBlack", gender: "n", outfit: 1, clothes: npcAssignClothesToSet("black robe top", "black robes"), desc: "검은색 로브" },
		{ name: "prisonJumpsuit",		type: "prison", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("jumpsuit shirt", "jumpsuit bottoms"), desc: "죄수복" },
		/* -------------------------------------------------------------------------------------------------------------------------------------------------- */
		{ name: "maleFormal1",			type: "formal", gender: "m", outfit: 0, clothes: npcAssignClothesToSet("tuxedo shirt", "tuxedo trousers"), desc: "턱시도" },
		{ name: "femaleFormal1",		type: "formal", gender: "f", outfit: 1, clothes: npcAssignClothesToSet("evening gown top", "evening gown"), desc: "정장 드레스" },
		{ name: "femaleFormal2",		type: "formal", gender: "f", outfit: 1, clothes: npcAssignClothesToSet("ballgown top", "ballgown skirt"), desc: "무도회 드레스" },
		{ name: "neutralFormal",		type: "formal", gender: "n", outfit: 1, clothes: npcAssignClothesToSet("dress shirt", "breeches"), desc: "드레스 셔츠와 반바지" },
		{ name: "maleFormalRare",		type: "formalRare", gender: "m", outfit: 0, clothes: npcAssignClothesToSet("gothic jacket and vest", "gothic trousers"), desc: "고딕 정장" },
		{ name: "femaleFormalRare",		type: "formalRare", gender: "f", outfit: 1, clothes: npcAssignClothesToSet("gothic gown top", "gothic gown"), desc: "고딕 드레스" },
		{ name: "business",				type: "business", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("business suit top", "business trousers"), desc: "비즈니스 정장" },
		/* -------------------------------------------------------------------------------------------------------------------------------------------------- */
		{ name: "maleTown1",			type: "town", gender: "m", outfit: 0, clothes: npcAssignClothesToSet("t-shirt", "shorts"), desc: "티셔츠와 반바지" },
		{ name: "femaleTown1",			type: "town", gender: "f", outfit: 1, clothes: npcAssignClothesToSet("sundress top", "sundress skirt"), desc: "선드레스" },
		{ name: "maleTown2",			type: "town", gender: "m", outfit: 0, clothes: npcAssignClothesToSet("shirt", "trousers"), desc: "셔츠와 바지" },
		{ name: "femaleTown2",			type: "town", gender: "f", outfit: 0, clothes: npcAssignClothesToSet("shirt", "skirt"), desc: "셔츠와 치마" },
		{ name: "townTrack",			type: "town", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("tracksuit top", "tracksuit bottoms"), desc: "트레이닝 복" },
		{ name: "townCoat",				type: "town", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("peacoat", "slacks"), desc: "피코트와 슬랙스" },
		{ name: "townTurtleneck",		type: "town", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("turtleneck", "jeans"), desc: "터틀넥과 청바지" },
		{ name: "townCollar",			type: "town", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("collared shirt", "khakis"), desc: "깃 달린 셔츠와 카키 바지" },
		{ name: "townBlazer",			type: "town", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("blazer", "trousers"), desc: "블레이저와 바지" },
		{ name: "townJersey",			type: "town", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("sports jersey", "trousers"), desc: "스포츠 져지와 바지" },
		{ name: "townSweaterVest",		type: "town", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("sweater vest", "khakis"), desc: "스웨터 조끼와 카키 바지" },
		{ name: "townVNeck",			type: "town", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("v neck", "jeans"), desc: "브이넥 셔츠와 청바지" },
		/* -------------------------------------------------------------------------------------------------------------------------------------------------- */
		{ name: "maleWarm1",			type: "warm", gender: "m", outfit: 0, clothes: npcAssignClothesToSet("t-shirt", "shorts"), desc: "티셔츠와 반바지" },
		{ name: "femaleWarm1",			type: "warm", gender: "f", outfit: 1, clothes: npcAssignClothesToSet("sundress top", "sundress skirt"), desc: "선드레스" },
		{ name: "maleWarm2",			type: "warm", gender: "m", outfit: 0, clothes: npcAssignClothesToSet("tank top", "shorts"), desc: "탱크 탑과 반바지" },
		{ name: "femaleWarm2",			type: "warm", gender: "f", outfit: 0, clothes: npcAssignClothesToSet("blouse", "skirt"), desc: "블라우스와 치마" },
		{ name: "maleWarmShirtless",	type: "warm", gender: "m", outfit: 0, clothes: npcAssignClothesToSet("naked", "shorts"), desc: "반바지" },
		{ name: "femaleWarmCrop",		type: "warm", gender: "f", outfit: 0, clothes: npcAssignClothesToSet("crop top", "miniskirt"), desc: "크롭 탑과 미니스커트" },
		{ name: "femaleWarmTank",		type: "warm", gender: "f", outfit: 0, clothes: npcAssignClothesToSet("tank top", "boyshorts"), desc: "탱크 탑과 보이쇼츠" },
		{ name: "neutralWarmBlazer",	type: "warm", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("blazer", "shorts"), desc: "블레이저와 반바지" },
		{ name: "neutralWarmJersey",	type: "warm", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("sports jersey", "jorts"), desc: "스포츠 져지와 청반바지" },
		/* -------------------------------------------------------------------------------------------------------------------------------------------------- */
		{ name: "coldPuffer",			type: "cold", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("puffer jacket", "slacks"), desc: "패딩 재킷" },
		{ name: "coldTrench",			type: "cold", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("trenchcoat", "jeans"), desc: "트렌치코트" },
		{ name: "coldCoat",				type: "cold", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("coat", "jeans"), desc: "코트" },
		{ name: "coldHoodie",			type: "cold", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("hoodie", "sweatpants"), desc: "후드티" },
		{ name: "coldSweater",			type: "cold", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("sweater", "sweatpants"), desc: "스웨터와 스웨트팬츠" },
		{ name: "rainCoat",				type: "rain", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("rain coat", "rain bottoms"), desc: "우비" },
		/* -------------------------------------------------------------------------------------------------------------------------------------------------- */
		{ name: "wildsFlannel",			type: "wilds", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("flannel", "jeans"), desc: "플란넬과 청바지" },
		{ name: "wildsWJumper",			type: "wilds", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("woolen jumper", "khakis"), desc: "양모 점퍼" },
		{ name: "wildsFJumper",			type: "wilds", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("fleece jumper", "khakis"), desc: "플리스 점퍼" },
		{ name: "wildsJacket",			type: "wilds", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("jacket", "khakis"), desc: "재킷과 카키 바지" },
		{ name: "forestCamo",			type: "forest", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("camo jacket", "camo bottoms"), desc: "위장용 사냥복" },
		/* -------------------------------------------------------------------------------------------------------------------------------------------------- */
		{ name: "brothelTrench",		type: "brothel", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("trench coat", "assless chaps"), desc: "트렌치코트" },
		{ name: "brothelVest",			type: "brothel", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("leather vest", "hot pants"), desc: "가죽 조끼" },
		{ name: "brothelHarness",		type: "brothel", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("leather harness", "leather trousers"), desc: "가죽 하네스" },
		{ name: "bathrobe",				type: "spa", gender: "n", outfit: 1, clothes: npcAssignClothesToSet("bathrobe", "bathrobe"), desc: "목욕 가운" },
		/* -------------------------------------------------------------------------------------------------------------------------------------------------- */
		{ name: "compoundLab",			type: "compoundLab", gender: "n", outfit: 1, clothes: npcAssignClothesToSet("lab coat", "lab trousers"), desc: "실험 가운" },
		{ name: "security",				type: "security", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("security vest", "security trousers"), desc: "경비 제복" },
		{ name: "doctor",				type: "hospital", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("doctor's coat", "white trousers"), desc: "의사 제복" },
		{ name: "nurse",				type: "hospital", gender: "f", outfit: 0, clothes: npcAssignClothesToSet("nurse's coat", "white skirt"), desc: "간호사 제복" },
		{ name: "patient",				type: "patient", gender: "n", outfit: 1, clothes: npcAssignClothesToSet("patient gown", "gown skirt"), desc: "환자복" },
		{ name: "jumpsuit",				type: "worker", gender: "n", outfit: 1, clothes: npcAssignClothesToSet("jumpsuit top", "jumpsuit trousers"), desc: "작업복" },
		{ name: "coveralls",			type: "worker", gender: "n", outfit: 1, clothes: npcAssignClothesToSet("coverall top", "coverall bottoms"), desc: "작업복" },
		/* -------------------------------------------------------------------------------------------------------------------------------------------------- */
		{ name: "maleUndies",			type: "undies", gender: "m", outfit: 0, clothes: npcAssignClothesToSet("naked", "briefs"), desc: "남성용 삼각팬티" },
		{ name: "femaleUndies",			type: "undies", gender: "f", outfit: 0, clothes: npcAssignClothesToSet("bra", "panties"), desc: "브라와 팬티" },
		/* -------------------------------------------------------------------------------------------------------------------------------------------------- */
		{ name: "dance",				type: "dance_studio", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("dance shirt", "dance shorts"), desc: "댄스복" },
		{ name: "maleBriar",			type: "Briar", gender: "m", outfit: 0, clothes: npcAssignClothesToSet("shirtless suit", "formal trousers"), desc: "맨몸에 입은 정장" },
		{ name: "femaleBriar",			type: "Briar", gender: "f", outfit: 1, clothes: npcAssignClothesToSet("low-neck dress", "cropped dress skirt"), desc: "가슴이 깊게 파인 드레스" },
		{ name: "riding",				type: "riding", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("riding top", "riding trousers"), desc: "승마복" },
		{ name: "ridingFormal",			type: "Remy", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("shadbelly coat", "chapette breeches"), desc: "정식 승마복" },
		{ name: "Eden",					type: "Eden", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("ramshackle hunting coat", "torn hunting trousers"), desc: "사냥복" },
		{ name: "Morgan",				type: "Morgan", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("ruined suit", "ruined trousers"), desc: "망가진 정장" },
		{ name: "maleLandry",			type: "Landry", gender: "m", outfit: 0, clothes: npcAssignClothesToSet("grey sweater", "dark trousers"), desc: "회색 스웨터" },
		{ name: "femaleLandry",			type: "Landry", gender: "f", outfit: 0, clothes: npcAssignClothesToSet("grey cardigan", "dark trousers"), desc: "회색 가디건" },
		{ name: "Whitney",				type: "Whitney", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("leather jacket", "torn jeans"), desc: "가죽 재킷" },
		{ name: "AlexJorts",			type: "Alex", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("flannel", "jorts"), desc: "플란넬과 청반바지" },
		{ name: "AlexSkirt",			type: "Alex", gender: "f", outfit: 0, clothes: npcAssignClothesToSet("flannel", "skirt"), desc: "플란넬과 치마" },
		{ name: "maleAlexSleep",		type: "Alex", gender: "m", outfit: 0, clothes: npcAssignClothesToSet("t-shirt", "boxers"), desc: "티셔츠와 트렁크 팬티" },
		{ name: "femaleAlexSleep",		type: "Alex", gender: "f", outfit: 0, clothes: npcAssignClothesToSet("t-shirt", "boyshorts"), desc: "티셔츠와 보이쇼츠" },
		/* -------------------------------------------------------------------------------------------------------------------------------------------------- */
		{ name: "malePlantSpring",		type: "plantSpring", gender: "m", outfit: 1, clothes: npcAssignClothesToSet("jacaranda vest", "bloomers"), desc: "잎사귀 옷" },
		{ name: "femalePlantSpring",	type: "plantSpring", gender: "f", outfit: 1, clothes: npcAssignClothesToSet("blossoming growths", "bell flower dress"), desc: "잎사귀 옷" },
		{ name: "plantSummer",			type: "plantSummer", gender: "n", outfit: 1, clothes: npcAssignClothesToSet("leaf shirt", "lotus skirt"), desc: "잎사귀 옷" },
		{ name: "plantAutumn",			type: "plantAutumn", gender: "n", outfit: 1, clothes: npcAssignClothesToSet("leaf corset", "leaf skirt"), desc: "잎사귀 옷" },
		{ name: "plantWinter",			type: "plantWinter", gender: "n", outfit: 1, clothes: npcAssignClothesToSet("pine top", "evergreen dress"), desc: "잎사귀 옷" },
		{ name: "plantGeneric",			type: "plant", gender: "n", outfit: 1, clothes: npcAssignClothesToSet("plant top", "plant skirt"), desc: "잎사귀 옷과 치마" },
		/* -------------------------------------------------------------------------------------------------------------------------------------------------- */
		{ name: "robinGiftShirt",		type: "robinGift", gender: "m", outfit: 0, clothes: npcAssignClothesToSet("shirt", "shorts"), desc: "셔츠와 반바지" },
		{ name: "robinGiftSundress",	type: "robinGift", gender: "f", outfit: 1, clothes: npcAssignClothesToSet("sundress", "sundress skirt"), desc: "선드레스" },
		{ name: "robinGiftTux",			type: "robinGift", gender: "m", outfit: 0, clothes: npcAssignClothesToSet("tuxedo", "tuxedo trousers"), desc: "턱시도" },
		{ name: "robinGiftGown",		type: "robinGift", gender: "f", outfit: 1, clothes: npcAssignClothesToSet("gothic gown", "gothic gown"), desc: "고딕 드레스" },
		{ name: "robinGiftKimono",		type: "robinGift", gender: "n", outfit: 1, clothes: npcAssignClothesToSet("kimono", "kimono bottoms"), desc: "기모노" },
		{ name: "robinGiftChristmas",	type: "robinGift", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("christmas top", "christmas bottoms"), desc: "크리스마스 옷" },
		{ name: "robinLewdRibbons",		type: "robinRibbons", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("ribbons", "ribbons"), desc: "리본 다발" },
		/* -------------------------------------------------------------------------------------------------------------------------------------------------- */
		{ name: "pyjamas",				type: "sleep", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("pyjama shirt", "pyjama bottoms"), desc: "파자마 셔츠와 바지" },
		{ name: "ghost",				type: "halloween", gender: "n", outfit: 1, clothes: npcAssignClothesToSet("ghost sheet", "ghost sheet"), desc: "유령 코스튬" },
		{ name: "vampire",				type: "halloween", gender: "m", outfit: 0, clothes: npcAssignClothesToSet("vampire jacket", "vampire trousers"), desc: "뱀파이어 코스튬" },
		{ name: "witch",				type: "halloween", gender: "f", outfit: 1, clothes: npcAssignClothesToSet("witch dress", "witch dress skirt"), desc: "마녀 코스튬" },
		{ name: "moonRobe",				type: "Wraith", gender: "n", outfit: 1, clothes: npcAssignClothesToSet("flowing robe", "flowing robe"), desc: "나부끼는 로브" },
		/* -------------------------------------------------------------------------------------------------------------------------------------------------- */
		{ name: "sweater",				type: "sweater", gender: "n", outfit: 0, clothes: npcAssignClothesToSet("sweater", "jeans"), desc: "스웨터와 청바지" },
		/* -------------------------------------------------------------------------------------------------------------------------------------------------- */
		{ name: "gloomyTunic",			type: "Gwylan", gender: "n", outfit: 1, clothes: npcAssignClothesToSet("belted tunic", "belted tunic skirt"), desc: "튜닉"},
		{ name: "gwylanTown",			type: "town", gender: "n", outfit: 1, clothes: npcAssignClothesToSet("turtleneck", "slacks"), desc: "터틀넥과 슬랙스"},
		{ name: "gwylanCold",			type: "cold", gender: "n", outfit: 1, clothes: npcAssignClothesToSet("winter jacket", "black trousers"), desc: "겨울 코트와 바지"},
		{ name: "vintageMale",			type: "formal", gender: "m", outfit: 1, clothes: npcAssignClothesToSet("vintage pantsuit", "vintage pants"), desc: "빈티지 바지 정장"},
		{ name: "vintageFemale",		type: "formal", gender: "f", outfit: 1, clothes: npcAssignClothesToSet("vintage skirtsuit", "vintage skirt"), desc: "빈티지 치마 정장"},
		{ name: "ritualRobes",			type: "Gwylan", gender: "n", outfit: 1, clothes: npcAssignClothesToSet("ritual robes", "ritual skirt"), desc: "의식용 로브"},
		/* -------------------------------------------------------------------------------------------------------------------------------------------------- */
		{ name: "maleDefault",			type: "default", gender: "m", outfit: 0, clothes: npcAssignClothesToSet("shirt", "trousers"), desc: "셔츠와 바지" },
		{ name: "femaleDefault",		type: "default", gender: "f", outfit: 0, clothes: npcAssignClothesToSet("shirt", "skirt"), desc: "셔츠와 치마" },
	];
}
