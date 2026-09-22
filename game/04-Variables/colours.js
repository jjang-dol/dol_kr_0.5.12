setup.colours = {
	// Canvas renderer filters applied to different sprite palettes
	sprite_prefilters: {
		grayscale: {
			// For grayscale sprites with #808080 base
			desaturate: false,
			brightness: 0.0,
			contrast: 1.0,
		},
		hair: {
			desaturate: true,
			brightness: 0.0,
			contrast: 1.0,
		},
		hair_fringe: {
			desaturate: true,
			brightness: 0.0,
			contrast: 1.0,
		},
		brows: {
			desaturate: true,
			brightness: 0.0,
			contrast: 1.0,
		},
		pbhair: {
			desaturate: true,
			brightness: 0.0,
			contrast: 1.0,
		},
		eyes: {
			desaturate: true,
			brightness: 0.0,
			contrast: 1.0,
		},
		clothes: {
			// For red-base clothes
			desaturate: true,
			brightness: 0.4,
			contrast: 1.0,
		},
		clothes_bright: {
			// For red-base clothes with brighter, hair-like palette
			desaturate: true,
			brightness: 0.0,
			contrast: 1.0,
		},
		mascara: {
			desaturate: true,
			brightness: 0.4,
			contrast: 1.0,
		},
		lipstick: {
			desaturate: true,
			brightness: 0.4,
			contrast: 1.0,
		},
		eyeshadow: {
			desaturate: true,
			brightness: 0.4,
			contrast: 1.0,
		},
		condom: {
			desaturate: true,
			brightness: 0.4,
			contrast: 1.0,
		},
	},

	// Empty collections are populated later in this file
	hair: [],
	hair_map: {}, // Maps are auto-generated in the end of file
	hair_default: {
		// Default canvas filter options
		blendMode: "hard-light",
	},
	eyes: [],
	eyes_map: {},
	eyes_default: {
		blendMode: "hard-light",
	},
	clothes: [],
	clothes_map: {},
	clothes_default: {
		blendMode: "hard-light",
	},
	mascara: [],
	mascara_map: {},
	mascara_default: {
		blendMode: "hard-light",
	},
	blusher: [],
	blusher_map: {},
	blusher_default: {
		blendMode: "hard-light",
	},
	lipstick: [],
	lipstick_map: {},
	lipstick_default: {
		blendMode: "hard-light",
	},
	eyeshadow: [],
	eyeshadow_map: {},
	eyeshadow_default: {
		blendMode: "hard-light",
	},
	condom: [],
	condom_map: {},
	condom_default: {
		blendMode: "hard-light",
	},
	tentacle: [],
	tentacle_map: {},
	tentacle_default: {
		blendMode: "hard-light",
	},

	skin_options: {
		light: {
			gradient: ["#ffffff", "#ffd2ac"],
			blendMode: "multiply",
			desaturate: false,
		},
		medium: {
			gradient: ["#ffd2ac", "#8a614d"],
			blendMode: "multiply",
			desaturate: false,
		},
		dark: {
			gradient: ["#8a614d", "#39241a"],
			blendMode: "multiply",
			desaturate: false,
		},
		gyaru: {
			gradient: ["#ffffff", "#ffd2ac", "#8a614d", "#39241a"],
			blendMode: "multiply",
			desaturate: false,
		},
		ylight: {
			gradient: ["#f0ffe6", "#f0e4bc"],
			blendMode: "multiply",
			desaturate: false,
		},
		ymedium: {
			gradient: ["#f0e4bc", "#8e7f68"],
			blendMode: "multiply",
			desaturate: false,
		},
		ydark: {
			gradient: ["#8e7f68", "#483f35"],
			blendMode: "multiply",
			desaturate: false,
		},
		ygyaru: {
			gradient: ["#f0ffe6", "#f0e4bc", "#8e7f68", "#483f35"],
			blendMode: "multiply",
			desaturate: false,
		},
		glight: {
			gradient: ["#fdf4d7", "#ffc482"],
			blendMode: "multiply",
			desaturate: false,
		},
		gmedium: {
			gradient: ["#ffc482", "#9a6b36"],
			blendMode: "multiply",
			desaturate: false,
		},
		gdark: {
			gradient: ["#9a6b36", "#513400"],
			blendMode: "multiply",
			desaturate: false,
		},
		ggyaru: {
			gradient: ["#fdf4d7", "#ffc482", "#9a6b36", "#513400"],
			blendMode: "multiply",
			desaturate: false,
		},
		rlight: {
			gradient: ["#f7e4e0", "#ebae8a"],
			blendMode: "multiply",
			desaturate: false,
		},
		rmedium: {
			gradient: ["#ebae8a", "#8d5244"],
			blendMode: "multiply",
			desaturate: false,
		},
		rdark: {
			gradient: ["#8d5244", "#482616"],
			blendMode: "multiply",
			desaturate: false,
		},
		rgyaru: {
			gradient: ["#f7e4e0", "#ebae8a", "#8d5244", "#482616"],
			blendMode: "multiply",
			desaturate: false,
		},
		blight: {
			gradient: ["#ecf1f9", "#dcc6c6"],
			blendMode: "multiply",
			desaturate: false,
		},
		bmedium: {
			gradient: ["#dcc6c6", "#917376"],
			blendMode: "multiply",
			brightness: 0.1,
			desaturate: false,
		},
		bdark: {
			gradient: ["#917376", "#402f31"],
			blendMode: "multiply",
			desaturate: false,
		},
		bgyaru: {
			gradient: ["#ecf1f9", "#dcc6c6", "#917376", "#402f31"],
			blendMode: "multiply",
			desaturate: false,
		},
		ghost: {
			gradient: ["#ffffff", "#ffffff"],
			blendMode: "multiply",
			alpha: 0.6,
			desaturate: true,
		},
		// Same as above but without transparency. Used for sidebar.
		wraith: {
			gradient: ["#ffffff", "#ffffff"],
			blendMode: "multiply",
			desaturate: true,
		},
	},
	/*
	 * Get canvas filter for skin of given type and tan progression (0..1).
	 */
	getSkinFilter(type, tan) {
		const options = setup.colours.skin_options[type];
		return {
			blend: setup.colours.getSkinRgb(options, tan / 100),
			blendMode: options.blendMode,
			desaturate: options.desaturate,
			...(options.alpha && { alpha: options.alpha }),
		};
	},
	getSkinRgb(type, tan) {
		tan = Math.clamp(tan, 0, 1);
		if (!type.gradient) {
			Errors.report("Unknown skin gradient " + type);
			return "#ffffff";
		}
		return Renderer.lintRgbStaged(tan, type.gradient).toHexString();
	},
	/**
	 * Get CSS style filter that, when applied, transforms #FF0000 colour to a skin colour.
	 *
	 * @param {string} type One of [ light, medium, dark, gyaru, rlight, rmedium, rdark, ylight, ymedium, ydark, ygyaru, glight, gmedium, gdark, ggyaru, blight, bmedium, bdark, bgyaru ].
	 * @param {number} tan How tanned the skin is, where 0 = the lightest, 100 = full tan.
	 * @returns {string} - CSS filter value. Note: return string doesn't start with 'filter:', you have to prepend it yourself
	 * Return example: 'hue-rotate(50deg) saturate(0.40) brightness(0.60)'.
	 */
	getSkinCSSFilter(type, tan = 0) {
		const slidersValues = setup.skinColor[type];
		const ranges = window.ensureIsArray(slidersValues || setup.skinColor.light);

		const totalProgress = tan / 100;

		const scaledProgress = ranges.length * totalProgress;
		const rangeIndex = totalProgress === 1 ? ranges.length - 1 : Math.floor(scaledProgress);
		const progress = totalProgress === 1 ? 1 : scaledProgress - rangeIndex;

		const { hStart, hEnd, sStart, sEnd, bStart, bEnd } = ranges[rangeIndex];

		const hue = (hEnd - hStart) * progress + hStart;
		const saturation = (sEnd - sStart) * progress + sStart;
		const brightness = (bEnd - bStart) * progress + bStart;

		const hueCss = `hue-rotate(${hue}deg)`;
		const saturationCss = `saturate(${saturation.toFixed(2)})`;
		const brightnessCss = `brightness(${brightness.toFixed(2)})`;

		return `${hueCss} ${saturationCss} ${brightnessCss}`;
	},
};

