/* eslint-disable eqeqeq */
/* eslint-disable no-eval */
/* eslint-disable no-undef */
/* A standard function to reference to avoid declaring an anonymous function repeatedly. */
const stayOnPassageFn = function () {
	return V.passage;
};

setup.debugMenu = {
	cacheDebugDiv: {},
};

setup.debugMenu.eventList = {
	Main: [
		{
			link: [`홈`, `Bedroom`],
			widgets: [`<<endcombat>>`],
		},
		{
			link: [`테스트`, `Test`],
			widgets: [`<<endcombat>>`],
		},
		{
			link: [`에이버리 분노 증가`, stayOnPassageFn],
			widgets: [`<<npcincr Avery rage 100>>`, `<<set $averyragerevealed to 1>>`],
		},
		{
			link: [`에이버리 진정`, stayOnPassageFn],
			widgets: [`<<npcincr Avery rage -100>>`, `<<set $averyragerevealed to 0>>`],
		},
		{
			link: [`1분 경과`, stayOnPassageFn],
			widgets: [`<<pass 1>>`],
		},
		{
			link: [`15분 경과`, stayOnPassageFn],
			widgets: [`<<pass 15>>`],
		},
		{
			link: [`20분 경과`, stayOnPassageFn],
			widgets: [`<<pass 20>>`],
		},
		{
			link: [`1시간 경과`, stayOnPassageFn],
			widgets: [`<<pass 60>>`],
		},
		{
			link: [`3시간 경과`, stayOnPassageFn],
			widgets: [`<<pass 3 hours>>`],
		},
		{
			link: [`6시간 경과`, stayOnPassageFn],
			widgets: [`<<pass 6 hours>>`],
		},
		{
			link: [`12시간 경과`, stayOnPassageFn],
			widgets: [`<<pass 12 hours>>`],
		},
		{
			link: [`18시간 경과`, stayOnPassageFn],
			widgets: [`<<pass 18 hours>>`, `<<set $tiredness to 0>>`],
		},
		{
			link: [`23시간 경과`, stayOnPassageFn],
			widgets: [`<<pass 23 hours>>`, `<<set $tiredness to 0>>`],
		},
		{
			link: [`24시간 경과`, stayOnPassageFn],
			widgets: [`<<pass 24 hours>>`, `<<set $tiredness to 0>>`],
		},
		{
			link: [`옷장`, `Wardrobe`],
			widgets: [``],
		},
		{
			link: [`식재료 속성 디버그`, `Foodstuff Prop Debug`],
			widgets: [``],
		},
		{
/* ========= 번역 필요 ========= */
			link: [`Caught Fish Prop Debug`, `Caught Fish Prop Debug`],
			widgets: [``],
		},
		{
/* ========================= */
			link: [`모든 레시피 습득`, stayOnPassageFn],
			widgets: [`<<learn_recipe_all>>`],
		},
		{
			link: [`식재료별 20개 지급`, stayOnPassageFn],
			widgets: [`<<give_all_foodstuff>>`],
/* ========= 번역 필요 ========= */
		},
		{
			link: [`Unlock All Love Interests`, stayOnPassageFn],
			widgets: [`<<debugUnlockAllLoveInterests>>`],
/* ========================= */
		},
		{
			link: [`벗기기`, stayOnPassageFn],
			widgets: [`<<undressclothes "wardrobe">>`],
		},
		{
			link: [`속옷만 남기기`, stayOnPassageFn],
			widgets: [
				`<<generalUndress wardrobe over_upper>>`,
				`<<generalUndress wardrobe over_lower>>`,
				`<<generalUndress wardrobe upper>>`,
				`<<generalUndress wardrobe lower>>`,
			],
		},
		{
			link: [`전부 벗기기`, stayOnPassageFn],
			widgets: [`<<undress "wardrobe">>`],
		},
		{
			link: [`CanvasModel 예시`, `CanvasModel Example`],
			widgets: [``],
		},
		{
			link: [`적 신뢰도 +++`, stayOnPassageFn],
			widgets: [`<<set $enemytrust += 2000>>`, `<<set $enemyanger -= 1000>>`],
		},
		{
			link: [`적 신뢰도 ---`, stayOnPassageFn],
			widgets: [`<<set $enemytrust -= 2000>>`, `<<set $enemyanger += 1000>>`],
		},
		{
			link: [`슈퍼 펀치`, stayOnPassageFn],
			widgets: [`<<set $enemyhealth to 0>>`],
		},
		{
			link: [`슈퍼 애무`, stayOnPassageFn],
			widgets: [() => `<<set $enemyarousal to ` + V.enemyarousalmax + `>>`],
		},
		{
			link: [`비명`, stayOnPassageFn],
			widgets: [`<<set $alarm to 1>>`],
		},
		{
			link: [`Finish 변수 설정(항상 작동하진 않음)`, stayOnPassageFn],
			widgets: [`<<set $finish to 1>>`],
		},
		{
			link: [`비동의 상태로 설정`, stayOnPassageFn],
			widgets: [`<<set $consensual to 0>>`],
		},
		{
			link: [`동의 상태로 설정`, stayOnPassageFn],
			widgets: [`<<set $consensual to 1>>`],
		},
		{
			link: [`적 흥분 ---`, stayOnPassageFn],
			widgets: [`<<set $enemyarousal to 0>>`],
		},
		{
			link: [`자세 뒤집기`, stayOnPassageFn],
			widgets: [
				() => {
					V.position = V.position === "doggy" ? "missionary" : "doggy";
				},
			],
		},
		{
			link: [`새 RNG로 현재 passage 재생`, ""],
			widgets: [`<<run updateSessionRNG()>>`],
		},
		{
			link: [`RNG 1`, stayOnPassageFn],
			widgets: [`<<set $rng to 1>>`],
		},
		{
			link: [`RNG 11`, stayOnPassageFn],
			widgets: [`<<set $rng to 11>>`],
		},
		{
			link: [`RNG 21`, stayOnPassageFn],
			widgets: [`<<set $rng to 21>>`],
		},
		{
			link: [`RNG 31`, stayOnPassageFn],
			widgets: [`<<set $rng to 31>>`],
		},
		{
			link: [`RNG 41`, stayOnPassageFn],
			widgets: [`<<set $rng to 41>>`],
		},
		{
			link: [`RNG 51`, stayOnPassageFn],
			widgets: [`<<set $rng to 51>>`],
		},
		{
			link: [`RNG 61`, stayOnPassageFn],
			widgets: [`<<set $rng to 61>>`],
		},
		{
			link: [`RNG 71`, stayOnPassageFn],
			widgets: [`<<set $rng to 71>>`],
		},
		{
			link: [`RNG 81`, stayOnPassageFn],
			widgets: [`<<set $rng to 81>>`],
		},
		{
			link: [`RNG 91`, stayOnPassageFn],
			widgets: [`<<set $rng to 91>>`],
		},
		{
			link: [`RNG 재굴림 x1`, stayOnPassageFn],
			widgets: [`<<set $rng to random(1,100)>>`],
		},
		{
			link: [`RNG 재굴림 x3`, stayOnPassageFn],
			widgets: [`<<run random(1,100)>>`, `<<run random(1,100)>>`, `<<set $rng to random(1,100)>>`],
		},
		{
			link: [`RNG 재굴림 x5`, stayOnPassageFn],
			widgets: [`<<run random(1,100)>>`, `<<run random(1,100)>>`, `<<run random(1,100)>>`, `<<run random(1,100)>>`, `<<set $rng to random(1,100)>>`],
		},
		{
			link: [`선드레스 착용`, stayOnPassageFn],
			widgets: [`<<upperwear "sundress">>`],
		},
		{
			link: [`수영복 착용`, stayOnPassageFn],
			widgets: [`<<underupperwear "school swimsuit">>`],
		},
		{
			link: [`테스트 룸`, `Testing Room`],
			widgets: [`<<upperstrip>>`, `<<lowerstrip>>`, `<<underlowerstrip>>`],
		},
		{
			link: [`이벤트 종료`, stayOnPassageFn],
			widgets: [`<<endevent>>`],
		},
		{
			link: [`보어 탈출`, stayOnPassageFn],
			widgets: [`<<set $vorestage to 0>>`],
		},
		{
			link: [`Earn all Feats`, stayOnPassageFn],
			widgets: [
				`
				<<set _featList to Object.keys(setup.feats)>>
				<<for _i to 0; _i lt _featList.length; _i++>>
					<<set $feats.currentSave[_featList[_i]] to new DateTime().timeStamp>>
				<</for>>
			`,
			],
		},
		{
			link: [`Unlock forest shop clothing`, stayOnPassageFn],
			widgets: [
				`
				<<for _i to 0; _i lt $specialClothes.length; _i++>>
					<<set $specialClothes[_i].unlocked to 3>>
				<</for>>
			`,
			],
		},
		{
			text_only: `\n`,
		},
		{
			link: [`모든 짐승을 수컷으로`, stayOnPassageFn],
			widgets: [`<<set $settings.monsterChance to 0>>`, `<<set $settings.beastMaleChanceMale to 100>>`, `<<set $settings.beastMaleChanceFemale to 100>>`],
		},
		{
			link: [`모든 짐승을 암컷으로`, stayOnPassageFn],
			widgets: [`<<set $settings.monsterChance to 0>>`, `<<set $settings.beastMaleChanceMale to 0>>`, `<<set $settings.beastMaleChanceFemale to 0>>`],
		},
		{
			link: [`모든 짐승을 보지 달린 남자로`, stayOnPassageFn],
			widgets: [
				`<<set $settings.beastMaleChanceMale to 100>>`,
				`<<set $settings.beastMaleChanceFemale to 100>>`,
				`<<set $settings.maleNPCVaginaChance to 100>>`,
			],
		},
		{
			link: [`모든 짐승을 자지 달린 여자로`, stayOnPassageFn],
			widgets: [
				`<<set $settings.beastMaleChanceMale to 0>>`,
				`<<set $settings.beastMaleChanceFemale to 0>>`,
				`<<set $settings.femaleNPCPenisChance to 100>>`,
			],
		},
		{
			link: [`모든 짐승을 마물 인간으로`, stayOnPassageFn],
			widgets: [`<<set $settings.monsterChance to 100>>`, `<<set $settings.monsterHallucinationsOnly to false>>`],
		},
		{
			text_only: `\n`,
		},
		{
			link: [`봄`, stayOnPassageFn],
			widgets: [`<<run Time.timeTravel(new DateTime(Time.year, 3))>>`],
		},
		{
			link: [`여름`, stayOnPassageFn],
			widgets: [`<<run Time.timeTravel(new DateTime(Time.year, 6))>>`],
		},
		{
			link: [`가을`, stayOnPassageFn],
			widgets: [`<<run Time.timeTravel(new DateTime(Time.year, 9))>>`],
		},
		{
			link: [`겨울`, stayOnPassageFn],
			widgets: [`<<run Time.timeTravel(new DateTime(Time.year, 12))>>`],
		},
		{
			text_only: `\n`,
		},
		{
			link: [`기본 임신 기능 활성화`, stayOnPassageFn],
			widgets: [`<<set $pregnancyStats.parasiteDoctorEvents to 2>>`],
		},
		{
			link: [`초기 어머니 특성 획득`, stayOnPassageFn],
			widgets: [`<<set $sexStats.anus.pregnancy.motherStatus to 1>>`],
		},
		{
			link: [`새 알 수정`, stayOnPassageFn],
			widgets: [`<<fertiliseParasites>>`, `<<fertiliseParasites "vagina">>`],
		},
		{
			link: [`임신 하루 진행`, stayOnPassageFn],
			widgets: [`<<parasiteProgressDay>>`],
		},
		{
			link: [`임신 일주일 진행`, stayOnPassageFn],
			widgets: [
				`<<parasiteProgressDay>>`,
				`<<parasiteProgressDay>>`,
				`<<parasiteProgressDay>>`,
				`<<parasiteProgressDay>>`,
				`<<parasiteProgressDay>>`,
				`<<parasiteProgressDay>>`,
				`<<parasiteProgressDay>>`,
				`<<parasiteProgressDay>>`,
			],
		},
		{
			link: [() => `모든 임신 이벤트를 다음 단계로 설정`, stayOnPassageFn],
			widgets: [
				`<<set _pregnancy to $sexStats.anus.pregnancy>>`,
				() => (T.pregnancy.fetus[0] == null ? "" : `<<set _pregnancy.fetus[0].timeLeft to 1>>`),
				() => (T.pregnancy.fetus[1] == null ? "" : `<<set _pregnancy.fetus[1].timeLeft to 1>>`),
				() => (T.pregnancy.fetus[2] == null ? "" : `<<set _pregnancy.fetus[2].timeLeft to 1>>`),
				() => (T.pregnancy.fetus[3] == null ? "" : `<<set _pregnancy.fetus[3].timeLeft to 1>>`),
			],
		},
		{
			text_only: `\n이 항목들은 여전히 수정(Fertilise)이 필요함`,
		},
		{
			link: [`장어 기생충 임신`, stayOnPassageFn],
			widgets: [`<<impregnateParasite "eels" 1000>>`],
		},
		{
			link: [`슬라임 기생충 임신`, stayOnPassageFn],
			widgets: [`<<impregnateParasite "slimes" 1000>>`],
		},
		{
			link: [`벌레 기생충 임신`, stayOnPassageFn],
			widgets: [`<<impregnateParasite "worms" 1000>>`],
		},
		{
			link: [`촉수 기생충 임신`, stayOnPassageFn],
			widgets: [`<<impregnateParasite "tentacle" 1000>>`],
		},
		{
			text_only: `\n`,
		},
		{
			link: [`임신 객체 복구`, stayOnPassageFn],
			widgets: [`<<pregnancyObjectRepair>>`],
		},
		{
			link: [`임신 객체 초기화`, stayOnPassageFn],
			widgets: [`<<unset $container>>`, `<<run delete $sexStats.anus>>`, `<<physicalAdjustmentsInit>>`, `<<containersInit>>`],
		},
		{
			text_only: `\n질 임신<br>(임신 중이 아닐 때만 새 임신 발생)\n`,
			condition() {
				return V.player.penisExist === false;
			},
		},
		{
			text_only: `플레이어가 이미 임신 중\n`,
			condition() {
				return V.player.penisExist === false && playerIsPregnant();
			},
		},
		{
			link: [`인간 아이 임신`, stayOnPassageFn],
			widgets: [
				() => {
					return `<<playerPregnancy "Debug Man" "human" true "vagina" undefined true>>`;
				},
			],
			condition() {
				return V.player.penisExist === false && !playerIsPregnant();
			},
		},
		{
			link: [`늑대 새끼 임신`, stayOnPassageFn],
			widgets: [
				() => {
					return `<<playerPregnancy "Debug Wolf" "wolf" true "vagina" undefined true>>`;
				},
			],
			condition() {
				return V.player.penisExist === false && !playerIsPregnant();
			},
		},
		{
			link: [`임신을 말기까지 진행`, stayOnPassageFn],
			widgets: [
				() => {
					const preg = getPlayerPregnancy();
					if (preg) preg.conceivedDate = Time.date.timeStamp - (getDueDate(preg) - preg.conceivedDate);
					return "";
				},
			],
			condition() {
				return V.player.penisExist === false && playerIsPregnant();
			},
		},
		{
			link: [`임신 종료 후 아이를 기본 위치로 보내기`, stayOnPassageFn],
			widgets: [
				() => {
					switch (playerNormalPregnancyType()) {
						case "human":
							endPlayerPregnancy("hospital", "home");
							break;
						case "wolf":
							endPlayerPregnancy("wolf_cave", "wolf_cave");
							break;
						default:
							endPlayerPregnancy("unknown", "unknown");
							break;
					}
					return "";
				},
			],
			condition() {
				return V.player.penisExist === false && playerIsPregnant();
			},
		},
		{
			text_only: `\nNPC 임신`,
		},
		{
			text_only: `(각 NPC는 setup에서 임신 가능 상태로 활성화되어 있어야 함)\n`,
		},
		{
			link: [`로빈을 PC의 아이로 임신시킴`, stayOnPassageFn],
			widgets: [`<<namedNpcPregnancy "Robin" "pc" "human" true true>>`],
		},
		{
			link: [`휘트니를 검은 늑대 새끼로 임신시킴`, stayOnPassageFn],
			widgets: [`<<namedNpcPregnancy "Whitney" "Black Wolf" "wolf" true true>>`],
		},
		{
			link: [`기본 NPC 압축 테스트`, stayOnPassageFn],
			widgets: [
				() => {
					// Copy this debug option for use with other compressor debugging.
					const testList = {};
					const invalidList = [];
					let currentNPC;

					for (let i = 0; i < 6; i++) {
						currentNPC = V.NPCList[i].fullDescription;

						if (currentNPC) {
							if (!V.NPCNameList.includes(currentNPC)) {
								testList["NPCList" + i] = V.NPCList[i];
							} else invalidList.push(currentNPC);
						}
					}

					if (Object.keys(testList).length != 0) compressionVerifier(testList, false, true);
					if (Object.keys(invalidList).length != 0) console.log("The following NPC(s) in $NPCList could not be tested: " + invalidList.join(", "));
					else if (Object.keys(testList).length === 0 && Object.keys(invalidList).length === 0)
						console.log("There are no NPCs in the NPCList to test.");

					return "";
				},
			],
		},
		{
			link: [`디버그 줄 표시`, stayOnPassageFn],
			widgets: [`<<set $debugLines to true>>`],
		},
		{
			link: [`디버그 줄 숨김`, stayOnPassageFn],
			widgets: [`<<set $debugLines to false>>`],
		},
		{
			link: [`날씨 구간 경계 토글`, stayOnPassageFn],
			widgets: [`<<set $debugWeatherBandBounds to !$debugWeatherBandBounds>>`],
		},
		{
			text_only: `\n`,
		},
	],
	Events: [
		{
			link: [`성인용품점`, `Adult Shop Menu`],
			widgets: [],
		},
		{
			link: [`성인용품 인벤토리`, `Sextoys Inventory`],
			widgets: [],
		},
		{
			link: [`로빈과 함께 감금`, `Underground Intro`],
			widgets: [`<<set $phase to 1>>`],
		},
		{
			link: [`로빈 이벤트 시작`, stayOnPassageFn],
			widgets: [`<<set $robindebt to 9>>`],
		},
		{
			link: [`학교 시작`, `Oxford Street`],
			widgets: [`<<pass 1 day>>`],
		},
		{
			link: [`강간 이벤트 시작`, `Molestation`],
			widgets: [`<<endcombat>>`, `<<set $molestationstart to 1>>`],
		},
		{
			link: [`2인 강간 이벤트 시작`, `Forest Molestation`],
			widgets: [`<<endcombat>>`, `<<set $molestationstart to 1>>`],
		},
		{
			link: [`관객 동반 집단 강간 이벤트`, `The Pod`],
			widgets: [`<<endcombat>>`, `<<set $molestationstart to 1>>`],
		},
		{
			link: [`성관계 이벤트 [남]`, `Beach Day Encounter Sex`],
			widgets: [`<<endcombat>>`, `<<generateNPC 1 a m m>>`, `<<person1>>`, `<<set $sexstart to 1>>`],
		},
		{
			link: [`성관계 이벤트 [여]`, `Beach Day Encounter Sex`],
			widgets: [`<<endcombat>>`, `<<generateNPC 1 a f f>>`, `<<person1>>`, `<<set $sexstart to 1>>`],
		},
		{
			link: [`관객 동반 집단 성관계 이벤트`, `Maths Lesson Gang Bang`],
			widgets: [`<<endcombat>>`, `<<set $sexstart to 1>>`],
		},
		{
			link: [`DP 테스트`, `DP Test`],
			widgets: [`<<endcombat>>`, `<<set $molestationstart to 1>>`],
		},
		{
			link: [`목조르기/질식 테스트`, `Beach Day Encounter Sex`],
			widgets: [
				`<<endcombat>>`,
				`<<generate1>>`,
				`<<person1>>`,
				`<<set $sexstart to 1>>`,
				`<<set $oxygen to 0>>`,
				`<<set $suffocating to 3>>`,
				`<<set $NPCList[0].righthand to "throat">>`,
				`<<set $neckuse to "hand">>`,
				`<<set $askedtochoke to 1>>`,
			],
		},
		{
			link: [`이름 있는 NPC 갱뱅 테스트`, `Named NPC Gangbang Select`],
			widgets: [`<<endcombat>>`],
		},
		{
			link: [`NPC 역할 선택`, `NPC Role Select`],
			widgets: [`<<endcombat>>`],
		},
		{
			link: [`NPC 의상 선택`, `NPC Clothing Select`],
			widgets: [`<<endcombat>>`],
		},
		{
			link: [`NNPC 페니스 밴드 테스트`, `NNPC Strapon Generator`],
			widgets: [`<<endcombat>>`],
		},
		{
			link: [`식물 마물 테스트`, `Plantperson Test`],
			widgets: [`<<endcombat>>`],
		},
		{
			link: ["최면술사 테스트", "Hypnotist Test"],
			widgets: ["<<endcombat>>"],
		},
		{
			link: [`임신 배 테스트`, `Pregnancy Belly Test`],
			widgets: [`<<endcombat>><<set $sexstart to 1>>`],
		},
		{
			link: [`스탯 표시 테스트`, `statDisplay Test`],
			widgets: [`<<endcombat>>`],
		},
		{
			link: [`순결 표시 테스트`, `Virginity Show Test`],
			widgets: [],
		},
		{
			link: [`장어 떼 이벤트`, `Sea Eels`],
			widgets: [`<<endcombat>>`, `<<set $molestationstart to 1>>`],
		},
		{
			link: [`기계`, `Machine`],
			widgets: [`<<endcombat>>`, `<<set $molestationstart to 1>>`],
		},
		{
			link: [`저항`, `Struggle`],
			widgets: [`<<endcombat>>`, `<<set $struggle_start to 1>>`],
		},
		{
			link: [`버스 강간`, `Bus move`],
			widgets: [`<<endcombat>>`, `<<generate1>>`, `<<person1>>`, `<<set $molestationstart to 1>>`],
		},
		{
			link: [`고래 보어 이벤트`, `Monster Test`],
			widgets: [`<<endcombat>>`, `<<set $molestationstart to 1>>`],
		},
		{
			link: [`개 강간 이벤트`, "Street Dogs"],
			widgets: [
				`<<endcombat>>`,
				`<<set $molestationstart to 1>>`,
				`<<beastNEWinit 3 dog>>`,
				`<<set $outside to 1>>`,
				`<<set $location to "town">>`,
				`<<set $bus to "domus">>`,
			],
		},
		{
			link: [`짐승 집단 테스트(현재 고장)`, `The Farm`],
			widgets: [`<<endcombat>>`, `<<set $molestationstart to 1>>`, `<<set $outside to 1>>`, `<<location "forest">>`, `<<set $bus to "forest">>`],
		},
		{
			link: [`돌고래 성관계 이벤트`, `Sea Dolphins Sex`],
			widgets: [
				`<<endcombat>>`,
				`<<set $sexstart to 1>>`,
				`<<beastNEWinit 3 dolphin>>`,
				`<<set $outside to 1>>`,
				`<<location to "sea">>`,
				`<<set $bus to "sea">>`,
			],
		},
		{
			link: [`소 테스트`, `Cow Test Sex`],
			widgets: [`<<endcombat>>`, `<<set $sexstart to 1>>`],
		},
		{
			link: [`촉수 강간 이벤트`, `Sea Tentacles`],
			widgets: [`<<endcombat>>`, `<<set $molestationstart to 1>>`],
		},
		{
			link: [`베일리 테스트`, `Bus move`],
			widgets: [`<<endcombat>>`, `<<set $molestationstart to 1>>`, `<<npc Bailey>>`, `<<person1>>`],
		},
		{
			link: [`레이튼 사무실 체벌`, `School Detention`],
			widgets: [`<<endcombat>>`, `<<set $detention to 55>>`],
		},
		{
			link: [`댄서로 일하기`, `Brothel Dance`],
			widgets: [
				`<<endcombat>>`,
				`<<danceinit>>`,
				`<<set $dancing to 1>>`,
				`<<set $venuemod to 3>>`,
				`<<stress -4>>`,
				`<<tiredness 4>>`,
				`<<set $dancelocation to "brothel">>`,
			],
		},
		{
			link: [`에덴 시작`, `Eden Cabin`],
			widgets: [
				`<<endcombat>>`,
				`<<set $syndromeeden to 1>>`,
				`<<set C.npc.Eden.lust to 0>>`,
				`<<set $edenshrooms to 0>>`,
				`<<set $edengarden to 0>>`,
				`<<set $edenspring to 0>>`,
				`<<set $wardrobes.edensCabin.unlocked to true>>`,
			],
		},
		{
			link: [`카일라 지하실 강간`, `Kylar Basement Rape`],
			widgets: [`<<endcombat>>`, `<<set $molestationstart to 1>>`, `<<npc Kylar>>`, `<<person1>>`],
		},
		{
			link: [`카일라 성관계`, `Street Kylar Sex`],
			widgets: [`<<endcombat>>`, `<<set $sexstart to 1>>`, `<<set $location to "town">>`, `<<npc Kylar>>`, `<<person1>>`],
		},
		{
			link: [`로빈 성관계 시작`, `Bed Robin Sex`],
			widgets: [`<<endcombat>>`, `<<set $sexstart to 1>>`, `<<npc Robin>>`, `<<person1>>`],
		},
		{
			link: [`로빈 형틀 관람`, `Robin Pillory Watch`],
			widgets: [`<<robinPunishment "pillory">>`, `<<set $robinmissing to "pillory">>`, `<<set $robinPillory.known to 1>>`],
		},
		{
			link: [`로빈 군중 주의 돌리기`, stayOnPassageFn],
			widgets: [`<<set $robinPillory.distracted to 1>>`],
		},
		{
			link: [`브라이어 지불 거부`, `Brothel Pay Refuse`],
			widgets: [`<<endcombat>>`, `<<set $molestationstart to 1>>`, `<<npc Briar>>`, `<<generate2>>`, `<<generate3>>`, `<<person1>>`],
		},
		{
			link: [`레이튼 성관계`, `Head's Office Photoshoot Sex`],
			widgets: [`<<endcombat>>`, `<<set $sexstart to 1>>`, `<<set $phase to 1>>`, `<<npc Leighton>>`, `<<person1>>`],
		},
		{
			link: [`레이튼 강제 이벤트`, `Head's Office Blackmail Rape`],
			widgets: [`<<endcombat>>`, `<<set $molestationstart to 1>>`, `<<npc Leighton>>`, `<<person1>>`],
		},
		{
			link: [`에이버리 데이트`, `Domus Street`],
			widgets: [`<<set $averydate to 1>>`, `<<set Time.setTime(20, 0)>>`],
		},
		{
/* ========= 번역 필요 ========= */
			link: [`Avery Sex Me In The Car`, `Avery Date Sex`],
			widgets: [`<<endcombat>>`, `<<set $sexstart to 1>>`, `<<npc Avery>>`, `<<person1>>`],
		},
		{
			link: [`Avery Sex Me At The Hotel`, `Avery Hotel Sex`],
			widgets: [
				`<<endcombat>>`,
				`<<set $sexstart to 1>>`,
				`<<npc Avery>>`,
				`<<person1>>`,
				`<<set $outside to 0>>`,
				`<<set $location to "hotel">>`,
				`<<undressSleep "averyhotel">>`,
				`<<set $uppertemp to "init">>`,
				`<<upperwear "babydoll lingerie">>`,
				`<<set $worn.upper.colour to either("black", "blue", "brown", "green", "pink", "purple", "red", "tangerine")>>`,
				`<<set $phase to 1>>`,
			],
		},
		{
			link: [`Avery Rape Me In The Car`, `Avery Walk Rape`],
			widgets: [`<<endcombat>>`, `<<set $molestationstart to 1>>`, `<<npc Avery>>`, `<<person1>>`],
		},
		{
/* ========================= */
			link: [`검은 늑대 강제 이벤트`, `Forest Wolf Molestation`],
			widgets: [
				/* `<<beastNNPCinit>>`, */
				`<<endcombat>>`,
				`<<npc "Black Wolf">>`,
				`<<set $molestationstart to 1>>`,
			],
		},
		{
			link: [`거대 매 사냥 포획`, `Moor`],
			widgets: [`<<set $moor to 50>>`, `<<set $eventskip to 1>>`, `<<moor_hunt_start>>`, `<<set $moor_hunt to 10>>`],
		},
		{
			link: [`경찰 형틀 시작`, `Police Pillory Start`],
			widgets: [`<<crimeUpFlat 5000 "thievery">>`, `<<generate1>>`, `<<person1>>`],
		},
		{
			link: [`휘트니를 형틀에 넣기`, stayOnPassageFn],
			widgets: [`<<imprison_whitney>>`],
		},
		{
			link: [`레이튼을 형틀에 넣기`, stayOnPassageFn],
			widgets: [`<<imprison_leighton>>`],
		},
		{
			link: [`형틀 비우기`, stayOnPassageFn],
			widgets: [`<<clear_pillory>>`],
		},
		{
			link: [`무작위 NPC를 형틀에 넣기`, stayOnPassageFn],
			widgets: [`<<clear_pillory>><<new_npc_pillory>>`],
		},
		{
			link: [`벽 구멍`, `Temple Arcade 2`],
			widgets: [``],
		},
		{
			link: [`창관 처벌`, `Brothel Punishment`],
			widgets: [``],
		},
		{
			link: [`창관 글로리홀`, `Brothel Gloryhole`],
			widgets: [``],
		},
		{
			link: [`의류점`, `Clothing Shop`],
			widgets: [``],
		},
		{
			link: [`숲속 상점`, `Forest Shop`],
			widgets: [``],
		},
		{
			link: [`바다`, `Sea`],
			widgets: [`<<set $sea to 0>>`],
		},
		{
			link: [`병원`, `Hospital Foyer`],
			widgets: [``],
		},
		{
			link: [`늑대 무리`, `Forest Wolf Cave`],
			widgets: [`<<set $wolfpacktrust to 12>>`],
		},
		{
			link: [`할로윈`, stayOnPassageFn],
			widgets: [`<<run Time.timeTravel(new DateTime(Time.year, 10, 21, 7))>>`],
		},
		{
			link: [`완전한 겨울`, stayOnPassageFn],
			widgets: [`<<run Time.timeTravel(new DateTime(Time.year, 12, 1, 7))>>`],
		},
		{
			link: [`크리스마스`, stayOnPassageFn],
			widgets: [`<<run Time.timeTravel(new DateTime(Time.year, 12, 18, 7))>>`],
		},
		{
			link: [`붉은 달`, stayOnPassageFn],
			widgets: [`<<run Time.timeTravel(new DateTime(Time.year, Time.month, Time.lastDayOfMonth, 21, 0))>>`, `<<set $moonstate to "evening">>`],
		},
		{
			link: [`10월로 설정`, stayOnPassageFn],
			widgets: [`<<run Time.timeTravel(new DateTime(Time.year, 10))>>`],
		},
		{
			link: [`구급차 구조 후 기상`, `Ambulance rescue`],
			widgets: [`<<pass 1 hour>>`],
		},
		{
			link: [`하퍼 예약`, `Hospital Foyer`],
			widgets: [`<<set Time.timeTravel(Time.getNextWeekdayDate(6))>>`, `<<set Time.setTime(16)>>`],
		},
		{
			link: [`깊은 숲`, `Forest`],
			widgets: [`<<set $forest to 80>>`],
		},
		{
			link: [`거리 경찰 극단 이벤트`, `Street Police Extreme`],
			widgets: [`<<pass 1 week>>`, `<<pass 1 week>>`, `<<npc Leighton>>`, `<<person1>>`],
		},
		{
			link: [`창관 공연 떼 이벤트`, `Brothel Show Swarm`],
			widgets: [
				`<<leash 1>>`,
				`<<set $leftarm to "bound">>`,
				`<<set $rightarm to "bound">>`,
				`<<set $feetuse to "bound">>`,
				`<<set $sexstart to 1>>`,
				`<<set $rng to random(1,100)>>`,
				`<<npc Briar>>`,
				`<<person1>>`,
			],
		},
		{
			link: [`보지 검사`, `Pussy Inspection`],
			widgets: [`<<pass 1 week>>`, `<<pass 1 week>>`, `<<npc Leighton>>`, `<<person1>>`],
		},
		{
			link: [`자지 검사`, `Penis Inspection`],
			widgets: [`<<pass 1 week>>`, `<<pass 1 week>>`, `<<npc Leighton>>`, `<<person1>>`],
		},
		{
			link: [`가슴 검사`, `Breast Inspection`],
			widgets: [`<<pass 1 week>>`, `<<pass 1 week>>`, `<<npc Leighton>>`, `<<person1>>`],
		},
		{
			link: [`과학 수업 노출`, `Science Event3`],
			widgets: [`<<set $scienceprogression to 3>>`, `<<set $delinquency to 600>>`],
		},
		{
			link: [`역사 수업 형틀`, `History Lesson Pillory`],
			widgets: [``],
		},
		{
			link: [`골목 개`, `Alley Dog`],
			widgets: [``],
		},
		{
			link: [`NNPC 행렬`, `NNPC Parade`],
			widgets: [``],
		},
		{
			link: [`짐승 행렬`, `Beast Parade`],
			widgets: [``],
		},
		{
			link: [`짐승 열차`, `Beast Train`],
			widgets: [``],
		},
		{
			link: [`악마 조우`, `Demon Start`],
			widgets: [``],
		},
		{
			link: [`신전 입문자`, `Temple`],
			widgets: [`<<inittemple>>`],
		},
		{
			link: [`스트립 클럽`, `Strip Club`],
			widgets: [`<<set $id to 1>>`, `<<set $wardrobes.stripClub.unlocked to true>>`],
		},
		{
			link: [`정신병원`, `Hospital Bed`],
			widgets: [`<<set $trauma to 4900>>`],
		},
		{
			link: [`교도소`, `Police Prison Intro Bailey`],
			widgets: [`<<npc Bailey>>`, `<<generate2>>`, `<<generate3>>`, `<<generate4>>`, `<<person2>>`, `<<neckwear 1>>`, `<<crimeUpFlat 5000 "thievery">>`],
		},
		{
			link: [`레미의 농장`, `Livestock Intro`],
			widgets: [``],
		},
		{
			link: [`농장지대`, `Farmland`],
			widgets: [``],
		},
		{
			link: [`박물관`, `Museum`],
			widgets: [``],
		},
		{
			link: [`해변 동굴`, `Beach Cave`],
			widgets: [`<<set $cave to 0>>`, `<<beach_cave_init>>`],
		},
		{
			link: [`노점 임대료`, `Stall Rent`],
			widgets: [`<<run Time.setTime(6, 0)>>`],
		},
		{
			link: [`저택`, `Estate`],
			widgets: [`<<estate_end>>`, `<<estate_init secret>>`],
		},
		{
			link: [`스토킹 이벤트`, `Street Stalk`],
			widgets: [`<<endcombat>>`, `<<generate1>>`, `<<person1>>`, `<<set $molestationstart to 1>>`],
		},
		{
			link: [`이름 있는 NPC 스토킹 테스트`, `Named NPC Stalk Select`],
			widgets: [`<<endcombat>>`, `<<set $phase to 0>>`],
		},
		{
			link: [`베일리가 로빈을 팔다`, `Orphanage`],
			widgets: [
				`<<set $renttime to 0>>`,
				`<<set $baileydefeatedchain to 3>>`,
				`<<set $robinpaid to 1>>`,
				`<<set $robinromance to 1>>`,
				`<<set $bus to "home">>`,
				`<<set $location to "home">>`,
			],
		},
		{
			link: [`원혼 소환`, `Wraith Test Start`],
			widgets: [
				`<<endcombat>>`,
				`<<run Time.timeTravel(new DateTime(Time.year, Time.month, Time.lastDayOfMonth, 21, 0))>>`,
				`<<set $moonstate to "evening">>`,
			],
		},
		{
			link: [`빙의 전투`, `Possessed Fight Test`],
			widgets: [`<<set $control to 0>>`, `<<set $possessed to true>>`],
		},
		{
/* ========= 번역 필요 ========= */
			link: [`Bait Shop Fish Request`, `Bait Shop Request`],
			widgets: [``],
		},
		{
/* ========================= */
			text_only: "\n\n짐승 조우",
		},
		{
			link: ["말", "Livestock Field Horse Lewd Sex"],
			widgets: ["<<endcombat>>", "<<set $sexstart to 1>>"],
		},
		{
			link: ["돼지", "Livestock Job Pig Rape"],
			widgets: ["<<endcombat>>", "<<beastNEWinit 1 'pig'>>", "<<person1>>", "<<set $molestationstart to 1>>"],
		},
		{
			link: ["멧돼지", "Forest Boar Rape"],
			widgets: ["<<endcombat>>", "<<beastNEWinit 1 'boar'>>", "<<person1>>", "<<set $molestationstart to 1>>"],
		},
		{
			link: ["개", "Wolf Pack"],
			widgets: ["<<endcombat>>", "<<beastNEWinit 1 'dog'>>", "<<person1>>", "<<set $molestationstart to 1>>"],
		},
		{
			link: ["여우", "Meadow Cave Sex"],
			widgets: ["<<endcombat>>", "<<beastNEWinit 1 'fox'>>", "<<person1>>", "<<set $sexstart to 1>>"],
		},
		{
			link: ["곰", "Forest Bear Molestation"],
			widgets: ["<<endcombat>>", "<<beastNEWinit 1 'bear'>>", "<<person1>>", "<<set $molestationstart to 1>>"],
		},
		{
			text_only: "\n\n짐승을 다음으로 바꾸기: ",
		},
		{
			link: [`생물`, stayOnPassageFn],
			widgets: [`<<set _xy to $enemyno-1>>`, `<<set $NPCList[_xy].type to "creature">>`],
		},
		{
			link: [`개`, stayOnPassageFn],
			widgets: [`<<set _xy to $enemyno-1>>`, `<<set $NPCList[_xy].type to "dog">>`],
		},
		{
			link: [`늑대`, stayOnPassageFn],
			widgets: [`<<set _xy to $enemyno-1>>`, `<<set $NPCList[_xy].type to "wolf">>`],
		},
		{
			link: [`돌고래`, stayOnPassageFn],
			widgets: [`<<set _xy to $enemyno-1>>`, `<<set $NPCList[_xy].type to "dolphin">>`],
		},
		{
			link: [`곰`, stayOnPassageFn],
			widgets: [`<<set _xy to $enemyno-1>>`, `<<set $NPCList[_xy].type to "bear">>`],
		},
		{
			link: [`멧돼지`, stayOnPassageFn],
			widgets: [`<<set _xy to $enemyno-1>>`, `<<set $NPCList[_xy].type to "boar">>`],
		},
		{
			link: [`돼지`, stayOnPassageFn],
			widgets: [`<<set _xy to $enemyno-1>>`, `<<set $NPCList[_xy].type to "pig">>`],
		},
		{
			link: [`도마뱀`, stayOnPassageFn],
			widgets: [`<<set _xy to $enemyno-1>>`, `<<set $NPCList[_xy].type to "lizard">>`],
		},
		{
            text_only: "\n\n떼 조우:",
		},
		{
            link: [`물고기 망치기`, `Swarm Test`],
            widgets: [`<<set $molestationstart to 1>>`, `<<swarminit "fish" "물고기 떼" "흔들린다" "깨진다" "붙잡는다" 4 6>>`, `<<set $water to 1>>`],
		},
		{
            link: [`호수 물고기`, `Swarm Test`],
			widgets: [
				`<<set $molestationstart to 1>>`,
                `<<swarminit "fish" "물고기" "당신을 향해 다가온다" "당신을 포위한다" "뿌리친다" 1 7>>`,
				`<<set $water to 1>>`,
			],
		},
		{
            link: [`숲 뱀`, `Swarm Test`],
            widgets: [`<<set $molestationstart to 1>>`, `<<swarminit "snakes" "뱀 떼" "당신을 향해 기어온다" "당신을 칭칭 감는다" "밀쳐낸다" 10 0>>`],
		},
		{
            link: [`다뉴브 거미`, `Swarm Test`],
            widgets: [`<<set $molestationstart to 1>>`, `<<swarminit "spiders" "거미 떼" "미끄러져 나온다" "깨진다" "붙잡는다" 1 9>>`],
		},
		{
            link: [`목욕 슬라임`, `Swarm Test`],
            widgets: [`<<set $molestationstart to 1>>`, `<<swarminit "slimes" "슬라임 덩어리" "당신을 향해 다가온다" "당신을 포위한다" "뿌리친다" 8 0>>`],
		},
		{
            link: [`쓰레기 구더기`, `Swarm Test`],
            widgets: [`<<set $molestationstart to 1>>`, `<<swarminit "maggots" "구더기 떼" "기어온다" "파고든다" "밀쳐낸다" 2 8>>`],
		},
		{
            link: [`과학 벌레`, `Swarm Test`],
            widgets: [`<<set $molestationstart to 1>>`, `<<swarminit "worms" "벌레들" "사육장 위에서 흔들린다" "사육장으로 떨어진다" "막는다" 0 10>>`],
		},
		{
            link: [`바다 장어`, `Swarm Test`],
			widgets: [
				`<<set $molestationstart to 1>>`,
                `<<swarminit "eels" "장어" "당신을 향해 다가온다" "당신을 포위한다" "뿌리친다" 1 9>>`,
				`<<set $water to 1>>`,
			],
		},
		{
			link: [`상자 벌레`, `Swarm Test`],
			widgets: [`<<set $molestationstart to 1>>`, `<<swarminit "worms" "상자 벌레" "흔들린다" "깨진다" "붙잡는다" 1 9>>`],
		},
		{
			text_only: `\n이벤트 디버깅:`,
		},
		{
			link: [`NPC 삽입 테스트`, `NPCInsertionAssert`],
			widgets: [``],
		},
		{
			link: [`시간 테스트`, `TimeTest`],
			widgets: [`<<set $prevPassage to $passage>>`, `<<set $timeDistortion to 5>>`],
		},
		{
			text_only: `\n회상 / 유체이탈 이벤트`,
		},
		{
			link: [`분열`, `Schism`],
			widgets: [
				`<<set $outside to 0>>`,
				`<<set $location to 'lake_ruin'>>`,
				`<<set $wraithPrison to {timer: 0, timePassed: 0, search: 0, state: "present", possession: false, masturbation: false}>>`,
				`<<set $lakeRuin ??= {}>><<set $lakeRuin.rune to true>>`,
			],
		},
		{
			link: [`피 흘리는 병동 그림 지급`, `Museum`],
			widgets: [`<<updateMuseumAntiques>>`, `<<set $museumAntiques.paintings.paintingward to "museum">>`],
		},
		{
			link: [`절망의 굴레 그림 지급`, `Museum`],
			widgets: [`<<updateMuseumAntiques>>`, `<<set $museumAntiques.paintings.paintingsnake to "museum">>`],
		},
		{
			link: [`라울과 자넷 책 이벤트`, `ScarletBook5`],
			widgets: [],
		},
		{
			link: [`올리브 책 이벤트`, `Olive Book 1`],
			widgets: [],
		},
		{
			text_only: `\n배드 엔딩`,
		},
		{
			link: [`지하 창관`, `Underground Intro`],
			widgets: [`<<generate1>>`, `<<generate2>>`, `<<generate3>>`, `<<person1>>`, `<<badEndTracking "Underground Dungeon" { reason: "soldBailey" }>>`],
		},
		{
			link: [`지하 농장`, `Livestock Intro`],
			widgets: [`<<endevent>>`, `<<leash 21>>`, `<<badEndTracking "Underground Farm" { reason: "abductedMoor" }>>`],
		},
		{
			link: [`교도소`, `Police Cell`],
			widgets: [`<<set $stat_police.pillory += 1>>`, `<<crimeUp 7000 "prostitution" "debug">>`],
		},
		{
			link: [`정신병원`, `Asylum Intro`],
			widgets: [
				`<<endevent>>`,
				`<<trauma 5000>>`,
				`<<controlloss>>`,
				`<<controlloss>>`,
				`<<controlloss>>`,
				`<<controlloss>>`,
				`<<ginsecurity "penis_small">>`,
				`<<badEndTracking "Asylum" { reason: "asylumHospital" }>>`,
				`<<pass 120>>`,
			],
		},
		{
			link: [`에덴에게 붙잡힘`, `Forest Hunter Intro`],
			widgets: [`<<endcombat>>`, `<<set $location to "forest">>`, `<<badEndTracking "Eden" { reason: "edenHuntedSubmitted" }>>`],
		},
		{
			link: [`거대 매에게 붙잡힘`, `Moor`],
			widgets: [`<<set $moor to 50>>`, `<<set $eventskip to 1>>`, `<<moor_hunt_start>>`, `<<set $moor_hunt to 10>>`],
		},
/* ========= 번역 필요 ========= */
		{
			text_only: `\n\nFishing Minigame: `,
		},
		{
			link: [`Fish: Haddock (runner)`, fishingMinigameDebugPassage],
			widgets: [`<<fishingMinigameDebugTeleportWidget "haddock">>`],
		},
		{
			link: [`Fish: Salmon (panicked)`, fishingMinigameDebugPassage],
			widgets: [`<<fishingMinigameDebugTeleportWidget "salmon">>`],
		},
		{
			link: [`Fish: Trout (darter)`, fishingMinigameDebugPassage],
			widgets: [`<<fishingMinigameDebugTeleportWidget "trout">>`],
		},
		{
			link: [`Fish: Herring (panicked)`, fishingMinigameDebugPassage],
			widgets: [`<<fishingMinigameDebugTeleportWidget "herring">>`],
		},
		{
			link: [`Fish: Whiting (runner)`, fishingMinigameDebugPassage],
			widgets: [`<<fishingMinigameDebugTeleportWidget "whiting">>`],
		},
		{
			link: [`Fish: Mackerel (panicked)`, fishingMinigameDebugPassage],
			widgets: [`<<fishingMinigameDebugTeleportWidget "mackerel">>`],
		},
		{
			link: [`Fish: Flounder (runner)`, fishingMinigameDebugPassage],
			widgets: [`<<fishingMinigameDebugTeleportWidget "flounder">>`],
		},
		{
			link: [`Fish: Bass (darter)`, fishingMinigameDebugPassage],
			widgets: [`<<fishingMinigameDebugTeleportWidget "bass">>`],
		},
		{
			link: [`Fish:  Roach (darter)`, fishingMinigameDebugPassage],
			widgets: [`<<fishingMinigameDebugTeleportWidget "roach">>`],
		},
		{
			link: [`Fish: Perch (panicked)`, fishingMinigameDebugPassage],
			widgets: [`<<fishingMinigameDebugTeleportWidget "perch">>`],
		},
		{
			link: [`Fish: Chub (runner)`, fishingMinigameDebugPassage],
			widgets: [`<<fishingMinigameDebugTeleportWidget "chub">>`],
		},
		{
			link: [`Fish: Grayling (darter)`, fishingMinigameDebugPassage],
			widgets: [`<<fishingMinigameDebugTeleportWidget "grayling">>`],
		},
		{
			link: [`Fish: Cod (anchor)`, fishingMinigameDebugPassage],
			widgets: [`<<fishingMinigameDebugTeleportWidget "cod">>`],
		},
		{
			link: [`Fish: Pike (thrasher)`, fishingMinigameDebugPassage],
			widgets: [`<<fishingMinigameDebugTeleportWidget "pike">>`],
		},
		{
			link: [`Fish: Eel (slipper)`, fishingMinigameDebugPassage],
			widgets: [`<<fishingMinigameDebugTeleportWidget "eel">>`],
		},
/* ========================= */
	],
	Character: [
		{
			link: [`기본 매력`, stayOnPassageFn],
			widgets: [`<<set $alluretest to 0>>`],
			condition() {
				return V.alluretest >= 1;
			},
		},
		{
			link: [`매력적으로 만들기`, stayOnPassageFn],
			widgets: [`<<set $alluretest to 1>>`],
			condition() {
				return V.alluretest < 1;
			},
		},
		{
			link: [`매력 없게 만들기`, stayOnPassageFn],
			widgets: [`<<set $alluretest to 2>>`],
			condition() {
				return V.alluretest < 1;
			},
		},
		{
			link: [`숨기기`, stayOnPassageFn],
			widgets: [`<<dontHideRevert>>`],
			condition() {
				return V.dontHide;
			},
		},
		{
			link: [`숨기지 않기`, stayOnPassageFn],
			widgets: [`<<dontHideForNow>>`],
			condition() {
				return !V.dontHide;
			},
		},
		{
			text_only: "\n\n",
		},
		{
			link: [`모든 명성 증가`, stayOnPassageFn],
			widgets: [
				`<<fameexhibitionism 1000 "none" true>>`,
				`<<fameprostitution 1000 "none" true>>`,
				`<<famebestiality 1000 "none" true>>`,
				`<<famerape 1000 "none" true>>`,
				`<<famesex 1000 "none" true>>`,
				`<<famepregnancy 1000 "none" true>>`,
				`<<famegood 1000 "none" true>>`,
				`<<famebusiness 1000 "none" true>>`,
				`<<famepimp 1000 "none" true>>`,
				`<<famescrap 1000 "none" true>>`,
				`<<famesocial 1000 "none" true>>`,
				`<<famemodel 1000 "none" true>>`,
			],
		},
		{
			link: [`섹스 명성 증가`, stayOnPassageFn],
			widgets: [`<<famesex 2000 "none" true>>`],
		},
		{
			link: [`타이머 감소`, stayOnPassageFn],
			widgets: [`<<set $timer -= 60>>`],
		},
		{
			link: [`음란 계열 전체`, stayOnPassageFn],
			widgets: [`<<set $promiscuity += 100>>`, `<<set $exhibitionism += 100>>`, `<<set $deviancy += 100>>`],
		},
		{
			link: [`노출증`, stayOnPassageFn],
			widgets: [`<<set $exhibitionism += 20>>`],
		},
		{
			link: [`음란`, stayOnPassageFn],
			widgets: [`<<set $promiscuity += 20>>`],
		},
		{
			link: [`이상성욕`, stayOnPassageFn],
			widgets: [`<<set $deviancy += 20>>`],
		},
		{
			link: [`미모`, stayOnPassageFn],
			widgets: [`<<set $beauty += 10000>>`],
		},
		{
			link: [`체격`, stayOnPassageFn],
			widgets: [`<<set $physique += 2000>>`],
		},
		{
			link: [`성지식 증가`, stayOnPassageFn],
			widgets: [`<<set $awareness += 200>>`],
		},
		{
			link: [`성지식 감소`, stayOnPassageFn],
			widgets: [`<<set $awareness -= 200>>`],
		},
		{
			link: [`순결함 증가`, stayOnPassageFn],
			widgets: [`<<set $purity += 500>>`],
		},
		{
			link: [`순결함 감소`, stayOnPassageFn],
			widgets: [`<<set $purity -= 500>>`],
		},
		{
			text_only: "\n\n",
		},
		{
			link: [`고통 증가`, stayOnPassageFn],
			widgets: [`<<set $pain += 50>>`],
		},
		{
			link: [`고통 감소`, stayOnPassageFn],
			widgets: [`<<set $pain -= 50>>`],
		},
		{
			link: [`스트레스 증가`, stayOnPassageFn],
			widgets: [`<<set $stress += 5000>>`],
		},
		{
			link: [`스트레스 감소`, stayOnPassageFn],
			widgets: [`<<set $stress -= 5000>>`],
		},
		{
			link: [`트라우마 대폭 증가`, stayOnPassageFn],
			widgets: [`<<set $trauma += 2000>>`],
		},
		{
			link: [`트라우마 대폭 감소`, stayOnPassageFn],
			widgets: [`<<set $trauma -= 2000>>`],
		},
		{
			link: [`흥분 최대`, stayOnPassageFn],
			widgets: [`<<arousal $arousalmax>>`],
		},
		{
			link: [`흥분 0`, stayOnPassageFn],
			widgets: [`<<arousal 0>>`],
		},
		{
			link: [`술`, stayOnPassageFn],
			widgets: [`<<drunk 60>>`],
		},
		{
			link: [`약물 상태`, stayOnPassageFn],
			widgets: [`<<set $drugged += 600>>`],
		},
		{
			link: [`환각제`, stayOnPassageFn],
			widgets: [`<<set $hallucinogen += 600>>`],
		},
		{
			text_only: "\n\n",
		},
		{
			link: [`씻기`, stayOnPassageFn],
			widgets: [`<<wash>>`],
		},
		{
			text_only: "\n\n",
		},
		{
			link: [`유혹 증가`, stayOnPassageFn],
			widgets: [`<<set $seductionskill += 200>>`],
		},
		{
			link: [`속임수 증가`, stayOnPassageFn],
			widgets: [`<<set $skulduggery += 200>>`],
		},
		{
			link: [`수영 스킬 증가`, stayOnPassageFn],
			widgets: [`<<set $swimmingskill += 100>>`],
		},
		{
			text_only: "\n\n",
		},
		{
			link: [`범죄도 증가`, stayOnPassageFn],
			widgets: [`<<crimeUp 500 "thievery">>`],
		},
		{
			link: [`범죄도 감소`, stayOnPassageFn],
			widgets: [`<<crimeDown 500>>`],
		},
		{
			text_only: "\n\n",
		},
		{
			link: [`NPC[0]의 손 초기화`, stayOnPassageFn],
			widgets: [`<<set $NPCList[0].lefthand to 0>>`, `<<set $NPCList[0].righthand to 0>>`],
		},
		{
			text_only: "\n\n",
		},
		{
			link: [`정조대`, stayOnPassageFn],
			widgets: [`<<genitalswear 1>>`],
		},
		{
			link: [`정조 케이지`, stayOnPassageFn],
			widgets: [`<<genitalswear 2>>`],
		},
		{
			link: [`목걸이`, stayOnPassageFn],
			widgets: [`<<leash 21>>`],
		},
		{
			link: [`묶기`, stayOnPassageFn],
			widgets: [`<<set $leftarm to "bound">>`, `<<set $rightarm to "bound">>`],
		},
		{
			link: [`묶기 해제`, stayOnPassageFn],
			widgets: [`<<unbind>>`],
		},
		{
			text_only: "\n\n",
		},
		{
			link: [`가슴 확대`, stayOnPassageFn],
			widgets: [`<<set $player.breastsize += 1>>`],
		},
		{
			link: [`가슴 축소`, stayOnPassageFn],
			widgets: [`<<set $player.breastsize -= 1>>`],
		},
		{
			link: [`엉덩이 확대`, stayOnPassageFn],
			widgets: [`<<set $player.bottomsize += 1>>`],
		},
		{
			link: [`엉덩이 축소`, stayOnPassageFn],
			widgets: [`<<set $player.bottomsize -= 1>>`],
		},
		{
			link: [`자지 확대`, stayOnPassageFn],
			widgets: [`<<set $player.penissize += 1>>`],
		},
		{
			link: [`자지 축소`, stayOnPassageFn],
			widgets: [`<<set $player.penissize -= 1>>`],
		},
		{
			link: [`고환 확대`, stayOnPassageFn],
			widgets: [`<<set $ballssize += 1>>`],
		},
		{
			link: [`고환 축소`, stayOnPassageFn],
			widgets: [`<<set $ballssize -= 1>>`],
		},
		{
			text_only: "\n\n",
		},
		{
			link: [`돈`, stayOnPassageFn],
			widgets: [`<<money 500000 "debug">>`],
		},
		{
			link: [`머리카락 기르기`, stayOnPassageFn],
			widgets: [`<<set $hairlength += 100>>`],
		},
		{
			link: [`앞머리 기르기`, stayOnPassageFn],
			widgets: [`<<set $fringelength += 100>>`],
		},
		{
			link: [`가슴 기생충`, stayOnPassageFn],
			widgets: [`<<parasite nipples urchin>>`],
		},
		{
			link: [`자지 기생충`, stayOnPassageFn],
			widgets: [`<<parasite penis urchin>>`],
		},
		{
			link: [`정조 기생충`, stayOnPassageFn],
			widgets: [`<<set $analchastityparasite to "worms">>`],
		},
		{
			link: [`달`, stayOnPassageFn],
			widgets: [`<<run Time.timeTravel(new DateTime(Time.date).addMonths(1))>>`],
		},
		{
			text_only: "\n\n",
		},
		{
			link: [`비행도`, stayOnPassageFn],
			widgets: [`<<set $delinquency += 1000>>`],
		},
		{
			link: [`방과 후 벌`, stayOnPassageFn],
			widgets: [`<<set $detention += 10>>`],
		},
		{
			link: [`학교 스킬`, stayOnPassageFn],
			widgets: [
				`<<set $school += 8000>>`,
				`<<set $science += 800>>`,
				`<<set $maths += 800>>`,
				`<<set $english += 800>>`,
				`<<set $history += 800>>`,
				`<<set $sciencetrait to 4>>`,
				`<<set $mathstrait to 4>>`,
				`<<set $englishtrait to 4>>`,
				`<<set $historytrait to 4>>`,
			],
		},
		{
			link: [`학교 시험 스킬`, stayOnPassageFn],
			widgets: [`<<set $science_exam += 1000>>`, `<<set $maths_exam += 1000>>`, `<<set $english_exam += 1000>>`, `<<set $history_exam += 1000>>`],
		},
		{
			link: [`모든 스킬`, stayOnPassageFn],
			widgets: [
				`<<set $school += 448>>`,
				`<<set $science += 112>>`,
				`<<set $maths += 112>>`,
				`<<set $english += 112>>`,
				`<<set $history += 112>>`,
				`<<set $skulduggery += 112>>`,
				`<<set $danceskill += 112>>`,
				`<<set $swimmingskill += 112>>`,
				`<<set $bottomskill += 112>>`,
				`<<set $seductionskill += 112>>`,
				`<<set $handskill += 112>>`,
				`<<set $feetskill += 112>>`,
				`<<set $chestskill += 112>>`,
				`<<set $thighskill += 112>>`,
				`<<set $oralskill += 112>>`,
				`<<set $analskill += 112>>`,
				`<<set $vaginalskill += 112>>`,
				`<<set $penileskill += 112>>`,
			],
		},
		{
			link: [`모든 스킬 최고치`, stayOnPassageFn],
			widgets: [
				`<<set $school += 4000>>`,
				`<<set $science += 1000>>`,
				`<<set $maths += 1000>>`,
				`<<set $english += 1000>>`,
				`<<set $history += 1000>>`,
				`<<set $sciencetrait to 4>>`,
				`<<set $mathstrait to 4>>`,
				`<<set $englishtrait to 4>>`,
				`<<set $historytrait to 4>>`,
				`<<set $skulduggery += 1000>>`,
				`<<set $danceskill += 1000>>`,
				`<<set $swimmingskill += 1000>>`,
				`<<set $bottomskill += 1000>>`,
				`<<set $seductionskill += 1000>>`,
				`<<set $handskill += 1000>>`,
				`<<set $feetskill += 1000>>`,
				`<<set $chestskill += 1000>>`,
				`<<set $thighskill += 1000>>`,
				`<<set $oralskill += 1000>>`,
				`<<set $analskill += 1000>>`,
				`<<set $vaginalskill += 1000>>`,
				`<<set $penileskill += 1000>>`,
			],
		},
		{
			link: [`학교 평판 증가`, stayOnPassageFn],
			widgets: [`<<set $cool += 400>>`],
		},
		{
			link: [`학교 평판 감소`, stayOnPassageFn],
			widgets: [`<<set $cool -= 400>>`],
		},
		{
			text_only: "\n\n",
		},
		{
			link: [`수영복 파괴`, stayOnPassageFn],
			widgets: [`<<set $upperschoolswimsuitno to 0>>`, `<<set $lowerschoolswimsuitno to 0>>`, `<<set $schoolswimshortsno to 0>>`],
		},
		{
			link: [`수건`, stayOnPassageFn],
			widgets: [`<<clothesontowel>>`],
		},
		{
			link: [`수건 받기`, stayOnPassageFn],
			widgets: [`<<towelup>>`],
		},
		{
			link: [`순종`, stayOnPassageFn],
			widgets: [`<<set $submissive += 250>>`],
		},
		{
			link: [`반항심`, stayOnPassageFn],
			widgets: [`<<set $submissive -= 250>>`],
		},
		{
			text_only: "\n\n",
		},
		{
			link: [`로빈 애정`, stayOnPassageFn],
			widgets: [`<<npcincr Robin love 100>>`, `<<npcincr Robin lust 100>>`],
		},
		{
			link: [`로빈 쪽지`, stayOnPassageFn],
			widgets: [`<<set $robinnote to 1>>`],
		},
		{
			link: [`로빈 로맨스`, stayOnPassageFn],
			widgets: [`<<set $robinromance to 1>>`],
		},
		{
			text_only: "\n\n",
		},
		{
			link: [`성적 통계 증가`, stayOnPassageFn],
			widgets: [
				`<<set $orgasmstat += 2000>>`,
				`<<set $ejacstat += 2000>>`,
				`<<set $moleststat += 2000>>`,
				`<<set $rapestat += 1000>>`,
				`<<set $beastrapestat += 500>>`,
				`<<set $tentaclerapestat += 200>>`,
				`<<set $swallowedstat += 100>>`,
				`<<set $prostitutionstat += 10>>`,
			],
		},
		{
			text_only: "\n\n",
		},
		{
			link: [`하의 거의 파괴`, stayOnPassageFn],
			widgets: [`<<set $worn.lower.integrity to 1>>`],
		},
		{
			link: [`상의 거의 파괴`, stayOnPassageFn],
			widgets: [`<<set $worn.upper.integrity to 1>>`],
		},
		{
			link: [`하의 속옷 거의 파괴`, stayOnPassageFn],
			widgets: [`<<set $worn.under_lower.integrity to 1>>`],
		},
		{
			link: [`상의 속옷 거의 파괴`, stayOnPassageFn],
			widgets: [`<<set $worn.under_upper.integrity to 1>>`],
		},
		{
			link: [`하의 손상`, stayOnPassageFn],
			widgets: [`<<set $worn.lower.integrity -= 200>>`],
		},
		{
			link: [`상의 손상`, stayOnPassageFn],
			widgets: [`<<set $worn.upper.integrity -= 200>>`],
		},
		{
			link: [`상의 속옷 손상`, stayOnPassageFn],
			widgets: [`<<set $worn.under_upper.integrity -= 200>>`],
		},
		{
			link: [`하의 속옷 손상`, stayOnPassageFn],
			widgets: [`<<set $worn.under_lower.integrity -= 200>>`],
		},
		{
			link: [`정조대 손상`, stayOnPassageFn],
			widgets: [`<<set $worn.genitals.integrity -= 5000>>`],
		},
		{
			text_only: "\n\n",
		},
		{
			link: [`고양이 변이 증가`, stayOnPassageFn],
			widgets: [`<<set $cat += 1>>`],
		},
		{
			link: [`고양이 변이 최대`, stayOnPassageFn],
			widgets: [`<<set $catbuild += 80>>`],
		},
		{
			link: [`고양이 변이 끄기`, stayOnPassageFn],
			widgets: [`<<set $cat = 0>>`],
		},
		{
			link: [`늑대 변이 끄기`, stayOnPassageFn],
			widgets: [`<<set $wolfgirl to 0>>`],
		},
		{
			link: [`늑대 변이 증가`, stayOnPassageFn],
			widgets: [`<<set $wolfgirl += 1>>`],
		},
		{
			link: [`늑대 변이 최대`, stayOnPassageFn],
			widgets: [`<<set $wolfbuild += 40>>`],
		},
		{
			link: [`늑대 변이 감소`, stayOnPassageFn],
			widgets: [`<<set $wolfbuild -= 40>>`],
		},
		{
			link: [`여우 변이 이벤트`, stayOnPassageFn],
			widgets: [`<<set $fox to 0>>`],
		},
		{
			link: [`여우 변이 적용`, stayOnPassageFn],
			widgets: [`<<set $fox += 1>>`],
		},
		{
			link: [`여우 변이 증가`, stayOnPassageFn],
			widgets: [`<<set $foxbuild += 40>>`],
		},
		{
			link: [`여우 변이 감소`, stayOnPassageFn],
			widgets: [`<<set $foxbuild -= 40>>`],
		},
		{
			link: [`소 변이 증가`, stayOnPassageFn],
			widgets: [`<<set $cowbuild += 40>>`],
		},
		{
			link: [`소 변이 감소`, stayOnPassageFn],
			widgets: [`<<set $cowbuild -= 40>>`],
		},
		{
			link: [`천사 변이 증가`, stayOnPassageFn],
			widgets: [`<<set $angelbuild += 40>>`],
		},
		{
			link: [`천사 변이 감소`, stayOnPassageFn],
			widgets: [`<<set $angelbuild -= 40>>`],
		},
		{
			link: [`악마 변이 증가`, stayOnPassageFn],
			widgets: [`<<set $demonbuild += 40>>`],
		},
		{
			link: [`악마 변이 감소`, stayOnPassageFn],
			widgets: [`<<set $demonbuild -= 40>>`],
		},
		{
			link: [`저체온 끄기`, stayOnPassageFn],
			widgets: [`<<set $undertemp to 0>>`],
		},
		{
			link: [`끈적임 묻히기`, stayOnPassageFn],
			widgets: [`<<drench "semen" "slime" 5>>`],
		},
		{
			link: [`끈적임 조금 묻히기`, stayOnPassageFn],
			widgets: [`<<drench "semen" "slime" 1>>`],
		},
		{
			link: [`흠뻑 적시기`, stayOnPassageFn],
			widgets: [`<<upperwet 200>>`, `<<lowerwet 200>>`, `<<underupperwet 200>>`, `<<underlowerwet 200>>`],
		},
		{
			link: [`겉옷만 흠뻑 적시기`, stayOnPassageFn],
			widgets: [`<<set $overupperwet to 200>>`, `<<set $overlowerwet to 200>>`],
		},
		{
			link: [`중간 의상만 흠뻑 적시기`, stayOnPassageFn],
			widgets: [`<<upperwet 200>>`, `<<lowerwet 200>>`],
		},
		{
			link: [`속옷만 흠뻑 적시기`, stayOnPassageFn],
			widgets: [`<<underupperwet 200>>`, `<<underlowerwet 200>>`],
		},
		{
			link: [`물에 적시기`, stayOnPassageFn],
			widgets: [`<<water>>`],
		},
		{
			link: [`괴롭힘 타이머`, stayOnPassageFn],
			widgets: [`<<set $bullytimer to 100>>`, `<<set $bullytimeroutside to 100>>`],
		},
		{
			link: [`휘트니 지배도 낮추기`, stayOnPassageFn],
			widgets: [`<<npcincr Whitney dom -20>>`],
		},
		{
			link: [`휘트니 지배도 높이기`, stayOnPassageFn],
			widgets: [`<<npcincr Whitney dom 20>>`],
		},
		{
			link: [`휘트니 애정`, stayOnPassageFn],
			widgets: [`<<npcincr Whitney love 20>>`, `<<npcincr Whitney lust 20>>`],
		},
		{
			link: [`휘트니 로맨스`, stayOnPassageFn],
			widgets: [`<<set $whitneyromance to 1>>`, `<<set $whitney_home_timer to 0>>`],
		},
		{
			link: [`술집 창부`, stayOnPassageFn],
			widgets: [`<<set $pubwhore += 10>>`],
		},
		{
			link: [`생물로 만들기`, stayOnPassageFn],
			widgets: [`<<beasttype bear>>`],
		},
		{
			link: [`완전 분사`, stayOnPassageFn],
			widgets: [`<<set $spraymax to 5>>`, `<<spray 5>>`],
		},
		{
			text_only: "\n\n",
		},
		{
			link: [`모든 씨앗 해금`, stayOnPassageFn],
			widgets: [`<<run unlockAllSeeds()>>`],
/* ========= 번역 필요 ========= */
		},
		{
			link: [`Complete fishing journal`, stayOnPassageFn],
			widgets: [`<<run debugDiscoverAllFishing()>>`],
/* ========================= */
		},
		{
			link: [`슈퍼 디버그 캐릭터`, stayOnPassageFn],
			widgets: [
				`<<set $school += 4000>>`,
				`<<set $science += 1000>>`,
				`<<set $maths += 1000>>`,
				`<<set $english += 1000>>`,
				`<<set $history += 1000>>`,
				`<<set $sciencetrait to 4>>`,
				`<<set $mathstrait to 4>>`,
				`<<set $englishtrait to 4>>`,
				`<<set $historytrait to 4>>`,
				`<<set $skulduggery += 1000>>`,
				`<<set $danceskill += 1000>>`,
				`<<set $swimmingskill += 1000>>`,
				`<<set $bottomskill += 1000>>`,
				`<<set $seductionskill += 1000>>`,
				`<<set $handskill += 1000>>`,
				`<<set $feetskill += 1000>>`,
				`<<set $chestskill += 1000>>`,
				`<<set $thighskill += 1000>>`,
				`<<set $oralskill += 1000>>`,
				`<<set $analskill += 1000>>`,
				`<<set $vaginalskill += 1000>>`,
				`<<set $penileskill += 1000>>`,
				`<<set $promiscuity += 100>>`,
				`<<set $exhibitionism += 100>>`,
				`<<set $deviancy += 100>>`,
				`<<set $awareness to 1000>>`,
				`<<set $willpower to 1000>>`,
				`<<set $physique to 12000>>`,
				`<<set $orgasmtrait to 1>>`,
				`<<set $ejactrait to 1>>`,
				`<<set $molesttrait to 1>>`,
				`<<set $rapetrait to 1>>`,
				`<<set $bestialitytrait to 1>>`,
				`<<set $tentacletrait to 1>>`,
				`<<set $choketrait to 1>>`,
			],
		},
		{
			link: [`모든 알약 해금`, stayOnPassageFn],
			widgets: [`<<run window.getAllPills()>>`],
		},
	],
	Favourites: [],
};

