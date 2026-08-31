/*
	Old version can be found at https://gitgud.io/Vrelnir/degrees-of-lewdity/-/blob/master/game/special-masturbation/actions.twee?ref_type=0c2b0126
*/
function masturbationActions() {
	const fragment = document.createDocumentFragment();

	const playerToys = listUniqueCarriedSextoys().filter(
		toy => (V.player.penisExist && !playerChastity("penis") && toy.type.includesAny("stroker")) || toy.type.includesAny("dildo", "breastpump", "vibrator")
	);

	const selectedToy = location => {
		if (V["currentToy" + location.toLocaleUpperFirst()] === "none") return 0;
		const toy = clone(playerToys[V["currentToy" + location.toLocaleUpperFirst()]]);
		return toy;
	};
	const toyDisplay = (toy1, toy2) => {
		if (toy1 && toy2) return (toy1.colour ? setup.colourName(toy1.colour) + " " : "") + toy1.name + " 그리고 " + (toy2.colour ? setup.colourName(toy2.colour) + " " : "") + toy2.name;
		if (toy1) return (toy1.colour ? setup.colourName(toy1.colour) + " " : "") + toy1.name;
		return "";
	};
	const genitalsExposed = () => V.worn.over_lower.vagina_exposed >= 1 && V.worn.lower.vagina_exposed >= 1 && V.worn.under_lower.vagina_exposed >= 1;
	const breastsExposed = () => V.worn.over_upper.exposed >= 1 && V.worn.upper.exposed >= 1 && V.worn.under_upper.exposed >= 1;
	const ballsExposed = () => genitalsExposed() && !playerChastity("hidden") && V.worn.genitals.name !== "chastity parasite";

	const otherVariables = { playerToys, selectedToy, toyDisplay, genitalsExposed, breastsExposed, ballsExposed };

	const generateOption = (actionVariable, option) => {
		let result = "";

		if (option.action) {
			result += "<label>";
			result += `<<radiobutton "$${actionVariable}" "${option.action}" autocheck>> `;
		}
		if (option.text) {
			if (option.colour) {
				result += `<span class="${option.colour}">${option.text}</span>`;
			} else {
				result += option.text;
			}
		}
		if (option.otherElements) {
			result += " " + option.otherElements;
		}
		if (option.action) {
			result += "</label>";
		}

		return result;
	};

	const generateListOption = (actionVariable, options) => {
		let result = "";

		result += `<label><<listbox "$${actionVariable}" autoselect>></label>`;

		options.forEach(option => {
			result += `<<option "${option.text}" ${option.action}>>`;
		});

		result += "<</listbox>></label>";

		return result;
	};

	// Display the options
	[
		masturbationActionsHands("left", otherVariables),
		masturbationActionsHands("right", otherVariables),
		masturbationActionsMouth(otherVariables),
		masturbationActionsVagina(otherVariables),
		masturbationActionsAnus(otherVariables),
	].forEach(action => {
		if (action.options && action.options.length) {
			if (!T.noMasturbationOutput) {
				fragment.append(Wikifier.wikifyEval(action.text));
				fragment.append(document.createElement("br"));
			}

			// Attempt to ensure an action is selected, set to "mrest" or the first available action if it doesn't exist
			if (action.options.find(option => option.action === V[action.actionVariable + "default"])) {
				V[action.actionVariable] = V[action.actionVariable + "default"];
			} else if (!V.corruptionMasturbation && action.options.find(option => option.action === "mrest")) {
				V[action.actionVariable] = "mrest";
			} else if (action.options[0]) {
				V[action.actionVariable] = action.options[0].action;
			} else {
				V[action.actionVariable] = 0;
			}
			if (!T.noMasturbationOutput) {
				switch (V.options.masturbationControls) {
					case "lists":
						// Demo of alternate control styles
						fragment.append(Wikifier.wikifyEval(generateListOption(action.actionVariable, action.options)));
						break;
					default:
						action.options.forEach(option => {
							fragment.append("| ");
							fragment.append(Wikifier.wikifyEval(generateOption(action.actionVariable, option)));
							fragment.append(" ");
						});
						break;
				}

				fragment.append(document.createElement("br"));
				fragment.append(document.createElement("br"));
			}
		}
	});

	if (V.arousal >= V.arousalmax && !V.possessed && !T.noMasturbationOutput) {
		fragment.append(wikifier("orgasm"));
		fragment.append(wikifier("promiscuity1"));
		V.masturbationorgasmstat++;
		V.masturbationOrgasmTimeStat = Time.date.timeStamp;
		V.masturbationorgasm++;
		if (V.femaleclimax !== 1 && !T.deniedOrgasm && V.worn.genitals.name !== "chastity parasite" && V.mouth !== "mpenis") {
			V.masturbationorgasmsemen++;
		}
		fragment.append(wikifier("purity", -1));
		if (V.corruptionMasturbation && V.corruptionMasturbationCount) V.corruptionMasturbationCount--;
	}
	fragment.append(wikifier("pass", 10, "seconds"));
	V.secondsSpentMasturbating += 10;

	// Updates the control caption at the top of the screen to include any control gained through the rest of the passage
	if (V.possessed && !T.noMasturbationOutput) {
		$(() => {
			Dynamic.render("control-caption");
		});
	}

	return fragment;
}

