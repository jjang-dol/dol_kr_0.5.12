/*
	Old version can be found at https://gitgud.io/Vrelnir/degrees-of-lewdity/-/blob/master/game/special-masturbation/effects.twee?ref_type=7f47147b
*/
function masturbationEffects() {
	const fragment = document.createDocumentFragment();
	const br = () => document.createElement("br");
	const span = (text, colour) => {
		if (T.noMasturbationOutput) return "";
		const element = document.createElement("span");
		if (colour) element.classList.add(colour);
		element.textContent = text;
		return element;
	};
	const sWikifier = text => {
		if (T.noMasturbationOutput) return;
		fragment.append(Wikifier.wikifyEval(text));
	};
	const otherElement = (tag, text, colour) => {
		if (T.noMasturbationOutput) return "";
		const element = document.createElement(tag);
		if (colour) element.classList.add(colour);
		element.textContent = text;
		return element;
	};
	const genitalsExposed = () => V.worn.over_lower.vagina_exposed >= 1 && V.worn.lower.vagina_exposed >= 1 && V.worn.under_lower.vagina_exposed >= 1;
	const breastsExposed = () => V.worn.over_upper.exposed >= 1 && V.worn.upper.exposed >= 1 && V.worn.under_upper.exposed >= 1;

	const playerToys = listUniqueCarriedSextoys().filter(
		toy => (V.player.penisExist && !playerChastity("penis") && toy.type.includesAny("stroker")) || toy.type.includesAny("dildo", "breastpump", "vibrator")
	);
	const selectedToy = (location, update) => {
		if (update === true) V["currentToy" + location.toLocaleUpperFirst()] = V["selectedToy" + location.toLocaleUpperFirst()];
		const toy = clone(playerToys[V["currentToy" + location.toLocaleUpperFirst()]]);
		if (update === false) V["currentToy" + location.toLocaleUpperFirst()] = "none";
		return toy;
	};
	const toyDisplay = (toy1, toy2) => {
		if (toy1 && toy2) return (toy1.colour ? setup.colourName(toy1.colour) + " " : "") + toy1.name + " 그리고 " + (toy2.colour ? setup.colourName(toy2.colour) + " " : "") + toy2.name;
		if (toy1) return (toy1.colour ? setup.colourName(toy1.colour) + " " : "") + toy1.name;
		return "";
	};

	const earSlimeDefy = () => V.earSlime.growth >= 100 && V.earSlime.defyCooldown && V.pain < V.earSlime.defyCooldown * 5;

	const otherVariables = {
		br,
		span,
		otherElement,
		genitalsExposed,
		breastsExposed,
		selectedToy,
		toyDisplay,
		earSlimeDefy,
		additionalEffect: { earSlimeDefy: [] },
	};

	if (V.player.vaginaExist) {
		otherVariables.hymenIntact = V.player.virginity.vaginal === true && V.sexStats.vagina.pregnancy.totalBirthEvents === 0;
		wikifier("vaginaWetnessCalculate");
	}
	if (V.corruptionMasturbation) {
		if (pcAreArmsBound("both")) {
			sWikifier(
				'귀 속 슬라임에 의해 당신은 팔을 묶은 구속을 풀려고 한다. 하지만 진전이 없자, <span class="blue">슬라임은 포기한다.</span><<arousal 600 "masturbation">><<stress 6>><<gstress>><<garousal>>'
			);
			fragment.append(" ");
			V.rightaction = "mrest";
			V.leftaction = "mrest";
			V.corruptionMasturbation = false;
			delete V.corruptionMasturbationCount;
		} else if (
			playerHeatMinArousal() + playerRutMinArousal() >= 3000 ||
			(playerHeatMinArousal() + playerRutMinArousal() >= 1000 && V.earSlime.growth >= 100 && V.earSlime.defyCooldown)
		) {
			sWikifier(
				'귀 속 슬라임은 지금 당신에게 자위를 강요할 가치가 없다고 느끼고, <span class="blue">당신을 놓아준다.</span>'
			);
			fragment.append(" ");
			V.corruptionMasturbation = false;
			delete V.corruptionMasturbationCount;
		} else {
			if (V.orgasmdown >= 2) {
				if (isNaN(V.corruptionMasturbationCount)) V.corruptionMasturbationCount = random(2, 6);
				if (V.corruptionMasturbationCount <= 0) {
					V.corruptionMasturbation = false;
					delete V.corruptionMasturbationCount;
					if (V.awareness < 200) {
						// Prevents the PC from continuing actions that they normally are unable to do yet
						if (V.mouth === "mpenis") {
							sWikifier(
								'<span class="green">귀 속 슬라임이 통제력을 잃자, 당신은 입에서 <<penis>>【을를】 빼내고 물러난다.</span>'
							);
							fragment.append(" ");
							V.mouthactiondefault = "rest";
							V.mouthaction = 0;
							V.mouth = 0;
							V.penisuse = 0;
						} else if (V.mouth === "mpenisentrance") {
							sWikifier('<span class="green">귀 속 슬라임이 통제력을 잃자, 당신은 <<penis>>에서 물러난다.</span>');
							fragment.append(" ");
							V.mouthactiondefault = "rest";
							V.mouthaction = 0;
							V.mouth = 0;
							V.penisuse = 0;
						} else if (V.mouth === "mchastityparasiteentrance") {
							sWikifier(
								'<span class="green">귀 속 슬라임이 통제력을 잃자, 당신은 정조대 기생충에서 물러난다.</span>'
							);
							fragment.append(" ");
							V.mouthactiondefault = "rest";
							V.mouthaction = 0;
							V.mouth = 0;
							V.penisuse = 0;
						} else if (V.mouth === "mvaginaentrance") {
							sWikifier('<span class="green">귀 속 슬라임이 통제력을 잃자, 당신은 <<pussy>>에서 물러난다.</span>');
							fragment.append(" ");
							V.mouthactiondefault = "rest";
							V.mouthaction = 0;
							V.mouth = 0;
						} else if (V.mouth === "mbreast" || V.leftarm === "mbreasthold" || V.rightarm === "mbreasthold") {
							if (V.mouth === "mbreast") {
								sWikifier(
									'<span class="green">귀 속 슬라임이 통제력을 잃자, 당신은 <<breasts>>에서 입을 뗀다.</span>'
								);
							} else {
								sWikifier(
									'<span class="green">귀 속 슬라임이 통제력을 잃자, 당신은 <<breasts>>【을를】 쥐는 것을 멈춘다.</span>'
								);
							}
							fragment.append(" ");
							if (V.mouth === "mbreast") {
								V.mouthactiondefault = "rest";
								V.mouthaction = 0;
								V.mouth = 0;
							}
							if (V.leftarm === "mbreasthold") {
								V.leftactiondefault = "rest";
								V.leftaction = 0;
								V.leftarm = 0;
							}
							if (V.rightarm === "mbreasthold") {
								V.rightactiondefault = "rest";
								V.rightaction = 0;
								V.rightarm = 0;
							}
						}
					}
				}
			}
			if (V.corruptionMasturbation) fragment.append(masturbationSlimeControl());
		}
	}

	if (V.possessed) {
		sWikifier("<<dynamicblock id=control-caption>><<controlcaption>><</dynamicblock>>");
		fragment.append(possessedMasturbation(span, br, sWikifier));
	}

	// Reset the record of the player's current actions
	V.masturbationActions = {};

	fragment.append(masturbationEffectsVaginaAnus(otherVariables));

	fragment.append(masturbationEffectsArms("left", V.leftaction === V.rightaction, otherVariables));
	fragment.append(masturbationEffectsArms("right", false, otherVariables));

	fragment.append(masturbationEffectsMouth(otherVariables));

	if (otherVariables.additionalEffect.hands === "ballplayeffects" && V.worn.genitals.name !== "chastity parasite") {
		if (V.arousal >= V.arousalmax * (4 / 5) || (V.earSlime.focus === "impregnation" && V.earSlime.growth >= 100)) {
			if (genitalsExposed()) {
				sWikifier('당신의 <<penis>>【이가】 간절하게 꿈틀대고, <span class="pink">끝에서 쿠퍼액이 새어 나온다</span>.');
			} else {
				sWikifier('당신의 <<penis>>【이가】 간절하게 꿈틀대고, <span class="pink">쿠퍼액이 <<exposedlower>> 사이로 스며 나온다.</span>');
			}
		} else if (V.arousal >= V.arousalmax * (3 / 5)) {
			if (genitalsExposed()) {
				sWikifier('당신의 <<penis>>【이가】 간절하게 꿈틀대고, <span class="pink">끝에 쿠퍼액이 맺힌다.</span>');
			} else {
				sWikifier('당신의 <<penis>>【이가】 간절하게 꿈틀대고, <span class="pink">쿠퍼액이 <<exposedlower>>에 어두운 얼룩을 만든다.</span>');
			}
		} else if (V.arousal >= V.arousalmax * (2 / 5)) {
			sWikifier("그 압박에 <<penis>>【이가】 욱신거린다.");
		} else {
			T.penisStateDescribed = true;
			sWikifier("그 압박에 <<penis>>【이가】 꿈틀거린다.");
		}
		fragment.append(" ");
	}

	if (
		V.player.penisExist &&
		otherVariables.additionalEffect.hands !== "ballplayeffects" &&
		V.arousal >= V.arousalmax * (3 / 5) &&
		V.mouth !== "mpenis" &&
		V.worn.genitals.name !== "chastity parasite"
	) {
		if (V.arousal >= V.arousalmax * (4 / 5) || (V.earSlime.focus === "impregnation" && V.earSlime.growth >= 100)) {
			if (genitalsExposed()) {
				sWikifier(
					`당신의 <<penis "strap-on">>【이가】 간절하게 꿈틀대고, <span class="pink">끝에서 쿠퍼액이 새어 나온다${
						V.bugsinside && V.player.penissize >= 0 ? " 당신 위를 기어 다니는 벌레 몇 마리를 뒤덮으며" : ""
					}.</span>`
				);
			} else {
				sWikifier('당신의 <<penis "strap-on">>【이가】 간절하게 꿈틀대고, <span class="pink">쿠퍼액이 <<exposedlower>> 사이로 스며 나온다.</span>');
			}
		} else {
			if (genitalsExposed()) {
				sWikifier(
					`당신의 <<penis "strap-on">>【이가】 간절하게 꿈틀대고, <span class="pink">끝에 쿠퍼액이 맺힌다${
						V.bugsinside && V.player.penissize >= 0 ? ", 당신 위를 기어 다니는 벌레 몇 마리를 뒤덮으며" : ""
					}.</span>`
				);
			} else {
				sWikifier('당신의 <<penis "strap-on">>【이가】 간절하게 꿈틀대고, <span class="pink">쿠퍼액이 <<exposedlower>>에 어두운 얼룩을 만든다.</span>');
			}
		}
		fragment.append(" ");
	}

	if (otherVariables.additionalEffect.earSlimeDefy.length) {
		sWikifier(
			`쾌감을 느끼려는 당신의 모든 시도가 <span class="red">고통</span>으로 바뀌어, <span class="lewd">쾌감</span>과 번갈아가며 ${formatList(
				otherVariables.additionalEffect.earSlimeDefy,
				"【와과】",
				true
			)}에 전해진다. <<gpain>>`
		);
		fragment.append(" ");
	}

	if (V.worn.genitals.name === "chastity parasite" && V.earSlime.vibration > 0) {
		if (V.earSlime.vibration > 1) wikifier("arousal", Math.clamp(25 * V.earSlime.vibration, 0, 1000), "masturbationGenital");
		if (V.earSlime.corruption < 100 && V.earSlime.vibration > 20) {
			V.earSlime.vibration = 20;
		} else if (V.earSlime.vibration > 60) {
			V.earSlime.vibration = 60;
		}

		if (V.earSlime.vibration === 1) {
			// Prevents a double message
			V.earSlime.vibration++;
		} else if (V.earSlime.vibration <= 10) {
			sWikifier('<span class="lewd">정조대 기생충이 당신의 <<penis>> 주위를 부드럽게 맥동한다.</span>');
		} else if (V.earSlime.vibration <= 20) {
			sWikifier('<span class="lewd">정조대 기생충이 당신의 <<penis>> 주위를 맥동한다.</span>');
		} else if (V.earSlime.vibration <= 30) {
			sWikifier(
				`<span class="lewd">정조대 기생충이 당신의 <<penis>>${V.mouth === "mchastityparasiteentrance" ? "와 혀" : ""} 위에서 진동한다.</span>`
			);
		} else {
			sWikifier(
				`<span class="lewd">정조대 기생충이 당신의 <<penis>>${
					V.mouth === "mchastityparasiteentrance" ? "와 혀" : ""
				}.</span>`
			);
		}
		if (V.earSlime.vibration > 1) fragment.append(" ");
	}

	if (V.player.vaginaExist && V.vaginaArousalWetness >= 60) {
		if (V.worn.under_lower.vagina_exposed && V.worn.lower.vagina_exposed) {
			wikifier("vaginaFluidPassive");
			if (T.lube_released) {
				sWikifier('<span class="pink"><<pussy>>에서 애액이 흘러나온다.</span>');
			}
		} else if (V.worn.under_lower.vagina_exposed === 0 && V.underlowerwetstage < 3) {
			sWikifier(`<span class="pink"><<pussy>>에서 애액이 흘러나와 ${V.worn.under_lower.name}【을를】 적신다.</span>`);
			wikifier("underlowerwet", 1);
		} else if (V.worn.lower.vagina_exposed === 0) {
			sWikifier(
				`<span class="pink"><<pussy>>에서 애액이 흘러나와<<if V.underlowerwet gte 60 and V.worn.under_lower.name isnot "naked">> ${V.worn.under_lower.name}에 스며들고,<</if>> ${V.worn.lower.name}【을를】 적신다.</span>`
			);
		} else {
			sWikifier('<span class="pink"><<pussy>>에서 애액이 흘러나와 옷을 적신다.</span>');
		}
		fragment.append(" ");
	}

	if (
		random(0, 100) >= Math.clamp(135 - V.earSlime.corruption / 2, 80, 98) &&
		V.earSlime.corruption > currentSkillValue("willpower") / 10 &&
		V.corruptionMasturbation === undefined &&
		!V.hypnosis_traits.silence
	) {
		V.corruptionMasturbation = true;
		V.corruptionMasturbationCount = random(1, 4);
		fragment.append(span("귀 속 슬라임은 당신이 더 즐기길 바란다고 결심한다.", "red"));
		fragment.append(" ");
	}

	fragment.append(br());
	fragment.append(br());

	if (V.masturbationAudience) {
		fragment.append(masturbationAudience());
	}

	return fragment;
}

