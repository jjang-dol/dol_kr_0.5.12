const events = [
	{
		// event name for debugging and logging failures
		name: "등교일",
		// conditions for the reminder to show up
		// must be specific enough to no longer trigger once the event is actually attended. mandatory.
		condition() {
			return Time.schoolDay && (Object.keys(V.daily.school.attended).length < 5 || Time.hour < 15);
		},
		// arriving at any time during this hour brings no penalties to the event
		starthour: 8,
		// the last hour during which the event can still be attended. puts event in top priority tier during that hour. shows a failure message after that hour if condition() is still true.
		endhour: 14,
		// bigger number === higher chance of it being pulled. default is 1.
		priority: 5, // prioritise avoiding truancy
		// text shown in twine markup while event is scheduled
		text: "<<schoolday>>",
		// text shown if condition() is still met, but it's past the time to attend
		failuretext: "오늘 수업을 <<print 5 - Object.keys(V.daily.school.attended).length>>번 빠졌습니다.",
	},
	{
		// example of a lazy event that will still work
		name: "내일",
		condition() {
			return Time.isSchoolDay(Time.tomorrow) && (!Time.schoolDay || Time.hour > 14);
		},
		text: "내일은 학교에 가는 날입니다.",
	},
	{
		// fallback event when no others are available
		name: "등교 안 하는 날",
		condition() {
			// other school-related events have higher priority anyway
			return true;
		},
		text: "내일은 학교가 쉬는 날입니다.",
		priority: 0,
	},
	{
		name: "에이버리 데이트",
		condition() {
			return V.avery_mansion?.schedule !== "away" && V.averydate === 1 && V.averydatedone !== 1 && V.averydateattended !== 1 && Time.weekDay === 7;
		},
		starthour: 20,
		endhour: 20,
		priority: 4,
		text: "<<if Time.hour is 20>><span class='gold'>지금</span><<else>><<ampm 20 00>>에<</if>> <<print $avery_mansion ? '저택 차고에서' : '도무스 가에서'>> 에이버리와 데이트 약속이 있습니다.",
		failuretext: "에이버리와의 데이트에 나타나지 않았습니다.",
	},
	{
		name: "에이버리 발렌타인 데이트",
		condition() {
			return V.avery_valentines?.invite && !V.avery_valentines.done && Time.month === 2 && Time.monthDay === 14;
		},
		get starthour() {
			return V.avery_mansion ? 21 : 20;
		},
		endhour: 24,
		priority: 4,
		text: "<<if $avery_mansion>>저택 차고에서 <<ampm 21 00>>부터<<elseif Time.hour lt 20>>도무스 가에서 <<ampm 20 00>>부터<</if>> 에이버리와 <span class='pink'>발렌타인 데이트</span> 약속이 있습니다.",
		failuretext: "에이버리와의 발렌타인 데이트를 놓쳤습니다.",
	},
	{
		name: "사회봉사",
		condition() {
			return V.community_service >= 1 && V.community_service_done !== 1;
		},
		starthour: 6,
		endhour: 20,
		priority: 1,
		text: "바브 가 경찰서에서 사회봉사를 하러 오길 기다리고 있습니다.",
		failuretext: "오늘 사회봉사에 참석하지 않았습니다.",
	},
	{
		name: "하퍼 진료",
		condition() {
			return (V.harper_appointments.enabled || V.schoolPsych === 1) && Time.weekDay === 6 && V.daily.harperVisit !== 1;
		},
		priority: 2,
		text: "오늘 병원에서 하퍼 의사<<print $harper_appointments.enabled ? '와 진료 예약이 잡혀 있습니다' : '의 진료 예약을 잡을 수 있을지도 모릅니다'>>.",
		failuretext: "하퍼 의사의 진료 <<print $harper_appointments.enabled ? '예약' : '예약 기회'>>【을를】 놓쳤습니다.",
	},
	{
		name: "창관 쇼",
		condition() {
			return V.brothelshowdata.type !== "none" && V.brothelshowdata.intro && Time.weekDay === 6 && !V.brothelshowdata.done;
		},
		priority: 3,
		text: "오늘 창관에서 <<print $brothelshowdata.type>> 쇼에 출연하기로 했습니다.",
	},
	{
		name: "에스코트 일",
		condition() {
			const job = V.brothel_escortjob;
			if (!job) return;
			if (job.done || job.escape || job.missed || !job.accept) return;
			return Time.monthDay === new DateTime(job.date).day;
		},
		get starthour() {
			return new DateTime(V.brothel_escortjob.date).hour;
		},
		get endhour() {
			return this.starthour;
		},
		priority: 6,
		text: "<<ampm `new DateTime(V.brothel_escortjob.date).hour`>>에 에스코트 일이 있습니다.",
		failuretext: "에스코트 일을 놓쳤습니다.",
	},
	{
		name: "렌의 강탈",
		condition() {
			return V.wrenHeist === true && V.wrenHeistDance.attended !== true;
		},
		starthour: 19,
		endhour: 20,
		priority: 3,
		text: "렌이 다뉴브 가에서 <<ampm 19 00>>부터 <<ampm 21 00>> 사이에 당신을 기다립니다.",
	},
	{
		name: "밀수업자",
		condition() {
			return V.smuggler_known === 1 && V.smuggler_timer === 0;
		},
		starthour: 21,
		endhour: 24,
		priority: 5,
		text: "오늘 밤 자정 전에 밀수꾼들이 물건을 <<switch $smuggler_location>><<case 'forest'>>숲을 통해<<case 'sewer'>>오래된 하수도를 통해<<case 'beach'>>해변 근처 암초에서<<case 'bus'>>버스로<<default>><</switch>> 옮긴다는 이야기를 들었습니다.",
	},
	{
		name: "레미의 공격",
		condition() {
			return V.farm_stage >= 7 && V.farm_attack_timer === 0;
		},
		starthour: 21,
		endhour: 24,
		priority: 3,
		text: "레미가 오늘 밤 <<ampm 21 00>>부터 자정 사이에 농장을 습격할 것입니다.",
	},
	{
		name: "성인용품점 돕기",
		condition() {
			return (
				V.adultshopprogress < 22 &&
				V.adultshopintro === 1 &&
				V.adultshopunlocked === undefined &&
				!V.daily.dilapidatedShopHelp &&
				Time.weekDay === 6 &&
				(Time.hour <= 15 || V.adultshopstate === "sydney")
			);
		},
		starthour: 16,
		endhour: 19,
		priority: 6,
		text: "엘크 가의 성인용품점은 오늘 <<ampm 16>> 이후 개조 공사를 합니다.",
		failuretext: "오늘 성인용품점에서 <<if C.npc.Sydney.init>>시드니를<</if>> 돕지 않았습니다.",
	},
	{
		name: "과학 박람회",
		condition() {
			return V.scienceproject === "ongoing" && V.scienceprojectdays === 0;
		},
		starthour: 9,
		endhour: 18,
		priority: 5,
		text: "과학 박람회가 클리프 가에서 <<ampm 9 00>>부터 <<ampm 18 00>>까지 열립니다.",
		failuretext: "과학 박람회가 끝났습니다. 참석하지 않았습니다.",
	},
	{
		name: "내일 과학 박람회",
		condition() {
			return V.scienceprojectdays === 1;
		},
		priority: 2,
		text: "내일 클리프 가에서 과학 박람회가 열립니다.",
	},
	{
		name: "수학 경시대회",
		condition() {
			return V.mathsprojectdays === 0 && V.mathsproject === "ongoing";
		},
		starthour: 9,
		endhour: 18,
		priority: 5,
		text: "수학 경시대회가 클리프 가에서 <<ampm 9 00>>부터 <<ampm 18 00>>까지 열립니다.",
		failuretext: "수학 경시대회가 끝났습니다. 참석하지 않았습니다.",
	},
	{
		name: "내일 수학 경시대회",
		condition() {
			return V.mathsprojectdays === 1;
		},
		priority: 2,
		text: "내일 클리프 가에서 수학 경시대회가 열립니다.",
	},
	{
		name: "영어 연극",
		condition() {
			return V.englishPlayDays === 0 && V.englishPlay === "ongoing";
		},
		starthour: 17,
		endhour: 21,
		priority: 5,
		text: "오늘 클리프 가에서 학교 연극제가 <<ampm 17 00>>부터 <<ampm 21 00>>까지 열립니다.",
		failuretext: "학교 연극제가 모두 끝났습니다. 참석하지 않았습니다.",
	},
	{
		name: "내일 영어 연극",
		condition() {
			return V.englishPlayDays === 1;
		},
		priority: 2,
		text: "내일 클리프 가에서 학교 연극제가 열립니다.",
	},
	];