/**
 * Hair colour record:
 * - variable:string - Value of variables
 * - name:string - Display name
 * - name_cap:string - Display name, capitalised
 * - csstext:string - CSS class added to text
 * - natural:boolean - Is option for natural hair
 * - dye:boolean - Is option for hair dyes
 * - canvasfilter:object - Canvas model filter.
 */
setup.colours.hair = [
	{
		variable: "random", // Only used at the start for a randomised colour
		name: "무작위",
		name_cap: "무작위",
		csstext: "Random",
		natural: true,
		dye: false,
		canvasfilter: {
			blend: "#f53d43",
		},
	},
	{
		variable: "red",
		name: "빨간색",
		name_cap: "빨간색",
		csstext: "red",
		natural: true,
		dye: true,
		canvasfilter: {
			blend: "#f53d43",
		},
	},
	{
		variable: "ebony",
		name: "에보니",
		name_cap: "에보니",
		csstext: "black",
		natural: false,
		dye: true,
		canvasfilter: {
			blend: "#302e2d",
			brightness: -0.3,
		},
	},
	{
		variable: "jetblack",
		name: "칠흑색",
		name_cap: "칠흑색",
		csstext: "black",
		natural: true,
		dye: true,
		canvasfilter: {
			blend: "#454545",
			brightness: -0.3,
		},
	},
	{
		variable: "black",
		name: "검은색",
		name_cap: "검은색",
		csstext: "black",
		natural: true,
		dye: true,
		canvasfilter: {
			blend: "#504949",
			brightness: -0.3,
		},
	},
	{
		variable: "blond",
		name: "금발",
		name_cap: "금발",
		csstext: "gold",
		natural: true,
		dye: true,
		canvasfilter: {
			blend: "#d5b43f",
		},
	},
	{
		variable: "softblond",
		name: "부드러운 금발",
		name_cap: "부드러운 금발",
		csstext: "softblond",
		natural: true,
		dye: true,
		canvasfilter: {
			blend: "#d1b761",
		},
	},
	{
		variable: "platinumblond",
		name: "백금발",
		name_cap: "백금발",
		csstext: "platinum",
		natural: true,
		dye: true,
		canvasfilter: {
			blend: "#ead27b",
		},
	},
	{
		variable: "golden",
		name: "황금색",
		name_cap: "황금색",
		csstext: "gold",
		natural: false,
		dye: true,
		canvasfilter: {
			blend: "#ffc800",
		},
	},
	{
		variable: "ashyblond",
		name: "애쉬 블론드",
		name_cap: "애쉬 블론드",
		csstext: "ashy",
		natural: true,
		dye: true,
		canvasfilter: {
			blend: "#b19981",
		},
	},
	{
		variable: "strawberryblond",
		name: "스트로베리 블론드",
		name_cap: "스트로베리 블론드",
		csstext: "strawberry",
		natural: true,
		dye: true,
		canvasfilter: {
			blend: "#eb9e47",
		},
	},
	{
		variable: "darkbrown",
		name: "어두운 갈색",
		name_cap: "어두운 갈색",
		csstext: "darkbrown",
		natural: true,
		dye: true,
		canvasfilter: {
			blend: "#784a3a",
			brightness: -0.3,
		},
	},
	{
		variable: "brown",
		name: "갈색",
		name_cap: "갈색",
		csstext: "brown",
		natural: true,
		dye: true,
		canvasfilter: {
			blend: "#8f6e56",
			brightness: -0.3,
		},
	},
	{
		variable: "copperbrown",
		name: "구리빛 갈색",
		name_cap: "구리빛 갈색",
		csstext: "copperbrown",
		natural: true,
		dye: true,
		canvasfilter: {
			blend: "#9c4f37",
			brightness: -0.3,
		},
	},
	{
		variable: "softbrown",
		name: "부드러운 갈색",
		name_cap: "부드러운 갈색",
		csstext: "softbrown",
		natural: true,
		dye: true,
		canvasfilter: {
			blend: "#bf7540",
			brightness: -0.3,
		},
	},
	{
		variable: "lightbrown",
		name: "밝은 갈색",
		name_cap: "밝은 갈색",
		csstext: "lightbrown",
		natural: true,
		dye: true,
		canvasfilter: {
			blend: "#e49b67",
			brightness: -0.3,
		},
	},
	{
		variable: "burntorange",
		name: "번트 오렌지",
		name_cap: "번트 오렌지",
		csstext: "burntorange",
		natural: true,
		dye: true,
		canvasfilter: {
			blend: "#e08d52",
			brightness: -0.3,
		},
	},
	{
		variable: "ginger",
		name: "진저",
		name_cap: "진저",
		csstext: "tangerine",
		natural: true,
		dye: true,
		canvasfilter: {
			blend: "#ff6a00",
		},
	},
	{
		variable: "bloodorange",
		name: "블러드 오렌지",
		name_cap: "블러드 오렌지",
		csstext: "bloodorange",
		natural: false,
		dye: true,
		canvasfilter: {
			blend: "#ff4000",
		},
	},
	{
		variable: "blue",
		name: "파란색",
		name_cap: "파란색",
		csstext: "bluehair",
		natural: false,
		dye: true,
		canvasfilter: {
			blend: "#3973ac",
			brightness: -0.3,
		},
	},
	{
		variable: "deepblue",
		name: "짙은 파란색",
		name_cap: "짙은 파란색",
		csstext: "deepblue",
		natural: false,
		dye: true,
		canvasfilter: {
			blend: "#1349b5",
			brightness: -0.3,
		},
	},
	{
		variable: "neonblue",
		name: "네온 블루",
		name_cap: "네온 블루",
		csstext: "neonblue",
		natural: false,
		dye: true,
		canvasfilter: {
			blend: "#00d5ff",
		},
	},
	{
		variable: "frostblue",
		name: "프로스트 블루",
		name_cap: "프로스트 블루",
		csstext: "frostblue",
		natural: false,
		dye: true,
		canvasfilter: {
			blend: "#b0c0f3",
		},
	},
	{
		variable: "green",
		name: "녹색",
		name_cap: "녹색",
		csstext: "greenhair",
		natural: false,
		dye: true,
		canvasfilter: {
			blend: "#007400",
		},
	},
	{
		variable: "darklime",
		name: "어두운 라임색",
		name_cap: "어두운 라임색",
		csstext: "darklime",
		natural: false,
		dye: true,
		canvasfilter: {
			blend: "#4a8000",
		},
	},
	{
		variable: "toxicgreen",
		name: "톡식 그린",
		name_cap: "톡식 그린",
		csstext: "toxicgreen",
		natural: false,
		dye: true,
		canvasfilter: {
			blend: "#99e600",
		},
	},
	{
		variable: "teal",
		name: "청록색",
		name_cap: "청록색",
		csstext: "tealhair",
		natural: false,
		dye: true,
		canvasfilter: {
			blend: "#008040",
		},
	},
	{
		variable: "aquamarine",
		name: "아쿠아마린",
		name_cap: "아쿠아마린",
		csstext: "aquamarine",
		natural: false,
		dye: true,
		canvasfilter: {
			blend: "#6dd1b0",
		},
	},
	{
		variable: "pink",
		name: "분홍색",
		name_cap: "분홍색",
		csstext: "pinkhair",
		natural: false,
		dye: true,
		canvasfilter: {
			blend: "#e05281",
		},
	},
	{
		variable: "brightpink",
		name: "밝은 분홍색",
		name_cap: "밝은 분홍색",
		csstext: "brightpink",
		natural: false,
		dye: true,
		canvasfilter: {
			blend: "#ff80aa",
		},
	},
	{
		variable: "hotpink",
		name: "핫핑크",
		name_cap: "핫핑크",
		csstext: "hotpink",
		natural: false,
		dye: true,
		canvasfilter: {
			blend: "#ff4dc4",
		},
	},
	{
		variable: "softpink",
		name: "부드러운 분홍색",
		name_cap: "부드러운 분홍색",
		csstext: "softpink",
		natural: false,
		dye: true,
		canvasfilter: {
			blend: "#d6855c",
			brightness: 0.2,
		},
	},
	{
		variable: "rosegold",
		name: "로즈골드",
		name_cap: "로즈골드",
		csstext: "rosegold",
		natural: false,
		dye: true,
		canvasfilter: {
			blend: "#c47984",
		},
	},
	{
		variable: "crimson",
		name: "진홍색",
		name_cap: "진홍색",
		csstext: "crimson",
		natural: false,
		dye: true,
		canvasfilter: {
			blend: "#b30000",
		},
	},
	{
		variable: "wine",
		name: "와인",
		name_cap: "와인",
		csstext: "winehair",
		natural: false,
		dye: true,
		canvasfilter: {
			blend: "#790727",
			brightness: -0.2,
		},
	},
	{
		variable: "purple",
		name: "보라색",
		name_cap: "보라색",
		csstext: "purplehair",
		natural: false,
		dye: true,
		canvasfilter: {
			blend: "#6a0d89",
			brightness: -0.2,
		},
	},
	{
		variable: "mediumpurple",
		name: "중간 보라색",
		name_cap: "중간 보라색",
		csstext: "mediumpurple",
		natural: false,
		dye: true,
		canvasfilter: {
			blend: "#5113df",
		},
	},
	{
		variable: "brightpurple",
		name: "밝은 보라색",
		name_cap: "밝은 보라색",
		csstext: "brightpurple",
		natural: false,
		dye: true,
		canvasfilter: {
			blend: "#ab66ff",
		},
	},
	{
		variable: "grey",
		name: "회색",
		name_cap: "회색",
		csstext: "grey",
		natural: false,
		dye: true,
		canvasfilter: {
			blend: "#888484",
		},
	},
	{
		// KR: genePool.wolfFur("tan")이 참조하지만 원본 hair 배열엔 없던 색상. 임시로 clothes 쪽
		// "tan"(colours.js ~1481행) 블렌드값을 재사용함 — 늑대 새끼 스프라이트에서 실제로
		// 확인 후 canvasfilter는 조정 필요.
		variable: "tan",
		name: "황갈색",
		name_cap: "황갈색",
		csstext: "tan",
		natural: false,
		dye: false,
		canvasfilter: {
			blend: "#c3ad91",
		},
	},
	{
		variable: "white",
		name: "흰색",
		name_cap: "흰색",
		csstext: "whitehair",
		natural: true,
		dye: true,
		canvasfilter: {
			blend: "#BBBBBB",
			brightness: 0.3,
		},
	},
	{
		variable: "snowwhite",
		name: "설백색",
		name_cap: "설백색",
		csstext: "snowwhitehair",
		natural: true,
		dye: true,
		canvasfilter: {
			blend: "#FFFFFF",
		},
	},
];

