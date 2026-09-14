/* eslint-disable dot-notation */
/*
 * if display_condition is 1, item is displayed, else it's not
 * current max doses for Harper/Asylum pills is 1; 2 for every other pills
 * place the widgets that need to be run inside effects array
 * if you feel lost just ask away :)
 * take_condition == 1 means the "Take Pill" button is not greyed out and is clickable
 * display_condition controls whether or not pill should be displayed in the pill menu
 */

/*
--- Please change this comment as needed when the format of setup.pills changes ---
This is the setup.pills array.
It contains a list of all the possible pills.
A single pill object contains multiple 'properties' which define the pill.

 * name:'example pill' - The name displayed in the medicine drawer screen. Auto-capitalises first word. Capitalise other words if desired.
 * description: 'this pill is green.' - The description displayed when the pill is selected.
 * onTakeMessage: 'You swallow the green pill.' - Text displayed when a pill is taken.
 * warning_label: 'Warning: example pill may cause explosive decompression.' - Warning label displayed in text box. <span class="hpi_notice_label"> is used in several of these.
 * indicators: - Array of indicators. Example: `<span class="hpi_indic_green">+ Control</span>`
 * icon: 'img/misc...blahblah' - file path of the png icon for this pill.
 *
 * autoTake: - Code or statement that determines if this pill is set to auto-take ??? **
 * doseTaken: - Code or statement showing how many doses were taken already. **
 * owned: - Code or statement to determined the number owned. **
 * overdose: - Code or statement to determine overdose. **
 * display_condition: - Code or statement to determine if the pill displays in list. **
 * take_condition: - Code or statement to determine if the take button displays for this pill - can a dose currently be taken. **
 *
 * type: "various" - Type of pill. Pill code uses this to determine what the effects are and where they apply. Example: "bottom" or "breast"
 * subtype: "various" - Action the pill has on bodypart 'type'. Optional for the asylum & harper meds apparently. Example: "reduction" or "growth"
 * shape: "pill" or "galenic" - Helps to properly space the icon.
 * effects: - Array of effects - can be used to issue quick macros for setting results. Example: `<<control 25>>`
*/
setup.pills = [
	{
		name: "bottom reduction",
		description:
			"각 알약에는 엉덩이에 있는 중성지방에 결합해 시간이 지나며 녹이도록 특별히 제작된 유도 분자 프라베르홀 500mg이 들어 있다.",
		onTakeMessage: "엉덩이 크기를 줄이기 위한 알약을 삼킨다. 광고만큼 효과가 있기를 바란다.",
		warning_label:
			"경고: 하루 처방 최대 용량을 초과하면 심각한 부작용이 발생할 수 있습니다. 다른 호르몬 치료와 병용하지 마십시오.",
		autoTake() {
			return V.sexStats.pills["pills"][this.name].autoTake;
		},
		doseTaken() {
			return V.sexStats.pills["pills"][this.name].doseTaken;
		},
		owned() {
			return V.sexStats.pills["pills"][this.name].owned;
		},
		type: "bottom",
		subtype: "reduction",
		shape: "pill",
		overdose() {
			return V.sexStats.pills["pills"][this.name].overdose;
		},
		icon: "img/misc/icon/pill-bottom.png",
		frontIcon: "img/misc/icon/small-down-arrow.png",
		display_condition() {
			return this.owned() > 0 ? 1 : 0;
		},
		take_condition() {
			return this.doseTaken() < 2 &&
				V.sexStats.pills["pills"]["bottom growth"].doseTaken === 0 &&
				V.sexStats.pills["pills"]["bottom blocker"].doseTaken === 0
				? 1
				: 0;
		},
		effects: [],
	},
	{
		name: "bottom growth",
		description:
			"이 알약에는 저명한 제약 과학자 반셀 박사의 기술력으로 만들어진 분자 닌트롭테클록신이 들어 있다. 이 물질은 엉덩이와 둔부 지방 증가를 담당하는 특정 호르몬의 체내 생성을 촉진한다. 한 알당 해당 분자 190mg이 포함되어 있다.",
		onTakeMessage: "엉덩이 성장을 촉진하기 위한 알약을 삼킨다. 광고만큼 효과가 있기를 바란다.",
		warning_label:
			"경고: 하루 최대 복용량을 초과하면 심각한 부작용이 발생할 수 있습니다. 의문이 있는 경우 의사와 상담하십시오. 다른 호르몬 치료와 병용하지 마십시오.",
		autoTake() {
			return V.sexStats.pills["pills"][this.name].autoTake;
		},
		doseTaken() {
			return V.sexStats.pills["pills"][this.name].doseTaken;
		},
		owned() {
			return V.sexStats.pills["pills"][this.name].owned;
		},
		type: "bottom",
		subtype: "growth",
		shape: "pill",
		overdose() {
			return V.sexStats.pills["pills"][this.name].overdose;
		},
		icon: "img/misc/icon/pill-bottom.png",
		frontIcon: "img/misc/icon/small-up-arrow.png",
		display_condition() {
			return this.owned() > 0 ? 1 : 0;
		},
		take_condition() {
			return this.doseTaken() < 2 &&
				V.sexStats.pills["pills"]["bottom reduction"].doseTaken === 0 &&
				V.sexStats.pills["pills"]["bottom blocker"].doseTaken === 0
				? 1
				: 0;
		},
		effects: [],
	},
	{
		name: "bottom blocker",
		description:
			"각 알약에는 중성지방에 결합해 시간이 지나며 녹이도록 특별히 제작된 유도 분자 프라베르홀-NG2가 들어 있다. 비활성 성분 트리넬카는 엉덩이의 피하 지방 조직과 강하게 결합하도록 돕는다. 200mg은 늘어나는 지방과 녹아 없어지는 지방 사이의 균형을 맞추는 적정 용량이다.",
		onTakeMessage: "엉덩이 성장을 억제하기 위한 알약을 삼킨다. 광고만큼 효과가 있기를 바란다.",
		warning_label:
			"<span class='hpi_notice_label'>알림: 이 약의 임상시험에서 확인된 부작용은 없습니다. 24시간 내에 1알을 초과해 복용해도 효과가 없습니다.</span>",
		autoTake() {
			return V.sexStats.pills["pills"][this.name].autoTake;
		},
		doseTaken() {
			return V.sexStats.pills["pills"][this.name].doseTaken;
		},
		owned() {
			return V.sexStats.pills["pills"][this.name].owned;
		},
		type: "bottom",
		subtype: "blocker",
		shape: "pill",
		overdose() {
			return V.sexStats.pills["pills"][this.name].overdose;
		},
		icon: "img/misc/icon/pill-bottom.png",
		frontIcon: "img/misc/icon/small-cross.png",
		display_condition() {
			return this.owned() > 0 ? 1 : 0;
		},
		take_condition() {
			return this.doseTaken() === 0 &&
				V.sexStats.pills["pills"]["bottom growth"].doseTaken === 0 &&
				V.sexStats.pills["pills"]["bottom reduction"].doseTaken === 0
				? 1
				: 0;
		},
		effects: [],
	},
	{
		name: "breast reduction",
		description:
			"각 알약에는 중성지방에 결합해 시간이 지나며 녹이도록 특별히 제작된 유도 분자 프라베르홀-NG2 500mg이 들어 있다. 비활성 성분 애브플루틱스는 가슴의 지방 조직과 강하게 결합하도록 돕는다.",
		onTakeMessage: "가슴 크기를 줄이기 위한 알약을 삼킨다. 광고만큼 효과가 있기를 바란다.",
		warning_label:
			"경고: 하루 최대 복용량을 초과하면 심각한 부작용이 발생할 수 있습니다. 의문이 있는 경우 의사와 상담하십시오. 다른 호르몬 치료와 병용하지 마십시오.",
		autoTake() {
			return V.sexStats.pills["pills"][this.name].autoTake;
		},
		doseTaken() {
			return V.sexStats.pills["pills"][this.name].doseTaken;
		},
		owned() {
			return V.sexStats.pills["pills"][this.name].owned;
		},
		type: "breast",
		subtype: "reduction",
		shape: "pill",
		overdose() {
			return V.sexStats.pills["pills"][this.name].overdose;
		},
		icon: "img/misc/icon/pill-breast.png",
		frontIcon: "img/misc/icon/small-down-arrow.png",
		display_condition() {
			return this.owned() > 0 ? 1 : 0;
		},
		take_condition() {
			return this.doseTaken() < 2 &&
				V.sexStats.pills["pills"]["breast growth"].doseTaken === 0 &&
				V.sexStats.pills["pills"]["breast blocker"].doseTaken === 0
				? 1
				: 0;
		},
		effects: [],
	},
	{
		name: "breast growth",
		description:
			"호르몬 mRNA 치료제 알약이다. 포함된 디파딘 5mg은 가슴 성장을 일으키는 특정 호르몬의 자연 분비를 유도하며, mRNA는 세포가 새로운 종류의 호르몬을 만들어 가슴 조직 생성과 지방 저장 능력을 높이도록 도와 결과적으로 가슴이 더 빨리 자라게 한다.",
		onTakeMessage: "가슴 성장을 촉진하기 위한 알약을 삼킨다. 광고만큼 효과가 있기를 바란다.",
		warning_label:
			"경고: 하루 최대 복용량을 초과하면 심각한 부작용이 발생할 수 있습니다. 의문이 있는 경우 의사와 상담하십시오. 다른 호르몬 치료와 병용하지 마십시오.",
		autoTake() {
			return V.sexStats.pills["pills"][this.name].autoTake;
		},
		doseTaken() {
			return V.sexStats.pills["pills"][this.name].doseTaken;
		},
		owned() {
			return V.sexStats.pills["pills"][this.name].owned;
		},
		type: "breast",
		subtype: "growth",
		shape: "pill",
		overdose() {
			return V.sexStats.pills["pills"][this.name].overdose;
		},
		icon: "img/misc/icon/pill-breast.png",
		frontIcon: "img/misc/icon/small-up-arrow.png",
		display_condition() {
			return this.owned() > 0 ? 1 : 0;
		},
		take_condition() {
			return this.doseTaken() < 2 &&
				V.sexStats.pills["pills"]["breast reduction"].doseTaken === 0 &&
				V.sexStats.pills["pills"]["breast blocker"].doseTaken === 0
				? 1
				: 0;
		},
		effects: [],
	},
	{
		name: "breast blocker",
		description:
			"선택적 에스트로겐 수용체 조절제(SERM)로, 가슴 성장을 담당하는 단백질 수용체를 차단한다. 테트라오제알포스티길 269mg이 보강되어 있다.",
		onTakeMessage: "가슴 성장을 억제하기 위한 알약을 삼킨다. 광고만큼 효과가 있기를 바란다.",
		warning_label:
			'<span class="hpi_notice_label">알림: 이 약의 임상시험에서 확인된 부작용은 없습니다. 24시간 내에 1알을 초과해 복용해도 효과가 없습니다.</span>',
		autoTake() {
			return V.sexStats.pills["pills"][this.name].autoTake;
		},
		doseTaken() {
			return V.sexStats.pills["pills"][this.name].doseTaken;
		},
		owned() {
			return V.sexStats.pills["pills"][this.name].owned;
		},
		type: "breast",
		subtype: "blocker",
		shape: "pill",
		overdose() {
			return V.sexStats.pills["pills"][this.name].overdose;
		},
		icon: "img/misc/icon/pill-breast.png",
		frontIcon: "img/misc/icon/small-cross.png",
		display_condition() {
			return this.owned() > 0 ? 1 : 0;
		},
		take_condition() {
			return this.doseTaken() === 0 &&
				V.sexStats.pills["pills"]["breast growth"].doseTaken === 0 &&
				V.sexStats.pills["pills"]["breast reduction"].doseTaken === 0
				? 1
				: 0;
		},
		effects: [],
	},
	{
		name: "penis reduction",
		description:
			"각 알약에는 제한적인 항안드로겐 효과를 지닌 클리우스토스 50mg이 들어 있다. 또한 피린 450mg이 발기 조직의 양과 두께를 줄인다.",
		onTakeMessage: "자지 크기를 줄이기 위한 알약을 삼킨다. 광고만큼 효과가 있기를 바란다.",
		warning_label:
			"경고: 하루 최대 복용량을 초과하면 심각한 부작용이 발생할 수 있습니다. 의문이 있는 경우 의사와 상담하십시오. 다른 호르몬 치료와 병용하지 마십시오.",
		autoTake() {
			return V.sexStats.pills["pills"][this.name].autoTake;
		},
		doseTaken() {
			return V.sexStats.pills["pills"][this.name].doseTaken;
		},
		owned() {
			return V.sexStats.pills["pills"][this.name].owned;
		},
		type: "penis",
		subtype: "reduction",
		shape: "pill",
		overdose() {
			return V.sexStats.pills["pills"][this.name].overdose;
		},
		icon: "img/misc/icon/pill-penis.png",
		frontIcon: "img/misc/icon/small-down-arrow.png",
		display_condition() {
			return V.player.penisExist && this.owned() > 0 ? 1 : 0;
		},
		take_condition() {
			return this.doseTaken() < 2 &&
				V.sexStats.pills["pills"]["penis growth"].doseTaken === 0 &&
				V.sexStats.pills["pills"]["penis blocker"].doseTaken === 0
				? 1
				: 0;
		},
		effects: [],
	},
	{
		name: "penis growth",
		description:
			"각 알약에는 컴닉톤딜 780mg, 이포폴 240mg, 테스토스테론 운데카노에이트 149mg이 들어 있다. 두 분자는 안드로겐의 작용을 가능하게 하고 촉진해, 자지의 자연 성장을 다시 시작시키는 효과를 낸다.",
		onTakeMessage: "자지 성장을 촉진하기 위한 알약을 삼킨다. 광고만큼 효과가 있기를 바란다.",
		warning_label:
			"경고: 하루 최대 복용량을 초과하면 심각한 부작용이 발생할 수 있습니다. 의문이 있는 경우 의사와 상담하십시오. 다른 호르몬 치료와 병용하지 마십시오.",
		autoTake() {
			return V.sexStats.pills["pills"][this.name].autoTake;
		},
		doseTaken() {
			return V.sexStats.pills["pills"][this.name].doseTaken;
		},
		owned() {
			return V.sexStats.pills["pills"][this.name].owned;
		},
		type: "penis",
		subtype: "growth",
		shape: "pill",
		overdose() {
			return V.sexStats.pills["pills"][this.name].overdose;
		},
		icon: "img/misc/icon/pill-penis.png",
		frontIcon: "img/misc/icon/small-up-arrow.png",
		display_condition() {
			return V.player.penisExist && this.owned() > 0 ? 1 : 0;
		},
		take_condition() {
			return this.doseTaken() < 2 &&
				V.sexStats.pills["pills"]["penis reduction"].doseTaken === 0 &&
				V.sexStats.pills["pills"]["penis blocker"].doseTaken === 0
				? 1
				: 0;
		},
		effects: [],
	},
	{
		name: "penis blocker",
		description:
			"딘트라임 370mg을 함유한 항안드로겐 호르몬 치료제로, 체내 안드로스테론과 테스토스테론 생성을 차단해 결과적으로 자지 성장을 억제한다.",
		onTakeMessage: "자지 성장을 억제하기 위한 알약을 삼킨다. 광고만큼 효과가 있기를 바란다.",
		warning_label:
			'<span class="hpi_notice_label">알림: 이 약의 임상시험에서 확인된 부작용은 없습니다. 24시간 내에 1알을 초과해 복용해도 효과가 없습니다.</span>',
		autoTake() {
			return V.sexStats.pills["pills"][this.name].autoTake;
		},
		doseTaken() {
			return V.sexStats.pills["pills"][this.name].doseTaken;
		},
		owned() {
			return V.sexStats.pills["pills"][this.name].owned;
		},
		type: "penis",
		subtype: "blocker",
		shape: "pill",
		overdose() {
			return V.sexStats.pills["pills"][this.name].overdose;
		},
		icon: "img/misc/icon/pill-penis.png",
		frontIcon: "img/misc/icon/small-cross.png",
		display_condition() {
			return V.player.penisExist && this.owned() > 0 ? 1 : 0;
		},
		take_condition() {
			return this.doseTaken() === 0 &&
				V.sexStats.pills["pills"]["penis growth"].doseTaken === 0 &&
				V.sexStats.pills["pills"]["penis reduction"].doseTaken === 0
				? 1
				: 0;
		},
		effects: [],
	},
	{
		name: "fertility booster",
		description:
			"각 알약에는 에스트로겐의 구조 유사체인 클로미펜 시트르산염 50mg이 들어 있다. 또한 배란을 유도하는 데 필요한 호르몬을 분비하는 시상하부에도 작용한다. 경우에 따라 난소가 난자를 배출하도록 효과적으로 유도한다.",
		onTakeMessage: "생식력을 높이기 위한 알약을 삼킨다. 광고만큼 효과가 있기를 바란다.",
		warning_label:
			"경고: 처방 용량으로도 가벼운 부작용이 발생할 수 있으며, 초기 임신 징후와 비슷한 증상이 나타날 수 있습니다. 하루 최대 복용량을 초과하면 심각한 합병증이 발생할 수 있습니다. 의심스러운 경우 의사와 상담하십시오.",
		autoTake() {
			return V.sexStats.pills["pills"][this.name].autoTake;
		},
		doseTaken() {
			return V.sexStats.pills["pills"][this.name].doseTaken;
		},
		owned() {
			return V.sexStats.pills["pills"][this.name].owned;
		},
		hpi_doseTaken() {
			if (V.sexStats.pills["pills"][this.name].doseTaken) {
				return (
					"효과 지속: " + V.sexStats.pills["pills"][this.name].doseTaken + "일"
				);
			} else {
				return "사용하지 않음";
			}
		},
		hpi_take_every_morning() {
			return this.autoTake() ? "자동 복용 중지" : "필요할 때 복용";
		},
		type: "pregnancy",
		subtype: "fertility booster",
		shape: "pill",
		overdose() {
			return V.sexStats.pills["pills"][this.name].overdose;
		},
		icon: "img/misc/icon/pill-fertility.png",
		display_condition() {
			return this.owned() > 0 ? 1 : 0;
		},
		take_condition() {
			return this.doseTaken() < 2 && V.sexStats.pills["pills"]["contraceptive"].doseTaken === 0 ? 1 : 0;
		},
		effects: [],
	},
	{
		name: "contraceptive",
		description:
			"에티닐에스트라디올 24mg과 합성 프로게스틴 31mg을 조합한 에스트로겐-프로게스틴 복합제로, 거의 완벽한 피임 효과를 낸다.",
		onTakeMessage: "피임약을 삼킨다. 광고만큼 효과가 있기를 바란다.",
		warning_label:
			"경고: 처방 용량으로도 가벼운 부작용이 발생할 수 있습니다. 하루 최대 복용량을 초과하면 심각한 합병증이 발생할 수 있습니다. 의심스러운 경우 의사와 상담하십시오.",
		autoTake() {
			return V.sexStats.pills["pills"][this.name].autoTake;
		},
		doseTaken() {
			return V.sexStats.pills["pills"][this.name].doseTaken;
		},
		owned() {
			return V.sexStats.pills["pills"][this.name].owned;
		},
		hpi_doseTaken() {
			if (V.sexStats.pills["pills"][this.name].doseTaken) {
				return (
					"효과 지속: " + V.sexStats.pills["pills"][this.name].doseTaken + "일"
				);
			} else {
				return "사용하지 않음";
			}
		},
		hpi_take_every_morning() {
			return this.autoTake() ? "자동 복용 중지" : "필요할 때 복용";
		},
		type: "pregnancy",
		subtype: "contraceptive",
		shape: "galenic",
		overdose() {
			return V.sexStats.pills["pills"][this.name].overdose;
		},
		icon: "img/misc/icon/pill-contraceptive.png",
		display_condition() {
			return this.owned() > 0 ? 1 : 0;
		},
		take_condition() {
			return this.doseTaken() < 2 && V.sexStats.pills["pills"]["fertility booster"].doseTaken === 0 ? 1 : 0;
		},
		effects: [],
	},
	{
		name: "Anti-Parasite Cream",
		description:
			"퍼메트린이 들어 있는 기생충 방지 크림이다. 바르면 새로운 기생충 감염을 막지만, 이미 진행 중인 기생충 감염에는 효과가 없다. 한 번 바르면 14일 동안 효과가 지속된다.",
		onTakeMessage: "성기 주변에 크림을 바른다. 기생충이 새끼를 남기지 못하게 막아주기를 바란다.",
		warning_label:
			"경고: 사용 직후 알레르기 반응이 나타나면 의사와 상담하십시오. 크림이 입이나 눈에 들어간 경우 즉시 의사에게 연락하십시오.",
		autoTake() {
			return false;
		},
		doseTaken() {
			return V.sexStats.pills["pills"][this.name].doseTaken;
		},
		owned() {
			return V.sexStats.pills["pills"][this.name].owned;
		},
		hpi_take_pills() {
			return "피부에 바르기";
		},
		hpi_doseTaken() {
			if (V.sexStats.pills["pills"][this.name].doseTaken) {
				return (
					"효과 지속: " + V.sexStats.pills["pills"][this.name].doseTaken + "일"
				);
			} else {
				return "사용하지 않음";
			}
		},
		hpi_take_every_morning() {
			return "";
		},
		type: "parasite",
		subtype: "Anti-Parasite Cream",
		shape: "cream",
		overdose() {
			return V.sexStats.pills["pills"][this.name].overdose;
		},
		icon: "img/misc/icon/anti-parasite-cream.png",
		display_condition() {
			return this.owned() > 0 ? 1 : 0;
		},
		take_condition() {
			return this.doseTaken() === 0 ? 1 : 0;
		},
		effects: [],
	},
	{
		name: "asylum's prescription",
		description: "강력한 항정신병제다.",
		onTakeMessage: "정신병원에서 처방받은 알약을 삼킨다. 머리가 멍해진다.",
		warning_label:
			"<span class='hpi_notice_label'>알림: 이 약의 실험 단계에서 확인된 부작용은 없었으며, 모든 안전 규정을 통과했습니다. <span class='hpi_blur unselectable'>이 제약회사 때문에 내가 끝장날 것 같군. 부작용이 없다고? 대체 누굴 속이려는 거야?!</span></span>",
		indicators: ["<span class='hpi_indic_green'>++ 통제력</span>", "<span class='hpi_indic_blue'>- 성지식</span>"],
		autoTake() {
			return V.sexStats.pills["pills"][this.name].autoTake;
		},
		doseTaken() {
			return V.sexStats.pills["pills"][this.name].doseTaken;
		},
		owned() {
			return V.sexStats.pills["pills"][this.name].owned;
		},
		type: "asylum",
		shape: "galenic",
		overdose() {
			return V.sexStats.pills["pills"][this.name].overdose;
		},
		icon: "img/misc/icon/pill-strong.png",
		display_condition() {
			return this.owned() > 0 ? 1 : 0;
		},
		take_condition() {
			return this.doseTaken() < 1 && V.asylummedicated === 0 ? 1 : 0;
		},
		effects: [`<<awareness -5>>`, `<<control 25>>`, `<<set $asylummedicated += 1>>`],
	},
	{
		name: "Dr Harper's prescription",
		description: "항정신병 약물이다.",
		onTakeMessage: "하퍼 의사가 처방한 알약을 삼킨다. 어지럽다.",
		warning_label:
			"경고: 최대 용량에 도달했을 때의 부작용은 충분히 연구되지 않았습니다. 신중히 복용하십시오. <span class='hpi_blur'></span>",
		indicators: ["<span class='hpi_indic_green'>+ 통제력</span>", "<span class='hpi_indic_blue'>- 성지식</span>"],
		autoTake() {
			return V.sexStats.pills["pills"][this.name].autoTake;
		},
		doseTaken() {
			return V.sexStats.pills["pills"][this.name].doseTaken;
		},
		owned() {
			return V.sexStats.pills["pills"][this.name].owned;
		},
		type: "harper",
		shape: "galenic",
		overdose() {
			return V.sexStats.pills["pills"][this.name].overdose;
		},
		icon: "img/misc/icon/pill-collection.png",
		display_condition() {
			return this.owned() > 0 ? 1 : 0;
		},
		take_condition() {
			return this.doseTaken() < 1 && V.medicated === 0 ? 1 : 0;
		},
		effects: [`<<awareness -1>>`, `<<control 10>>`, `<<set $medicated += 1>>`],
	},
	{
		name: "Hair Growth Formula",
		description:
			"머리카락에 직접 바르면 더 빠르고 건강한 성장을 촉진하는 미녹시딜과 기타 성분이 들어 있는 스프레이다. 한 번 사용하면 3일 동안 효과가 지속된다.",
		onTakeMessage: "스프레이를 뿌린다. 머리카락이 빨리 자라는 데 도움이 되기를 바란다.",
		warning_label:
			"경고: 사용 직후 알레르기 반응이 나타나면 의사와 상담하십시오. 스프레이가 입이나 눈에 들어간 경우 즉시 의사에게 연락하십시오.",
		autoTake() {
			return V.sexStats.pills["pills"][this.name].autoTake;
		},
		doseTaken() {
			return V.sexStats.pills["pills"][this.name].doseTaken;
		},
		owned() {
			return V.sexStats.pills["pills"][this.name].owned;
		},
		hpi_take_pills() {
			return "머리카락에 바르기";
		},
		hpi_doseTaken() {
			if (V.sexStats.pills["pills"][this.name].doseTaken) {
				return (
					"효과 지속: " + V.sexStats.pills["pills"][this.name].doseTaken + "일"
				);
			} else {
				return "사용하지 않음";
			}
		},
		hpi_take_every_morning() {
			return this.autoTake() ? "자동 사용 중지" : "필요할 때 사용";
		},
		type: "hair",
		subtype: "Hair Growth Formula",
		shape: "spray",
		overdose() {
			return V.sexStats.pills["pills"][this.name].overdose;
		},
		icon: "img/misc/icon/hairspray.png",
		display_condition() {
			return this.owned() > 0 ? 1 : 0;
		},
		take_condition() {
			return this.doseTaken() === 0 ? 1 : 0;
		},
		effects: [],
	},
 ];