function masturbationEffectsArms(
	arm,
	doubleAction,
	{ span, otherElement, additionalEffect, selectedToy, toyDisplay, genitalsExposed, breastsExposed, hymenIntact, earSlimeDefy }
) {
	const fragment = document.createDocumentFragment();

	const sWikifier = text => {
		if (T.noMasturbationOutput) return;
		fragment.append(Wikifier.wikifyEval(text));
	};

	const armAction = arm + "action";
	const armActionDefault = armAction + "default";
	const otherArm = arm === "left" ? "right" : "left";
	const armk = arm === "left" ? "왼" : "오른";
	const otherArmAction = otherArm + "action";

	const clearAction = defaultAction => {
		if (V[armAction] && V[armAction] !== "mrest") V.masturbationActions[armAction] = V[armAction];
		V[armActionDefault] = defaultAction !== undefined ? defaultAction : V[armAction];
		V[armAction] = 0;
		if (doubleAction) {
			V[otherArmAction + "default"] = defaultAction !== undefined ? defaultAction : V[otherArmAction];
			V[otherArmAction] = 0;
		}
	};

	if (V[armAction] === 0) return fragment;

	if (V[armAction] === "mrest") {
		if (
			random(0, 100) >= 91 &&
			V.earSlime.corruption > currentSkillValue("willpower") / 10 &&
			V.corruptionMasturbation === undefined &&
			!V.hypnosis_traits.silence
		) {
			V.corruptionMasturbation = true;
			V.corruptionMasturbationCount = random(2, 6);
			fragment.append(span("귀 속 슬라임은 당신 대신 계속하기로 정했다.", "red"));
			fragment.append(" ");
			clearAction(0);
		} else {
			clearAction();
		}
		return fragment;
	}

	// Dealing with the player's clothes, needs work; what if layer above is not exposed?
	switch (V[armAction]) {
		case "moverupper":
			clearAction("mrest");
			V.worn.over_upper.exposed = 2;
			if (V.worn.over_upper.open) {
				V.worn.over_upper.state_top = "midriff";
				sWikifier(`당신은 ${V.worn.over_upper.name}【을를】 끌어내려, <span class="lewd"><<breastsaside>>【을를】 드러낸다.</span>`);
			} else {
				V.worn.over_upper.state = "chest";
				sWikifier(`당신은 ${V.worn.over_upper.name}【을를】 끌어올려, <span class="lewd"><<breastsaside>>【을를】 드러낸다.</span>`);
			}
			wikifier("overupperstrip");
			fragment.append(" ");
			break;
		case "mupper":
			clearAction("mrest");
			V.worn.upper.exposed = 2;
			if (V.worn.upper.open) {
				V.worn.upper.state_top = "midriff";
				sWikifier(`당신은 ${V.worn.upper.name}【을를】 끌어올려, <span class="lewd"><<breastsaside>>【을를】 드러낸다.</span>`);
			} else {
				V.worn.upper.state = "chest";
				sWikifier(`당신은 ${V.worn.upper.name}【을를】 끌어올려, <span class="lewd"><<breastsaside>>【을를】 드러낸다.</span>`);
			}
			wikifier("upperstrip");
			fragment.append(" ");
			break;
		case "munder_upper":
			clearAction("mrest");
			V.worn.under_upper.exposed = 2;
			if (V.worn.under_upper.open) {
				V.worn.under_upper.state_top = "midriff";
				if (V.player.breastsize >= 3) {
					sWikifier(`당신은 ${V.worn.under_upper.name}【을를】 끌어내리고 <span class="lewd"><<breasts>>【이가】 밖으로 출렁이며 드러난다.</span>`);
				} else {
					sWikifier(`당신은 ${V.worn.under_upper.name}【을를】 끌어내려, <span class="lewd"><<breasts>>【을를】 드러낸다.</span>`);
				}
			} else {
				V.worn.under_upper.state = "chest";
				if (V.player.breastsize >= 3) {
					sWikifier(`당신은 ${V.worn.under_upper.name}【을를】 끌어올리고 <span class="lewd"><<breasts>>【이가】 밖으로 출렁이며 드러난다.</span>`);
				} else {
					sWikifier(`당신은 ${V.worn.under_upper.name}【을를】 끌어올려, <span class="lewd"><<breasts>>【을를】 드러낸다.</span>`);
				}
			}
			wikifier("underupperstrip");
			fragment.append(" ");
			break;
		case "moverlower":
			clearAction("mrest");
			V.worn.over_lower.anus_exposed = 1;
			V.worn.over_lower.vagina_exposed = 1;
			V.worn.over_lower.exposed = 2;
			if (setup.clothes.over_lower[clothesIndex("over_lower", V.worn.over_lower)].skirt) {
				V.worn.over_lower.skirt_down = 0;
				sWikifier(`당신은 ${V.worn.over_lower.name}【을를】 들어 올려, <span class="lewd"><<exposedlower>>【을를】 드러낸다.</span>`);
			} else {
				V.worn.over_lower.state = "thighs";
				sWikifier(`당신은 ${V.worn.over_lower.name}【을를】 끌어내려, <span class="lewd"><<exposedlower>>【을를】 드러낸다.</span>`);
			}
			wikifier("overlowerstrip");
			fragment.append(" ");
			break;
		case "mlower":
			clearAction("mrest");
			V.worn.lower.anus_exposed = 1;
			V.worn.lower.vagina_exposed = 1;
			V.worn.lower.exposed = 2;
			if (setup.clothes.lower[clothesIndex("lower", V.worn.lower)].skirt) {
				V.worn.lower.skirt_down = 0;
				sWikifier(`당신은 ${V.worn.lower.name}【을를】 들어 올려, <span class="lewd"><<undies>>【을를】 드러낸다.</span>`);
			} else {
				V.worn.lower.state = "thighs";
				sWikifier(`당신은 ${V.worn.lower.name}【을를】 끌어내려, <span class="lewd"><<undies>>【을를】 드러낸다.</span>`);
			}
			wikifier("lowerstrip");
			fragment.append(" ");
			break;
		case "munder":
			clearAction("mrest");
			V.worn.under_lower.anus_exposed = 1;
			V.worn.under_lower.vagina_exposed = 1;
			V.worn.under_lower.state = "thighs";
			V.worn.under_lower.exposed = 2;
			sWikifier(`당신은 ${V.worn.under_lower.name}【을를】 끌어내려, <span class="lewd"><<genitals>>【을를】 드러낸다.</span>`);
			wikifier("underlowerstrip");
			fragment.append(" ");
			break;
	}
	if (V[armAction] === 0) return fragment;

	// Action Corrections
	if (V.mouth === "mpenis" || V.mouthaction === "mpenistakein" || V.mouthaction === "mpenissuck") {
		// If your mouth is on your penis, your hands should not have access to your glans
		if (V[armAction] === "mpenisglans") {
			V[armAction] = "mpenisshaft";
			if (doubleAction) V[otherArmAction] = "mpenisshaft";
		}
	}
	if (V.vaginaaction === "mpenisflowerpenetrate" || V.vaginause === "mpenisflowerpenetrate") {
		// If the player vaginally penetrates the phallus flower
		if (V[armAction] === "mvagina") {
			if (V.player.penisExist || V.parasite.clit.name) {
				V[armAction] = "mvaginarub";
				if (doubleAction) V[otherArmAction] = "mvaginarub";
			} else {
				V[armAction] = "mvaginaclit";
				if (doubleAction) V[otherArmAction] = "mvaginaclit";
			}
		}
		if (V.mouthaction === "mvaginaentrance") {
			V.mouthactiondefault = "mrest";
			V.mouthaction = 0;
		}
		if (V.mouth === "mvaginaentrance") {
			V.mouthactiondefault = "mrest";
			V.mouthaction = 0;
			V.mouth = 0;
			fragment.append(span("보지에서 입을 뗀다."));
		}
		if (V[armAction] === "mvaginatease") {
			clearAction("mrest");
			V[arm + "arm"] = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				fragment.append(span("보지에서 손가락들을 뺀다."));
			} else {
				fragment.append(span("보지에서 손가락을 뺀다."));
			}
			fragment.append(" ");
		}
	}
	if (V.anusaction === "mpenisflowerpenetrate" || V.anususe === "mpenisflowerpenetrate") {
		// If the player anally penetrates the phallus flower
		if (V[armAction] === "manus") {
			V[armAction] = "manusrub";
			if (doubleAction) V[otherArmAction] = "manusrub";
		}
		if (V[armAction] === "manustease" || V[armAction] === "manusprostate") {
			clearAction("mrest");
			V[arm + "arm"] = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				fragment.append(span("항문에서 손가락들을 뺀다."));
			} else {
				fragment.append(span("항문에서 손가락을 뺀다."));
			}
			fragment.append(" ");
		}
	}
	if (V.ballssize <= 2 && ((V[arm + "arm"] === "mballs" && V[otherArm + "arm"] === "mballs") || (doubleAction && V[armAction] === "mballsentrance"))) {
		// Tiny balls are too small for both hands
		V.rightactiondefault = "mrest";
		V.rightaction = 0;
		V.rightarm = 0;
		doubleAction = false;
	}
	if (V[armAction] === "mpickupdildo") {
		const currentlySelectedToy = V["selectedToy" + (arm === "left" ? "Left" : "Right")];
		if (
			currentlySelectedToy === V["currentToy" + (arm === "left" ? "Right" : "Left")] ||
			currentlySelectedToy === V.currentToyVagina ||
			currentlySelectedToy === V.currentToyAnus
		) {
			// The player can only a toy in one type of action
			V[armAction] = 0;
			doubleAction = false;
		}
	}
	if (V[armAction] === "mpickupdildo" && V[otherArmAction] === "mpickupdildo" && V.selectedToyLeft === V.selectedToyRight) {
		// The player can only pick up a toy with one hand
		V.rightaction = 0;
		doubleAction = false;
	}
	if (V[armAction] === "mvagina" && doubleAction) {
		// The player can only finger themself with one hand
		V.rightaction = "mvaginarub";
		doubleAction = false;
	}

	// The player can decided to put in more than 1 finger at once
	if (["mvaginafingerstarttwo", "mvaginafingeraddtwo"].includes(V[armAction])) {
		V.mVaginaFingerAdd = 2;
		V[armAction] = V[armAction] === "mvaginafingeraddtwo" ? "mvaginafingeradd" : "mvagina";
	} else if (["mvaginafingeradd", "mvagina"].includes(V[armAction])) {
		V.mVaginaFingerAdd = 1;
	}

	// The player is unable to ride multiple dildo's in their vagina or anus at once
	if (doubleAction && V[armAction] === "mvaginaentrancedildofloor") {
		V.rightactiondefault = "mrest";
		V.rightaction = "mrest";
		doubleAction = false;
	}
	if (doubleAction && V[armAction] === "manusentrancedildofloor") {
		V.rightactiondefault = "mrest";
		V.rightaction = "mrest";
		doubleAction = false;
	}

	// The player is unable to use a dildo on their vagina/anus when using a dildo on the floor
	if (
		["mvaginaentrancedildofloor", "manusentrancedildofloor"].includes(V.leftaction) ||
		["mvaginaentrancedildofloor", "manusentrancedildofloor"].includes(V.rightaction)
	) {
		if (["mvaginaentrancedildo", "manusentrancedildo"].includes(V.leftaction)) {
			V.leftaction = "mrest";
			V.leftactiondefault = "mrest";
		}
		if (["mvaginaentrancedildo", "manusentrancedildo"].includes(V.rightaction)) {
			V.rightaction = "mrest";
			V.rightactiondefault = "mrest";
		}
	}
	if (V.vaginause === "mdildopenetrate" || V.anususe === "mdildopenetrate") {
		if (["mvaginaentrancedildo", "mvaginadildo", "manusentrancedildo", "manusdildo"].includes(V.leftarm)) {
			if (V.leftarm.includes("vagina")) {
				fragment.append(span(`닿기 어렵다는 것을 깨닫고, ${toyDisplay(selectedToy("left"))}【을를】 보지에서 뗀다.`, "red"));
			} else {
				fragment.append(span(`닿기 어렵다는 것을 깨닫고, ${toyDisplay(selectedToy("left"))}【을를】 항문에서 뗀다.`, "red"));
			}
			fragment.append(" ");
			V.leftarm = "mpickupdildo";
			V.leftaction = "mrest";
			V.leftactiondefault = "mrest";
		}
		if (["mvaginaentrancedildo", "mvaginadildo", "manusentrancedildo", "manusdildo"].includes(V.rightarm)) {
			if (V.rightarm.includes("vagina")) {
				fragment.append(span(`닿기 어렵다는 것을 깨닫고, ${toyDisplay(selectedToy("right"))}【을를】 보지에서 뗀다.`, "red"));
			} else {
				fragment.append(span(`닿기 어렵다는 것을 깨닫고, ${toyDisplay(selectedToy("right"))}【을를】 항문에서 뗀다.`, "red"));
			}
			fragment.append(" ");
			V.rightarm = "mpickupdildo";
			V.rightaction = "mrest";
			V.rightactiondefault = "mrest";
		}
	}

	if (V[armAction] === "mrest") return fragment;
	// End of Action Corrections

	// Action setup
	let handsOn = doubleAction ? 2 : 1;
	const altText = {};

	wikifier("ballsize");
	let balls = T.text_output + " ";
	wikifier("testicles");
	balls += T.text_output;

	// Dealing with the player's actions
	switch (V[armAction]) {
		case "msemencover":
			clearAction("mrest");
			fragment.append(span("정액을 조금 모아 손가락 사이에 문지른다."));
			V[arm + "FingersSemen"] = 1;
			if (doubleAction) V[otherArm + "FingersSemen"] = 1;
			wikifier("arousal", 100, "masturbation");
			break;
		case "mchest":
			wikifier("playWithBreasts", handsOn);
			wikifier("milkvolume", handsOn);
			wikifier("arousal", 100 * handsOn, "masturbationBreasts");

			// The text output currently does not care which hand is used or if both hands are used
			if (V.worn.over_upper.exposed >= 2 && V.worn.upper.exposed >= 2 && V.worn.under_upper.exposed >= 1) {
				wikifier("arousal", 100 * handsOn, "masturbationBreasts");
				if (V.lactating && V.settings.breastFeedingEnabled === true && V.bugsinside) {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						sWikifier(
							"당신은 견딜 수 있는 만큼 <<breasts>>【을를】 쥐어짜, 몸 위를 기어 다니는 벌레들을 위해 최대한 젖을 짜낸다."
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						sWikifier("몸 위를 기어 다니는 수많은 벌레들이 유두에 닿게 둔 채, 당신은 <<breasts>>【을를】 만지작거린다.");
					} else {
						sWikifier("벌레들이 몸 위를 기어 다니는 와중에도 음란한 열기가 커지는 것을 느끼며, 당신은 <<breasts>>【을를】 쓸어내린다.");
					}
				} else if (V.player.breastsize <= 2) {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						fragment.append(
							span(
								"당신은 견딜 수 있는 만큼 예민한 유두를 희롱하고, 손가락이 스칠 때마다 흥분의 전율이 온몸을 타고 흐른다."
							)
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						sWikifier(
							"당신은 손가락으로 유륜 주위를 빙글빙글 돌리며 <<breasts>>【을를】 만지작거리고, 가끔 유두를 살짝 비튼다."
						);
					} else {
						sWikifier("당신은 <<breasts>>【을를】 쓸어내리고 손가락 사이로 유두를 문지르며, 음란한 열기가 커지는 것을 느낀다.");
					}
				} else if (V.player.breastsize <= 5) {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						sWikifier(
							"당신은 <<breasts>>【을를】 감싸 쥐고 견딜 수 있는 만큼 예민한 유두를 희롱한다. 손가락이 스칠 때마다 흥분의 전율이 온몸을 타고 흐른다."
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						sWikifier(
							"당신은 손가락으로 유륜 주위를 빙글빙글 돌리며 <<breasts>>【을를】 만지작거리고, 가끔 유두를 살짝 비튼다."
						);
					} else {
						sWikifier("당신은 <<breasts>>【을를】 쓸어내리고 손가락 사이로 유두를 문지르며, 음란한 열기가 커지는 것을 느낀다.");
					}
				} else {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						sWikifier(
							"당신은 <<breasts>>【을를】 감싸 쥐고 견딜 수 있는 만큼 예민한 유두를 희롱한다. 손가락이 스칠 때마다 흥분의 전율이 온몸을 타고 흐른다."
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						sWikifier(
							"당신은 손가락으로 유륜 주위를 빙글빙글 돌리며 <<breasts>>【을를】 만지작거리고, 가끔 유두를 살짝 비튼다."
						);
					} else {
						sWikifier("당신은 <<breasts>>【을를】 쓸어내리고 손가락 사이로 유두를 문지르며, 음란한 열기가 커지는 것을 느낀다.");
					}
				}
			} else {
				if (V.player.breastsize <= 2) {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						sWikifier(
							"<<nipples>>【은는】 <<top>> 천에 눌려 꼿꼿이 서서 관심을 갈구한다. 당신은 견딜 수 있는 만큼 그것들을 비틀고 희롱한다."
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						sWikifier("당신은 <<breasts>>【을를】 만지작거리고 <<top>> 너머로 유두를 비튼다.");
					} else {
						sWikifier(
							"당신은 <<breasts>>【을를】 쓸어내리고 손가락 사이로 유두를 문지른다. <<topaside>>【이가】 가로막고 있어도 기분 좋다."
						);
					}
				} else if (V.player.breastsize <= 5) {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						sWikifier(
							"유두가 <<top>> 천에 눌려 꼿꼿이 서서 관심을 갈구한다. 당신은 <<breasts>>【을를】 감싸 쥐고 견딜 수 있는 만큼 예민한 돌기를 희롱한다."
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						sWikifier("당신은 <<breasts>>【을를】 만지작거리고 <<top>> 너머로 유두를 비튼다.");
					} else {
						sWikifier(
							"당신은 <<breasts>>【을를】 쓸어내리고 손가락 사이로 유두를 문지른다. <<topaside>>【이가】 가로막고 있어도 기분 좋다."
						);
					}
				} else {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						sWikifier(
							"유두가 <<top>> 천에 눌려 꼿꼿이 서서 관심을 갈구한다. 당신은 <<breasts>>【을를】 감싸 쥐고 견딜 수 있는 만큼 예민한 돌기를 희롱한다."
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						sWikifier("당신은 <<breasts>>【을를】 만지작거리고 <<top>> 너머로 유두를 비튼다.");
					} else {
						sWikifier(
							"당신은 <<breasts>>【을를】 쓸어내리고 손가락 사이로 유두를 문지른다. <<topaside>>【이가】 가로막고 있어도 기분 좋다."
						);
					}
				}
			}
			fragment.append(" ");
			if (V.lactating === 1 && V.settings.breastFeedingEnabled === true && handsOn > 0) {
				if (V.milk_amount >= 1) {
					if (V.worn.over_upper.exposed === 0 || V.worn.upper.exposed === 0 || V.worn.under_upper.exposed === 0) {
						fragment.append(span("젖꼭지에서 모유가 새어 나와 상의 안으로 흘러든다.", "lewd"));
						if (V.masturbation_bowl === 1) fragment.append(otherElement("i", " 젖을 모으고 싶다면 상의를 벗어야 한다."));
					} else {
						fragment.append(span("돌기에서 젖이 새어 나온다.", "lewd"));
					}
					fragment.append(" ");
					fragment.append(wikifier("breastfeed", handsOn));
				} else {
					fragment.append(span("젖꼭지에서 모유는 새어 나오지 않는다. 말라 있는 모양이다."));
				}
			}
			clearAction(); // Needs to run after any breastfeed widget
			break;
		case "mbreasthold":
			clearAction("mbreastfondle");
			V[arm + "arm"] = "mbreasthold";
			if (doubleAction) V[otherArm + "arm"] = "mbreasthold";
			wikifier("arousal", 50 * handsOn, "masturbationBreasts");
			if (V.mouthaction === "mbreastentrance") {
				// Should only be reachable with a single action
				fragment.append(Wikifier.wikifyEval(`당신은 다른 <<breasts>>【을를】 붙잡고 입가로 끌어올린다.`));
			} else {
				fragment.append(Wikifier.wikifyEval(`당신은 ${doubleAction ? "양쪽 <<breasts>>" : "<<breasts>>"}【을를】 붙잡는다.`));
			}
			break;
		case "mbreastfondle":
			if (V.mouthaction === "mbreastentrance") {
				// Player briefly stops fondling their breasts
			} else {
				wikifier("playWithBreasts", handsOn);
				wikifier("milkvolume", handsOn);
				wikifier("arousal", 100 * handsOn, "masturbationBreasts");
				if (V.worn.over_upper.exposed >= 2 && V.worn.upper.exposed >= 2 && V.worn.under_upper.exposed >= 1) {
					wikifier("arousal", 150 * handsOn, "masturbationBreasts");
					if (V.lactating && V.settings.breastFeedingEnabled === true && V.bugsinside) {
						if (V.arousal >= (V.arousalmax / 5) * 4) {
							sWikifier(
								"당신은 감싸 쥔 <<breasts>>【을를】 견딜 수 있는 만큼 쥐어짜, 몸 위를 기어 다니는 벌레들을 위해 최대한 젖을 짜낸다."
							);
						} else if (V.arousal >= (V.arousalmax / 5) * 3) {
							sWikifier("몸 위를 기어 다니는 수많은 벌레들이 유두에 닿게 둔 채, 당신은 감싸 쥔 <<breasts>>【을를】 만지작거린다.");
						} else {
							sWikifier("벌레들이 몸 위를 기어 다니는 와중에도 음란한 열기가 커지는 것을 느끼며, 당신은 감싸 쥔 <<breasts>>【을를】 쓸어내린다.");
						}
					} else {
						if (V.arousal >= (V.arousalmax / 5) * 4) {
							fragment.append(
								span(
									"당신은 견딜 수 있는 만큼 예민한 가슴과 유두를 쥐어짜고, 그때마다 흥분의 전율이 온몸을 타고 흐른다."
								)
							);
						} else if (V.arousal >= (V.arousalmax / 5) * 3) {
							sWikifier("당신은 감싸 쥔 <<breasts>>【을를】 쥐어짜며 가끔 유두를 살짝 비튼다.");
						} else {
							sWikifier("당신은 감싸 쥔 <<breasts>>【을를】 만지작거리고 손가락 사이로 유두를 문지르며, 음란한 열기가 커지는 것을 느낀다.");
						}
					}
				} else {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						sWikifier(
							"유두가 <<top>> 천에 눌려 꼿꼿이 서서 관심을 갈구한다. 당신은 <<breasts>>【을를】 감싸 쥐고 견딜 수 있는 만큼 예민한 <<breasts>>【와과】 유두를 쥐어짠다."
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						sWikifier("당신은 감싸 쥔 <<breasts>>【을를】 쥐어짜고 <<top>> 너머로 유두를 비튼다.");
					} else {
						sWikifier(
							"당신은 감싸 쥔 <<breasts>>【을를】 만지작거리고 손가락 사이로 유두를 문지른다. <<topaside>>【이가】 가로막고 있어도 기분 좋다."
						);
					}
				}

				if (V.mouth !== "mbreast") {
					fragment.append(" ");
					if (V.lactating === 1 && V.settings.breastFeedingEnabled === true && handsOn > 0) {
						if (V.milk_amount >= 1) {
							if (V.worn.over_upper.exposed === 0 || V.worn.upper.exposed === 0 || V.worn.under_upper.exposed === 0) {
								fragment.append(span("젖꼭지에서 모유가 새어 나와 상의 안으로 흘러든다.", "lewd"));
								if (V.masturbation_bowl === 1) fragment.append(otherElement("i", " 젖을 모으고 싶다면 상의를 벗어야 한다."));
							} else {
								fragment.append(span("돌기에서 젖이 새어 나온다.", "lewd"));
							}
							fragment.append(" ");
							fragment.append(wikifier("breastfeed", handsOn * 2));
						} else {
							fragment.append(span("젖꼭지에서 모유는 새어 나오지 않는다. 말라 있는 모양이다."));
						}
					}
				}
			}
			clearAction(); // Needs to run after any breastfeed widget
			break;
		case "mbreastpinch":
			if (V.mouthaction !== "mbreastentrance") {
				clearAction();
				wikifier("playWithBreasts", handsOn);
				wikifier("arousal", 100 * handsOn, "masturbationBreasts");
				wikifier("pain", 1 * handsOn, 1);

				if (V.parasite.nipples.name) {
					wikifier("arousal", 50 * handsOn, "masturbationBreasts");
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						fragment.append(
							span(
								`당신은 ${
									handsOn > 1 ? "양쪽 " : ""
								}유두에 붙은 ${V.parasite.nipples.name}【을를】 견딜 수 있는 만큼 꼬집고 비틀고 잡아당긴다. ${handsOn > 1 ? "그것들이" : "그것이"} 더 세게 물고 늘어질수록 고통과 쾌감이 동시에 밀려온다.`
							)
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						fragment.append(
							span(`당신은 ${
									handsOn > 1 ? "양쪽 " : ""
								}유두에 붙은 ${V.parasite.nipples.name}【을를】 견딜 수 있는 만큼 꼬집는다.`)
						);
					} else {
						fragment.append(span(`당신은 ${
									handsOn > 1 ? "양쪽 " : ""
								}유두에 붙은 ${V.parasite.nipples.name}【을를】 가볍게 꼬집는다.`));
					}
				} else {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						fragment.append(
							span(
								`당신은${
									V.pain >= 40 ? " 흐르는 눈물을 최대한 무시하며" : ""
								} ${
									handsOn > 1 ? "양쪽 " : ""
								}유두를 견딜 수 있는 만큼 꼬집고, 고통과 쾌감이 뒤섞이는 감각을 즐긴다.`
							)
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						fragment.append(span(`당신은 ${
									handsOn > 1 ? "양쪽 " : ""
								}유두을 견딜 수 있는 만큼 꼬집는다.`));
					} else {
						fragment.append(span(`당신은 ${
									handsOn > 1 ? "양쪽 " : ""
								}유두을 가볍게 꼬집는다.`));
					}
				}
			} else {
				clearAction("mbreastfondle");
			}
			break;
		case "mbreaststop":
			clearAction("mrest");
			V[arm + "arm"] = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				fragment.append(span(`양쪽 가슴에서 손을 뗀다.`));
			} else {
				fragment.append(span(`${armk} 가슴에서 손을 뗀다.`));
			}

			// Deal with the player's mouth actions
			if (V[otherArm + "arm"] !== "mbreasthold") {
				if (V.mouth === "mbreast") {
					V.mouth = 0;
					V.mouthaction = "mrest";
					V.mouthactiondefault = "mrest";
				} else if (V.mouthaction === "mbreastentrance") {
					V.mouthaction = "mrest";
					V.mouthactiondefault = "mrest";
				}
			}
			break;
		case "mchastity": // Old usage
		case "mpenischastity":
		case "mvaginachastity":
			if (arm === "left" && ["mchastity", "mpenischastity", "mvaginachastity"].includes(V[otherArmAction])) {
				doubleAction = true;
				handsOn = 2;
			}
			altText.target = "<<genitals 1>>";
			if (V[armAction] !== "mchastity" && (!doubleAction || V[armAction] === V[otherArmAction])) {
				altText.target = V[armAction] === "mpenischastity" ? "<<penis>>" : "<<pussy>>";
			}
			sWikifier(
				`당신은 ${V.worn.genitals.name} 아래로 손가락을 파고들려 하지만 소용없다. ${altText.target}【은는】 손길을 갈구하며 욱신거리지만, 할 수 있는 일은 없다.<<gstress>>`
			);
			wikifier("stress", handsOn);
			clearAction();
			break;
		case "mpenisentrance":
			clearAction("mpenisglans");
			V[arm + "arm"] = "mpenisentrance";
			if (doubleAction) V[otherArm + "arm"] = "mpenisentrance";

			if (earSlimeDefy()) {
                // The text output currently does not care which hand is used or if both hands are used
                if (!V.worn.over_lower.vagina_exposed) {
                    sWikifier(`손가락으로 <<penis>>【을를】 훑는다${calculatePenisBulge() ? ", <<exposedlower>> 아래의 불룩한 윤곽이 느껴진다" : ""}.`);
                } else if (!V.worn.lower.vagina_exposed) {
                    sWikifier(`손가락으로 <<penis>>【을를】 훑는다${calculatePenisBulge() ? ", <<exposedlower>> 아래의 불룩한 윤곽이 느껴진다" : ""}.`);
                } else if (!V.worn.under_lower.vagina_exposed) {
                    sWikifier(`손가락으로 <<penis>>【을를】 훑는다${calculatePenisBulge() ? ", <<exposedlower>> 아래의 불룩한 윤곽이 느껴진다" : ""}.`);
                } else {
                    sWikifier(`손가락으로<<penis>>【을를】 훑다가 잠시 멈칫한다. <span class="red">아무것도 느껴지지 않는다.</span>`);
                }
			} else {
				wikifier("arousal", 100 * handsOn, "masturbationGenital");
				// The text output currently does not care which hand is used or if both hands are used
				if (!V.worn.over_lower.vagina_exposed) {
					sWikifier(
						`<span class="blue">당신은 <<penis>> 위로 손가락을 미끄러뜨린다${
							calculatePenisBulge() ? ", <<exposedlower>> 아래의 불룩한 윤곽이 느껴진다" : ""
						}.</span>`
					);
				} else if (!V.worn.lower.vagina_exposed) {
					sWikifier(
						`<span class="blue">당신은 <<penis>> 위로 손가락을 미끄러뜨린다${
							calculatePenisBulge() ? ", <<exposedlower>> 아래의 불룩한 윤곽이 느껴진다" : ""
						}.</span>`
					);
				} else if (!V.worn.under_lower.vagina_exposed) {
					sWikifier(
						`<span class="blue">당신은 <<penis>> 위로 손가락을 미끄러뜨린다${
							calculatePenisBulge() ? ", <<exposedlower>> 아래의 불룩한 윤곽이 느껴진다" : ""
						}.</span>`
					);
				} else {
					sWikifier('<span class="blue">당신은 <<penis>> 위로 손가락을 미끄러뜨리며 기대감에 몸을 떤다.</span>');
				}
			}
			break;
		case "mchastityparasiteentrance":
			clearAction("mchastityparasiterub");
			V[arm + "arm"] = "mchastityparasiteentrance";
			if (doubleAction) V[otherArm + "arm"] = "mchastityparasiteentrance";
			if (V.earSlime.defyCooldown) {
				// The text output currently does not care which hand is used or if both hands are used
				if (!V.worn.over_lower.vagina_exposed) {
					sWikifier(
						`<span class="blue">정조대 기생충 위로 손가락을 미끄러뜨린다${
							calculatePenisBulge() ? ", <<exposedlower>> 아래의 불룩한 윤곽이 느껴진다" : ""
						}.</span>`
					);
				} else if (!V.worn.lower.vagina_exposed) {
					sWikifier(
						`<span class="blue">정조대 기생충 위로 손가락을 미끄러뜨린다${
							calculatePenisBulge() ? ", <<exposedlower>> 아래의 불룩한 윤곽이 느껴진다" : ""
						}.</span>`
					);
				} else if (!V.worn.under_lower.vagina_exposed) {
					sWikifier(
						`<span class="blue">정조대 기생충 위로 손가락을 미끄러뜨린다${
							calculatePenisBulge() ? ", <<exposedlower>> 아래의 불룩한 윤곽이 느껴진다" : ""
						}.</span>`
					);
				} else {
					sWikifier(`당신은 정조대 기생충 위로 손가락을 미끄러뜨리다 잠깐 굳어 버린다. <span class="red">아무 감각도 느껴지지 않았다.</span>`);
				}
			} else {
				wikifier("arousal", 200 * handsOn, "masturbationGenital");
				// The text output currently does not care which hand is used or if both hands are used
				if (!V.worn.over_lower.vagina_exposed) {
					sWikifier(
						`<span class="blue">정조대 기생충 위로 손가락을 미끄러뜨린다${
							calculatePenisBulge() ? ", <<exposedlower>> 아래의 불룩한 윤곽이 느껴진다" : ""
						}.</span>`
					);
				} else if (!V.worn.lower.vagina_exposed) {
					sWikifier(
						`<span class="blue">정조대 기생충 위로 손가락을 미끄러뜨린다${
							calculatePenisBulge() ? ", <<exposedlower>> 아래의 불룩한 윤곽이 느껴진다" : ""
						}.</span>`
					);
				} else if (!V.worn.under_lower.vagina_exposed) {
					sWikifier(
						`<span class="blue">정조대 기생충 위로 손가락을 미끄러뜨린다${
							calculatePenisBulge() ? ", <<exposedlower>> 아래의 불룩한 윤곽이 느껴진다" : ""
						}.</span>`
					);
				} else {
					sWikifier('<span class="blue">당신은 정조대 기생충 위로 손가락을 미끄러뜨리며 기대감에 몸을 떤다.</span>');
				}
				if (!V.earSlime.vibration) {
					V.earSlime.vibration = 1;
					wikifier("arousal", 50, "masturbationGenital");
					sWikifier(' <span class="lewd">그것이 <<penis>> 주위에서 부드럽게 맥동하기 시작한다.</span>');
				}
			}
			break;
		case "mpenisglans":
			clearAction();
			if (earSlimeDefy()) {
				wikifier("arousal", 100 * handsOn, "masturbationPenis");
				wikifier("pain", 1);
				additionalEffect.earSlimeDefy.pushUnique(V.player.virginity.penile === true ? "virgin penis" : "penis");
				sWikifier(`무언가 느끼기 위해 억지로 포피를 거칠게 문지른다.`);
			} else if (V.earSlime.corruption >= 100 && V.earSlime.growth >= 100 && V.earSlime.focus === "impregnation") {
				wikifier("arousal", 400 * handsOn, "masturbationPenis");
				if (V.player.virginity.penile === true) {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						fragment.append(
							span(
								"당신은 쿠퍼액에 젖은 처녀 포피를 점점 더 빠르게 열심히 문지른다. 낯선 감각이 끝에서부터 온몸으로 퍼진다."
							)
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						fragment.append(
							span(
								"당신은 쿠퍼액에 젖은 처녀 포피를 엄지로 문지르고 끝을 열심히 희롱한다. 뒤로 젖힐 수는 없지만 예민하다."
							)
						);
					} else {
						fragment.append(
							span("당신은 동정 자지 끝을 손바닥에 올려놓고, 쿠퍼액에 젖은 포피를 엄지로 열심히 문지른다.")
						);
					}
				} else {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						fragment.append(
							span(
								"당신은 쿠퍼액에 젖은 포피를 열심히 젖혔다 놓으며 귀두 위로 몇 번이고 문지른다. 쾌감이 끝에서부터 온몸으로 퍼진다."
							)
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						fragment.append(span("당신은 쿠퍼액에 젖은 포피를 귀두에 열심히 문지르고 소대를 희롱한다."));
					} else {
						sWikifier("당신은 쿠퍼액에 젖은 <<penis>>【을를】 손바닥에 올려놓고 포피를 귀두에 문지른다.");
					}
				}
			} else {
				wikifier("arousal", 200 * handsOn, "masturbationPenis");
				if (handsOn === 2) {
					if (V.player.virginity.penile === true) {
						if (V.arousal >= (V.arousalmax / 5) * 4) {
							fragment.append(
								span("당신은 처녀 포피를 점점 더 빠르게 문지른다. 낯선 감각이 끝에서부터 온몸으로 퍼진다.")
							);
						} else if (V.arousal >= (V.arousalmax / 5) * 3) {
							fragment.append(
								span("당신은 처녀 포피를 엄지로 문지르고 끝을 희롱한다. 뒤로 젖힐 수는 없지만 예민하다.")
							);
						} else {
							fragment.append(span("당신은 동정 자지 끝을 손바닥에 올려놓고 엄지로 포피를 부드럽게 문지른다."));
						}
					} else {
						if (V.arousal >= (V.arousalmax / 5) * 4) {
							fragment.append(span("당신은 포피를 젖혔다 놓으며 귀두 위로 몇 번이고 문지른다."));
						} else if (V.arousal >= (V.arousalmax / 5) * 3) {
							fragment.append(span("당신은 포피를 귀두에 문지르고 소대를 희롱한다."));
						} else {
							sWikifier("당신은 <<penis>>【을를】 손바닥에 올려놓고 포피를 귀두에 문지른다.");
						}
					}
				} else {
					if (V.player.virginity.penile === true) {
						if (V.arousal >= (V.arousalmax / 5) * 4) {
							fragment.append(
								span("당신은 처녀 포피를 점점 더 빠르게 문지른다. 낯선 감각이 끝에서부터 온몸으로 퍼진다.")
							);
						} else if (V.arousal >= (V.arousalmax / 5) * 3) {
							fragment.append(
								span("당신은 처녀 포피를 엄지로 문지르고 끝을 희롱한다. 뒤로 젖힐 수는 없지만 예민하다.")
							);
						} else {
							fragment.append(span("당신은 동정 자지 끝을 손바닥에 올려놓고 엄지로 포피를 부드럽게 문지른다."));
						}
					} else {
						if (V.arousal >= (V.arousalmax / 5) * 4) {
							fragment.append(span("당신은 포피를 젖혔다 놓으며 귀두 위로 몇 번이고 문지른다."));
						} else if (V.arousal >= (V.arousalmax / 5) * 3) {
							fragment.append(span("당신은 포피를 귀두에 문지르고 소대를 희롱한다."));
						} else {
							sWikifier("당신은 <<penis>>【을를】 손바닥에 올려놓고 포피를 귀두에 문지른다.");
						}
					}
				}
			}
			break;
		case "mpenisshaft":
			clearAction();
			if (earSlimeDefy()) {
				wikifier("arousal", 100 * handsOn, "masturbationPenis");
				wikifier("pain", 1);
				additionalEffect.earSlimeDefy.pushUnique(V.player.virginity.penile === true ? "virgin penis" : "penis");
				sWikifier(`무언가 느끼기 위해 억지로 손가락을 위아래로 거칠게 움직인다.`);
			} else if (V.earSlime.corruption >= 100 && V.earSlime.growth >= 100 && V.earSlime.focus === "impregnation") {
				wikifier("arousal", 400 * handsOn, "masturbationPenis");
				if (V.player.virginity.penile === true) {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						fragment.append(
							span("당신은 쿠퍼액에 젖은 동정 자지 위아래로 손가락을 거칠게 움직이며, 온몸에 음란한 열기를 피워 올린다.")
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						fragment.append(span("당신은 쿠퍼액에 젖은 동정 자지의 길이를 따라 손가락을 열심히 위아래로 움직인다."));
					} else {
						sWikifier("당신은 음란한 열기를 즐기며 <<penis>> 아래쪽에 손가락을 문지른다.");
					}
				} else {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						sWikifier("당신은 <<penis>> 길이를 따라 거칠게 위아래로 쥐어 훑고, 넘친 쿠퍼액이 끝에서 튀어나간다.");
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						fragment.append(
							span("당신은 쿠퍼액에 젖은 자루 위아래로 손가락을 열심히 움직이며, 온몸에 음란한 열기를 피워 올린다.")
						);
					} else {
						sWikifier("당신은 <<penis>>의 길이를 따라 어루만지며 음란한 열기를 피워 올린다.");
					}
				}
			} else {
				wikifier("arousal", 200 * handsOn, "masturbationPenis");
				if (handsOn === 2) {
					if (V.player.virginity.penile === true) {
						if (V.arousal >= (V.arousalmax / 5) * 4) {
							fragment.append(span("당신은 포피가 허락하는 한 거칠게 동정 자지 위아래로 손가락을 움직인다."));
						} else if (V.arousal >= (V.arousalmax / 5) * 3) {
							fragment.append(span("당신은 동정 자지의 길이를 따라 손가락을 위아래로 움직인다."));
						} else {
							sWikifier("당신은 그 감각을 즐기며 <<penis>> 아래쪽에 손가락을 문지른다.");
						}
					} else {
						if (V.arousal >= (V.arousalmax / 5) * 4) {
							sWikifier("당신은 <<penis>>의 길이를 따라 위아래로 쥐어 훑는다.");
						} else if (V.arousal >= (V.arousalmax / 5) * 3) {
							fragment.append(span("당신은 자루 위아래로 손가락을 움직이며 살짝 간질이고 음란한 열기를 피워 올린다."));
						} else {
							sWikifier("당신은 <<penis>>의 길이를 따라 부드럽게 어루만진다.");
						}
					}
				} else {
					if (V.player.virginity.penile === true) {
						if (V.arousal >= (V.arousalmax / 5) * 4) {
							fragment.append(span("당신은 포피가 허락하는 한 거칠게 동정 자지 위아래로 손가락을 움직인다."));
						} else if (V.arousal >= (V.arousalmax / 5) * 3) {
							fragment.append(span("당신은 동정 자지의 길이를 따라 손가락을 위아래로 움직인다."));
						} else {
							sWikifier("당신은 그 감각을 즐기며 <<penis>> 아래쪽에 손가락을 문지른다.");
						}
					} else {
						if (V.arousal >= (V.arousalmax / 5) * 4) {
							sWikifier("당신은 <<penis>>의 길이를 따라 위아래로 쥐어 훑는다.");
						} else if (V.arousal >= (V.arousalmax / 5) * 3) {
							fragment.append(span("당신은 자루 위아래로 손가락을 움직이며 살짝 간질이고 음란한 열기를 피워 올린다."));
						} else {
							sWikifier("당신은 <<penis>>의 길이를 따라 부드럽게 어루만진다.");
						}
					}
				}
			}
			break;
		case "mpenisstop":
			clearAction("mrest");
			V[arm + "arm"] = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				sWikifier('<span class="lblue">당신은 <<penis>>에서 양손을 뗀다.</span>');
			} else {
				sWikifier(`<span class="lblue">당신은 <<penis>>에서 ${armk}손을 뗀다.</span>`);
			}
			break;
		case "mchastityparasiterub":
			clearAction();
			if (earSlimeDefy()) {
				wikifier("arousal", 100 * handsOn, "masturbationPenis");
				wikifier("pain", 1 * handsOn);
				additionalEffect.earSlimeDefy.pushUnique(V.player.virginity.penile === true ? "virgin penis" : "penis");
				sWikifier(`당신은 기생충을 부드럽게 어루만진다.`);
			} else if (!V.canSelfSuckPenis && playerIsPregnant() && playerPregnancyProgress() >= 10 && V.earSlime.corruption >= 100) {
				altText.eagerly = V.arousal >= V.arousalmax * (1 / 5) ? "열망하며" : "천천히";
				wikifier("arousal", 500, "masturbationPenis");
				V.earSlime.vibration += handsOn * 4;
				if (V.arousal >= (V.arousalmax / 5) * 3) {
					wikifier("arousal", 500, "masturbationPenis");
					sWikifier(
						`당신은 기생충을 희롱하려 애쓴다. 움직일 때마다 <span class="lewd">기생충이 쾌감의 파도를 온몸으로 흘려보내</span>, 거의 견디기 어려울 정도다.`
					);
				} else {
					sWikifier(
						`당신은 기생충을 ${altText.eagerly} 어루만진다. 움직일 때마다 <span class="lewd">기생충이 쾌감의 파도를 온몸으로 흘려보낸다.</span>`
					);
				}
			} else {
				wikifier("arousal", 200 * handsOn, "masturbationPenis");
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					V.earSlime.vibration += handsOn * 2;
					fragment.append(
						span(
							`당신은 기생충이 허락하는 한 거칠게 희롱하며, 당신의 ${
								V.player.virginity.penile === true ? "동정 자지" : "자지"
							}.`
						)
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(
						span(
							`당신은 기생충을 여러 방식으로 문지르며, 당신의 ${
								V.player.virginity.penile === true ? "동정 자지" : "자지"
							}.`
						)
					);
				} else {
					fragment.append(
						span(
							`당신은 기생충을 부드럽게 어루만지고, 그것은 쾌감을 당신의 ${
								V.player.virginity.penile === true ? "동정 자지" : "자지"
							}.`
						)
					);
				}
			}
			break;
		case "mchastityparasitesqueeze":
			clearAction();
			if (earSlimeDefy()) {
				wikifier("arousal", 100 * handsOn, "masturbationPenis");
				wikifier("pain", 1 * handsOn);
				additionalEffect.earSlimeDefy.pushUnique(V.player.virginity.penile === true ? "virgin penis" : "penis");
				sWikifier(`당신은 기생충을 부드럽게 쥔다.`);
			} else if (!V.canSelfSuckPenis && playerIsPregnant() && playerPregnancyProgress() >= 0.1 && V.earSlime.corruption >= 100) {
				altText.eagerly = V.arousal >= V.arousalmax * (1 / 5) ? "열망하며" : "천천히";
				wikifier("arousal", 500 * handsOn, "masturbationGenital");
				V.earSlime.vibration += 4;
				if (V.arousal >= (V.arousalmax / 5) * 3) {
					wikifier("arousal", 500, "masturbationPenis");
					sWikifier(
						`당신은 기생충을 쥐려 애쓴다. 움직일 때마다 <span class="lewd">기생충이 쾌감의 파도를 온몸으로 흘려보내</span>, 거의 견디기 어려울 정도다.`
					);
				} else {
					sWikifier(
						`당신은 기생충을 ${altText.eagerly} 쥔다. 움직일 때마다 <span class="lewd">기생충이 쾌감의 파도를 온몸으로 흘려보낸다.</span>`
					);
				}
			} else {
				wikifier("arousal", 200 * handsOn, "masturbationPenis");
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					V.earSlime.vibration += handsOn * 2;
					fragment.append(
						span(
							`당신은 기생충과 당신의 ${
								V.player.virginity.penile === true ? "동정 자지" : "자지"
							}, enjoying the limited attention you can give it.`
						)
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(
						span(`당신은 기생충을 쥐며 동시에 ${V.player.virginity.penile === true ? "동정 자지" : "자지"}도 조인다.`)
					);
				} else {
					fragment.append(
						span(
							`당신은 기생충을 부드럽게 쥐며, 그것의 벽 너머로 ${V.player.virginity.penile === true ? "동정 자지" : "자지"}를 느낀다.`
						)
					);
				}
			}
			// Help shrink the penis only when both pregnant and with a penis size of mini, had trouble reaching micro without additional help
			if (
				playerIsPregnant() &&
				playerPregnancyProgress() >= 0.1 &&
				V.player.penissize <= 1 &&
				(!V.daily.chastityParasizeSizeReduction || V.daily.chastityParasizeSizeReduction < 150)
			) {
				V.penisgrowthtimer += 3;
				V.daily.chastityParasizeSizeReduction = (V.daily.chastityParasizeSizeReduction || 0) + 1;
			}
			break;
		case "mchastityparasitestop":
			clearAction("mrest");
			V[arm + "arm"] = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				sWikifier('<span class="lblue">당신은 정조대 기생충에서 양손을 뗀다.</span>');
			} else {
				sWikifier(`<span class="lblue">당신은 정조대 기생충에서 ${armk}손을 뗀다.</span>`);
			}
			break;
		case "mballsstop":
			clearAction("mrest");
			V[arm + "arm"] = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				fragment.append(span("당신은 불알에서 양손을 뗀다.", "lblue"));
			} else {
				fragment.append(span(`당신은 불알에서 ${armk}손을 뗀다.`, "lblue"));
			}
			break;
		case "mballsfondle":
			clearAction();
			if (earSlimeDefy()) {
				wikifier("arousal", 50 * handsOn, "masturbationPenis");
				wikifier("pain", 1);
				additionalEffect.earSlimeDefy.pushUnique("balls");
				sWikifier(`무언가 느끼기 위해 억지로 ${balls}【을를】 거칠게 더듬는다.`);
			} else {
				wikifier("arousal", 100 * handsOn, "masturbationPenis");
				if (handsOn === 2) {
					if (V.arousal >= V.arousalmax * (4 / 5)) {
						fragment.append(
							span(
								`당신은 양손으로 ${balls}【을를】 더듬고, 그것들이 자지 밑동 쪽으로 조여드는 팽팽한 감각을 즐긴다.`
							)
						);
					} else if (V.arousal >= V.arousalmax * (3 / 5)) {
						fragment.append(span(`당신은 양손으로 ${balls}【을를】 만지작거리며 간질이는 감각을 즐긴다.`));
					} else if (V.arousal >= V.arousalmax * (2 / 5)) {
						fragment.append(span(`당신은 손안에서 ${balls}【을를】 흔들며 묵직하게 처지는 감각을 즐긴다.`));
					} else {
						fragment.append(span(`당신은 손안에서 ${balls}【을를】 굴린다.`));
					}
				} else {
					altText.oneOfYour = V.ballssize <= 2 ? `양쪽 ${balls}` : additionalEffect.hands ? "다른 쪽" : `${balls} 하나`;
					if (V.arousal >= V.arousalmax * (4 / 5)) {
						sWikifier(
							`당신은 ${armk}손으로 ${altText.oneOfYour}【을를】 더듬고, 불알이 <<penis>> 밑동 쪽으로 조여드는 팽팽한 감각을 즐긴다.`
						);
					} else if (V.arousal >= V.arousalmax * (3 / 5)) {
						fragment.append(span(`당신은 ${armk}손으로 ${altText.oneOfYour}【을를】 만지작거리며 간질이는 감각을 즐긴다.`));
					} else if (V.arousal >= V.arousalmax * (2 / 5)) {
						fragment.append(span(`당신은 ${armk}손안에서 ${altText.oneOfYour}【을를】 흔들며 묵직하게 처지는 감각을 즐긴다.`));
					} else {
						fragment.append(span(`당신은 ${armk}손으로 ${altText.oneOfYour}【을를】 쓰다듬는다.`));
					}
				}
				additionalEffect.hands = "ballplayeffects";
			}
			break;
		case "mballssqueeze":
			clearAction();
			if (earSlimeDefy()) {
				wikifier("arousal", 100 * handsOn, "masturbationPenis");
				wikifier("pain", 1);
				additionalEffect.earSlimeDefy.pushUnique("balls");
				sWikifier(`무언가 느끼기 위해 억지로 ${balls}【을를】 거칠게 쥔다.`);
			} else {
				wikifier("arousal", 200 * handsOn, "masturbationPenis");
				altText.gently = V.arousal >= V.arousalmax * (4 / 5) ? "다급하게" : V.arousal >= V.arousalmax * (3 / 5) ? "" : "부드럽게";
				if (handsOn === 2) {
					switch (V.ballssize) {
						case 3:
						case 4:
							fragment.append(span(`당신은 양손으로 ${balls}【을를】 감싸 쥐고 ${altText.gently} 쥔다.`));
							break;
						case 5:
							fragment.append(span(`당신은 양손으로 ${balls}【을를】 감싸 쥐고 ${altText.gently} 쥔다.`));
							break;
						case 6:
							fragment.append(span(`당신은 양손으로 ${balls}【을를】 ${altText.gently} 쥔다.`));
							break;
						default:
							fragment.append(span("이 문구는 도달할 수 없어야 합니다.", "red"));
							break;
					}
				} else {
					altText.oneOfYour = V.ballssize <= 2 ? `양쪽 ${balls}` : additionalEffect.hands ? "다른 쪽" : `${balls} 하나`;
					switch (V.ballssize) {
						case 3:
						case 4:
							fragment.append(span(`당신은 ${armk}손으로 ${altText.oneOfYour}【을를】 감싸 쥐고 ${altText.gently} 쥔다.`));
							break;
						case 5:
							fragment.append(span(`당신은 ${armk}손으로 ${altText.oneOfYour}【을를】 감싸 쥐고 ${altText.gently} 쥔다.`));
							break;
						case 6:
							fragment.append(span(`당신은 ${armk}손으로 ${altText.oneOfYour}【을를】 감싸 쥐고 ${altText.gently} 쥔다.`));
							break;
						default:
							fragment.append(span(`당신은 ${armk}손으로 ${balls}【을를】 감싸 쥐고 ${altText.gently} 쥔다.`));
							break;
					}
				}
				additionalEffect.hands = "ballplayeffects";
			}
			break;
		case "mballsentrance":
			clearAction("mballsfondle");
			V[arm + "arm"] = "mballs";
			if (doubleAction) V[otherArm + "arm"] = "mballs";
			if (V.earSlime.defyCooldown && V.earSlime.growth >= 100) {
				if (handsOn === 2) {
					switch (V.ballssize) {
						case 3:
						case 4:
							fragment.append(span(`당신은 양손에 ${balls} 하나씩을 쥔다`));
							break;
						case 5:
							fragment.append(span(`당신은 양손에 ${balls} 하나씩을 쥔다. 손바닥에 알맞게 들어찬다`));
							break;
						case 6:
							fragment.append(span(`당신은 양손에 ${balls} 하나씩을 쥔다. 손으로 감싸기에도 벅찰 정도다`));
							break;
						default:
							fragment.append(span("이 문구는 도달할 수 없어야 합니다", "red"));
							break;
					}
				} else {
					altText.oneOfYour = V.ballssize <= 2 ? `양쪽 ${balls}` : additionalEffect.hands ? "다른 쪽" : `${balls} 하나`;
					switch (V.ballssize) {
						case 3:
						case 4:
							fragment.append(span(`당신은 ${armk}손에 ${altText.oneOfYour}【을를】 쥔다`));
							break;
						case 5:
							fragment.append(span(`당신은 ${armk}손에 ${altText.oneOfYour}【을를】 쥔다. 손바닥에 알맞게 들어찬다`));
							break;
						case 6:
							fragment.append(span(`당신은 ${armk}손에 ${altText.oneOfYour}【을를】 쥔다. 손으로 감싸기에도 벅찰 정도다`));
							break;
						default:
							fragment.append(span(`당신은 ${armk}손으로 양쪽 ${balls}【을를】 쉽게 움켜쥔다`));
							break;
					}
				}
				fragment.append(span(`. 당신은 잠시 굳어 버린다. `));
				fragment.append(span(`아무 감각도 느껴지지 않았다.`, "red"));
			} else {
				wikifier("arousal", 100 * handsOn, "masturbationPenis");
				if (handsOn === 2) {
					switch (V.ballssize) {
						case 3:
						case 4:
							fragment.append(span(`당신은 양손에 ${balls} 하나씩을 쥔다.`, "blue"));
							break;
						case 5:
							fragment.append(span(`당신은 양손에 ${balls} 하나씩을 쥔다. 손바닥에 알맞게 들어찬다.`, "blue"));
							break;
						case 6:
							fragment.append(span(`당신은 양손에 ${balls} 하나씩을 쥔다. 손으로 감싸기에도 벅찰 정도다.`, "blue"));
							break;
						default:
							fragment.append(span("이 문구는 도달할 수 없어야 합니다.", "red"));
							break;
					}
				} else {
					altText.oneOfYour = V.ballssize <= 2 ? `양쪽 ${balls}` : additionalEffect.hands ? "다른 쪽" : `${balls} 하나`;
					switch (V.ballssize) {
						case 3:
						case 4:
							fragment.append(span(`당신은 ${armk}손에 ${altText.oneOfYour}【을를】 쥔다.`, "blue"));
							break;
						case 5:
							fragment.append(span(`당신은 ${armk}손에 ${altText.oneOfYour}【을를】 쥔다. 손바닥에 알맞게 들어찬다.`, "blue"));
							break;
						case 6:
							fragment.append(span(`당신은 ${armk}손에 ${altText.oneOfYour}【을를】 쥔다. 손으로 감싸기에도 벅찰 정도다.`, "blue"));
							break;
						default:
							fragment.append(span(`당신은 ${armk}손으로 양쪽 ${balls}【을를】 쉽게 움켜쥔다.`, "blue"));
							break;
					}
				}
				additionalEffect.hands = "ballplayeffects";
			}
			break;
		case "mpenisW":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationPenis");
			if (V.worn.genitals.name === "chastity parasite") {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					fragment.append(
						span(
							`당신은 기생충이 허락하는 한 거칠게 희롱하며, 당신의 ${
								V.player.virginity.penile === true ? "동정 자지" : "자지"
							}.`
						)
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(
						span(
							`당신은 기생충을 여러 방식으로 문지르며, 당신의 ${
								V.player.virginity.penile === true ? "동정 자지" : "자지"
							}.`
						)
					);
				} else {
					fragment.append(
						span(
							`당신은 기생충을 부드럽게 어루만지고, 그것은 쾌감을 당신의 ${
								V.player.virginity.penile === true ? "동정 자지" : "자지"
							}.`
						)
					);
				}
			} else {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					if (doubleAction) {
						sWikifier(`양손이 <<penis>>의 길이를 따라 미친 듯이 위아래로 움직인다.`);
					} else {
						sWikifier(`${armk}손이 <<penis>>의 길이를 따라 미친 듯이 위아래로 움직인다.`);
					}
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					if (doubleAction) {
						sWikifier(`양손의 손가락이 자루 위아래를 오가며 살짝 간질이고 음란한 열기를 피워 올린다.`);
					} else {
						sWikifier(`${armk}손의 손가락이 자루 위아래를 오가며 살짝 간질이고 음란한 열기를 피워 올린다.`);
					}
				} else {
					if (doubleAction) {
						sWikifier(`양손이 경련하듯 움직이며 <<penis>>의 길이를 따라 어루만진다.`);
					} else {
						sWikifier(`${armk}손이 경련하듯 움직이며 <<penis>>의 길이를 따라 어루만진다.`);
					}
				}
			}
			break;
		case "mbreastW":
			wikifier("arousal", 200 * handsOn, "masturbationBreasts");
			if (V.player.breastsize < 2) {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					if (doubleAction) {
						sWikifier(
							`양손이 견디기 어려울 만큼 예민한 유두를 희롱하고, 손가락이 스칠 때마다 흥분의 전율이 온몸을 타고 흐른다.`
						);
					} else {
						sWikifier(
							`${armk}손이 견디기 어려울 만큼 예민한 유두를 희롱하고, 손가락이 스칠 때마다 흥분의 전율이 온몸을 타고 흐른다.`
						);
					}
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					if (doubleAction) {
						sWikifier(
							`양손이 손가락으로 유륜 주위를 빙글빙글 돌리며 <<breasts>>【을를】 만지작거리고, 가끔 유두를 살짝 비튼다.`
						);
					} else {
						sWikifier(
							`${armk}손이 손가락으로 유륜 주위를 빙글빙글 돌리며 <<breasts>>【을를】 만지작거리고, 가끔 유두를 살짝 비튼다.`
						);
					}
				} else {
					if (doubleAction) {
						sWikifier(`양팔이 <<breasts>>【을를】 쓸어내리고 손가락 사이로 유두를 문질러, 음란한 열기를 키운다.`);
					} else {
						sWikifier(`${armk}팔이 <<breasts>>【을를】 쓸어내리고 손가락 사이로 유두를 문질러, 음란한 열기를 키운다.`);
					}
				}
			} else if (V.player.breastsize < 5) {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					if (doubleAction) {
						sWikifier(
							`양손이 <<breasts>>【을를】 감싸 쥐고 견디기 어려울 만큼 예민한 유두를 희롱한다. 손가락이 스칠 때마다 흥분의 전율이 온몸을 타고 흐른다.`
						);
					} else {
						sWikifier(
							`${armk}손이 <<breasts>>【을를】 감싸 쥐고 견디기 어려울 만큼 예민한 유두를 희롱한다. 손가락이 스칠 때마다 흥분의 전율이 온몸을 타고 흐른다.`
						);
					}
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					if (doubleAction) {
						sWikifier(
							`양손이 손가락으로 유륜 주위를 빙글빙글 돌리며 <<breasts>>【을를】 만지작거리고, 가끔 유두를 살짝 비튼다.`
						);
					} else {
						sWikifier(
							`${armk}손이 손가락으로 유륜 주위를 빙글빙글 돌리며 <<breasts>>【을를】 만지작거리고, 가끔 유두를 살짝 비튼다.`
						);
					}
				} else {
					if (doubleAction) {
						sWikifier(`양손이 <<breasts>>【을를】 쓸어내리고 손가락 사이로 유두를 문질러, 음란한 열기를 키운다.`);
					} else {
						sWikifier(`${armk}손이 <<breasts>>【을를】 쓸어내리고 손가락 사이로 유두를 문질러, 음란한 열기를 키운다.`);
					}
				}
			} else {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					if (doubleAction) {
						sWikifier(
							`양손이 <<breasts>>【을를】 감싸 쥐고 견디기 어려울 만큼 예민한 유두를 희롱한다. 손가락이 스칠 때마다 흥분의 전율이 온몸을 타고 흐른다.`
						);
					} else {
						sWikifier(
							`${armk}손이 <<breasts>>【을를】 감싸 쥐고 견디기 어려울 만큼 예민한 유두를 희롱한다. 손가락이 스칠 때마다 흥분의 전율이 온몸을 타고 흐른다.`
						);
					}
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					if (doubleAction) {
						sWikifier(
							`양손이 손가락으로 유륜 주위를 빙글빙글 돌리며 <<breasts>>【을를】 만지작거리고, 가끔 유두를 살짝 비튼다.`
						);
					} else {
						sWikifier(
							`${armk}손이 손가락으로 유륜 주위를 빙글빙글 돌리며 <<breasts>>【을를】 만지작거리고, 가끔 유두를 살짝 비튼다.`
						);
					}
				} else {
					if (doubleAction) {
						sWikifier(`양손이 <<breasts>>【을를】 쓸어내리고 손가락 사이로 유두를 문지르며, 음란한 열기가 커지는 것을 느낀다.`);
					} else {
						sWikifier(`${armk}손이 <<breasts>>【을를】 쓸어내리고 손가락 사이로 유두를 문지르며, 음란한 열기가 커지는 것을 느낀다.`);
					}
				}
			}
			if (V.milk_amount >= 1) {
				fragment.append(" ");
				fragment.append(span("돌기에서 젖이 새어 나온다.", "lewd"));
				fragment.append(wikifier("breastfeed", handsOn));
			}
			clearAction(); // Needs to run after any breastfeed widget
			break;
		case "mvaginaW":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationVagina");
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				switch (random(1, 3)) {
					case 1:
						sWikifier(`손가락들이 <<pussy>> 안팎으로 꿈틀거리며, 갑작스럽고 날카로운 찌르기로 당신을 침범한다.`);
						break;
					case 2:
						sWikifier(`손가락 사이에서 클리가 쓰라리도록 문질러지고, 회복할 틈은 단 한순간도 주어지지 않는다.`);
						break;
					case 3:
						sWikifier(`손가락들이 <<pussy>> 안에서 떨리며, 음란한 진동으로 온몸을 뒤흔든다.`);
						break;
				}
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				switch (random(1, 3)) {
					case 1:
						if (doubleAction) {
							sWikifier(`양손이 <<pussy>>【을를】 더듬고, 서로 엇갈려 꿈틀대며 밀고 들어간다.`);
						} else {
							sWikifier(`${armk}손이 <<pussy>>【을를】 더듬는다.`);
						}
						break;
					case 2:
						if (doubleAction) {
							sWikifier(`양손이 <<pussy>>【을를】 거칠게 감싸 쥐고, 한 손이 다른 손 위로 떨린다.`);
						} else {
							sWikifier(`${armk}손이 <<pussy>>【을를】 거칠게 감싸 쥔다.`);
						}
						break;
					case 3:
						if (doubleAction) {
							sWikifier(`양손이 번갈아 움직이며 클리토리스를 쿡쿡 찌른다.`);
						} else {
							sWikifier(`${armk}손이 클리토리스를 쿡쿡 찌른다.`);
						}
						break;
				}
			} else {
				switch (random(1, 3)) {
					case 1:
						sWikifier(`당신의 손가락들이 <<pussy>>【을를】 희롱하며, 하나씩 차례로 갈라진 틈을 훑고 지나간다.`);
						break;
					case 2:
						if (doubleAction) {
							sWikifier(`당신의 두 손이 음순을 주무르고, 손가락들이 입구에서 움찔거린다.`);
						} else {
							sWikifier(`당신의 ${armk}손이 음순을 주무르고, 손가락들이 입구에서 움찔거린다.`);
						}
						break;
					case 3:
						if (doubleAction) {
							sWikifier(`당신의 두 손이 허벅지를 어루만지며 천천히 벌린다.`);
						} else {
							sWikifier(`당신의 ${armk}손이 허벅지를 어루만지며 천천히 벌린다.`);
						}
						break;
				}
			}
			break;
		case "mpenisstopW":
			clearAction();
			if (V.worn.genitals.name === "chastity parasite") {
				altText.penis = "chastity parasite";
			} else {
				altText.penis = "<<penis>>";
			}
			if (doubleAction) {
				sWikifier(`당신은 ${altText.penis}에서 두 손을 뗀다. 손이 떨린다.`);
			} else {
				sWikifier(`당신은 ${altText.penis}에서 ${armk}손을 뗀다. 손이 떨린다.`);
			}
			break;
		case "mbreaststopW":
			clearAction();
			if (doubleAction) {
				sWikifier(`당신은 <<breasts>>에서 두 손을 뗀다. 손이 떨린다.`);
			} else {
				sWikifier(`당신은 <<breasts>>에서 ${armk}손을 뗀다. 손이 떨린다.`);
			}
			break;
		case "mvaginastopW":
			clearAction();
			if (doubleAction) {
				sWikifier(`당신은 <<pussy>>에서 두 손을 뗀다. 손이 떨린다.`);
			} else {
				sWikifier(`당신은 <<pussy>>에서 ${armk}손을 뗀다. 손이 떨린다.`);
			}
			break;
		case "mpickupdildo":
			// Should not use clearAction()
			V[armAction] = 0;
			V[arm + "arm"] = "mpickupdildo";
			wikifier("arousal", 100, "masturbation");

			// Set the current toy
			altText.selectedToy = selectedToy(arm, true);
			altText.toyType = altText.selectedToy.type;
			altText.toy = `${altText.selectedToy.colour ? setup.colourName(altText.selectedToy.colour) : ""} ${altText.selectedToy.name}`;
			// Set the default action
			if (altText.toyType.includes("stroker")) {
				V[armActionDefault] = "mpenisentrancestroker";
			} else if (altText.toyType.includes("breastpump")) {
				V[armActionDefault] = "mbreastpump";
			} else {
				V[armActionDefault] = V.player.vaginaExist ? "mvaginaentrancedildo" : "manusentrancedildo";
			}

			fragment.append(span(`당신은 ${armk}손으로 ${altText.toy}【을를】 집어 든다.`));
			break;
		case "mdildostop":
			clearAction("mrest");
			altText.selectedToy = selectedToy(arm, false);
			V[arm + "arm"] = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				altText.selectedOtherToy = selectedToy(otherArm, false);
				fragment.append(span(`당신은 ${toyDisplay(altText.selectedToy, altText.selectedOtherToy)}【을를】 놓는다.`, "lblue"));
			} else {
				fragment.append(span(`당신은 ${armk}손에 든 ${toyDisplay(altText.selectedToy)}【을를】 놓는다.`, "lblue"));
			}
			break;
		case "mpenisentrancestroker":
			if (V.penisuse === 0 || V.penisuse === "stroker") {
				clearAction("mpenisstrokertease");
				V.penisuse = "stroker";
				V[arm + "arm"] = "mpenisentrancestroker";
				altText.selectedToy = selectedToy(arm);
				if (V.earSlime.defyCooldown && V.earSlime.growth >= 100) {
					if (doubleAction) {
						V[arm + "arm"] = "mpenisentrancestroker";
						altText.selectedOtherToy = selectedToy(otherArm);
						if (genitalsExposed()) {
							sWikifier(
								`당신은 ${toyDisplay(
									altText.selectedToy,
									altText.selectedOtherToy
								)}【으로로】 드러난 <<penis>>【을를】 문지르다 멈칫한다. <span class="red">아무것도 느껴지지 않았다.</span>`
							);
						} else {
							sWikifier(
								`<span class="blue">당신은 ${toyDisplay(
									altText.selectedToy,
									altText.selectedOtherToy
								)}【으로로】 <<exposedlower>> 너머의 <<penis>>【을를】 문지르며 형태를 느낀다.</span>`
							);
						}
					} else {
						if (genitalsExposed()) {
							sWikifier(
								`당신은 ${toyDisplay(
									altText.selectedToy
								)}【을를】 집어 들어 <<penis>> 위로 문지르다 멈칫한다. <span class="red">아무것도 느껴지지 않았다.</span>`
							);
						} else {
							sWikifier(
								`<span class="blue">당신은 ${toyDisplay(
									altText.selectedToy
								)}【으로로】 <<exposedlower>> 너머의 <<penis>>【을를】 문지르며 형태를 느낀다.</span>`
							);
						}
					}
				} else {
					wikifier("arousal", 50 * handsOn, "masturbationPenis");
					if (doubleAction) {
						V[arm + "arm"] = "mpenisentrancestroker";
						altText.selectedOtherToy = selectedToy(otherArm);
						if (genitalsExposed()) {
							sWikifier(
								`<span class="blue">당신은 ${toyDisplay(
									altText.selectedToy,
									altText.selectedOtherToy
								)}【으로로】 드러난 <<penis>>【을를】 문지르며 기대감에 몸을 떤다.</span>`
							);
						} else {
							sWikifier(
								`<span class="blue">당신은 ${toyDisplay(
									altText.selectedToy,
									altText.selectedOtherToy
								)}【으로로】 <<exposedlower>> 너머의 <<penis>>【을를】 문지르며 형태를 느낀다.</span>`
							);
						}
					} else {
						if (genitalsExposed()) {
							sWikifier(
								`<span class="blue">당신은 ${toyDisplay(
									altText.selectedToy
								)}【으로로】 <<penis>>【을를】 문지르며 기대감에 몸을 떤다.</span>`
							);
						} else {
							sWikifier(
								`<span class="blue">당신은 ${toyDisplay(
									altText.selectedToy
								)}【으로로】 <<exposedlower>> 너머의 <<penis>>【을를】 문지르며 형태를 느낀다.</span>`
							);
						}
					}
				}
			} else {
				clearAction("mrest");
			}
			break;
		case "mpenisstrokertease":
			clearAction("mpenisentrancestroker");
			V[arm + "arm"] = "mpenisentrancestroker";
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
			}
			if (V.earSlime.defyCooldown && V.earSlime.growth >= 100) {
				if (genitalsExposed()) {
					sWikifier(
						`당신은 ${toyDisplay(
							altText.selectedToy,
							altText.selectedOtherToy
						)}【으로로】 <<penis>>【을를】 문지르지만 얼굴을 찌푸린다. <span class="red">아직도 아무것도 느껴지지 않았다.</span>.`
					);
				} else {
					sWikifier(
						`당신은 ${toyDisplay(
							altText.selectedToy,
							altText.selectedOtherToy
						)}【으로로】 <<exposedlower>> 너머의 <<penis>>【을를】 문지르며 형태를 느낀다.`
					);
				}
			} else {
				wikifier("arousal", 100 * handsOn, "masturbationPenis");
				if (genitalsExposed()) {
					sWikifier(`당신은 ${toyDisplay(altText.selectedToy, altText.selectedOtherToy)}【으로로】 <<penis>>【을를】 문지르며 기대감에 몸을 떤다.`);
				} else {
					sWikifier(
						`당신은 ${toyDisplay(
							altText.selectedToy,
							altText.selectedOtherToy
						)}【으로로】 <<exposedlower>> 너머의 <<penis>>【을를】 문지르며 형태를 느낀다.`
					);
				}
			}
			break;
		case "mpenisstroker":
			clearAction();
			V[arm + "arm"] = "mpenisstroker";
			V.penisuse = "stroker";
			altText.selectedToy = selectedToy(arm);
			if (earSlimeDefy()) {
				wikifier("arousal", 200 * handsOn, "masturbationPenis");
				wikifier("pain", 1);
				additionalEffect.earSlimeDefy.pushUnique(V.player.virginity.penile === true ? "virgin penis" : "penis");
				if (doubleAction) {
					V[otherArm + "arm"] = "mpenisstroker";
					wikifier("arousal", 25, "masturbationPenis");
					altText.selectedOtherToy = selectedToy(otherArm);
					sWikifier(
						`무언가를 느끼기 위해 ${toyDisplay(altText.selectedToy, altText.selectedOtherToy)}【으로로】 <<penis>>【을를】 거칠게 쑤셔대야만 한다.`
					);
				} else {
					sWikifier(`무언가를 느끼기 위해 ${toyDisplay(altText.selectedToy)}【으로로】 <<penis>>【을를】 거칠게 쑤셔대야만 한다.`);
				}
			} else if (V.earSlime.corruption >= 100 && V.earSlime.growth >= 100 && V.earSlime.focus === "impregnation") {
				wikifier("arousal", 600, "masturbationPenis");
				if (doubleAction) {
					V[otherArm + "arm"] = "mpenisstroker";
					wikifier("arousal", 100, "masturbationPenis");
					altText.selectedOtherToy = selectedToy(otherArm);
					sWikifier(
						`<span class="purple">당신은 쿠퍼액으로 젖은 <<penis>>【을를】 ${toyDisplay(
							altText.selectedToy,
							altText.selectedOtherToy
						)},</span> <span class="lewd">끝에서 과할 정도로 쿠퍼액이 튄다</span>.`
					);
				} else {
					sWikifier(
						`<span class="purple">당신은 쿠퍼액으로 젖은 <<penis>>【을를】 ${toyDisplay(
							altText.selectedToy
						)},</span> <span class="lewd">음란한 열기가 온몸에 퍼진다.</span>`
					);
				}
			} else {
				wikifier("arousal", 400, "masturbationPenis");
				if (doubleAction) {
					V[otherArm + "arm"] = "mpenisstroker";
					wikifier("arousal", 50, "masturbationPenis");
					altText.selectedOtherToy = selectedToy(otherArm);
					sWikifier(`<span class="purple">당신은 ${toyDisplay(altText.selectedToy, altText.selectedOtherToy)}【으로로】 <<penis>>【을를】 쑤신다.</span>`);
				} else {
					sWikifier(`<span class="purple">당신은 ${toyDisplay(altText.selectedToy)}【으로로】 <<penis>>【을를】 쑤신다.</span>`);
				}
			}
			break;
		case "mpenisstopstroker":
			clearAction("mrest");
			altText.selectedToy = selectedToy(arm, false);
			V[arm + "arm"] = 0;
			if (!doubleAction && !["mpenisstroker", "mpenisentrancestroker"].includes(V[otherArm + "arm"])) V.penisuse = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				altText.selectedOtherToy = selectedToy(otherArm, false);
				V.penisuse = 0;
				altText.selectedOtherToy = selectedToy(otherArm);
				sWikifier(`<span class="purple">당신은 ${toyDisplay(altText.selectedToy, altText.selectedOtherToy)}【을를】 <<penis>>에서 멀리 치운다.</span>`);
			} else {
				sWikifier(`<span class="purple">당신은 ${armk}손에 든 ${toyDisplay(altText.selectedToy)}【을를】 <<penis>>에서 멀리 치운다.</span>`);
			}
			break;
		case "mbreastpump":
			clearAction("mbreastpumppump");
			V[arm + "arm"] = "mbreastpump";
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				V[otherArm + "arm"] = "mbreastpump";
				altText.selectedOtherToy = selectedToy(otherArm);
				sWikifier(
					`<span class="blue">당신은 ${toyDisplay(
						altText.selectedToy,
						altText.selectedOtherToy
					)}【을를】 <<breasts>>에 밀착시키고 젖을 짜낼 준비를 한다.</span>`
				);
			} else {
				sWikifier(`<span class="blue">당신은 젖을 짜낼 준비를 하며 ${toyDisplay(altText.selectedToy)}【을를】 <<breasts>> 위에 밀착시킨다.</span>`);
			}
			break;
		case "mbreastpumppump":
			wikifier("arousal", 75 * handsOn, "masturbationNipples");
			wikifier("playWithBreasts", 3 * handsOn);
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toys = `당신은 ${toyDisplay(altText.selectedToy, altText.selectedOtherToy)}【을를】 <<breasts>>에 사용해 보려 하고,`;
			} else {
				altText.toys = `당신은 ${toyDisplay(altText.selectedToy)}【을를】 <<breasts>>에 사용해 보려 하고,`;
			}
			if (V.lactating === 1) {
				if (V.milk_amount >= 1 && V.earSlime.focus === "pregnancy" && V.earSlime.growth >= 100 && !V.earSlime.defyCooldown) {
					wikifier("arousal", 100 * handsOn, "masturbationNipples");
					sWikifier(`${altText.toys} <span class="lewd">그러자 젖꼭지에서 모유가 솟구쳐 병을 빠르게 채운다.</span>`);
					fragment.append(wikifier("breastfeed", Math.floor(handsOn * 4.5), "pump"));
				} else if (V.milk_amount >= 1) {
					sWikifier(`${altText.toys} <span class="lewd">그러자 젖꼭지에서 모유가 흘러 병 안으로 들어간다.</span>`);
					fragment.append(wikifier("breastfeed", Math.floor(handsOn * 3.5), "pump"));
				} else {
					sWikifier(`${altText.toys} 하지만 젖꼭지에서 모유는 나오지 않는다. 말라 있는 모양이다.`);
				}
			} else {
				sWikifier(`${altText.toys} 하지만 젖꼭지에서 모유는 나오지 않는다. 아직 모유가 나오지 않는 모양이다.`);
				if ((!V.daily.lactatingPressure || V.daily.lactatingPressure <= 5) && random(0, 100) >= 90) {
					if (!V.daily.lactatingPressure) V.daily.lactatingPressure = 0;
					V.daily.lactatingPressure++;
					wikifier("milkvolume", handsOn);
				}
			}
			clearAction(); // Needs to run after any breastfeed widget
			break;
		case "mstopbreastpump":
			clearAction("mrest");
			altText.selectedToy = selectedToy(arm, false);
			V[arm + "arm"] = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				altText.selectedOtherToy = selectedToy(otherArm, false);
				sWikifier(`<span class="purple">당신은 ${toyDisplay(altText.selectedToy, altText.selectedOtherToy)}【을를】 <<breasts>>에서 멀리 치운다.</span>`);
			} else {
				sWikifier(`<span class="purple">당신은 ${armk}손에 든 ${toyDisplay(altText.selectedToy)}【을를】 <<breasts>>에서 멀리 치운다.</span>`);
			}
			break;
		case "mchestvibrate":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationNipples");
			wikifier("playWithBreasts", 2 * handsOn);
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
				altText.hands = "양손으로";
			} else {
				altText.toyDisplay = toyDisplay(altText.selectedToy);
				altText.hands = `${armk}손으로`;
			}
			if (breastsExposed()) {
				wikifier("arousal", 200 * handsOn, "masturbationNipples");
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					fragment.append(
						span(
							`참을 수 있을 만큼 세게 ${altText.toyDisplay}【을를】 문지르는데도 유두가 꼿꼿이 선다. 진동이 끊임없는 쾌감을 온몸으로 퍼뜨린다.`
						)
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(span(`당신은 ${altText.hands} ${altText.toyDisplay}【을를】 단단해지는 유두에 문지른다.`));
				} else {
					fragment.append(
						span(
							`당신은 ${altText.hands} ${altText.toyDisplay}【을를】 유두에 누르고, 계속되는 진동 속에서 음란한 열기가 커지는 것을 느낀다.`
						)
					);
				}
			} else {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					sWikifier(
						`천 너머로 ${altText.toyDisplay}【을를】 문지르는데도 유두가 <<topaside>>에 닿아 꼿꼿이 선다.`
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					sWikifier(`당신은 ${altText.hands} <<topaside>> 너머로 ${altText.toyDisplay}【을를】 단단해지는 유두에 문지른다.`);
				} else {
					sWikifier(
						`당신은 ${altText.hands} ${altText.toys}【을를】 유두에 누른다. <<topaside>>【이가】 가로막고 있어도 기분 좋다.`
					);
				}
			}
			fragment.append(" ");
			if (V.lactating === 1 && V.settings.breastFeedingEnabled === true && handsOn > 0) {
				if (V.milk_amount >= 1) {
					if (V.worn.over_upper.exposed === 0 || V.worn.upper.exposed === 0 || V.worn.under_upper.exposed === 0) {
						fragment.append(span("젖꼭지에서 모유가 새어 나와 상의 안으로 흘러든다.", "lewd"));
						if (V.masturbation_bowl === 1) fragment.append(otherElement("i", " 젖을 모으고 싶다면 상의를 벗어야 한다."));
					} else {
						fragment.append(span("젖꼭지에서 모유가 새어 나와 장난감을 적신다.", "lewd"));
					}
					fragment.append(" ");
					fragment.append(wikifier("breastfeed", Math.floor(handsOn * 1.5)));
				} else {
					fragment.append(span("젖꼭지에서 모유는 새어 나오지 않는다. 말라 있는 모양이다."));
				}
			}
			break;
		case "mpenisvibrate":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationPenis");
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
			} else {
				altText.toyDisplay = toyDisplay(altText.selectedToy);
			}
			if (genitalsExposed()) {
				wikifier("arousal", 200 * handsOn, "masturbationPenis");
				if (V.player.virginity.penile === true) {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						fragment.append(
							span(`당신은 포피가 허락하는 한 거칠게, 진동하는 ${altText.toyDisplay}【으로로】 동정 자지를 위아래로 문지른다.`)
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						fragment.append(span(`당신은 ${altText.toyDisplay}【으로로】 동정 자지를 위아래로 문지른다. 진동에 금세 흥분이 오른다.`));
					} else {
						sWikifier(`당신은 진동하는 ${altText.toyDisplay}【을를】 <<penis>> 아랫면에 부드럽게 대고 그 감각을 즐긴다.`);
					}
				} else {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						sWikifier(`당신은 진동하는 ${altText.toyDisplay}【으로로】 <<penis>>【을를】 위아래로 문지른다.`);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						sWikifier(`당신은 ${altText.toyDisplay}【으로로】 <<penis>>【을를】 위아래로 문지른다. 진동에 음란한 열기가 빠르게 커진다.`);
					} else {
						sWikifier(`당신은 진동하는 ${altText.toyDisplay}【을를】 <<penis>> 아랫면에 대고 그 감각을 즐긴다.`);
					}
				}
			} else {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					sWikifier(`당신은 <<bottomaside>> 너머로 ${altText.toyDisplay}【으로로】 <<penis>>【을를】 위아래로 문지른다.`);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					sWikifier(
						`당신은 ${altText.toyDisplay}【으로로】 <<penis>>【을를】 위아래로 문지른다. <<bottomaside>> 너머로도 진동이 전해져 금세 흥분이 오른다.`
					);
				} else {
					sWikifier(
						`당신은 <<bottomaside>>【이가】 가로막고 있는데도 ${altText.toyDisplay}【을를】 <<penis>> 아랫면에 부드럽게 대고 감각을 즐긴다.`
					);
				}
			}
			break;
		case "mvaginaclitvibrate":
			clearAction();
			wikifier("arousal", 250 * handsOn, "masturbationVagina");
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
			} else {
				altText.toyDisplay = toyDisplay(altText.selectedToy);
			}
			if (genitalsExposed() && V.bugsinside === 1) {
				wikifier("arousal", 200 * handsOn, "masturbationVagina");
				wikifier("addVaginalWetness", 2 * handsOn);
				sWikifier(
					`<span class="blue">당신은 ${altText.toyDisplay}【을를】 <<clit>>에 부드럽게 누른다. 진동과 몸속을 기어 다니는 벌레들의 감각이 뒤섞여 발가락이 절로 오그라든다.</span>`
				);
			} else if (genitalsExposed()) {
				wikifier("arousal", 200 * handsOn, "masturbationVagina");
				wikifier("addVaginalWetness", 2 * handsOn);
				altText.start = `당신은 ${altText.toyDisplay}【을를】 <<clit>>에 부드럽게 누르고,`;
				if (V.mouth === "mdildomouth") {
					if (V.worn.face.type.includes("gag")) {
						altText.gag = V.worn.face.name;
					} else if (V.leftarm === "mdildomouth") {
						altText.gag = selectedToy("left").name;
					} else {
						altText.gag = selectedToy("right").name;
					}
					sWikifier(`${altText.start} 그 감각에 새어 나온 옅은 신음은 입을 막은 ${altText.gag}에 묻힌다.`);
				} else {
					sWikifier(`${altText.start} 그 감각에 옅게 신음한다.`);
				}
			} else {
				if (V.worn.lower.vagina_exposed && V.worn.over_lower.vagina_exposed) wikifier("addVaginalWetness", 1 * handsOn);
				sWikifier(
					`<span class="blue">당신은 <<exposedlower>> 너머로 ${altText.toyDisplay}【을를】 <<clit>>에 누르고, 천 너머로도 전해지는 감각을 즐긴다.</span>`
				);
			}
			break;
		case "mvaginaclitvibrateparasite":
			clearAction();
			wikifier("arousal", 300 * handsOn, "masturbationVagina");
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
			} else {
				altText.toyDisplay = toyDisplay(altText.selectedToy);
			}
			if (genitalsExposed() && V.bugsinside === 1) {
				wikifier("arousal", 200 * handsOn, "masturbationVagina");
				wikifier("addVaginalWetness", 2 * handsOn);
				sWikifier(
					`<span class="blue">당신은 <<clit>>의 ${V.parasite.clit.name}에 ${altText.toyDisplay}【을를】 부드럽게 누른다. 진동과 빨아들이는 감각, 몸속을 기어 다니는 벌레들의 감각이 뒤섞여 발가락이 절로 오그라든다.</span>`
				);
			} else if (genitalsExposed()) {
				wikifier("arousal", 200 * handsOn, "masturbationVagina");
				wikifier("addVaginalWetness", 2 * handsOn);
				altText.start = `당신은 ${altText.toyDisplay}【을를】 <<clit>>의 ${V.parasite.clit.name}에 부드럽게 누르고,`;
				if (V.mouth === "mdildomouth") {
					if (V.worn.face.type.includes("gag")) {
						altText.gag = V.worn.face.name;
					} else if (V.leftarm === "mdildomouth") {
						altText.gag = selectedToy("left").name;
					} else {
						altText.gag = selectedToy("right").name;
					}
					sWikifier(`${altText.start} 그 감각에 새어 나온 옅은 신음은 입을 막은 ${altText.gag}에 묻힌다.`);
				} else {
					sWikifier(`${altText.start} 빨아들이는 감각에 옅게 신음한다.`);
				}
			} else {
				if (V.worn.lower.vagina_exposed && V.worn.over_lower.vagina_exposed) wikifier("addVaginalWetness", 1 * handsOn);
				sWikifier(
					`<span class="blue">당신은 <<exposedlower>> 너머로 <<clit>>의 ${V.parasite.clit.name}에 ${altText.toyDisplay}【을를】 누르고, 더 세게 빨아들이며 반응하는 감각을 즐긴다.</span>`
				);
			}
			break;
		case "mdildomouthentrance":
			if (V.mouth === 0 && (otherArmAction !== "mdildomouthentrance" || random(0, 100) > 50)) {
				clearAction("mdildomouth");
				V[arm + "arm"] = "mdildomouthentrance";
				V.mouth = "mdildomouthentrance";
				V.mouthactiondefault = "mdildolick";
				wikifier("arousal", 100, "masturbationMouth");
				altText.selectedToy = selectedToy(arm);
				altText.toys = `당신은 ${toyDisplay(altText.selectedToy)}【을를】 입가로 가져가고,`;
				if (currentSkillValue("oralskill") < 100) {
					fragment.append(span(`${altText.toys} 연습해 보고 싶어 한다.`));
				} else {
					fragment.append(span(`${altText.toys} 그것이 입술에 닿는 감각을 즐긴다.`));
				}
			} else {
				clearAction("mrest");
			}
			break;
		case "mdildopiston":
			clearAction();
			wikifier("arousal", 100, "masturbationOral");
			altText.selectedToy = selectedToy(arm);
			altText.toyDisplay = toyDisplay(altText.selectedToy);
			if (currentSkillValue("oralskill") < 100) {
				altText.beginner = altText.selectedToy.name.includes("small")
					? "초보자인 당신에게 딱 맞는 적당한 크기다."
					: "너무 깊이 밀어 넣지 않도록 조심한다.";
				fragment.append(span(`당신은 ${altText.toyDisplay}【을를】 조심스럽게 입안에서 앞뒤로 움직인다. ${altText.beginner}`));
			} else if (currentSkillValue("oralskill") < 200) {
				wikifier("arousal", 100, "masturbationOral");
				fragment.append(
					span(`당신은 ${altText.toyDisplay}에 머리를 앞뒤로 움직이며, 그것이 입술과 혀를 문지르는 감각을 즐긴다.`)
				);
			} else {
				wikifier("arousal", 200, "masturbationOral");
				fragment.append(
					span(
						`당신은 ${altText.toyDisplay}【을를】 따라 빠르게 머리를 앞뒤로 움직이며 능숙하게 핥고 희롱하고, 그것이 주는 음란한 감각에 빠져든다.`
					)
				);
			}
			break;
		case "mdildomouth":
			clearAction("mdildopiston");
			wikifier("arousal", 200, "masturbationOral");
			V[arm + "arm"] = "mdildomouth";
			V.mouth = "mdildomouth";
			if (V.mouthactiondefault === "mdildokiss") V.mouthactiondefault = "mdildosuck";
			if (V.mouthaction === "mdildokiss") V.mouthaction = "mdildosuck";
			altText.selectedToy = selectedToy(arm);
			fragment.append(
				span(
					`당신은 ${toyDisplay(altText.selectedToy)}【을를】 입에 물고, 입술 사이로 밀어 넣으며 혀로 짧게 훑는다.`
				)
			);
			break;
		case "mvaginaentrance":
			clearAction(V.player.penisExist || V.parasite.clit.name ? "mvaginarub" : "mvaginaclit");
			wikifier("arousal", 200 * handsOn, "masturbationVagina");
			V[arm + "arm"] = "mvaginaentrance";
			if (doubleAction) {
				V[otherArm + "arm"] = "mvaginaentrance";
			}
			altText.fingers = handsOn === 2 ? "손가락" : "손가락";
			if (genitalsExposed() && V.bugsinside) {
				sWikifier(`<span class="blue">당신은 드러난 <<pussy>> 위로 ${altText.fingers}【을를】 훑고, 벌레들이 기어 다니는 감각을 느낀다.</span>`);
				wikifier("addVaginalWetness", 2 * handsOn);
			} else if (genitalsExposed()) {
				sWikifier(`<span class="blue">당신은 드러난 <<pussy>> 위로 ${altText.fingers}【을를】 훑으며 기대감에 몸을 떤다.</span>`);
				wikifier("addVaginalWetness", 2 * handsOn);
			} else {
				sWikifier(`<span class="blue">당신은 <<exposedlower>> 밑의 형태를 느끼며 <<pussy>> 위로 ${altText.fingers}【을를】 훑는다.</span>`);
				if (V.worn.lower.vagina_exposed && V.worn.over_lower.vagina_exposed) wikifier("addVaginalWetness", 1 * handsOn);
			}
			break;
		case "mvagina":
			if (V.vaginause === 0) {
				V.fingersInVagina += V.mVaginaFingerAdd;
				clearAction(
					V.mVaginaFingerAdd === 2 && V.fingersInVagina < V.vaginaFingerLimit - 1 && V.fingersInVagina < 4
						? "mvaginafingeraddtwo"
						: "mvaginafingeradd"
				);
				V[arm + "arm"] = "mvagina";
				V.vaginause = "mfingers";
				wikifier("arousal", V.mVaginaFingerAdd === 2 ? 250 : 200, "masturbationVagina");
				wikifier("addVaginalWetness", 1);
				altText.lubricated = (arm === "left" && V.leftFingersSemen >= 1) || (arm === "right" && V.rightFingersSemen >= 1) ? "정액으로 미끈거리는 " : "";
				altText.finger = V.mVaginaFingerAdd === 2 ? `${altText.lubricated}손가락 두 개` : `${altText.lubricated}손가락 하나`;
				if (altText.lubricated.includes("정액")) V.semenInVagina = true;
				if (hymenIntact) {
					sWikifier(`<span class="purple">당신은 흠 없는 처녀막에 닿을 때까지 ${altText.finger}【을를】 <<pussy>> 안으로 밀어 넣는다.</span>`);
				} else if (V.bugsinside) {
					sWikifier(`<span class="purple">당신은 ${altText.finger}【을를】 <<pussy>> 안으로 밀어 넣는다. 안에서 벌레들이 기어 다니는 감각이 느껴진다.</span>`);
				} else {
					sWikifier(`<span class="purple">당신은 ${altText.finger}【을를】 침입을 받아들이듯 벌어지는 <<pussy>> 안으로 밀어 넣는다.</span>`);
				}
				fragment.append(fingersEffect(span, hymenIntact));
			} else {
				clearAction("mvaginaclit");
			}
			break;
		case "mvaginafingeradd":
			V.fingersInVagina += V.mVaginaFingerAdd;
			if (V.fingersInVagina === 4 && V.vaginaFingerLimit === 5) {
				clearAction("mvaginafistadd");
			} else if (V.fingersInVagina === V.vaginaFingerLimit) {
				clearAction("mvaginatease");
			} else {
				clearAction(V.mVaginaFingerAdd === 2 && V.fingersInVagina + 2 <= Math.min(4, V.vaginaFingerLimit) ? "mvaginafistadd2" : "mvaginafistadd");
			}
			wikifier("addVaginalWetness", V.fingersInVagina);
			wikifier("arousal", 200 + 50 * V.fingersInVagina, "masturbationVagina");
			altText.lubricated = (arm === "left" && V.leftFingersSemen >= 1) || (arm === "right" && V.rightFingersSemen >= 1) ? "정액으로 미끈거리는 " : "";
			altText.finger = V.mVaginaFingerAdd === 2 ? `${altText.lubricated}손가락 두 개를 더` : `${altText.lubricated}손가락 하나를 더`;

			if (V.bugsinside === 1) {
				if (V.fingersInVagina === V.vaginaFingerLimit) {
					sWikifier(
						`<span class="lblue">마지막 ${altText.lubricated}손가락 하나를 안에 밀어 넣자 숨이 막힌다. 안에서 벌레들이 기어 다니는 감각이 느껴진다.</span>`
					);
				} else {
					sWikifier(
						`<span class="lblue">당신은 ${altText.finger}【을를】 <<pussy>> 안으로 밀어 넣으며 몸을 더 벌린다. 안에서 벌레들이 기어 다니는 감각이 느껴진다.</span>`
					);
				}
			} else {
				if (V.fingersInVagina === V.vaginaFingerLimit) {
					sWikifier(`<span class="lblue">마지막 ${altText.lubricated}손가락 하나를 안에 밀어 넣자 숨이 막힌다.</span>`);
				} else {
					sWikifier(`<span class="lblue">당신은 ${altText.finger}【을를】 <<pussy>> 안으로 밀어 넣으며 몸을 더 벌린다.</span>`);
				}
			}
			fragment.append(fingersEffect(span, hymenIntact));
			break;
		case "mvaginafistadd":
			clearAction("mvaginafist");
			V.fingersInVagina = 5;
			V[arm + "arm"] = "mvaginafist";
			V.vaginause = "mvaginafist";
			wikifier("arousal", 650, "masturbationVagina");
			sWikifier(
				`<span class="lblue">마지막으로 힘을 주자 손가락 다섯 개를 모두 보지 안으로 밀어 넣을 수 있었다.</span> 근육이 침입을 받아들이듯 벌어지고, 손 주위에서 맥동하는 것이 느껴진다.`
			);
			break;
		case "mvaginatease":
			clearAction();
			wikifier("arousal", 300 + 50 * V.fingersInVagina, "masturbationVagina");
			altText.fingers = V.fingersInVagina === 1 ? "손가락" : "손가락";
			wikifier("addVaginalWetness", V.fingersInVagina);
			if (V.bugsinside) {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					if (V.vaginaArousalWetness >= 60) {
						wikifier("vaginaFluidActive");
						sWikifier(
							`당신은 <<number $fingersInVagina>> ${altText.fingers}【을를】 <<pussy>> 안팎으로 움직여 음란한 체액과 벌레들을 끌어낸다.`
						);
					} else {
						sWikifier(`당신은 <<number $fingersInVagina>> ${altText.fingers}【을를】 <<pussy>> 안팎으로 움직여 벌레들을 끌어낸다.`);
					}
				} else if (V.arousal >= (V.arousalmax / 5) * 2) {
					sWikifier(
						`당신은 몸속의 벌레들을 느끼며 <<number $fingersInVagina>> ${altText.fingers}【을를】 <<pussy>> 안팎으로 움직인다.`
					);
				} else {
					sWikifier(
						`당신은 <<number $fingersInVagina>> ${altText.fingers}【으로로】 <<pussy>> 입구를 부드럽게 쑤시며 벌레들을 밀어낸다.`
					);
				}
			} else {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					if (V.vaginaArousalWetness >= 60) {
						wikifier("vaginaFluidActive");
						sWikifier(`당신은 <<number $fingersInVagina>> ${altText.fingers}【을를】 <<pussy>> 안팎으로 움직여 음란한 체액을 끌어낸다.`);
					} else {
						sWikifier(`당신은 닿을 수 있는 만큼 깊이 밀어 넣으며 <<number $fingersInVagina>> ${altText.fingers}【을를】 <<pussy>> 안팎으로 움직인다.`);
					}
				} else if (V.arousal >= (V.arousalmax / 5) * 2) {
					sWikifier(
						`당신은 너무 깊이 넣지 않아도 전율을 느끼며 <<number $fingersInVagina>> ${altText.fingers}【을를】 <<pussy>> 안팎으로 움직인다.`
					);
				} else {
					sWikifier(`당신은 <<number $fingersInVagina>> ${altText.fingers}【으로로】 <<pussy>> 입구를 부드럽게 쑤신다.`);
				}
			}
			break;
		case "mvaginafist":
			clearAction();
			wikifier("arousal", 500, "masturbationVagina");
			wikifier("addVaginalWetness", 5);
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				if (V.vaginaArousalWetness >= 60) {
					wikifier("vaginaFluidActive");
					sWikifier(`당신은 손 전체로 <<pussy>>【을를】 억지로 쑤셔댄다. 체액이 손목을 타고 흘러내린다.`);
				} else {
					sWikifier(`당신은 손 전체로 <<pussy>>【을를】 억지로 쑤셔댄다.`);
				}
			} else if (V.arousal >= (V.arousalmax / 5) * 2) {
				sWikifier(`당신은 손 전체를 <<pussy>> 안으로 밀어 넣는다. 내벽이 손을 감싸며 움찔거린다.`);
			} else {
				sWikifier(`당신은 <<pussy>> 안에서 주먹을 부드럽게 움직이며, 근육이 주먹 주위에서 계속 늘어나는 것을 느낀다.`);
			}
			break;
		case "mvaginaclit":
			clearAction();
			wikifier("arousal", 250 * handsOn, "masturbationVagina");
			wikifier("addVaginalWetness", 2 * handsOn);
			altText.fingers = handsOn === 2 ? "손가락" : "손가락";
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(span(`당신은 엄지로 클리를 누르고 원을 그리듯 문지르며 흥분이 차오르는 것을 느낀다.`));
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(span(`당신은 ${altText.fingers}【으로로】 클리 끝을 희롱한다.`));
			} else {
				fragment.append(span(`당신은 ${altText.fingers}【으로로】 클리를 문지르며 음란한 감각을 키운다.`));
			}
			break;
		case "mvaginarub":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationVagina");
			altText.fingers = handsOn === 2 ? "손가락" : "손가락";
			if (genitalsExposed() && V.bugsinside) {
				sWikifier(`당신은 드러난 <<pussy>> 위로 ${altText.fingers}【을를】 훑고, 벌레들이 기어 다니는 감각을 느낀다.`);
				wikifier("addVaginalWetness", 2 * handsOn);
			} else if (genitalsExposed()) {
				sWikifier(`당신은 드러난 <<pussy>> 위로 ${altText.fingers}【을를】 훑으며 기대감에 몸을 떤다.`);
				wikifier("addVaginalWetness", 2 * handsOn);
			} else {
				sWikifier(`당신은 <<exposedlower>> 밑의 형태를 느끼며 <<pussy>> 위로 ${altText.fingers}【을를】 훑는다.`);
				if (V.worn.lower.vagina_exposed && V.worn.over_lower.vagina_exposed) wikifier("addVaginalWetness", 1 * handsOn);
			}
			break;
		case "mvaginaclitparasite":
			clearAction();
			wikifier("arousal", 300 * handsOn, "masturbationVagina");
			wikifier("addVaginalWetness", 2 * handsOn);
			altText.fingers = handsOn === 2 ? "손가락" : "손가락";
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(
					span(`당신은 클리의 ${V.parasite.clit.name}【을를】 쥐어짜고, 그것이 더 거세게 쾌감을 주자 흥분이 차오르는 것을 느낀다.`)
				);
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(span(`당신은 ${altText.fingers}【으로로】 클리의 ${V.parasite.clit.name}【을를】 희롱한다.`));
			} else {
				fragment.append(span(`당신은 ${altText.fingers}【으로로】 ${V.parasite.clit.name}【을를】 문지르고, 그것도 화답하듯 움직이며 음란한 감각을 키운다.`));
			}
			break;
		case "mvaginastop":
			clearAction("mrest");
			V[arm + "arm"] = 0;
			if (V[otherArm + "arm"] !== "mvagina") {
				V.fingersInVagina = 0;
				V.vaginause = 0;
			}
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				if (V.vaginause === "mfingers") V.vaginause = 0;
				sWikifier('<span class="lblue">당신은 두 손을 <<pussy>>에서 멀리 치운다.</span>');
			} else {
				sWikifier(`<span class="lblue">당신은 ${armk}손을 <<pussy>>에서 멀리 치운다.</span>`);
			}
			break;
		case "mvaginafingerremove":
			V.fingersInVagina -= 1;
			if (V.fingersInVagina >= 1) {
				clearAction();
				V[arm + "arm"] = "mvagina";
				if (V.vaginause === "mvaginafist") V.vaginause = "mfingers";
				sWikifier('<span class="lblue">당신은 손가락 하나를 <<pussy>>에서 빼낸다.</span>');
			} else {
				clearAction("mvaginarub");
				V[arm + "arm"] = "mvaginaentrance";
				if (V.vaginause === "mfingers") V.vaginause = 0;
				sWikifier('<span class="lblue">당신은 손가락을 <<pussy>>에서 빼낸다.</span>');
			}
			break;
		case "mvaginafistremove":
			clearAction("mvaginarub");
			V[arm + "arm"] = "mvaginaentrance";
			V.fingersInVagina = 0;
			V.vaginause = 0;
			wikifier("arousal", 1000, "masturbationVagina");
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				sWikifier(
					'<span class="lblue">당신은 손 전체를 <<pussy>>에서 빼낸다. 체액이 흘러나오고, 근육이 항의하듯 움찔거린다.</span>'
				);
			} else if (V.arousal >= (V.arousalmax / 5) * 2) {
				sWikifier('<span class="lblue">당신은 손 전체를 <<pussy>>에서 빼내고, 텅 빈 감각만 남는다.</span>');
			} else {
				sWikifier('<span class="lblue">당신은 손 전체를 <<pussy>>에서 빼낸다. 근육이 풀리는 것이 느껴진다.</span>');
			}
			break;
		case "mvaginaentrancedildo":
			clearAction(V.player.penisExist || V.parasite.clit.name ? "mvaginarubdildo" : "mvaginaclitdildo");
			V[arm + "arm"] = "mvaginaentrancedildo";
			wikifier("arousal", 200 * handsOn, "masturbationVagina");
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				V[otherArm + "arm"] = "mvaginaentrancedildo";
				altText.selectedOtherToy = selectedToy(otherArm);
			}
			altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
			if (genitalsExposed()) {
				wikifier("addVaginalWetness", 2 * handsOn);
				sWikifier(`<span class="blue">당신은 드러난 <<pussy>> 위로 ${altText.toyDisplay}【을를】 훑으며 기대감에 몸을 떤다.</span>`);
			} else {
				if (V.worn.lower.vagina_exposed && V.worn.over_lower.vagina_exposed) wikifier("addVaginalWetness", 1 * handsOn);
				sWikifier(`<span class="blue">당신은 <<exposedlower>> 밑의 형태를 느끼며 <<pussy>> 위로 ${altText.toyDisplay}【을를】 훑는다.</span>`);
			}
			break;
		case "mvaginadildo":
			clearAction("mvaginateasedildo");
			V[arm + "arm"] = "mvaginadildo";
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				V[otherArm + "arm"] = "mvaginadildo";
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.lubricated = V.leftFingersSemen >= 1 || V.rightFingersSemen >= 1 ? "정액으로 미끈거리는" : "";
			} else {
				altText.lubricated = V[arm + "FingersSemen"] >= 1 ? "정액으로 미끈거리는" : "";
			}
			if (altText.lubricated.includes("정액")) V.semenInVagina = true;
			wikifier("arousal", 150 * handsOn, "masturbationVagina");
			wikifier("addVaginalWetness", 1);
			altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);

			if (hymenIntact) {
				sWikifier(
					`<span class="purple">당신은 흠 없는 처녀막에 닿을 때까지 ${altText.lubricated}${altText.lubricated ? " " : ""}${altText.toyDisplay}【을를】 <<pussy>> 안으로 밀어 넣는다.</span>`
				);
			} else if (V.bugsinside) {
				sWikifier(
					`<span class="purple">당신은 ${altText.lubricated}${altText.lubricated ? " " : ""}${altText.toyDisplay}【을를】 <<pussy>> 안으로 밀어 넣는다. 안에서 벌레들이 기어 다니는 감각이 느껴진다.</span>`
				);
			} else {
				sWikifier(
					`<span class="purple">당신은 ${altText.lubricated}${altText.lubricated ? " " : ""}${altText.toyDisplay}【을를】 침입을 받아들이듯 벌어지는 <<pussy>> 안으로 밀어 넣는다.</span>`
				);
			}
			break;
		case "mvaginateasedildo":
			clearAction();
			altText.selectedToy = selectedToy(arm);
			altText.toyPleasure = 2 + (altText.selectedToy.type.includes("vibrator") ? 5 : 3);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toyPleasure += altText.selectedOtherToy.type.includes("vibrator") ? 5 : 3;
			}
			wikifier("arousal", 300 + 50 * altText.toyPleasure, "masturbationVagina");
			wikifier("addVaginalWetness", altText.toyPleasure);

			altText.wet = "";
			if (V.vaginaArousalWetness >= 40) {
				altText.wet = "흠뻑 젖은 ";
			} else if (V.vaginaArousalWetness >= 20) {
				altText.wet = "미끄러운 ";
			}
			altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				if (V.vaginaArousalWetness >= 60) {
					sWikifier(`당신은 ${altText.toyDisplay}【을를】 ${altText.wet} <<pussy>> 안팎으로 움직여 음란한 체액을 끌어낸다.`);
				} else {
					sWikifier(`당신은 닿을 수 있는 만큼 깊이 밀어 넣으며 ${altText.toyDisplay}【을를】 ${altText.wet} <<pussy>> 안팎으로 움직인다.`);
				}
			} else if (V.arousal >= (V.arousalmax / 5) * 2) {
				sWikifier(`당신은 너무 깊이 넣지 않아도 전율을 느끼며 ${altText.toyDisplay}【을를】 ${altText.wet} <<pussy>> 안팎으로 움직인다.`);
			} else {
				sWikifier(`당신은 ${altText.toyDisplay}【으로로】 ${altText.wet} <<pussy>> 입구를 부드럽게 쑤신다.`);
			}
			break;
		case "mvaginaclitdildo":
			clearAction();
			wikifier("arousal", 250 * handsOn, "masturbationVagina");
			altText.selectedToy = selectedToy(arm);
			if (altText.selectedToy.type.includes("vibrator")) wikifier("arousal", 50, "masturbationVagina");
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				if (altText.selectedOtherToy.type.includes("vibrator")) wikifier("arousal", 50, "masturbationVagina");
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					fragment.append(
						span(`당신은 ${altText.toyDisplay}【으로로】 클리 위쪽을 부드럽게 스치지만, 몸이 예민해질수록 계속하기 어려워진다.`)
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(span(`당신은 ${altText.toyDisplay}【으로로】 클리 끝을 희롱한다.`));
				} else {
					fragment.append(span(`당신은 ${altText.toyDisplay}【으로로】 클리를 문지르며 음란한 감각을 키운다.`));
				}
			} else {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					fragment.append(
						span(
							`당신은 ${toyDisplay(
								altText.selectedToy
							)}【으로로】 원을 그리듯 문지르며 흥분이 커지는 것을 느낀다.`
						)
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(span(`당신은 ${toyDisplay(altText.selectedToy)}【으로로】 클리 끝을 희롱한다.`));
				} else {
					fragment.append(span(`당신은 ${toyDisplay(altText.selectedToy)}【으로로】 클리를 문지르며 음란한 감각을 키운다.`));
				}
			}
			break;
		case "mvaginarubdildo":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationVagina");
			altText.selectedToy = selectedToy(arm);
			if (altText.selectedToy.type.includes("vibrator")) wikifier("arousal", 50, "masturbationVagina");
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				if (altText.selectedOtherToy.type.includes("vibrator")) wikifier("arousal", 50, "masturbationVagina");
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
				sWikifier(`당신은 드러난 <<pussy>> 위로 ${altText.toyDisplay}【을를】 훑으며 기대감에 몸을 떨고, 음란한 감각을 키운다.`);
			} else {
				sWikifier(`당신은 드러난 <<pussy>> 위로 ${toyDisplay(altText.selectedToy)}【을를】 문지르며 음란한 감각을 키운다.`);
			}
			break;
		case "mvaginastopdildo":
			clearAction("mrest");
			V[arm + "arm"] = 0;
			altText.selectedToy = selectedToy(arm, false);
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				altText.selectedOtherToy = selectedToy(otherArm);
				sWikifier(`<span class="lblue">당신은 ${toyDisplay(altText.selectedToy, altText.selectedOtherToy)}【을를】 <<pussy>>에서 멀리 치운다.</span>`);
			} else {
				sWikifier(`<span class="lblue">당신은 ${armk}손에 든 ${toyDisplay(altText.selectedToy)}【을를】 <<pussy>>에서 멀리 치운다.</span>`);
			}
			break;
		case "mvaginaentrancedildofloor":
			clearAction("mrest");
			if (V.vaginause === 0) {
				V[arm + "arm"] = 0;
				V.vaginause = "mdildopenetrate";
				V.vaginaactiondefault = "mdildopenetratebounce";
				V.currentToyVagina = V["currentToy" + arm.toLocaleUpperFirst()];
				altText.selectedToy = selectedToy(arm, false);
				sWikifier(`<span class="purple">당신은 ${armk}손에 든 ${toyDisplay(altText.selectedToy)}【을를】 <<pussy>> 옆 바닥에 내려놓는다.</span>`);
			}
			break;
		case "manusentrance":
			clearAction("manusrub");
			wikifier("arousal", 100 * handsOn, "masturbationAss");
			V[arm + "arm"] = "manusentrance";
			if (doubleAction) V[otherArm + "arm"] = "manusentrance";
			altText.fingers = handsOn === 2 ? "손가락" : "손가락";
			if (genitalsExposed()) {
				sWikifier(`<span class="blue">당신은 드러난 <<bottom>> 쪽으로 손을 내려 ${altText.fingers}【을를】 항문에 부드럽게 누른다.</span>`);
			} else {
				sWikifier(
					`<span class="blue">당신은 <<bottom>> 쪽으로 손을 내려 <<exposedlower>> 너머로 ${altText.fingers}【을를】 항문에 부드럽게 누른다.</span>`
				);
			}
			break;
		case "manus":
			if ([0, "manus"].includes(V.anususe)) {
				clearAction("manustease");
				wikifier("arousal", 100 * handsOn, "masturbationAnal");
				V[arm + "arm"] = "manus";
				V.anususe = "manus";
				if (doubleAction) {
					altText.lubricated = V.leftFingersSemen >= 1 || V.rightFingersSemen >= 1 ? "정액으로 미끈거리는" : "";
					V[otherArm + "arm"] = "manus";
					sWikifier(`<span class="purple">당신은 ${altText.lubricated}${altText.lubricated ? " " : ""}손가락 두 개를 <<bottom>> 안으로 밀어 넣는다.</span>`);
				} else {
					altText.lubricated =
						(arm === "left" && V.leftFingersSemen >= 1) || (arm === "right" && V.rightFingersSemen >= 1) ? "정액으로 미끈거리는 " : "";
					sWikifier(`<span class="purple">당신은 ${altText.lubricated}${altText.lubricated ? " " : ""}손가락 하나를 <<bottom>> 안으로 밀어 넣는다.</span>`);
				}
				if (altText.lubricated.includes("정액")) V.semenInAnus = true;
			} else {
				clearAction("manusrub");
			}
			break;
		case "manusrub":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationAnal");
			altText.fingers = handsOn === 2 ? "손가락" : "손가락";
			switch (random(0, 2)) {
				case 0:
					sWikifier(`당신은 ${altText.fingers}【을를】 <<bottom>> 골 사이에 댄 채 항문을 부드럽게 건드린다.`);
					break;
				case 1:
					fragment.append(span(`당신은 항문을 원을 그리듯 문지른다.`));
					break;
				case 2:
					fragment.append(span(`당신은 ${altText.fingers}【을를】 항문에 누른다. 조금 벌어지는 것이 느껴진다.`));
					break;
			}
			break;
		case "manustease":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationAnal");
			altText.fingers = handsOn === 2 ? "손가락" : "손가락";
			switch (random(0, 2)) {
				case 0:
					sWikifier(`당신은 ${altText.fingers}【으로로】 <<bottom>> 안쪽을 부드럽게 더듬는다.`);
					break;
				case 1:
					fragment.append(span(`당신은 ${altText.fingers}【을를】 천천히 항문 안팎으로 움직인다.`));
					break;
				case 2:
					sWikifier(`당신은 ${altText.fingers}【으로로】 <<bottom>>【을를】 쑤신다. 그런 곳을 만지고 있다는 사실에 음란한 기분이 든다.`);
					break;
			}
			break;
		case "manusprostate":
			clearAction();
			wikifier("arousal", 300 * handsOn, "masturbationAnal");
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(span("당신은 전립선을 쓰다듬어 정액을 짜내고 몸을 떨게 만든다."));
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(span("당신은 전립선을 누르고, 거의 견디기 힘들 만큼 쾌락 어린 무방비감을 일으킨다."));
			} else {
				fragment.append(span("당신은 전립선을 부드럽게 찌르고, 찌를 때마다 쾌감의 파도가 온몸으로 퍼진다."));
			}
			break;
		case "manusstop":
			clearAction("mrest");
			V[arm + "arm"] = 0;
			if (V[otherArm + "arm"] !== "manus") V.anususe = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				V.anususe = 0;
				sWikifier(`<span class="purple">당신은 두 손을 <<bottom>>에서 멀리 치운다.</span>`);
			} else {
				sWikifier(`<span class="purple">당신은 ${armk}손을 <<bottom>>에서 멀리 치운다.</span>`);
			}
			break;
		case "manusentrancedildo":
			clearAction("manusrubdildo");
			wikifier("arousal", 200 * handsOn, "masturbationAnal");
			V[arm + "arm"] = "manusentrancedildo";
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				V[otherArm + "arm"] = "manusentrancedildo";
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
				if (genitalsExposed()) {
					sWikifier(
						`<span class="blue">당신은 드러난 <<bottom>> 쪽으로 손을 내려 ${altText.toyDisplay}【을를】 항문에 부드럽게 누른다.</span>`
					);
				} else {
					sWikifier(
						`<span class="blue">당신은 <<bottom>> 쪽으로 손을 내려 <<exposedlower>> 너머로 ${altText.toyDisplay}【을를】 항문에 부드럽게 누른다.</span>`
					);
				}
			} else {
				if (genitalsExposed()) {
					sWikifier(
						`<span class="blue">당신은 드러난 <<bottom>> 쪽으로 손을 내려 ${toyDisplay(
							altText.selectedToy
						)}【을를】 항문에 부드럽게 누른다.</span>`
					);
				} else {
					sWikifier(
						`<span class="blue">당신은 <<bottom>> 쪽으로 손을 내려 ${toyDisplay(
							altText.selectedToy
						)}【을를】 <<exposedlower>> 너머로 항문에 부드럽게 누른다.</span>`
					);
				}
			}
			break;
		case "manusdildo":
			clearAction("manusteasedildo");
			wikifier("arousal", 250 * handsOn, "masturbationAnal");
			V[arm + "arm"] = "manusdildo";
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.lubricated = V.leftFingersSemen >= 1 || V.rightFingersSemen >= 1 ? "정액으로 미끈거리는 " : "";
				V[otherArm + "arm"] = "manusdildo";
				altText.selectedOtherToy = selectedToy(otherArm);
				sWikifier(
					`<span class="purple">당신은 ${altText.lubricated}${altText.lubricated ? " " : ""}${toyDisplay(
						altText.selectedToy,
						altText.selectedOtherToy
					)}【을를】 <<bottom>> 안으로 밀어 넣는다.</span>`
				);
			} else {
				altText.lubricated = (arm === "left" && V.leftFingersSemen >= 1) || (arm === "right" && V.rightFingersSemen >= 1) ? "정액으로 미끈거리는 " : "";
				sWikifier(`<span class="purple">당신은 ${altText.lubricated}${altText.lubricated ? " " : ""}${toyDisplay(altText.selectedToy)}【을를】 <<bottom>> 안으로 밀어 넣는다.</span>`);
			}
			if (altText.lubricated.includes("정액")) V.semenInAnus = true;
			break;
		case "manusrubdildo":
			clearAction();
			wikifier("arousal", 250 * handsOn, "masturbationAnal");
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
				switch (random(0, 2)) {
					case 0:
						sWikifier(`당신은 ${altText.toyDisplay}【을를】 <<bottom>> 골 사이에 둔 채 항문을 부드럽게 건드린다.`);
						break;
					case 1:
						sWikifier(`당신은 ${altText.toyDisplay}【으로로】 항문을 원을 그리듯 문지른다.`);
						break;
					case 2:
						sWikifier(`당신은 ${altText.toyDisplay}【을를】 항문에 누른다. 조금 벌어지는 것이 느껴진다.`);
						break;
				}
			} else {
				altText.toyDisplay = toyDisplay(altText.selectedToy);
				switch (random(0, 2)) {
					case 0:
						sWikifier(`당신은 ${toyDisplay(altText.selectedToy)}【을를】 <<bottom>> 골 사이에 댄 채 항문을 부드럽게 건드린다.`);
						break;
					case 1:
						sWikifier(`당신은 ${toyDisplay(altText.selectedToy)}【으로로】 항문을 원을 그리듯 문지른다.`);
						break;
					case 2:
						sWikifier(`당신은 ${toyDisplay(altText.selectedToy)}【을를】 항문에 누른다. 조금 벌어지는 것이 느껴진다.`);
						break;
				}
			}
			break;
		case "manusteasedildo":
			clearAction();
			wikifier("arousal", 250 * handsOn, "masturbationAnal");
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
				switch (random(0, 2)) {
					case 0:
						sWikifier(`당신은 ${altText.toyDisplay}【으로로】 <<bottom>> 안쪽을 부드럽게 더듬는다.`);
						break;
					case 1:
						sWikifier(`당신은 ${altText.toyDisplay}【을를】 천천히 항문 안팎으로 움직인다.`);
						break;
					case 2:
						sWikifier(`당신은 ${altText.toyDisplay}【으로로】 <<bottom>>【을를】 쑤신다. 그런 곳을 만지고 있다는 사실에 음란한 기분이 든다.`);
						break;
				}
			} else {
				switch (random(0, 2)) {
					case 0:
						sWikifier(`당신은 ${toyDisplay(altText.selectedToy)}【으로로】 <<bottom>> 안쪽을 부드럽게 더듬는다.`);
						break;
					case 1:
						sWikifier(`당신은 ${toyDisplay(altText.selectedToy)}【을를】 천천히 <<bottom>> 안팎으로 움직인다.`);
						break;
					case 2:
						sWikifier(`당신은 ${toyDisplay(altText.selectedToy)}【으로로】 <<bottom>>【을를】 쑤신다. 그런 곳을 만지고 있다는 사실에 음란한 기분이 든다.`);
						break;
				}
			}
			break;
		case "manusprostatedildo":
			clearAction();
			wikifier("arousal", 350 * handsOn, "masturbationAnal");
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					fragment.append(span(`당신은 ${altText.toyDisplay}【으로로】 전립선을 쓰다듬어 정액을 짜내고 몸을 떨게 만든다.`));
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(
						span(
							`당신은 ${altText.toyDisplay}【으로로】 전립선을 누르고, 거의 견디기 힘들 만큼 쾌락 어린 무방비감을 일으킨다.`
						)
					);
				} else {
					fragment.append(
						span(`당신은 ${altText.toyDisplay}【으로로】 전립선을 부드럽게 찌르고, 찌를 때마다 쾌감의 파도가 온몸으로 퍼진다.`)
					);
				}
			} else {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					fragment.append(span(`당신은 ${toyDisplay(altText.selectedToy)}【으로로】 전립선을 쓰다듬어 정액을 짜내고 몸을 떨게 만든다.`));
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(
						span(
							`당신은 ${toyDisplay(
								altText.selectedToy
							)}【으로로】 전립선을 누르고, 거의 견디기 힘들 만큼 무방비한 쾌감이 퍼진다.`
						)
					);
				} else {
					fragment.append(
						span(
							`당신은 ${toyDisplay(
								altText.selectedToy
							)}【으로로】 전립선을 부드럽게 찌르고, 찌를 때마다 쾌감의 파도가 온몸으로 퍼진다.`
						)
					);
				}
			}
			break;
		case "manusstopdildo":
			clearAction("mrest");
			V[arm + "arm"] = 0;
			altText.selectedToy = selectedToy(arm, false);
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				altText.selectedOtherToy = selectedToy(otherArm);
				sWikifier(`<span class="purple">당신은 ${toyDisplay(altText.selectedToy, altText.selectedOtherToy)}【을를】 <<bottom>>에서 멀리 치운다.</span>`);
			} else {
				sWikifier(`<span class="purple">당신은 ${armk}손에 든 ${toyDisplay(altText.selectedToy)}【을를】 <<bottom>>에서 멀리 치운다.</span>`);
			}
			break;
		case "manusentrancedildofloor":
			clearAction("mrest");
			if (V.anususe === 0) {
				V[arm + "arm"] = 0;
				V.anususe = "mdildopenetrate";
				V.anusactiondefault = "mdildopenetratebounce";
				V.currentToyAnus = V["currentToy" + arm.toLocaleUpperFirst()];
				altText.selectedToy = selectedToy(arm, false);
				fragment.append(span(`당신은 ${armk}손에 든 ${toyDisplay(altText.selectedToy)}【을를】 항문 옆 바닥에 내려놓는다.`, "purple"));
			}
			break;
		case "mmouthstopdildo":
			clearAction("mrest");
			V[arm + "arm"] = 0;
			V.mouth = 0;
			altText.selectedToy = selectedToy(arm, false);
			fragment.append(span(`당신은 ${armk}손에 든 ${toyDisplay(altText.selectedToy)}【을를】 입에서 멀리 치운다.`, "purple"));
			break;
		default:
			clearAction("mrest");
			break;
	}
	fragment.append(" ");
	return fragment;
}