/**
 * The records are split based on whether they are for fringe or sides,
 * then furhter based on hairstyles. Fallback entry is called 'all'.
 * Gradient hair record:
 * gradient - canvas gradient type
 * values - vector specifying the direction of the gradient
 * lengthFunctions - functions specifying how the stops should move according to the hair length
 * colors - pairs of stops and colors (colors will be replaced in renderer).
 */

setup.colours.hairgradients_prototypes = {
	fringe: {
		"high-ombre": {
			all: {
				gradient: "linear",
				values: [300, 200, 300, 0],
				lengthFunctions: [(length, value) => value, (length, value) => value],
				colors: [
					[0.6, "rgba(0, 0, 0, 1)"],
					[0.85, "rgba(0, 0, 0, 1)"],
				],
			},
			combatDoggy: {
				gradient: "linear",
				values: [250, 440, 250, 0],
				lengthFunctions: [(length, value) => value, (length, value) => value],
				colors: [
					[0.76, "rgba(0, 0, 0, 1)"],
					[0.85, "rgba(0, 0, 0, 1)"],
				],
			},
			combatMissionary: {
				gradient: "linear",
				values: [180, 245, 0, 250],
				lengthFunctions: [(length, value) => value, (length, value) => value],
				colors: [
					[0.64, "rgba(0, 0, 0, 1)"],
					[0.85, "rgba(0, 0, 0, 1)"],
				],
			},
		},
		"low-ombre": {
			all: {
				gradient: "linear",
				values: [300, 200, 300, 0],
				lengthFunctions: [(length, value) => value - length / 1000 / 2, (length, value) => value - length / 1000 / 2],
				colors: [
					[0.6, "rgba(0, 0, 0, 1)"],
					[0.85, "rgba(0, 0, 0, 1)"],
				],
			},
			combatDoggy: {
				gradient: "linear",
				values: [340, 180, 300, 0],
				lengthFunctions: [(length, value) => value - length / 1000 / 2, (length, value) => value - length / 1000 / 2],
				colors: [
					[0.6, "rgba(0, 0, 0, 1)"],
					[0.85, "rgba(0, 0, 0, 1)"],
				],
			},
			combatMissionary: {
				gradient: "linear",
				values: [180, 350, 0, 350],
				lengthFunctions: [(length, value) => value - length / 1000 / 2, (length, value) => value - length / 1000 / 2],
				colors: [
					[0.6, "rgba(0, 0, 0, 1)"],
					[0.85, "rgba(0, 0, 0, 1)"],
				],
			},
		},
		split: {
			parted: {
				gradient: "linear",
				values: [21, 255, 234, 0],
				lengthFunctions: [(length, value) => value, (length, value) => value],
				colors: [
					[0.63, "rgba(0, 0, 0, 1)"],
					[0.65, "rgba(0, 0, 0, 1)"],
				],
			},
			mohawk: {
				gradient: "radial",
				values: [93, 60, 0, 93, 100, 202],
				lengthFunctions: [(length, value) => value, (length, value) => value],
				colors: [
					[0.155, "rgba(0, 0, 0, 1)"],
					[0.16, "rgba(0, 0, 0, 1)"],
				],
			},
			combatMohawkDoggy: {
				gradient: "radial",
				values: [69, 84, 0, 130, 115, 187],
				lengthFunctions: [(length, value) => value, (length, value) => value],
				colors: [
					[0.155, "rgba(0, 0, 0, 1)"],
					[0.16, "rgba(0, 0, 0, 1)"],
				],
			},
			combatMohawk: {
				gradient: "radial",
				values: [30, 142, 0, 130, 115, 184],
				lengthFunctions: [(length, value) => value, (length, value) => value],
				colors: [
					[0.155, "rgba(0, 0, 0, 1)"],
					[0.16, "rgba(0, 0, 0, 1)"],
				],
			},
			overgrown: {
				gradient: "radial",
				values: [93, 60, 0, 93, 60, 200],
				lengthFunctions: [(length, value) => value, (length, value) => value],
				colors: [
					[0.155, "rgba(0, 0, 0, 1)"],
					[0.16, "rgba(0, 0, 0, 1)"],
				],
			},
			all: {
				gradient: "radial",
				values: [-40, 100, 0, -40, 100, 1070],
				lengthFunctions: [(length, value) => value, (length, value) => value],
				colors: [
					[0.155, "rgba(0, 0, 0, 1)"],
					[0.16, "rgba(0, 0, 0, 1)"],
				],
			},
		},
		"face-frame": {
			all: {
				gradient: "radial",
				values: [125, 103, 0, 125, 103, 350],
				lengthFunctions: [(length, value) => value, (length, value) => value],
				colors: [
					[0.15, "rgba(0, 0, 0, 1)"],
					[0.175, "rgba(0, 0, 0, 1)"],
				],
			},
			combatDoggy: {
				gradient: "radial",
				values: [15, 183, 50, 150, 103, 350],
				lengthFunctions: [(length, value) => value, (length, value) => value],
				colors: [
					[0.15, "rgba(0, 0, 0, 1)"],
					[0.175, "rgba(0, 0, 0, 1)"],
				],
			},
			combatMissionary: {
				gradient: "radial",
				values: [125, 103, 50, 150, 103, 350],
				lengthFunctions: [(length, value) => value, (length, value) => value],
				colors: [
					[0.15, "rgba(0, 0, 0, 1)"],
					[0.175, "rgba(0, 0, 0, 1)"],
				],
			},
		},
	},
	sides: {
		"high-ombre": {
			all: {
				gradient: "linear",
				values: [300, 200, 300, 0],
				lengthFunctions: [(length, value) => value, (length, value) => value],
				colors: [
					[0.6, "rgba(0, 0, 0, 1)"],
					[0.85, "rgba(0, 0, 0, 1)"],
				],
			},
			combatDoggy: {
				gradient: "linear",
				values: [250, 440, 250, 0],
				lengthFunctions: [(length, value) => value, (length, value) => value],
				colors: [
					[0.76, "rgba(0, 0, 0, 1)"],
					[0.85, "rgba(0, 0, 0, 1)"],
				],
			},
			combatMissionary: {
				gradient: "linear",
				values: [180, 245, 0, 250],
				lengthFunctions: [(length, value) => value, (length, value) => value],
				colors: [
					[0.64, "rgba(0, 0, 0, 1)"],
					[0.85, "rgba(0, 0, 0, 1)"],
				],
			},
		},
		"low-ombre": {
			all: {
				gradient: "linear",
				values: [300, 200, 300, 0],
				lengthFunctions: [(length, value) => value - length / 1000 / 2, (length, value) => value - length / 1000 / 2],
				colors: [
					[0.6, "rgba(0, 0, 0, 1)"],
					[0.85, "rgba(0, 0, 0, 1)"],
				],
			},
			combatDoggy: {
				gradient: "linear",
				values: [340, 180, 300, 0],
				lengthFunctions: [(length, value) => value - length / 1000 / 2, (length, value) => value - length / 1000 / 2],
				colors: [
					[0.6, "rgba(0, 0, 0, 1)"],
					[0.85, "rgba(0, 0, 0, 1)"],
				],
			},
			combatMissionary: {
				gradient: "linear",
				values: [180, 350, 0, 350],
				lengthFunctions: [(length, value) => value - length / 1000 / 2, (length, value) => value - length / 1000 / 2],
				colors: [
					[0.6, "rgba(0, 0, 0, 1)"],
					[0.85, "rgba(0, 0, 0, 1)"],
				],
			},
		},
		split: {
			all: {
				gradient: "linear",
				values: [0, 100, 600, 100],
				lengthFunctions: [(length, value) => value, (length, value) => value],
				colors: [
					[0.19, "rgba(0, 0, 0, 1)"],
					[0.21, "rgba(0, 0, 0, 1)"],
				],
			},
		},
		"face-frame": {
			all: {
				gradient: "linear",
				values: [0, 100, 600, 100],
				lengthFunctions: [(length, value) => value, (length, value) => value],
				colors: [
					[0.0, "rgba(0, 0, 0, 1)"],
					[0.0, "rgba(0, 0, 0, 1)"],
				],
			},
			combatDoggy: {
				gradient: "radial",
				values: [15, 183, 50, 150, 103, 350],
				lengthFunctions: [(length, value) => value, (length, value) => value],
				colors: [
					[0.15, "rgba(0, 0, 0, 1)"],
					[0.175, "rgba(0, 0, 0, 1)"],
				],
			},
			combatMissionary: {
				gradient: "radial",
				values: [125, 103, 50, 150, 103, 350],
				lengthFunctions: [(length, value) => value, (length, value) => value],
				colors: [
					[0.15, "rgba(0, 0, 0, 1)"],
					[0.175, "rgba(0, 0, 0, 1)"],
				],
			},
		},
	},
};

