function gainSchoolStar(variable) {
	if (V.settings.blindStatsEnabled) return document.createDocumentFragment();
	const createElement = (type, clas, content) => {
		const element = document.createElement(type);
		element.classList.add(clas);
		if (type === "img") {
			element.src = content;
		} else {
			element.textContent = content;
		}
		return element;
	};
	const fragment = document.createDocumentFragment();
	if (V.options.images === 1) {
		const img = document.createElement("img");
		img.classList.add("icon");
		if (V[variable] + 1 === 3) {
			fragment.appendChild(createElement("img", "icon", "img/ui/star-gold.png"));
		} else if (V[variable] + 1 === 2) {
			fragment.appendChild(createElement("img", "icon", "img/ui/star-silver.png"));
		} else if (V[variable] + 1 === 1) {
			fragment.appendChild(createElement("img", "icon", "img/ui/star-bronze.png"));
		}
	} else {
		if (V[variable] + 1 === 3) {
			fragment.appendChild(createElement("span", "gold", "금별"));
		} else if (V[variable] + 1 === 2) {
			fragment.appendChild(createElement("span", "platinum", "은별"));
		} else if (V[variable] + 1 === 1) {
			fragment.appendChild(createElement("span", "brown", "동별"));
		}
	}
	return fragment;
}
window.gainSchoolStar = gainSchoolStar;

function schoolStar(variable) {
	const createElement = (type, clas, content) => {
		const element = document.createElement(type);
		element.classList.add(clas);
		if (type === "img") {
			element.src = content;
		} else {
			element.textContent = content;
		}
		return element;
	};
	const fragment = document.createDocumentFragment();
	if (V.options.images === 1) {
		if (V[variable] >= 3) {
			fragment.appendChild(createElement("img", "icon", "img/ui/star-gold.png"));
		} else if (V[variable] === 2) {
			fragment.appendChild(createElement("img", "icon", "img/ui/star-silver.png"));
		} else if (V[variable] === 1) {
			fragment.appendChild(createElement("img", "icon", "img/ui/star-bronze.png"));
		} else {
			fragment.appendChild(createElement("img", "icon", "img/ui/star-empty.png"));
		}
	} else {
		fragment.appendChild(createElement("span", "platinum", `별 ${V[variable]} / 3`));
	}
	return fragment;
}
window.schoolStar = schoolStar;