function masturbationActionsHands(arm, { playerToys, selectedToy, toyDisplay, genitalsExposed, breastsExposed, ballsExposed }) {
	const result = {
		text: "",
		options: [],
		actionVariable: arm + "action",
	};
	const toyDropDown = limit => {
		const toys = listUniqueCarriedSextoys().filter(toy => {
			if (limit === "breastpump") return toy.type.includes("breastpump");
			return (
				(V.player.penisExist && !playerChastity("penis") && toy.type.includesAny("stroker")) || toy.type.includesAny("dildo", "breastpump", "vibrator")
			);
		});
		let count = 0;

		let result = `<label><<listbox "$selectedToy${arm.toLocaleUpperFirst()}" autoselect>>`;
		toys.forEach((toy, index) => {
			if (index !== V.currentToyLeft && index !== V.currentToyRight && index !== V.currentToyVagina && index !== V.currentToyAnus) {
				result += `<<option "${toyDisplay(toy)}" ${index}>>`;
				count++;
			}
		});
		if (!count) return;

		result += "<</listbox>></label>";
		return result;
	};
	const stop = action => {
		return {
			action,
			text: "손을 뗀다",
		};
	};

	const actiondefault = arm + "actiondefault";
	const otherArm = arm === "left" ? "right" : "left";
	const armk = arm === "left" ? "왼" : "오른";
	const altText = {};

	switch (V[arm + "arm"]) {
		case 0:
			result.text = `당신의 ${armk}손은 자유롭다.`;
			if (V.player.penisExist) {
				if (
					(V.awareness >= 400 || V.earSlime.event.includes("get your own sperm into your")) &&
					V.masturbationorgasmsemen >= 1 &&
					V[arm + "FingersSemen"] !== 1
				) {
					result.options.push({
						action: "msemencover",
						text: "손가락에 정액을 묻힌다",
						colour: "sub",
						otherElements: V.earSlime.event.includes("get your own sperm into your") ? undefined : "<<combataware 5>>",
					});
				}
				if (!playerChastity("penis")) {
					result.options.push({
						action: "mpenisentrance",
						text: V.player.sex === "f" && V.parasite.clit.name === "parasite" ? "기생충 음경을 만진다" : "자지를 만진다",
						colour: "sub",
					});
				} else if (V.worn.genitals.name === "chastity parasite") {
					result.options.push({
						action: "mchastityparasiteentrance",
						text: "정조대 기생충을 애무한다",
						colour: "sub",
					});
				} else {
					result.options.push({
						action: "mpenischastity",
						text: V.player.sex === "f" && V.parasite.clit.name === "parasite" ? "기생충 음경을 만지려 한다" : "자지를 만지려 한다",
						colour: "sub",
					});
				}
				if (V.player.ballsExist && ballsExposed() && V.ballssize >= 0 && (V.ballssize >= 3 || V[otherArm + "arm"] !== "mballs")) {
					result.options.push({
						action: "mballsentrance",
						text: "불알을 애무한다",
						colour: "sub",
					});
				}
			}
			if (V.player.vaginaExist) {
				if (!playerChastity("vagina")) {
					result.options.push({
						action: "mvaginaentrance",
						text: "보지를 애무한다",
						colour: "sub",
					});
				} else {
					result.options.push({
						action: "mvaginachastity",
						text: "보지를 애무하려 시도한다",
						colour: "sub",
					});
				}
			}
			if (V.awareness >= 200 && V.player.breastsize >= 3) {
				result.options.push({
					action: "mbreasthold",
					text: `당신의${V[otherArm + "arm"] === "mbreasthold" ? " 다른" : ""} 가슴을 붙잡는다`,
					colour: "sub",
					otherElements: "<<combataware 3>>",
				});
			} else if (V.awareness >= 100) {
				result.options.push({
					action: "mchest",
					text: "가슴을 애무한다",
					colour: "sub",
					otherElements: "<<combataware 2>>",
				});
			}
			if (V.awareness >= 200) {
				if (!playerChastity("anus")) {
					result.options.push({
						action: "manusentrance",
						text: "항문을 쓰다듬는다",
						colour: "sub",
						otherElements: "<<combataware 3>>",
					});
				}
				if (["home", "brothel", "cafe"].includes(V.location) || T.enableSexToys) {
					altText.toyDropDown = toyDropDown();
					if (altText.toyDropDown) {
						result.options.push({
							action: "mpickupdildo",
							text: "장난감 사용:",
							colour: "green",
							otherElements: `${altText.toyDropDown} <<combataware 3>>`,
						});
					}
				}
			} else if (playerToys.find(toy => toy.type.includes("breastpump")) && playerNormalPregnancyTotal() && ["home", "alex_farm"].includes(V.location)) {
				// To specifically enable filling bottles for babies, location should be expanded on when required
				altText.toyDropDown = toyDropDown("breastpump");
				if (altText.toyDropDown) {
					result.options.push({
						action: "mpickupdildo",
						text: "유축기 사용:",
						colour: "green",
						otherElements: `${altText.toyDropDown}`,
					});
				}
			}
			break;
		case "mpenisentrance":
			result.text = `당신은 ${V.player.penissize >= 2 ? `${armk}손으로` : `${armk} 엄지와 손가락으로`} <<penis>>【을를】 쥔다.`;
			if (V.mouth !== "mpenis") {
				result.options.push({
					action: "mpenisglans",
					text: "귀두를 애무한다",
					colour: "sub",
				});
			}
			if (!(V.mouth === "mpenis" && V.selfsuckDepth === V.penisHeight)) {
				result.options.push({
					action: "mpenisshaft",
					text: "기둥을 문지른다",
					colour: "sub",
				});
			}
			result.options.push(stop("mpenisstop"));
			break;
		case "mchastityparasiteentrance":
			result.text = `당신은 ${V.player.penissize >= 2 ? `${armk}손으로` : `${armk} 엄지와 손가락으로`} 정조대 기생충을 쥔다.`;
			if (V.mouth !== "mpenis") {
				result.options.push({
					action: "mchastityparasiterub",
					text: "기생충을 문지른다",
					colour: "sub",
				});
			}
			if (!(V.mouth === "mpenis")) {
				result.options.push({
					action: "mchastityparasitesqueeze",
					text: "기생충을 쥐어짠다",
					colour: "sub",
				});
			}
			result.options.push(stop("mchastityparasitestop"));
			break;
		case "mvaginaentrance":
			result.text = `당신은 ${armk}손으로 <<pussy>>【을를】 문지른다.`;
			if (genitalsExposed()) {
				/* Can't recall the intention for this commented out piece, leaving it in for now in case I recall later */
				if (V.vaginause === 0 /* && ([0, "mvaginaentrance"].includes(V[otherArm + "arm"]) || V[otherArm + "arm"].startsWith("mvagina")) */) {
					if (V.vaginaFingerLimit >= 3 && currentSkillValue("vaginalskill") >= 300) {
						result.options.push({
							action: "mvaginafingerstarttwo",
							text: "손가락 두 개를 넣는다",
							colour: "sub",
						});
					}
					result.options.push({
						action: "mvagina",
						text: "손가락을 넣는다",
						colour: "sub",
					});
				}
				if (!V.parasite.clit.name) {
					result.options.push({
						action: "mvaginaclit",
						text: "클리토리스를 희롱한다",
						colour: "sub",
					});
				} else if (V.parasite.clit.name !== "parasite") {
					result.options.push({
						action: "mvaginaclitparasite",
						text: `클리토리스 ${V.parasite.clit.name}【을를】 가지고 논다`,
						colour: "sub",
					});
				}
			}
			result.options.push({
				action: "mvaginarub",
				text: "외음부를 문지른다",
				colour: "sub",
			});
			result.options.push(stop("mvaginastop"));
			break;
		case "mvagina":
			result.text = `당신은 <<pussy>> 안에 <<number $fingersInVagina>>개의 <<pluralise $fingersInVagina "손가락">>【을를】 넣고 있다.${
				V.fingersInVagina === V.vaginaFingerLimit ? " 더는 들어가지 않는다." : ""
			}`;
			if (V.fingersInVagina < V.vaginaFingerLimit - 1 && V.fingersInVagina < 4 && currentSkillValue("vaginalskill") >= 300) {
				result.options.push({
					action: "mvaginafingeraddtwo",
					text: "손가락 두 개를 더 넣는다",
					colour: "sub",
				});
			}
			if (V.fingersInVagina < V.vaginaFingerLimit) {
				if (V.fingersInVagina === 4) {
					result.options.push({
						action: "mvaginafistadd",
						text: "손을 넣는다",
						colour: "sub",
					});
				} else {
					result.options.push({
						action: "mvaginafingeradd",
						text: "손가락을 하나 더 넣는다",
						colour: "sub",
					});
				}
			}
			if (V.fingersInVagina >= 1) {
				result.options.push({
					action: "mvaginafingerremove",
					text: "손가락 하나를 뺀다",
					colour: "sub",
				});
			}
			result.options.push({
				action: "mvaginatease",
				text: "보지를 손가락으로 희롱한다",
				colour: "sub",
			});
			result.options.push(stop("mvaginastop"));
			break;
		case "mvaginafist":
			result.text = "손 전체가 당신의 <<pussy>> 안에 있다. 주먹을 꽉 조이는 느낌이 든다.";
			result.options.push({
				action: "mvaginafist",
				text: "보지에 주먹을 넣는다",
				colour: "sub",
			});
			result.options.push({
				action: "mvaginafingerremove",
				text: "손가락 하나를 뺀다",
				colour: "sub",
			});
			if (currentSkillValue("vaginalskill") >= 700) {
				result.options.push({
					action: "mvaginafistremove",
					text: "손을 뺀다",
					colour: "sub",
				});
			}
			break;
		case "mvaginaentrancedildo":
			if (!selectedToy(arm)) {
				result.text = `선택한 장난감이 없어 ${armk}손은 자유롭다.`;
				result.options.push(stop("mvaginastopdildo"));
			} else if (playerChastity("vagina")) {
				result.text = `${V.worn.genitals.name}【이가】 방해가 된다.`;
				result.options.push(stop("mvaginastopdildo"));
			} else {
				result.text = `당신은 ${armk}손에 든 ${toyDisplay(selectedToy(arm))}${V.worn.genitals.name ? "" : ""}【으로로】 <<pussy>>【을를】 문지른다.${
					["anal beads", "butt plug"].includes(selectedToy(arm).name) ? " 낯선 감각이지만, 그래도 즐긴다." : ""
				}`;
				if (genitalsExposed() && !["mvagina", "mvaginadildo"].includes(V[otherArm + "arm"])) {
					result.options.push({
						action: "mvaginadildo",
						text: `${toyDisplay(selectedToy(arm))}【을를】 밀어 넣는다`,
						colour: "sub",
					});
				}
				if (V.player.vaginaExist && !playerChastity("vagina")) {
					if (!V.parasite.clit.name) {
						result.options.push({
							action: "mvaginaclitdildo",
							text: "클리토리스를 희롱한다",
							colour: "sub",
						});
					}
					result.options.push({
						action: "mvaginarubdildo",
						text: "외음부를 문지른다",
						colour: "sub",
					});
				}
				result.options.push(stop("mvaginastopdildo"));
			}
			break;
		case "mvaginadildo":
			result.text = `당신은 ${armk}손에 든 ${toyDisplay(selectedToy(arm))}【으로로】 보지를 쑤신다.`;
			result.options.push({
				action: "mvaginateasedildo",
				text: "놀린다",
				colour: "sub",
			});
			result.options.push(stop("mvaginastopdildo"));
			break;
		case "mbreasthold":
			result.text = `당신은 ${armk}손으로 ${armk} 가슴을 붙잡는다.`;
			result.options.push({
				action: "mbreastfondle",
				text: "가슴을 애무한다",
				colour: "sub",
			});
			if (
				breastsExposed() &&
				(V.masochism >= 100 || (V.corruptionMasturbation && actiondefault === "mbreastpinch")) &&
				V.mouth !== "mbreast" &&
				!V.bugsinside
			) {
				result.options.push({
					action: "mbreastpinch",
					text: "유두를 꼬집는다",
					colour: "sub",
				});
			}
			result.options.push(stop("mbreaststop"));
			break;
		case "manusentrance":
			result.text = `당신은 ${armk}손으로 항문을 희롱한다.`;
			if (genitalsExposed() && [0, "manus"].includes(V.anususe)) {
				result.options.push({
					action: "manus",
					text: "손가락을 넣는다",
					colour: "sub",
				});
			}
			result.options.push({
				action: "manusrub",
				text: "항문을 애태운다",
				colour: "sub",
			});
			result.options.push(stop("manusstop"));
			break;
		case "manus":
			result.text = `당신은 ${armk}손으로 항문을 희롱한다.`;
			result.options.push({
				action: "manustease",
				text: "놀린다",
				colour: "sub",
			});
			if (V.player.sex !== "f") {
				result.options.push({
					action: "manusprostate",
					text: "전립선을 애태운다",
					colour: "sub",
				});
			}
			result.options.push(stop("manusstop"));
			break;
		case "manusentrancedildo":
			result.text = `당신은 ${armk}손의 ${toyDisplay(selectedToy(arm))}【으로로】 항문을 희롱한다.`;
			if (genitalsExposed() && !playerChastity("anus")) {
				result.options.push({
					action: "manusdildo",
					text: `${toyDisplay(selectedToy(arm))}【을를】 밀어 넣는다`,
					colour: "sub",
				});
			}
			result.options.push({
				action: "manusrubdildo",
				text: `${toyDisplay(selectedToy(arm))}【으로로】 항문을 희롱한다`,
				colour: "sub",
			});
			result.options.push(stop("manusstopdildo"));
			break;
		case "manusdildo":
			result.text = `당신은 ${armk}손에 든 ${toyDisplay(selectedToy(arm))}【으로로】 항문을 희롱한다.`;
			result.options.push({
				action: "manusteasedildo",
				text: "놀린다",
				colour: "sub",
			});
			if (V.player.sex !== "f") {
				result.options.push({
					action: "manusprostatedildo",
					text: "전립선을 애태운다",
					colour: "sub",
				});
			}
			result.options.push(stop("manusstopdildo"));
			break;
		case "mpenisentrancestroker":
			result.text = `당신은 ${armk}손의 ${toyDisplay(selectedToy(arm))}【으로로】 귀두를 희롱한다.`;
			if (genitalsExposed()) {
				result.options.push({
					action: "mpenisstroker",
					text: `${toyDisplay(selectedToy(arm))}에 삽입한다`,
					colour: "sub",
				});
				result.options.push({
					action: "mpenisstrokertease",
					text: `${toyDisplay(selectedToy(arm))}【으로로】 귀두를 희롱한다`,
					colour: "sub",
				});
			}
			result.options.push(stop("mpenisstopstroker"));
			break;
		case "mpenisstroker":
			result.text = `당신의 <<penis>>【은는】 ${armk}손에 든 ${toyDisplay(selectedToy(arm))} 안으로 파고든다.`;
			result.options.push({
				action: "mpenisstroker",
				text: "자위한다",
				colour: "sub",
			});
			result.options.push(stop("mpenisstopstroker"));
			break;
		case "mbreastpump":
			result.text = `당신은 ${toyDisplay(selectedToy(arm))}【을를】 <<breasts>>에 가져다 댄다.`;
			result.options.push({
				action: "mbreastpumppump",
				text: "당신의 <<breasts>>에서 착유한다",
				colour: "sub",
			});
			result.options.push(stop("mstopbreastpump"));
			break;
		case "mdildomouthentrance":
			result.text = `당신의 ${toyDisplay(selectedToy(arm))}【은는】 ${armk}손에 들린 채 입가에 있다.`;
			result.options.push({
				action: "mdildomouth",
				text: "입에 밀어 넣는다",
				colour: "sub",
			});
			result.options.push(stop("mmouthstopdildo"));
			break;
		case "mdildomouth":
			result.text = `당신의 ${armk}손이 ${toyDisplay(selectedToy(arm))}【을를】 입 안에 잡고 있다.`;
			result.options.push({
				action: "mdildopiston",
				text: "앞뒤로 움직인다",
				colour: "sub",
			});
			result.options.push(stop("mmouthstopdildo"));
			break;
		case "mpickupdildo":
			result.text = `당신은 ${toyDisplay(selectedToy(arm))}【을를】 ${armk}손에 쥐고 있다.`;
			if (selectedToy(arm).type.includes("stroker")) {
				if (V.player.penisExist && (V.penisuse === 0 || V.penisuse === "stroker")) {
					result.options.push({
						action: "mpenisentrancestroker",
						text: "자지로 옮긴다",
						colour: "sub",
					});
				}
				result.options.push(stop("mpenisstopstroker"));
			} else if (selectedToy(arm).type.includes("breastpump")) {
				if (breastsExposed() && V.player.breastsize >= 1) {
					result.options.push({
						action: "mbreastpump",
						text: "당신의 <<breasts true>>【으로로】 옮긴다",
						colour: "sub",
					});
				}
				result.options.push(stop("mstopbreastpump"));
			} else {
				if (V.player.vaginaExist && V.vaginause === 0) {
					if (V.vaginause !== "mdildopenetrate" && V.anususe !== "mdildopenetrate") {
						result.options.push({
							action: "mvaginaentrancedildo",
							text: "보지로 옮긴다",
							colour: "sub",
						});
					}
					if (genitalsExposed() && V.awareness >= 300 && currentSkillValue("vaginalskill") >= 300 && !selectedToy(arm).name.includes("small")) {
						result.options.push({
							action: "mvaginaentrancedildofloor",
							text: "보지 옆 바닥에 놓는다",
							colour: "sub",
							otherElements: "<<combataware 4>>",
						});
					}
				}
				if (V.anususe === 0) {
					if (V.vaginause !== "mdildopenetrate" && V.anususe !== "mdildopenetrate") {
						result.options.push({
							action: "manusentrancedildo",
							text: "항문으로 옮긴다",
							colour: "sub",
						});
					}
					if (genitalsExposed() && V.awareness >= 300 && currentSkillValue("analskill") >= 300 && !selectedToy(arm).name.includes("small")) {
						result.options.push({
							action: "manusentrancedildofloor",
							text: "항문 옆 바닥에 놓는다",
							colour: "sub",
							otherElements: "<<combataware 4>>",
						});
					}
				}
				switch (selectedToy(arm).name) {
					case "wand vibe":
					case "bullet vibe":
						if (V.player.penisExist && V.penisuse === 0 && !playerChastity("penis")) {
							result.options.push({
								action: "mpenisvibrate",
								text: "자지에 대고 있는다",
								colour: "sub",
							});
						}
						if (V.player.vaginaExist && !playerChastity("vagina")) {
							if (!V.parasite.clit.name) {
								result.options.push({
									action: "mvaginaclitvibrate",
									text: "클리토리스에 대고 있는다",
									colour: "sub",
								});
							} else if (V.parasite.clit.name !== "parasite") {
								result.options.push({
									action: "mvaginaclitvibrateparasite",
									text: `클리토리스 ${V.parasite.clit.name}에 가져다 댄다`,
									colour: "sub",
								});
							}
						}
						result.options.push({
							action: "mchestvibrate",
							text: "유두에 누른다",
							colour: "sub",
						});
						break;
					case "small dildo":
					case "dildo":
						if (V.mouth === 0) {
							result.options.push({
								action: "mdildomouthentrance",
								text: "입에 대고 있는다",
								colour: "sub",
							});
							break;
						}
				}
				result.options.push(stop("mdildostop"));
			}
			break;
		case "mballs":
			result.text = `당신은 ${armk}손으로 ${V.ballssize >= 3 ? "" : ""}${V.ballsText}【을를】 쥔다.`;
			result.options.push({
				action: "mballsfondle",
				text: "애무한다",
				colour: "sub",
			});
			result.options.push({
				action: "mballssqueeze",
				text: "쥐어짠다",
				colour: "sub",
			});
			result.options.push(stop("mballsstop"));
			break;
		case "bound":
			result.text = `당신의 ${armk}팔은 묶여 있다.`;
			break;
		case "possessed":
			if (V.lactating && V.settings.breastFeedingEnabled === true && arm === "right") {
				result.text =
					actiondefault === "mbreastW"
						? `당신은 저도 모르게 ${armk}손으로 <<breasts>>【을를】 꼬집고 주무른다.`
						: `당신의 ${armk}손이 <<breasts>> 위에서 맴돈다.`;
				result.options.push({
					action: "mbreastW",
					text: "가슴을 애무한다",
					colour: "wraith",
				});
				result.options.push({
					action: "mbreaststopW",
					text: "팔을 가만히 둔다",
					colour: "brat",
				});
			} else if (V.player.penisExist && (arm === "left" || !V.player.vaginaExist)) {
				if (V.worn.genitals.name === "chastity parasite") {
					result.text =
						actiondefault === "mpenisW"
							? `당신은 저도 모르게 ${armk}손으로 정조대를 희롱한다.`
							: `당신의 ${armk}손이 정조대 기생충 위에서 맴돈다.`;
					result.options.push({
						action: "mpenisW",
						text: "기생충을 문지른다",
						colour: "wraith",
					});
					result.options.push({
						action: "mpenisstopW",
						text: "팔을 가만히 둔다",
						colour: "brat",
					});
				} else {
					result.text =
						actiondefault === "mpenisW"
							? `당신은 저도 모르게 ${armk}손으로 <<penis>>【을를】 문지른다.`
							: `당신의 ${armk}손이 <<penis>> 위에서 맴돈다.`;
					result.options.push({
						action: "mpenisW",
						text: "기둥을 문지른다",
						colour: "wraith",
					});
					result.options.push({
						action: "mpenisstopW",
						text: "팔을 가만히 둔다",
						colour: "brat",
					});
				}
			} else {
				result.text =
					actiondefault === "mvaginaW"
						? `당신은 저도 모르게 ${armk}손으로 <<pussy>>【을를】 문지른다.`
						: `당신의 ${armk}손이 <<pussy>> 위에서 맴돈다.`;
				result.options.push({
					action: "mvaginaW",
					text: "보지를 애무한다",
					colour: "wraith",
				});
				result.options.push({
					action: "mvaginastopW",
					text: "팔을 가만히 둔다",
					colour: "brat",
				});
			}
			break;
		default:
			break;
	}

	if (V[arm + "arm"] !== "bound") {
		if (V.worn.over_upper.exposed <= 1) result.options.push({ action: "moverupper", text: `${V.worn.over_upper.name}【을를】 비켜낸다` });
		if (V.worn.upper.exposed <= 1) result.options.push({ action: "mupper", text: `${V.worn.upper.name}【을를】 비켜낸다` });
		if (V.worn.under_upper.exposed <= 0) result.options.push({ action: "munder_upper", text: `${V.worn.under_upper.name}【을를】 비켜낸다` });

		if (V.worn.over_lower.exposed <= 1) result.options.push({ action: "moverlower", text: `${V.worn.over_lower.name}【을를】 비켜낸다` });
		if (V.worn.lower.exposed <= 1) result.options.push({ action: "mlower", text: `${V.worn.lower.name}【을를】 비켜낸다` });

		if (
			V.worn.under_lower.exposed <= 0 &&
			(V.worn.lower.state !== setup.clothes.lower[clothesIndex("lower", V.worn.lower)].state_base ||
				setup.clothes.lower[clothesIndex("lower", V.worn.lower)].skirt === 1 ||
				V.worn.lower.type.includes("naked"))
		) {
			result.options.push({ action: "munder", text: `${V.worn.under_lower.name}【을를】 내린다` });
		}
	}

	if (!V.possessed) result.options.push({ action: "mrest", text: "쉰다" });

	return result;
}