const homePillDisplayNames = {
	"bottom reduction": "엉덩이 축소제",
	"bottom growth": "엉덩이 성장제",
	"bottom blocker": "엉덩이 성장 억제제",
	"breast reduction": "가슴 축소제",
	"breast growth": "가슴 성장제",
	"breast blocker": "가슴 성장 억제제",
	"penis reduction": "자지 축소제",
	"penis growth": "자지 성장제",
	"penis blocker": "자지 성장 억제제",
	"fertility booster": "배란 유도제",
	contraceptive: "피임약",
	"Anti-Parasite Cream": "기생충 방지 크림",
	"asylum's prescription": "정신병원 처방약",
	"Dr Harper's prescription": "하퍼 의사의 처방약",
	"Hair Growth Formula": "모발 성장제",
};

function homePillDisplayName(name) {
	return homePillDisplayNames[name] || name;
}

// ToDo: figure out a means to allow applying the Hair Growth Formula to pubic hair as well

function generateHomePillsInventory() {
	$(function () {
		T.disableGridClick = false;
		for (const item of setup.pills) {
			if (item.display_condition() === 1) window.addElementToGrid(item);
		}
	});
}
window.generateHomePillsInventory = generateHomePillsInventory;

function addElementToGrid(item) {
	$(function () {
		const hpiGridContainer = document.getElementById("homeMainPillContainer");

		const itemName = item.name[0].toUpperCase() + item.name.slice(1);
		const itemDisplayName = homePillDisplayName(item.name);
		hpiGridContainer.innerHTML =
			hpiGridContainer.innerHTML +
			`
			<div class="hpi_item">
				<div class="hpi_icon">${item.frontIcon ? `<img class="icon infront" src="${item.frontIcon}"/>` : ""}<img class="icon" src="${item.icon}"/></div>
				<div class="hpi_name" id="hpi_name_${itemName}">
					${itemDisplayName}
					${item.autoTake() === true ? `<span class="hpi_auto_label"> [자동]</span>` : ""}
				</div>
				<div class="hpi_count" onmouseenter="T.disableGridClick = true" onmouseleave="T.disableGridClick = false">${item.owned()}</div>
			</div>
			`;
		hpiGridContainer.lastElementChild.setAttribute("onclick", "window.onHomePillItemClick(" + "`" + item.name + "`" + ")");
	});
}
window.addElementToGrid = addElementToGrid;