function returnEventList() {
	return setup.debugMenu.eventList;
}
window.returnEventList = returnEventList;

function getNameAndPassage(section, index) {
	if (typeof setup.debugMenu.eventList[section][index].link[0] === "function") T.link_name = setup.debugMenu.eventList[section][index].link[0]();
	else T.link_name = setup.debugMenu.eventList[section][index].link[0];
	if (typeof setup.debugMenu.eventList[section][index].link[1] === "function") T.link_passage = setup.debugMenu.eventList[section][index].link[1]();
	else T.link_passage = setup.debugMenu.eventList[section][index].link[1];
}
window.getNameAndPassage = getNameAndPassage;

function runWidgetsInsideLink(section, index) {
	let widget = 0;
	for (widget in setup.debugMenu.eventList[section][index].widgets)
		Wikifier.wikifyEval(
			typeof setup.debugMenu.eventList[section][index].widgets[widget] === "function"
				? setup.debugMenu.eventList[section][index].widgets[widget]()
				: setup.debugMenu.eventList[section][index].widgets[widget]
		);
}
window.runWidgetsInsideLink = runWidgetsInsideLink;

function changeBorderColor() {
	const inputVal = document.getElementById("formChangeColor");
	$(inputVal).toggleClass("searchBorderColour");
}
window.changeBorderColor = changeBorderColor;

