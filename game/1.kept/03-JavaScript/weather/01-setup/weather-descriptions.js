/* eslint-disable prettier/prettier */
setup.WeatherDescriptions = {
	type: {
		clear: {
			dawn: "밝은 주황빛이 하늘을 채웁니다.",
			day: "하늘이 밝고 햇살이 눈부십니다.",
			dusk: "짙은 주황빛이 하늘을 물들입니다.",
			night: "어두운 지평선 위로 별들이 선명하게 빛납니다.",
			bloodMoon: "피의 달 아래 밤하늘이 불길한 붉은빛으로 물듭니다.",
			transition: () => Weather.isOvercast ? "남은 구름이 걷히며 선명한 하늘이 드러납니다." : null,
		},
		lightClouds: {
			dawn: "구름 사이로 태양의 주황빛이 비칩니다.",
			day: "구름 사이로 햇살이 밝게 비칩니다.",
			dusk: "주황빛 줄기가 하늘을 가로지릅니다.",
			night: "구름 사이로 별들이 보입니다.",
			bloodMoon: "구름이 달의 섬뜩한 붉은빛 위를 떠다닙니다.",
			transition: () => Weather.isOvercast ? "흐린 구름층이 흩어지며 맑은 하늘이 드러나고 있습니다." : null,
		},
		heavyClouds: {
			dawn: () => "구름 낀 하늘이 떠오르는 태양에 주황빛으로 물듭니다.",
			day: () => "하늘은 잿빛 구름으로 뒤덮여 있습니다.",
			dusk: () => "구름 낀 하늘이 주황빛을 띱니다.",
			night: () => "두꺼운 구름 사이로 별들이 간신히 보입니다.",
			bloodMoon: () => "하늘이 붉은빛으로 가득합니다.",
			transition: () => !Weather.isOvercast ? "머리 위로 먹구름이 끼는 것이 보입니다." : null,
		},
		lightPrecipitation: {
			dawn: () => Weather.precipitation === "rain" ? "새벽의 희미한 빛 속에서 보슬비가 내립니다." : "희미한 새벽빛 속에서 가벼운 눈송이가 흩날립니다.",
			day: () => Weather.precipitation === "rain" ? "가벼운 빗방울이 톡톡 떨어집니다." : "하늘 가득 부드럽게 눈이 내립니다.",
			dusk: () => Weather.precipitation === "rain" ? "주황빛 황혼 속에 보슬비가 함께 내립니다." : "고운 눈발이 주황빛 저녁놀과 뒤섞입니다.",
			night: () => Weather.precipitation === "rain" ? "밤새 가벼운 비가 내립니다." : "어두운 풍경 위로 가벼운 눈이 흩날립니다.",
			bloodMoon: () => Weather.precipitation === "rain" ? "붉은 달이 가벼운 비 위로 비현실적인 빛을 드리웁니다." : "달의 붉은빛이 떨어지는 눈송이를 비춥니다.",
			transition: () => !Weather.isOvercast && !Weather.isFreezing ? "하늘 위로 비구름이 끼는 것을 알아차립니다." : !Weather.isOvercast ? "구름이 점점 무거워집니다. 곧 눈이 내릴 것 같습니다." : null,
		},
		heavyPrecipitation: {
			dawn: () => Weather.precipitation === "rain" ? "거센 폭우와 함께 하루가 시작됩니다." : "굵은 눈송이가 이른 아침을 뒤덮습니다.",
			day: () => Weather.precipitation === "rain" ? "구름 낀 하늘에서 비가 세차게 쏟아집니다." : "거센 눈보라가 하늘을 가립니다.",
			dusk: () => Weather.precipitation === "rain" ? "세찬 비가 더욱 거세집니다." : "저녁이 내려앉으며 눈이 쌓여 갑니다.",
			night: () => Weather.precipitation === "rain" ? "어둠 속에서 세찬 빗소리만이 선명합니다." : "거센 눈보라가 밤을 집어삼킵니다.",
			bloodMoon: () => Weather.precipitation === "rain" ? "쏟아지는 빗줄기가 붉은 하늘을 비춥니다." : "눈이 달의 섬뜩한 붉은빛을 반사하며, 세상을 비현실적인 침묵으로 뒤덮습니다.",
			transition: () => !Weather.isOvercast && !Weather.isFreezing ? "먹구름이 모여들기 시작합니다. 곧 비가 올 것 같습니다." : !Weather.isOvercast ? "하늘 위로 구름이 모여듭니다. 곧 눈이 내릴 것 같습니다." : null,
		},
		storm: {
			dawn: () => Weather.precipitation === "rain" ? "새벽부터 폭풍이 몰아칩니다." : "새벽부터 폭풍이 굵은 눈발을 몰고 옵니다.",
			day: () => Weather.precipitation === "rain" ? "이따금 번개가 구름을 밝힙니다." : "하루 종일 폭풍이 휘몰아칩니다.",
			dusk: () => Weather.precipitation === "rain" ? "주황빛 하늘 아래 폭풍이 휘몰아칩니다." : "주황빛 하늘이 폭풍 뒤로 어두워집니다.",
			night: () => Weather.precipitation === "rain" ? "이따금 번개가 밤을 밝힙니다." : "폭풍이 밤새 짓누르듯 이어집니다.",
		},
		thunderstorm: {
			dawn: () => Weather.precipitation === "rain" ? "새벽부터 뇌우가 몰아칩니다." : "새벽부터 폭풍이 몰아칩니다.",
			day: () => Weather.precipitation === "rain" ? "번개가 구름을 밝힙니다." : "거센 폭풍이 하루 종일 휘몰아칩니다.",
			dusk: () => Weather.precipitation === "rain" ? "주황빛 하늘 아래 뇌우가 휘몰아칩니다." : "주황빛 하늘이 폭풍 뒤로 어두워집니다.",
			night: () => Weather.precipitation === "rain" ? "번갯불이 밤을 밝힙니다." : "폭풍이 밤새 짓누르듯 이어집니다.",
		},
		tentaclePlains: `<span class="purple">하늘이 선명한 보랏빛으로 빛납니다.</span>`,
	},
	/* Specific tooltips based on your location */
	location: {
		lake: () => Weather.isFrozen("lake") ? "호수가 얼어붙어 있습니다." : "호수가 잔잔합니다.",
	},
	temperature: () => {
		if (Weather.temperature <= -15) {
			return `<span class="blue">밖은 극도로 춥습니다.</span>`;
		} else if (Weather.temperature <= -10) {
			return Weather.isSnow ? "거센 눈 때문에 살을 에는 추위가 더 심해집니다." : "찬 공기가 살을 에듯 차갑습니다.";
		} else if (Weather.temperature <= -5) {
			return Weather.isSnow ? "공기는 차갑고 땅에는 눈이 단단히 쌓여 있습니다." : "공기가 얼어붙을 듯 차갑고, 매섭고 건조하게 느껴집니다.";
		} else if (Weather.temperature <= 0) {
			return Weather.isSnow ? "공기는 차갑고, 눈이 땅을 덮고 있습니다." : "땅에 서리가 끼기 시작합니다.";
		} else if (Weather.temperature <= 5) {
			return Weather.isSnow ? "녹은 눈이 땅 위에 질척한 진창을 만듭니다." : "서늘한 바람이 불어 쌀쌀합니다.";
		} else if (Weather.temperature <= 10) {
			return Weather.isSnow ? "남은 눈이 빠르게 녹아내립니다." : "부드러운 산들바람이 불지만 쌀쌀합니다.";
		} else if (Weather.temperature <= 15) {
			return "기온은 서늘하지만 견딜 만합니다.";
		} else if (Weather.temperature <= 20) {
			return "공기가 온화합니다.";
		} else if (Weather.temperature <= 25) {
			return "바깥 기온이 따뜻하고 쾌적합니다.";
		} else if (Weather.temperature <= 30) {
			return "점점 더워지고 있습니다.";
		} else {
			return `<span class="red">밖은 극도로 덥습니다.</span>`;
		}
	},
	extremeTemperature: () => {
		if (!Weather.Temperature.isExtreme()) return "";
		const average = Weather.genSettings.months[Time.month - 1].temperatureRange.average;
		const extreme = Weather.genSettings.months[Time.month - 1].temperatureRange.extreme;

		if (Weather.temperature <= -18) {
			return `<span class="blue">혹독하게 춥습니다. 아마 올해 가장 추운 날 중 하나일 것입니다.</span>`;
		} else if (Weather.temperature > 30) {
			return `<span class="red">숨 막히게 덥습니다. 폭염이 지나가고 있는지도 모릅니다.</span>`;
		}

		const warm = Weather.temperature > 20 ? "덥습니다" : "따뜻합니다";
		const cool = Weather.temperature < 7 ? "춥습니다" : "서늘합니다";
		const frigid = Weather.temperature < -15 ? "혹독하게 춥습니다" : "춥습니다";

		// 50% lower than average low
		if (average[0] + ((extreme[0] - average[0]) * 0.5) > Weather.temperature) {
			return `<span class="teal">예년답지 않게 ${frigid}.</span>`;
		} else if (average[0] > Weather.temperature) {
			return `<span class="teal">이 시기치고는 ${cool}.</span>`
		}

		// 50% higher than average high
		if (average[1] + ((extreme[1] - average[1]) * 0.5) < Weather.temperature) {
			return `<span class="orange">예년답지 않게 ${warm}.</span>`
		} else if (average[1] < Weather.temperature) {
			return `<span class="orange">이 시기치고는 ${warm}.</span>`
		}

		return "";
	},
	bodyTemperature: () => {
		if (Weather.bodyTemperature <= 34) {
			return "심각한 저체온증에 시달리고 있습니다.";
		} else if (Weather.bodyTemperature <= 35) {
			return "몸이 얼어붙을 듯 춥습니다.";
		} else if (Weather.bodyTemperature <= 35.5) {
			return "몹시 추워서 몸이 걷잡을 수 없이 떨립니다.";
		} else if (Weather.bodyTemperature <= 36) {
			return "몸이 떨립니다.";
		} else if (Weather.bodyTemperature <= 36.5) {
			return "쌀쌀하게 느껴집니다.";
		} else if (Weather.bodyTemperature <= 37.5) {
			return "편안하게 느껴집니다.";
		} else if (Weather.bodyTemperature <= 38) {
			return "몸이 포근합니다.";
		} else if (Weather.bodyTemperature <= 38.5) {
			return "살짝 땀이 나고 불편합니다.";
		} else if (Weather.bodyTemperature <= 39) {
			return "몸이 덥고 땀이 납니다.";
		} else if (Weather.bodyTemperature <= 39.5) {
			return "몸이 과열된 듯 불편합니다.";
		} else if (Weather.bodyTemperature <= 40) {
			return "몸이 뜨겁습니다.";
		} else {
			return "열사병에 시달리고 있습니다.";
		}
	},
	bodyTemperatureChanges: () => {
		if (Math.abs(Weather.BodyTemperature.target - Weather.bodyTemperature) <= 0.5)
			return "";
		if (Weather.bodyTemperature < 35) {
			if (Weather.BodyTemperature.target - Weather.bodyTemperature > 1) {
				return "온기에 몸속 한기가 가십니다.";
			} else if (Weather.BodyTemperature.target - Weather.bodyTemperature > 0) {
				return "몸의 떨림이 가라앉고 있습니다.";
			} else if (Weather.BodyTemperature.target - Weather.bodyTemperature < 1) {
				return "위험할 정도로 빠르게 몸이 차가워지고 있습니다.";
			} else if (Weather.BodyTemperature.target - Weather.bodyTemperature < 0) {
				return "아직도 몸이 더 차가워지고 있습니다.";
			}
		} else if (Weather.bodyTemperature < 39) {
			if (Weather.BodyTemperature.target - Weather.bodyTemperature > 1) {
				return "몸이 빠르게 달아오르고 있습니다.";
			} else if (Weather.BodyTemperature.target - Weather.bodyTemperature > 0) {
				return "몸이 따뜻해지고 있습니다.";
			} else if (Weather.BodyTemperature.target - Weather.bodyTemperature < 1) {
				return "몸이 빠르게 차가워지고 있습니다.";
			} else if (Weather.BodyTemperature.target - Weather.bodyTemperature < 0) {
				return "몸이 식어 가고 있습니다.";
			}
		} else {
			if (Weather.BodyTemperature.target - Weather.bodyTemperature > 1) {
				return "위험할 정도로 빠르게 몸이 달아오르고 있습니다.";
			} else if (Weather.BodyTemperature.target - Weather.bodyTemperature > 0) {
				return "몸이 더 뜨거워지고 있습니다.";
			} else if (Weather.BodyTemperature.target - Weather.bodyTemperature < 1) {
				return "한기가 몸의 열을 식힙니다.";
			} else if (Weather.BodyTemperature.target - Weather.bodyTemperature < 0) {
				return "몸이 식어 가고 있습니다.";
			}
		}
	},
	waterTemperature: () => {
		if (!T.inWater) return "";
		if (Weather.waterTemperature <= 5) {
			return "물이 얼어붙을 듯 차갑습니다.";
		} else if (Weather.waterTemperature <= 15) {
			return "물이 차갑게 느껴집니다.";
		} else if (Weather.waterTemperature <= 25) {
			return "물이 서늘하게 느껴집니다.";
		} else if (Weather.waterTemperature <= 35) {
			return "물이 따뜻하게 느껴집니다.";
		} else {
			return "물이 뜨겁게 느껴집니다.";
		}
	},
	clothingWarmth: warmth => {
		let output = "";
		if (warmth > 6) {
			output = "아주 따뜻합니다.";
		}
		else if (warmth > 4) {
			output = "따뜻하고 포근합니다.";
		}
		else if (warmth > 2) {
			output = "한기를 막는 데 도움이 됩니다.";
		}
		else if (warmth > 0) {
			output = "가볍고 시원합니다.";
		}
		else {
			output = "보온 효과가 없습니다.";
		}
		return V.options.images ? output + ` (<span class="cold-resist-icon noDivider">${warmth}</span>)` : output;
	},
	shop: () => {
		if (Weather.temperature <= -5) {
			return "<span class='blue'>밖은 극도로 춥습니다.</span>";
		} else if (Weather.temperature <= 5) {
			return "<span class='purple'>밖은 매우 춥습니다.</span>";
		} else if (Weather.temperature <= 15) {
			return "<span class='teal'>밖은 춥습니다.</span>";
		} else if (Weather.temperature <= 25) {
			return "<span class='green'>바깥 기온이 쾌적합니다.</span>";
		} else {
			return "<span class='orange'>밖은 덥습니다.</span>";
		}
	},
};
