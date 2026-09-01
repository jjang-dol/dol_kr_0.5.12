/* Turns a new pregnancy record into its children/litter. */

/**
 * The child body base a donor's species produces: "human", "wolf", or "hawk".
 *
 * generateChildren calls this to set the litter's body from the donor.
 * resolvePaternity calls this to test a suspected donor's species against the litter.
 *
 * @param {DonorSpecies} donorSpecies the donor's species
 * @returns {ChildSpecies}
 */
function childBaseSpecies(donorSpecies) {
	switch (donorSpecies) {
		case "human":
			return "human";
		case "wolf":
		case "wolfboy":
		case "wolfgirl":
			return "wolf";
		case "hawk":
		case "harpy":
			return "hawk";
		default:
			throw new Error(`unknown donor species "${donorSpecies}"`);
	}
}
window.childBaseSpecies = childBaseSpecies;

/**
 * Whether the donor is a monster person, which gives the child the "monster" trait.
 * A monster person's species name always differs from their base species name.
 *
 * @param {DonorSpecies} donorSpecies
 * @returns {boolean}
 */
function isMonsterPerson(donorSpecies) {
	return childBaseSpecies(donorSpecies) !== donorSpecies;
}
window.isMonsterPerson = isMonsterPerson;

/**
 * Litter size for a species, drawn from its weighted distribution in childGen.
 *
 * @param {ChildSpecies} base child base species
 * @returns {number}
 */
function rollLitterSize(base) {
	return weightedRandom(...PregnancyConstants.childGen[`${base}LitterWeights`]);
}
window.rollLitterSize = rollLitterSize;

/**
 * The child gene pool's name for a parent's skin colour.
 *
 * @param {string} skincolour a parent's skincolour
 * @returns {string}
 */
function parentSkinColour(skincolour) {
	if (skincolour === "black") return "dark";
	if (skincolour === "white") return "light";
	return skincolour;
}

/**
 * A parent's gender and colours, read live from their name.
 * The parent is the PC, a named NPC, a generated one stored under their own key, or a donor
 * known by name alone with no details anywhere.
 *
 * @param {NpcNames|"pc"|string} name a named NPC, "pc", or a $storedNPCs key
 * @returns {ChildParent}
 */
function resolveChildParent(name) {
	if (name === "pc") {
		return { gender: V.player.sex, hairColour: V.naturalhaircolour, eyeColour: V.eyeselect, skinColour: Skin.color.natural };
	}
	const npc = C.npc[name];
	if (npc) {
		const hasVagina = npc.vagina !== "none";
		const hasPenis = npc.penis !== "none";
		let gender;
		if (hasVagina && hasPenis) gender = "h";
		else if (hasVagina) gender = "f";
		else if (hasPenis) gender = "m";
		else throw new Error(`parent "${name}" has no genitals`);
		return { gender, hairColour: npc.hairColour, eyeColour: npc.eyeColour, skinColour: parentSkinColour(npc.skincolour) };
	}
	const stored = V.storedNPCs[name];
	if (stored) {
		return { gender: stored.npc.gender, hairColour: null, eyeColour: null, skinColour: parentSkinColour(stored.npc.skincolour) };
	}
	return { gender: null, hairColour: null, eyeColour: null, skinColour: null };
}
window.resolveChildParent = resolveChildParent;

/**
 * A child's gender. Even 50/50 male/female split.
 * A herm parent gives a 1/4 chance of a herm child, or 100% chance for herm self-pregnancy.
 *
 * @param {ChildParent} carrierParent
 * @param {ChildParent} donorParent
 * @param {boolean} sameParent
 * @returns {"m"|"f"|"h"}
 */
function rollChildGender(carrierParent, donorParent, sameParent) {
	const parentIsHerm = carrierParent.gender === "h" || donorParent.gender === "h";
	if (parentIsHerm && (sameParent || random(1, 100) <= PregnancyConstants.childGen.hermChildPercent)) return "h";
	return random(0, 1) === 0 ? "m" : "f";
}
window.rollChildGender = rollChildGender;

/**
 * The PC's beast and divine transformations, passed to their litter.
 *
 * @returns {{beast: "cat"|"cow"|"wolf"|"bird"|"fox"|null, divine: "angel"|"fallen"|"demon"|null}}
 */