// const categories = ["debugEventsMain", "debugEventsCharacter", "debugEventsEvents"];
const categories2 = ["debugMain", "debugCharacter", "debugEvents", "debugFavourites", "debugAdd"];

function researchEvents(defaultValue, event) {
	$(function () {
		if (event != null) event.preventDefault();
		let needle = defaultValue != null ? defaultValue : document.getElementById("searchEvents").value;
		const eventsList = [
			document.getElementById("debugEventsMain").getElementsByTagName("div"),
			document.getElementById("debugEventsMain").getElementsByTagName("br"),
			document.getElementById("debugEventsCharacter").getElementsByTagName("div"),
			document.getElementById("debugEventsCharacter").getElementsByTagName("br"),
			document.getElementById("debugEventsEvents").getElementsByTagName("div"),
			document.getElementById("debugEventsEvents").getElementsByTagName("br"),
		];

		if (defaultValue != null) document.getElementById("searchEvents").value = defaultValue;
		needle = needle.toLowerCase();
		for (let i1 = 0; i1 < eventsList.length; i1++) {
			for (let i2 = 0; i2 < eventsList[i1].length; i2++) {
				let haystack = eventsList[i1][i2].getAttribute("name");

				if (haystack != null) {
					haystack = haystack.toLowerCase();
					if (!haystack.includes(needle)) eventsList[i1][i2].style.display = "none";
					else eventsList[i1][i2].style.display = "";
				}
			}
		}
		if (needle != null && needle.length > 0) {
			document.getElementById("debugMain").classList.remove("hidden");
			document.getElementById("debugCharacter").classList.remove("hidden");
			document.getElementById("debugEvents").classList.remove("hidden");
			document.getElementById("debugFavourites").classList.add("hidden");
			document.getElementById("debugAdd").classList.add("hidden");
		} else if (V.debugMenu[2] != null && V.debugMenu[2].length > 0 && needle.length === 0) {
			for (const divToHide of categories2) {
				if (divToHide !== V.debugMenu[1]) document.getElementById(divToHide).classList.add("hidden");
				else document.getElementById(divToHide).classList.remove("hidden");
			}
		}
		if ((V.debugMenu[1] === "debugAdd" || V.debugMenu[1] === "debugFavourites") && (needle === "" || needle == null)) {
			document.getElementById(V.debugMenu[1]).classList.remove("hidden");
		}
		V.debugMenu[2] = needle;
		window.toggleClassDebug(V.debugMenu[1] + "Button", "bg-color");
		window.cacheDebugDiv();
	});
}
window.researchEvents = researchEvents;