function onHomePillItemClick(itemName) {
	if (!T.disableGridClick) {
		document.getElementById("homeDescPillContainer").style.display = "grid";
		for (const item of setup.pills) {
			if (item.name === itemName) {
				const itemName = "`" + item.name + "`";
				const itemType = "`" + item.type + "`";
				document.getElementById("hpi_desc").outerHTML = `
				<div id="hpi_desc">
					${item.description}
					<div class="hpi_warning_label">${item.warning_label}</div>
					<div id="hpi_desc_action">
						<div>
							<a id="hpi_take_pills" onclick="window.onTakeClick(${itemName}, ${itemType})">알약 복용</a>
						</div>
						<div>
							<a id="hpi_take_every_morning" onclick="window.onAutoTakeClick(${itemName}, ${itemType})">매일 아침 복용</a>
						</div>
					</div>
				</div>`;
				window.initPillContextButtons(item);
				document.getElementById("hpi_desc_img").innerHTML =
					(item.frontIcon
						? `<img${item.shape === "galenic" ? ` style="margin-left: 17%;"` : ""} class="icon infront" src="${item.frontIcon}"/>`
						: "") +
					`<img${item.shape === "galenic" ? ` style="margin-left: 17%;"` : ""} src="${item.icon}" />` +
					`<div id="hpi_indicator" class="hpi_indicator"></div>`;
				window.addIndicators(item);
			}
		}
	}
}
window.onHomePillItemClick = onHomePillItemClick;

