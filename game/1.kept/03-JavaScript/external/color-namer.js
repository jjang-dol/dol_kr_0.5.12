/**
 * Hex => RGB Cache
 */

var h2rs = {};

/**
 * Default `colors.json`
 */

var colors = {
  "aqua": ["#00FFFF", "hue-rotate(180deg) brightness(210%) saturate(350%) contrast(100%)", "아쿠아"],
  "aliceblue": ["#F0F8FF", "hue-rotate(208deg) brightness(260%) saturate(20%) contrast(100%)", "앨리스 블루"],
  "antiquewhite": ["#FAEBD7", "hue-rotate(4deg) brightness(230%) saturate(20%) contrast(120%)", "앤티크 화이트"],
  "black": ["#000000", "hue-rotate(0deg) brightness(100%) saturate(0%) contrast(170%)", "검정"],
  "blue": ["#0000FF", "hue-rotate(192deg) brightness(80%) saturate(279%) contrast(300%)", "파랑"],
  "cyan": ["#00FFFF", "hue-rotate(131deg) brightness(128%) saturate(249%) contrast(260%)", "시안"],
  "omendarkblue": ["#00008B", "hue-rotate(207deg) brightness(80%) saturate(79%) contrast(300%)","진파랑"],
  "darkcyan": ["#008B8B", "hue-rotate(136deg) brightness(105%) saturate(219%) contrast(100%)", "진시안"],
  "darkgreen": ["#006400", "hue-rotate(55deg) brightness(100%) saturate(79%) contrast(100%)", "진녹색"],
  "darkturquoise": ["#00CED1", "hue-rotate(128deg) brightness(110%) saturate(249%) contrast(190%)", "진터쿼이즈"],
  "deepskyblue": ["#00BFFF", "hue-rotate(140deg) brightness(110%) saturate(249%) contrast(190%)", "딥 스카이 블루"],
  "omengreen": ["#008000", "hue-rotate(55deg) brightness(100%) saturate(69%) contrast(100%)", "녹색"],
  "lime": ["#00FF00", "hue-rotate(117deg) brightness(170%) saturate(120%) contrast(110%)", "라임색"],
  "mediumblue": ["#0000CD", "hue-rotate(207deg) brightness(80%) saturate(179%) contrast(300%)", "중간 파랑"],
  "mediumspringgreen": ["#00FA9A", "hue-rotate(117deg) brightness(170%) saturate(100%) contrast(140%)", "중간 스프링 그린"],
  "navy": ["#000080", "hue-rotate(207deg) brightness(80%) saturate(79%) contrast(300%)", "남색"],
  "navyblue": ["#16168d", "hue-rotate(206deg) brightness(100%) saturate(79%) contrast(300%)", "네이비 블루"],
  "springgreen": ["#00FF7F", "hue-rotate(117deg) brightness(175%) saturate(120%) contrast(110%)", "스프링 그린"],
  "teal": ["#008080", "hue-rotate(128deg) brightness(90%) saturate(249%) contrast(190%)", "청록색"],
  "midnightblue": ["#191970", "hue-rotate(206deg) brightness(80%) saturate(79%) contrast(300%)", "미드나이트 블루"],
  "dodgerblue": ["#1E90FF", "hue-rotate(140deg) brightness(107%) saturate(229%) contrast(190%)", "다저 블루"],
  "lightseagreen": ["#20B2AA", "hue-rotate(124deg) brightness(107%) saturate(229%) contrast(190%)", "밝은 바다녹색"],
  "forestgreen": ["#228B22", "hue-rotate(124deg) brightness(95%) saturate(229%) contrast(150%)", "숲 녹색"],
  "seagreen": ["#2E8B57", "hue-rotate(124deg) brightness(90%) saturate(229%) contrast(150%)", "바다녹색"],
  "darkslategrey": ["#2F4F4F", "hue-rotate(156deg) brightness(90%) saturate(139%) contrast(300%)", "진슬레이트 회색"],
  "mediumlimegreen": ["#32CD32", "hue-rotate(124deg) brightness(112%) saturate(269%) contrast(190%)", "중간 라임녹색"],
  "mediumseagreen": ["#3CB371", "hue-rotate(124deg) brightness(112%) saturate(269%) contrast(190%)", "중간 바다녹색"],
  "turquoise": ["#40E0D0", "hue-rotate(131deg) brightness(122%) saturate(269%) contrast(160%)", "터쿼이즈"],
  "royalblue": ["#4169E1", "hue-rotate(140deg) brightness(90%) saturate(229%) contrast(190%)", "로열 블루"],
  "steelblue": ["#4682B4", "hue-rotate(140deg) brightness(100%) saturate(210%) contrast(200%)", "스틸 블루"],
  "darkslateblue": ["#483D8B", "hue-rotate(207deg) brightness(90%) saturate(120%) contrast(200%)", "진슬레이트 블루"],
  "mediumturquoise": ["#48D1CC", "hue-rotate(131deg) brightness(128%) saturate(200%) contrast(270%)", "중간 터쿼이즈"],
  "indigo": ["#4B0082", "hue-rotate(233deg) brightness(80%) saturate(69%) contrast(200%)", "남보라"],
  "darkolivegreen": ["#556B2F", "hue-rotate(22deg) brightness(110%) saturate(100%) contrast(165%)", "진올리브 녹색"],
  "cadetblue": ["#5F9EA0", "hue-rotate(127deg) brightness(120%) saturate(109%) contrast(100%)", "카뎃 블루"],
  "cornflowerblue": ["#6495ED", "hue-rotate(182deg) brightness(130%) saturate(109%) contrast(100%)", "콘플라워 블루"],
  "mediumaquamarine": ["#66CDAA", "hue-rotate(117deg) brightness(150%) saturate(100%) contrast(110%)", "중간 아쿠아마린"],
  "dimgrey": ["#696969", "hue-rotate(117deg) brightness(129%) saturate(0%) contrast(210%)", "칙칙한 회색"],
  "slateblue": ["#6A5ACD", "hue-rotate(211deg) brightness(105%) saturate(109%) contrast(160%)", "슬레이트 블루"],
  "olivedrab": ["#6B8E23", "hue-rotate(25deg) brightness(108%) saturate(109%) contrast(120%)", "올리브 드랩"],
  "slategrey": ["#708090", "hue-rotate(211deg) brightness(115%) saturate(0%) contrast(100%)", "슬레이트 회색"],
  "lightslategrey": ["#778899", "hue-rotate(211deg) brightness(119%) saturate(0%) contrast(100%)", "밝은 슬레이트 회색"],
  "mediumslateblue": ["#7B68EE", "hue-rotate(211deg) brightness(107%) saturate(140%) contrast(100%)", "중간 슬레이트 블루"],
  "lawngreen": ["#7CFC00", "hue-rotate(56deg) saturate(160%) brightness(150%) contrast(200%)", "잔디녹색"],
  "aquamarine": ["#7FFFD4", "hue-rotate(112deg) saturate(70%) brightness(190%) contrast(140%)", "아쿠아마린"],
  "chartreuse": ["#7FFF00", "hue-rotate(46deg) saturate(140%) brightness(170%) contrast(140%)", "연두색"],
  "omengrey": ["#808080", "hue-rotate(117deg) brightness(139%) saturate(0%) contrast(210%)", "회색"],
  "maroon": ["#800000", "hue-rotate(305deg) brightness(100%) saturate(60%) contrast(177%)", "고동색"],
  "olive": ["#808000", "hue-rotate(17deg) brightness(110%) saturate(120%) contrast(127%)", "올리브색"],
  "omenpurple": ["#800080", "hue-rotate(230deg) brightness(95%) saturate(70%) contrast(127%)", "보라"],
  "lightskyblue": ["#87CEFA", "hue-rotate(143deg) brightness(172%) saturate(39%) contrast(220%)", "밝은 하늘색"],
  "skyblue": ["#87CEEB", "hue-rotate(143deg) brightness(182%) saturate(29%) contrast(200%)", "하늘색"],
  "blueviolet": ["#8A2BE2", "hue-rotate(230deg) brightness(100%) saturate(140%) contrast(207%)", "청보라"],
  "darkmagenta": ["#8B008B", "hue-rotate(230deg) brightness(100%) saturate(100%) contrast(207%)", "진마젠타"],
  "darkred": ["#8B0000", "hue-rotate(279deg) brightness(100%) saturate(70%) contrast(207%)", "진빨강"],
  "saddlebrown": ["#8B4513", "hue-rotate(342deg) brightness(100%) saturate(70%) contrast(207%)", "새들 브라운"],
  "darkseagreen": ["#8FBC8F", "hue-rotate(46deg) saturate(80%) brightness(160%) contrast(140%)", "진바다녹색"],
  "omenlightgreen": ["#90EE90", "hue-rotate(85deg) brightness(181%) saturate(40%) contrast(170%)", "밝은 녹색"],
  "mediumpurple": ["#9370DB", "hue-rotate(230deg) brightness(125%) saturate(70%) contrast(127%)", "중간 보라"],
  "darkviolet": ["#9400D3", "hue-rotate(245deg) brightness(90%) saturate(90%) contrast(137%)", "진바이올렛"],
  "palegreen": ["#98FB98", "hue-rotate(85deg) brightness(184%) saturate(40%) contrast(170%)", "연녹색"],
  "darkorchid": ["#9932CC", "hue-rotate(245deg) brightness(99%) saturate(90%) contrast(137%)", "진오키드"],
  "yellowgreen": ["#9ACD32", "hue-rotate(42deg) saturate(100%) brightness(170%) contrast(100%)", "황록색"],
  "sienna": ["#A0522D", "hue-rotate(305deg) brightness(100%) saturate(70%) contrast(117%)", "시에나"],
  "brown": ["#A52A2A", "hue-rotate(297deg) brightness(100%) saturate(70%) contrast(177%)", "갈색"],
  "darkgrey": ["#A9A9A9", "hue-rotate(297deg) brightness(160%) saturate(0%) contrast(177%)", "진회색"],
  "greenyellow": ["#ADFF2F", "hue-rotate(42deg) saturate(120%) brightness(193%) contrast(100%)", "연두노랑"],
  "omenlightblue": ["#ADD8E6", "hue-rotate(166deg) saturate(50%) brightness(205%) contrast(100%)", "밝은 파랑"],
  "paleturquoise": ["#AFEEEE", "hue-rotate(144deg) saturate(40%) brightness(200%) contrast(140%)", "연한 터쿼이즈"],
  "lightsteelblue": ["#B0C4DE", "hue-rotate(144deg) saturate(27%) brightness(180%) contrast(140%)", "밝은 스틸 블루"],
  "powderblue": ["#B0E0E6", "hue-rotate(144deg) saturate(33%) brightness(193%) contrast(140%)", "파우더 블루"],
  "firebrick": ["#B22222", "hue-rotate(290deg) brightness(100%) saturate(70%) contrast(207%)", "벽돌색"],
  "darkgoldenrod": ["#B8860B", "hue-rotate(2deg) brightness(121%) saturate(100%) contrast(157%)", "진골든로드"],
  "mediumorchid": ["#BA55D3", "hue-rotate(242deg) brightness(121%) saturate(80%) contrast(157%)", "오키드"],
  "rosybrown": ["#BC8F8F", "hue-rotate(301deg) brightness(141%) saturate(30%) contrast(137%)", "장밋빛 갈색"],
  "darkkhaki": ["#BDB76B", "hue-rotate(19deg) saturate(90%) brightness(180%) contrast(110%)", "진카키"],
  "silver": ["#C0C0C0", "hue-rotate(19deg) saturate(0%) brightness(190%) contrast(100%)", "은색"],
  "mediumvioletred": ["#C71585", "hue-rotate(260deg) saturate(110%) brightness(100%) contrast(170%)", "바이올렛 레드"],
  "indianred": ["#CD5C5C", "hue-rotate(349deg) saturate(140%) brightness(110%) contrast(160%)", "인디언 레드"],
  "peru": ["#CD853F", "hue-rotate(6deg) brightness(131%) saturate(130%) contrast(157%)", "페루 오렌지"],
  "chocolate": ["#D2691E", "hue-rotate(344deg) brightness(121%) saturate(100%) contrast(157%)", "초콜릿색"],
  "tan": ["#D2B48C", "hue-rotate(1deg) saturate(30%) brightness(173%) contrast(120%)", "황갈색"],
  "omenlightgrey": ["#D3D3D3", "hue-rotate(1deg) saturate(0%) brightness(190%) contrast(170%)", "밝은 회색"],
  "thistle": ["#D8BFD8", "hue-rotate(236deg) saturate(20%) brightness(180%) contrast(170%)", "엉겅퀴색"],
  "goldenrod": ["#DAA520", "hue-rotate(354deg) saturate(60%) brightness(155%) contrast(160%)", "황금빛 주황"],
  "orchid": ["#DA70D6", "hue-rotate(255deg) saturate(50%) brightness(145%) contrast(178%)", "오키드"],
  "palevioletred": ["#DB7093", "hue-rotate(279deg) saturate(60%) brightness(135%) contrast(160%)", "연한 바이올렛 레드"],
  "crimson": ["#DC143C", "hue-rotate(312deg) saturate(130%) brightness(100%) contrast(160%)", "크림슨"],
  "gainsboro": ["#DCDCDC", "hue-rotate(311deg) saturate(0%) brightness(195%) contrast(170%)", "게인즈버러"],
  "plum": ["#DDA0DD", "hue-rotate(231deg) saturate(60%) brightness(160%) contrast(170%)", "자두색"],
  "burlywood": ["#DEB887", "hue-rotate(356deg) saturate(40%) brightness(176%) contrast(130%)", "벌리우드"],
  "lightcyan": ["#E0FFFF", "hue-rotate(131deg) brightness(195%) saturate(14%) contrast(250%)", "밝은 시안"],
  "lavender": ["#E6E6FA", "hue-rotate(173deg) brightness(192%) saturate(24%) contrast(250%)", "라벤더"],
  "darksalmon": ["#E9967A", "hue-rotate(352deg) saturate(130%) brightness(145%) contrast(100%)", "진연어색"],
  "palegoldenrod": ["#EEE8AA", "hue-rotate(17deg) brightness(200%) saturate(64%) contrast(150%)", "연한 골든로드"],
  "violet": ["#EE82EE", "hue-rotate(225deg) brightness(147%) saturate(130%) contrast(170%)", "바이올렛"],
  "azure": ["#F0FFFF", "hue-rotate(131deg) brightness(195%) saturate(10%) contrast(250%)", "하늘빛"],
  "honeydew": ["#F0FFF0", "hue-rotate(131deg) brightness(195%) saturate(10%) contrast(250%)", "허니듀"],
  "khaki": ["#F0E68C", "hue-rotate(10deg) brightness(185%) saturate(40%) contrast(250%)", "카키"],
  "lightcoral": ["#F08080", "hue-rotate(336deg) saturate(130%) brightness(135%) contrast(100%)", "밝은 산호색"],
  "sandybrown": ["#F4A460", "hue-rotate(356deg) saturate(80%) brightness(160%) contrast(195%)", "모래 갈색"],
  "beige": ["#F5F5DC", "hue-rotate(34deg) brightness(195%) saturate(14%) contrast(250%)", "베이지"],
  "mintcream": ["#F5FFFA", "hue-rotate(84deg) brightness(195%) saturate(14%) contrast(250%)", "민트 크림"],
  "wheat": ["#F5DEB3", "hue-rotate(333deg) brightness(185%) saturate(12%) contrast(250%)", "밀색"],
  "whitesmoke": ["#F5F5F5", "hue-rotate(333deg) brightness(205%) saturate(0%) contrast(220%)", "흰 연기색"],
  "ghostwhite": ["#F8F8FF", "hue-rotate(160deg) brightness(205%) saturate(5%) contrast(220%)", "고스트 화이트"],
  "lightgoldenrodyellow": ["#FAFAD2", "hue-rotate(1deg) brightness(199%) saturate(14%) contrast(220%)", "밝은 노랑"],
  "linen": ["#FAF0E6", "hue-rotate(335deg) brightness(199%) saturate(7%) contrast(220%)", "리넨색"],
  "salmon": ["#FA8072", "hue-rotate(352deg) saturate(125%) brightness(140%) contrast(180%)", "연어색"],
  "oldlace": ["#FDF5E6", "hue-rotate(345deg) brightness(199%) saturate(10%) contrast(220%)", "오래된 레이스색"],
  "bisque": ["#FFE4C4", "hue-rotate(345deg) brightness(193%) saturate(15%) contrast(220%)", "비스크"],
  "blanchedalmond": ["#FFEBCD", "hue-rotate(333deg) brightness(193%) saturate(11%) contrast(220%)", "블랜치드 아몬드"],
  "coral": ["#FF7F50", "hue-rotate(335deg) saturate(130%) brightness(135%) contrast(100%)", "산호색"],
  "cornsilk": ["#FFF8DC", "hue-rotate(13deg) brightness(199%) saturate(14%) contrast(220%)", "옥수수수염색"],
  "darkorange": ["#FF8C00", "hue-rotate(339deg) saturate(130%) brightness(140%) contrast(100%)", "진주황"],
  "deeppink": ["#FF1493", "hue-rotate(281deg) saturate(130%) brightness(110%) contrast(160%)", "진분홍"],
  "floralwhite": ["#FFFAF0", "hue-rotate(347deg) brightness(200%) saturate(10%) contrast(220%)", "플로럴 화이트"],
  "fuchsia": ["#FF00FF", "hue-rotate(259deg) saturate(130%) brightness(110%) contrast(160%)", "푸크시아"],
  "gold": ["#FFD700", "hue-rotate(10deg) brightness(187%) saturate(109%) contrast(100%)", "금색"],
  "hotpink": ["#FF69B4", "hue-rotate(271deg) saturate(100%) brightness(136%) contrast(120%)", "핫핑크"],
  "ivory": ["#FFFFF0", "hue-rotate(15deg) brightness(199%) saturate(14%) contrast(220%)", "아이보리"],
  "lavenderblush": ["#FFF0F5", "hue-rotate(288deg) brightness(215%) saturate(3%) contrast(220%)", "라벤더 블러시"],
  "lemonchiffon": ["#FFFACD", "hue-rotate(24deg) brightness(200%) saturate(7%) contrast(220%)", "레몬 시폰"],
  "lightpink": ["#FFB6C1", "hue-rotate(275deg) brightness(187%) saturate(30%) contrast(130%)", "밝은 분홍"],
  "lightsalmon": ["#FFA07A", "hue-rotate(332deg) brightness(160%) saturate(60%) contrast(130%)", "밝은 연어색"],
  "lightyellow": ["#FFFFE0", "hue-rotate(14deg) brightness(199%) saturate(19%) contrast(220%)", "연노랑"],
  "mistyrose": ["#FFE4E1", "hue-rotate(307deg) brightness(199%) saturate(10%) contrast(220%)", "미스티 로즈"],
  "moccasin": ["#FFE4B5", "hue-rotate(328deg) brightness(195%) saturate(10%) contrast(220%)", "모카신"],
  "navajowhite": ["#FFDEAD", "hue-rotate(328deg) brightness(193%) saturate(12%) contrast(220%)", "나바호 화이트"],
  "orange": ["#FFA500", "hue-rotate(345deg) brightness(159%) saturate(102%) contrast(120%)", "주황"],
  "orangered": ["#FF4500", "hue-rotate(297deg) brightness(115%) saturate(122%) contrast(160%)", "주홍"],
  "papayawhip": ["#FFEFD5", "hue-rotate(341deg) brightness(199%) saturate(11%) contrast(220%)", "파파야 휩"],
  "peachpuff": ["#FFDAB9", "hue-rotate(312deg) brightness(190%) saturate(12%) contrast(270%)", "피치 퍼프"],
  "omenpink": ["#FFC0CB", "hue-rotate(299deg) brightness(180%) saturate(15%) contrast(270%)", "분홍"],
  "omenred": ["#FF0000", "hue-rotate(306deg) brightness(85%) saturate(190%) contrast(200%)", "빨강"],
  "seashell": ["#FFF5EE", "hue-rotate(1deg) brightness(199%) saturate(5%) contrast(220%)", "조개껍데기색"],
  "snow": ["#FFFAFA", "hue-rotate(1deg) brightness(205%) saturate(0%) contrast(220%)", "눈색"],
  "tomato": ["#FF6347", "hue-rotate(311deg) saturate(130%) brightness(135%) contrast(100%)", "토마토색"],
  "white": ["#FFFFFF", "hue-rotate(0deg) brightness(205%) saturate(0%) contrast(220%)", "흰색"],
  "yellow": ["#FFFF00", "hue-rotate(11deg) brightness(205%) saturate(10%) contrast(220%)", "노랑"]
}