/**
 * Eyes colour record:
 * - variable:string - Value of variables
 * - name:string - Display name
 * - name_cap:string - Display name, capitalised
 * - csstext:string - CSS class added to text
 * - natural:boolean - Is option for natural eyes
 * - lens:boolean - Is option for contact lenses
 * - canvasfilter:object - Canvas model filter.
 */
setup.colours.eyes = [
	{
		variable: "random", // Only used at the start for a randomised colour
		name: "무작위",
		name_cap: "무작위",
		csstext: "Random",
		natural: true,
		lens: false,
		canvasfilter: {
			blend: "#b016d8",
		},
	},
	{
		variable: "purple",
		name: "보라색",
		name_cap: "보라색",
		csstext: "purple",
		natural: true,
		lens: true,
		canvasfilter: {
			blend: "#b016d8",
		},
	},
	{
		variable: "dark blue",
		name: "어두운 파란색",
		name_cap: "어두운 파란색",
		csstext: "blue",
		natural: true,
		lens: true,
		canvasfilter: {
			blend: "#3b6ba4",
		},
	},
	{
		variable: "light blue",
		name: "밝은 파란색",
		name_cap: "밝은 파란색",
		csstext: "lblue",
		natural: true,
		lens: true,
		canvasfilter: {
			blend: "#00D9F7",
			brightness: +0.2,
		},
	},
	{
		variable: "amber",
		name: "호박색",
		name_cap: "호박색",
		csstext: "tangerine",
		natural: true,
		lens: true,
		canvasfilter: {
			blend: "#f6ca70",
		},
	},
	{
		variable: "hazel",
		name: "헤이즐색",
		name_cap: "헤이즐색",
		csstext: "brown",
		natural: true,
		lens: true,
		canvasfilter: {
			blend: "#917742",
		},
	},
    {variable: "brown",
        name: "갈색",
        name_cap: "갈색",
        csstext: "brown",
        natural: true,
        lens: true,
        canvasfilter: {
            blend: "#704132",
        },
    },
	{
		variable: "green",
		name: "녹색",
		name_cap: "녹색",
		csstext: "green",
		natural: true,
		lens: true,
		canvasfilter: {
			blend: "#95b521",
		},
	},
	{
		variable: "lime green",
		name: "라임 그린",
		name_cap: "라임 그린",
		csstext: "green",
		natural: true,
		lens: true,
		canvasfilter: {
			blend: "#3ae137",
			brightness: +0.2,
		},
	},
	{
		variable: "light green",
		name: "밝은 녹색",
		name_cap: "밝은 녹색",
		csstext: "green",
		natural: true,
		lens: true,
		canvasfilter: {
			blend: "#D5F075",
		},
	},
	{
		variable: "red",
		name: "빨간색",
		name_cap: "빨간색",
		csstext: "red",
		natural: true,
		lens: true,
		canvasfilter: {
			blend: "#f45b08",
		},
	},
	{
		variable: "pink",
		name: "분홍색",
		name_cap: "분홍색",
		csstext: "pink",
		natural: true,
		lens: true,
		canvasfilter: {
			blend: "#F76EF7",
			brightness: +0.2,
		},
	},
    {
        variable: "black",
        name: "검정",
        name_cap: "검정",
        csstext: "black",
        natural: true,
        lens: true,
        canvasfilter: {
            blend: "#474340",
        },
    },
	{
		variable: "grey",
		name: "회색",
		name_cap: "회색",
		csstext: "grey",
		natural: true,
		lens: true,
		canvasfilter: {
			blend: "#a9a9a9",
		},
	},
	{
		variable: "light grey",
		name: "밝은 회색",
		name_cap: "밝은 회색",
		csstext: "grey",
		natural: true,
		lens: true,
		canvasfilter: {
			blend: "#d1d1d1",
			brightness: +0.2,
		},
	},
	{
		variable: "colorWheelTemporary0",
		name: "임시 색상환 0",
		name_cap: "임시 색상환 0",
		csstext: "colorWheelTemporary0",
		natural: false,
		lens: true,
		canvasfilter: {
			blend: "#d1d1d1",
			brightness: +0.2,
		},
	},
	{
		variable: "colorWheelTemporary1",
		name: "임시 색상환 1",
		name_cap: "임시 색상환 1",
		csstext: "colorWheelTemporary1",
		natural: false,
		lens: true,
		canvasfilter: {
			blend: "#d1d1d1",
			brightness: +0.2,
		},
	},
	{
		variable: "red possessed",
		name: "빙의된 빨간색",
		name_cap: "빙의된 빨간색",
		csstext: "redPossessed",
		natural: false,
		lens: false,
		canvasfilter: {
			blend: "#f40101",
			brightness: +0.2,
		},
	},
	{
		variable: "blue possessed",
		name: "빙의된 파란색",
		name_cap: "빙의된 파란색",
		csstext: "bluePossessed",
		natural: false,
		lens: false,
		canvasfilter: {
			blend: "#0F52BA",
			brightness: +0.4,
		},
	},
];