function addIndicators(item) {
	// Indicators are the "++Control" and "+Awareness" etc. We add them under the pill icon.
	if (item.indicators != null && item.indicators.length > 0 && !V.settings.blindStatsEnabled) {
		for (const indicator of item.indicators) document.getElementById("hpi_indicator").innerHTML += indicator;
	}
}
window.addIndicators = addIndicators;

function initPillContextButtons(item) {
	// create button to "Take everyone morning" / "Stop taking them" (every morning)
	if (item.hpi_take_every_morning) {
		document.getElementById("hpi_take_every_morning").innerHTML = item.hpi_take_every_morning();
	} else {
		document.getElementById("hpi_take_every_morning").innerHTML = item.autoTake() ? "자동 복용 중지" : "매일 아침 복용";
	}

	// special case if pill type is "asylum" or "harper"
	if (item.type === "asylum" || item.type === "harper") {
		document.getElementById("hpi_take_every_morning").className = "hidden"; // prevent 'Take every Morning' option to be displayed for those type of pills
		document.getElementById("hpi_take_pills").classList.add("hpi_take_me_single"); // readapt css since there's only one button now
	}
	//  Add 'Take pill' button
	document.getElementById("hpi_take_pills").innerHTML = item.hpi_take_pills ? item.hpi_take_pills() : "알약 복용";

	// If the button doesn't exist, create it. If it exists, display the right dose Taken for that pill
	if (document.getElementById("hpi_doseTaken") != null) {
		if (item.hpi_doseTaken) {
			document.getElementById("hpi_doseTaken").outerHTML =
				"<span id='hpi_doseTaken' style='font-size: 0.88em;color: #979797;'> [" + item.hpi_doseTaken() + "]</span>";
		} else {
			// todo: replace style with a proper css class
			document.getElementById("hpi_doseTaken").outerHTML =
				"<span id='hpi_doseTaken' style='font-size: 0.88em;color: #979797;'> [" + item.doseTaken() + "회 복용]</span>";
		}
		// Display today taken doses for specific pill
	} else {
		if (item.hpi_doseTaken) {
			document.getElementById("hpi_take_pills").outerHTML +=
				`<span id="hpi_doseTaken" style="font-size: 0.88em;color: #979797;"> [` + item.hpi_doseTaken() + `]</span>`; // Display today taken doses for specific pill
		} else {
			document.getElementById("hpi_take_pills").outerHTML +=
				`<span id="hpi_doseTaken" style="font-size: 0.88em;color: #979797;"> [` + item.doseTaken() + `회 복용]</span>`; // Display today taken doses for specific pill
		}
	}
	// Check if the player meets the criteria to take the pill.
	if (item.take_condition() === 0) {
		document.getElementById("hpi_take_pills").classList.add("hpi_greyed_out"); // grey the "Take Pill" button out
		document.getElementById("hpi_take_pills").onclick = ""; // disable "Take Pill" onclick event.
	}
}
window.initPillContextButtons = initPillContextButtons;