function addFavouriteIcon(section, index, id) {
	$(function () {
		if (V.debug_favourite == null) {
			V.debug_favourite = [];
		}
		window.syncFavourites();
		const input = document.createElement("input");
		const parent = document.getElementById(id);

		input.type = "image";
		input.className = "heart";
		input.src = "img/ui/heart-favourite.png";
		for (let i = 0; i < V.debug_favourite.length; i++) {
			if (V.debug_favourite[i].link[0] === setup.debugMenu.eventList[section][index].link[0]) input.classList.toggle("liked"); // on load up if already favourite set heart red
		}
		input.setAttribute("onclick", "window.onClickFavourite('" + section + "'," + index + ",'" + id + "');");
		if (parent != null) parent.appendChild(input);
	});
}
window.addFavouriteIcon = addFavouriteIcon;

function onClickFavourite(section, index, id) {
	$(function () {
		window.syncFavourites();
		const elementClicked = document.getElementById(id).children[1];
		if (elementClicked.classList.contains("liked")) {
			for (let i = 0; i < V.debug_favourite.length; i++) {
				if (V.debug_favourite[i].link[0] === setup.debugMenu.eventList[section][index].link[0]) V.debug_favourite.splice(i, 1); // remove from favourites
			}
			setup.debugMenu.eventList.Favourites = V.debug_favourite; // sync constant to ephemere variable
			elementClicked.classList.toggle("liked"); // removes favourites css
		} else {
			const favObject = {
				link: setup.debugMenu.eventList[section][index].link,
				widgets: setup.debugMenu.eventList[section][index].widgets,
				condition: setup.debugMenu.eventList[section][index].condition != null ? setup.debugMenu.eventList[section][index].condition : 1,
			};
			V.debug_favourite.push(favObject); // constant variable
			setup.debugMenu.eventList.Favourites = V.debug_favourite;
			elementClicked.classList.toggle("liked"); // add favourites
		}
		if (section === "Favourites") {
			const toSearch = document.getElementById("Favourites-" + index).children[0].text;
			let breakSignal = 0;
			for (const cat of ["debugEventsEvents", "debugEventsMain", "debugEventsCharacter"]) {
				const divSearch = document.getElementById(cat).children;
				for (const div of divSearch) {
					if (div.getAttribute("name") === toSearch) {
						div.children[1].classList.remove("liked");
						breakSignal = 1;
						break;
					}
				}
				if (breakSignal) break;
			}
		}
		Wikifier.wikifyEval(`<<debugFavourites "replace">>`);
	});
	window.cacheDebugDiv();
}
window.onClickFavourite = onClickFavourite;