/**
 * Clothes colour record:
 * - variable:string - Value of variables
 * - name:string - Display name
 * - name_cap:string - Display name, capitalised
 * - csstext:string - CSS class added to text
 * - canvasfilter:object - Canvas model filter.
 */
setup.colours.clothes = [
	{
		variable: "blue",
		name: "파란색",
		name_cap: "파란색",
		csstext: "blue",
		canvasfilter: { blend: "#0132ff" },
	},
	{
		variable: "lake blue",
		name: "호수 파란색",
		name_cap: "호수 파란색",
		csstext: "navy blue",
		canvasfilter: { blend: "#223d8f" },
	},
	{
		variable: "light blue",
		name: "밝은 파란색",
		name_cap: "밝은 파란색",
		csstext: "light-blue",
		canvasfilter: { blend: "#559BC0" },
	},
	{
		variable: "neon blue",
		name: "네온 블루",
		name_cap: "네온 블루",
		csstext: "neon-blue",
		canvasfilter: { blend: "#00d5ff" },
	},
	{
		variable: "white",
		name: "흰색",
		name_cap: "흰색",
		csstext: "white",
		canvasfilter: { blend: "#ffffff" },
	},
	{
		variable: "purest white",
		name: "순백색",
		name_cap: "순백색",
		csstext: "white",
		canvasfilter: { blend: "#ffffff" },
	},
	{
		variable: "pale white",
		name: "창백한 흰색",
		name_cap: "창백한 흰색",
		csstext: "white",
		canvasfilter: { blend: "#eeeeee", contrast: 1.1 },
	},
	{
		variable: "red",
		name: "빨간색",
		name_cap: "빨간색",
		csstext: "red",
		canvasfilter: { blend: "#ff0000" },
	},
	{
		variable: "jewel red",
		name: "보석 빨간색",
		name_cap: "보석 빨간색",
		csstext: "jewel-red",
		canvasfilter: { blend: "#d4273b" },
	},
	{
		variable: "green",
		name: "녹색",
		name_cap: "녹색",
		csstext: "green",
		canvasfilter: { blend: "#00aa00" },
	},
	{
		variable: "light green",
		name: "밝은 녹색",
		name_cap: "밝은 녹색",
		csstext: "green",
		canvasfilter: { blend: "#72AC72" },
	},
	{
		variable: "forest green",
		name: "숲 녹색",
		name_cap: "숲 녹색",
		csstext: "forest-green",
		canvasfilter: { blend: "#374f2f" },
	},
	{
		variable: "lime",
		name: "라임색",
		name_cap: "라임색",
		csstext: "lime",
		canvasfilter: { blend: "#38B20A" },
	},
	{
		variable: "black",
		name: "검은색",
		name_cap: "검은색",
		csstext: "black",
		canvasfilter: { blend: "#353535" },
	},
	{
		variable: "confessor black",
		name: "고해 검은색",
		name_cap: "고해 검은색",
		csstext: "black",
		canvasfilter: { blend: "#353535" },
	},
	{
		variable: "pink",
		name: "분홍색",
		name_cap: "분홍색",
		csstext: "pink",
		canvasfilter: { blend: "#fe3288" },
	},
	{
		variable: "light pink",
		name: "밝은 분홍색",
		name_cap: "밝은 분홍색",
		csstext: "light-pink",
		canvasfilter: { blend: "#d67caf" },
	},
	{
		variable: "hospital pink",
		name: "병원 분홍색",
		name_cap: "병원 분홍색",
		csstext: "hospital-pink",
		canvasfilter: {
			blend: "#fe8b90",
		},
	},
	{
		variable: "purple",
		name: "보라색",
		name_cap: "보라색",
		csstext: "purple",
		canvasfilter: { blend: "#8f09f3" },
	},
	{
		variable: "lilac",
		name: "라일락",
		name_cap: "라일락",
		csstext: "lilac",
		canvasfilter: { blend: "#d692fc" },
	},
	{
		variable: "witchbloom",
		name: "마녀꽃",
		name_cap: "마녀꽃",
		csstext: "witchbloom",
		canvasfilter: {
			blend: "#743499",
		},
	},
	{
		variable: "violet",
		name: "제비꽃색",
		name_cap: "제비꽃색",
		csstext: "violet",
		canvasfilter: { blend: "#c42eff" },
	},
	{
		variable: "tangerine",
		name: "귤색",
		name_cap: "귤색",
		csstext: "tangerine",
		canvasfilter: { blend: "#ff6f00" },
	},
	{
		variable: "pale tangerine",
		name: "옅은 귤색",
		name_cap: "옅은 귤색",
		csstext: "pale-tangerine",
		canvasfilter: { blend: "#ff3300" },
	},
	{
		variable: "teal",
		name: "청록색",
		name_cap: "청록색",
		csstext: "teal",
		canvasfilter: { blend: "#2bcece" },
	},
	{
		variable: "yellow",
		name: "노란색",
		name_cap: "노란색",
		csstext: "yellow",
		canvasfilter: { blend: "#ffdd33", brightness: 0.2 },
	},
	{
		variable: "pale yellow",
		name: "옅은 노란색",
		name_cap: "옅은 노란색",
		csstext: "pale-yellow",
		canvasfilter: { blend: "#ffaa00" },
	},
	{
		variable: "brown",
		name: "갈색",
		name_cap: "갈색",
		csstext: "brown",
		canvasfilter: { blend: "#703000" },
	},
	{
		variable: "bucket brown",
		name: "양동이 갈색",
		name_cap: "양동이 갈색",
		csstext: "brownish",
		canvasfilter: { blend: "#87634a" },
	},
	{
		variable: "soft brown",
		name: "부드러운 갈색",
		name_cap: "부드러운 갈색",
		csstext: "brownish",
		canvasfilter: { blend: "#6a4225" },
	},
	{
		variable: "light brown",
		name: "밝은 갈색",
		name_cap: "밝은 갈색",
		csstext: "brownish",
		canvasfilter: { blend: "#87634a" },
	},
	{
		variable: "tan",
		name: "황갈색",
		name_cap: "황갈색",
		csstext: "tan",
		canvasfilter: { blend: "#c3ad91" },
	},
	{
		variable: "khaki",
		name: "카키색",
		name_cap: "카키색",
		csstext: "tan",
		canvasfilter: { blend: "#c89673" },
	},
	{
		variable: "fleshy",
		name: "살색",
		name_cap: "살색",
		csstext: "fleshy",
		canvasfilter: { blend: "#ffddc8" },
	},
	{
		variable: "grey",
		name: "회색",
		name_cap: "회색",
		csstext: "grey",
		canvasfilter: { blend: "#b5aea6" },
	},
	{
		variable: "sand",
		name: "모래색",
		name_cap: "모래색",
		csstext: "sand",
		canvasfilter: { blend: "#ebd1ad" },
	},
	{
		variable: "off-white",
		name: "미색",
		name_cap: "미색",
		csstext: "off-white",
		canvasfilter: { blend: "#ecece8" },
	},
	{
		variable: "navy",
		name: "남색",
		name_cap: "남색",
		csstext: "navy",
		canvasfilter: { blend: "#292934" },
	},
	{
		variable: "navy blue",
		name: "남색",
		name_cap: "남색",
		csstext: "navy blue",
		canvasfilter: { blend: "#16168d" },
	},
	{
		variable: "denim",
		name: "데님",
		name_cap: "데님",
		csstext: "denim",
		canvasfilter: { blend: "#4b6e85" },
	},
	{
		variable: "olive",
		name: "올리브",
		name_cap: "올리브",
		csstext: "olive",
		canvasfilter: { blend: "#5f5a44" },
	},
	{
		variable: "wine",
		name: "와인",
		name_cap: "와인",
		csstext: "wine",
		canvasfilter: { blend: "#65252d" },
	},
	{
		variable: "blood moon red",
		name: "붉은 달 레드",
		name_cap: "붉은 달 레드",
		csstext: "wine",
		canvasfilter: { blend: "#5c0707" },
	},
	{
		variable: "branded red",
		name: "낙인 레드",
		name_cap: "낙인 레드",
		csstext: "wine",
		canvasfilter: { blend: "#d4273b" },
	},
	{
		variable: "russet",
		name: "적갈색",
		name_cap: "적갈색",
		csstext: "russet",
		canvasfilter: { blend: "#9f4033" },
	},
	{
		variable: "apocalypse",
		name: "아포칼립스",
		name_cap: "아포칼립스",
		csstext: "apocalypse",
		canvasfilter: { blend: "#5c271d" },
	},
	{
		variable: "steel",
		name: "강철",
		name_cap: "강철",
		csstext: "steel",
		canvasfilter: { blend: "#999999" },
	},
	{
		variable: "blue steel",
		name: "블루 스틸",
		name_cap: "블루 스틸",
		csstext: "blue-steel",
		canvasfilter: { blend: "#646e82" },
	},
	{
		variable: "bronze",
		name: "청동",
		name_cap: "청동",
		csstext: "bronze",
		canvasfilter: { blend: "#cd9932" },
	},
	{
		variable: "rose gold",
		name: "로즈 골드",
		name_cap: "로즈 골드",
		csstext: "rose-gold",
		canvasfilter: { blend: "#dea193", brightness: 0.15 },
	},
	{
		variable: "gold",
		name: "금",
		name_cap: "금",
		csstext: "gold",
		canvasfilter: { blend: "#ffbf00", brightness: 0.1 },
	},
	{
		variable: "virgo gold",
		name: "처녀자리 골드",
		name_cap: "처녀자리 골드",
		csstext: "virgo gold",
		canvasfilter: { blend: "#ffbf00", brightness: 0.1 },
	},
	{
		variable: "silver",
		name: "은",
		name_cap: "은",
		csstext: "silver",
		canvasfilter: { blend: "#C0C0C0" },
	},
	{
		variable: "sterling silver",
		name: "순은",
		name_cap: "순은",
		csstext: "sterling-silver",
		canvasfilter: { blend: "#8b9fc4" },
	},
	{
		variable: "shackle silver",
		name: "족쇄 은",
		name_cap: "족쇄 은",
		csstext: "sterling-silver",
		canvasfilter: { blend: "#8b9fc4" },
	},
];
/**
 * Makeup colour records:
 * - variable:string - Value of variables
 * - name:string - Display name
 * - name_cap:string - Display name, capitalised
 * - csstext:string - CSS class added to text
 * - canvasfilter:object - Canvas model filter.
 */