function fingersEffect(span, hymenIntact) {
	const fragment = document.createDocumentFragment();
	if (V.fingersInVagina === V.vaginaFingerLimit - 1) {
		fragment.append(" ");
		fragment.append(span("꽉 낀다.", "purple"));
	} else if (V.fingersInVagina === V.vaginaFingerLimit) {
		if (hymenIntact) {
			fragment.append(" ");
			fragment.append(span("처녀막을 찢지 않고는 더 넣을 수 없다.", "pink"));
		} else {
			fragment.append(" ");
			fragment.append(span("한계에 다다랐다.", "pink"));
		}
	}
	return fragment;
}

function possessedMasturbation(span, br) {
	const fragment = document.createDocumentFragment();

	const sWikifier = text => {
		if (T.noMasturbationOutput) return;
		fragment.append(Wikifier.wikifyEval(text));
	};

	if (!V.combatBegun) {
		V.combatBegun = 1;
		return fragment;
	}

	let resist = 0;

	if (["mpenisstopW", "mbreaststopW", "mvaginastopW"].includes(V.leftaction)) resist += 2;
	if (["mpenisstopW", "mbreaststopW", "mvaginastopW"].includes(V.rightaction)) resist += 2;

	if (resist === 0) {
		fragment.append(span("그것에 몸을 맡긴다.", "pink"));
		sWikifier("<<pain -2>><<stress -12>><<sub 2>><<lpain>><<llstress>><<set V.wraith.will += 30>>");
	} else {
		wikifier("willpowerdifficulty", 1, Math.floor(1 + V.wraith.will), true);
		if (V.willpowerSuccess) {
			T.resistSuccess = 1;
			fragment.append(span(`당신은 통제권을 되찾으려 애쓴다. ${resist === 4 ? "두 팔이 굳어" : "팔이 굳어"} 버린다.`, "green"));
			wikifier("pain", resist);
			wikifier("stress", resist);
			wikifier("trauma", resist);
			wikifier("def", 2);
			wikifier("control", (Math.floor(currentSkillValue("willpower") / 24) * resist) / 10);
			V.wraith.will -= Math.floor(currentSkillValue("willpower") / 24) * resist;
			sWikifier(`<<gpain>><<gtrauma>><<gstress>><<${resist === 4 ? "gg" : "g"}control>>`);
		} else {
			fragment.append(span("몸이 말을 듣지 않는다.", "red"));
			["leftaction", "rightaction"].forEach(action => {
				switch (V[action]) {
					case "mbreastW":
					case "mbreaststopW":
						V[action] = "mbreastW";
						break;
					case "mvaginaW":
					case "mvaginastopW":
						V[action] = "mvaginaW";
						break;
					case "mpenisW":
					case "mpenisstopW":
						V[action] = "mpenisW";
						break;
				}
				wikifier("stress", 6);
				wikifier("trauma", 6);
				wikifier("willpower", 1);
				wikifier("def", 1);
				V.wraith.will -= Math.floor(currentSkillValue("willpower") / 40) * resist;
				sWikifier("<<gtrauma>><<gstress>><<gwillpower>>");
			});
		}
		fragment.append(br());
		fragment.append(br());
	}

	return fragment;
}