function pcHeritage() {
	let beast = null;
	if (V.cat >= 6) beast = "cat";
	else if (V.cow >= 6) beast = "cow";
	else if (V.wolfgirl >= 6) beast = "wolf";
	else if (V.harpy >= 6) beast = "bird";
	else if (V.fox >= 6) beast = "fox";

	// Fallen needs to be checked before angel
	let divine = null;
	if (V.fallenangel >= 4) divine = "fallen";
	else if (V.angel >= 6) divine = "angel";
	else if (V.demon >= 6) divine = "demon";

	return { beast, divine };
}
window.pcHeritage = pcHeritage;

/**
 * A child's size, weighted toward the pc's build. Half the time it matches, otherwise it's a step
 * smaller or larger. NPC carriers with no build roll evenly.
 *
 * @param {0|1|2|3|undefined} bodySize the carrier's build
 * @returns {"tiny"|"small"|"normal"|"large"}
 */
function rollChildSize(bodySize) {
	const childSizes = PregnancyConstants.genePool.childSize;
	if (bodySize === undefined) return childSizes.random();
	const roll = random(1, 100);
	const step = roll <= PregnancyConstants.childGen.childSizeSameMax ? 0 : roll <= PregnancyConstants.childGen.childSizeSmallerMax ? -1 : 1;
	return childSizes[Math.clamp(bodySize + step, 0, childSizes.length - 1)];
}

/**
 * A child's trait, taken from one parent at random, with a fallback when that parent has none (an unknown donor).
 *
 * @param {*} carrierVal the carrier parent's value for this trait
 * @param {*} donorVal the donor parent's value for this trait
 * @param {Function} fallback produces a value when the donor is not known
 * @returns {*} the inherited trait, or fallback() trait if donor is not known
 */
function inheritTrait(carrierVal, donorVal, fallback) {
	const inherited = random(0, 1) === 0 ? carrierVal : donorVal;
	return inherited || fallback();
}

/**
 * A child's eye colour: inherit from a parent, or roll the eye-colour pool for an unknown parent.
 *
 * @param {ChildParent} carrierParent
 * @param {ChildParent} donorParent
 * @returns {string}
 */
function rollChildEyeColour(carrierParent, donorParent) {
	return inheritTrait(carrierParent.eyeColour, donorParent.eyeColour, () => PregnancyConstants.genePool.eyeColour.random());
}
window.rollChildEyeColour = rollChildEyeColour;

/**
 * A child's skin colour: inherit from a parent, or fall back to the darkSkinChance roll.
 *
 * @param {ChildParent} carrierParent
 * @param {ChildParent} donorParent
 * @returns {string}
 */
function rollChildSkinColour(carrierParent, donorParent) {
	return inheritTrait(carrierParent.skinColour, donorParent.skinColour, () => (random(1, 100) <= V.settings.darkSkinChance ? "dark" : "light"));
}
window.rollChildSkinColour = rollChildSkinColour;

/**
 * A child's hair colour. Wolf pups take a fur colour, hawk chicks take a feather colour,
 * and humans inherit a parent's hair or roll the hair pool.
 *
 * @param {ChildSpecies} base
 * @param {ChildParent} carrierParent
 * @param {ChildParent} donorParent
 * @param {string[]} wolfFur the fur colours a wolf pup can be this litter
 * @returns {string}
 */
function rollChildHairColour(base, carrierParent, donorParent, wolfFur) {
	if (base === "wolf") return wolfFur.random();
	if (base === "hawk") return PregnancyConstants.genePool.hawkFeather.random();
	return inheritTrait(carrierParent.hairColour, donorParent.hairColour, () => PregnancyConstants.genePool.hairColour.random());
}
window.rollChildHairColour = rollChildHairColour;

/**
 * Returns colour if given, otherwise a random eye colour from the gene pool.
 *
 * @param {string} [colour] a specific eye colour, or falsy to roll one
 * @returns {string}
 */
function eyeColourCalc(colour) {
	if (colour) return colour;
	return PregnancyConstants.genePool.eyeColour.random();
}
window.eyeColourCalc = eyeColourCalc;

/**
 * Create the child/children for a new pregnancy record. Called once per pregnancy from createPregnancy.
 *
 * @param {number} pregnancyId
 */
