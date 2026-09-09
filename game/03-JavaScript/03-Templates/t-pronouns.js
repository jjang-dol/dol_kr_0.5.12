function getHe() {
	switch (V.pronoun) {
		case "m":
			return "그";
		case "f":
			return "그녀";
		case "i":
			return "그것의 것";
		case "n":
			return "그 사람";
		case "t":
			return "그들";
		default:
			Errors.report(`NPC를 선택하지 않은 상태에서 ?${this.name} 사용됨. 보통 먼저 <<person1>> 호출이 필요합니다. ${Utils.GetStack()}`);
			return "그들";
	}
}
/**
 * ?he - Returns the pronoun based on whatever $pronoun is set to.
 *		  Call ?he in TwineScript after calling <<person1>> to use.
 */
/** ?He - Capitalised version of above. */
Template.add(["he", "He"], function () {
	return this.name === "He" ? getHe.call(this).toUpperFirst() : getHe.call(this);
});

function getHim() {
	switch (V.pronoun) {
		case "m":
			return "그";
		case "f":
			return "그녀";
		case "i":
			return "그것의 것";
		case "n":
			return "그 사람";
		case "t":
			return "그들";
		default:
			Errors.report(`NPC를 선택하지 않은 상태에서 ?${this.name} 사용됨. 보통 먼저 <<person1>> 호출이 필요합니다. ${Utils.GetStack()}`);
			return "그들";
	}
}
/**
 * ?him - Returns the pronoun based on whatever $pronoun is set to.
 *		   Call ?him in TwineScript after calling <<person1>> to use.
 */
/** ?Him - Capitalised version of above. */
Template.add(["him", "Him"], function () {
	return this.name === "Him" ? getHim.call(this).toUpperFirst() : getHim.call(this);
});

function getHis() {
	switch (V.pronoun) {
		case "m":
			return "그의";
		case "f":
			return "그녀의";
		case "i":
			return "그것의";
		case "n":
			return "그 사람의";
		case "t":
			return "그들의";
		default:
			Errors.report(`NPC를 선택하지 않은 상태에서 ?${this.name} 사용됨. 보통 먼저 <<person1>> 호출이 필요합니다. ${Utils.GetStack()}`);
			return "그들의";
	}
}
/**
 * ?his - Returns the pronoun based on whatever $pronoun is set to.
 *		   Call ?his in TwineScript after calling <<person1>> to use.
 */
/** ?His - Capitalised version of above. */
Template.add(["his", "His"], function () {
	return this.name === "His" ? getHis.call(this).toUpperFirst() : getHis.call(this);
});

function getHeIs() {
	switch (V.pronoun) {
		case "m":
		case "f":
		case "i":
		case "n":
		case "t":
			return getHe.call(this) + "【은는】 ";
		default:
			DOL.Errors.report(`NPC를 선택하지 않은 상태에서 ?${this.name} 사용됨. 보통 먼저 <<person1>> 호출이 필요합니다. ${Utils.GetStack()}`);
			return "그들은";
	}
}
/**
 * ?hes - Returns the pronoun based on whatever $pronoun is set to.
 *		   Call ?hes in TwineScript after calling <<person1>> to use.
 */
/** ?Hes - Capitalised version of above. */
Template.add(["hes", "Hes"], function () {
	return this.name === "Hes" ? getHeIs.call(this).toUpperFirst() : getHeIs.call(this);
});

function getHers() {
	switch (V.pronoun) {
		case "m":
			return "그의 것";
		case "f":
			return "그녀의 것";
		case "i":
			return "그것의 것";
		case "n":
			return "그 사람의 것";
		case "t":
			return "그들의 것";
		default:
			Errors.report(`NPC를 선택하지 않은 상태에서 ?${this.name} 사용됨. 보통 먼저 <<person1>> 호출이 필요합니다. ${Utils.GetStack()}`);
			return "그들의 것";
	}
}
/**
 * ?hers - Returns the pronoun based on whatever $pronoun is set to.
 *		   Call ?hers in TwineScript after calling <<person1>> to use.
 */
/** ?Hers - Capitalised version of above. */
Template.add(["hers", "Hers"], function () {
	return this.name === "Hers" ? getHers.call(this).toUpperFirst() : getHers.call(this);
});

function getHimself() {
	switch (V.pronoun) {
		case "m":
			return "그 자신";
		case "f":
			return "그녀 자신";
		case "i":
			return "그것 자체";
		case "n":
			return "그 자신";
		case "t":
			return "그들 자신";
		default:
			Errors.report(`NPC를 선택하지 않은 상태에서 ?${this.name} 사용됨. 보통 먼저 <<person1>> 호출이 필요합니다. ${Utils.GetStack()}`);
			return "그들 자신";
	}
}
/**
 * ?himself - Returns the pronoun based on whatever $pronoun is set to.
 *		   Call ?himself in TwineScript after calling <<person1>> to use.
 */
/** ?Himself - Capitalised version of above. */
Template.add(["himself", "Himself"], function () {
	return this.name === "Himself" ? getHimself.call(this).toUpperFirst() : getHimself.call(this);
});

function getPeople() {
	switch (maleChance()) {
		case 100:
			return "남자들";
		case 0:
			return "여자들";
		default:
			return "남녀";
	}
}
/**
 * ?people - Returns the pronoun based on whatever $pronoun is set to.
 *		   Call ?people in TwineScript after calling <<person1>> to use.
 */
/** ?People - Capitalised version of above. */
Template.add(["people", "People"], function () {
	return this.name === "People" ? getPeople.call(this).toUpperFirst() : getPeople.call(this);
});

function getPeopleYoung() {
	switch (maleChance()) {
		case 100:
			return "남학생들";
		case 0:
			return "여학생들";
		default:
			return "학생들";
	}
}
/**
 * ?peopley - Returns the pronoun based on whatever $pronoun is set to.
 *		   Call ?peopley in TwineScript after calling <<person1>> to use.
 */
/** ?Peopley - Capitalised version of above. */
Template.add(["peopley", "Peopley"], function () {
	return this.name === "Peopley" ? getPeopleYoung.call(this).toUpperFirst() : getPeopleYoung.call(this);
});