function setLastTaken(type, subtype, fullname = null) {
	if (fullname != null) {
		for (const p of setup.pills) {
			if (p.name === fullname) {
				type = p.type;
				subtype = p.subtype;
			}
		}
	}
	V.sexStats.pills.lastTaken[type] = subtype;
}
window.setLastTaken = setLastTaken;

function redetermineMostTaken(type, subtype, fullname = null) {
	const result = { blocker: 0, growth: 0, reduction: 0 };
	if (fullname != null) {
		for (const p of setup.pills) {
			if (p.name === fullname) {
				type = p.type;
				subtype = p.subtype;
			}
		}
	}
	if (!["breast", "bottom", "penis"].includes(type)) return;
	for (const pill of setup.pills) {
		if (pill.type === type && ["blocker", "growth", "reduction"].includes(pill.subtype)) {
			result[pill.subtype] = pill.doseTaken();
		}
	}
	const ret = result.growth - result.reduction;
	if (ret === 0 && (result.growth > 0 || result.reduction > 0)) {
		// We enter here when growth and reduction pills neutralised each others
		if (result.blocker > 0) return (V.sexStats.pills.mostTaken[type] = "blocker");
		else return (V.sexStats.pills.mostTaken[type] = ["growth", "reduction"].random());
	} else if (ret === 0 && result.blocker > 0)
		// we enter here when player didn't take any growth/blocker but took blockers
		return (V.sexStats.pills.mostTaken[type] = "blocker");
	else if (ret !== 0) {
		// we enter here when there's unbalance between growth/reduction
		if (ret < 0)
			// if reduction won
			return ret + result.blocker >= 0 ? (V.sexStats.pills.mostTaken[type] = "blocker") : (V.sexStats.pills.mostTaken[type] = "reduction");
		// determine if blocker win
		else if (ret > 0)
			// if growth won
			return ret - result.blocker <= 0 ? (V.sexStats.pills.mostTaken[type] = "blocker") : (V.sexStats.pills.mostTaken[type] = "growth"); // determine if blocker win
	}
}
window.redetermineMostTaken = redetermineMostTaken;