function syncFavourites() {
	setup.debugMenu.eventList.Favourites = V.debug_favourite;
}
window.syncFavourites = syncFavourites;

function cacheDebugDiv() {
	$(() => {
		const overlay = document.getElementById("debugOverlay");
		if (overlay instanceof HTMLElement) {
			const div = overlay.outerHTML;
			setup.debugMenu.cacheDebugDiv.debugOverlay = div;
		}
	});
}
window.cacheDebugDiv = cacheDebugDiv;

function loadCachedDebugDiv() {
	if (typeof setup.debugMenu.cacheDebugDiv.debugOverlay !== "undefined") {
		document.getElementById("debugOverlay").outerHTML = setup.debugMenu.cacheDebugDiv.debugOverlay;
	}
	window.patchDebugMenu();
}
window.loadCachedDebugDiv = loadCachedDebugDiv;

function debugCreateLinkAndRedirect(section, index, id) {
	$(function () {
		const target = document.getElementById(id).children[0];
		if (typeof $._data($(target).get(0), "events") === "undefined" || $._data($(target).get(0), "events").length === 0) {
			const passageTitle =
				typeof setup.debugMenu.eventList[section][index].link[0] === "function"
					? setup.debugMenu.eventList[section][index].link[0]()
					: setup.debugMenu.eventList[section][index].link[0];
			const passageName =
				typeof setup.debugMenu.eventList[section][index].link[1] === "function"
					? setup.debugMenu.eventList[section][index].link[1]()
					: setup.debugMenu.eventList[section][index].link[1];
			let widgets = "";

			for (const widget of setup.debugMenu.eventList[section][index].widgets) widgets += typeof widget === "function" ? widget() : widget;
			const newLink = new Wikifier(
				null,
				`<<link ${passageName ? "[[" + passageTitle + "|" + passageName + "]]" : '"' + passageTitle + '"'}>>${widgets}<</link>>`
			);
			newLink.output.children[0].click();
		}
	});
}
window.debugCreateLinkAndRedirect = debugCreateLinkAndRedirect;

