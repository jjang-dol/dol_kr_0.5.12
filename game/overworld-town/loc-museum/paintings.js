/* Hopeless Cycle 아이템 및 명칭 한국어 매핑 사전 */
setup.hcItemNames = {
	"torch": "횃불",
	"snuffer": "횃불 끄개",
	"torch snuffer": "횃불 끄개",
	"water": "물",
	"bucket": "양동이",
	"container": "용기",
	"bandages": "붕대",
	"food": "음식",
	"sheets": "천",
	"prisoner": "죄수",
	"clothes": "옷",
	"clutter": "잡동사니",
	"herbs": "약초",
	"medicinal herbs": "약초",
	"bones": "뼈",
	"bloodstained sack": "피 묻은 포대자루",
	"torn vegetable sack": "찢어진 야채 자루",
	"prison gruel": "배급 죽",
	"stolen food": "훔친 음식",
	"stolen fruit": "훔친 과일",
	"dish": "접시",
	"stolen dish": "훔친 접시",
	"used dish": "사용한 접시",
	"ruined fabric scraps": "찢어진 천 조각",
	"torn bandages": "찢어진 붕대",
	"warded bandages": "보호 붕대",
	"witchblooms": "마녀꽃",
	"purified witchblooms": "정화된 마녀꽃",
	"leather gloves": "가죽 장갑",
	"forearm bones": "팔뚝뼈",
	"lit": "불 붙은",
	"snuffed": "꺼진",
	"burnt": "다 탄"
};

function hcTranslateName(name) {
	if (!name) return "";
	return setup.hcItemNames[name] || name;
}
window.hcTranslateName = hcTranslateName;

function hcItemSetup() {
	if (V.hcItems) {
		V.hcItems = V.hcItems.filter(toKeep => toKeep.persists);
	} else {
		V.hcItems = [
			{
				type: "prisoner",
				name: V.prisoner.name,
				location: "cell",
				origin: "cell",
				persists: true,
				containerID: "prisoner",
				twoHanded: true,
				hidden: true,
			},
			{ type: "clothes", name: "bloodstained sack", location: "prisoner", origin: "prisoner", dirty: 2, dirtyOnDrop: V.hcChallenge.itemDirty },
			{ type: "container", name: "bucket", location: "garden", origin: "garden", persists: true, containerID: "gardenBucket1", capacity: 3 },
		];
		if (!V.hcChallenge.torchSnuffer) {
			V.hcItems.push({ type: "snuffer", name: "torch snuffer", location: "guardhouse", origin: "guardhouse", persists: true });
		}
	}
}
window.hcItemSetup = hcItemSetup;

function hcItemAdd(item, loc = "held", actionText = undefined) {
	const acceptedTypes = [
		"torch",
		"snuffer",
		"water",
		"bucket",
		"container",
		"bandages",
		"food",
		"sheets",
		"prisoner",
		"clothes",
		"clutter",
		"herbs",
		"bones",
	];

	// water can only be stored in containers, this is a brute force fallback if other conditions fail for any reason
	if (loc !== "held") {
		acceptedTypes.push("water");
	}

	// string item arg means item taken from unlimited source, otherwise takes custom object
	if (typeof item === "string" && acceptedTypes.includes(item)) {
		const newItem = { type: item, name: item, location: loc, origin: V.bus, vanishesIn: 10 };
		let newItemProperties;
		switch (item) {
			case "torch":
				newItemProperties = { time: 0, state: "burnt", inSconce: false };
				break;
			case "bandages":
				newItemProperties = { dirty: 0, dirtyOnDrop: true, used: false };
				break;
			case "bucket":
			case "container":
				// eslint-disable-next-line no-case-declarations
				let ID;
				for (let IDInt = 0; IDInt < V.hcItems.filter(thing => thing.name === item).length; IDInt++) {
					if (!V.hcItems.find(thing => thing.name === item && thing.containerID === thing.name + IDInt)) {
						ID = item + IDInt;
						break;
					}
				}
				newItemProperties = { type: "container", name: "bucket", containerID: ID, capacity: 3 };
				break;
			case "herbs":
				newItemProperties = { name: "medicinal herbs", dirtyOnDrop: V.hcChallenge.itemDirty };
				break;
			case "water":
				if (V.bus === "garden" && V.hc.wellTainted) {
					newItemProperties = { dirty: 2 };
				} else {
					newItemProperties = { dirty: 0 };
				}
				if (V.hcChallenge.waterLeaky) {
					newItemProperties.time = 5;
				}
				break;
			case "prisoner":
				newItemProperties = { twoHanded: true };
				break;
			default:
				break;
		}
		Object.assign(newItem, newItemProperties);
		V.hcItems.push(newItem);

		if (actionText) {
			V.itemAction = actionText;
			V.itemActionObject = newItem;
		}
	} else if (typeof item === "object" && acceptedTypes.includes(item.type)) {
		const newItem = item;
		V.hcItems.push(newItem);

		if (actionText) {
			V.itemAction = actionText;
			V.itemActionObject = newItem;
		}
	} else {
		V.itemAction = "Invalid item type prevented from being added";
		V.hcItemError = item.type;
	}
}
window.hcItemAdd = hcItemAdd;