function onTakeClick(itemName) {
	V.sexStats.pills["pills"][itemName].owned -= 1;

	switch (itemName) {
		case "Anti-Parasite Cream":
			V.sexStats.pills["pills"][itemName].doseTaken += 14;
			break;
		case "Hair Growth Formula":
			V.sexStats.pills["pills"][itemName].doseTaken += 3;
			break;
		default:
			// Stat for total pills consumption
			V.pillsConsumed = (V.pillsConsumed || 0) + 1;
			V.sexStats.pills["pills"][itemName].doseTaken += 1;
			break; // Stat for specific pill consumptionbreak;
	}

	for (const item of setup.pills) {
		if (item.name === itemName) {
			for (const widget of item.effects) // run the widgets associated with a pill
				Wikifier.wikifyEval(typeof widget === "function" ? widget() : widget);
			V.sexStats.pills.lastTaken[item.type] = item.subtype; // keep track of the category of pill we last took
			V.sexStats.pills.mostTaken[item.type] = window.redetermineMostTaken(item.type, item.subtype);
			if (item.doseTaken() > 1 && !item.name.includes("blocker")) {
				switch (item.type) {
					case "parasite":
					case "hair":
						break;
					case "pregnancy":
						V.overdosePillsTaken = item.name;
						Engine.play("PillCollectionSecondDosePregnancy");
						return;
					default:
						Engine.play("PillCollectionSecondDose");
						return;
				}
			}
			V.lastPillTakenDescription = item.onTakeMessage;
		}
	}
	Engine.play("Take Pill From Medicine Drawer");
}
window.onTakeClick = onTakeClick;