function addonClickDivPassage(section, index, id) {
	$(function () {
		const target = document.getElementById(id).children[0];
		target.setAttribute(
			"onclick",
			"window.debugCreateLinkAndRedirect(" + "'" + section + "'" + "," + index + "," + "'" + section + "-" + index + "'" + ");"
		);
	});
}
window.addonClickDivPassage = addonClickDivPassage;

function toggleClassDebug(selected, mode) {
	$(function () {
		if (document.getElementById(selected) == null) return;
		const list = ["debugMain", "debugCharacter", "debugEvents", "debugFavourites", "debugAdd"];
		if (mode === "bg-color") {
			for (const div of list) {
				if (div + "Button" === selected) document.getElementById(selected).classList.add("bg-color-debug-selected");
				else document.getElementById(div + "Button").classList.remove("bg-color-debug-selected");
			}
		} else if (mode === "hideWhileSearching") {
			if (selected === "debugFavourites" || selected === "debugAdd") {
				for (const div of list)
					div !== "debugFavourites" || div !== "debugAdd"
						? document.getElementById(div).classList.add("hidden")
						: document.getElementById(div).classList.remove("hidden");
			} else {
				for (const div of list)
					div === "debugFavourites" || div === "debugAdd"
						? document.getElementById(div).classList.add("hidden")
						: document.getElementById(div).classList.remove("hidden");
			}
		} else if (mode === "classicHide") {
			for (const div of list)
				div !== selected ? document.getElementById(div).classList.add("hidden") : document.getElementById(div).classList.remove("hidden");
		}
	});
}
window.toggleClassDebug = toggleClassDebug;

