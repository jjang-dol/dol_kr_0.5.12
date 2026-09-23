function effectsWater(waterType = "liquid") {
	const fragment = document.createDocumentFragment();

	const sWikifier = text => {
		fragment.append(Wikifier.wikifyEval(text + " "));
	};
	const span = (text, colour) => {
		const element = document.createElement("span");
		if (colour) element.classList.add(colour);
		element.textContent = text + " ";
		fragment.append(element);
	};
	const br = () => fragment.append(document.createElement("br"));

	let wetIntro = 0;
	let squidArousal = 0;
	const waterTypeText = {
		liquid: "액체",
		water: "물",
		rain: "빗물",
		sea: "바닷물",
		lake: "호수 물",snow: "눈",
		cum: "정액",
		"warm water": "따뜻한 물",
		slush: "진눈깨비",
	}[waterType] || waterType;

	switch (V.squidcount) {
		case 1:
			sWikifier('<span class="purple">오징어가 당신의 <<genitals>>【을를】 희롱한다.</span> <<garousal>><<arousal 100 "genitals">>');
			break;
		case 2:
			sWikifier(
				'<span class="purple">오징어들이 당신의 <<genitals>>【와과】 가슴을 희롱한다.</span> <<garousal>><<arousal 100 "breasts">><<arousal 100 "genitals">>'
			);
			break;
		case 3:
			sWikifier(
				'<span class="purple">오징어들이 당신의 <<genitals>>【와과】 <<breasts>>【을를】 희롱한다.</span> <<garousal>><<arousal 200 "breasts">><<arousal 100 "genitals">>'
			);
			break;
		case 4:
			sWikifier(
				'<span class="purple">오징어들이 당신의 <<genitals>>, <<breasts>>, <<bottom>>【을를】 희롱한다.</span> <<garousal>><<arousal 200 "breasts">><<arousal 100 "genitals">><<arousal 100 "bottom">>'
			);
			break;
		default:
			if (V.squidcount >= 5) {
				squidArousal = V.squidcount * 30;
				sWikifier(`<span class="purple">${V.squidcount}마리의 오징어가 당신의 <<genitals>>, <<breasts>>, <<bottom>>, 그리고 몸 이곳저곳을 집요하게 희롱한다.</span>
				<<garousal>><<arousal ${squidArousal} "breasts">><<arousal ${squidArousal} "genitals">><<arousal ${squidArousal} "bottom">>`);
			}
			break;
	}
	if (!V.worn.upper.type.includes("naked") && !waterproofCheck(V.worn.upper)) {
		if (V.upperwet >= 100 && V.upperwetstage < 3) {
			V.upperwetstage = 3;
			wetIntro = 2;
			sWikifier(`<span class="lewd">${waterTypeText}【이가】 ${V.worn.upper.name}【을를】 흠뻑 적셔 <<undertop>>【이가】 드러난다.</span>`);
		} else if (V.upperwet < 90 && V.upperwetstage >= 3) {
			V.upperwetstage = 2;
			sWikifier(`<span class="green">${V.worn.upper.name}【이가】 말라 <<undertop>>【을를】 다시 가린다.</span>`);
		} else if (V.upperwet >= 80 && V.upperwetstage < 2) {
			V.upperwetstage = 2;
			wetIntro = 1;
			sWikifier(`<span class="purple">${V.worn.upper.name}【이가】 젖었다.</span>`);
		} else if (V.upperwet < 70 && V.upperwetstage >= 2) {
			V.upperwetstage = 1;
			sWikifier(`<span class="green">${V.worn.upper.name}【이가】 마르고 있다.</span>`);
		} else if (V.upperwet >= 50 && V.upperwetstage < 1) {
			V.upperwetstage = 1;
			sWikifier(`<span class="blue">${V.worn.upper.name}【이가】 축축해졌다.</span>`);
		} else if (V.upperwet < 40 && V.upperwetstage >= 1) {
			V.upperwetstage = 0;
			sWikifier(`<span class="green">${V.worn.upper.name}【이가】 말랐다.</span>`);
		}
	}

	if (!V.worn.lower.type.includes("naked") && !waterproofCheck(V.worn.lower)) {
		if (V.lowerwet >= 100 && V.lowerwetstage < 3) {
			V.lowerwetstage = 3;
			wetIntro = 2;
			sWikifier(`<span class="lewd">${waterTypeText}【이가】 ${V.worn.lower.name}【을를】 흠뻑 적셔 <<undies>>【이가】 드러난다.</span>`);
		} else if (V.lowerwet < 90 && V.lowerwetstage >= 3) {
			V.lowerwetstage = 2;
			sWikifier(`<span class="green">${V.worn.lower.name}【이가】 말라 <<undies>>【을를】 다시 가린다.</span>`);
		} else if (V.lowerwet >= 80 && V.lowerwetstage < 2) {
			V.lowerwetstage = 2;
			wetIntro = 1;
			sWikifier(`<span class="purple">${V.worn.lower.name}【이가】 젖었다.</span>`);
		} else if (V.lowerwet < 70 && V.lowerwetstage >= 2) {
			V.lowerwetstage = 1;
			sWikifier(`<span class="green">${V.worn.lower.name}【이가】 마르고 있다.</span>`);
		} else if (V.lowerwet >= 50 && V.lowerwetstage < 1) {
			V.lowerwetstage = 1;
			sWikifier(`<span class="blue">${V.worn.lower.name}【이가】 축축해졌다.</span>`);
		} else if (V.lowerwet < 40 && V.lowerwetstage >= 1) {
			V.lowerwetstage = 0;
			sWikifier(`<span class="green">${V.worn.lower.name}【이가】 말랐다.</span>`);
		}
	}

	if (!V.worn.under_lower.type.includes("naked") && !waterproofCheck(V.worn.under_lower)) {
		if (V.underlowerwet >= 100 && V.underlowerwetstage < 3 && V.pantiesSoaked) {
			V.underlowerwetstage = 3;
			if (V.lowerwetstage === 3 || V.worn.lower.type.includes("naked")) {
				// If clothing above underwear is also wet, or missing
				wetIntro = 2;
				sWikifier(`<span class="lewd">당신의 체액이 ${V.worn.under_lower.name}【을를】 흠뻑 적셔 <<genitals>>【이가】 드러난다.</span>`);
			} else if (setup.clothes.lower[clothesIndex("lower", V.worn.lower)].skirt === 1) {
				sWikifier(
					`<span class="lewd">당신의 체액이 ${V.worn.under_lower.name}【을를】 흠뻑 적셔, $worn.lower.name 아래로 <<genitals>>【이가】 공기에 노출된다.</span>`
				);
			} else {
				span(`당신의 체액이 ${V.worn.under_lower.name}【을를】 흠뻑 적신다.`, "lewd");
			}
		} else if (V.underlowerwet >= 100 && V.underlowerwetstage < 3) {
			V.underlowerwetstage = 3;
			wetIntro = 2;
			sWikifier(`<span class="lewd">${waterTypeText}【이가】 ${V.worn.under_lower.name}【을를】 흠뻑 적셔 <<genitals>>【이가】 드러난다.</span>`);
		} else if (V.underlowerwet < 90 && V.underlowerwetstage >= 3) {
			V.underlowerwetstage = 2;
			sWikifier(`<span class="green">${V.worn.under_lower.name}【이가】 말라 <<genitals>>【을를】 다시 가린다.</span>`);
		} else if (V.underlowerwet >= 80 && V.underlowerwetstage < 2) {
			V.underlowerwetstage = 2;
			wetIntro = 1;
			sWikifier(`<span class="purple">${V.worn.under_lower.name}【이가】 젖었다.</span>`);
		} else if (V.underlowerwet < 70 && V.underlowerwetstage >= 2) {
			V.underlowerwetstage = 1;
			sWikifier(`<span class="green">${V.worn.under_lower.name}【이가】 마르고 있다.</span>`);
		} else if (V.underlowerwet >= 50 && V.underlowerwetstage < 1) {
			V.underlowerwetstage = 1;
			sWikifier(`<span class="blue">${V.worn.under_lower.name}【이가】 축축해졌다.</span>`);
		} else if (V.underlowerwet < 40 && V.underlowerwetstage >= 1) {
			V.underlowerwetstage = 0;
			sWikifier(`<span class="green">${V.worn.under_lower.name}【이가】 말랐다.</span>`);
		}
	}

	if (!V.worn.under_upper.type.includes("naked") && !V.worn.under_upper.type.includes("chastity") && !waterproofCheck(V.worn.under_upper)) {
		if (V.underupperwet >= 100 && V.underupperwetstage < 3) {
			V.underupperwetstage = 3;
			wetIntro = 2;
			sWikifier(`<span class="lewd">${waterTypeText}【이가】 ${V.worn.under_upper.name}【을를】 흠뻑 적셔 <<breasts>>【이가】 드러난다.</span>`);
		} else if (V.underupperwet < 90 && V.underupperwetstage >= 3) {
			V.underupperwetstage = 2;
			sWikifier(`<span class="green">${V.worn.under_upper.name}【이가】 말라 <<breasts>>【을를】 다시 가린다.</span>`);
		} else if (V.underupperwet >= 80 && V.underupperwetstage < 2) {
			V.underupperwetstage = 2;
			wetIntro = 1;
			sWikifier(`<span class="purple">${V.worn.under_upper.name}【이가】 젖었다.</span>`);
		} else if (V.underupperwet < 70 && V.underupperwetstage >= 2) {
			V.underupperwetstage = 1;
			sWikifier(`<span class="green">${V.worn.under_upper.name}【이가】 마르고 있다.</span>`);
		} else if (V.underupperwet >= 50 && V.underupperwetstage < 1) {
			V.underupperwetstage = 1;
			sWikifier(`<span class="blue">${V.worn.under_upper.name}【이가】 축축해졌다.</span>`);
		} else if (V.underupperwet < 40 && V.underupperwetstage >= 1) {
			V.underupperwetstage = 0;
			sWikifier(`<span class="green">${V.worn.under_upper.name}【이가】 말랐다.</span>`);
		}
	}

	if (!V.possessed) {
		if (wetIntro >= 2) {
			sWikifier("<<exposure>>");
			if (V.exhibitionism >= 55) {
				span(
					!V.worn.face.type.includes("blindfold")
						? "몸에 바짝 달라붙은 옷이 완전히 비쳐 보이는 걸 내려다보자 음란한 전율이 인다."
						: "옷이 몸에 바짝 달라붙어 완전히 비쳐 보이자 음란한 전율이 인다."
				);
			} else {
				span(
					!V.worn.face.type.includes("blindfold")
						? "몸에 바짝 달라붙어 완전히 비쳐 보이는 옷을 내려다보며 공포에 질린다."
						: "몸에 바짝 달라붙어 완전히 비쳐 보이는 옷의 감촉에 공포가 엄습한다."
				);
			}
			sWikifier("<<covered>>");
			br();
			if (V.makeupWashed) br();
		} else if (wetIntro >= 1) {
			if (V.exhibitionism >= 35) {
				span(
					!V.worn.face.type.includes("blindfold")
						? "몸에 바짝 달라붙은 옷이 살짝 비쳐 보이는 걸 내려다보자 음란한 전율이 인다."
						: "옷이 몸에 바짝 달라붙어 살짝 비쳐 보이자 음란한 전율이 인다."
				);
			} else {
				span(
					!V.worn.face.type.includes("blindfold")
						? "몸에 바짝 달라붙어 살짝 비쳐 보이는 옷을 불안하게 내려다본다."
						: "몸에 바짝 달라붙어 살짝 비쳐 보이는 옷의 감촉이 느껴진다."
				);
			}
			br();
			if (V.makeupWashed) br();
		}
	}
	return fragment;
}