/**
 * Export `color`
 */

/**
 * Get a color from a hex value
 *
 * @param {String} hex
 * @param {Object} color_map
 * @return {String} color
 * @api public
 */
window.colorNamer = function(hex, color_map) {
	color_map = color_map || colors;
	var rgb = h2r(hex);
	var min = Infinity;
	var closest = null;

	for (var color in color_map) {
		var rgb2 = h2r(color_map[color][0])

		// distance formula
		var dist = Math.pow((rgb.r - rgb2.r) * .299, 2)
			+ Math.pow((rgb.g - rgb2.g) * .587, 2)
			+ Math.pow((rgb.b - rgb2.b) * .114, 2);

		if (dist <= min) {
			closest = color;
			min = dist;
		}
	}

	return closest;
}

window.colorNameTranslate = function(name, mode) {
  return (mode == "spaced name") ? colors[name][2] : (mode == "hex") ? colors[name][0] : colors[name][1]
}

/**
 * Hex to RGB
 *
 * @param {String} hex
 * @return {Object} rbg
 */

function h2r(hex) {
  hex = '#' == hex[0] ? hex.slice(1) : hex;
  if (h2rs[hex]) return h2rs[hex];
  var int = parseInt(hex, 16);
  var r = (int >> 16) & 255;
  var g = (int >> 8) & 255;
  var b = int & 255;
  return h2rs[hex] = { r: r, g: g, b: b };
}

// KR: colors 사전을 window에 노출한다. 원래 이 파일 안에서만 보이던 값이라
// window.colors를 참조하는 다른 파일(colours.js의 setup.colourName 등)에서
// 계속 undefined로 인식되고 있었다.
window.colors = colors;