function hcItemRemove(item, actionText = undefined) {
	if (item === "all") {
		hcItemSetup();
		return;
	}

	const toRemove = V.hcItems.findIndex(thing => thing.isEqual(item));

	if (toRemove < 0) {
		V.itemAction = "Nonexistent item removed";
		V.hcItemError = item.type;
		return;
	}

	if (actionText) {
		V.itemAction = actionText;
		V.itemActionObject = item;
	}

	if (item.persists) {
		item.location = item.origin;
		if (item.nameText) delete item.nameText;
	} else {
		V.hcItems.deleteAt(toRemove);
	}
}
window.hcItemRemove = hcItemRemove;

function hcItemHolding(id, filterfn) {
	const acceptedItems = ["torch", "snuffer", "water", "bucket", "container", "bandages", "food", "sheets", "prisoner", "clutter", "herbs", "bones"];

	if (!id || !acceptedItems.includes(id)) {
		V.itemAction = "Invalid item not found";
		V.hcItemError = id;
		return;
	}

	if (typeof filterfn !== "function") filterfn = () => true;

	const itemHeld = V.hcItems.find(item => (item.name === id || item.type === id) && ["held"].includes(item.location) && filterfn(item));

	if (itemHeld) {
		return itemHeld;
	}
}
window.hcItemHolding = hcItemHolding;

function hcItemLitTorch() {
	return V.hcItems.find(torch => torch.type === "torch" && torch.location === "held" && torch.state === "lit" && torch.state === "lit");
}
window.hcItemLitTorch = hcItemLitTorch;

function hcItemHasFreeHand() {
	return V.hcItems.filter(items => items.location === "held" && items.twoHanded) && V.hcItems.filter(items => items.location === "held").length < 2;
}
window.hcItemHasFreeHand = hcItemHasFreeHand;

function hcItemCanReach(id, filterfn) {
	const acceptedItems = [
		"torch",
		"snuffer",
		"water",
		"bucket",
		"container",
		"bandages",
		"food",
		"sheets",
		"prisoner",
		"clothes",
		"clutter",
		"herbs",
		"bones",
	];

	if (!id || !acceptedItems.includes(id)) {
		V.itemAction = "Invalid item not found";
		V.hcItemError = id;
		return;
	}

	if (typeof filterfn !== "function") filterfn = () => true;

	if (V.hcChallenge.torchSnuffer && id === "snuffer" && V.passage === "Hopeless Cycle Dungeon") {
		return true;
	}

	const itemWithinReach = V.hcItems.find(item => (item.name === id || item.type === id) && [V.bus, "held"].includes(item.location) && filterfn(item));

	if (itemWithinReach) {
		return itemWithinReach;
	}

	const containers = V.hcItems.filter(container => container.containerID && [V.bus, "held"].includes(container.location));

	for (const container of containers) {
		const itemWithinReachableContainer = V.hcItems.find(
			thing => (thing.name === id || thing.type === id) && thing.location === container.containerID && filterfn(thing)
		);
		if (itemWithinReachableContainer) {
			return itemWithinReachableContainer;
		}
	}
}
window.hcItemCanReach = hcItemCanReach;