function masturbationActionsMouth({ selectedToy, toyDisplay, genitalsExposed, breastsExposed }) {
	const result = {
		text: "",
		options: [],
		actionVariable: "mouthaction",
	};

	if (!(V.moorPhallusPlant || V.awareness >= 200 || V.mouth !== 0)) return result;

	const stop = action => {
		return {
			action,
			text: "입을 뗀다",
		};
	};
	const rest = () => {
		return {
			action: "mrest",
			text: "쉰다",
		};
	};

	const corruptionCheck = V.corruptionMasturbation && V.awareness < 200;
	const awarenessCheck = V.corruptionMasturbation || V.awareness >= 200;

	const hasAphrodisiac = !!listUniqueCarriedSextoys().find(item => item.type.includes("aphrodisiacpill"));

	switch (V.mouth) {
		case "disabled":
			result.text = "입이 자유롭다.";
			if (V.awareness >= 200 && hasAphrodisiac) {
				result.options.push({
					action: "maphropill",
					text: "최음제 알약을 삼킨다",
					otherElements: "<<combataware 3>>",
				});
			}
			result.options.push(rest());
			break;
		case 0:
			result.text = "입이 자유롭다.";
			if (V.awareness >= 200) {
				if (hasAphrodisiac) {
					result.options.push({
						action: "maphropill",
						text: "최음제 알약을 삼킨다",
						otherElements: "<<combataware 3>>",
					});
				}
				if (
					breastsExposed() &&
					(V.leftarm === "mbreasthold" || V.rightarm === "mbreasthold") &&
					V.player.breastsize >= 8 &&
					!V.parasite.nipples.name &&
					!V.bugsinside
				) {
					result.options.push({
						action: "mbreastentrance",
						text: `유두${V.leftarm === "mbreasthold" && V.rightarm === "mbreasthold" ? "들" : ""}를 입에 문다`,
						colour: "sub",
						otherElements: "<<combataware 3>>",
					});
				}
				if (genitalsExposed()) {
					if (V.canSelfSuckPenis && V.penisuse === 0) {
						if (V.worn.genitals.name === "chastity parasite") {
							result.options.push({
								action: "mchastityparasiteentrance",
								text: "정조대 기생충을 핥는다",
								colour: "sub",
								otherElements: "<<combataware 3>>",
							});
						} else {
							result.options.push({
								action: "mpenisentrance",
								text: "자지를 핥는다",
								colour: "sub",
								otherElements: "<<combataware 3>>",
							});
						}
					}
					if (V.canSelfSuckVagina && V.vaginause === 0 && V.fingersInVagina === 0) {
						result.options.push({
							action: "mvaginaentrance",
							text: "보지를 핥는다",
							colour: "sub",
							otherElements: "<<combataware 3>>",
						});
					}
				}
			}
			if (V.moorPhallusPlant === 1) {
				result.options.push({
					action: "mpenisflowerlick",
					text: "남근 식물을 핥는다",
					colour: "sub",
				});
			}
			if (result.options.length) result.options.push(rest());
			break;
		case "mpenisentrance":
			result.text = corruptionCheck
				? '<span class="red">귀 안의 슬라임이 당신의 입을 자지 앞으로 가져가게 한다.</span>'
				: "입이 자지 앞에 있다.";
			if (awarenessCheck) {
				result.options.push({
					action: "mpenislick",
					text: "자지를 핥는다",
					colour: "sub",
					otherElements: !corruptionCheck ? "<<combataware 3>>" : undefined,
				});
				result.options.push({
					action: "mpenistakein",
					text: "입에 넣는다",
					colour: "sub",
					otherElements: !corruptionCheck ? "<<combataware 3>>" : undefined,
				});
			}
			result.options.push(stop("mpenisstop"));
			result.options.push(rest());
			break;
		case "mchastityparasiteentrance":
			result.text = corruptionCheck
				? '<span class="red">귀 안의 슬라임이 당신의 입을 정조대 기생충 앞으로 가져가게 한다.</span>'
				: "입이 정조대 기생충 앞에 있다.";
			if (awarenessCheck) {
				result.options.push({
					action: "mchastityparasitelick",
					text: "정조대 기생충을 핥는다",
					colour: "sub",
					otherElements: !corruptionCheck ? "<<combataware 3>>" : undefined,
				});
			}
			result.options.push(stop("mchastityparasitestop"));
			result.options.push(rest());
			break;
		case "mvaginaentrance":
			result.text = corruptionCheck
				? '<span class="red">귀 안의 슬라임이 당신의 보지를 핥게 한다.</span>'
				: "입이 보지 앞에 있다.";
			if (awarenessCheck) {
				result.options.push({
					action: "mvaginalick",
					text: "보지를 핥는다",
					colour: "sub",
					otherElements: !corruptionCheck ? "<<combataware 3>>" : undefined,
				});
				if (!playerChastity("vagina")) {
					if (!V.parasite.clit.name) {
						result.options.push({
							action: "mvaginaclit",
							text: "클리토리스에 집중한다",
							colour: "sub",
							otherElements: !corruptionCheck ? "<<combataware 3>>" : undefined,
						});
					} else if (V.parasite.clit.name !== "parasite") {
						result.options.push({
							action: "mvaginaclitparasite",
							text: `클리토리스 ${V.parasite.clit.name}에 집중한다`,
							colour: "sub",
							otherElements: !corruptionCheck ? "<<combataware 3>>" : undefined,
						});
					}
				}
			}
			result.options.push(stop("mvaginastop"));
			break;
		case "mpenis":
			result.text = corruptionCheck
				? '<span class="red">귀 안의 슬라임이 당신의 자지를 빨게 한다.</span>'
				: "당신은 자지를 빨고 있다.";
			if (V.selfsuckDepth === V.selfsuckLimit) {
				result.text += ` 전체가 입${V.selfsuckDepth >= 2 ? "과 목구멍" : ""} 안에 들어와 있다.`;
			} else {
				switch (V.selfsuckDepth) {
					case 0:
						result.text += " 귀두가 입 안에 들어와 있다.";
						break;
					case 1:
						result.text += " 귀두가 입 안 깊숙이 닿는다.";
						break;
					case 2:
						result.text += " 귀두가 목구멍까지 들어와 있다.";
						break;
					default:
						/* Max selfsuckDepth is 3 and is captured by the above condition */
						result.text += '<span class="red">오류: 불가능한 조건입니다.</span>';
						break;
				}
			}
			if (awarenessCheck) {
				result.options.push({
					action: "mpenissuck",
					text: "자지를 빤다",
					colour: "sub",
					otherElements: !corruptionCheck ? "<<combataware 3>>" : undefined,
				});
				if (V.selfsuckDepth < V.selfsuckLimit) {
					result.options.push({
						action: "mpenisdeepthroat",
						text: "더 깊이 넣는다",
						colour: "sub",
						otherElements: !corruptionCheck ? "<<combataware 3>>" : undefined,
					});
				}
			}
			if (V.selfsuckDepth >= 1) {
				result.options.push({
					action: "mpenispullback",
					text: "뒤로 뺀다",
				});
			} else {
				result.options.push({
					action: "mpenismouthoff",
					text: "입을 뗀다",
				});
			}
			if (V.selfsuckDepth <= 1) result.options.push(stop("mpenisstop"));
			break;
		case "mdildomouthentrance":
			result.text = `당신의 ${
				V.leftarm === "mdildomouthentrance" ? toyDisplay(selectedToy("left")) : toyDisplay(selectedToy("right"))
			}【이가】 입가에 있다.`;
			result.options.push({
				action: "mdildolick",
				text: "핥는다",
				colour: "sub",
			});
			result.options.push({
				action: "mdildokiss",
				text: "키스한다",
				colour: "sub",
			});
			result.options.push(rest());
			break;
		case "mdildomouth":
			result.text = `${V.leftarm === "mdildomouth" ? toyDisplay(selectedToy("left")) : toyDisplay(selectedToy("right"))}【이가】 입 안에 들어와 있다.`;
			result.options.push({
				action: "mdildolick",
				text: "핥는다",
				colour: "sub",
			});
			result.options.push({
				action: "mdildosuck",
				text: "빤다",
				colour: "sub",
			});
			result.options.push(rest());
			break;
		case "mbreast":
			result.text = `${V.leftarm === "mbreastmouthhold" && V.rightarm === "mbreastmouthhold" ? "<<nipples>>【은는】" : "<<nipple>>【은는】"} 입 안에 있다.`;
			result.options.push({
				action: "mbreastlick",
				text: "핥는다",
				colour: "sub",
			});
			result.options.push({
				action: "mbreastsuck",
				text: "빤다",
				colour: "sub",
			});
			result.options.push(rest());
			break;
		case "mpenisflowerlick":
			result.text = "남근 식물을 핥고 있다.";
			result.options.push({
				action: "mpenisflowerlick",
				text: "핥는다",
				colour: "sub",
			});
			result.options.push({
				action: "mpenisflowertakein",
				text: "입에 넣는다",
				colour: "sub",
				otherElements: "<<oralvirginitywarning>>",
			});
			result.options.push(stop("mpenisflowerstop"));
			break;
		case "mpenisflowersuck":
			result.text = "남근 식물을 빨고 있다.";
			result.options.push({
				action: "mpenisflowersuck",
				text: "빤다",
				colour: "sub",
			});
			result.options.push(stop("mpenisflowersuckstop"));
			break;
		default:
			break;
	}

	return result;
}

