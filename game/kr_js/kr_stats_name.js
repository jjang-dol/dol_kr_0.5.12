Macro.add('moneyStatsNamesKr', {
	handler: function () {
		// 1. 원본 위젯을 백그라운드에서 실행하여 결과값(영어 텍스트)만 바로 따옴
		let buffer = document.createDocumentFragment();
		new Wikifier(buffer, '<<moneyStatsNames ' + this.args.raw + '>>');
		let eng = $(buffer).text().trim();

		if (!eng) return;

		// 2. 통짜 예외 사전
		const fullMatch = {
			"Not Tracked": "미추적",
			"Cafe Chef": "카페 요리사 알바",
			"Estate Betting": "블랙잭 도박",
			"Compound Phials": "약병(단지)",
			"Hospital Parasites Sold": "기생충 판매(병원)",
			"Hospital Paternity Test": "친자 확인 검사",
			"Hospital Breast Reduction": "가슴 축소 수술",
			"Hospital Breast Enlargement": "가슴 확대 수술",
			"Hospital Penis Reduction": "성기 축소 수술",
			"Hospital Penis Enlargement": "성기 확대 수술",
			"Hospital Tattoo Removal": "문신 제거(병원)",
			"Hospital Parasite Removal": "기생충 제거(병원)",
			"Pharmacy After Pill": "약국 사후피임약",
			"People Of Interest": "주요 인물",
			"Party Dance Job": "파티 댄스 알바",
			"Danube Dance Job": "다뉴브 댄스 알바",
			"Party Dance Job Tips": "파티 댄스 알바 팁",
			"Danube Dance Job Tips": "다뉴브 댄스 알바 팁",
			"Pet Shop": "펫샵",
			"Toy Shop": "장난감 가게",
			"Adult Shop": "성인용품 가게",
			"Cafe Waiter": "카페 웨이터",
			"Cafe Waitress": "카페 웨이트리스",
			"Tutorial Man": "튜토리얼",
			"Tutorial Woman": "튜토리얼",
			"Strip Club Bartender": "스트립 클럽 바텐더 팁",
			"Strip Club Dancer": "스트립 클럽 댄서 팁"
		};

		// 3. 단어 1:1 매칭 사전
		const wordDict = {
			"Starting": "시작", "Money": "자금", "Town": "마을", "Debug": "디버그",
			"Farm": "농장", "Upgrades": "업그레이드", "Orphanage": "고아원", "Blackjack": "블랙잭",
			"Bailey": "베일리", "Rent": "집세", "Museum": "박물관", "Antique": "골동품",
			"Cafe": "카페", "Chef": "요리사", "Buns": "빵", "Tailor": "재단사", "Clothes": "옷",
			"Hospital": "병원", "Shopping": "쇼핑", "Bay": "베이", "Window": "윈도우", "Decor": "장식",
			"Prostitution": "매춘", "Moor": "황무지", "Riding": "승마", "Lessons": "레슨",
			"Lube": "윤활제", "Tip": "팁", "Tips": "팁", "Bribe": "뇌물", "Arcade": "오락실",
			"Brothel": "창관", "Gloryhole": "글로리홀", "Show": "쇼", "Vending": "자판기", "Machine": "",
			"Condoms": "콘돔", "Bus": "버스", "Dance": "댄스", "Studio": "스튜디오",
			"Danube": "다뉴브", "Party": "파티", "Gift": "선물", "Docks": "부두", "Wage": "임금",
			"Factory": "공장", "Produce": "농산물", "Flats": "아파트", "Hookah": "물담배", "Cleaning": "청소",
			"Paternity": "친자", "Test": "검사", "Breast": "가슴", "Reduction": "축소", "Enlargement": "확대",
			"Penis": "성기", "Tattoo": "문신", "Removal": "제거", "Parasite": "기생충",
			"Pharmacy": "약국", "Contacts": "콘택트렌즈", "Pump": "유축기", "Pregnancy": "임신",
			"Cream": "크림", "Pills": "알약", "After": "사후", "Pill": "피임약",
			"Market": "시장", "Stall": "가판대", "Collar": "목걸이", "Pub": "펍",
			"Pepper": "호신", "Spray": "스프레이", "Alcohol": "술", "Stolen": "장물", "Goods": "",
			"Pregnant": "임신한", "Student": "학생", "School": "학교", "Pool": "수영장",
			"Stimulant": "각성제", "Project": "프로젝트", "Library": "도서관", "Books": "책",
			"Cosmetics": "화장품", "Furniture": "가구", "Hairdressers": "미용실", "Robin": "로빈",
			"Pet": "펫", "Shop": "샵", "Toy": "장난감", "Supermarket": "슈퍼마켓", "Spa": "스파",
			"Thievery": "절도", "Strip": "스트립", "Club": "클럽",
			"Avery": "에이버리", "Sydney": "시드니", "Whitney": "휘트니", "Police": "경찰",
			"Jobs": "알바", "Job": "알바", "People": "주요", "Of": "", "Interest": "인물",
			"Canal": "운하", "Photo": "사진", "Forest": "숲", "Temple": "사원",
			"Adult": "성인용품", "Office": "사무실", "Pound": "축사", "Pirates": "해적선",
			"Blitz": "블리츠", "Fishing": "낚시", "Asylum": "정신병원", "Mansion": "저택",
			"Beach": "해변", "Underground": "지하", "Compound": "엘크 단지",
			"Bartender": "바텐더", "Dancer": "댄서", "Waiter": "웨이터", "Waitress": "웨이트리스",
			"Dancing": "댄스 팁", "Estate": "블랙잭", "Betting": "도박"
		};

		// 4. 번역 후 출력
		let output = "";
		if (fullMatch[eng]) {
			output = fullMatch[eng];
		} else {
			output = eng.split(" ").map(w => wordDict[w] !== undefined ? wordDict[w] : w).join(" ").replace(/\s+/g, " ").trim();
		}

		$(this.output).append(output);
	}
});