Macro.add("effectswater", {
	handler() {
		const fragment = effectsWater(this.args[0]);
		if (fragment) this.output.append(fragment);
	},
});

function effectsMakeup() {
	const fragment = document.createDocumentFragment();

	const span = (text, colour) => {
		const element = document.createElement("span");
		if (colour) element.classList.add(colour);
		element.textContent = text + " ";
		fragment.append(element);
	};

	if (V.makeupWashed) {
		delete V.makeupWashed;
		span(`화장이 씻겨 내려간다${V.beauty >= (V.beautymax / 7) * 4 ? ", 자연스러운 아름다움이 드러난다" : ""}.`, "teal");
		fragment.append(document.createElement("br"));
	}

	if (V.makeup.mascara && V.makeup.mascara_running < painToTearsLvl(V.pain) && !V.makeup.mascara.includes("waterproof")) {
		V.makeup.mascara_running = painToTearsLvl(V.pain);
	}

	return fragment;
}

function effects() {
	const fragment = document.createDocumentFragment();

	const sWikifier = text => {
		fragment.append(Wikifier.wikifyEval(text + " "));
	};
	const element = (element, text, colour) => {
		const result = document.createElement(element);
		if (colour) result.classList.add(colour);
		result.textContent = text + " ";
		fragment.append(result);
	};
	const br = () => fragment.append(document.createElement("br"));

	// Depricated as of current
	// if (V.newVersionData) sWikifier("<<newversionnotification>>");

	sWikifier("<<autoTakePillCheck>>");
	fragment.append(effectsWater());
	fragment.append(effectsMakeup());

	V.speechcycle++;
	if (V.speechcycle >= 7) V.speechcycle = 0;

	if (Weather.bodyTemperature < setup.WeatherTemperature.minTemperature + 1 && !Weather.BodyTemperature.isIncreasing()) {
		element("span", `몸이 너무 차가워 저체온증에 걸릴 것 같다!`, "red");
		br();
	} else if (Weather.bodyTemperature > setup.WeatherTemperature.maxTemperature - 1 && !Weather.BodyTemperature.isDecreasing()) {
		element("span", `몸이 너무 뜨거워 열사병에 걸릴 것 같다!`, "red");
		br();
	}

	if (!T.inWater && V.squidcount) {
		element("span", `${V.squidcount > 1 ? "오징어들이" : "오징어가"} 물을 찾아 당신에게서 떨어져 나간다.`, "blue");
		V.squidcount = 0;
	}

	if (V.scienceproject === "ongoing" && V.scienceprojectdays === 0 && !V.scienceprojectwarning) {
		V.scienceprojectwarning = 1;
		element("span", `오늘 클리프 가의 시청에서 ${ampm(9, 0)}부터 ${ampm(18, 0)}까지 과학 박람회가 열린다.`, "gold");
	}

	if (V.mathsproject === "ongoing" && V.mathsprojectdays === 0 && !V.mathsprojectwarning) {
		V.mathsprojectwarning = 1;
		element("span", `오늘 클리프 가의 시청에서 ${ampm(9, 0)}부터 ${ampm(18, 0)}까지 수학 경시대회가 열린다.`, "gold");
	}

	if (V.englishPlay === "ongoing" && V.englishPlayDays === 0 && !V.englishPlayWarning) {
		V.englishPlayWarning = 1;
		element("span", `오늘 밤 클리프 가에서 ${ampm(17, 0)}부터 ${ampm(21, 0)}까지 학교 연극제가 열린다.`, "gold");
	}

	if (V.studyBooks?.rented !== "none" && V.book_rent_timer === 0 && !V.studyBookDueWarning && Time.schoolTerm) {
		V.studyBookDueWarning = 1;
		element("span", `오늘 도서관에 반납해야 할 책이 있다.`, "gold");
	}

	if (V.innocencemessage === "start") {
		delete V.innocencemessage;
		element("span", "깊은 평온이 마음 위로 내려앉는다. 방금 전까지 괴로웠지만, 왜 그랬는지 기억나지 않는다.", "red");
		element("i", "트라우마가 순수함으로 대체되었다. 트라우마는 계속 축적되며, 순수함이 바닥나면 다시 돌아온다.");
	} else if (V.innocencemessage === "end") {
		delete V.innocencemessage;
		element("span", "끔찍한 깨달음이 찾아온다. 지금까지 견뎌 온 학대를 더는 외면할 수 없다.", "red");
		element("i", "순수함이 트라우마로 대체되었다.");
	}

	if (V.eventskipoverrule) V.eventskipoverrule = 0;

	if (V.underwatercheck > 0) {
		V.underwatercheck--;
	} else if (V.underwater === 1) {
		V.underwater = 0;
		V.oxygen = Math.clamp(V.oxygen, 0, V.oxygenmax);
		if (V.oxygen < V.oxygenmax) {
			V.oxygenRecovery = true;
		}
	}
	if (V.oxygenRecovery && V.underwater === 0 && V.combat === 0) {
		sWikifier(
			`<span class="lblue">산소 (회복 중):</span>
			<<dynamicblock id=oxygen-caption>>
				<<oxygencaption>>
			<</dynamicblock>>`
		);
	}

	sWikifier("<<updateHallucinations>>");

	if (V.controlled === 0 && V.flashbacks >= 1) {
		switch (V.location) {
			case "town":
				if (V.flashbacktownready === 1) {
					delete V.flashbacktownready;
					sWikifier("<<flashbacktown>>");
				}
				break;
			case "home":
				if (V.flashbackhomeready === 1) {
					delete V.flashbackhomeready;
					sWikifier("<<flashbackhome>>");
				}
				break;
			case "beach":
				if (V.flashbackbeachready === 1) {
					delete V.flashbackbeachready;
					sWikifier("<<flashbackbeach>>");
				}
				break;
			case "underground":
				if (V.flashbackundergroundready === 1) {
					delete V.flashbackundergroundready;
					sWikifier("<<flashbackunderground>>");
				}
				break;
			case "school":
				if (V.flashbackschoolready === 1) {
					delete V.flashbackschoolready;
					sWikifier("<<flashbackschool>>");
				}
				break;
		}
	}

	// eslint-disable-next-line no-undef
	if (isPregnancyEnding()) {
		sWikifier(
			`<span class="red">양수가 터졌다.</span> ${
				["asylum", "prison", "hospital"].includes(V.location) ? "빨리 도움을 찾아야 한다!" : "빨리 병원으로 가야 한다!"
			} <<ggstress>>`
		);
		br();
	}

	if (V.effectsmessage && !V.statFreeze && !V.silenceNotifications) {
		delete V.effectsmessage;

		if (V.recovered_from_pregnancy) {
			delete V.recovered_from_pregnancy;
			element("span", "자궁에 익숙한 공허함이 돌아온다.", "green");
		}

		if (V.skulduggerymessage) {
			const grade = ["S", "A+", "A", "B+", "B", "C+", "C", "D+", "D", "F+"];
			const colour = ["green", "teal", "teal", "lblue", "lblue", "blue", "blue", "purple", "purple", "pink"];
			element("span", "속임수 실력이", "gold");
			element("span", `${grade[V.skulduggerymessage - 1]}`, colour[V.skulduggerymessage - 1]);
			element("span", "등급으로 향상되었다.", "gold");
			delete V.skulduggerymessage;
			V.skulduggeryday = V.skulduggery;
		}

		if (V.hypnosis_deviancy_message) {
			delete V.hypnosis_deviancy_message;
			sWikifier(
				`<<hypnosisText "어제는 그다지 일탈적이지 않았다.">> ${
					V.hypnosis_traits.deviancy < 5 ? "그 생각에 " : "그 생각이 마음을 "
				}`
			);
			switch (V.hypnosis_traits.deviancy) {
				case 1:
					element("span", "수치심으로 채운다.", "lblue");
					break;
				case 2:
					element("span", "후회로 채운다.", "blue");
					break;
				case 3:
					element("span", "죄책감으로 채운다.", "purple");
					break;
				case 4:
					element("span", "강렬한 죄책감으로 채운다.", "pink");
					break;
				case 5:
					element("span", "죄책감과 불안으로 어지럽힌다.", "red");
					break;
			}
			sWikifier("<<gggtrauma>>");
		}

		if (V.hypnosis_devotion_message) {
			switch (V.hypnosis_devotion_message) {
				case "ritual":
					sWikifier(`<<hypnosisText "이번 주에 그윌란의 의식을 돕기 위해 만나지 않았다.">> `);
					break;
				case "request":
					if (V.gwylan.request.missed) {
						sWikifier(`<<hypnosisText "아직 그윌란의 부탁을 끝내지 못했다.">> `);
					} else {
						sWikifier(`<<hypnosisText "어제 그윌란의 부탁을 끝내지 못했다.">> `);
					}
					break;
				case "meetAtShop":
					if (V.gwylan.request.missed) {
						sWikifier(`<<hypnosisText "아직 상점에서 그윌란과 만나지 않았다.">> `);
					} else {
						sWikifier(`<<hypnosisText "어제 상점에서 그윌란과 만나지 않았다.">> `);
					}
					break;
				case "meetAtCafe":
					if (V.gwylan.request.missed) {
						sWikifier(`<<hypnosisText "아직 카페에서 그윌란과 만나지 않았다.">> `);
					} else {
						sWikifier(`<<hypnosisText "어제 카페에서 그윌란과 만나지 않았다.">> `);
					}
					break;
				default:
					if (V.gwylan.request.missed) {
						sWikifier(`<<hypnosisText "아직 그윌란의 부탁을 들어주지 못했다.">> `);
					} else {
						sWikifier(`<<hypnosisText "어제 그윌란의 부탁을 들어주지 못했다.">> `);
					}
					break;
			}
			sWikifier(`${V.hypnosis_traits.devotion < 5 ? "그 생각에 " : "그 생각이 마음을 "}`);
			switch (V.hypnosis_traits.devotion) {
				case 1:
					element("span", "수치심으로 채운다.", "lblue");
					sWikifier(`<<gtrauma>><<ghallucinogens>>`);
					break;
				case 2:
					element("span", "후회로 채운다.", "blue");
					sWikifier(`<<ggtrauma>><<ghallucinogens>>`);
					break;
				case 3:
					element("span", "죄책감으로 채운다.", "purple");
					sWikifier(`<<ggtrauma>><<gghallucinogens>>`);
					break;
				case 4:
					element("span", "강렬한 죄책감으로 채운다.", "pink");
					sWikifier(`<<gggtrauma>><<gghallucinogens>>`);
					break;
				case 5:
					element("span", "죄책감과 불안으로 어지럽힌다.", "red");
					sWikifier(`<<gggtrauma>><<ggghallucinogens>>`);
					break;
			}
			delete V.hypnosis_devotion_message;
		}

		if (V.hypnosis_timer_messages?.length) {
			V.hypnosis_timer_messages.forEach(trait => {
				switch (trait) {
					case "devotion":
						sWikifier("<<gwylanHypnosis 'devotion' -1>>");
						break;
					case "peace":
						sWikifier('<span class="purple">익숙한 불확실함이 온몸을 채운다. 최면의 평온이 사라졌다.</span>');
						delete V.hypnosis_traits[trait];
						delete V.hypnosisTimers[trait];
						break;
					case "silence":
						sWikifier(
							`${
								numberOfEarSlime()
									? "<span class='purple'>익숙한 속삭임이 귀를 채운다. 최면의 침묵이 사라졌다.</span>"
									: "<span class='purple'>최면의 침묵이 사라졌다.</span>"
							}`
						);
						delete V.hypnosis_traits[trait];
						delete V.hypnosisTimers[trait];
						break;
					case "slumber":
						sWikifier('<span class="purple">최면의 수면이 사라졌다.</span>');
						delete V.hypnosis_traits[trait];
						delete V.hypnosisTimers[trait];
						break;
					case "insight": {
						const insightText = V.awareness >= 300 ? "무지" : "통찰";
						sWikifier(`<span class="purple">최면의 ${insightText}【이가】 사라졌다.</span>`);
						delete V.hypnosis_traits[trait];
						delete V.hypnosisTimers[trait];
						break;
					}
					default:
						sWikifier(`<span class="purple">최면 효과 ${trait.toUpperFirst()}【이가】 사라졌다.</span>`);
						delete V.hypnosis_traits[trait];
						delete V.hypnosisTimers[trait];
						break;
				}
			});
			delete V.hypnosis_timer_messages;
		}

		// expects the use of $science_up_message, $maths_up_message, $english_up_message, $history_up_message, $science_down_message, $maths_down_message, $english_down_message, $history_down_message
		["science", "maths", "english", "history"].forEach(subject => {
			const subjectDisplay = { science: "과학", maths: "수학", english: "영어", history: "역사" }[subject] || subject;
			if (V[`${subject}_up_message`]) {
				delete V[`${subject}_up_message`];
				sWikifier(`${subjectDisplay}에 자신감이 붙은 것 같다. <<${subject}_skill_up_text>>`);
				br();
			} else if (V[`${subject}_down_message`]) {
				delete V[`${subject}_down_message`];
				element("span", `${subjectDisplay} 수업 내용을 따라가지 못하게 되었다${V[`${subject}trait`] > 0 ? ", 특성이 약화된다" : ""}.`, "red");
				br();
			}
		});

		if (V.lactationmessage) {
			delete V.lactationmessage;
			if (V.lactating) {
				sWikifier('<span class="purple"><<breasts>>【이가】 묵직하고 민감하게 느껴진다.</span>');
			} else {
				sWikifier('<span class="lblue"><<breasts>>【이가】 가볍게 느껴진다. 더는 그렇게 민감하지 않다.</span>');
			}
		}

		if (V.penisgrowthmessage !== undefined) {
			switch (V.penisgrowthmessage) {
				case 6:
					element("span", "성기가 엄청난 크기로 자랐다.", "purple");
					break;
				case 5:
					element("span", "성기가 더 커졌다.", "purple");
					break;
				case 4:
					element("span", "성기가 평범한 크기로 자랐다.", "purple");
					break;
				case 3:
					element("span", "성기가 자랐지만, 아직 작다.", "purple");
					break;
				case 2:
					element("span", "성기가 회복되고 있는 것 같다.", "purple");
					break;
				case 1:
					element("span", "성기가 다시 기회를 얻은 것처럼 보인다.", "purple");
					break;
			}
			delete V.penisgrowthmessage;
		}

		if (V.penisshrinkmessage !== undefined) {
			if (V.worn.genitals.name === "chastity parasite") {
				switch (V.penisshrinkmessage) {
					case 5:
						element("span", "정조 기생충이 줄어들었지만, 아직도 인상적인 성기 크기를 암시한다.", "purple");
						break;
					case 4:
						element("span", "정조 기생충이 평범한 크기로 줄어들었다.", "purple");
						break;
					case 3:
						element("span", "정조 기생충이 더 작아졌다.", "purple");
						break;
					case 2:
						element("span", "정조 기생충이 아주 작아졌다.", "purple");
						break;
					case 1:
						element("span", "정조 기생충이 쪼그라들 것 같다.", "purple");
						break;
					case 0:
						element("span", "정조 기생충이 거의 아무것도 가리지 못하는 것 같다.", "purple");
						break;
				}
			} else {
				switch (V.penisshrinkmessage) {
					case 5:
						element("span", "성기가 줄어들었지만, 아직 인상적인 크기다.", "purple");
						break;
					case 4:
						element("span", "성기가 평범한 크기로 줄어들었다.", "purple");
						break;
					case 3:
						element("span", "성기가 더 작아졌다.", "purple");
						break;
					case 2:
						element("span", "성기가 아주 작아졌다.", "purple");
						break;
					case 1:
						element("span", "성기가 쪼그라들 것 같다.", "purple");
						break;
					case 0:
						element("span", "성기가 다시는 제대로 쓰이지 못할 것 같다.", "purple");
						break;
				}
			}
			delete V.penisshrinkmessage;
		}

		if (V.breastgrowthmessage !== undefined) {
			switch (V.breastgrowthmessage) {
				case 12:
					element("span", "큰 가슴이 묵직하게 느껴지고, 움직임에 방해가 될 것 같다.", "purple");
					break;
				case 11:
					element("span", "큰 가슴이 묵직하고 인상적으로 느껴진다.", "purple");
					break;
				case 10:
				case 9:
					element("span", "가슴이 묵직하게 느껴진다.", "purple");
					break;
				case 8:
				case 7:
					element("span", "가슴이 조금 더 묵직하게 느껴진다.", "purple");
					break;
				case 6:
				case 5:
					element("span", "작은 가슴이 주변 사람들에게도 눈에 띌 것이다.", "purple");
					break;
				case 4:
				case 3:
					element("span", "작은 가슴이 다른 사람들에게 눈에 띌지도 모른다.", "purple");
					break;
				case 2:
				case 1:
					element("span", "가슴께가 이상하게 느껴진다. 자라고 있는지도 모른다.", "purple");
					break;
			}
			delete V.breastgrowthmessage;
		}

		if (V.milkFullPainMessage) {
			if (V.milkFullPain >= 275) {
				sWikifier(`<span class="red">한동안 충분히 착유하지 않았다. 가득 찬 <<breasts>>【이가】 아프게 욱신거린다.</span>`);
			} else if (V.milkFullPain >= 250) {
				sWikifier(`<span class="red">최근 충분히 착유하지 않았다. 가득 찬 <<breasts>>【이가】 쓰라리다.</span>`);
			} else {
				sWikifier(`<span class="red">요즘 충분히 착유하지 않았다. 가득 찬 <<breasts>>【이가】 조금 쓰라리다.</span>`);
			}
			V.daily.milkFullPainMessage = true;
			delete V.milkFullPainMessage;
		}

		if (V.breastshrinkmessage !== undefined) {
			switch (V.breastshrinkmessage) {
				case 11:
					element("span", "큰 가슴이 가벼워진 것 같지만, 아직도 매우 크다.", "purple");
					break;
				case 10:
				case 9:
					element("span", "가슴이 가볍게 느껴지고, 덜 인상적으로 보인다.", "purple");
					break;
				case 8:
				case 7:
					element("span", "가슴이 더 가볍게 느껴진다.", "purple");
					break;
				case 6:
				case 5:
					element("span", "작은 가슴이 조금 더 가볍게 느껴진다.", "purple");
					break;
				case 4:
				case 3:
					element("span", "작은 가슴이 덜 도드라져 보인다.", "purple");
					break;
				case 2:
				case 1:
					element("span", "가슴께가 더 납작해 보인다.", "purple");
					break;
				case 0:
					element("span", "가슴께가 납작해 보인다.", "purple");
					break;
			}
			delete V.breastshrinkmessage;
		}

		if (V.bottomgrowthmessage !== undefined) {
			switch (V.bottomgrowthmessage) {
				case 8:
					element("span", "큰 엉덩이가 더 커졌다.", "purple");
					break;
				case 7:
					element("span", "엉덩이가 묵직하게 느껴진다.", "purple");
					break;
				case 6:
					element("span", "엉덩이가 통통하게 느껴진다.", "purple");
					break;
				case 5:
					element("span", "엉덩이가 둥글게 느껴진다.", "purple");
					break;
				case 4:
					element("span", "엉덩이가 푹신하게 느껴진다.", "purple");
					break;
				case 3:
					element("span", "엉덩이에 살이 조금 붙었다.", "purple");
					break;
				case 2:
					element("span", "작던 엉덩이가 기억보다 더 도드라진다.", "purple");
					break;
				case 1:
					element("span", "엉덩이가 더는 그렇게 작게 느껴지지 않는다.", "purple");
					break;
			}
			delete V.bottomgrowthmessage;
		}

		if (V.bottomshrinkmessage) {
			switch (V.bottomshrinkmessage) {
				case 7:
					element("span", "큰 엉덩이가 조금 가벼워진 것 같다.", "purple");
					break;
				case 6:
					element("span", "엉덩이가 가볍게 느껴진다.", "purple");
					break;
				case 5:
					element("span", "엉덩이가 예전만큼 푹신하지 않다.", "purple");
					break;
				case 4:
					element("span", "엉덩이 살이 빠졌다.", "purple");
					break;
				case 3:
					element("span", "엉덩이가 훨씬 날렵하게 느껴진다.", "purple");
					break;
				case 2:
				case 1:
					element("span", "엉덩이가 작게 느껴진다.", "purple");
					break;
				case 0:
					element("span", "엉덩이가 아주 작게 느껴진다.", "purple");
					break;
			}
			delete V.bottomshrinkmessage;
		}

		if (V.speech_attitude_bratty_message) {
			delete V.speech_attitude_bratty_message;
			element("span", "너무 순종적이 되어 대화에서 건방진 태도를 취할 수 없게 되었다.", "purple");
		}

		if (V.speech_attitude_meek_message) {
			delete V.speech_attitude_meek_message;
			element("span", "너무 반항적이 되어 대화에서 온순한 태도를 취할 수 없게 되었다.", "purple");
		}

		if (V.sunscreenAutoApplied) {
			element("span", `피부에 자외선 차단제를 바른다${Skin.Sunscreen.usesLeft <= 0 ? "," : "."}`, "purple");
			if (Skin.Sunscreen.usesLeft <= 0) element("span", "마지막 남은 것까지 사용했다.", "red");
			delete V.sunscreenAutoApplied;
		}

		if (V.pillsTaken) {
			element("span", "매일 먹는 알약을 복용한다.", "purple");
			if (V.pillsTakenLast) element("span", "몇몇 알약이 떨어졌다.", "red");
			delete V.pillsTaken;
			delete V.pillsTakenLast;
		}

		if (V.hairGrowthApplied) {
			element("span", `머리에 성장 촉진제를 바른다${V.hairGrowthAppliedLast ? "," : "."}`, "purple");
			if (V.hairGrowthAppliedLast) element("span", "하지만 마지막 남은 것까지 사용했다.", "red");
			delete V.hairGrowthApplied;
			delete V.hairGrowthAppliedLast;
		}

		if (V.exhibitionism_message) {
			sWikifier(
				`<span class="lblue">속옷을 입지 않은 채로 공공장소에서 시간을 보냈다. 사람들이 눈치챘을까 하는 생각에 몸이 떨린다.</span> <<exhibitionism1>>`
			);
			delete V.exhibitionism_message;
		}

		if (V.rebuy_success.length) {
			const rebuyMessage = {};
			V.rebuy_success.forEach(([item, location]) => {
				if (!rebuyMessage[location]) rebuyMessage[location] = [];
				rebuyMessage[location].push(item);
			});
			Object.entries(rebuyMessage).forEach(([location, items]) => {
				const itemList = items.join(", ");
				element(
					"span",
					`${itemList}【이가】 대체품 요청 신호를 보냈습니다${
						V.wardrobes[location]
							? `. 대체품은 ${V.wardrobes[location].name}에 도착합니다`
							: `. (일회성 업데이트 오류일 가능성이 높습니다. 같은 세이브에서 여러 번 보이는 경우가 아니라면 보고할 필요는 없습니다.) ${
									Array.isArray(V.rebuy_success) ? JSON.stringify(V.rebuy_success) : ""
							}`
					}.`,
					"lblue"
				);
			});
			V.rebuy_success = [];
		}

		if (V.rebuy_failure.length) {
			const itemList = V.rebuy_failure.join(", ");
			element(
				"span",
				`${itemList}【이가】 대체품 요청 신호를 보냈지만, 돈이 부족합니다.`,
				"purple"
			);
			V.rebuy_failure = [];
		}

		if (V.masochism_message) {
			switch (V.masochism_message) {
				case "up 1":
					element("span", "당신이 겪은 공격들이 머릿속을 맴돈다. 몸이 떨린다.", "blue");
					element("i", "죄책감 어린 마조히스트가 되었다.", "blue");
					break;
				case "up 2":
					element("span", "당신이 겪은 공격들이 떠오른다. 원치 않는 전율이 뒤따른다.", "purple");
					element("i", "평범한 마조히스트가 되었다.", "purple");
					break;
				case "up 3":
					element("span", "몸이 더 많은 학대를 갈망한다.", "pink");
					element("i", "단련된 마조히스트가 되었다.", "pink");
					break;
				case "up 4":
					element("span", "몸이 더 많은 학대를 탐한다.", "red");
					element("i", "침 흘리는 마조히스트가 되었다.", "red");
					break;
				case "down 0":
					element("i", "더는 마조히스트가 아니다.", "lblue");
					break;
				case "down 1":
					element("span", "마조히즘 성향이 약해졌다.", "blue");
					element("i", "죄책감 어린 마조히스트가 되었다.", "blue");
					break;
				case "down 2":
					element("span", "마조히즘 성향이 약해졌다.", "purple");
					element("i", "평범한 마조히스트가 되었다.", "purple");
					break;
				case "down 3":
					element("span", "마조히즘 성향이 약해졌다.", "pink");
					element("i", "단련된 마조히스트가 되었다.", "pink");
					break;
			}
			delete V.masochism_message;
		}

		if (V.sadism_message) {
			switch (V.sadism_message) {
				case "up 1":
					element("span", "당신이 가한 고통들이 떠오른다. 몸이 떨린다.", "blue");
					element("i", "죄책감 어린 사디스트가 되었다.", "blue");
					break;
				case "up 2":
					element("span", "당신이 가한 고통들이 떠오른다. 원치 않는 전율이 뒤따른다.", "purple");
					element("i", "평범한 사디스트가 되었다.", "purple");
					break;
				case "up 3":
					element("span", "다른 사람을 해치고 싶어진다.", "pink");
					element("i", "단련된 사디스트가 되었다.", "pink");
					break;
				case "up 4":
					element("span", "거칠게 놀고 싶다면, 그렇게 해주면 된다.", "red");
					element("i", "복수심에 불타는 사디스트가 되었다.", "red");
					break;
				case "down 0":
					element("i", "더는 사디스트가 아니다.", "lblue");
					break;
				case "down 1":
					element("span", "사디즘 성향이 약해졌다.", "blue");
					element("i", "죄책감 어린 사디스트가 되었다.", "blue");
					break;
				case "down 2":
					element("span", "사디즘 성향이 약해졌다.", "purple");
					element("i", "평범한 사디스트가 되었다.", "purple");
					break;
				case "down 3":
					element("span", "사디즘 성향이 약해졌다.", "pink");
					element("i", "단련된 사디스트가 되었다.", "pink");
					break;
			}
			delete V.sadism_message;
		}

		if (V.school_crossdress_message) {
			const crossdressing = V.player.gender !== V.player.sex ? "여장/남장이라는 의심" : "여장/남장";
			const knows = V.player.gender !== V.player.sex ? "그게 사실이라고 믿고 있다" : "알고 있다";
			switch (V.school_crossdress_message) {
				case 5:
					element("span", `학교에서 당신의 ${crossdressing}【이가】 공공연한 사실이 되었다. 교사들을 포함해 모두가 ${knows}.`, "red");
					break;
				case 4:
					element("span", `당신의 ${crossdressing}에 대한 소문이 학교 전체로 퍼지고 있다.`, "pink");
					break;
				case 3:
					element("span", `당신의 ${crossdressing}에 대한 소문이 퍼져 학교에서 인기 있는 화젯거리가 되었다.`, "purple");
					break;
				case 2:
					element("span", `당신의 ${crossdressing}에 대한 수군거림이 학교에 퍼지고 있다.`, "blue");
					break;
				case 1:
					element("span", `학교의 몇몇 무리가 당신의 ${crossdressing}에 대해 수군거리기 시작했다.`, "lblue");
					break;
			}
			delete V.school_crossdress_message;
		}

		if (V.school_herm_message) {
			switch (V.school_herm_message) {
				case 5:
					element("span", "교사들을 포함해 학교의 모두가 당신의 특이한 성기에 대해 들었다.", "red");
					break;
				case 4:
					element("span", "당신의 특이한 성기에 대한 소문이 학교 전체로 퍼졌다.", "pink");
					break;
				case 3:
					element(
						"span",
						"많은 이에게는 터무니없게 들리지만, 학교는 남성과 여성의 부위를 모두 지닌 학생에 대한 소문으로 가득하다.",
						"purple"
					);
					break;
				case 2:
					element("span", "남성과 여성의 부위를 모두 지닌 학생에 대한 소문이 학교에 퍼지고 있다.", "blue");
					break;
				case 1:
					element("span", "학교의 몇몇 무리가 남성과 여성의 부위를 모두 지닌 학생에 대해 수군거리기 시작했다.", "lblue");
					break;
			}
			delete V.school_herm_message;
		}

		// expects the use of $orgasm_trait_message, $molest_trait_message, $rape_trait_message, $bestiality_trait_message, $tentacle_trait_message, $vore_trait_message, $milk_trait_message and $cum_trait_message
		[
			["orgasm", "쾌락주의자", "절정 중독"],
			["molest", "우아한", "노리개"],
			["rape", "살아남은자", "육변기"],
			["bestiality", "조련사", "암캐"],
			["tentacle", "마녀", "사냥감"],
			["vore", "무모한 도전자", "맛있는 먹잇감"],
			["milk", "우유 애호가", "우유 중독자"],
			["cum", "정액 감별사", "정액받이"],
		].forEach(([variable, defiantName, submissiveName]) => {
			if (V[`${variable}_trait_message`]) {
				element("span", `"${V.submissive <= 850 ? defiantName : submissiveName}" 특성을 얻었다.`, "gold");
				delete V[`${variable}_trait_message`];
			}
		});

		if (V.nectarmessage) {
			switch (V.nectarmessage) {
				case "traitGain":
					element(
						"span",
						`달콤한 넥타르를 더 갈망하게 된다. "${V.submissive <= 850 ? "나무성애자" : "식물 애호가"}" 및`,
						"purple"
					);
					element("span", '"넥타르 중독"', "red");
					element("span", "특성을 얻었다.", "purple");
					break;
				case "traitLost":
					element(
						"span",
						`넥타르에 대한 갈망이 마침내 가라앉는다. "${V.submissive <= 850 ? "나무성애자" : "식물 애호가"}" 및`,
						"lblue"
					);
					element("span", '"넥타르 중독"', "red");
					element("span", "특성을 잃었다.", "lblue");
					break;
				case "withdrawals":
					sWikifier(
						'<span class="red">몸이 넥타르를 갈망하며 금단 증상에 시달리기 시작했다.</span> <<stress 12>><<ggstress>><<trauma 12>><<ggtrauma>><<physique_loss 4>><<lphysique>>'
					);
					br();
					break;
			}
			delete V.nectarmessage;
		}

		if (V.hiddenTransformMessage) {
			element(
				"span",
				V.hiddenTransformMessage === 1
					? "정신 상태가 너무 취약해 내면의 모습을 계속 숨길 수 없다."
					: "내면의 모습을 숨기는 일이 정신 상태를 갉아먹는다.",
				"red"
			);
			delete V.hiddenTransformMessage;
		}

		if (V.prof_spray_message) {
			element("span", "스프레이가 정확히 맞았다. 카트리지를 전부 쓰지 않아 탄약을 아꼈다.", "green");
			delete V.prof_spray_message;
		}

		if (V.community_message === "missed") {
			sWikifier('<span class="red">사회봉사를 빠졌다. 경찰이 이를 기록했다.</span><<crime "obstruction">>');
			delete V.community_message;
		}

		if (V.toy_message) {
			element("span", "마을 전역에서 성인용품이 더 인기를 얻고 있다.", "purple");
			delete V.toy_message;
		}

		if (V.loveInterest_message === 1) {
			element("i", "여러 연인을 두는 것은 잘못이라는 생각이 든다. 이제 관심 연인을 하나만 선택할 수 있다.", "blue");
			delete V.loveInterest_message;
			delete V.loveInterestAwareMessage;
		} else if (V.loveInterest_message === 2 && !V.loveInterestAwareMessage) {
			element("i", "다른 연인의 가능성에 마음이 열린다. 이제 두 번째 관심 연인을 선택할 수 있다.", "pink");
			delete V.loveInterest_message;
			V.loveInterestAwareMessage = 1;
		} else if (V.loveInterest_message === 3 && V.loveInterestAwareMessage === 2) {
			element("i", "그렇게 많은 연인을 두는 것은 잘못이라는 생각이 든다. 이제 관심 연인을 둘까지만 선택할 수 있다.", "blue");
			delete V.loveInterest_message;
			V.loveInterestAwareMessage = 1;
		} else if (V.loveInterest_message === 4 && V.loveInterestAwareMessage === 1) {
			element("i", "여러 연인의 가능성에 마음이 열린다. 이제 세 번째 관심 연인을 선택할 수 있다.", "pink");
			delete V.loveInterest_message;
			V.loveInterestAwareMessage = 2;
		}

		if (V.fallenangelmessage) {
			sWikifier('<span class="red">어두운 존재가 피부를 할퀴는 것 같다.</span> <<gstress>>');
			V.stress += V.stressmax;
			delete V.fallenangelmessage;
		}

		if (V.demonmessage) {
			sWikifier('<span class="red">끔찍한 빛이 몸을 꿰뚫고 태우는 것 같다.</span> <<gstress>>');
			V.stress += V.stressmax;
			delete V.demonmessage;
		}

		if (V.foxCrimeMessage) {
			element(
				"span",
				V.blackmoney >= 100
					? "점점 늘어나는 훔친 물건들을 보며 동물적인 만족감이 든다."
					: "그런 범죄를 저지르며 동물적인 만족감이 든다.",
				"gold"
			);
			delete V.foxCrimeMessage;
		}

		if (V.bookoverduemessage) {
			if (V.bookoverduemessage === 1) {
				sWikifier(`<<crimeUp 5 "thievery">><<delinquency ${5 / 4}>>`);
				element("span", "반납 기한을 크게 넘긴 책이 있으며, 경찰에 통보되었다.", "red");
			} else {
				sWikifier(`<<delinquency ${3 / 4}>>`);
				element("span", "반납 기한을 넘긴 책이 있어 비행도가 올랐다.", "red");
			}
			delete V.bookoverduemessage;
		}

		if (V.wraithcompoundmessage) {
			element("span", "엘크 가 위로 불길한 안개가 드리워졌다.", "red");
			delete V.wraithcompoundmessage;
		}

		if (V.halloweenClothesMessage) {
			sWikifier(`<<specialClothesUnlock "set" "halloween">>`);
			delete V.halloweenClothesMessage;
		}

		if (V.christmasClothesMessage) {
			sWikifier(`<<specialClothesUnlock "set" "christmas">>`);
			delete V.christmasClothesMessage;
		}

		if (V.valentinesClothesMessage) {
			sWikifier(`<<specialClothesUnlock "set" "valentines">>`);
			delete V.valentinesClothesMessage;
		}

		if (V.earSlimebreastsParasite || V.earSlimePenisParasite || V.earSlimeClitParasite) {
			const parasiteCount = (V.earSlimebreastsParasite ? 1 : 0) + (V.earSlimePenisParasite ? 1 : 0) + (V.earSlimeClitParasite ? 1 : 0);
			let parasiteMessage = "";
			if (V.earSlimebreastsParasite) parasiteMessage += `새 기생충이 당신의 ${V.player.breastsize >= 1 ? "가슴" : "흉부"} 주위에 생겨난다`;

			if (V.earSlimePenisParasite) {
				parasiteMessage += parasiteMessage ? " 그리고 성기 밑동" : "새 기생충이 당신의 성기 밑동 주위에 생겨난다";
			}

			if (V.earSlimeClitParasite && V.player.vaginaExist) {
				if (V.earSlime.focus === "pregnancy") {
					parasiteMessage += parasiteMessage ? " 그리고 <<pussy>>" : "새 기생충이 당신의 <<pussy>> 주위에 생겨난다";
				} else {
					const looksText = playerChastity("vagina") ? "느껴진다" : "보인다";
					parasiteMessage += parasiteMessage
						? ` 그리고 클리토리스 주위에 생겨난다. 이제 당신만의 성기가 생긴 것처럼 ${looksText}`
						: `새 기생충이 당신의 클리토리스 밑동 주위에 생겨나 성기처럼 ${looksText}`;
				}
			}
			if (parasiteMessage) {
				sWikifier(`<span class="blue">만족스러운 온기가 당신을 채운다. ${parasiteMessage}.</span>`);
				element("span", `그것이 귀 속 슬라임에게서 비롯된 것임을 알 수 있다.`);
				if (V.earSlimePenisParasite && V.earSlimePenisParasite !== 1) {
					element("span", `성장이 끝난 직후 이전 ${V.earSlimePenisParasite}【이가】 떨어져 나간다.`, "red");
				}
				if (V.earSlimeClitParasite && V.earSlimeClitParasite !== 1) {
					element("span", `성장이 끝난 직후 이전 ${V.earSlimeClitParasite}【이가】 떨어져 나간다.`, "red");
				}
			}
			delete V.earSlimebreastsParasite;
			delete V.earSlimePenisParasite;
			delete V.earSlimeClitParasite;
		}

		if (V.penisslimebrokenchastitymessage) {
			element(
				"span",
				`성기 밑동의 기생충이 ${V.penisslimebrokenchastitymessage}에서 당신을 풀어준다${
					V.penisslimecagemessage === 1 ? ", 그리고 거의 동시에 새 정조 기생충이 성기 주위에 생겨난다" : ""
				}.`,
				"purple"
			);
			delete V.penisslimecagemessage;
			delete V.penisslimebrokenchastitymessage;
		}

		if (V.penisslimecagemessage) {
			element(
				"span",
				V.penisslimecagemessage === 1 ? "새 정조 기생충이 성기 주위에 생겨난다." : "정조 기생충이 다시 새것처럼 보인다.",
				"purple"
			);
			delete V.penisslimecagemessage;
		}

		if (V.pregnancyDailyEvent) {
			sWikifier("<<pregnancyDailyEvent>>");
			delete V.pregnancyDailyEvent;
		}

		// Check if any parasites are present before running events. If not, clear events.
		// TODO: Clear event messages in the case of "staggered" births where some parasites remain in that category. Otherwise, all events will continue to play until the daily reset, even if some parasites have already been birthed.
		if (V.daily.parasiteEvent) {
			if (V.sexStats.vagina.pregnancy.type === "parasite") {
				for (let i = 0; i < maxParasites("vagina"); i++) {
					if (V.sexStats.vagina.pregnancy.fetus[i] !== undefined) {
						T.hasVaginaParasiteForEvent = true;
						break;
					}
				}
			}
			if (V.sexStats.anus.pregnancy.type === "parasite") {
				for (let i = 0; i < maxParasites("anus"); i++) {
					if (V.sexStats.anus.pregnancy.fetus[i] !== undefined) {
						T.hasAnusParasiteForEvent = true;
						break;
					}
				}
			}
			if (!T.hasVaginaParasiteForEvent) {
				V.daily.parasiteEvent = V.daily.parasiteEvent.filter(function (event) {
					return !event.includes("vagina");
				});
			}
			if (!T.hasAnusParasiteForEvent) {
				V.daily.parasiteEvent = V.daily.parasiteEvent.filter(function (event) {
					return !event.includes("anus");
				});
			}
		}

		if (V.daily.parasiteEvent) {
			let minDaysLeft;
			if (V.sexStats.vagina.pregnancy.type === "parasite") {
				minDaysLeft = V.sexStats.vagina.pregnancy.fetus.reduce((prev, curr) => (prev.daysLeft < curr.daysLeft ? prev.daysLeft : curr.daysLeft), 30);
			}
			if (V.sexStats.anus.pregnancy.type === "parasite") {
				minDaysLeft = V.sexStats.anus.pregnancy.fetus.reduce(
					(prev, curr) => (prev.daysLeft < curr.daysLeft ? prev.daysLeft : curr.daysLeft),
					minDaysLeft || 30
				);
			}
			const stressMulti = Math.clamp(2 - V.sexStats.anus.pregnancy.motherStatus + V.sexStats.vagina.pregnancy.motherStatus, 0, 2);
			const arousalMulti = Math.clamp(1 + V.sexStats.anus.pregnancy.motherStatus + V.sexStats.vagina.pregnancy.motherStatus, 1, 3);
			let arousalGain = 0;
			if (V.daily.parasiteEvent.includes("anus3") && V.daily.parasiteEvent.includes("vagina3")) V.daily.parasiteEvent.delete("vagina3");

			V.daily.parasiteEvent.forEach(event => {
				switch (event) {
					case "anus0":
					case "vagina0":
						if (V.pregnancyStats.parasiteDoctorEvents >= 4) {
							sWikifier(
								`${event === "anus0" ? "배 속" : "자궁"} 안에서 ${V.pregnancyStats.namesParasitesChild ? "다 자란 아이" : "다 자란 기생충"}【이가】 느껴진다. <<ggarousal>>`
							);
						} else {
							sWikifier(
								`${event === "anus0" ? "배 속" : "자궁"} 안에서 커다란 무언가의 움직임이 느껴진다. 병원에 다시 가는 게 좋을지도 모른다. <<ggarousal>>`
							);
						}
						arousalGain += 2000;
						break;
					case "anus1":
					case "vagina1":
						if (V.pregnancyStats.parasiteDoctorEvents >= 2) {
							sWikifier(
								`${V.pregnancyStats.namesParasitesChild ? "아이들" : "기생충들"} 중 하나의 움직임이 ${event === "anus1" ? "배 속" : "자궁"} 안에서 느껴진다. <<ggarousal>>${stressMulti ? "<<gstress>>" : ""}`
							);
						} else {
							sWikifier(`${event === "anus1" ? "배 속" : "자궁"} 안에서 무언가의 움직임이 느껴진다. 병원에 가는 게 좋을지도 모른다.
							<<ggarousal>>${stressMulti ? "<<gstress>>" : ""}`);
						}
						arousalGain += (arousalMulti * 500) / (minDaysLeft + 1);
						V.stress += 300 * stressMulti;
						break;
					case "anus2":
					case "vagina2":
						sWikifier(
							`${event === "anus2" ? "배" : "자궁"}에서 조금 꾸르륵거리는 소리가 난다. 그 소리가 다른 사람의 주의를 끌지 않았기를 바란다. <<garousal>>${stressMulti ? "<<gstress>>" : ""}`
						);
						arousalGain += (arousalMulti * 250) / (minDaysLeft + 1);
						V.stress += 200 * stressMulti;
						break;
					case "anus3":
					case "vagina3":
						sWikifier(`잠시 어지러운 기분이 든다.${stressMulti ? "<<gstress>>" : ""}`);
						V.stress += 100 * stressMulti;
						break;
				}
			});
			if (arousalGain) sWikifier(`<<arousal ${Math.clamp(arousalGain, 0, 10000)}>>`);
			br();
			delete V.daily.parasiteEvent;
		}
	}

	if (numberOfEarSlime() && V.earSlime.event && !V.statFreeze) {
		if (V.earSlime.event.includes("get sperm into your") && V.earSlime.event.includes("completed") && V.earSlime.eventTimer <= 2) {
			element(
				"span",
				`귀 속 슬라임은 당신이 ${V.player.vaginaExist ? "보지" : "항문"}에 정액을 넣으라는 과제를 완수한 것에 만족한다.`,
				"green"
			);
			sWikifier(`<<pain -4>><<stress -6>><<trauma -12>><<lpain>><<lltrauma>><<lstress>>`);
			br();
			V.earSlime.event = "";
		} else if (V.earSlime.event.includes("get your own sperm into your") && V.earSlime.event.includes("completed") && V.earSlime.eventTimer <= 2) {
			element(
				"span",
				`귀 속 슬라임은 당신이 ${V.player.vaginaExist ? "보지" : "항문"}에 자신의 정액을 넣으라는 과제를 완수한 것에 만족한다.`,
				"green"
			);
			sWikifier(`<<pain -4>><<stress -6>><<trauma -12>><<lpain>><<lltrauma>><<lstress>>`);
			if (V.earSlime.growth >= 100 && V.earSlime.focus === "pregnancy" && V.worn.genitals.name === "naked") {
				sWikifier(`<span class="purple">새 정조 기생충이 성기 주위에 생겨난다.</span> <<genitalswear 8>>`);
				V.worn.genitals.origin = "ear slime";
			}
			br();
			V.earSlime.event = "";
		} else if (V.earSlime.eventTimer <= 2 || (V.earSlime.noSleep && Time.dayState !== "night")) {
			if (V.earSlime.startedThreats) {
				element("span", "귀 속 슬라임이 과제를 완수하지 못한 당신을 벌한다.", "red");
				sWikifier(`<<ggpain>><<ggtrauma>><<ggstress>><<pain 16>><<stress 12>><<trauma 12>>`);
				V.earSlime.defyCooldown += 4;
			} else {
				element("span", "귀 속 슬라임은 당신이 하겠다고 한 일을 끝내지 못해 언짢아한다.", "cyan");
			}
			br();
			V.earSlime.event = "";
			V.earSlime.noSleep = false;
		}
	}

	if (V.cheatClothes) {
		const slots = ["upper", "lower", "under_upper", "under_lower", "over_upper", "over_lower", "genitals"];
		if (V.worn.face.type.includesAny("face_covering", "gag", "mask")) {
			slots.push("face");
		}
		slots.forEach(slot => {
			if (V.worn[slot].name === "naked") return;
			V.worn[slot].integrity = clothingData(slot, V.worn[slot], "integrity_max");
			cheatsUpdateSlider(`#numberslider-input-worn${slot.replace("_", "-")}integrity`, V.worn[slot].integrity);
		});
	}

	if (Array.isArray(V.timeMessages) && V.timeMessages.length) {
		/*
			Calls to <<earnFeat "x">> here and within earnHourlyFeats are intended to show feats to the user.
			Be aware that the earnFeat widget is also used in passages such as 'Forest Blood Lemon Pick' and feats earned this way should still be displayed on that very passage and not the next one.
		*/
		const errors = [];
		V.timeMessages.forEach(messageKey => {
			let display;
			switch (messageKey) {
				case "feats":
					display = earnHourlyFeats();
					if (display) fragment.append(display);
					break;
				// Transformations
				case "fallenAngelFeathers":
					element("span", "날개에 새 깃털이 조금 자랐다.", "gold");
					break;
				case "fallenAngelWings":
					element("span", "부드러운 깃털의 익숙한 감촉이 희망으로 당신을 채운다.", "gold");
					break;
				case "fallenAngelDescend":
					element(
						"span",
						"검게 물든 날개가 더 깊은 검정으로 변한다. 부서진 후광이 희미해진다. 두피에서 뿔이 돋고 허리 아래에서 꼬리가 자라난다. 상실감은 복수심으로 대체된다.",
						"gold"
					);
					fragment.append(wikifier("garousal"));
					fragment.append(wikifier("specialClothesUnlock", "'set'", "'succubus'"));
					fragment.append(wikifier("earnFeat", "'Demon'"));
					break;
				case "angelUp1":
					sWikifier('<span class="gold">그 모든 일에도 불구하고, 당신은 순수한 <<pcGender>>【으로로】 남아 있다. 그 생각이 당신을 기쁘게 한다.</span>');
					break;
				case "angelUp2":
					element("span", "당신은 순수하며, 그 순수함을 지키겠다고 다짐한다.", "gold");
					break;
				case "angelUp3":
					element("span", "어깨를 짓누르던 무게가 사라지는 것 같다.", "gold");
					break;
				case "angelUp4":
					element("span", "금빛 빛줄기가 당신 위로 내려온다.", "gold");
					break;
				case "angelUp5":
					element("span", "등에서 편안한 온기가 느껴진다.", "gold");
					break;
				case "angelUp6":
					element("span", "몸이 가벼워진다. 새 날개가 얼굴을 어루만진다.", "gold");
					fragment.append(wikifier("earnFeat", "'Angel'"));
					break;
				case "angelDown0":
					element("span", "더럽혀진 기분이 든다.", "gold");
					break;
				case "angelDown1":
					element("span", "더러운 기분이 든다.", "gold");
					break;
				case "angelDown2":
					element("span", "무거운 짐이 당신을 짓누르는 것 같다.", "gold");
					break;
				case "angelDown3":
					element("span", "머리 위의 빛이 사그라진다.", "gold");
					break;
				case "angelDown4":
					element("span", "등의 편안한 온기가 사라진다.", "gold");
					break;
				case "angelDown5":
					element("span", "날개가 사라진다.", "gold");
					break;
				case "demonUp1":
					sWikifier('<span class="gold">두피가 가렵다.</span><<garousal>>');
					break;
				case "demonUp2":
					sWikifier('<span class="gold">두피에서 뿔이 돋아난다.</span><<garousal>>');
					break;
				case "demonUp3":
					sWikifier('<span class="gold"><<bottom>>【이가】 가렵다.</span><<garousal>>');
					break;
				case "demonUp4":
					sWikifier('<span class="gold">허리 아래에서 꼬리가 돋아난다.</span><<garousal>>');
					break;
				case "demonUp5":
					sWikifier('<span class="gold">등에서 타는 듯한 감각이 느껴진다.</span><<garousal>>');
					break;
				case "demonUp6":
					sWikifier(
						'<span class="gold">몸이 가벼워진다. 새 날개가 얼굴을 어루만진다.</span><<garousal>><<earnFeat "Demon">><<specialClothesUnlock "set" "succubus">>'
					);
					break;
				case "demonDown0":
					element("span", "보이지 않는 빛이 당신의 불순함을 태워 없애는 듯하다.", "gold");
					if (V.demonFeat) {
						fragment.append(wikifier("earnFeat", "'The Path to Redemption'"));
						delete V.demonFeat;
					}
					break;
				case "demonDown1":
					element("span", "뿔이 사라진다.", "gold");
					break;
				case "demonDown2":
					sWikifier('<span class="gold"><<bottom>>의 가려움이 멎는다.</span>');
					break;
				case "demonDown3":
					element("span", "꼬리가 사라진다.", "gold");
					break;
				case "demonDown4":
					element("span", "등의 타는 듯한 감각이 멎는다.", "gold");
					break;
				case "demonDown5":
					element("span", "날개가 사라진다.", "gold");
					break;
				case "wolfUp1":
					element("span", "이상한 치통이 느껴진다.", "gold");
					break;
				case "wolfUp2":
					element("span", "입안이 달라진 것 같다. 입안을 더듬던 혀가 새 송곳니에 닿자 얼굴을 찡그린다.", "gold");
					break;
				case "wolfUp3":
					element("span", `두피${V.settings.pubicHairEnabled === true ? "와 음부가" : "가"} 가렵다.`, "gold");
					break;
				case "wolfUp4":
					element("span", "머리 위에 무언가가 느껴진다. 손을 올려 잡아당기자 아프다. 새 늑대 귀가 생겼다.", "gold");
					if (V.settings.pubicHairEnabled === true) element("span", "음부에도 길고 복슬복슬한 털이 자란 것을 알아차린다.");
					break;
				case "wolfUp5":
					element("span", "허리 아래가 가렵다.", "gold");
					break;
				case "wolfUp6":
					element("span", "엉덩이가 평소보다 묵직하다. 뒤로 손을 뻗자 새 늑대 꼬리가 만져진다.", "gold");
					fragment.append(wikifier("earnFeat", "'Wolf'"));
					break;
				case "wolfDown0":
					element("span", "치통이 멎었다.", "gold");
					break;
				case "wolfDown1":
					element("span", "송곳니가 평범한 이빨로 돌아왔다.", "gold");
					break;
				case "wolfDown2":
					element("span", `두피${V.settings.pubicHairEnabled === true ? "와 음부가" : "가"} 더는 가렵지 않다.`, "gold");
					break;
				case "wolfDown3":
					element("span", `늑대 귀${V.settings.pubicHairEnabled === true ? "와 여분의 체모" : ""}가 사라졌다.`, "gold");
					break;
				case "wolfDown4":
					element("span", "허리 아래의 가려움이 멎었다.", "gold");
					break;
				case "wolfDown5":
					element("span", "균형감각이 달라진 것 같다. 늑대 꼬리가 사라졌다.", "gold");
					break;
				case "catUp1":
					element("span", "이상한 치통이 느껴진다. 딱정벌레 하나가 기어 지나간다. 달려들고 싶은 충동을 참는다.", "gold");
					break;
				case "catUp2":
					element("span", "입안이 달라진 것 같다. 입안을 더듬던 혀가 새 송곳니에 닿자 얼굴을 찡그린다.", "gold");
					break;
				case "catUp3":
					element("span", "두피가 가렵다.", "gold");
					break;
				case "catUp4":
					element("span", "두피가 꿈틀거린다. 손을 올리자 새 고양이 귀 한 쌍이 만져진다.", "gold");
					break;
				case "catUp5":
					element("span", "허리 아래가 가렵다.", "gold");
					break;
				case "catUp6":
					element("span", "엉덩이가 묵직하면서도 완벽히 균형 잡힌 느낌이다. 뒤로 손을 뻗자 새 고양이 꼬리가 만져진다.", "gold");
					fragment.append(wikifier("earnFeat", "'Neko'"));
					break;
				case "catUp7":
					element("span", "눈이 가렵다.", "gold");
					break;
				case "catUp8":
					element("span", "동공 주변이 타는 듯해 눈물이 난다.", "gold");
					break;
				case "catUp9":
					element("span", "무슨 알레르기 때문인지 눈이 화끈거린다. 간신히 눈을 뜨고 있을 수 있다.", "gold");
					break;
				case "catUp10":
					element(
						"span",
						"눈의 화끈거림이 사라졌다. 이른 아침의 어둠 속에서도 주변 풍경의 세세한 부분까지 알아볼 수 있다.",
						"gold"
					);
					break;
				case "catDown0":
					element("span", "치통이 멎었다.", "gold");
					break;
				case "catDown1":
					element("span", "송곳니가 평범한 이빨로 돌아왔다.", "gold");
					break;
				case "catDown2":
					element("span", "두피가 더는 가렵지 않다.", "gold");
					break;
				case "catDown3":
					element("span", "고양이 귀가 사라졌다.", "gold");
					break;
				case "catDown4":
					element("span", "허리 아래의 가려움이 멎는다.", "gold");
					break;
				case "catDown5":
					element("span", "고양이 꼬리가 사라진다.", "gold");
					break;
				case "catDown6":
					element("span", "눈이 더는 가렵지 않다. 알레르기였나 보다.", "gold");
					break;
				case "catDown7":
					element("span", "눈이 주변의 세부를 덜 포착한다.", "gold");
					break;
				case "catDown9":
					element("span", "주변이 전보다 어둡게 보인다.", "gold");
					break;
				case "cowUp1":
					element("span", "풀을 우물거리고 싶은 이상한 충동이 든다.", "gold");
					break;
				case "cowUp2":
					element("span", "두피가 가렵다. 손을 올려 보니 작은 뿔 한 쌍이 돋아났다.", "gold");
					break;
				case "cowUp3":
					element("span", "귀가 따끔거린다.", "gold");
					break;
				case "cowUp4":
					element(
						"span",
						"귀가 가렵다. 긁으려고 손을 올리자 생각보다 훨씬 커져 있음을 깨닫는다. 소 귀 한 쌍이 자랐다.",
						"gold"
					);
					break;
				case "cowUp5":
					element("span", "허리 아래가 따끔거린다.", "gold");
					break;
				case "cowUp6":
					element(
						"span",
						"엉덩이가 평소보다 묵직하다. 뒤로 손을 뻗자 새 소 꼬리가 만져진다. 음메 하고 울고 싶은 충동을 억누른다.",
						"gold"
					);
					fragment.append(wikifier("earnFeat", "'Cattle'"));
					break;
				case "cowDown0":
					element("span", "풀이 더는 그렇게 맛있어 보이지 않는다.", "gold");
					break;
				case "cowDown1":
					element("span", "작은 뿔이 사라졌다.", "gold");
					break;
				case "cowDown2":
					element("span", "귀가 더는 따끔거리지 않는다.", "gold");
					break;
				case "cowDown3":
					element("span", "소 귀가 사라졌다.", "gold");
					break;
				case "cowDown4":
					element("span", "허리 아래의 따끔거림이 멎었다.", "gold");
					break;
				case "cowDown5":
					element("span", "균형감각이 달라진 것 같다. 소 꼬리가 사라졌다.", "gold");
					break;
				case "harpyUp1":
					element("span", "시야가 더 선명하게 느껴진다.", "gold");
					break;
				case "harpyUp2":
					element("span", "눈이 이상하게 느껴진다. 시력이 좋아졌다.", "gold");
					break;
				case "harpyUp3":
					element(
						"span",
						`허리 아래와 목이 가렵다. ${
							V.loveInterest.primary !== "None"
								? `생각은 ${
										["Black Wolf", "Great Hawk"].includes(V.loveInterest.primary)
											? `그 ${window.KR.gatPersonNameDictKR(V.loveInterest.primary)},`
											: `${window.KR.gatPersonNameDictKR(V.loveInterest.primary)},`
								  }에게로 향하고, 그와 함께 있고 싶은 원초적이고 거의 동물적인 충동이 든다.`
								: "함께할 진정한 짝을 갑자기 갈망한다."
						}`,
						"gold"
					);
					break;
				case "harpyUp4":
					element("span", "엉덩이가 가벼워진 것 같다. 뒤로 손을 뻗자 깃털 달린 꼬리가 잡힌다. 목을 작은 깃털들이 덮고 있다.", "gold");
					break;
				case "harpyUp5":
					element("span", `등${V.settings.pubicHairEnabled === true ? "과 음부가" : "이"} 가렵다.`, "gold");
					break;
				case "harpyUp6":
					element(
						"span",
						`깃털처럼 몸이 가볍다. 날개가 얼굴을 어루만진다.${
							V.settings.pubicHairEnabled === true ? " 음부에 짧고 깃털 같은 털이 자란 것도 알아차린다." : ""
						}`,
						"gold"
					);
					fragment.append(wikifier("earnFeat", "'Harpy'"));
					break;
				case "harpyDown0":
					element("span", "시야가 정상으로 돌아왔다.", "gold");
					break;
				case "harpyDown1":
					element("span", "시야가 더는 그렇게 선명하지 않다.", "gold");
					break;
				case "harpyDown2":
					element("span", "허리 아래와 목의 가려움이 모두 멎고, 더는 그토록 열렬히 짝을 갈망하지 않는다.", "gold");
					break;
				case "harpyDown3":
					element("span", "목의 깃털과 함께 깃털 달린 꼬리가 사라졌다.", "gold");
					break;
				case "harpyDown4":
					element("span", `몸이 더 무겁게 느껴진다${V.settings.pubicHairEnabled === true ? ", 그리고 음부가 더는 가렵지 않다" : ""}.`, "gold");
					break;
				case "harpyDown5":
					element(
						"span",
						`몸이 더 무겁게 느껴진다. 깃털 달린 날개${V.settings.pubicHairEnabled === true ? "와 깃털 같은 음모" : ""}가 사라졌다.`,
						"gold"
					);
					break;
				case "foxUp1":
					element("span", "이상한 치통이 느껴지고, 눈은 조금 더 예리해진 것 같다. 무언가를 훔치고 싶은 충동이 든다.", "gold");
					break;
				case "foxUp2":
					element(
						"span",
						"입과 눈이 달라진 것 같다. 입안을 더듬던 혀가 새 송곳니에 닿자 낑 하고 소리가 새어 나온다.",
						"gold"
					);
					break;
				case "foxUp3":
					element(
						"span",
						`두피가 가렵다. ${
							V.loveInterest.primary !== "None"
								? `생각은 ${
										["Black Wolf", "Great Hawk"].includes(V.loveInterest.primary)
											? `그 ${window.KR.gatPersonNameDictKR(V.loveInterest.primary)},`
											: `${window.KR.gatPersonNameDictKR(V.loveInterest.primary)},`
								  }에게로 향하고, 그와 함께 있고 싶은 원초적이고 거의 동물적인 충동이 든다.`
								: "함께할 진정한 짝을 갑자기 갈망한다."
						}`,
						"gold"
					);
					break;
				case "foxUp4":
					element("span", "머리 위에 무언가가 느껴진다. 손을 올려 새 여우 귀 한 쌍을 만지자, 귀가 반응하듯 움찔거린다.", "gold");
					break;
				case "foxUp5":
					element(
						"span",
						"허리 아래가 가렵다. 누군가에게 긁어 달라고 하고 싶은 충동이 든다. 눈가에 이상한 변색이 생긴 것도 알아차린다.",
						"gold"
					);
					break;
				case "foxUp6":
					element(
						"span",
						"엉덩이가 평소보다 묵직하다. 살짝 흔들어 보자 새 여우 꼬리가 느껴진다. 만지면 아주 안정되는 기분이다.",
						"gold"
					);
					fragment.append(wikifier("specialClothesUnlock", "'set'", "'shrine'"));
					fragment.append(wikifier("earnFeat", "'Fox'"));
					break;
				case "foxDown0":
					element("span", "치통이 멎었다.", "gold");
					break;
				case "foxDown1":
					element("span", "송곳니가 평범한 이빨로 돌아오고, 시야가 둔해진 것 같다.", "gold");
					break;
				case "foxDown2":
					element("span", "두피가 더는 가렵지 않고, 더는 그토록 열렬히 짝을 갈망하지 않는다.", "gold");
					break;
				case "foxDown3":
					element("span", "여우 귀가 사라졌다.", "gold");
					break;
				case "foxDown4":
					element("span", "허리 아래의 가려움이 멎고, 눈가의 변색도 사라졌다.", "gold");
					break;
				case "foxDown5":
					element("span", "균형감각이 달라진 것 같다. 여우 꼬리가 사라졌다.", "gold");
					break;
				// Clothes
				case "bimboMessage1":
					element(
						"span",
						`어딘가 달라진 것 같지만, 무엇이 어떻게 달라졌는지는 알 수 없다.${
							V.worn.upper.type.includesAny("bimbo", "pimp") ||
							V.worn.lower.type.includesAny("bimbo", "pimp") ||
							V.worn.feet.type.includes("bimbo") ||
							V.worn.head.type.includes("pimp")
								? " 옷이 몸에 달라붙는 것 같다."
								: ""
						}`,
						"lewd"
					);
					break;
				case "pimpMessage1":
					element(
						"span",
						`어딘가 달라진 것 같지만, 무엇이 어떻게 달라졌는지는 알 수 없다.${
							V.worn.upper.type.includes("pimp") || V.worn.lower.type.includes("pimp") || V.worn.head.type.includes("pimp")
								? " 옷을 만지면 따뜻하게 느껴진다."
								: ""
						}`,
						"lewd"
					);
					break;
				case "bimboMessage2":
					element(
						"span",
						`또다시 달라진 느낌이 든다. 이번에는 좀 더 확실하다. 무언가가 당신을 더 여성스럽게 보이게 만들고 있다. 당신은 ${
							V.worn.upper.type.includes("bimbo") || V.worn.lower.type.includes("bimbo") || V.worn.feet.type.includes("bimbo")
								? "지금 입고 있는 옷이 마음에 든다."
								: "아까 입고 있던 옷이 마음에 든다."
						}`,
						"lewd"
					);
					break;
				case "pimpMessage2":
					element(
						"span",
						`또다시 달라진 느낌이 든다. 이번에는 좀 더 확실하다. 무언가가 당신을 더 남성스럽게 보이게 만들고 있다. 당신은 ${
							V.worn.upper.type.includes("pimp") || V.worn.lower.type.includes("pimp") || V.worn.head.type.includes("pimp")
								? "지금 입고 있는 옷이 마음에 든다."
								: "아까 입고 있던 옷이 마음에 든다."
						}`,
						"lewd"
					);
					break;
				case "bimboMessage3":
					element(
						"span",
						"내면에서 이상한 갈망이 자라나고, 깊은 욕망이 차오른다. 곧 견딜 수 없는 욕정이 당신을 사로잡는다.",
						"lewd"
					);
					break;
				// Feats
				case "heroicVictory":
					fragment.append(wikifier("earnFeat", "'Heroic Victory'"));
					break;
				case "dawnToDusk":
					fragment.append(wikifier("earnFeat", "'Dawn to Dusk'"));
					break;
				case "adultShopContribution":
					if (V.adultshopcontribution) fragment.append(wikifier("earnFeat", "'Opened Pandoras Box'"));
					if (V.adultshopcontribution >= 12) fragment.append(wikifier("earnFeat", "'Opened Pandoras Cocks'"));
					break;
				case "valentinesTomorrow":
					sWikifier(
						`<span class="gold">내일은 발렌타인 데이다. 특별한 사람과 소중한 시간을 보내는 일이 기대된다.</span> <<stress -6>><<lstress>><<trauma -6>><<ltrauma>>`
					);
					br();
					break;
				case "valentinesToday":
					sWikifier(
						`<span class="gold">오늘은 발렌타인 데이다. 오늘 특별한 사람과 소중한 시간을 보내는 일이 기대된다. 그렇게 하면 평소보다 더 큰 보상이 있을 것 같은 예감이 든다.</span> <<stress -6>><<lstress>><<trauma -6>><<ltrauma>>`
					);
					br();
					break;
				default:
					// Report error
					errors.pushUnique(messageKey);
					break;
			}
		});
		if (errors.length) Errors.report("완전히 구현되지 않았거나 잘못된 시간 메시지 키가 발견되었습니다", errors);
		V.timeMessages = [];
	}

	sWikifier("<<integritycheck>><<exposure>>");

	V.orgasmdown -= 1;

	if (V.exposed >= 1 && V.exposedcheck === 1) {
		V.exposedcheck = 0;
		sWikifier("자신의 <<nudity>>【이가】 신경 쓰인다.");
		br();
	}

	if (V.timer >= 1) V.timer--;
	// V.turnCount++;

	sWikifier("<<bindings>>");

	if (V.worn.genitals.cursed === 1 && V.worn.genitals.integrity <= 0) V.worn.genitals.type.push("broken");

	sWikifier("<<exposure>>");

	if (V.combat) sWikifier("<<pass 10 seconds>>");

	if (fragment.children.length) br();

	V.menu = 0;

	if (V.combat === 0 && V.ironmanmode === true) IronMan.scheduledSaves();

	return fragment;
}

Macro.add("effects", {
	handler() {
		const fragment = effects();
		this.output.append(fragment);
	},
});