function masturbationActionsVagina({ selectedToy, toyDisplay, genitalsExposed }) {
	const result = {
		text: "",
		options: [],
		actionVariable: "vaginaaction",
	};

	if (!V.player.vaginaExist || playerChastity("vagina")) return result;

	switch (V.vaginause) {
		case 0:
			result.text = `당신의 보지는 ${genitalsExposed() ? "드러나 있다" : "옷에 가려졌지만 자유롭다"}.`;
			if (V.moorPhallusPlant === 1) {
				result.options.push({
					action: "mpenisflowerrub",
					text: "남근 식물에 비빈다",
					colour: "sub",
				});
			}
			if (result.options.length) {
				result.options.push({
					action: "mrest",
					text: "쉰다",
				});
			}
			break;
		case "mpenisflowerrub":
			result.text = `당신은 ${genitalsExposed() ? "보지" : "사타구니"}를 남근 식물에 문지르고 있다.`;
			result.options.push({
				action: "mpenisflowerrub",
				text: "남근 식물에 비빈다",
				colour: "sub",
			});
			if (genitalsExposed()) {
				result.options.push({
					action: "mpenisflowerpenetrate",
					text: "남근 식물 위로 몸을 낮춘다",
					colour: "sub",
					otherElements: "<<vaginalvirginitywarning>>",
				});
			}
			result.options.push({
				action: "mpenisflowerstop",
				text: `${genitalsExposed() ? "보지" : "사타구니"}를 뗀다`,
			});
			break;
		case "mpenisflowerpenetrate":
			result.text = "보지로 남근 식물 위에서 뛰고 있다.";
			result.options.push({
				action: "mpenisflowerbounce",
				text: "남근 식물에 올라탄다",
				colour: "sub",
			});
			result.options.push({
				action: "mpenisflowerpenetratestop",
				text: "보지를 뗀다",
			});
			break;
		case "mdildopenetrate":
			result.text = `당신은 보지로 ${toyDisplay(selectedToy("vagina"))} 위에서 들썩이고 있다.`;
			result.options.push({
				action: "mdildopenetratebounce",
				text: `${toyDisplay(selectedToy("vagina"))} 위에서 움직인다`,
				colour: "sub",
			});
			result.options.push({
				action: "mdildopenetratestop",
				text: "보지를 뗀다",
			});
			result.options.push({
				action: "mrest",
				text: "쉰다",
			});
			break;
		default:
			break;
	}

	return result;
}