function generateChildren(pregnancyId) {
	const pregnancy = V.pregnancies[pregnancyId];
	const base = childBaseSpecies(pregnancy.donorSpecies);
	const isMonster = isMonsterPerson(pregnancy.donorSpecies);
	let litterSize = rollLitterSize(base);
	// A harpy PC grows their clutch in advance (giveHarpyEggs). Its count replaces the rolled
	// litter size. createPregnancy clears the clutch afterwards.
	if (base === "hawk" && pregnancy.carrier === "pc" && V.harpyEggs) {
		litterSize = V.harpyEggs.count;
	}
	const carrierParent = resolveChildParent(pregnancy.carrier);
	const donorParent = resolveChildParent(pregnancy.donor);
	const sameParent = pregnancy.carrier === pregnancy.donor;
	// The player's beast/divine transformations only pass down when the player is actually a parent.
	const heritage = pregnancy.carrier === "pc" || pregnancy.donor === "pc" ? pcHeritage() : { beast: null, divine: null };
	const bodySize = pregnancy.carrier === "pc" ? V.bodysize : undefined;
	// The Black Wolf's pups are always black. Every other wolf rolls the fur pool.
	const wolfFur = pregnancy.carrier === "Black Wolf" || pregnancy.donor === "Black Wolf" ? ["black"] : PregnancyConstants.genePool.wolfFur;

	// Identical twins/triplets rolling for humans.
	// Self-impregnation births always make identical twins/triplets.
	// Twins have a 1/3 chance of being identical.
	// Triplets have a ~2/3 chance of being all fraternal, ~22% chance of two being identical, and ~11% chance of all being identical.
	let identicalCount = 0;
	if (base === "human" && litterSize > 1) {
		if (sameParent) {
			identicalCount = litterSize;
		} else if (random(1, 100) <= PregnancyConstants.childGen.identicalMultiplePercent) {
			identicalCount = 2;
			if (litterSize > 2 && random(1, 100) <= PregnancyConstants.childGen.identicalMultiplePercent) identicalCount = 3;
		}
	}

	const rollChildTraits = () => {
		const eyeColour = rollChildEyeColour(carrierParent, donorParent);
		const skinColour = rollChildSkinColour(carrierParent, donorParent);
		const hairColour = rollChildHairColour(base, carrierParent, donorParent, wolfFur);
		const features = {
			beastTransform: heritage.beast,
			divineTransform: heritage.divine,
			hairColour,
			eyeColour,
			skinColour,
			size: rollChildSize(bodySize),
		};
		if (isMonster) features.monster = "monster";
		return { gender: rollChildGender(carrierParent, donorParent, sameParent), features };
	};

	// Identical siblings are copies of one generated child and share an id that links them.
	// Every other child is rolled on its own.
	// identicalCount is 0, 2, or 3 (never exactly 1), so "there are identicals" is a single condition.
	const hasIdenticals = identicalCount > 1;
	const identicalId = hasIdenticals ? pregnancyId : null;
	const original = hasIdenticals ? rollChildTraits() : null;
	for (let i = 0; i < litterSize; i++) {
		if (i < identicalCount) {
			createChild(pregnancyId, base, clone(original.features), original.gender, identicalId);
		} else {
			const child = rollChildTraits();
			createChild(pregnancyId, base, child.features, child.gender, null);
		}
	}
}
window.generateChildren = generateChildren;

/**
 * Generates a baby's name from name pools.
 *
 * @param {string} name the child's name
 * @param {"m"|"f"|"h"} gender determines which name pool the name pulls from
 * @param {number} childId the child being named
 * @returns {string} the name, or "Unnamed" if every name is taken
 */