function patchDebugMenu() {
	const catg = ["debugEventsMain", "debugEventsCharacter", "debugEventsEvents", "debugEventsFavourites"];
	let breakIfAllGood;

	for (const cat of catg) {
		let haystack = document.getElementById(cat);
		if (haystack == null) return;
		else haystack = haystack.children;
		for (let i = 0; i < haystack.length; i++) {
			const value = haystack[i].id;

			breakIfAllGood = 0;
			if (haystack[i].children.length < 1) break;
			if (haystack[i].children.length < 2) window.addFavouriteIcon(value.split("-")[0], value.split("-")[1], value);
			else breakIfAllGood += 1;
			if (haystack[i].children[0].getAttribute("onclick") == null)
				haystack[i].children[0].setAttribute(
					"onclick",
					"window.debugCreateLinkAndRedirect('" + value.split("-")[0] + "'," + value.split("-")[1] + ",'" + value + "');"
				);
			else breakIfAllGood += 1;
			if (breakIfAllGood === 2) break;
		}
	}
	document.getElementById("MainDebugInfo").innerHTML =
		"매력: " + V.allure + "<br>RNG: " + V.rng + "<br>위험: " + V.danger + "<br>패시지: " + V.passage + "<br>";
	window.cacheDebugDiv();
}
window.patchDebugMenu = patchDebugMenu;