setup.events = events;

Macro.add("questmarker", {
	handler() {
		const br = () => this.output.append(document.createElement("br"));
		// silence notifications in hopeless cycle and bad ends
		if (V.hc || ["prison", "asylum"].includes(V.location) || V.statFreeze) return;
		const qualifiedEvents = events.filter(ev => ev.condition());
		// display failure messages for missed events
		qualifiedEvents.forEach(ev => {
			if (!ev.failuretext || Time.hour <= (ev.endhour || 24)) return;
			const failvar = ev.name + "fail";
			if (V.daily[failvar]) return;
			V.daily[failvar] = 1;
			const div = document.createElement("div");
			div.classList.add("purple");
			div.append(Wikifier.wikifyEval(ev.failuretext));
			this.output.append(div);
			br();
		});

		let importants = [];
		// find the most important notification
		// first go events about to expire
		importants = qualifiedEvents.filter(ev => ev.endhour === Time.hour);
		// second go events underway (unless they are all-day events that don't have starthour)
		if (!importants.length) importants = qualifiedEvents.filter(ev => between(Time.hour, ev.starthour, ev.endhour == null ? 24 : ev.endhour));
		// third go upcoming and all day events
		if (!importants.length) importants = qualifiedEvents.filter(ev => Time.hour <= (ev.endhour == null ? 24 : ev.endhour));
		if (!importants.length) return;
		// find the highest priority of available events
		let topprio = 0;
		importants.forEach(ev => {
			// make sure priority exists for filtering later
			if (ev.priority == null) ev.priority = 1;
			if (ev.priority > topprio) topprio = ev.priority;
		});
		// pick a random event from highest priority ones
		const pick = importants.filter(ev => ev.priority === topprio).random();
		const div = document.createElement("div");
		div.append(Wikifier.wikifyEval(pick.text));
		this.output.append(div);
		br();

		/* alternatively, here goes the code to display all active events at once rather than the top one. can end up cluttering the sidebar.
		let counter = 0;
		qualifiedEvents.forEach(ev => {
			const div = document.createElement("div");
			if (Time.hour <= (ev.endhour || 24)) {
				div.append(Wikifier.wikifyEval(ev.text));
				this.output.append(div);
				br();
				counter++;
			}
		});
		if (counter > 0) this.output.append(br);
		*/
	},
});