function onAutoTakeClick(itemName, itemType) {
	for (const item in setup.pills) {
		if (setup.pills[item].name === itemName) {
			V.sexStats.pills["pills"][itemName].autoTake = !V.sexStats.pills["pills"][itemName].autoTake; // toggle auto take
			window.initPillContextButtons(setup.pills[item]); // change "Take every morning" button to "Stop taking them"
		} else if (["breast", "penis", "bottom", "pregnancy"].includes(itemType) && setup.pills[item].type === itemType)
			V.sexStats.pills["pills"][setup.pills[item].name].autoTake = false; // disable auto takes for other similar pills(bottom/penis/breast etc)
	}
	window.syncAutoTakeDisplayedState();
}
window.onAutoTakeClick = onAutoTakeClick;

function syncAutoTakeDisplayedState() {
	// Add or remove [Auto] tag from pill names in the pills menu
	for (const item of setup.pills) {
		const capitalisedName = item.name[0].toUpperCase() + item.name.slice(1);
		if (document.getElementById("hpi_name_" + capitalisedName) != null) {
			document.getElementById("hpi_name_" + capitalisedName).innerHTML = homePillDisplayName(item.name);
			document.getElementById("hpi_name_" + capitalisedName).innerHTML += item.autoTake() === true ? "<span class='hpi_auto_label'> [자동]</span>" : "";
		}
	}
}
window.syncAutoTakeDisplayedState = syncAutoTakeDisplayedState;

function onSecondDoseTakenSetVars() {
	// If player take two doses of anything but blocker/pregnancy/harper/asylum pills, determine the risk stat and
	let doseTaken = { bottom: 0, penis: 0, breast: 0 };

	T.risk = 0;
	T.pillAmountOfCategoriesUsed = 0;
	for (const item of setup.pills) {
		// determine how many pills of each have been taken.
		if (["bottom", "penis", "breast"].includes(item.type)) doseTaken[item.type] += item.doseTaken();
	}
	const sumValues = obj => Object.values(obj).reduce((a, b) => a + b); // count every doses
	let i = -1;
	const doseTakenSum = sumValues(doseTaken); // store the count in this variable
	while (++i < doseTakenSum)
		// for each dose count, increase the overall risk.
		T.risk += random(3, 10); // For each dose found, add 3-10 risk points.
	doseTaken = [
		["bottom", doseTaken["bottom"]],
		["penis", doseTaken["penis"]],
		["breast", doseTaken["breast"]],
	]; // Changed object to array as it's easier to sort.
	for (const array of doseTaken) {
		if (array[1] > 0) T.pillAmountOfCategoriesUsed += 1; // How many different categories of pills we took ?
	}
	i = -1;
	while (++i < doseTaken.length - 1) {
		// sort categories that got the most doses
		if (doseTaken[i][1] < doseTaken[i + 1][1]) {
			const tmp = doseTaken[i];

			doseTaken[i] = doseTaken[i + 1];
			doseTaken[i + 1] = tmp;
			i = -1;
		}
	}
	i = doseTaken[0][1] > doseTaken[1][1] ? 1 : doseTaken[0][1] === doseTaken[1][1] ? 2 : doseTaken[0][1] === doseTaken[2][1] ? 3 : 1; // determine how many have same value
	const chosen = random(0, i - 1);
	V.pillCat = doseTaken[chosen][0]; // select random category among the 1st ones
	T.secondaryPill = chosen > 0 ? doseTaken[chosen - 1][0] : doseTaken[chosen + 1][0]; // select second category
}
window.onSecondDoseTakenSetVars = onSecondDoseTakenSetVars;