function masturbationEffectsMouth({
	span,
	otherElement,
	additionalEffect,
	selectedToy,
	toyDisplay,
	genitalsExposed,
	breastsExposed,
	hymenIntact,
	earSlimeDefy,
}) {
	const fragment = document.createDocumentFragment();

	const sWikifier = text => {
		if (T.noMasturbationOutput) return;
		fragment.append(Wikifier.wikifyEval(text));
	};

	const clearAction = defaultAction => {
		if (V.mouthaction && V.mouthaction !== "mrest") V.masturbationActions.mouthaction = V.mouthaction;
		V.mouthactiondefault = defaultAction !== undefined ? defaultAction : V.mouthaction;
		V.mouthaction = 0;
	};

	if (V.mouthaction === 0 || V.mouthaction === "mrest") return fragment;

	const breastsHeld = (V.leftarm === "mbreasthold" ? 1 : 0) + (V.rightarm === "mbreasthold" ? 1 : 0);
	const breastsFondle = (V.leftactiondefault === "mbreastfondle" ? 1 : 0) + (V.rightactiondefault === "mbreastfondle" ? 1 : 0);

	const altText = {};

	// Dealing with the player's actions
	switch (V.mouthaction) {
		case "mbreastentrance":
			clearAction("mbreastlick");
			V.mouth = "mbreast";

			if (breastsHeld > 1) {
				fragment.append(
					Wikifier.wikifyEval(
						`당신은 ${breastsFondle ? "잠깐 가슴 만지는 것을 멈추고 그것들을" : "두 <<breasts>>【을를】"} 입가로 들어 올린다.`
					)
				);
			} else {
				fragment.append(
					Wikifier.wikifyEval(`당신은 ${breastsFondle ? "잠깐 가슴을 만지는 것을 멈추고 그것을" : "가슴을"} 입가로 들어 올린다.`)
				);
			}
			break;
		case "mbreastlick":
			wikifier("arousal", 100 * breastsHeld, "masturbationBreasts");

			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(
					Wikifier.wikifyEval(
						`당신은 떨리는 혀로 드러난 ${
							breastsHeld > 1 ? "<<nipples>>" : "<<nipple>>"
						}【을를】 떨리는 혀로 핥는다. 번개 같은 쾌감이 온몸을 타고 흐른다.`
					)
				);
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(
					Wikifier.wikifyEval(
						`당신은 드러난 ${
							breastsHeld > 1 ? "유륜 주위를 혀끝으로 둥글게 훑는다. <<nipples>>【이가】 단단해진다" : "유륜 주위를 혀끝으로 둥글게 훑는다. <<nipple>>【이가】 단단해진다"
						} 반응한다.`
					)
				);
			} else {
				fragment.append(Wikifier.wikifyEval(`당신은 드러난 ${breastsHeld > 1 ? "<<nipples>>" : "<<nipple>>"}【을를】 핥는다.`));
			}

			if (V.lactating === 1 && V.settings.breastFeedingEnabled === true) {
				fragment.append(" ");
				if (V.milk_amount >= 1) {
					fragment.append(span("젖꼭지에서 모유가 새어 나온다. 달콤한 맛이 난다.", "lewd"));
					fragment.append(" ");
					fragment.append(wikifier("breastfeed", 1 + breastsHeld, undefined, false));
					fragment.append(wikifier("breastfed", T.milk_released)); // PC is breastfed by, well, themselves
				} else {
					fragment.append(span("젖꼭지에서 모유는 새어 나오지 않는다. 말라 있는 모양이다."));
				}
			}
			clearAction(); // Needs to run after any breastfeed widget
			break;
		case "mbreastsuck":
			wikifier("arousal", 200 * breastsHeld, "masturbationBreasts");
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(
					Wikifier.wikifyEval(
						`당신은 달아오른 듯 ${
							breastsHeld > 1 ? "꼿꼿이 선 두 <<nipples>>" : "꼿꼿이 선 <<nipple>>"
						}【을를】 입에 물고 빤다. 쾌감에 몸이 저절로 움찔거린다.`
					)
				);
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(
					Wikifier.wikifyEval(
						`당신은 드러난 ${
							breastsHeld > 1 ? "<<nipples>>【을를】 입술로 단단히 감싸 빨아들인다. 그것들은" : "<<nipple>>【을를】 입술로 단단히 감싸 빨아들인다. 그것은"
						} 혀에 닿아 단단하게 선다.`
					)
				);
			} else {
				fragment.append(Wikifier.wikifyEval(`당신은 드러난 ${breastsHeld > 1 ? "<<nipples>>" : "<<nipple>>"}【을를】 빤다.`));
			}
			if (V.lactating === 1 && V.settings.breastFeedingEnabled === true) {
				fragment.append(" ");
				if (V.milk_amount >= 1) {
					fragment.append(wikifier("breastfeed", breastsHeld, "drunk", false));
					if (T.milk_released <= 5) {
						fragment.append(span(`젖꼭지${breastsHeld > 1 ? "들" : ""}에서 모유가 조금 흘러나와 혀 위에 떨어진다.`, "lewd"));
					} else if (T.milk_released <= 10) {
						fragment.append(span(`젖꼭지${breastsHeld > 1 ? "들" : ""}에서 모유가 꾸준히 흘러 입안으로 들어온다.`, "lewd"));
					} else if (T.milk_released <= 15) {
						fragment.append(
							span(
								`${breastsHeld > 1 ? "가느다란 모유 줄기 몇 가닥이" : "가느다란 모유 줄기 하나가"} 젖꼭지${
									breastsHeld > 1 ? "들" : ""
								}에서 흘러나와 입안을 채운다.`,
								"lewd"
							)
						);
					} else {
						fragment.append(
							span(
								`젖꼭지${breastsHeld > 1 ? "들" : ""}에서 가느다란 모유 줄기들이 뿜어져 나와 무서울 정도로 빠르게 입안을 채운다.`,
								"lewd"
							)
						);
					}
					fragment.append(" ");
					if (T.milk_released >= 15) {
						if (V.oralskill < 200) {
							fragment.append(span("전부 삼키려 애쓰지만, 넘친 모유가 입술 밖으로 흘러 턱을 타고 떨어진다."));
						} else {
							fragment.append(span("삼키기에는 많지만 어떻게든 전부 넘긴다. 놀랄 만큼 달콤하다."));
						}
					} else if (T.milk_released >= 10) {
						if (V.oralskill < 100) {
							fragment.append(span("전부 삼키기 힘들지만 가까스로 넘긴다."));
						} else {
							fragment.append(span("당신은 전부 쉽게 삼킨다. 놀랄 만큼 달콤하다."));
						}
					} else {
						fragment.append(span("삼키기 쉬울 만큼 적은 양이다. 놀랄 만큼 달콤하다."));
					}
					fragment.append(wikifier("breastfed", T.milk_released)); // PC is breastfed by, well, themselves
				} else {
					fragment.append(span("젖꼭지에서 모유는 새어 나오지 않는다. 말라 있는 모양이다."));
				}
			}
			clearAction(); // Needs to run after any breastfeed widget
			break;
		case "mpenisentrance":
			if (V.penisuse === 0) {
				clearAction("mpenislick");
				V.penisuse = "mouth";
				V.mouth = "mpenisentrance";
				if (V.awareness < 200 && V.corruptionMasturbation) {
					wikifier("awareness", 1);
					sWikifier(
						`<span class="red">귀 속의 슬라임이 당신을 억지로 숙이게 만든다. 앞으로 벌어질 일을 좋아하게 될지는 확신할 수 없다.</span><<gawareness>>`
					);
					fragment.append(" ");
				}
				if (genitalsExposed()) {
					wikifier("arousal", 100, "masturbationGenital");
					sWikifier(`<span class="blue">당신은 혀를 뻗어 끝을 핥을 수 있을 만큼 <<penis>> 가까이에 다가간다.</span>`);
				} else {
					sWikifier(
						`<span class="blue">당신은 <<penis>> 위로 혀를 훑는다${
							calculatePenisBulge() ? ", <<exposedlower>> 아래의 불룩한 윤곽을 느끼며" : ""
						}.</span>`
					);
				}
			} else {
				clearAction("mrest");
			}
			break;
		case "mchastityparasiteentrance":
			if (V.penisuse === 0) {
				clearAction("mchastityparasitelick");
				V.penisuse = "mouth";
				V.mouth = "mchastityparasiteentrance";
				if (V.awareness < 200 && V.corruptionMasturbation) {
					wikifier("awareness", 1);
					sWikifier(
						`<span class="red">귀 속의 슬라임이 당신을 억지로 숙이게 만든다. 앞으로 벌어질 일을 좋아하게 될지는 확신할 수 없다.</span><<gawareness>>`
					);
					fragment.append(" ");
				}
				if (genitalsExposed()) {
					wikifier("arousal", 100, "masturbationGenital");
					sWikifier(`<span class="blue">당신은 혀를 뻗어 정조대 기생충을 핥을 수 있을 만큼 가까이 다가간다.</span>`);
				} else {
					sWikifier(
						`<span class="blue">당신은 정조대 기생충 위로 혀를 훑는다${
							calculatePenisBulge() ? ", <<exposedlower>> 아래의 불룩한 윤곽을 느끼며" : ""
						}.</span>`
					);
				}
				if (V.earSlime.defyCooldown) {
					// Do Nothing
				} else if (!V.earSlime.vibration) {
					V.earSlime.vibration = 1;
					wikifier("arousal", 50, "masturbationGenital");
					sWikifier(' <span class="lewd">그것이 <<penis>> 주위에서 부드럽게 맥동하기 시작한다.</span>');
				} else {
					V.earSlime.vibration += 2;
				}
			} else {
				clearAction("mrest");
			}
			break;
		case "mpenislick":
			clearAction("mpenislick");
			if (genitalsExposed()) {
				if (earSlimeDefy()) {
					wikifier("arousal", 100, "masturbationGenital");
					wikifier("pain", 1);
					additionalEffect.earSlimeDefy.pushUnique(V.player.virginity.penile === true ? "virgin penis" : "penis");
					sWikifier(`무언가를 느끼기 위해 억지로 <<penis>>【을를】 거칠게 핥아야 한다.`);
				} else if (V.earSlime.corruption >= 100 && V.earSlime.growth >= 100 && V.earSlime.focus === "impregnation") {
					wikifier("arousal", 400, "masturbationGenital");
					if (V.arousal >= V.arousalmax * (4 / 5)) {
						sWikifier("<<penis>>【은는】 핥을 때마다 과할 만큼 쿠퍼액을 흘린다. 삼켜야 하지만, 멈추지 않는다.");
					} else if (V.arousal >= V.arousalmax * (3 / 5)) {
						sWikifier("당신은 쿠퍼액을 삼키며 <<penis>> 끝을 혀로 훑는다.");
					} else {
						sWikifier("당신은 <<penis>> 끝을 혀로 훑으며 쿠퍼액을 예민한 곳과 입안 전체에 펴 바른다.");
					}
				} else {
					wikifier("arousal", 200, "masturbationGenital");
					if (V.arousal >= V.arousalmax * (4 / 5)) {
						sWikifier("<<penis>>【은는】 핥을 때마다 움찔거리지만, 당신은 멈추지 않는다.");
					} else if (V.arousal >= V.arousalmax * (3 / 5)) {
						sWikifier("당신은 <<penis>> 끝을 혀로 훑으며 침과 쿠퍼액을 뒤섞는다.");
					} else {
						sWikifier("당신은 예민한 곳에 집중하며 <<penis>> 끝을 혀로 훑는다.");
					}
				}
			} else {
				sWikifier(
					`<span class="blue">당신은 <<penis>> 위로 혀를 훑는다${
						calculatePenisBulge() ? ", <<exposedlower>> 아래의 불룩한 윤곽을 느끼며" : ""
					}.</span>`
				);
			}
			break;
		case "mpenistakein":
			clearAction(V.penisHeight === 0 ? "mpenissuck" : "mpenisdeepthroat");
			V.mouth = "mpenis";
			V.mouthstate = "penetrated";
			V.selfsuckDepth = 0;
			wikifier("arousal", 200, "masturbationGenital");
			if (V.penisHeight === 0) {
				sWikifier(`<span class="blue">당신은 <<penis>>【을를】 입에 물고, 음란한 전율이 등골을 타고 오른다.</span>`);
			} else {
				sWikifier(`<span class="blue">당신은 <<penis>> 끝을 입에 물고, 음란한 전율이 등골을 타고 오른다.</span>`);
			}
			break;
		case "mpenisdeepthroat":
			clearAction(V.selfsuckDepth < V.selfsuckLimit ? "mpenisdeepthroat" : "mpenissuck");
			V.selfsuckDepth++;
			wikifier("arousal", 200 + 50 * V.selfsuckDepth, "masturbationGenital");
			sWikifier(`당신은 <<penis>>【을를】 입안 더 깊이 밀어 넣는다. `);
			if (V.selfsuckDepth === V.penisHeight) {
				if (V.leftarm === "mpenisentrance" && V.rightarm === "mpenisentrance") {
					altText.hands = "양손을";
					V.leftarm = 0;
					V.leftarmaction = "mrest";
					V.rightarm = 0;
					V.rightarmaction = "mrest";
				} else if (V.leftarm === "mpenisentrance") {
					altText.hands = "왼손을";
					V.leftarm = 0;
					V.leftarmaction = "mrest";
				} else if (V.rightarm === "mpenisentrance") {
					altText.hands = "오른손을";
					V.rightarm = 0;
					V.rightarmaction = "mrest";
				}
				if (altText.hands) sWikifier(`<span class="lblue">당신은 공간을 만들기 위해 ${altText.hands} <<penis>>에서 뗀다.</span> `);
				fragment.append(deepthroateffects(span));
			}
			break;
		case "mpenispullback":
			V.selfsuckDepth -= 1;
			wikifier("arousal", 200 + 50 * V.selfsuckDepth, "masturbationGenital");
			if (V.selfsuckDepth >= 2) {
				clearAction();
				sWikifier('<span class="lblue">당신은 <<penis>>【을를】 세게 뒤로 당겨 목구멍에서 조금 빼낸다.</span>');
				fragment.append(" ");
				fragment.append(deepthroateffects(span));
			} else if (V.selfsuckDepth === 1) {
				clearAction();
				sWikifier('<span class="lblue">당신은 <<penis>>【을를】 뒤로 당겨 목구멍에서 빼낸다.</span>');
				fragment.append(" ");
				fragment.append(deepthroateffects(span));
			} else {
				clearAction("mpenisstop");
				sWikifier('<span class="lblue">당신은 <<penis>> 끝만 입안에 남을 때까지 뒤로 당긴다.</span>');
			}
			break;
		case "mpenismouthoff":
			clearAction("mrest");
			V.mouth = "mpenisentrance";
			V.mouthstate = 0;
			sWikifier('<span class="lblue">당신은 <<penis>>에서 입을 뗀다.</span>');
			break;
		case "mpenissuck":
			clearAction();
			if (earSlimeDefy()) {
				wikifier("arousal", 100, "masturbationGenital");
				wikifier("pain", 1);
				additionalEffect.earSlimeDefy.pushUnique(V.player.virginity.penile === true ? "virgin penis" : "penis");
				sWikifier(`무언가를 느끼기 위해 억지로 <<penis>>【을를】 거칠게 빨아야 한다.`);
			} else if (V.earSlime.corruption >= 100 && V.earSlime.growth >= 100 && V.earSlime.focus === "impregnation") {
				wikifier("arousal", 400 + 50 * V.selfsuckDepth, "masturbationGenital");
				altText.eagerly = V.arousal >= V.arousalmax * (2 / 5) ? "eagerly" : "slowly";
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					if (V.selfsuckDepth <= 1) {
						sWikifier(
							"당신은 <<penis>>에 머리를 앞뒤로 움직이는 동안 입안으로 흘러드는 쿠퍼액을 계속 삼킨다. 만족스러운 온기가 배를 채운다."
						);
					} else {
						sWikifier(
							"당신이 <<penis>>에 머리를 앞뒤로 움직이자 폭포 같은 쿠퍼액이 목구멍으로 흘러내린다. 만족스러운 온기가 배를 채운다."
						);
					}
				} else {
					if (V.penisHeight === V.selfsuckDepth) {
						if (V.selfsuckDepth >= 2) {
							sWikifier(`당신은 목구멍으로 기둥을 마사지하며 <<penis>> 밑동을 핥는다.`);
						} else {
							sWikifier(`당신은 밑동을 핥으며 <<penis>>【을를】 ${altText.eagerly} 빤다.`);
						}
					} else if (V.selfsuckDepth >= 1) {
						sWikifier(`당신은 기둥을 따라 핥으며 <<penis>>【을를】 ${altText.eagerly} 빤다.`);
					} else {
						sWikifier(`당신은 끝 주위를 핥으며 <<penis>>【을를】 ${altText.eagerly} 빤다.`);
					}
				}
			} else {
				wikifier("arousal", 200 + 50 * V.selfsuckDepth, "masturbationGenital");
				altText.eagerly = V.arousal >= V.arousalmax * (2 / 5) ? "eagerly" : "slowly";
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					if (V.selfsuckDepth <= 1) {
						sWikifier("당신은 <<penis>>에 머리를 앞뒤로 움직이는 동안 입안으로 흘러드는 쿠퍼액을 마신다.");
					} else {
						sWikifier("당신이 <<penis>>에 머리를 앞뒤로 움직이자 쿠퍼액이 목구멍으로 흘러내린다.");
					}
				} else {
					if (V.penisHeight === V.selfsuckDepth) {
						if (V.selfsuckDepth >= 2) {
							sWikifier(`당신은 목구멍으로 기둥을 마사지하며 <<penis>> 밑동을 핥는다.`);
						} else {
							sWikifier(`당신은 밑동을 핥으며 <<penis>>【을를】 ${altText.eagerly} 빤다.`);
						}
					} else if (V.selfsuckDepth >= 1) {
						sWikifier(`당신은 기둥을 따라 핥으며 <<penis>>【을를】 ${altText.eagerly} 빤다.`);
					} else {
						sWikifier(`당신은 끝 주위를 핥으며 <<penis>>【을를】 ${altText.eagerly} 빤다.`);
					}
				}
			}
			break;
		case "mpenisstop":
			clearAction("mrest");
			V.mouth = 0;
			V.penisuse = 0;
			sWikifier(`<span class="lblue">당신은 <<penis>>에서 입을 뗀다.</span>`);
			break;
		case "mchastityparasitelick":
			clearAction();
			if (V.earSlime.defyCooldown) {
				wikifier("arousal", 100, "masturbationGenital");
				wikifier("pain", 4);
				sWikifier(
					`당신은 기생충을 핥는다. 핥을 때마다 기생충이 <span class="lewd">쾌락</span>과 <span class="red">고통</span>의 파도를 번갈아 보낸다.<<gpain>>`
				);
			} else if (V.earSlime.corruption < 100) {
				wikifier("arousal", 200, "masturbationGenital");
				V.earSlime.vibration += 2;
				altText.eagerly = V.arousal >= V.arousalmax * (2 / 5) ? "eagerly" : "slowly";
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					sWikifier(
						`당신은 기생충을 ${altText.eagerly} 핥고, 그때마다 <span class="lewd">기생충이 <<penis>>【으로로】 쾌감의 파도를 보낸다.</span>`
					);
				} else {
					sWikifier(
						`당신은 기생충을 ${altText.eagerly} 핥고, 그때마다 <span class="lewd">기생충이 <<penis>>【으로로】 작은 쾌감의 파도를 보낸다.</span>`
					);
				}
			} else {
				wikifier("arousal", 500, "masturbationGenital");
				V.earSlime.vibration += 4;
				altText.eagerly = V.arousal >= V.arousalmax * (1 / 5) ? "열망하며" : "천천히";
				if (V.arousal >= (V.arousalmax / 5) * 3) {
					wikifier("arousal", 500, "masturbationGenital");
					sWikifier(
						`당신은 힘겹게 기생충을 핥고, 그때마다 <span class="lewd">기생충이 몸 전체로 쾌감의 파도를 보낸다</span>. 감당하기 벅찰 정도다.`
					);
				} else {
					sWikifier(
						`당신은 기생충을 ${altText.eagerly} 핥고, 그때마다 <span class="lewd">기생충이 몸 전체로 쾌감의 파도를 보낸다.</span>`
					);
				}
			}
			break;
		case "mchastityparasitestop":
			clearAction("mrest");
			V.mouth = 0;
			V.penisuse = 0;
			sWikifier(`<span class="lblue">당신은 정조대 기생충에서 입을 뗀다.</span>`);
			break;
		case "mvaginaentrance":
			if (V.vaginause === 0) {
				clearAction("mvaginalick");
				V.mouth = "mvaginaentrance";
				V.vaginause = "mouth";
				wikifier("arousal", 100, "masturbationGenital");
				if (V.awareness < 200 && V.corruptionMasturbation) {
					wikifier("awareness", 1);
					sWikifier(
						`<span class="red">귀 속의 슬라임이 당신을 억지로 숙이게 만든다. 앞으로 벌어질 일을 좋아하게 될지는 확신할 수 없다.</span><<gawareness>>`
					);
					fragment.append(" ");
				}
				if (genitalsExposed()) {
					fragment.append(span(`당신은 드러난 클리 위로 혀를 훑으며 기대감에 몸을 떤다.`, "blue"));
				} else {
					sWikifier(`<span class="blue">당신은 <<exposedlower>> 아래의 <<pussy>>【을를】 느끼며 혀로 훑는다.</span>`);
				}
			} else {
				clearAction("mrest");
			}
			break;
		case "mvaginalick":
			clearAction();
			wikifier("arousal", 100, "masturbationGenital");
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				sWikifier("당신은 <<pussy>>에서 흘러나온 체액을 핥아 올리며 기대감에 몸을 떤다.");
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				sWikifier("당신은 닿기 어려운 곳까지 혀를 뻗으려 하며 <<pussy>>【을를】 핥는다.");
			} else {
				sWikifier("당신은 <<pussy>>【을를】 핥는다.");
			}
			break;
		case "mvaginaclit":
			clearAction();
			wikifier("arousal", 250, "masturbationGenital");
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(span("당신은 클리를 빨고 이빨에 부드럽게 문지르며 기대감에 몸을 떤다."));
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(span("당신은 클리를 핥고 빤다."));
			} else {
				fragment.append(span("당신은 클리를 핥는다."));
			}
			break;
		case "mvaginaclitparasite":
			clearAction();
			wikifier("arousal", 300, "masturbationGenital");
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(
					span(
						`당신은 클리의 ${V.parasite.clit.name}【을를】 빨고 이빨에 부드럽게 문지르며 기대감에 몸을 떤다. 그것이 화답하듯 빨아들이는 감각을 즐긴다.`
					)
				);
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(span(`당신은 클리의 ${V.parasite.clit.name}【을를】 핥고 빨며, 그것이 화답하듯 쾌감을 주는 감각을 즐긴다.`));
			} else {
				fragment.append(span(`당신은 클리의 ${V.parasite.clit.name}【을를】 핥는다.`));
			}
			break;
		case "mvaginastop":
			clearAction("mrest");
			V.mouth = 0;
			V.vaginause = 0;
			sWikifier('<span class="lblue">당신은 <<pussy>>에서 입을 뗀다.</span>');
			break;
		case "maphropill":
			clearAction("mrest");
			if ([0, "disabled"].includes(V.mouth)) {
				wikifier("drugs", 300);
				const pills = V.player.inventory.sextoys["aphrodisiac pills"][0];
				pills.uses -= 1;
				if (pills.uses <= 0) V.player.inventory.sextoys["aphrodisiac pills"].splice(0, 1);
				if (V.drugged > 0) {
					fragment.append(span("당신은 최음제를 입에 넣고 삼킨다. 몸속의 음란한 열기가 더 강해진다."));
				} else {
					fragment.append(span("당신은 최음제를 입에 넣고 삼킨다. 음란한 열기가 배 속에서 퍼지기 시작한다."));
				}
			}
			break;
		case "mdildolick":
			clearAction();
			wikifier("arousal", 100, "masturbationOral");
			if (["mdildomouthentrance", "mdildomouth"].includes(V.leftarm)) {
				altText.selectedToy = selectedToy("left");
			} else if (["mdildomouthentrance", "mdildomouth"].includes(V.rightarm)) {
				altText.selectedToy = selectedToy("right");
			}
			altText.toyDisplay = toyDisplay(altText.selectedToy);

			if (V.mouth === "mdildomouthentrance") {
				if (currentSkillValue("oralskill") < 100) {
					fragment.append(span(`당신은 ${altText.toyDisplay}의 끝을 조심스레 핥으며 혀로 최대한 희롱하려 한다.`));
				} else if (currentSkillValue("oralskill") < 200) {
					wikifier("arousal", 100, "masturbationOral");
					fragment.append(span(`당신은 ${altText.toyDisplay}의 끝을 열심히 핥으며 혀로 최대한 희롱한다.`));
				} else {
					wikifier("arousal", 200, "masturbationOral");
					fragment.append(
						span(`당신은 ${altText.toyDisplay}의 끝을 능숙하게 입맞추고 핥으며, 입술과 혀로 정성껏 애무한다.`)
					);
				}
			} else {
				if (currentSkillValue("oralskill") < 100) {
					if (altText.selectedToy.name.includes("small")) {
						fragment.append(span(`당신은 입안의 ${altText.toyDisplay} 아래쪽을 따라 어색하게 혀를 움직인다.`));
					} else {
						fragment.append(
							span(`당신은 ${altText.toyDisplay}【을를】 따라 핥으려 애쓰지만, 굵기 때문에 혀가 입천장 아래에 눌린다.`)
						);
					}
				} else if (currentSkillValue("oralskill") < 200) {
					wikifier("arousal", 100, "masturbationOral");
					fragment.append(
						span(`당신은 입안의 ${altText.toyDisplay}【을를】 따라 혀를 꿈틀거리며 최대한 많은 부분에 닿으려 한다.`)
					);
				} else {
					wikifier("arousal", 200, "masturbationOral");
					fragment.append(
						span(
							`당신은 입안의 ${altText.toyDisplay}【을를】 따라 능숙하게 혀를 꿈틀거리고, 최대한 많이 닿기 위해 가끔 각도를 조절한다.`
						)
					);
				}
			}
			break;
		case "mdildokiss":
			clearAction();
			wikifier("arousal", 100, "masturbationMouth");
			if (["mdildomouthentrance", "mdildomouth"].includes(V.leftarm)) {
				altText.selectedToy = selectedToy("left");
			} else if (["mdildomouthentrance", "mdildomouth"].includes(V.rightarm)) {
				altText.selectedToy = selectedToy("right");
			}
			altText.toyDisplay = toyDisplay(altText.selectedToy);
			if (currentSkillValue("oralskill") < 100) {
				fragment.append(span(`당신은 ${altText.toyDisplay}의 길이를 따라 서툴게 입맞춘다.`));
			} else if (currentSkillValue("oralskill") < 200) {
				wikifier("arousal", 100, "masturbationMouth");
				fragment.append(span(`당신은 ${altText.toyDisplay}의 길이를 따라 입맞추고, 몸속에서 음란한 열기가 커진다.`));
			} else {
				altText.virginity =
					V.player.virginity.oral === true
						? "언젠가 진짜도 경험해 볼 수 있기를 바라게 된다."
						: "그것을 진짜처럼 대하자 몸속에서 음란한 열기가 피어난다.";
				wikifier("arousal", 200, "masturbationMouth");
				fragment.append(span(`당신은 ${altText.toyDisplay}의 길이를 따라 애정 어린 입맞춤을 연달아 남긴다. ${altText.virginity}`));
			}
			break;
		case "mdildosuck":
			clearAction();
			wikifier("arousal", 100, "masturbationOral");
			if (["mdildomouthentrance", "mdildomouth"].includes(V.leftarm)) {
				altText.selectedToy = selectedToy("left");
			} else if (["mdildomouthentrance", "mdildomouth"].includes(V.rightarm)) {
				altText.selectedToy = selectedToy("right");
			}
			altText.toyDisplay = toyDisplay(altText.selectedToy);
			if (currentSkillValue("oralskill") < 100) {
				fragment.append(span(`당신은 ${altText.toyDisplay}【을를】 최대한 열심히 빤다.`));
			} else if (currentSkillValue("oralskill") < 200) {
				wikifier("arousal", 100, "masturbationOral");
				fragment.append(span(`당신은 ${altText.toyDisplay}【을를】 열심히 빤다.`));
			} else {
				wikifier("arousal", 200, "masturbationOral");
				if (V.player.virginity.oral === true) {
					altText.virginity = "진짜 자지라면 얼마나 다를지 궁금해진다.";
				} else if (V.ejactrait) {
					altText.virginity = "끝나도 보상을 받을 수 없다는 사실에 조금 실망한다.";
				} else {
					altText.virginity = "그것이 진짜라고 상상한다.";
				}
				fragment.append(span(`당신은 ${altText.toyDisplay}【을를】 능숙하게 빨고 희롱한다. ${altText.virginity}`));
			}
			break;
		default:
			clearAction("mrest");
			break;
	}

	fragment.append(" ");
	return fragment;
}