function generateBabyName(name, gender, childId) {
	if (!!name && name !== "Unnamed") {
		return name.replace(/[^a-zA-ZÀ-ÿ\u4e00-\u9fa5 ]+/g, "").substring(0, 30);
	}
	const usedNames = new Set();
	getBornChildren().forEach(child => {
		if (child.childId !== childId && child.name !== "Unnamed") usedNames.add(child.name);
	});
	let names = [];
	switch (gender) {
		case "m":
			// eslint-disable-next-line prettier/prettier
			names = ['Addison','Algernon','Allan','Alpha','Anton','Axel','Bazza','Benton','Bernard','Brand','Brett','Cale','Calvin','Carol','Chuck','Chucky','Clay','Cornelius','Crofton','Darden','Dax','Den','Deven','Digby','Don','Douglas','Driscoll','Duane','Duke','Edmund','Elsdon','Freeman','Gabby','Garland','George','Godfrey','Graeme','Grier','Hammond','Harlan','Hendrix','Herman','Hewie','Hugh','Indiana','Ingram','Jackie','Jasper','Jaxon','Jaycob','Jere','Kamden','Kelcey','Kendall','Kevin','Kian','Kieran','Kirby','Lanny','Lawson','Laz','Leland','Levi','Lindon','Linton','Lionel','Lonny','Lucas','Manley','Maverick','Merlyn','Michael','Monty','Murphy','Nate','Ned','Nowell','Odell','Ollie','Osbert','Otto','Paget','Pip','Quintin','Raymund','Ricky','Robert','Ross','Rudolph','Sammy','Scotty','Stacey','Thad','Theodore','Tommy','Trey','Tyson','Val','Vernon','Willis','Wilmer','Winton','Wisdom'];
			break;
		case "f":
			// eslint-disable-next-line prettier/prettier
			names = ['Adelyn','Alene','Alexa','Aliah','Alyson','Angelica','Annalise','Annora','Azaria','Bessie','Betsy','Bettie','Biddy','Brianne','Camellia','Camille','Camryn','Caroline','Chastity','Chelsea','Chelsey','Cindy','Clematis','Darla','Deb','Debby','Dortha','Eleanora','Eliana','Elsabeth','Elyse','Emerson','Emmeline','Erica','Ettie','Eustacia','Evelyn','Gabrielle','Georgiana','Harper','Harrietta','Haylie','Haze','Hunter','Hyacinth','Indiana','Indie','Jacquetta','Janie','Jannine','Jonquil','Kaelyn','Kam','Khloe','Kolleen','Korrine','Kourtney','Krystine','Lavena','Leeann','Lela','Lesleigh','Lindsie','Lorena','Lucile','Luvinia','Lyn','Lyssa','Madeleine','Marian','Maudie','Maureen','Maxine','Melody','Milani','Misti','Nat','Noelle','Ottoline','Paige','Pauline','Payton','Pearl','Perlie','Petronel','Phebe','Posie','Praise','Rexana','Serena','Sharalyn','Sharla','Shauna','Sky','Sybella','Tracy','Tresha','Trudi','Wallis','Wilda','Yvette'];
			break;
	}
	// eslint-disable-next-line prettier/prettier
	names.pushUnique('Aaren','Addison','Alex','Alpha','Andie','Arden','Ariel','Artie','Ashton','Aston','Aubrey','Beau','Bernie','Bertie','Beverly','Bobbie','Brooklyn','Caelan','Cameron','Carol','Cary','Casey','Channing','Charley','Cherokee','Cheyenne','Coby','Codie','Collyn','Cyan','Dale','Dallas','Dana','Darby','Dee','Derby','Devan','Devin','Emmerson','Emory','Finley','Flannery','Florence','Gabby','Garnet','Garnett','Gray','Hadyn','Harlow','Hollis','Jackie','Jade','Jae','Jaiden','Johnnie','Joyce','Justice','Kam','Kelcey','Kelsey','Leslie','Lindsey','Lorin','Lyric','Maitland','Marley','McKinley','Merlyn','Murphy','Nicky','Oakley','Odell','Pacey','Paget','Peyton','Presley','Rain','Raleigh','Reagan','Regan','Reilly','Remington','Robbie','Rory','Royale','Sage','Sam','Schuyler','Selby','Shae','Shaye','Shelly','Skylar','Sloan','Stacey','Stacy','Tayler','Tommie','Tracey','Tristen','Tristin','Val');
	names = names.filter(name => !usedNames.has(name));

	let result = names[random(0, names.length - 1)];
	if (!result) result = "Unnamed";
	return result;
}
window.generateBabyName = generateBabyName;

/**
 * Korean display names for the generateBabyName() pools above. child.name in the save stays
 * the English pool name (save compatibility with the original game, and it's what usedNames/
 * name-matching logic above compares against) -- this dict only translates it for display.
 * A player-typed custom name has no entry here, so getBabyNameKr falls through to the
 * original string unchanged.
 */
