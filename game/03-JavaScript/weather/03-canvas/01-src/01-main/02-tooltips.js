Weather.Tooltips = (() => {
	function skybox(element = Weather.sidebar.skybox) {
		// Maybe not hardcode this here
		const key = V.location === "tentworld" ? "tentaclePlains" : Weather.name;
		const weatherState = Weather.TooltipDescriptions.type[key];

		if (!weatherState) return;
		const transition = weatherState.transition ? weatherState.transition() : null;
		const weatherDescription = transition || (typeof weatherState === "string" ? weatherState : resolveValue(weatherState[Weather.skyState], ""));

		const tempDescription = Weather.TooltipDescriptions.temperature();
		const debug = V.debug
			? `<br><br><span class="teal">디버그:</span>
			<br><span class="blue">패시지:</span> <span class="yellow">${V.passage}</span>
			<br><span class="blue">시간:</span> <span class="yellow">${ampm()}</span>
			<br><span class="blue">날씨:</span> <span class="yellow">${window.KR.getWeatherStateKr(Weather.name)}</span>
			<br><span class="blue">외부 기온:</span> <span class="yellow">${Weather.toSelectedString(Weather.temperature)}</span>
			<br><span class="blue">외부 체감 기온:</span> <span class="yellow">${Weather.toSelectedString(Weather.apparentTemperature)}</span>
			<br><span class="blue">실내 기온:</span> <span class="yellow">${Weather.toSelectedString(Weather.insideTemperature)}</span>
			<br><span class="blue">수온:</span> <span class="yellow">${Weather.toSelectedString(Weather.waterTemperature)}</span>
			<br><span class="blue">체온:</span> <span class="yellow">${Weather.toSelectedString(Weather.bodyTemperature)}</span>
			<br><span class="blue">일조 강도:</span> <span class="yellow">${round(Weather.sunIntensity * 100, 2)}% (${V.outside ? "실외" : "실내"})</span>
			<br><span class="blue">구름량:</span> <span class="yellow">${round(Weather.overcast * 100, 2)}%</span>
			<br><span class="blue">안개량:</span> <span class="yellow">${round(Weather.fog * 100, 2)}%</span>
			<br><span class="blue">적설량:</span> <span class="yellow">${V.weatherObj.snow}mm</span>
			<br><span class="blue">호수 얼음 두께:</span> <span class="yellow">${V.weatherObj.ice.lake ?? 0}mm</span>`
			: "";
		element.tooltip({
			message: `${weatherDescription}<br>${tempDescription}${debug}`,
			delay: 200,
			position: "cursor",
		});
	}

	function thermometer() {
		const tempDescription = Weather.TooltipDescriptions.bodyTemperature();
		const waterDescription = Weather.TooltipDescriptions.waterTemperature();
		const tempChangeDescription = Weather.TooltipDescriptions.bodyTemperatureChanges();
		const overrideDescription = T.inWater
			? T.temperatureOverride?.waterTooltip
			: V.outside
			? T.temperatureOverride?.outsideTooltip
			: T.temperatureOverride?.insideTooltip;
		const fatigueModifier = categorise(Weather.BodyTemperature.fatigueModifier, 1, Weather.tempSettings.effects.maxFatigueGainMultiplier, 4);
		const arousalModifier = categorise(Weather.BodyTemperature.arousalModifier, 1, Weather.tempSettings.effects.maxArousalGainMultiplier, 4);
		const painModifier = categorise(Weather.BodyTemperature.painModifier, 1, Weather.tempSettings.effects.maxPainGainMultiplier, 4);
		const stressModifier = categorise(Weather.BodyTemperature.stressModifier, 0, Weather.tempSettings.effects.lowerMaxStressGain, 4);

		const arousalOutput = arousalModifier > 0 ? `<span class="teal">${"- ".repeat(Math.abs(arousalModifier))}흥분 증가량</span><br>` : "";
		const fatigueOutput = fatigueModifier > 0 ? `<span class="red">${"+ ".repeat(Math.abs(fatigueModifier))}피로도 증가량</span><br>` : "";
		const painOutput = painModifier > 0 ? `<span class="red">${"+ ".repeat(Math.abs(painModifier))}고통 증가량</span><br>` : "";
		const stressOutput = stressModifier > 0 ? `<span class="red">${"+ ".repeat(Math.abs(stressModifier))}스트레스 증가량</span><br>` : "";
		const modifiers =
			arousalOutput || fatigueOutput || painOutput || stressOutput ? "<br>" + arousalOutput + fatigueOutput + painOutput + stressOutput : "";

		const direction = Weather.BodyTemperature.direction > 0 ? "(상승 중)" : Weather.BodyTemperature.direction < 0 ? "(하강 중)" : "";
		// eslint-disable-next-line prettier/prettier
		const debug = V.debug ? `<br><br><span class="teal">디버그:</span><br><span class="blue">패시지:</span> <span class="yellow">${V.passage}</span>
			<br><span class="blue">시간:</span> <span class="yellow">${ampm()}</span>
			<br><span class="blue">체온:</span> <span class="yellow">${Weather.toSelectedString(Weather.bodyTemperature)} ${direction}</span>
			<br><span class="blue">몸 젖음:</span> <span class="yellow">${Math.round(Weather.wetness * 100)}%</span>
			<br><span class="blue">의류 보온:</span> <span class="yellow">${Weather.BodyTemperature.getWarmth()}</span>
			<br><span class="blue">목표 체온(현재 의류):</span> <span class="yellow">${Weather.toSelectedString(Weather.BodyTemperature.target)}</span>`
			: "";
		Weather.Thermometer.tooltipElement.tooltip({
			message:
				tempDescription +
				(waterDescription ? "<br>" + waterDescription : "") +
				(tempChangeDescription ? "<br>" + tempChangeDescription : "") +
				(overrideDescription ? "<br>" + overrideDescription : "") +
				modifiers +
				debug,
			delay: 200,
			position: "cursor",
		});
	}

	return {
		skybox,
		thermometer,
	};
})();