function checkEventCondition() {
	$(function () {
		for (const section of ["Character", "Events", "Favourites", "Main"]) {
			const ev = setup.debugMenu.eventList[section];
			for (const i in ev) {
				if (Object.hasOwn(ev[i], "condition")) {
					if ((typeof ev[i].condition === "function" && ev[i].condition()) || (typeof ev[i].condition !== "function" && ev[i].condition)) {
						if (document.getElementById(section + "-" + i) == null) return;
						document.getElementById(section + "-" + i).classList.remove("condhide");
					} else {
						if (document.getElementById(section + "-" + i) == null) return;
						document.getElementById(section + "-" + i).classList.add("condhide");
					}
				}
			}
		}
	});
}
window.checkEventCondition = checkEventCondition;

function addDebugForm() {
	$(function () {
		let op = "";
		if (V.debug_custom_events == null) V.debug_custom_events = { Main: [], Character: [], Events: [] };
		for (const section of ["Main", "Character", "Events"]) {
			for (const ev of V.debug_custom_events[section]) op += "<option value=" + '"' + ev.link[0] + '" ' + ">" + ev.link[0] + "</option>";
		}
		if (document.getElementById("debugEventsAdd") != null)
			document.getElementById("debugEventsAdd").innerHTML =
				`
		<abbr>이벤트 제목:</abbr>
		<div class="addevent-content-search-content" id="formChangeColor2" style="">
			<input name="addEvents" id="addEventsTitle" placeholder="이벤트 제목..." onfocusout="" onfocus="" oninput="" />
		</div>
		<abbr title="동적 할당이 필요하면 저장할 함수를 입력할 수 있습니다.\n예: stayOnPassageFn">패시지 이름*:</abbr>
		<div class="addevent-content-search-content" id="formChangeColor3" style="">
			<input name="addEvents" id="addEventsPassage" placeholder="패시지 이름..." onfocusout="" onfocus="" oninput="" />
		</div>
		<span>위젯:</span>
		<div class="addevent-content-search-content" style="max-height:unset;" id="formChangeColor4" style="">
			<input name="addEvents" id="addEventsWidgets" placeholder="<<set $allure = 5>><<set $rng to 3>>..." onfocusout="" onfocus="" oninput="">
		</div>
		<span>분류:</span><br>
		<select name="catlist" id="debugCatList">
			<option value="Events">이벤트</option>
			<option value="Main">메인</option>
			<option value="Character">캐릭터</option>
		</select><br><br>
		<button type="button" onclick="window.submitNewDebugPassage()">추가</button><br><br>
		<div id="debugAddResult"></div>
		<div id="debugRemovePassage">
			<h3>메뉴에서 passage 제거</h3>
			<select name="catlist" id="debugEvList">
			` +
				op +
				`</select><br><br>
			<button type="button" id="button-remove" onclick="window.removeDebugCustomPassage()">제거</button><br><br>
			<div id="debugRemoveResult"></div>
		</div>
	`;
	});
}
window.addDebugForm = addDebugForm;

function submitNewDebugPassage() {
	const inputList = [
		document.getElementById("addEventsTitle"),
		document.getElementById("addEventsPassage"),
		document.getElementById("addEventsWidgets"),
		document.getElementById("debugCatList"),
	];
	let sigerror = 0;

	for (const element of inputList) {
		if ((element.id === "addEventsTitle" || element.id === "addEventsPassage" || element.id === "debugCatList") && element.value.length < 1) {
			element.setCustomValidity("값을 입력하세요!");
			element.reportValidity();
			document.getElementById("debugAddResult").innerHTML = "";
			sigerror = 1;
		}
		if (element.id === "addEventsWidgets" && element.value.length > 0) {
			const match = element.value.match("<<.+>>{0,}");

			if (match == null || match[0] !== match.input) {
				element.setCustomValidity("위젯 형식이 잘못되었습니다. 올바른 형식: <<widget @params>>");
				element.reportValidity();
				document.getElementById("debugAddResult").innerHTML = "";
				sigerror = 1;
			}
		}
	}
	for (const section of ["Character", "Events", "Favourites", "Main"]) {
		for (const ev of setup.debugMenu.eventList[section]) {
			if (Object.hasOwn(ev, "link") && ev.link[0] === inputList[0].value) {
				inputList[0].setCustomValidity("이 이벤트 제목은 이미 있습니다. 고유한 제목이어야 합니다!");
				inputList[0].reportValidity();
				document.getElementById("debugAddResult").innerHTML = "";
				sigerror = 1;
			}
		}
	}
	if (sigerror === 0) {
		if (V.debug_custom_events == null) V.debug_custom_events = { Main: [], Character: [], Events: [] };
		const eventTitle = inputList[0].value;
		const passageName =
			inputList[1].value.match(/function{1}[ \t]{0,1}\(\)[ \t]{0,2}{.*return.*}[;]{0,1}/g) == null
				? inputList[1].value
				: eval("(" + inputList[1].value.match(/function{1}[ \t]{0,1}\(\)[ \t]{0,2}{.*return.*}[;]{0,1}/g)[0] + ")");
		const newObj = {
			link: [eventTitle, passageName],
			widgets: [inputList[2].value],
		};
		V.debug_custom_events[inputList[3].value].unshift(newObj);
		setup.debugMenu.eventList[inputList[3].value].unshift(newObj);
		document.getElementById("debugAddResult").innerHTML =
			'<span style="color: #5eac5e;">이벤트 추가됨<br>변경 사항을 적용하려면 게임 내 파란 일반 링크를 클릭하세요.<br>(새로고침 아님, 디버그 메뉴 링크 아님)</span>';
		setup.debugMenu.cacheDebugDiv = {};
	}
}
window.submitNewDebugPassage = submitNewDebugPassage;

function syncDebugAddedEvents() {
	if (V.debug_custom_events == null) V.debug_custom_events = { Main: [], Character: [], Events: [] };
	for (const section of ["Main", "Character", "Events"]) {
		if (Object.hasOwn(V.debug_custom_events, section) === false) V.debug_custom_events[section] = [];
		for (const ev of V.debug_custom_events[section]) setup.debugMenu.eventList[section].unshift(ev);
	}
}
window.syncDebugAddedEvents = syncDebugAddedEvents;

function removeDebugCustomPassage() {
	const selectedForRemoval = document.getElementById("debugEvList").value;
	let exitCode = 0;
	for (const section of ["Main", "Character", "Events"]) {
		for (const ev in V.debug_custom_events[section]) {
			if (V.debug_custom_events[section][ev].link[0] === selectedForRemoval) V.debug_custom_events[section].splice(ev, 1);
			for (const ev2 in setup.debugMenu.eventList[section]) {
				if (Object.hasOwn(setup.debugMenu.eventList[section][ev2], "link") && setup.debugMenu.eventList[section][ev2].link[0] === selectedForRemoval) {
					setup.debugMenu.eventList[section].splice(ev2, 1);
					document.getElementById("debugRemoveResult").innerHTML =
						'<span style="color: #5eac5e;">이벤트 제거됨<br>변경 사항을 적용하려면 게임 내 파란 일반 링크를 클릭하세요.<br>(새로고침 아님, 디버그 메뉴 링크 아님)</span>';
					let op = "<br>";
					for (const section of ["Main", "Character", "Events"]) {
						for (const ev of V.debug_custom_events[section]) op += "<option value=" + '"' + ev.link[0] + '" ' + ">" + ev.link[0] + "</option>";
					}
					document.getElementById("debugEvList").innerHTML = op;
					setup.debugMenu.cacheDebugDiv = {};
					exitCode = 1;
					break;
				}
			}
			if (exitCode === 1) break;
		}
		if (exitCode === 1) break;
	}
}
window.removeDebugCustomPassage = removeDebugCustomPassage;

function fishingMinigameDebugPassage() {
	switch (V.passage) {
		case "Fishing Pier Wait":
			return "Fishing Pier Minigame Loop";
		case "Fishing Beach Wait":
			return "Fishing Beach Minigame Loop";
		case "Fishing Coast Path Wait":
			return "Fishing Coast Path Minigame Loop";
		case "Fishing Forest Lake Wait":
			return "Fishing Forest Lake Minigame Loop";
		case "Fishing Moor Wait":
			return "Fishing Moor Minigame Loop";
		default:
			return "Fishing Pier Minigame Loop";
	}
}
window.fishingMinigameDebugPassage = fishingMinigameDebugPassage;