window.KR = window.KR || {};
window.KR.babyNameDict = {
	"Aaren": "에런", "Addison": "애디슨", "Adelyn": "애덜린", "Alene": "얼린",
	"Alex": "알렉스", "Alexa": "알렉사", "Algernon": "앨저넌", "Aliah": "얼리아",
	"Allan": "앨런", "Alpha": "알파", "Alyson": "앨리슨", "Andie": "앤디",
	"Angelica": "앤젤리카", "Annalise": "애널리스", "Annora": "어노라", "Anton": "앤턴",
	"Arden": "아든", "Ariel": "아리엘", "Artie": "아티", "Ashton": "애슈턴",
	"Aston": "애스턴", "Aubrey": "오브리", "Axel": "액셀", "Azaria": "아자리아",
	"Bazza": "배자", "Beau": "보", "Benton": "벤턴", "Bernard": "버나드",
	"Bernie": "버니", "Bertie": "버티", "Bessie": "베시", "Betsy": "벳시",
	"Bettie": "베티", "Beverly": "베벌리", "Biddy": "비디", "Bobbie": "바비",
	"Brand": "브랜드", "Brett": "브렛", "Brianne": "브리앤", "Brooklyn": "브루클린",
	"Caelan": "케일런", "Cale": "케일", "Calvin": "캘빈", "Camellia": "커멜리아",
	"Cameron": "캐머런", "Camille": "카밀", "Camryn": "캠린", "Carol": "캐럴",
	"Caroline": "캐럴라인", "Cary": "캐리", "Casey": "케이시", "Channing": "채닝",
	"Charley": "찰리", "Chastity": "채스티티", "Chelsea": "첼시", "Chelsey": "첼시",
	"Cherokee": "체로키", "Cheyenne": "샤이엔", "Chuck": "척", "Chucky": "척키",
	"Cindy": "신디", "Clay": "클레이", "Clematis": "클레머티스", "Coby": "코비",
	"Codie": "코디", "Collyn": "콜린", "Cornelius": "코닐리어스", "Crofton": "크로프턴",
	"Cyan": "사이언", "Dale": "데일", "Dallas": "댈러스", "Dana": "데이나",
	"Darby": "다비", "Darden": "다든", "Darla": "달라", "Dax": "댁스",
	"Deb": "데브", "Debby": "데비", "Dee": "디", "Den": "덴",
	"Derby": "더비", "Devan": "데번", "Deven": "데번", "Devin": "데빈",
	"Digby": "딕비", "Don": "돈", "Dortha": "도서", "Douglas": "더글러스",
	"Driscoll": "드리스콜", "Duane": "듀언", "Duke": "듀크", "Edmund": "에드먼드",
	"Eleanora": "엘레아노라", "Eliana": "엘리아나", "Elsabeth": "엘사베스", "Elsdon": "엘스던",
	"Elyse": "엘리스", "Emerson": "에머슨", "Emmeline": "에멀린", "Emmerson": "에머슨",
	"Emory": "에모리", "Erica": "에리카", "Ettie": "에티", "Eustacia": "유스테이샤",
	"Evelyn": "에벌린", "Finley": "핀리", "Flannery": "플래너리", "Florence": "플로렌스",
	"Freeman": "프리먼", "Gabby": "개비", "Gabrielle": "가브리엘", "Garland": "갈런드",
	"Garnet": "가넷", "Garnett": "가넷", "George": "조지", "Georgiana": "조지아나",
	"Godfrey": "갓프리", "Graeme": "그레엄", "Gray": "그레이", "Grier": "그리어",
	"Hadyn": "헤이든", "Hammond": "해먼드", "Harlan": "할런", "Harlow": "할로",
	"Harper": "하퍼", "Harrietta": "해리에타", "Haylie": "헤일리", "Haze": "헤이즈",
	"Hendrix": "헨드릭스", "Herman": "허먼", "Hewie": "휴이", "Hollis": "홀리스",
	"Hugh": "휴", "Hunter": "헌터", "Hyacinth": "하이어신스", "Indiana": "인디애나",
	"Indie": "인디", "Ingram": "잉그럼", "Jackie": "재키", "Jacquetta": "자케타",
	"Jade": "제이드", "Jae": "제이", "Jaiden": "제이든", "Janie": "제이니",
	"Jannine": "재닌", "Jasper": "재스퍼", "Jaxon": "잭슨", "Jaycob": "제이컵",
	"Jere": "제리", "Johnnie": "자니", "Jonquil": "존퀼", "Joyce": "조이스",
	"Justice": "저스티스", "Kaelyn": "케일린", "Kam": "캠", "Kamden": "캠든",
	"Kelcey": "켈시", "Kelsey": "켈시", "Kendall": "켄들", "Kevin": "케빈",
	"Khloe": "클로이", "Kian": "키안", "Kieran": "키어런", "Kirby": "커비",
	"Kolleen": "콜린", "Korrine": "코린", "Kourtney": "코트니", "Krystine": "크리스틴",
	"Lanny": "래니", "Lavena": "러비나", "Lawson": "로슨", "Laz": "래즈",
	"Leeann": "리앤", "Lela": "릴라", "Leland": "릴런드", "Lesleigh": "레슬리",
	"Leslie": "레슬리", "Levi": "리바이", "Lindon": "린던", "Lindsey": "린지",
	"Lindsie": "린지", "Linton": "린턴", "Lionel": "라이오넬", "Lonny": "로니",
	"Lorena": "로레나", "Lorin": "로린", "Lucas": "루카스", "Lucile": "루실",
	"Luvinia": "루비니아", "Lyn": "린", "Lyric": "리릭", "Lyssa": "리사",
	"Madeleine": "매들린", "Maitland": "메이틀런드", "Manley": "맨리", "Marian": "매리언",
	"Marley": "말리", "Maudie": "모디", "Maureen": "모린", "Maverick": "매버릭",
	"Maxine": "맥신", "McKinley": "매킨리", "Melody": "멜로디", "Merlyn": "멀린",
	"Michael": "마이클", "Milani": "밀라니", "Misti": "미스티", "Monty": "몬티",
	"Murphy": "머피", "Nat": "냇", "Nate": "네이트", "Ned": "네드",
	"Nicky": "니키", "Noelle": "노엘", "Nowell": "노웰", "Oakley": "오클리",
	"Odell": "오델", "Ollie": "올리", "Osbert": "오스버트", "Otto": "오토",
	"Ottoline": "오톨린", "Pacey": "페이시", "Paget": "패짓", "Paige": "페이지",
	"Pauline": "폴린", "Payton": "페이턴", "Pearl": "펄", "Perlie": "펄리",
	"Petronel": "페트로넬", "Peyton": "페이턴", "Phebe": "피비", "Pip": "핍",
	"Posie": "포지", "Praise": "프레이즈", "Presley": "프레슬리", "Quintin": "퀸틴",
	"Rain": "레인", "Raleigh": "롤리", "Raymund": "레이먼드", "Reagan": "레이건",
	"Regan": "리건", "Reilly": "라일리", "Remington": "레밍턴", "Rexana": "렉사나",
	"Ricky": "리키", "Robbie": "로비", "Robert": "로버트", "Rory": "로리",
	"Ross": "로스", "Royale": "로열", "Rudolph": "루돌프", "Sage": "세이지",
	"Sam": "샘", "Sammy": "새미", "Schuyler": "스카일러", "Scotty": "스카티",
	"Selby": "셀비", "Serena": "세레나", "Shae": "셰이", "Sharalyn": "샤랄린",
	"Sharla": "샬라", "Shauna": "숀아", "Shaye": "셰이", "Shelly": "셸리",
	"Sky": "스카이", "Skylar": "스카일러", "Sloan": "슬론", "Stacey": "스테이시",
	"Stacy": "스테이시", "Sybella": "시벨라", "Tayler": "테일러", "Thad": "태드",
	"Theodore": "테오도어", "Tommie": "토미", "Tommy": "토미", "Tracey": "트레이시",
	"Tracy": "트레이시", "Tresha": "트레샤", "Trey": "트레이", "Tristen": "트리스텐",
	"Tristin": "트리스틴", "Trudi": "트루디", "Tyson": "타이슨", "Val": "발",
	"Vernon": "버논", "Wallis": "월리스", "Wilda": "윌다", "Willis": "윌리스",
	"Wilmer": "윌머", "Winton": "윈턴", "Wisdom": "위즈덤", "Yvette": "이벳",
	"Unnamed": "이름없음",
};

/**
 * Korean display name for a stored child.name. Falls back to the original string for anything
 * not in the pool above (a player-typed custom name).
 *
 * @param {string} name the stored child.name value
 * @returns {string}
 */
window.KR.getBabyNameKr = function(name) {
	return window.KR.babyNameDict[name] || name;
};