function deepthroateffects(span) {
	const fragment = document.createDocumentFragment();

	const sWikifier = text => {
		if (T.noMasturbationOutput) return;
		fragment.append(Wikifier.wikifyEval(text));
	};

	switch (V.penisHeight) {
		case 0:
			fragment.append(span("오류: 도달할 수 없는 조건입니다.", "red"));
			break;
		case 1:
			switch (V.selfsuckDepth) {
				case 1:
					sWikifier("입술이 <<penis>> 밑동에 닿고, 끝이 입안 깊은 곳을 찌른다.");
					break;
				default:
					fragment.append(span("오류: 도달할 수 없는 조건입니다.", "red"));
					break;
			}
			break;
		case 2:
			switch (V.selfsuckDepth) {
				case 1:
					sWikifier("자지 끝이 목구멍 입구를 찌르고 있다.");
					break;
				case 2:
					sWikifier("끝이 목구멍으로 밀려 들어가며 입술이 <<penis>> 밑동에 닿는다.");
					break;
				default:
					fragment.append(span("오류: 도달할 수 없는 조건입니다.", "red"));
					break;
			}
			break;
		case 3:
			switch (V.selfsuckDepth) {
				case 1:
					sWikifier("자지 끝이 목구멍 입구를 찌르고 있다.");
					break;
				case 2:
					sWikifier("<<penis>>【이가】 목구멍 벽을 벌리고 있다.");
					break;
				case 3:
					sWikifier("기둥이 목구멍을 채우며 입술이 <<penis>> 밑동에 닿는다.");
					break;
				default:
					fragment.append(span("오류: 도달할 수 없는 조건입니다.", "red"));
					break;
			}
			break;
		default:
			fragment.append(span("오류: 도달할 수 없는 조건입니다.", "red"));
			break;
	}
	if (V.selfsuckDepth === V.penisHeight) {
		fragment.append(" ");
		fragment.append(span("끝까지 내려갔다."));
	} else if (V.selfsuckDepth === V.selfsuckLimit) {
		fragment.append(" ");
		fragment.append(span("더 내려갈 만큼 몸이 유연하지 않다."));
	}

	fragment.append(" ");
	return fragment;
}