setup.colours.lipstick = [
	{
		variable: "red",
		name: "빨강",
		name_cap: "빨강",
		csstext: "red",
		canvasfilter: {
			blend: "#EC3535",
		},
	},
	{
		variable: "blue",
		name: "파랑",
		name_cap: "파랑",
		csstext: "blue",
		canvasfilter: {
			blend: "#4372FF",
		},
	},
	{
		variable: "green",
		name: "초록",
		name_cap: "초록",
		csstext: "green",
		canvasfilter: {
			blend: "#195205",
		},
	},
	{
		variable: "purple",
		name: "보라",
		name_cap: "보라",
		csstext: "purple",
		canvasfilter: {
			blend: "#AA4BC8",
		},
	},
	{
		variable: "orange",
		name: "주황",
		name_cap: "주황",
		csstext: "orange",
		canvasfilter: {
			blend: "#f28500",
		},
	},
	{
		variable: "lime",
		name: "라임",
		name_cap: "라임",
		csstext: "lime",
		canvasfilter: {
			blend: "#38B20A",
		},
	},
	{
		variable: "pink",
		name: "분홍",
		name_cap: "분홍",
		csstext: "pink",
		canvasfilter: {
			blend: "#E40081",
		},
	},
	{
		variable: "light pink",
		name: "밝은 분홍",
		name_cap: "밝은 분홍",
		csstext: "light-pink",
		canvasfilter: {
			blend: "#d67caf",
		},
	},
	{
		variable: "dark red",
		name: "어두운 빨강",
		name_cap: "어두운 빨강",
		csstext: "red",
		canvasfilter: {
			blend: "#BD0000",
		},
	},
	{
		variable: "black",
		name: "검정",
		name_cap: "검정",
		csstext: "black",
		canvasfilter: {
			blend: "#292929",
		},
	},
];
setup.colours.eyeshadow = [
	{
		variable: "red",
		name: "빨강",
		name_cap: "빨강",
		csstext: "red",
		canvasfilter: {
			blend: "#EC3535",
		},
	},
	{
		variable: "pink",
		name: "분홍",
		name_cap: "분홍",
		csstext: "pink",
		canvasfilter: {
			blend: "#E40081",
		},
	},
	{
		variable: "light pink",
		name: "밝은 분홍",
		name_cap: "밝은 분홍",
		csstext: "light-pink",
		canvasfilter: {
			blend: "#d67caf",
		},
	},
	{
		variable: "green",
		name: "초록",
		name_cap: "초록",
		csstext: "green",
		canvasfilter: {
			blend: "#38B20A",
		},
	},
	{
		variable: "light green",
		name: "밝은 초록",
		name_cap: "밝은 초록",
		csstext: "green",
		canvasfilter: {
			blend: "#7caf7c",
		},
	},
	{
		variable: "lime",
		name: "라임",
		name_cap: "라임",
		csstext: "lime",
		canvasfilter: {
			blend: "#38B20A",
		},
	},
	{
		variable: "blue",
		name: "파랑",
		name_cap: "파랑",
		csstext: "blue",
		canvasfilter: {
			blend: "#4372FF",
		},
	},
	{
		variable: "light blue",
		name: "밝은 파랑",
		name_cap: "밝은 파랑",
		csstext: "light-blue",
		canvasfilter: {
			blend: "#559BC0",
		},
	},
	{
		variable: "purple",
		name: "보라",
		name_cap: "보라",
		csstext: "purple",
		canvasfilter: {
			blend: "#AA4BC8",
		},
	},
	{
		variable: "orange",
		name: "주황",
		name_cap: "주황",
		csstext: "orange",
		canvasfilter: {
			blend: "#f28500",
		},
	},
	{
		variable: "yellow",
		name: "노랑",
		name_cap: "노랑",
		csstext: "yellow",
		canvasfilter: {
			blend: "#FFD700",
		},
	},
	{
		variable: "brown",
		name: "갈색",
		name_cap: "갈색",
		csstext: "brown",
		canvasfilter: {
			blend: "#4C2217",
		},
	},
	{
		variable: "light brown",
		name: "밝은 갈색",
		name_cap: "밝은 갈색",
		csstext: "lightbrown",
		canvasfilter: {
			blend: "#C5793A",
		},
	},
	{
		variable: "dark brown",
		name: "어두운 갈색",
		name_cap: "어두운 갈색",
		csstext: "brown",
		canvasfilter: {
			blend: "#4C2217",
		},
	},
	{
		variable: "black",
		name: "검정",
		name_cap: "검정",
		csstext: "black",
		canvasfilter: {
			blend: "#292929",
		},
	},
	{
		variable: "white",
		name: "흰색",
		name_cap: "흰색",
		csstext: "",
		canvasfilter: {
			blend: "#EEEEEE",
		},
	},
	{
		variable: "silver",
		name: "은",
		name_cap: "은",
		csstext: "silver",
		canvasfilter: {
			blend: "#C0C0C0",
		},
	},
];
setup.colours.mascara = [
	{
		variable: "black",
		name: "검정",
		name_cap: "검정",
		csstext: "black",
		canvasfilter: {
			blend: "#292929",
		},
	},
	{
        variable: "brown waterproof",
        name: "갈색 (워터프루프)",
        name_cap: "갈색 (워터프루프)",
        csstext: "brown",
        canvasfilter: {
            blend: "#5a422e",
        },
    },
    {
        variable: "light brown waterproof",
        name: "연갈색 (워터프루프)",
        name_cap: "연갈색 (워터프루프)",
        csstext: "light brown",
        canvasfilter: {
            blend: "#907b6a",
        },
    },
    {
        variable: "red waterproof",
        name: "빨간색 (워터프루프)",
        name_cap: "빨간색 (워터프루프)",
        csstext: "red",
        canvasfilter: {
            blend: "#97190b",
        },
    },
    {
        variable: "orange waterproof",
        name: "주황색 (워터프루프)",
        name_cap: "주황색 (워터프루프)",
        csstext: "orange",
        canvasfilter: {
            blend: "#cb6d10",
        },
    },
    {
        variable: "yellow waterproof",
        name: "노란색 (워터프루프)",
        name_cap: "노란색 (워터프루프)",
        csstext: "yellow",
        canvasfilter: {
            blend: "#cfb72c",
        },
    },
    {
        variable: "green waterproof",
        name: "초록색 (워터프루프)",
        name_cap: "초록색 (워터프루프)",
        csstext: "green",
        canvasfilter: {
            blend: "#0ba41d",
        },
    },
    {
        variable: "blue waterproof",
        name: "파란색 (워터프루프)",
        name_cap: "파란색 (워터프루프)",
        csstext: "blue",
        canvasfilter: {
            blend: "#1b3eb4",
        },
    },
    {
        variable: "pink waterproof",
        name: "분홍색 (워터프루프)",
        name_cap: "분홍색 (워터프루프)",
        csstext: "pink",
        canvasfilter: {
            blend: "#cb24a7",
        },
    },
    {
        variable: "purple waterproof",
        name: "보라색 (워터프루프)",
        name_cap: "보라색 (워터프루프)",
        csstext: "purple",
        canvasfilter: {
            blend: "#5d07a4",
        },
    },
    {
        variable: "white waterproof",
        name: "흰색 (워터프루프)",
        name_cap: "흰색 (워터프루프)",
        csstext: "white",
        canvasfilter: {
            blend: "#eeeeee",
        },
    },
	{
		variable: "black waterproof",
		name: "검정 (워터프루프)",
		name_cap: "검정 (워터프루프)",
		csstext: "black",
		canvasfilter: {
			blend: "#292929",
		},
	},
];
setup.colours.blusher = [
	{
		variable: "rosy pink",
		name: "로즈 핑크",
		name_cap: "로즈 핑크",
		csstext: "light-pink",
		canvasfilter: {
			blend: "#4372FF",
		},
	},
];
setup.colours.condom = [
	{
		variable: "red",
		name: "빨강",
		name_cap: "빨강",
		csstext: "red",
		canvasfilter: {
			blend: "#EC3535",
		},
	},
	{
		variable: "blue",
		name: "파랑",
		name_cap: "파랑",
		csstext: "blue",
		canvasfilter: {
			blend: "#4372FF",
		},
	},
	{
		variable: "lblue",
		name: "밝은 파랑",
		name_cap: "밝은 파랑",
		csstext: "lblue",
		canvasfilter: {
			blend: "#559BC0",
		},
	},
	{
		variable: "green",
		name: "초록",
		name_cap: "초록",
		csstext: "green",
		canvasfilter: {
			blend: "#38B20A",
		},
	},
	{
		variable: "lime",
		name: "라임",
		name_cap: "라임",
		csstext: "lime",
		canvasfilter: {
			blend: "#7caf7c",
		},
	},
	{
		variable: "purple",
		name: "보라",
		name_cap: "보라",
		csstext: "purple",
		canvasfilter: {
			blend: "#AA4BC8",
		},
	},
	{
		variable: "orange",
		name: "주황",
		name_cap: "주황",
		csstext: "orange",
		canvasfilter: {
			blend: "#f28500",
		},
	},
	{
		variable: "pink",
		name: "분홍",
		name_cap: "분홍",
		csstext: "pink",
		canvasfilter: {
			blend: "#E40081",
		},
	},
	{
		variable: "plain",
		name: "민무늬",
		name_cap: "민무늬",
		csstext: "plain",
		canvasfilter: {
			blend: "#f28500",
		},
	},
];
setup.colours.tentacle = [
	{
		variable: "tentacles-blue",
		canvasfilter: {
			blend: "#1431dc",
			brightness: 0.15,
		},
	},
	{
		variable: "tentacles-vines",
		canvasfilter: {
			blend: "#18a058",
			brightness: 0.1,
			contrast: 0.9,
		},
	},
	{
		variable: "tentacles-roots",
		canvasfilter: {
			blend: "#8d4d19",
			brightness: 0.15,
		},
	},
	{
		variable: "tentacles-red",
		canvasfilter: {
			blend: "#d80e04",
			brightness: 0.1,
		},
	},
	{
		variable: "tentacles-purple",
		canvasfilter: {
			blend: "#b509a8",
			brightness: 0.15,
		},
	},
	{
		variable: "tentacles-peach",
		canvasfilter: {
			blend: "#ff9e75",
			brightness: 0.3,
			contrast: 1.6,
			blendMode: "hard-light",
			desaturate: false,
		},
	},
	{
		variable: "tentacles-wraith",
		canvasfilter: {
			blend: "#BBBBBB",
			brightness: 0.25,
			contrast: 0.9,
		},
	},
	{
		variable: "tentacles-wraith-penetrated",
		canvasfilter: {
			blend: "#BBBBBB",
			brightness: -0.5,
			contrast: 0.7,
		},
	},
];
/*
 * Maps to easily access colour record by its variable code, ex. setup.colours.hair_map[$haircolour]
 */