function masturbationActionsAnus({ selectedToy, toyDisplay, genitalsExposed }) {
	const result = {
		text: "",
		options: [],
		actionVariable: "anusaction",
	};

	if (playerChastity("anus")) return result;

	switch (V.anususe) {
		case 0:
			result.text = `당신의 ${genitalsExposed() ? "항문" : "엉덩이"}【은는】 ${genitalsExposed() ? "드러나 있다" : "옷에 가려졌지만 자유롭다"}.`;
			if (V.moorPhallusPlant === 1) {
				result.options.push({
					action: "mpenisflowerrub",
					text: "남근 식물에 비빈다",
					colour: "sub",
				});
			}
			if (result.options.length) {
				result.options.push({
					action: "mrest",
					text: "쉰다",
				});
			}
			break;
		case "mpenisflowerrub":
			result.text = `당신은 ${genitalsExposed() ? "항문" : "엉덩이"}【을를】 남근 식물에 문지르고 있다.`;
			result.options.push({
				action: "mpenisflowerrub",
				text: "남근 식물에 비빈다",
				colour: "sub",
			});
			if (genitalsExposed()) {
				result.options.push({
					action: "mpenisflowerpenetrate",
					text: "남근 식물 위로 몸을 낮춘다",
					colour: "sub",
					otherElements: "<<analvirginitywarning>>",
				});
			}
			result.options.push({
				action: "mpenisflowerstop",
				text: `${genitalsExposed() ? "항문" : "엉덩이"}【을를】 뗀다`,
			});
			break;
		case "mpenisflowerpenetrate":
			result.text = "항문으로 남근 식물 위에서 뛰고 있다.";
			result.options.push({
				action: "mpenisflowerbounce",
				text: "남근 식물에 올라탄다",
				colour: "sub",
			});
			result.options.push({
				action: "mpenisflowerpenetratestop",
				text: "항문을 뗀다",
			});
			break;
		case "mdildopenetrate":
			result.text = `당신은 항문으로 ${toyDisplay(selectedToy("anus"))} 위에서 들썩이고 있다.`;
			result.options.push({
				action: "mdildopenetratebounce",
				text: `${toyDisplay(selectedToy("anus"))} 위에서 움직인다`,
				colour: "sub",
			});
			result.options.push({
				action: "mdildopenetratestop",
				text: "항문을 뗀다",
			});
			result.options.push({
				action: "mrest",
				text: "쉰다",
			});
			break;
		default:
			break;
	}

	return result;
}

Macro.add("masturbationactions", {
	handler() {
		const fragment = masturbationActions();
		this.output.append(fragment);
	},
});