function masturbationEffectsVaginaAnus({ span, otherElement, additionalEffect, selectedToy, toyDisplay, genitalsExposed, breastsExposed, hymenIntact }) {
	const fragment = document.createDocumentFragment();

	const sWikifier = text => {
		if (T.noMasturbationOutput) return;
		fragment.append(Wikifier.wikifyEval(text));
	};

	const clearAction = (actionType, defaultAction) => {
		V[actionType + "actiondefault"] = defaultAction !== undefined ? defaultAction : V[actionType + "action"];
		V[actionType + "action"] = 0;
	};

	const altText = {};

	switch (V.mouthaction) {
		case "mpenisflowerlick":
			clearAction("mouth");
			wikifier("arousal", 200, "mouth");
			wikifier("drugs", 10);
			V.mouth = "mpenisflowerlick";
			V.moorPhallusPlant = 2;
			switch (random(1, 3)) {
				case 1:
					fragment.append(span("당신은 남근 식물을 거의 입에 넣을 뻔하지만, 갑자기 겁이 난다."));
					break;
				case 2:
					fragment.append(span("당신은 남근 식물의 끝을 핥고 달콤한 액체를 삼킨다."));
					break;
				case 3:
					fragment.append(span("당신은 남근 식물의 끝을 핥는다."));
					break;
			}
			if (V.vaginaaction === "mpenisflowerrub") {
				V.vaginaaction = 0;
				V.vaginaactiondefault = "mrest";
			}
			if (V.anusaction === "mpenisflowerrub") {
				V.anusaction = 0;
				V.anusactiondefault = "mrest";
			}
			break;
		case "mpenisflowertakein":
			clearAction("mouth", "mpenisflowersuck");
			V.mouth = "mpenisflowersuck";
			V.mouthstate = "penetrated";
			wikifier("arousal", 300, "oral");
			wikifier("drugs", 10);
			if (V.player.virginity.oral === true) {
				fragment.append(wikifier("takeVirginity", "'남근 식물'", "oral"));
				fragment.append(" ");
				sWikifier('당신은 식물을 빤다. <span class="red">맛이 아주 이상하다</span>. 몸이 달아오르는 것이 느껴진다.');
			} else {
				fragment.append(span("당신은 식물을 빤다. 아주 달콤한 맛이 나고, 몸이 달아오르는 것이 느껴진다."));
			}
			break;
		case "mpenisflowerstop":
			clearAction("mouth");
			V.mouth = 0;
			V.moorPhallusPlant = 1;
			fragment.append(span("당신은 식물을 핥는 것을 멈춘다.", "lblue"));
			break;
		case "mpenisflowersuck":
			clearAction("mouth");
			wikifier("arousal", 500, "oral");
			wikifier("drugs", 10);
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(span("당신은 식물을 빨며 머리를 앞뒤로 움직이고, 흘러나오는 액체를 삼키며 몸을 떤다."));
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(span("당신은 식물을 빨며 그 액체를 핥아 마신다."));
			} else {
				fragment.append(span("당신은 남근 식물을 빨고 있다."));
			}
			break;
		case "mpenisflowersuckstop":
			clearAction("mouth", "mpenisflowersuck");
			wikifier("arousal", 300, "oral");
			wikifier("drugs", 10);
			fragment.append(
				span("당신의 머리가 계속 위아래로 움직이며 남근 식물을 빤다. 아무리 애써도 스스로 멈출 수 없다.", "red")
			);
			break;
	}

	switch (V.vaginaaction) {
		case "mpenisflowerrub":
			clearAction("vagina");
			V.vaginause = "mpenisflowerrub";
			V.moorPhallusPlant = 2;
			if (!genitalsExposed()) {
				wikifier("arousal", 100, "anal");
				fragment.append(span("옷이 가로막고 있지만, 당신은 가랑이를 식물에 비빈다."));
			} else {
				wikifier("arousal", 200, "anal");
				wikifier("drugs", 10);
				switch (random(1, 3)) {
					case 1:
						fragment.append(
							span(
								"갑자기 치솟은 욕망에 식물 위로 몸을 꿰뚫을 뻔한다. 마지막 순간에 멈추고 식물을 입구 주위에서 부드럽게 돌린다."
							)
						);
						break;
					case 2:
						sWikifier("당신은 <<if $player.penisExist>><<penis>><<else>>클리<</if>>【을를】 식물에 비빈다.");
						break;
					case 3:
						fragment.append(span("당신은 외음부를 남근 식물에 비빈다."));
						break;
				}
			}
			if (V.anusaction === "mpenisflowerrub") {
				V.anusaction = 0;
				V.anusactiondefault = "mrest";
			}
			break;
		case "mpenisflowerpenetrate":
			clearAction("vagina", "mpenisflowerbounce");
			V.vaginause = "mpenisflowerpenetrate";
			V.vaginastate = "penetrated";
			wikifier("arousal", 1000, "vaginal");
			wikifier("vaginalstat");
			wikifier("drugs", 10);
			wikifier("vaginaraped");
			if (V.player.virginity.vaginal === true) {
				fragment.append(span("당신은 몸을 낮춰 식물이 당신을 꿰뚫게 한다."));
				fragment.append(" ");
				fragment.append(wikifier("takeVirginity", "'남근 식물'", "vaginal"));
				fragment.append(" ");
				sWikifier(
					'<span class="red">더는 처녀가 아닌</span> 보지가 식물을 받아들이려 버거워하자 비명을 지를 뻔하지만, 고통은 곧 사라진다.'
				);
			} else {
				fragment.append(span("당신은 몸을 낮춰 식물이 당신을 꿰뚫게 한다. 지금껏 이런 감각은 느껴본 적 없다."));
			}
			break;
		case "mpenisflowerstop":
			clearAction("vagina");
			V.vaginause = 0;
			V.moorPhallusPlant = 1;
			fragment.append(span("당신은 보지를 남근 식물에 비비는 것을 멈춘다.", "lblue"));
			break;
		case "mpenisflowerbounce":
			clearAction("vagina");
			wikifier("arousal", 500, "vaginal");
			wikifier("drugs", 10);
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(span("당신은 굶주린 듯 식물 위에서 몸을 움직이며 최대한 빠르게 비빈다. 그 감각이 미쳐버릴 듯 몰아친다."));
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(span("당신은 남근 식물 위에서 튀어 오른다. 그 감각이 미쳐버릴 듯 몰아친다."));
			} else {
				fragment.append(span("당신은 남근 식물 위에서 부드럽게 튀어 오르고, 찔릴 때마다 쾌감의 파도가 온몸으로 퍼진다."));
			}
			break;
		case "mpenisflowerpenetratestop":
			clearAction("vagina", "mpenisflowerbounce");
			wikifier("arousal", 300, "vaginal");
			wikifier("drugs", 10);
			fragment.append(span("다리가 식물에서 몸을 들어 올리지 못한다. 몸이 말을 듣지 않는 것 같다.", "red"));
			break;
		case "mdildopenetratebounce":
			clearAction("vagina");
			wikifier("arousal", 300, "masturbationVagina");
			altText.selectedToy = selectedToy("vagina");
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				sWikifier(`당신은 굶주린 듯 ${toyDisplay(altText.selectedToy)} 위에서 몸을 움직이며 최대한 빠르게 비빈다.`);
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				sWikifier(`당신은 ${toyDisplay(altText.selectedToy)} 위에서 튀어 오른다.`);
			} else {
				sWikifier(`당신은 ${toyDisplay(altText.selectedToy)} 위에서 부드럽게 튀어 오른다.`);
			}
			break;
		case "mdildopenetratestop":
			clearAction("vagina", "mrest");
			V.vaginause = 0;
			altText.selectedToy = selectedToy("vagina", false);
			fragment.append(span(`당신은 보지를 ${toyDisplay(altText.selectedToy)}에 비비는 것을 멈추고 그것을 떨어뜨린다.`, "lblue"));
			break;
	}
	fragment.append(" ");

	switch (V.anusaction) {
		case "mpenisflowerrub":
			clearAction("anus");
			V.anususe = "mpenisflowerrub";
			V.moorPhallusPlant = 2;
			if (!genitalsExposed()) {
				wikifier("arousal", 100, "anal");
				fragment.append(span("옷이 가로막고 있지만, 당신은 엉덩이를 식물에 비빈다."));
			} else {
				wikifier("arousal", 200, "anal");
				wikifier("drugs", 10);
				switch (random(1, 3)) {
					case 1:
						fragment.append(
							span(
								"식물 전체를 항문 안으로 받아들일 뻔하지만, 마지막 순간에 멈춘다. 식물을 입구 주위에서 부드럽게 돌린다."
							)
						);
						break;
					case 2:
						sWikifier("당신은 남근 식물을 <<bottom>> 골 사이에 비빈다.");
						break;
					case 3:
						fragment.append(span("당신은 항문을 남근 식물에 비빈다."));
						break;
				}
			}
			break;
		case "mpenisflowerpenetrate":
			clearAction("anus", "mpenisflowerbounce");
			V.anususe = "mpenisflowerpenetrate";
			wikifier("arousal", 1000, "anal");
			wikifier("analstat");
			wikifier("drugs", 10);
			if (V.player.virginity.anal === true) {
				fragment.append(span("당신은 몸을 낮춰 식물이 당신을 꿰뚫게 한다."));
				fragment.append(" ");
				fragment.append(wikifier("takeVirginity", "'남근 식물'", "anal"));
				fragment.append(" ");
				sWikifier(
					'<span class="red">더는 처녀가 아닌</span> 항문이 식물을 받아들이려 버거워하자 비명을 지를 뻔하지만, 고통은 곧 사라진다.'
				);
			} else {
				fragment.append(span("당신은 몸을 낮춰 식물이 당신을 꿰뚫게 한다. 지금껏 이런 감각은 느껴본 적 없다."));
			}
			break;
		case "mpenisflowerstop":
			clearAction("anus");
			V.anususe = 0;
			V.moorPhallusPlant = 1;
			fragment.append(span("당신은 항문을 남근 식물에 비비는 것을 멈춘다", "lblue"));
			break;
		case "mpenisflowerbounce":
			clearAction("anus");
			wikifier("arousal", 500, "anal");
			wikifier("drugs", 10);
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(span("당신은 거칠게 식물 위에서 몸을 움직이며 최대한 빠르게 비빈다. 지금껏 느낀 어떤 감각과도 다르다."));
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(
					span(`당신은 식물 위에서 몸을 움직인다${V.player.penisExist ? ", 전립선에 닿게 하려 애쓰며" : ""}. 지금껏 느낀 어떤 감각과도 다르다.`)
				);
			} else {
				fragment.append(span("당신은 남근 식물 위에서 부드럽게 몸을 움직이고, 찔릴 때마다 쾌감의 파도가 온몸으로 퍼진다."));
			}
			break;
		case "mpenisflowerpenetratestop":
			clearAction("anus", "mpenisflowerbounce");
			wikifier("arousal", 300, "anal");
			wikifier("drugs", 10);
			fragment.append(span("다리가 식물에서 몸을 들어 올리지 못한다. 몸이 말을 듣지 않는 것 같다.", "red"));
			break;
		case "mdildopenetratebounce":
			clearAction("anus");
			wikifier("arousal", 300, "masturbationAnal");
			altText.selectedToy = selectedToy("anus");
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				sWikifier(`당신은 굶주린 듯 ${toyDisplay(altText.selectedToy)} 위에서 몸을 움직이며 최대한 빠르게 비빈다.`);
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				sWikifier(`당신은 ${toyDisplay(altText.selectedToy)} 위에서 튀어 오른다.`);
			} else {
				sWikifier(`당신은 ${toyDisplay(altText.selectedToy)} 위에서 부드럽게 튀어 오른다.`);
			}
			break;
		case "mdildopenetratestop":
			clearAction("anus", "mrest");
			V.anususe = 0;
			altText.selectedToy = selectedToy("anus", false);
			fragment.append(span(`당신은 항문을 ${toyDisplay(altText.selectedToy)}에 비비는 것을 멈추고 그것을 떨어뜨린다.`, "lblue"));
			break;
	}

	fragment.append(" ");
	return fragment;
}

Macro.add("masturbationeffects", {
	handler() {
		const fragment = masturbationEffects();
		this.output.append(fragment);
	},
});