function backCompPillsInventory() {
	/* Return immediately if $sexStats doesn't exist. */
	if (typeof V.sexStats === "undefined") return;
	const oPills = V.sexStats.pills;
	const pills = {};
	if (typeof oPills === "object") {
		/* If our $sexStats.pills is an object and has this property, it is ready for production. */
		/* Man on the internet said this is right */
		if (typeof oPills.mostTaken === "object") return;
		try {
			pillsObjectRepair(oPills, pills);
		} catch (error) {
			Errors.report("Compatibility patch for pills object failed: " + error, { oPills, pills });
		}
	}
	Object.assign(pills, {
		"bottom reduction": { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
		"bottom growth": { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
		"bottom blocker": { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
		"breast reduction": { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
		"breast growth": { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
		"breast blocker": { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
		"penis reduction": { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
		"penis growth": { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
		"penis blocker": { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
		"anti-parasite": { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
		"fertility booster": { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
		contraceptive: { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
		"asylum's prescription": { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
		"Dr Harper's prescription": { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
		"Anti-Parasite Cream": { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
	});
	if (typeof oPills === "undefined") {
		/* If our $sexStats.pills was empty, simply set the object in preparation to assign. */
		V.sexStats.pills = {};
	}
	Object.assign(V.sexStats.pills, {
		boughtOnce: pills.boughtOnce === true,
		lastTaken: { bottom: "", breast: "", penis: "", pregnancy: "" },
		mostTaken: { bottom: "", breast: "", penis: "", pregnancy: "" },
		pills,
	});
}
window.backCompPillsInventory = backCompPillsInventory;

function pillsObjectRepair(oPills, pills) {
	/* if the variable already exist and is not of the new version(new version has "mostTaken" property that's why we check it),
	then we try to port the old one to the new one */
	if (typeof oPills.bottom === "object") {
		Object.assign(pills, {
			"bottom reduction": { autoTake: oPills.bottom.autoTake === "reduction", owned: oPills.bottom.owned.reduction },
			"bottom growth": { autoTake: oPills.bottom.autoTake === "growth", owned: oPills.bottom.owned.growth },
			"bottom blocker": { autoTake: oPills.bottom.autoTake === "blocker", owned: oPills.bottom.owned.blocker },
		});
		delete oPills.bottom;
	}
	if (typeof oPills.breast === "object") {
		Object.assign(pills, {
			"breast reduction": { autoTake: oPills.breast.autoTake === "reduction", owned: oPills.breast.owned.reduction },
			"breast growth": { autoTake: oPills.breast.autoTake === "growth", owned: oPills.breast.owned.growth },
			"breast blocker": { autoTake: oPills.breast.autoTake === "blocker", owned: oPills.breast.owned.blocker },
		});
		delete oPills.breast;
	}
	if (typeof oPills.penis === "object") {
		Object.assign(pills, {
			"penis reduction": { autoTake: oPills.penis.autoTake === "reduction", owned: oPills.penis.owned.reduction },
			"penis growth": { autoTake: oPills.penis.autoTake === "growth", owned: oPills.penis.owned.growth },
			"penis blocker": { autoTake: oPills.penis.autoTake === "blocker", owned: oPills.penis.owned.blocker },
		});
		delete oPills.penis;
	}
	if (typeof V.asylumpills === "number") {
		Object.assign(pills, {
			"asylum's prescription": { owned: Number.isInteger(V.asylumpills) ? V.asylumpills : 0 },
		});
		delete V.asylumpills;
	}
	if (typeof V.pills === "number") {
		Object.assign(pills, {
			"Dr Harper's prescription": { owned: Number.isInteger(V.pills) ? V.pills : 0 },
		});
		delete V.pills;
	}
}

function determineAutoTakePill(category) {
	T.autoTakeDetermined = null;
	for (const pill of setup.pills) {
		if (pill.type === category && pill.autoTake() === true) {
			T.autoTakeDetermined = pill.name;
			return;
		}
	}
}
window.determineAutoTakePill = determineAutoTakePill;

function resetAllDoseTaken() {
	for (const pill in V.sexStats.pills["pills"]) {
		switch (pill) {
			case "Anti-Parasite Cream":
			case "fertility booster":
			case "contraceptive":
			case "Hair Growth Formula":
				if (V.sexStats.pills["pills"][pill].doseTaken > 0) {
					V.sexStats.pills["pills"][pill].doseTaken--;
				}
				break;
			default:
				V.sexStats.pills["pills"][pill].doseTaken = 0;
				break;
		}
	}
}
window.resetAllDoseTaken = resetAllDoseTaken;

function resetLastTaken() {
	V.sexStats.pills.lastTaken = { bottom: "", breast: "", penis: "", pregnancy: "" };
}
window.resetLastTaken = resetLastTaken;

function resetMostTaken() {
	V.sexStats.pills.mostTaken = { bottom: "", breast: "", penis: "", pregnancy: "" };
}
window.resetMostTaken = resetMostTaken;

function getAllPills() {
	for (const item of Object.keys(V.sexStats.pills.pills)) V.sexStats.pills.pills[item].owned = 14;
}
window.getAllPills = getAllPills;

function hasPillsTaken(type) {
	if (!setup.pills.find(pill => pill.name === type)) return Errors.report("Couldn't find pills", type);
	return V.sexStats.pills.pills?.[type]?.doseTaken || 0;
}
window.hasPillsTaken = hasPillsTaken;