function hcItemsOnScreen(filterfn) {
	if (typeof filterfn !== "function") filterfn = () => true;

	const found = V.hcItems.filter(item => filterfn(item) && ["held", V.bus].includes(item.location));
	const containers = V.hcItems.filter(container => container.containerID && ["held", V.bus].includes(container.location));
	const foundInContainers = [];

	for (const container of containers) {
		V.hcItems
			.filter(thing => thing.location === container.containerID && filterfn(thing))
			.forEach(thing => {
				foundInContainers.push(thing);
			});
	}

	return found.concat(foundInContainers);
}
window.hcItemsOnScreen = hcItemsOnScreen;

function hcItemsFilter(filterfn) {
	if (typeof filterfn !== "function") filterfn = () => true;

	const found = V.hcItems.filter(item => filterfn(item));
	const containers = V.hcItems.filter(container => container.containerID);
	let foundInContainers = [];

	for (const container of containers) {
		foundInContainers = V.hcItems.filter(thing => thing.location === container.containerID && filterfn(thing));
	}

	return found.concat(foundInContainers);
}
window.hcItemsFilter = hcItemsFilter;

function hcItemName(item, cap = false, vanished = false, decorations = false) {
	const rawName = decorations && item.nameText ? item.nameText : item.name;
	const nameSpace = decorations && item.nameText ? item.nameText : hcTranslateName(item.name);
	let itemText;
	switch (item.type) {
		case "bandages":
			itemText = nameSpace + " 한 개";
			break;
		case "snuffer":
			itemText = "횃불 끄개";
			break;
		case "torch":
			switch (item.state) {
				case "lit":
					itemText = "불 붙은 횃불";
					break;
				case "snuffed":
					itemText = "꺼진 횃불";
					break;
				default:
					itemText = "다 탄 횃불";
					break;
			}
			break;
		case "clutter":
		case "sheets":
		case "herbs":
		case "bones":
			itemText = nameSpace + " 조금";
			break;
		case "food":
			switch (item.name) {
				case "prison gruel":
					if (item.used) {
						itemText = "사용한 그릇";
					} else {
						itemText = "배급 죽 한 그릇";
					}
					break;
				case "stolen food":
					if (item.used) {
						itemText = "훔친 빈 접시";
					} else {
						itemText = "훔친 음식이 담긴 접시";
					}
					break;
				default:
					itemText = "훔친 과일 조금";
					break;
			}
			break;
		case "bucket":
		case "container":
			itemText = hcTranslateName(item.name);

			// eslint-disable-next-line no-case-declarations
			const containerItemArray = [];
			if (vanished) {
				V.hc.vanishedItems
					.filter(q => q.location === item.containerID)
					.forEach(bye => {
						containerItemArray.push(hcItemName(bye, false, vanished, decorations));
					});
			} else {
				V.hcItems
					.filter(q => q.location === item.containerID)
					.forEach(bye => {
						containerItemArray.push(hcItemName(bye, false, vanished, decorations));
					});
			}
			if (containerItemArray.length) {
				itemText = formatList(containerItemArray) + "【이가】 담긴 " + hcTranslateName(item.name);
			}
			break;
		case "water":
			itemText = nameSpace;
			break;
		default:
			itemText = nameSpace;
			break;
	}

	if (cap) return itemText.toUpperFirst();
	return itemText;
}
window.hcItemName = hcItemName;

/* Accepts challenge name OR set name as argument. Automatically detects which based on content */
function hcChallengeColor(challenge) {
	const colors = ["red", "orange", "gold", "green", "lblue", "blue", "purple", "meek", "brat", "black"];
	const sets = ["hand", "torch", "faith", "forest", "water", "item", "suspicion", "prisoner", "dogs", "time"];
	const set = sets.includes(challenge) ? challenge : setup.hopelessCycleChallenges.filter(x => x.key === challenge)[0].key.split(/[A-Z]/)[0];
	return colors[sets.indexOf(set)];
}
window.hcChallengeColor = hcChallengeColor;