function buildColourMap(name, mode) {
	const array = mode === "custom_eyecolours" ? V.custom_eyecolours : setup.colours[name];
	const map = setup.colours[name + "_map"];
	const defaultFilter = setup.colours[name + "_default"];
	for (const item of array) {
		if (defaultFilter) Renderer.mergeLayerData(item.canvasfilter, defaultFilter);
		const key = item.variable;
		if (key in map) {
			if (mode !== "custom_eyecolours") console.error("Duplicate " + name + " '" + key + "'");
		}
		map[key] = item;
	}
	return map;
}
window.buildColourMap = buildColourMap;

buildColourMap("hair");
buildColourMap("eyes");
buildColourMap("clothes");
buildColourMap("lipstick");
buildColourMap("mascara");
buildColourMap("blusher");
buildColourMap("eyeshadow");
buildColourMap("condom");
buildColourMap("tentacle");

/**
 * Normalizes a colour key for loose comparison: lowercased, with spaces/underscores/hyphens
 * stripped. Lets "dark brown", "dark_brown", "dark-brown" and "darkbrown" all match each other.
 *
 * @param {any} str
 * @returns {any} the normalized string, or the input unchanged if it isn't a string
 */
setup.normalizeColourKey = function (str) {
	return typeof str === "string" ? str.toLowerCase().replace(/[\s_-]+/g, "") : str;
};

