/* eslint-disable no-undef */
/*
	Key points
	series: "seriesName", //Will only show the first locked feat in a series to the player
	softLockable: true, //Will disable the unlocking of the feat if softmode is enabled
	pregnancyLockable: true, //Will disable the unlocking of the feat if certain pregnancy settings are too low
	hidden: true, //Will hide the feat at all times unless unlocked, best for feats for unreleased content
	alt: "altTitle", //Alternate title to display if the feat is unlocked and altCond is met
	altCond: "conditional" //Conditional evaluated to decide whether or not to display the altTitle (the feat must be owned in the current save for this to happen, regardless of the conditional)
*/
setup.feats = {
	"Pocket Change": {
		title: "잔돈",
		desc: "£1,000 보유하기.",
		difficulty: 1,
		series: "money",
		filter: ["All", "General"],
		softLockable: true,
	},
	"Money Maker": {
		title: "돈벌레",
		desc: "£10,000 보유하기.",
		difficulty: 1,
		series: "money",
		filter: ["All", "General"],
		softLockable: true,
	},
	Tycoon: {
		title: "재벌",
		desc: "£100,000 보유하기.",
		difficulty: 2,
		series: "money",
		filter: ["All", "General"],
		softLockable: true,
	},
	Millionaire: {
		title: "백만장자",
		desc: "£1,000,000 보유하기.",
		difficulty: 3,
		series: "money",
		filter: ["All", "General"],
		softLockable: true,
	},
	"It Belongs in a Museum": {
		title: "이건 박물관으로 가야 해!",
		desc: "모든 유물 찾기.",
		difficulty: 3,
		series: "",
		filter: ["All", "General"],
		softLockable: true,
	},
	"Fully Covered": {
		title: "전신 범벅",
		desc: "물이 아닌 다른 무언가로 흠뻑 젖기.",
		difficulty: 3,
		series: "",
		filter: ["All", "General"],
	},
	"Being a Boy": {
		title: "소년의 삶",
		desc: "소년으로서 50일 차에 도달하기.",
		difficulty: 1,
		series: "",
		filter: ["All", "General"],
		softLockable: true,
	},
	"Being a Girl": {
		title: "소녀의 삶",
		desc: "소녀로서 50일 차에 도달하기.",
		difficulty: 1,
		series: "",
		filter: ["All", "General"],
		softLockable: true,
	},
	"Being a Hermaphrodite": {
		title: "후타나리의 삶",
		desc: "후타나리로서 50일 차에 도달하기.",
		difficulty: 1,
		series: "",
		filter: ["All", "General"],
		softLockable: true,
	},
	"Being an Orphan": {
		title: "고아의 삶",
		desc: "150일 차에 도달하기.",
		difficulty: 2,
		series: "",
		filter: ["All", "General"],
		softLockable: true,
	},
	"Stressful Challenge": {
		title: "스트레스 챌린지",
		desc: "기절하지 않고 50일 차에 도달하기.",
		difficulty: 2,
		series: "challenge",
		filter: ["All", "General"],
		softLockable: true,
	},
	"Long Stressful Challenge": {
		title: "장기 스트레스 챌린지",
		desc: "기절하지 않고 150일 차에 도달하기.",
		difficulty: 3,
		series: "challenge",
		filter: ["All", "General"],
		softLockable: true,
	},
	Billboard: {
		title: "걸어다니는 광고판",
		desc: "몸에 광고를 새기고 수익을 얻기.",
		difficulty: 1,
		series: "",
		filter: ["All", "General"],
	},
	"A Living Canvas": {
		title: "살아있는 캔버스",
		desc: "모든 부위에 문신 새기기.",
		difficulty: 1,
		series: "",
		filter: ["All", "General"],
	},
	Farmhand: {
		title: "농장 일꾼",
		desc: "알렉스가 농장을 확장하도록 돕기.",
		difficulty: 2,
		series: "alex",
		filter: ["All", "General"],
	},
	Farmer: {
		title: "농부",
		desc: "농장을 예전의 영광스러운 모습으로 되돌리기.",
		difficulty: 3,
		series: "alex",
		filter: ["All", "General"],
	},
	Cultivator: {
		title: "경작자",
		desc: "알렉스 농장의 모든 밭을 개간하기.",
		difficulty: 3,
		series: "alex",
		filter: ["All", "General"],
	},
	"The Rival Farm": {
		title: "라이벌 농장",
		desc: "농장 확장 시설 하나를 끝까지 업그레이드하기.",
		difficulty: 2,
		series: "farm",
		filter: ["All", "General"],
	},
	"The Rival Estate": {
		title: "라이벌 대농장",
		desc: "모든 농장 확장 시설 짓기.",
		difficulty: 3,
		series: "farm",
		filter: ["All", "General"],
	},
	"Heroic Victory": {
		title: "영웅적 승리",
		desc: "레미로부터 9개의 밭을 하나도 잃지 않고 지켜내기.",
		difficulty: 3,
		series: "",
		filter: ["All", "General"],
	},
	"Five in a Row": {
		title: "5연승",
		desc: "블랙잭에서 연속으로 5번 승리하기.",
		difficulty: 1,
		series: "",
		filter: ["All", "General"],
	},
	Distinction: {
		title: "우등상",
		desc: "학교 시험에서 우등상 받기.",
		difficulty: 1,
		series: "distinction",
		filter: ["All", "General"],
	},
	Distinctive: {
		title: "특출난 학생",
		desc: "학교 시험에서 우등상 5회 받기.",
		difficulty: 2,
		series: "distinction",
		filter: ["All", "General"],
	},
	Distinguished: {
		title: "명예로운 학생",
		desc: "학교 시험에서 우등상 15회 받기.",
		difficulty: 3,
		series: "distinction",
		filter: ["All", "General"],
	},
	"Chef de Tournant": {
		title: "쉐프 투르낭",
		desc: "레시피 5개 배우기.",
		difficulty: 1,
		series: "chef",
		filter: ["All", "General"],
	},
	"Chef de Partie": {
		title: "쉐프 드 파티",
		desc: "레시피 20개 배우기.",
		difficulty: 2,
		series: "chef",
		filter: ["All", "General"],
	},
	"Sous Chef": {
		title: "수쉐프",
		desc: "레시피 50개 배우기.",
		difficulty: 3,
		series: "chef",
		filter: ["All", "General"],
	},
	"Science Fair Winner": {
		title: "과학 경진대회 우승자",
		desc: "과학의 힘으로 모두의 눈을 멀게 하세요.",
		difficulty: 2,
		series: "scienceFair",
		filter: ["All", "General"],
		softLockable: true,
	},
	"Thesis Offence": {
        title: "논문 공격",
        desc: "무력으로 과학적 무결성을 지켜냈습니다.",
        difficulty: 3,
        series: "scienceFair",
        filter: ["All", "General"],
        hint: "힌트: 과학과는 거리가 먼 무언가로 상대의 눈을 멀게 하십시오.",
        softLockable: true,
    },
	"Maths Competition Winner": {
		title: "수학 경시대회 우승자",
		desc: "야비한 수를 썼든 안 썼든 간에요.",
		difficulty: 2,
		series: "",
		filter: ["All", "General"],
		softLockable: true,
	},
	"Rich Hearts": {
		title: "리치 하트",
		desc: "영어 수업 연극에서 훌륭한 연기 선보이기.",
		difficulty: 2,
		series: "",
		filter: ["All", "General"],
		softLockable: true,
	},
	"50 Shades of Tan": {
		title: "태닝의 50가지 그림자",
		desc: "동시에 5가지의 뚜렷한 태닝 자국 얻기.",
		difficulty: 2,
		series: "",
		filter: ["All", "Special"],
		hint: "힌트: 햇빛 아래에서 시간을 보내십시오.",
	},
	"Most Aware": {
		title: "세상 물정에 밝은",
		desc: "당신은 남들이 못 보는 것을 봅니다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Stats"],
	},
	"Most Innocent": {
		title: "가장 순수한 자",
		desc: "모든 게 다 괜찮을 거예요.",
		difficulty: 1,
		series: "",
		filter: ["All", "Stats"],
	},
	"No More Control": {
		title: "통제 불능",
		desc: "이보다 더 음란해질 수 없습니다!",
		difficulty: 2,
		series: "",
		filter: ["All", "Stats"],
	},
	Thief: {
		title: "도둑",
		desc: "물건을 '얻는' 방법을 알고 계시네요.",
		difficulty: 2,
		series: "",
		filter: ["All", "Stats"],
	},
	"May I have this Dance?": {
		title: "저와 춤추시겠습니까?",
		desc: "아무도 당신의 몸짓에 저항할 수 없습니다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Stats"],
	},
	Aquanaut: {
		title: "수중 비행사",
		desc: "트레저 헌터를 위하여.",
		difficulty: 1,
		series: "",
		filter: ["All", "Stats"],
	},
	Seductress: {
		title: "유혹자",
		desc: "주도권을 쥐어보세요.",
		difficulty: 1,
		series: "",
		filter: ["All", "Stats"],
	},
	"Green Fingered": {
		title: "식물학자",
		desc: "당신은 무릎을 꿇은 채로 많은 걸 해낼 수 있습니다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Stats"],
	},
	Majordomo: {
		title: "저택 관리인",
		desc: "그 어떤 먼지도 당신의 눈을 피할 수 없습니다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Stats"],
	},
	Swift: {
		title: "날쌘돌이",
		desc: "바람처럼.",
		difficulty: 1,
		series: "",
		filter: ["All", "Stats"],
	},
	Alluring: {
		title: "매혹적인 자",
		desc: "관심을 끄는 건 식은 죽 먹기입니다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Stats"],
		softLockable: true,
	},
	"Sex Specialist": {
		title: "섹스 스페셜리스트",
		desc: "당신은 다른 이를 절정에 달하게 하는 데 탁월합니다.",
		difficulty: 3,
		series: "",
		filter: ["All", "Stats"],
		alt: "Degree in Lewdity",
		altCond: "random(100) is 100",
	},
	"Perfect Record": {
		title: "완벽한 성적표",
		desc: "당신은 공부에 탁월합니다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Stats"],
	},
	"Perfect Sub": {
		title: "완벽한 복종",
		desc: "복종의 정점.",
		difficulty: 2,
		series: "",
		filter: ["All", "Stats"],
	},
	"Defying the Odds": {
		title: "불굴의 반항",
		desc: "반항의 정점.",
		difficulty: 2,
		series: "",
		filter: ["All", "Stats"],
	},
	Hawker: {
		title: "노점상",
		desc: "대지에서 이윤을 창출하세요.",
		difficulty: 1,
		series: "market",
		filter: ["All", "Stats"],
	},
	Vendor: {
		title: "행상인",
		desc: "당신의 장사 수완을 증명하세요.",
		difficulty: 2,
		series: "market",
		filter: ["All", "Stats"],
	},
	Merchant: {
		title: "상인",
		desc: "시장을 장악하세요.",
		difficulty: 2,
		series: "market",
		filter: ["All", "Stats"],
	},
	"Twisted Desire": {
		title: "뒤틀린 욕망",
		desc: "고통은 선택입니다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Stats"],
	},
	"Served Hot": {
		title: "뜨거운 맛",
		desc: "당신은 그들을 다치게 할 거고, 또 그걸 즐길 겁니다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Stats"],
	},
	Sadomasochist: {
		title: "사도마조히스트",
		desc: "당신은 고통을 주기도, 받기도 원합니다.",
		difficulty: 3,
		series: "",
		filter: ["All", "Stats"],
	},
	"Shining Reputation": {
		title: "빛나는 평판",
		desc: "올바른 방면으로만 유명해졌습니다.",
		difficulty: 3,
		series: "",
		filter: ["All", "Stats"],
	},
	"Social Butterfly": {
		title: "마당발",
		desc: "당신은 관심의 중심입니다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Social"],
	},
	"Anti-Social Moth": {
		title: "외톨이 나방",
		desc: "친구가 무슨 소용이죠?",
		difficulty: 1,
		series: "",
		filter: ["All", "Social"],
	},
	"Teachers Pet": {
		title: "선생님의 총애",
		desc: "당신은 반에서 가장 우수한 학생입니다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Social"],
	},
	"Teachers Nightmare": {
		title: "선생님의 악몽",
		desc: "당신은 공포 그 자체입니다!",
		difficulty: 1,
		series: "",
		filter: ["All", "Social"],
	},
	"Robin the Lover": {
		title: "연인 로빈",
		desc: "그에게 당신의 순결을 바쳤습니다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Hungry Orphan": {
		title: "배고픈 고아",
		desc: "로빈이 가장 좋아하는 음식을 선물했습니다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Robin's Song": {
		title: "로빈의 노래",
		desc: "로빈이 이성 복장에 편안함을 느끼도록 도왔습니다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Whitney the Tsundere": {
		title: "불량배 휘트니",
		desc: "그에게 당신의 순결을 바쳤습니다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"The Bully's Tithe": {
		title: "일진의 상납금",
		desc: "휘트니가 가장 좋아하는 음식을 선물했습니다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Delinquent Antics": {
		title: "비행 청소년의 장난",
		desc: "수업 중에 휘트니가 절정에 달하게 만들었습니다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Social"],
	},
	"Giddy Up": {
		title: "이럇",
		desc: "휘트니를 수영장에 빠뜨리기.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Whitney's Secret": {
		title: "휘트니의 비밀",
		desc: "휘트니의 컬렉션 발견하기.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Kylar the Obsessed": {
		title: "집착하는 카일라",
		desc: "그에게 당신의 순결을 바쳤습니다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Not for Rats": {
		title: "쥐를 위한 게 아냐",
		desc: "카일라가 가장 좋아하는 음식을 선물했습니다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Eden the Lonely": {
		title: "외로운 에덴",
		desc: "그에게 당신의 순결을 바쳤습니다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Sweet and Tender": {
		title: "달콤하고 부드럽게",
		desc: "에덴이 가장 좋아하는 음식을 선물했습니다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Avery the Moneybags": {
		title: "갑부 에이버리",
		desc: "그에게 당신의 순결을 바쳤습니다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	Kept: {
		title: "후원받는 자",
		desc: "에이버리의 저택에 들어갔습니다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
		hint: "힌트: 부유한 후원자를 찾으세요.",
	},
	"What Goes Around": {
		title: "인과응보",
		desc: "에이버리를 그의 지하실에 묶어버렸습니다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
		hint: "힌트: 부유한 후원자에게 역공을 가하세요.",
	},
	"Most Exclusive": {
		title: "최고의 VIP",
		desc: "예약 대기가 1년이나 걸리는 레스토랑에서 식사했습니다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
		hint: "힌트: 부유한 후원자와 발렌타인 데이트를 하세요.",
	},
	"Pride Cometh": {
		title: "무너지는 교만",
		desc: "에이버리의 타워 완성하기.",
		difficulty: 3,
		series: "",
		filter: ["All", "Social"],
		hint: "힌트: 부유한 후원자를 도우세요.",
	},
	"Haute Cuisine": {
		title: "최고급 요리",
		desc: "에이버리가 가장 좋아하는 음식을 선물했습니다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Leighton the Shady": {
		title: "음흉한 레이튼",
		desc: "그에게 당신의 순결을 바쳤습니다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Alex the Robust": {
		title: "건장한 알렉스",
		desc: "그에게 당신의 순결을 바쳤습니다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Home Cooking": {
		title: "집밥",
		desc: "알렉스가 가장 좋아하는 음식을 선물했습니다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Great Hawk the Terror": {
		title: "공포의 거대 매",
		desc: "당신은 훌륭한 반려자가 될 것입니다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Return the Favour": {
		title: "보은",
		desc: "거대 매가 가장 좋아하는 음식을 선물했습니다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Feather Trick": {
		title: "깃털 속임수",
		desc: "거대 매와 사냥하며 한 번의 강하로 잠복꾼을 세 마리 잡기.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Wren the Sly": {
		title: "교활한 렌",
		desc: "그에게 당신의 순결을 바쳤습니다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Great Wolf the Alpha": {
		title: "우두머리 검은 늑대",
		desc: "그에게 당신의 순결을 바쳤습니다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Encroaching Civilisation": {
		title: "잠식하는 문명",
		desc: "검은 늑대가 가장 좋아하는 음식을 선물했습니다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Sydney the Pure Hearted": {
		title: "순수한 마음의 시드니",
		desc: "시드니가 당신에게 순결을 바쳤습니다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	Communion: {
		title: "교감",
		desc: "시드니가 가장 좋아하는 음식을 선물했습니다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Harper the Hypnotist": {
		title: "최면술사 하퍼",
		desc: "그에게 당신의 순결을 바쳤습니다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Morgan the Lost": {
		title: "길 잃은 모건",
		desc: "그에게 당신의 순결을 바쳤습니다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Gwylan the Bewitching": {
		title: "매혹적인 그윌란",
		desc: "그에게 당신의 순결을 바쳤습니다.",
		difficulty: 2,
		series: "gwylanVirginity",
		hint: "힌트: 호기심이 처녀/동정을 죽였습니다.",
		filter: ["All", "Social"],
	},
	"Coven Comforts": {
		title: "마녀의 위안",
		desc: "그윌란이 가장 좋아하는 음식을 선물했습니다.",
		difficulty: 2,
		series: "",
		hint: "힌트: 사악한 자를 위한 음식.",
		filter: ["All", "Social"],
		hidden: true,
	},
	"Love Triangles": {
		title: "삼각관계",
		desc: "누구를 선택해야 할지 모르겠습니다.",
		difficulty: 2,
		series: "love triangles",
		filter: ["All", "Social"],
	},
	"Love Trapezoids": {
		title: "사각관계",
		desc: "세 명으로는 부족했나 봅니다.",
		difficulty: 3,
		series: "love triangles",
		filter: ["All", "Social"],
	},
	"Be My Valentine": {
		title: "내 발렌타인이 되어줘",
		desc: "적절한 타이밍에 발렌타인 초콜릿 선물하기.",
		difficulty: 1,
		filter: ["All", "Social"],
	},
	"Ballroom Show-off": {
		title: "무도회장의 과시꾼",
		desc: "에이버리와 함께 나간 대회에서 우승하기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Social"],
	},
	"Under the Table": {
		title: "술고래",
		desc: "술 마시기 대결에서 당신의 패기를 증명하기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Social"],
	},
	"Pub Crawl Victors": {
		title: "펍 크롤 우승자",
		desc: "직장 동료들과 함께 나간 대회에서 우승하기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Social"],
	},
	"Mason's Secret": {
		title: "메이슨의 비밀",
		desc: "메이슨이 말하고 싶어 하지 않는 것을 공유하도록 설득하기.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Mason's Shame": {
		title: "메이슨의 수치",
		desc: "라커 안에서 메이슨이 절정에 달하게 만들기.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Animal Tender": {
		title: "동물 조련사",
		desc: "알렉스 농장의 모든 동물의 존경을 받기.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"I Spy": {
		title: "훔쳐보기",
		desc: "샤워 중인 알렉스를 훔쳐보기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Social"],
	},
	"First Kiss": {
		title: "첫 키스",
		desc: "연애 대상에게 당신의 첫 키스를 뺏기기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Social"],
	},
	"A Crime Most Foul": {
		title: "가장 끔찍한 범죄",
		desc: "한 번의 지각, 영원한 수치.",
		difficulty: 2,
		series: "",
		hint: "힌트: 몸에 새겨진 낙인을 영구적으로 만드세요.",
		filter: ["All", "Social"],
	},
	Longing: {
		title: "갈망",
		desc: "카일라의 집에서 탈출하기.",
		difficulty: 3,
		series: "",
		hint: "힌트: 카일라를 절제된 광기로 몰아넣으세요.",
		filter: ["All", "Social"],
	},
	"Pagan Rite": {
		title: "이교도 의식",
		desc: "카일라의 부모님에 대해 알게 되었습니다.",
		difficulty: 1,
		series: "",
		hint: "힌트: 카일라 저택의 비밀을 발견하세요.",
		filter: ["All", "Social"],
	},
	"Warmest Winter": {
		title: "가장 따뜻한 겨울",
		desc: "윈터의 가장 사적인 이야기를 들었습니다.",
		difficulty: 2,
		series: "",
		hint: "힌트: 늙은 화석이 기억을 되찾도록 도우세요.",
		filter: ["All", "Social"],
	},
	"Trials of Faith": {
		title: "믿음의 시험",
		desc: "'희망 없는 굴레' 이야기의 모든 결말을 들었습니다.",
		difficulty: 4,
		series: "",
		hint: "힌트: 수많은 거짓말 뒤에 묻힌 진실.",
		filter: ["All", "Social"],
	},
	"First Verse": {
		title: "첫 소절",
		desc: "그윌란이 숲의 거주자를 정화하는 것을 도왔습니다.",
		difficulty: 1,
		series: "gwylanPurge",
		hint: "힌트: 상점 주인의 비밀을 알아내고, 함께 동참하세요.",
		filter: ["All", "Social"],
	},
	Wildsong: {
		title: "야생의 노래",
		desc: "육체적 결합을 통해 그윌란이 숲을 정화하는 것을 도왔습니다.",
		difficulty: 2,
		series: "gwylanPurge",
		hint: "힌트: 그윌란의 비밀을 더 깊이 파헤치세요.",
		filter: ["All", "Social"],
	},
	Foxbane: {
		title: "여우의 재앙",
		desc: "에덴의 최악의 악몽을 목격했습니다.",
		difficulty: 2,
		series: "",
		hint: "힌트: 친구의 도움을 받아 사냥꾼에게서 도망치세요.",
		filter: ["All", "Social"],
	},
	Neko: {
		title: "야옹벽해(Purrfect)",
		desc: "관심을 받기 위해 가르랑거리기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Transformation"],
	},
	Wolf: {
		title: "달을 향해 짖어라",
		desc: "무리의 일원이 되고 싶어 합니다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Transformation"],
	},
	Cattle: {
		title: "황소를 건드리면...",
		desc: "착유 당할 준비 완료.",
		difficulty: 1,
		series: "",
		filter: ["All", "Transformation"],
	},
	Harpy: {
		title: "독수리처럼 날아라",
		desc: "거대한 그림자 드리우기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Transformation"],
	},
	Fox: {
		title: "교활한 여우 같으니",
		desc: "도둑질하는 꼬마 악동.",
		difficulty: 1,
		series: "",
		filter: ["All", "Transformation"],
	},
	Angel: {
		title: "천사처럼 걸어라",
		desc: "추락(타락)하지 않도록 노력하세요.",
		difficulty: 1,
		series: "",
		filter: ["All", "Transformation"],
	},
	"Fallen Angel": {
		title: "추락, 타락, 그리고...",
		desc: "잔혹한 더럽혀짐.",
		difficulty: 1,
		series: "",
		filter: ["All", "Transformation"],
	},
	Demon: {
		title: "악마 같은 외모",
		desc: "엄청난 음란함의 원인.",
		difficulty: 1,
		series: "",
		filter: ["All", "Transformation"],
	},
	"A Special Trait": {
		title: "특별한 특성",
		desc: "특별한 특성 하나 얻기.",
		difficulty: 2,
		series: "special trait",
		hint: "힌트: 뭔가 특별한 것.",
		filter: ["All", "Special"],
	},
	"A Special Trait Collector": {
		title: "특별한 특성 수집가",
		desc: "모든 특별한 특성 획득하기.",
		difficulty: 3,
		hint: "힌트: 뭔가 아주 특별한 것.",
		series: "special trait",
		filter: ["All", "Special"],
	},
	"Broodmother Host": {
		title: "무리의 어미 숙주",
		desc: "끝없이 많은 작은 생물들의 숙주가 되었습니다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Pregnancy"],
		hint: "힌트: 남겨진 무언가.",
	},
	"Top Broodmother Host": {
		title: "최고의 무리의 어미 숙주",
		desc: "완벽한 생물의 숙주가 되었습니다.",
		difficulty: 3,
		series: "",
		filter: ["All", "Pregnancy"],
		hint: "힌트: 남겨진 놀라운 무언가.",
	},
	"Broodmother Zoologist": {
		title: "동물학자 무리의 어미",
		desc: "기생충 노트를 완성했습니다.",
		difficulty: 3,
		series: "",
		filter: ["All", "Pregnancy"],
		hint: "힌트: 남겨진 모든 것들을 조심스럽게 기록하세요.",
	},
	"Miracle of Life": {
		title: "생명의 기적",
		desc: "첫 아이를 낳았습니다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Pregnancy"],
		pregnancyLockable: true,
	},
	"First Fatherhood": {
		title: "첫 아버지",
		desc: "첫 아이의 아버지가 되었습니다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Pregnancy"],
	},
	"Hail Mary": {
		title: "성모 마리아",
/* ========= 번역 필요 ========= */
		desc: "Have a vaginal birth as a virgin.",
/* ========================= */
		difficulty: 4,
		series: "",
		filter: ["All", "Pregnancy"],
		hint: "힌트: 무언가를 얻었지만, 다른 것을 희생하지 않았습니다.",
		pregnancyLockable: true,
	},
	"Bicycle Mother": {
		title: "마을버스 엄마",
/* ========= 번역 필요 ========= */
		desc: "Gave birth without knowing who the donor is while having five or more possible suspects.",
/* ========================= */
		difficulty: 2,
		series: "",
		filter: ["All", "Pregnancy"],
		hint: "힌트: 누가 그랬는지 아시나요?",
	},
	"Life Comes in Threes": {
		title: "세 쌍둥이의 탄생",
		desc: "세 쌍둥이를 낳았습니다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Pregnancy"],
		hint: "힌트: 세 가지의 같은 종류.",
		pregnancyLockable: true,
	},
	"Life begins when you least expect": {
		title: "예상치 못한 생명의 탄생",
		desc: "남성의 몸으로 아이를 낳았습니다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Pregnancy"],
		hint: "힌트: 있어서는 안 될 것을 창조하는 마법.",
	},
	"Diversity of Life": {
		title: "생명의 다양성",
		desc: "수많은 다양한 종의 아이들을 낳았습니다.",
		difficulty: 4,
		series: "",
		filter: ["All", "Pregnancy"],
		hint: "힌트: 다양한 형태의 존재.",
		pregnancyLockable: true,
	},
	/* "Broken Dam":{ //Not in the code right now
		title: "Broken Dam",
		desc: "Get impregnated thanks to a broken condom.",
		difficulty: 2,
		series: "",
		filter: ["All", "Pregnancy"],
		hint: "Hint: ."
	}, */
	/* "Seed Spreader":{  ToDo: Pregnancy: uncomment once you can impregnate more that 3 named npc's
		title: "Seed Spreader",
		desc: "Impregnate three NPCs in a single day.",
		difficulty: 1,
		series: "",
		filter: ["All", "Pregnancy"],
		hint: "Hint: ."
	}, */
	"Producer of Lewd Fluids": {
		title: "음란한 체액 생산자",
		desc: "저 촉수들은 누가 상전인지 잘 압니다.",
		difficulty: 1,
		series: "lewd fluids",
		filter: ["All", "Special"],
		hint: "힌트: 촉수들이 당신을 부러워합니다.",
	},
	"Literally Buckets": {
		title: "한 바가지",
		desc: "촉수의 신.",
		difficulty: 2,
		series: "lewd fluids",
		filter: ["All", "Special"],
		hint: "힌트: [검열됨]으로 가득 찬 욕조.",
	},
	"Feeling Full": {
		title: "가득 찬 기분",
		desc: "음란한 체액으로 가득 찼습니다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Special"],
		hint: "힌트: 성대한 식사 후에.",
	},
	"Head Chief": {
		title: "수석 셰프",
		desc: "사람들은 당신의 빵을 너무나 좋아합니다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 타인을 위해 빵을 구우세요.",
	},
	"Locked In Gold": {
		title: "황금에 갇히다",
		desc: "좌절감으로부터 당신을 지켜주진 못할 겁니다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 잃어버리는 것보다 잠가두는 편이 낫습니다.",
	},
	"Bailey's Trouble Maker": {
		title: "베일리의 골칫거리",
		desc: "그가 절정에 달하게 만들기.",
		difficulty: 3,
		series: "",
		filter: ["All", "Special"],
		hint: "힌트: 고아원의 골칫거리.",
	},
	"Leighton's Nightmare": {
		title: "레이튼의 악몽",
		desc: "그가 절정에 달하게 만들기.",
		difficulty: 3,
		series: "",
		filter: ["All", "Special"],
		hint: "힌트: 학교의 골칫거리.",
	},
	"Alex's Partner": {
		title: "알렉스의 파트너",
		desc: "그가 절정에 달하게 만들기.",
		difficulty: 3,
		series: "",
		filter: ["All", "Special"],
		hint: "힌트: 즐거움이 가득한 밭.",
	},
	"Harper's Bane": {
		title: "하퍼의 골칫거리",
		desc: "하퍼가 자신의 혈청을 마시게 만들기.",
		difficulty: 3,
		series: "",
		filter: ["All", "Special"],
		hint: "힌트: 자업자득을 맛보여주세요.",
	},
	Laughingstock: {
		title: "웃음거리",
		desc: "누군가를 형틀에 보내기.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 그들에게 굴욕을 주세요.",
	},
	"You're the Laughingstock": {
		title: "당신이 바로 웃음거리",
		desc: "형틀에 묶이기.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 범죄자로 낙인찍히세요.",
	},
	"The Endless Deep": {
		title: "끝없는 심해",
		desc: "바다를 향해 계속 헤엄치기.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 세상의 끝을 향하여.",
	},
	"Wet and Ruined": {
		title: "젖고 파괴된",
		desc: "폐성을 발견하기.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 진흙탕 속에서 길을 잃다.",
	},
	"Terror's Equal": {
		title: "공포와 동등한 자",
		desc: "탑을 인상적인 사냥 전리품으로 채우기.",
		difficulty: 3,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 하늘의 공포에 걸맞은 허영심.",
		softLockable: true,
	},
	"Birds of a Feather": {
		title: "유유상종...",
		desc: "...끼리끼리 모이는 법.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 다른 종족의 고아를 구조하세요.",
	},
	"Head of the Pack": {
		title: "무리의 우두머리",
		desc: "늑대들의 리더가 되기.",
		difficulty: 2,
		series: "wolves",
		filter: ["All", "Special"],
		hint: "힌트: 리더가 되는 것.",
	},
	"Top of the Food Chain": {
		title: "먹이사슬의 정점",
		desc: "모두가 끔찍한 울음소리를 두려워합니다.",
		difficulty: 2,
		series: "wolves",
		filter: ["All", "Special"],
		hint: "힌트: 리더십을 증명하세요.",
	},
	"Illicit Science": {
		title: "불법 과학",
		desc: "연구 단지를 발견하기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 법을 준수하는 자들에겐 숨겨진 비밀.",
	},
	"Mouth Sealed Shut": {
		title: "굳게 다문 입",
		desc: "심문에서 살아남기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 비밀을 누설하지 마세요.",
	},
	"Neck Deep": {
		title: "목까지 잠겨",
		desc: "최음제에 잠긴 채 살아남기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 극강의 음란한 물질에 저항하세요.",
	},
	Seedy: {
		title: "씨앗 수집가",
		desc: "씨앗의 절반을 발견하기.",
		difficulty: 1,
		series: "seeds",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 자연의 비밀을 수확하세요.",
		softLockable: true,
	},
	Breedy: {
		title: "품종 개량가",
		desc: "씨앗은 작지만, 당신의 눈을 피할 순 없습니다.",
		difficulty: 2,
		series: "seeds",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 자연의 모든 비밀을 수확하세요.",
		softLockable: true,
/* ========= 번역 필요 ========= */
	},
	"Wet Rod": {
		title: "Wet Rod",
		desc: "Caught one of every fish.",
		difficulty: 2,
		series: "fishing",
		filter: ["All", "Discoveries-Other"],
		hint: "Hint: Complete your fishing records.",
	},
	"Master Baiter": {
		title: "Master Baiter",
		desc: "Caught the biggest size possible of each fish.",
		difficulty: 3,
		series: "fishing",
		filter: ["All", "Discoveries-Other"],
		hint: "Hint: Catch a giant specimen of every fish.",
	},
	"Nice Bass": {
		title: "Nice Bass",
		desc: "Caught a bass.",
		difficulty: 1,
		series: "fishing",
		filter: ["All", "Discoveries-Other"],
		hint: "Hint: Reel in a bass.",
/* ========================= */
	},
	"Pride of the Farm": {
		title: "농장의 자랑",
		desc: "다른 모든 이들을 능가하는 수확량 달성하기.",
		difficulty: 2,
		series: "",
		filter: ["All", "Special"],
		hint: "힌트: 최고의 수확량.",
	},
	"Dawn to Dusk": {
		title: "새벽부터 해 질 녘까지",
		desc: "농장에서 하루 종일 일하기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Special"],
		hint: "힌트: 정직한 농경 노동.",
	},
	"Runaway Cattle": {
		title: "도망친 가축",
		desc: "레미의 농장에서 탈출하기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 어떤 우리도 당신을 가둘 수 없습니다.",
		softLockable: true,
	},
	"Equine Rescue": {
		title: "말의 구조",
		desc: "말 친구들에 의해 구조되기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 들판에 쓰러지되, 대가를 피하세요.",
	},
	"A Thunderous Response": {
		title: "우레와 같은 반응",
		desc: "하이 스트리트에서 난투극 벌이기.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 군중 속에 분열을 일으키세요.",
	},
	"A Lewd Adventure": {
		title: "음란한 모험",
		desc: "노출된 채 마을을 가로지르는 여정 마치기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 대담한 여정을 떠나세요.",
		softLockable: true,
	},
	"Sour Dealing": {
		title: "불쾌한 거래",
		desc: "너무 깊이 엮인 갱단으로부터 구출되기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 파렴치한 지인들을 만드세요.",
		softLockable: true,
	},
	"Rear Passenger": {
		title: "뒷좌석 승객",
		desc: "엉덩이 때문에 차가 거의 박살 날 뻔했습니다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 도로 안전 법규를 위반하세요.",
	},
	"Cornered Rogue": {
		title: "궁지에 몰린 도적",
		desc: "장난꾸러기 여우로부터 옷을 되찾기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 장난꾸러기 도적의 허를 찌르세요.",
		softLockable: true,
	},
	"Pain Rider": {
		title: "고통의 기수",
		desc: "윈터의 목마를 끝까지 완수하여 시연하기.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 목마를 끝까지 타세요.",
		softLockable: true,
	},
	Submerged: {
		title: "물고문",
		desc: "윈터의 마녀 의자를 끝까지 완수하여 시연하기.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 끝까지 물고문을 당하세요.",
		softLockable: true,
	},
	"Farm Protector": {
		title: "농장 수호자",
		desc: "라이벌의 불량배들로부터 밭을 지켜내기.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 무단 침입자는 쫓겨날 것입니다.",
		softLockable: true,
	},
	"A Knot to Remember": {
		title: "잊지 못할 매듭(노팅)",
		desc: "근처에 사람들이 있는 들판에서 노팅당하기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 가장 변태적인 전시.",
	},
	"Wrong Size": {
		title: "잘못된 사이즈",
		desc: "남학생과 여학생의 옷을 바꿔치기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 소문을 잠재우세요.",
	},
	"Idle Hands": {
		title: "한가한 손",
		desc: "마사지사로 일하며 손님의 물건 훔치기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 숙련된 손은 쓸모가 많습니다.",
	},
	"Stolen Technology": {
		title: "도난당한 기술",
		desc: "사창가 성기구 수리하기.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 브라이어에겐 누구에게나 알맞은 물건이 있습니다.",
		softLockable: true,
	},
	Spelunking: {
		title: "동굴 탐험",
		desc: "해변 근처의 낡은 밀수꾼 동굴 찾기.",
		difficulty: 1,
		series: "beach cave",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 옛 밀수꾼의 경로를 찾으세요.",
		softLockable: true,
	},
	"X Marks the Spot": {
		title: "X가 표시된 곳",
		desc: "밀수꾼 동굴에서 보물지도 찾기.",
		difficulty: 2,
		series: "beach cave",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 깊숙한 곳에 숨겨져 있습니다.",
		softLockable: true,
	},
	"Buried Treasure": {
		title: "숨겨진 보물",
		desc: "보물 지도를 따라가 발견해내기.",
		difficulty: 3,
		series: "beach cave",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 지도를 따라가세요.",
		softLockable: true,
	},
	"Abnormal Mollusc": {
		title: "비정상 연체동물",
		desc: "거대 민달팽이로부터 탈출하기.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 파도 아래에 도사리고 있습니다.",
		softLockable: true,
	},
	Leverage: {
		title: "협상 카드",
		desc: "협박을 통해 밀수꾼의 소굴에서 빠져나오기.",
		difficulty: 3,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 도적들에게 맞서세요.",
		softLockable: true,
	},
	Flurry: {
		title: "눈보라",
		desc: "눈뭉치를 든 불량배들로부터 로빈의 노점을 지켜내기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 눈싸움에서 승리하세요.",
	},
	"Under the Ice": {
		title: "얼음 아래",
		desc: "얼어붙은 호수에서 탈출하기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 부수고 탈출하세요.",
		softLockable: true,
	},
	"A Festive Home": {
		title: "축제 분위기의 집",
		desc: "고아들에게 선물 주기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 고아들에게 겨울의 즐거움을 선사하세요.",
	},
	"In Red Light": {
		title: "붉은 빛 속에서",
		desc: "야생 블러드 레몬 수확하기.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 기묘한 빛 속에서 기묘한 과일이 자랍니다.",
		softLockable: true,
	},
	"Oh Bother": {
		title: "이런 맙소사",
		desc: "야생 벌집 수확하기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 달콤하고 끈적끈적하게.",
		softLockable: true,
	},
	"Employee Benefits": {
		title: "직원 복지",
		desc: "낮에 금괴 화물을 발견하고 밤에 훔치기.",
		difficulty: 3,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 금을 찾으세요. 나중에 훔치세요.",
		softLockable: true,
	},
	"Not Like the Movies": {
		title: "영화와는 달라",
		desc: "유사에 대한 지식을 얻기.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 가라앉은 황야의 지혜.",
		softLockable: true,
	},
	Slippery: {
		title: "미꾸라지",
		desc: "레미의 부하들로부터 탈출하기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 레미의 부하들에게서 도망치세요.",
		softLockable: true,
	},
	"High Reflection": {
		title: "빛나는 반사",
		desc: "폐성 꼭대기에 거울을 제자리에 돌려놓기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 눈멀고 폐허가 된.",
		softLockable: true,
	},
	Schism: {
		title: "균열",
		desc: "수몰된 역사를 목격하기.",
		difficulty: 3,
		series: "",
		hint: "힌트: 씻겨 내려간 역사를 목격하세요.",
		filter: ["All", "Discoveries-Other"],
		softLockable: true,
	},
	"Catch the Wind": {
		title: "바람을 타고",
		desc: "비행하는 법을 배우기.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 나는 법을 배우세요.",
		softLockable: true,
	},
	"Trading Dignity": {
		title: "존엄성 거래",
		desc: "레미의 부하 무리를 입으로 만족시켜주기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 일방적인 거래를 성사시키세요.",
		softLockable: true,
	},
	"Playing with Fire": {
		title: "불장난",
		desc: "렌이 당신보다 먼저 절정에 달하게 만들기.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 도박꾼의 요구를 견뎌내세요.",
		softLockable: true,
	},
	Firestarter: {
		title: "방화범",
		desc: "렌을 설득해 불을 지르게 하기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 파괴적인 보상을 쟁취하세요.",
		softLockable: true,
	},
	Dealing: {
		title: "거래",
		desc: "파렴치한 회사에 농산물 팔기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 알렉스의 기묘한 농산물을 파세요.",
		softLockable: true,
	},
	"To Watch the Fields": {
		title: "밭을 지키기 위하여",
		desc: "농장을 위한 경비 고용하기.",
		difficulty: 1,
		series: "farm guard",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 일손을 고용하세요.",
		softLockable: true,
	},
	"Reliable Employer": {
		title: "믿음직한 고용주",
		desc: "S랭크 경비 고용하기.",
		difficulty: 2,
		series: "farm guard",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 직원이 잠재력을 발휘하도록 도우세요.",
		softLockable: true,
	},
	"Into the Sunset": {
		title: "석양을 향해",
		desc: "말을 타고 레미의 부하들로부터 탈출하기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 말 탄 추적자들로부터 도망치세요.",
		softLockable: true,
	},
	"Bent Copper": {
		title: "타락한 경찰",
		desc: "부패한 뒷거래 방해하기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 지역 사회를 돕는 동안 눈을 크게 뜨세요.",
		softLockable: true,
	},
	"Social Contract": {
		title: "사회 계약",
		desc: "사회봉사 완수하기.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 사회에 진 빚을 갚으세요.",
		softLockable: true,
	},
	Institutionalised: {
		title: "수감자",
		desc: "형기를 마치고 교도소에서 출소하기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 형기를 채우세요.",
		softLockable: true,
	},
	Breaker: {
		title: "파괴자",
		desc: "교도소 전기 충격 목걸이 비활성화하기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 반항적인 사보타주.",
		softLockable: true,
	},
	"Time and Pressure": {
		title: "시간과 압력",
		desc: "교도소 벽 파내기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 그 어떤 벽도 충분히 두껍지 않습니다.",
		softLockable: true,
	},
	"More than a Number": {
		title: "숫자 그 이상",
		desc: "교도소에서 이름 5개 알아내기.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 철창 뒤에서 친구를 만드세요.",
		softLockable: true,
	},
	"Friends in the Sky": {
		title: "하늘의 친구들",
		desc: "감시자들과 친구가 되기.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 잃어버린 것을 되찾으세요.",
		softLockable: true,
	},
	"Not Meant to be Caged": {
		title: "새장에 갇힐 운명이 아닌",
		desc: "교도소 탈옥하기.",
		difficulty: 3,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 형기를 단축시키세요.",
		softLockable: true,
	},
	"Slip Through the Backdoor": {
		title: "뒷구멍으로 빠져나가기",
		desc: "베일리의 명부를 지우고 처벌 피하기.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 깨끗이 지우고 도망치세요.",
	},
	"Life of the Party": {
		title: "파티의 주인공",
		desc: "당신의 춤으로 파티장 사람들에게 깊은 인상 남기기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 찰리의 친구들에게 깊은 인상을 남기세요.",
		softLockable: true,
	},
	"Belle of the Ball": {
		title: "무도회의 꽃",
		desc: "당신의 춤으로 귀족 파티 사람들에게 깊은 인상 남기기.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 상류사회에 깊은 인상을 남기세요.",
		softLockable: true,
	},
	"Breaking the Stone": {
		title: "부서지는 돌",
		desc: "다뉴브 저택 지하의 의식을 막기.",
		difficulty: 3,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 춤으로 쌓은 인맥을 이용해 의식에 접근하고 끝내세요.",
		softLockable: true,
	},
	"Pound Alpha": {
		title: "동물 보호소 알파",
		desc: "동물 보호소에서 최고 지위에 도달하기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 그 개들에게 누가 우두머리인지 보여주세요.",
		softLockable: true,
	},
	"Pound Runt": {
		title: "동물 보호소 최하위",
		desc: "동물 보호소에서 최하 지위에 도달하기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 개들에게 복종하세요.",
		softLockable: true,
	},
	"Pounded Pound": {
		title: "타격받은 보호소",
		desc: "동물 보호소의 실태를 베일리에게 알리기.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 동물 보호소의 더러운 뒷조사를 하세요.",
		softLockable: true,
	},
	"Pound Liberator": {
		title: "보호소 해방자",
		desc: "검은 개를 구조하기.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 특별한 죄수를 풀어주세요.",
		softLockable: true,
	},
	"The Value of Pain": {
		title: "고통의 가치",
		desc: "악마의 모습으로 고아를 구출하기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 악마의 방식으로 선행을 베푸세요.",
		softLockable: true,
	},
	"Free Booze": {
		title: "공짜 술",
		desc: "청소년들의 술을 모두 마셔버리고, 강간당하지 않고 버티기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 황야에서 술을 잔뜩 마시세요.",
		softLockable: true,
	},
	"Bewitching Echoes": {
		title: "매혹적인 메아리",
		desc: "부카케 쇼 도중에 광란을 일으키기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 악마적인 쇼를 가장 멋지게 망쳐버리세요.",
		softLockable: true,
	},
	"Dark Delvings": {
		title: "어둠의 심연",
		desc: "하얀 수정 회수하기.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 고대 유적지에 침입하세요.",
		softLockable: true,
	},
	"Lurker Beyond": {
		title: "저편의 잠복꾼",
		desc: "촉수 숲의 잠복꾼 물리치기.",
		difficulty: 3,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 다른 세계의 괴물을 물리치세요.",
		softLockable: true,
	},
	"Down Below": {
		title: "저 깊은 곳",
		desc: "광산 노예 생활에서 탈출하기.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 오래된 산업 현장에서 탈출하세요.",
		softLockable: true,
	},
	"Bridging the Past": {
		title: "과거를 잇는 다리",
		desc: "운하 위에 다리 건설하기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 다리를 복구하세요.",
		softLockable: true,
	},
	"Safe Trail": {
		title: "안전한 오솔길",
		desc: "숲길 복구하기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 도로를 복구하세요.",
		softLockable: true,
	},
	"Field Work": {
		title: "현장 조사",
		desc: "호숫가에 고고학 현장 사무소 짓기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 윈터의 소원을 이루어주세요.",
		softLockable: true,
	},
	"Concrete Woodland": {
		title: "콘크리트 숲",
		desc: "주거지 덤불 복구하기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 덤불을 복구하세요.",
		softLockable: true,
	},
	"School Green": {
		title: "학교 정원",
		desc: "학교 녹지 복구하기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 정원을 복구하세요.",
		softLockable: true,
	},
	"Hookah Master": {
		title: "물담배 마스터",
		desc: "물담배 라운지 물려받기.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 물담배 연기 속으로 파고드세요.",
		softLockable: true,
	},
	"Sins of the Past": {
		title: "과거의 죄악",
		desc: "시장의 비밀 발견하기.",
		difficulty: 3,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 시장의 컴퓨터에 접속하세요.",
		softLockable: true,
	},
	"Panic Room": {
		title: "패닉 룸",
		desc: "아파트의 보안 시스템에서 탈출하기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 바브 가의 강력한 보안을 발견하세요.",
		softLockable: true,
	},
	"Lost World": {
		title: "잃어버린 세계",
		desc: "역사 속으로 사라진 섬 발견하기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 안개에 싸인 섬이 기다립니다.",
		softLockable: true,
	},
	"Prehistoric Landscape": {
		title: "선사 시대 풍경",
		desc: "섬의 모든 구역 발견하기.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 안개에 싸인 섬을 탐험하세요.",
		softLockable: true,
	},
	"Face of a Guardian": {
		title: "수호자의 가면",
		desc: "자신만의 섬 주민 가면 만들기.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 야생 목공 기술을 연습하세요.",
		softLockable: true,
	},
	"Wild Monarch": {
		title: "야생의 군주",
		desc: "왕좌 만들기.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 헛된 야생 목공 기술을 연습하세요.",
		softLockable: true,
	},
	Naturalised: {
		title: "귀화인",
		desc: "들키지 않고 섬 주민의 성에 잠입하기.",
		difficulty: 3,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 변장하고 외부인의 요새에 잠입하세요.",
		softLockable: true,
	},
	"Gilded Spear": {
		title: "황금빛 창",
		desc: "황금빛 창 회수하기.",
		difficulty: 3,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 섬의 뿌리에서 기다리고 있습니다.",
		softLockable: true,
	},
	"Defy the Night": {
		title: "밤에 맞서다",
		desc: "고통의 시련을 끝까지 견뎌내기.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 사원의 계급을 오르세요.",
		softLockable: true,
	},
	"Withering Truth": {
		title: "시들어가는 진실",
		desc: "주교 만나기.",
		difficulty: 3,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 고해성사를 통해 진실을 밝히세요.",
		softLockable: true,
	},
	"Lost Heirloom": {
		title: "잃어버린 가보",
		desc: "금 나침반 회수하기.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "힌트: 해외에서 도난당했습니다.",
		softLockable: true,
	},
	"Backroom Deals": {
		title: "뒷거래",
		desc: "고위층들의 게임 구경하기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 연애를 통해 마을 상류층으로 진입하세요.",
		softLockable: true,
	},
	"Stomping Down The Street": {
		title: "거리를 활보하며",
		desc: "하이 스트리트에서 전단지를 많이 나눠주었습니다.",
		difficulty: 1,
		series: "Flyers",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 니키와 함께 일하십시오.",
		softLockable: true,
	},
/* ========= 번역 필요 ========= */
	"Record Keeper": {
		title: "Record Keeper",
		desc: "Organised the forbidden office in the asylum.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "Hint: Practise housekeeping at the asylum.",
		softLockable: true,
	},
	"Bramble Tamer": {
		title: "Bramble Tamer",
		desc: "Restored the secret garden at the asylum.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "Hint: Practise tending at the asylum.",
		softLockable: true,
	},
	"Eyes in the Night": {
		title: "Eyes in the Night",
		desc: "Released a creature in the asylum tunnels.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "Hint: Practise swimming at the asylum.",
		softLockable: true,
	},
	"Mirror Madness": {
		title: "Mirror Madness",
		desc: "Used the archaic mirror treatment.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries-Other"],
		hint: "Hint: Explore the forbidden section of the asylum.",
		softLockable: true,
	},
/* ========================= */
	"Hear Me Roar": {
		title: "내 포효를 들어라",
		desc: "하이 스트리트에서 더 많은 전단지를 나눠주었습니다.",
		difficulty: 2,
		series: "Flyers",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 니키와 함께 일하십시오.",
		softLockable: true,
	},
	"Max Those Shots": {
		title: "최대 사거리",
		desc: "최루 스프레이 잔뜩 챙기기.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 최고의 방어는 최선의 공격입니다.",
		softLockable: true,
	},
	"Opened Pandoras Box": {
		title: "판도라의 상자 열기",
		desc: "성인 용품점 재건 돕기.",
		difficulty: 1,
		series: "Adult Shop",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 장난감 상자를 열 만한 가치가 있을까요?",
	},
	"Opened Pandoras Cocks": {
		title: "판도라의 자지 열기",
		desc: "당신 없이는 성인 용품점이 제대로 돌아가지 않았을 겁니다.",
		difficulty: 3,
		series: "Adult Shop",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 장난감 상자를 너무 빨리 열어버린 건 아닐까요?",
	},
	"Brothel Provider": {
		title: "사창가 공급자",
		desc: "물건을 팔아 수익을 낼 수 있는 자판기 설치하기.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 브라이어가 장사하도록 설득하세요.",
	},
	"Player of the Match": {
		title: "오늘의 선수",
		desc: "렌으로부터 크리켓 공 훔치기.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries-Town"],
		hint: "힌트: 공범을 배신하세요.",
	},
	"Ear Slime Lover": {
		title: "귀 슬라임 애호가",
		desc: "그것은 당신의 가장 친한 친구입니다.",
		difficulty: 3,
		series: "",
		filter: ["All", "Special"],
		hint: "힌트: 귓가에 들리는 속삭임.",
	},
	"Ear Slime Amalgam": {
		title: "귀 슬라임 융합체",
		desc: "당신은 가장 친한 친구와 하나가 되었습니다.",
		difficulty: 3,
		series: "",
		filter: ["All", "Special"],
		hint: "힌트: 시간과 애정을 쏟아 피어나게 하세요.",
	},
	"The Path to Redemption": {
		title: "구원의 길",
		desc: "내면의 악마로부터 당신의 인간성을 되찾기.",
		difficulty: 3,
		series: "",
		filter: ["All", "Special"],
		hint: "힌트: 잃어버린 것을 되찾으세요.",
		softLockable: true,
	},
	"A New Life": {
		title: "새로운 삶",
		desc: "혜택을 받고 시작하기.",
		difficulty: 1,
		series: "",
		filter: ["All", "Special"],
		hint: "힌트: 빠르게 시작하기.",
	},
	Negotiator: {
		title: "협상가",
		desc: "한 번의 팁으로 £500 이상 벌기.",
		difficulty: 3,
		series: "",
		filter: ["All", "Special"],
		hint: "힌트: 돈을 싹쓸이하세요.",
	},
	"Curious Attire": {
		title: "호기심을 자극하는 복장",
		desc: "숲 상점의 의상 세트 절반 해금하기.",
		difficulty: 2,
		series: "specialClothes",
		filter: ["All", "Special"],
		hint: "힌트: 승리와 시련의 절반에 대한 보상.",
		softLockable: true,
	},
	"Wicked Wardrobe": {
		title: "사악한 옷장",
		desc: "숲 상점의 의상 세트 전부 해금하기.",
		difficulty: 3,
		series: "specialClothes",
		filter: ["All", "Special"],
		hint: "힌트: 승리와 시련의 모든 보상.",
		softLockable: true,
	},
	"My Collection of Feats": {
		title: "나의 업적 수집품",
		desc: "너무 많아서 셀 수 없습니다.",
		difficulty: 3,
		series: "collection",
		filter: ["All", "Special"],
		hint: "힌트: 무언가의 수집품.",
	},
	"My Timeless Collection of Feats": {
		title: "나의 영원한 업적 수집품",
		desc: "시간 그 이상의 가치를 지닌 업적들.",
		difficulty: 5,
		series: "collection",
		filter: ["All", "Special"],
		hint: "힌트: 시간과 노력.",
	},
};

async function featsMergePre() {
	// Replace getting the count with a better method that gets included with the sugarcube format
	T.saveDataImportCount = 0;
	const localStorageSaves = DoLSave.getSaves();

	const result = () => {
        if (!T.saveDataImportCount) {
            $("#featsBeginText").html(`감지된 저장 데이터가 없습니다. 가져오기를 시도하기 전에 로컬에 저장했는지 확인하십시오.`);
        } else if ((T.saveDataImportCount >= 10 && Browser.isMobile.any()) || T.saveDataImportCount >= 25) {
            $("#featsBeginText").html(`저장 데이터 ${T.saveDataImportCount}개가 감지되었습니다. 기기 사양에 따라 시간이 다소 소요될 수 있습니다.`);
        } else {
            $("#featsBeginText").html(`저장 데이터 ${T.saveDataImportCount}개가 감지되었습니다. 곧 완료될 것입니다.`);
        }
        $("#featsBeginLoadingText").addClass("hidden");
        $("#featsBeginButton").removeClass("hidden");
    };

	// Count the local storage saves
	if (localStorageSaves.autosave) T.saveDataImportCount++;
	if (localStorageSaves.slots) {
		localStorageSaves.slots.forEach(slot => {
			if (slot) T.saveDataImportCount++;
		});
	}

	// Count the index db saves
	try {
		// eslint-disable-next-line no-undef
		idb.getSaveDetails()
			.then(saveDataDetails => {
				T.saveDataImportCount += saveDataDetails.length;
			})
			.finally(() => {
				result();
			});
	} catch {
		result();
	}
}
DefineMacro("featsMergePre", featsMergePre);

function featsMerge() {
	if (window.featsMerge) return;
	window.featsMerge = true;

	const savesToLoad = T.saveDataImportCount;
	const loadingBar = $("#featsLoadingMeter .greenbar");
	const loadingText = $("#featsLoadingText");
	let featData = localStorage.getItem("dolFeats");
	if (featData) {
		featData = JSON.parse(featData);
	} else {
		featData = {};
	}

	if (!featData.specialClothes) featData.specialClothes = [];
	if (!featData.seeds) featData.seeds = [];
	// eslint-disable-next-line prettier/prettier
	if (!Array.isArray(featData.specialClothes)) featData.specialClothes = getUnlockedSpecialSets(updateSpecialClothesNames(featData.specialClothes)).filter(set => setup.specialClothesSets[set].feat);
	const loadFeats = (data = {}) => {
		Object.entries(data).forEach(([key, date]) => {
			if (key === "specialClothes") {
				const clothes = Array.isArray(date)
					? date
					: getUnlockedSpecialSets(updateSpecialClothesNames(date)).filter(set => setup.specialClothesSets[set].feat);
				clothes.forEach(a => featData.specialClothes.pushUnique(a));
				return;
			}
			if (key === "seeds") {
				const seeds = Array.isArray(date) ? date : V.plants_known.filter(plant => setup.foodstuff[plant].tending?.featCost);
				seeds.forEach(a => featData.seeds.pushUnique(a));
				return;
			}
			if (!featData[key] || new Date(date).getTime() < new Date(featData[key]).getTime()) {
				featData[key] = date;
			}
		});
	};

	const result = () => {
		let points = 0;
		Object.keys(featData).forEach(key => {
			if (setup.feats[key]) points += setup.feats[key].difficulty;
		});
		featData.points = points;

		V.feats.allSaves = featData;
		localStorage.setItem("dolFeats", JSON.stringify(featData));

		loadingBar.css("width", "100%");
		loadingText.html("모든 특성 데이터 불러오기 완료.");
		$("#featsFinishButton").removeClass("hidden");

		delete window.featsMerge;
	};

	// Read the local storage saves
	let localSavesChecked = 0;
	const localStorageSaves = clone(DoLSave.getSaves());
	if (localStorageSaves) {
		if (localStorageSaves.autosave) {
			localStorageSaves.autosave.state.history = State.deltaDecode(localStorageSaves.autosave.state.delta);
			try {
			DoLSave.decompressIfNeeded(localStorageSaves.autosave);
			} catch (e) {
				// a save that cannot be decompressed has no feats to read, skip it
				console.warn("Couldn't decompress a save while loading feats, skipping it.", e);
			}

			if (localStorageSaves.autosave.state?.history?.[localStorageSaves.autosave.state.index]?.variables) {
				const variables = localStorageSaves.autosave.state.history[localStorageSaves.autosave.state.index].variables;
				if (variables.feats) {
					loadFeats(variables.feats.allSaves);
					loadFeats(variables.feats.currentSave);
				}
			}
			localSavesChecked++;
			loadingBar.css("width", `${(localSavesChecked / savesToLoad) * 100}%`);
		}
		if (localStorageSaves.slots) {
			localStorageSaves.slots.forEach(slot => {
				if (slot) {
					slot.state.history = State.deltaDecode(slot.state.delta);
					try {
					DoLSave.decompressIfNeeded(slot);
					} catch (e) {
						// a save that cannot be decompressed has no feats to read, skip it
						console.warn("Couldn't decompress a save while loading feats, skipping it.", e);
					}
					if (slot.state.history?.[slot.state.index]?.variables) {
						const variables = slot.state.history[slot.state.index].variables;
						if (variables.feats) {
							loadFeats(variables.feats.allSaves);
							loadFeats(variables.feats.currentSave);
						}
					}
					localSavesChecked++;
					loadingBar.css("width", `${(localSavesChecked / savesToLoad) * 100}%`);
				}
			});
		}
	}

	// Read the index db saves
	try {
		// eslint-disable-next-line no-undef
		idb.getAllSaves()
			.then(saves =>
				saves.forEach((slot, index) => {
					// auto-detect between uncompressed and compressed saves
					const history = slot.data.history || State.deltaDecode(slot.data.delta);
					const saveData = history[slot.data.index].variables;
					if (saveData.feats) {
						loadFeats(saveData.feats.allSaves);
						loadFeats(saveData.feats.currentSave);
					}
					loadingBar.css("width", `${((localSavesChecked + index + 1) / savesToLoad) * 100}%`);
					loadingText.html(`${index + 1} / ${savesToLoad}개의 저장 데이터 확인 중.`);
				})
			)
			.finally(() => {
				result();
			});
	} catch {
		result();
	}
}
DefineMacro("featsMerge", featsMerge);

function earnFeat(featName) {
	if (!featName || V.feats.locked || V.cheatsEnabled === true || V.debug || V.gamemode === "soft" || V.settings?.allureModifier < 1 || V.statFreeze) return;

	if (
		V.feats.currentSave[featName] !== undefined ||
		(V.feats.soft && setup.feats[featName].softLockable) ||
		(V.feats.pregnancyLocked && setup.feats[featName].pregnancyLockable)
	)
		return;

	V.feats.currentSave[featName] = new Date();
	displayFeat(featName);
}
DefineMacro("earnFeat", earnFeat);

function displayFeat(featName) {
	const feat = setup.feats[featName];
	if (!feat) return;

	$(() => {
		const passages = $("#passages");

		const featsCount = passages.find(".feat").length;
		const hidden = featsCount >= 3 ? " hiddenFeat" : "";

		const wrapper = $("<div>", {
			id: `feat-${featsCount}`,
			class: `feat feat${featsCount}${hidden} feat-overlay`,
		});

		const coin = $("<img>", { class: "featCoin" });
		switch (feat.difficulty) {
			case 1:
				coin.attr("src", "img/ui/coin-copper.gif");
				break;
			case 2:
				coin.attr("src", "img/ui/coin-silver.gif");
				break;
			case 3:
				coin.attr("src", "img/ui/coin-gold.gif");
				break;
			case 4:
				coin.attr("src", "img/ui/coin-platinum.gif");
				break;
			case 5:
				coin.attr("src", "img/ui/coin-jeweled.gif");
				break;
		}

		const featImage = $("<div>", { class: "featImage" }).append(coin);

		const featText = $("<div>", { class: "featText" })
			.append($("<span>", { class: "title" }).text(feat.title))
			.append($("<span>", { class: "text" }).text(feat.desc));

		const close = $("<div>", {
			id: `closeFeat-${featsCount}`,
			class: "closeFeat",
			on: {
				click: () => closeFeats(featsCount),
			},
		});

		wrapper.append(featImage, featText, close);
		passages.append(wrapper);
	});
}
DefineMacro("displayFeat", displayFeat);

// eslint-disable-next-line no-unused-vars
function earnHourlyFeats() {
	if (V.feats.locked || V.cheatsEnabled === true || V.debug || V.gamemode === "soft" || V.settings.allureModifier < 1 || V.replayScene) return false;

	const fragment = document.createDocumentFragment();

	const earnFeat = featName => {
		if (!V.feats.currentSave[featName]) fragment.append(wikifier("earnFeat", `"${featName}"`));
	};

	// Feats that can only be earned after 50 days
	if (Time.days >= 50) {
		switch (V.player.sex) {
			case "m":
				earnFeat("Being a Boy");
				break;
			case "f":
				earnFeat("Being a Girl");
				break;
			case "h":
				earnFeat("Being a Hermaphrodite");
				break;
		}

		if (Time.days >= 150) earnFeat("Being an Orphan");

		if (!V.passoutstat) {
			earnFeat("Stressful Challenge");
			if (Time.days >= 150) earnFeat("Long Stressful Challenge");
		}
	}

	if (V.awareness >= 500) earnFeat("Most Aware");
	if (V.awareness <= -199) earnFeat("Most Innocent");
	if (V.promiscuity >= 100 && V.deviancy >= 100 && V.exhibitionism >= 100) earnFeat("No More Control");

	if (
		(!V.player.vaginaExist || V.vaginalskill >= 1000) &&
		(!V.player.penisExist || V.penileskill >= 1000) &&
		V.oralskill >= 1000 &&
		(V.analskill >= 1000 || V.settings.analEnabled === false) &&
		V.handskill >= 1000 &&
		V.feetskill >= 1000 &&
		V.bottomskill >= 1000 &&
		V.thighskill >= 1000 &&
		V.chestskill >= 1000
	) {
		earnFeat("Sex Specialist");
	}

	if (V.submissive >= 2000) earnFeat("Perfect Sub");
	if (V.submissive <= 0) earnFeat("Defying the Odds");
	if (V.museumAntiques.museumCount === V.museumAntiques.maxCount) earnFeat("It Belongs in a Museum");

	// LI Romance
	const loveCount = (V.robinromance ? 1 : 0) + (V.whitneyromance ? 1 : 0) + (V.kylarenglish ? 1 : 0) + (V.sydneyromance ? 1 : 0);
	if (loveCount >= 3) earnFeat("Love Triangles");
	if (loveCount >= 4) earnFeat("Love Trapezoids");

	if (V.cat >= 6) earnFeat("Neko");
	if (V.wolfgirl >= 6) earnFeat("Wolf");
	if (V.angel >= 6) earnFeat("Angel");
	if (V.fallenangel >= 2) earnFeat("Fallen Angel");
	if (V.demon >= 6) earnFeat("Demon");
	if (V.cow >= 6) earnFeat("Cattle");
	if (V.harpy >= 6) earnFeat("Harpy");
	if (V.fox >= 6) earnFeat("Fox");

	const specialTraits =
		(V.orgasmtrait >= 1 ? 1 : 0) +
		(V.ejactrait >= 1 ? 1 : 0) +
		(V.molesttrait >= 1 ? 1 : 0) +
		(V.rapetrait >= 1 ? 1 : 0) +
		(V.bestialitytrait >= 1 ? 1 : 0) +
		(V.tentacletrait >= 1 ? 1 : 0) +
		(V.voretrait >= 1 ? 1 : 0) +
		(V.milkdranktrait >= 1 ? 1 : 0) +
		(V.choketrait >= 1 ? 1 : 0);
	if (specialTraits >= 1) earnFeat("A Special Trait");
	if (specialTraits >= 9) earnFeat("A Special Trait Collector");

	if (
		V.pregnancyStats.parasiteTypesSeen &&
		V.pregnancyStats.parasiteTypesSeen.length >= 14 &&
		V.pregnancyStats.parasiteVariantsSeen.length >= 2 &&
		V.pregnancyStats.parasiteBook === 3
	) {
		// typesSeen: fish, snake, slime, spider, maggot, worm, eel, wasp, bee, lurker, squid, slug, tentacle, vine
		// variantsSeen: pale, metal
		earnFeat("Broodmother Zoologist");
	}

	if (V.spraymax >= 8) earnFeat("Max Those Shots");
    if (V.spraymax > 8) console.warn("페퍼 스프레이 횟수가 8을 초과했습니다! 업적 달성 기준치를 높여야 할까요?");
	if ((V.semen_volume >= 2000 && V.semen_amount >= V.semen_volume) || (V.milk_volume >= 2000 && V.milk_amount >= V.milk_volume)) earnFeat("Feeling Full");
	if (V.cool >= 400) earnFeat("Social Butterfly");
	if (V.cool <= 2 && !V.backgroundTraits.includes("nerd")) earnFeat("Anti-Social Moth");
	if (V.delinquency <= 0) earnFeat("Teachers Pet");
	if (V.delinquency >= 1000) earnFeat("Teachers Nightmare");

	if (
		V.skin.forehead.writing &&
		V.skin.left_cheek.writing &&
		V.skin.right_cheek.writing &&
		V.skin.left_shoulder.writing &&
		V.skin.right_shoulder.writing &&
		V.skin.breasts.writing &&
		V.skin.back.writing &&
		V.skin.pubic.writing &&
		V.skin.left_thigh.writing &&
		V.skin.right_thigh.writing
	) {
		earnFeat("A Living Canvas");
	}

	if (V.produce_sold >= 100) earnFeat("Hawker");
	if (V.produce_sold >= 1000) earnFeat("Vendor");
	if (V.produce_sold >= 5000) earnFeat("Merchant");
	const totalSeeds = Object.values(setup.foodstuff).filter(plant => plant.tending?.has_seeds).length;
	if (V.plants_known.length >= totalSeeds / 2) earnFeat("Seedy");
	if (V.plants_known.length >= totalSeeds) earnFeat("Breedy");
	if (V.daily.ex.road === 1 && V.daily.ex.cream === 1 && V.daily.ex.flyover === 1) earnFeat("A Lewd Adventure");
	if (V.athletics >= 1000) earnFeat("Swift");

	if (V.farm_stage >= 2 && V.farm.beasts.horses >= 20 && V.farm.beasts.cattle >= 20 && V.farm.beasts.dogs >= 20 && V.farm.beasts.pigs >= 20) {
		earnFeat("Animal Tender");
	}

	if (V.masochism_level >= 4 && V.sadism_level >= 4) earnFeat("Sadomasochist");
	if (V.masochism_level >= 4) earnFeat("Twisted Desire");
	if (V.sadism_level >= 4) earnFeat("Served Hot");

	// V.fame.pimp has been excluded, should be added back in if enabled
	if (
		V.fame.sex <= 29 &&
		V.fame.prostitution <= 29 &&
		V.fame.rape <= 29 &&
		V.fame.bestiality <= 29 &&
		V.fame.exhibitionism <= 29 &&
		V.fame.pregnancy <= 29 &&
		V.fame.impreg <= 29 &&
		V.fame.scrap >= 1000 &&
		V.fame.good >= 1000 &&
		V.fame.business >= 1000 &&
		V.fame.social >= 1000 &&
		V.fame.model >= 1000
	) {
		earnFeat("Shining Reputation");
	}

	if (
		getBornChildren().reduce((prev, curr) => {
			if (getPregnancyOf(curr).carrier === "pc") prev.pushUnique(curr.species);
			return prev;
		}, []).length >= new Set(setup.pregnancy.typesEnabled.map(childBaseSpecies)).size
	) {
		earnFeat("Diversity of Life");
	}

	if (V.money >= 100000) earnFeat("Pocket Change");
	if (V.money >= 1000000) earnFeat("Money Maker");
	if (V.money >= 10000000) earnFeat("Tycoon");
	if (V.money >= 100000000) earnFeat("Millionaire");

	if (
		V.liquidoutsidecount >= 100 &&
		(V.settings.analEnabled === false || setup.bodyliquid.combined("anus") >= 5) &&
		(!V.player.vaginaExist || setup.bodyliquid.combined("vagina") >= 5) &&
		setup.bodyliquid.combined("mouth") >= 5
	) {
		earnFeat("Fully Covered");
	}

	if (V.skulduggery >= 1000) earnFeat("Thief");
	if (V.danceskill >= 1000) earnFeat("May I have this Dance?");
	if (V.swimmingskill >= 1000) earnFeat("Aquanaut");
	if (V.seductionskill >= 1000) earnFeat("Seductress");
	if (V.tending >= 1000) earnFeat("Green Fingered");
	if (V.housekeeping >= 1000) earnFeat("Majordomo");
	if (V.baseAllure >= 7000 && V.outside === 1 && !Time.isBloodMoon()) earnFeat("Alluring");
	if (V.science >= 1000 && V.maths >= 1000 && V.english >= 1000 && V.history >= 1000) earnFeat("Perfect Record");
	if (V.earSlime.corruption >= 100) earnFeat("Ear Slime Lover");
	if (V.earSlime.corruption >= 100 && V.earSlime.growth >= 200) earnFeat("Ear Slime Amalgam");

	if (V.options.tanLines) {
		const validLayers = Skin.tanningLayers.filter(layer => {
			return layer.layers.length && layer.value >= 10;
		});
		if (validLayers.length >= 5) earnFeat("50 Shades of Tan");
	}

	// Should be last
	const currentMax = Object.values(setup.feats).reduce((sum, feat) => sum + feat.difficulty, 0);
	if (V.feats.allSaves.points >= Math.floor(currentMax * 0.5)) earnFeat("My Collection of Feats");
	if (V.feats.allSaves.points >= Math.floor(currentMax * 0.95)) earnFeat("My Timeless Collection of Feats");

	// Bugged in saves that used the "Show them the stolen card" link in many older versions
	if (V.compound.discovered) earnFeat("Illicit Science");

	const fishKeys = Object.keys(setup.fishing.lootTables.fish);
	if (fishKeys.every(key => V.fishing.record[key]?.numCaught > 0)) {
		earnFeat("Wet Rod");
	}

	if (
		fishKeys.every(key => {
			const fishConfig = setup.fishing.lootTables.fish[key];
			const fishRecord = V.fishing.record[key];
			if (!fishRecord) return false;
			const largestSizePercent = (fishRecord.largest - fishConfig.minSize) / (fishConfig.maxSize - fishConfig.minSize);
			return largestSizePercent >= 0.98;
		})
	) {
		earnFeat("Master Baiter");
	}

	return fragment;
}

function updateFeats() {
	let coins = 0;
	let writeFlag = false;
	// some entries within the feats object are not actually feats
	const notFeats = ["points", "specialClothes", "seeds"];
	// at the game start, V.feats is not yet imported
	const allFeats = (passage() === "Start" ? JSON.parse(localStorage.getItem("dolFeats")) : V.feats.allSaves) || {};
	const curFeats = V.feats.currentSave;
	// make sure feats from all saves contain the ones from current one
	Object.keys(curFeats).forEach(feat => {
		// skip unknown/modded/future/not feats
		if (notFeats.includes(feat) || !(feat in setup.feats)) return;
		if (!(curFeats[feat] instanceof Date)) {
			if (isJsonString(curFeats[feat])) curFeats[feat] = JSON.parse(curFeats[feat]);
			else curFeats[feat] = new Date(curFeats[feat]);
			// somehow new date is neither json nor a date string. reset it and mark as ancient
			if (!curFeats[feat]?.valueOf()) curFeats[feat] = new Date(1);
		}
		// if feat was unlocked earlier, do nothing
		if (allFeats[feat] && getTimeNumber(allFeats[feat] <= getTimeNumber(curFeats[feat]))) return;
		// else update allFeats and capture the flag
		allFeats[feat] = clone(curFeats[feat]);
		writeFlag = true;
	});
	// tally the points
	Object.keys(allFeats).forEach(feat => {
		if (notFeats.includes(feat) || !(feat in setup.feats)) return;
		// fix bad dates while we're at it
		if (!(allFeats[feat] instanceof Date)) {
			let newDate;
			if (isJsonString(allFeats[feat])) newDate = JSON.parse(allFeats[feat]);
			else newDate = new Date(allFeats[feat]);
			if (!newDate?.valueOf()) {
				Errors.report(`updateFeats "${feat}": Invalid date "${allFeats[feat]}"`);
				newDate = new Date(1);
			}
			allFeats[feat] = newDate;
			writeFlag = true;
		}
		coins += setup.feats[feat].difficulty;
	});
	allFeats.points = coins;

	// update old specialClothes to new system
	let specialClothes = allFeats.specialClothes || [];
	if (!Array.isArray(specialClothes)) {
		specialClothes = getUnlockedSpecialSets(updateSpecialClothesNames(specialClothes)).filter(set => setup.specialClothesSets[set].feat);
		writeFlag = true;
	}

	// check specialClothes
	if (V.specialClothes && !V.feats.locked && !V.cheatsEnabled) {
		const unlockedSets = getUnlockedSpecialSets().filter(set => setup.specialClothesSets[set].feat);
		// merge unlockedSets into specialClothes
		unlockedSets.forEach(set => {
			if (!specialClothes.includes(set)) {
				specialClothes.push(set);
				writeFlag = true;
			}
		});
	}
	allFeats.specialClothes = specialClothes;

	const seeds = allFeats.seeds || [];
	if (V.plants_known && V.plants_known.length && !V.feats.locked && !V.cheatsEnabled) {
		const unlockedSeeds = V.plants_known.filter(plant => setup.foodstuff[plant].tending?.featCost);
		// merge unlockedSeeds into seeds
		unlockedSeeds.forEach(seed => {
			if (!seeds.includes(seed)) {
				seeds.push(seed);
				writeFlag = true;
			}
		});
	}
	allFeats.seeds = seeds;

	V.feats.allSaves = allFeats;

	// update permanent feat storage
	if (writeFlag) localStorage.setItem("dolFeats", JSON.stringify(allFeats));
}
DefineMacro("updateFeats", updateFeats);
window.updateFeats = updateFeats;

// setup feat boosts
function setupFeatBoosts(force) {
	if (V.featsBoosts && !force) return;

	V.featsBoosts = {
		upgrades: {}, // coins spent on upgrades
		upgradeDetails: {}, // junk data
		purchased: {}, // amount of upgrades purchased
		missing: {}, // ugh
		name: {}, // why
		pointsUsed: 0, // hatred and also suffering
		clothingGender: "Either",
		clothingCustomColors: false,
		hidden: { greenThumb: true },
		tattoos: {
			1: { bodypart: "Random", tattoo: "Random", pen: "Tattoo" },
			2: { bodypart: "Random", tattoo: "Random", pen: "Tattoo" },
			3: { bodypart: "Random", tattoo: "Random", pen: "Tattoo" },
			4: { bodypart: "Random", tattoo: "Random", pen: "Tattoo" },
			5: { bodypart: "Random", tattoo: "Random", pen: "Tattoo" },
		},
		sexToys: [{}, {}, {}, {}, {}, {}],
		specialClothesSets: {},
		seeds: {},
		earSlimeType: "immaturePassive",
	};

const boostData = {
		money: {
			name: "시작 자금",
			required: ["Pocket Change", "Money Maker", "Tycoon", "Millionaire"],
			cost: 5,
			maxMultiplier: 2,
			missing: "이 부스트를 해금하려면 '잔돈' 업적을 달성하세요.",
		},
		grades: {
			name: "학교 성적",
			required: ["Perfect Record"],
			cost: 15,
			max: 2,
			missing: "이 부스트를 해금하려면 '완벽한 성적표' 업적을 달성하세요.",
		},
		skulduggery: {
			name: "속임수 등급",
			required: ["Thief"],
			cost: 5,
			max: 4,
			missing: "이 부스트를 해금하려면 '도둑' 업적을 달성하세요.",
		},
		dancing: {
			name: "댄스 등급",
			required: ["May I have this Dance?"],
			cost: 5,
			max: 4,
			missing: "이 부스트를 해금하려면 '저와 춤추시겠습니까?' 업적을 달성하세요.",
		},
		swimming: {
			name: "수영 등급",
			required: ["Aquanaut"],
			cost: 5,
			max: 4,
			missing: "이 부스트를 해금하려면 '수중 비행사' 업적을 달성하세요.",
		},
		athletics: {
			name: "운동 등급",
			required: ["Swift"],
			cost: 5,
			max: 4,
			missing: "이 부스트를 해금하려면 '날쌘돌이' 업적을 달성하세요.",
		},
		tending: {
			name: "원예 등급",
			required: ["Green Fingered"],
			cost: 5,
			max: 4,
			missing: "이 부스트를 해금하려면 '식물학자' 업적을 달성하세요.",
		},
		greenThumb: {
			name: "식물학자 특성",
			required: ["Green Fingered"],
			cost: 40,
			max: 1,
			missing: "이 부스트를 해금하려면 '식물학자' 업적을 달성하세요.",
		},
		housekeeping: {
			name: "가사 등급",
			required: ["Majordomo"],
			cost: 5,
			max: 4,
			missing: "이 부스트를 해금하려면 '저택 관리인' 업적을 달성하세요.",
		},
		seduction: {
			name: "유혹 등급",
			required: ["Seductress"],
			cost: 5,
			max: 4,
			missing: "이 부스트를 해금하려면 '유혹자' 업적을 달성하세요.",
		},
		purity: {
			name: "순결도 부스트",
			required: ["Angel", "Fallen Angel"],
			cost: 20,
			max: 5,
			exclusive: "impurity",
			missing: "이 부스트를 해금하려면 '천사처럼 걸어라' 및 '추락, 타락, 그리고...' 업적을 달성하세요.",
		},
		impurity: {
			name: "불결 부스트",
			required: ["Demon"],
			cost: 20,
			max: 5,
			exclusive: "purity",
			missing: "이 부스트를 해금하려면 '악마 같은 외모' 업적을 달성하세요.",
		},
		newLife: {
			name: "새로운 삶",
			required: ["Broodmother Host", "Top Broodmother Host"],
			cost: 20,
			missing: "히든 업적을 달성하여 이 부스트를 해금하세요 (" + setup.feats["Broodmother Host"].hint + ")",
		},
		aNewBestFriend: {
			name: "새로운 친구",
			required: ["Ear Slime Lover", "Ear Slime Amalgam"],
			cost: 10,
			missing: "히든 업적을 달성하여 이 부스트를 해금하세요 (" + setup.feats["Ear Slime Lover"].hint + ")",
		},
		tattoos: {
			name: "초기 문신",
			required: ["A Living Canvas", "Billboard"],
			cost: 5,
			max: 5,
			missing: "이 부스트를 해금하려면 '걸어다니는 광고판' 및 '살아있는 캔버스' 업적을 달성하세요.",
		},
		randomClothing: {
			name: "무작위 의상",
			required: [],
			cost: 1,
			max: 20,
			missing: "",
		},
		specialClothing: {
			name: "특별 의상",
			required: ["Curious Attire", "Wicked Wardrobe"],
			cost: 0,
			missing: "히든 업적을 달성하여 이 부스트를 해금하세요 (" + setup.feats["Curious Attire"].hint + ")",
/* ========= 번역 필요 ========= */
		},
		seeds: {
			name: "Starting Seeds",
			required: ["Seedy", "Breedy"],
			cost: 0,
			missing: "Unlock this boost by obtaining the 'Seedy' feat",
/* ========================= */
		},
		sexToys: {
			name: "성인용품",
			required: ["Opened Pandoras Box", "Opened Pandoras Cocks"],
			cost: 30,
			missing: "히든 업적을 달성하여 이 부스트를 해금하세요 (" + setup.feats["Opened Pandoras Box"].hint + ")",
		},
	};

	const earnedFeats = Object.keys(V.feats.allSaves);
	Object.entries(boostData).forEach(([k, f]) => {
		const maxEarned = !f.required.length ? 1 : f.required.filter(x => earnedFeats.includes(x)).length;
		const max = !maxEarned ? 0 : f.max ?? (f.maxMultiplier * maxEarned || maxEarned);

		V.featsBoosts.upgrades[k] = 0;
		V.featsBoosts.upgradeDetails[k] = { cost: f.cost, max, purchased: 0, ...(f.exclusive ? { exclusive: f.exclusive } : {}) };
		V.featsBoosts.missing[k] = f.missing;
		V.featsBoosts.name[k] = max > 0 ? f.name : "?????";
	});
}
DefineMacro("setupFeatBoosts", setupFeatBoosts);

function applyFeatBoosts() {
	const upgrades = V.featsBoosts.upgrades;
	const details = V.featsBoosts.upgradeDetails;

	// reincarnated into the same nightmare
	if (V.featsBoosts.pointsUsed > 0) earnFeat("A New Life");

	// starting money
	if (upgrades.money > 0) statChange.money(details.money.purchased * details.money.max * 2500, "startingMoney");

	const gain = (skill, mult = 1) => (upgrades[skill] / details[skill].cost) * mult;

	// starting grades
	if (upgrades.grades) {
		["science", "english", "maths", "history"].forEach(subject => {
			V[subject + "trait"] += gain("grades", 1);
			V[subject] = [100, 200, 400, 700, 1000][Math.clamp(V[subject + "trait"], 0, 4) || 0];
		});
	}
	// skills
	if (upgrades.skulduggery) {
		V.skulduggery = gain("skulduggery", 100);
		V.skulduggeryday = V.skulduggery;
	}
	if (upgrades.dancing) V.danceskill = gain("dancing", 100);
	if (upgrades.tending) V.tending += gain("tending", 100);
	if (upgrades.swimming) V.swimmingskill += gain("swimming", 100);
	if (upgrades.athletics) V.athletics += gain("athletics", 100);
	if (upgrades.seduction) V.seductionskill = gain("seduction", 100);
	if (upgrades.housekeeping) V.housekeeping = gain("housekeeping", 100);

	// daily (im)purity
	if (upgrades.purity) V.featsPurityBoost = gain("purity", 1);
	if (upgrades.impurity) V.featsPurityBoost = gain("impurity", -1);

	// green thumb
	if (upgrades.greenThumb) {
		V.backgroundTraits.pushUnique("greenthumb");
		if (V.fertiliser) ++V.fertiliser.current;
	}

	// parasitic pregnancy
	if (upgrades.newLife) {
		// you bought it - you pay for it
		if (!V.settings.parasitePregnancyEnabled) V.settings.parasitePregnancyEnabled = true;
		// get pregnant
		wikifier("impregnateParasite", "tentacle", 400);
		wikifier("fertiliseParasites");
		V.pregnancyStats.parasiteDoctorEvents = 2;
		V.sexStats.anus.pregnancy.motherStatus = 2;
		// adjust stats
		const para = V.sexStats.anus.pregnancy.fetus[0].stats;
		para.gender = "Hermaphrodite";
		if (upgrades.newLife === 40) {
			para.growth = 7;
			para.speed = 54;
		}
		para.lastEgg = Math.floor(para.growth / 3);
	}

	// ear slime
	if (upgrades.aNewBestFriend) {
		wikifier("parasite", "left_ear", "slime");
		if (upgrades.aNewBestFriend > 10) wikifier("parasite", "right_ear", "slime");
		switch (V.featsBoosts.earSlimeType) {
			case "grownAggressive":
				V.earSlime.corruption = 100;
				V.earSlime.growth = 25;
				V.earSlime.startedThreats = true;
				V.earSlime.exhibitionism = 2;
				V.earSlime.deviancy = 2;
				V.earSlime.promiscuity = 2;
				break;
			case "immatureAggressive":
				V.earSlime.corruption = 20;
				V.earSlime.growth = 0;
				V.earSlime.startedThreats = true;
				V.earSlime.exhibitionism = 2;
				V.earSlime.deviancy = 2;
				V.earSlime.promiscuity = 2;
				break;
			default:
				V.earSlime.corruption = 0;
		}
	} else {
		delete V.featsBoosts.earSlimeType;
	}

	// random clothes
	if (upgrades.randomClothing) {
		const clothingItems = upgrades.randomClothing * 3;
		const equip = clone(setup.clothingLayer.body);
		const options = {};
		equip.forEach(slot => {
			options[slot] = setup.clothes[slot].filter(c => {
				if (V.featsBoosts.clothingGender === "Female" && c.gender === "m") return false;
				if (V.featsBoosts.clothingGender === "Male" && c.gender === "f") return false;
				if (c.outfitSecondary) return false;
				if (!c.shop.includes("clothing")) return false;
				return true;
			});
		});

		// make normal clothes and underwear more likely to appear than accessories
		equip.push("upper", "upper", "upper", "upper", "lower", "lower", "lower", "lower", "under_upper", "under_upper", "under_lower", "under_lower");
		for (let i = 0; i < clothingItems; ++i) {
			// pick random item from weighted slot list
			const item = clone(options[equip.random()].random());
			// make sure there's enough space in our wardrobe
			if (item.outfitPrimary && Object.keys(item.outfitPrimary).length + 1 > clothingItems - i) {
				--i;
				continue;
			}
			// pick the color if available
			if (item.colour_options?.length) {
				const colors = clone(item.colour_options);
				if (colors.includes("custom") && V.featsBoosts.clothingCustomColors) {
					item.colour = "custom";
					item.colourCustom = customColour(random(0, 360), random(0, 20) / 10, random(5, 40) / 10, random(0, 20) / 10, random(0, 100) / 100);
				} else {
					colors.delete("custom");
					item.colour = colors.random();
				}
			}
			// pick accessory color
			if (item.accessory_colour_options?.length) {
				const colors = clone(item.accessory_colour_options);
				if (colors.includes("custom") && V.featsBoosts.clothingCustomColors) {
					item.accessory_colour = "custom";
					item.accessory_colourCustom = customColour(
						random(0, 360),
						random(0, 20) / 10,
						random(5, 40) / 10,
						random(0, 20) / 10,
						random(0, 100) / 100
					);
				} else {
					colors.delete("custom");
					item.accessory_colour = colors.random();
				}
			}
			// pick the pattern
			if (item.pattern_options?.length) item.pattern = clone(item.pattern_options.random());

			// oh no. the outfits.
			if (item.outfitPrimary) {
				Object.keys(item.outfitPrimary).forEach(slot => {
					const item2 = clone(setup.clothes[slot].find(c => c.name === item.outfitPrimary[slot]));
					// transfer colors and patterns
					["colour", "colourCustom", "accessory_colour", "accessory_colourCustom", "pattern"].forEach(p => {
						if (item[p]) item2[p] = clone(item[p]);
					});
					V.wardrobe[item2.slot].push(item2);
				});
			}
			V.wardrobe[item.slot].push(item);
		}
	}

	// special clothes
	if (upgrades.specialClothing) {
		const unlocked = V.feats.allSaves.specialClothes;
		specialClothesUpdate();
		const level = details.specialClothing.purchased;
		// old notes on the level:
		/* Level 1 upgrade - unlock previously unlocked special clothing sets by selection. */
		/* Level 2 upgrade - unlock all special clothes unlocked in any other save. */
		/* Level 3 upgrade - everything is remembered. */
		unlocked.forEach(c => {
			if (V.featsBoosts.specialClothesSets[c] === true) specialClothesUnlock("set", c, Math.clamp(level, 2, 3));
		});
	}

	// seeds
	if (upgrades.seeds) {
		V.feats.allSaves.seeds.forEach(c => {
			if (V.featsBoosts.seeds[c] === true) V.plants_known.push(c);
		});
	}

	// tattoos
	if (upgrades.tattoos) {
		// number of tattoos to apply
		const totalTattoos = gain("tattoos", 1);
		// list of all available tattoos
		const featsTattooAll = Object.values(setup.bodywriting)
			.filter(t => !t.featSkip)
			.map(m => m.writingKr);
		// list of all available bodyparts
		const bodyparts = clone(setup.bodyparts);
		// boost options
		const boostObj = V.featsBoosts.tattoos;

		// remove non-random claimed locations from the pool
		// slots do not start at 0, they go 1-5!!!
		for (let i = 1; i <= totalTattoos; ++i) {
			const location = boostObj[i].bodypart;
			if (location !== "Random") bodyparts.delete(location.toLowerCase().replaceAll(" ", "_"));
		}

		// apply tattoos
		for (let i = 1; i <= totalTattoos; ++i) {
			const location = boostObj[i].bodypart === "Random" ? bodyparts.pluck() : boostObj[i].bodypart.toLowerCase().replaceAll(" ", "_");
			const tattooWriting = boostObj[i].tattoo === "Random" ? featsTattooAll.random() : boostObj[i].tattoo;
			const tattoo = Object.keys(setup.bodywriting).find(k => setup.bodywriting[k].writingKr === tattooWriting);
			const pen = boostObj[i].pen.toLowerCase();
			wikifier("add_bodywriting", location, tattoo, pen);
		}
		wikifier("bodywritingExposureCheck", true);
	}

	// sex toys
	if (upgrades.sexToys) {
		const totalToys = gain("sexToys", 3);
		// stupid code uses stupid indexes, arrrr
		const toyIndexes = setup.sextoys.filter(t => !t.shop.includes("forest")).map(m => m.index);
		const boostObj = V.featsBoosts.sexToys;
		// remove claimed non-random toys from the pool
		for (let i = 0; i < totalToys; ++i) {
			if (toyIndexes.includes(boostObj[i].index)) toyIndexes.delete(boostObj[i].index);
		}
		for (let i = 0; i < totalToys; ++i) {
			// index
			let index = boostObj[i].index;
			if (index == null || index === -1) index = toyIndexes.pluck();
			// color
			let color = boostObj[i].colour;
			if (color == null || color === -1) color = setup.sextoys[index].colour_options.random();

			sexShopOnBuyClick(index, false, color, false);
		}
	}

	// cleanup
	["name", "missing", "clothingCustomColors", "clothingGender", "upgradeDetails", "tattoos", "sexToys", "hidden", "purchased", "specialClothesSets"].forEach(
		k => delete V.featsBoosts[k]
	);
}
DefineMacro("applyFeatBoosts", applyFeatBoosts);

/*
Paste in the console to get the total number of vrelcoins
Object.values(setup.feats).reduce((num, feat) => num + feat.difficulty, 0)
*/