/**
 * Tries to guess colour in the map regardless of spacing/underscore/hyphen/case differences
 * between the lookup key and the map's keys, falling back to a match on the record's display
 * name. Return colour record if found and null if no.
 *
 * @param {any} map
 * @param {any} colour
 */
setup.guessColourInMap = function (map, colour) {
	if (colour in map) return map[colour];

	const normalizedTarget = setup.normalizeColourKey(colour);
	for (const key in map) {
		if (setup.normalizeColourKey(key) === normalizedTarget) return map[key];
	}

	for (const record of Object.values(map)) {
		if (record.name === colour) return record;
	}
	return null;
};
/**
 * Tries to guess readable name of the colour by looking it in all known maps.
 * If not found, return unchanged.
 *
 * @param {any} colour
 */
setup.colourName = function (colour) {
	if (colour === "custom") return "커스텀";
	if (colour === "random") return "무작위";
	for (const map of [
		setup.colours.hair_map,
		setup.colours.eyes_map,
		setup.colours.clothes_map,
		setup.colours.mascara_map,
		setup.colours.lipstick_map,
		setup.colours.blusher_map,
		setup.colours.eyeshadow_map,
		setup.colours.condom_map,
		setup.colours.tentacle_map,
	]) { /* 키값에 하이픈(-)있어도 무시하는거 */
		if (colour in map) return map[colour].name;
		const normalized = typeof colour === "string" ? colour.replace(/-/g, " ") : colour;
		if (normalized !== colour && normalized in map) return map[normalized].name;
	}
	// KR: 프리셋 맵(hair_map 등)에 없는 색상(예: 커스텀 렌즈 색상 "peachpuff")은
	// color-namer.js의 색상명 사전에서 한글 이름을 찾아본다.
	if (typeof colour === "string" && window.colors && colour in window.colors) {
		return window.colorNameTranslate(colour, "spaced name");
	}
	return colour;
};
