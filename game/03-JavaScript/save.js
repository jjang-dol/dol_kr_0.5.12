/* globals traverse, traversePair */

const DoLSave = ((Story, Save) => {
	"use strict";

	const DEFAULT_DETAILS = Object.freeze({
		id: Story.domId,
		autosave: null,
		slots: [null, null, null, null, null, null, null, null],
	});
	const KEY_DETAILS = "dolSaveDetails";

	// Compressed saves are indicated by {jsoncompressed:1} in their metadata
	// The '1' can act as a compression algorithm id.

	// see game/00-framework-tools/03-compression/dictionaries.js
	const COMPRESSOR_DICTIONARIES = DoLCompressorDictionaries;
	// id of the dictionary to use for saving
	const COMPRESSOR_CURRENT_DICTIONARY_ID = "v3";
	/**
	 * When saving, decompress and compare with the original.
	 * If results differ, report an error and save the uncompressed version instead.
	 */
	function shouldVerifyCompression() {
		return true;
	}

	/* Place somewhere to expose globally. */
	function isObject(obj) {
		return typeof obj === "object" && obj != null;
	}

	/* Can also call from backcomp in the future? */
	function getSaveVersion(variables) {
		if (isObject(variables)) {
			if (!variables.saveVersions) {
				return -1;
			}
			return variables.saveVersions.last();
		}
		return -2;
	}

	function marshalVersion(version) {
		return typeof version === "string"
			? version
					.replace(/[^0-9.]+/g, "")
					.split(".")
					.map(v => parseInt(v))
			: [0, 0, 0, 0];
	}

	function parseVersion(version) {
		version = marshalVersion(version);
		return version ? version[0] * 1000000 + version[1] * 10000 + version[2] * 100 + version[3] * 1 : 0;
	}

	/**
	 * The handler which the load button should call.
	 * Contains checks to determine whether the save loads or pops up a confirmation window.
	 *
	 * @param {any} slot The slot ID to get the save from. 0 to 9, or 'auto'.
	 * @param {boolean} confirm Bypass the load confirmation.
	 * @returns {void}
	 */
	function loadHandler(slot, confirm) {
		if (V.ironmanmode === true && V.passage !== "Start") {
			Wikifier.wikifyEval(`<<loadIronmanSafetyCancel ${slot}>>`);
			return;
		}
		if (V.confirmLoad === true && confirm === undefined) {
			Wikifier.wikifyEval(`<<loadConfirm ${slot}>>`);
			return;
		}
		const save = slot === "auto" ? Save.autosave.get() : Save.slots.get(slot);
		// an empty slot gives back null, which is not the same as an empty save. JavaScript treats null as an object.
		// so checking the type alone would let an empty slot through and crash - isObject rules out null
		if (!isObject(save)) {
			Errors.report("해당 슬롯에서 유효한 세이브를 찾을 수 없습니다.", {});
			return;
		}
		const currVersion = parseVersion(StartConfig.version);
		/* Assume the save->variables is valid if an object. */
		const saveVersion = parseVersion(getSaveVersion(save.state.delta[0].variables));
		if (currVersion < saveVersion) {
			Wikifier.wikifyEval(`<<loadconfirmcompat ${slot}>>`);
			return;
		}
		load(slot, save);
	}

	/**
	 * Loads the given saveobj, or the save from the given slot.
	 *
	 * @param {number|string} slot The slot ID to get the save from. 0 to 9, or 'auto'.
	 * @param {object} saveObj The save object if already possessed by the callee.
	 * @param {boolean} overrides
	 * @returns {void}
	 */
	function load(slot, saveObj, overrides) {
		const save = saveObj == null ? (slot === "auto" ? Save.autosave.get() : Save.slots.get(slot)) : saveObj;
		// the details record can be missing (storage cleared) or lack this slot's row, so default to safe empties and don't crash
		const saveDetails = JSON.parse(localStorage.getItem(KEY_DETAILS)) ?? { autosave: null, slots: [] };
		const details = slot === "auto" ? saveDetails.autosave : saveDetails.slots[slot];
		const metadata = details?.metadata ?? {};
		/* Check if metadata for save matches the save's computed md5 hash. If it matches, the ironman save was not tampered with.
			Bypass this check if on a mobile, because they are notoriously difficult to grab saves from in the event of issues. */
		if (metadata.ironman && !Browser.isMobile.any()) {
			IronMan.update(save, metadata);
			// (if ironman mode enabled) following checks md5 signature of the save to see if the variables have been modified
			if (!IronMan.compare(metadata, save)) {
				Wikifier.wikifyEval(`<<loadIronmanCheater ${slot}>>`);
				return;
			}
		}
		const loaded = slot === "auto" ? Save.autosave.load() : Save.slots.load(slot);
		// if the load failed, stop here so ironman mode doesn't delete the player's other saves for nothing
		if (!loaded) return;
		if (V.ironmanmode) {
			// (ironman) remove all saves(except auto-save) with the same saveId than loaded save
			[0, 1, 2, 3, 4, 5, 6, 7].forEach(id => {
				const saveDetail = saveDetails.slots[id];
				if (saveDetail == null) return;
				if (saveDetail.metadata.saveId === metadata.saveId) {
					Save.slots.delete(id);
					deleteSaveDetails(id);
				}
			});
		}
	}

	function save(saveSlot, confirm, saveId, saveName) {
		if (saveId == null) {
			Wikifier.wikifyEval(`<<saveConfirm ${saveSlot}>>`);
		} else if ((V.confirmSave === true && confirm !== true) || (V.saveId !== saveId && saveId != null)) {
			Wikifier.wikifyEval(`<<saveConfirm ${saveSlot}>>`);
		} else {
			if (saveSlot != null) {
				const success = Save.slots.save(saveSlot, null, {
					saveId,
					saveName,
					ironman: V.ironmanmode,
				});
				if (success) {
					const save = Save.slots.get(saveSlot);
					// Copy save metadata (it includes the jsoncompressed indicator)
					const metadata = { ...save.metadata, saveId, saveName };
					if (V.ironmanmode) {
						Object.assign(metadata, {
							ironman: V.ironmanmode,
							signature: V.ironmanmode ? IronMan.getSignature(save) : false,
							schema: IronMan.schema,
						});
					}
					setSaveDetail(saveSlot, metadata);
					delete T.currentOverlay;
					// todo: find a better solution
					closeOverlay();
					if (V.ironmanmode === true) Engine.restart();
				}
			}
		}
	}

	function deleteSave(saveSlot, confirm) {
		if (saveSlot === "all") {
			if (confirm === undefined) {
				Wikifier.wikifyEval("<<clearSaveMenu>>");
				return;
			} else if (confirm === true) {
				Save.clear();
				deleteAllSaveDetails();
			}
		} else if (saveSlot === "auto") {
			if (V.confirmDelete === true && confirm === undefined) {
				Wikifier.wikifyEval(`<<deleteConfirm ${saveSlot}>>`);
				return;
			} else {
				Save.autosave.delete();
				deleteSaveDetails("autosave");
			}
		} else {
			if (V.confirmDelete === true && confirm === undefined) {
				Wikifier.wikifyEval(`<<deleteConfirm ${saveSlot}>>`);
				return;
			} else {
				Save.slots.delete(saveSlot);
				deleteSaveDetails(saveSlot);
			}
		}
		Wikifier.wikifyEval("<<resetSaveMenu>>");
	}

	function importSave(saveFile) {
		if (!window.FileReader) return; // Browser is not compatible

		const reader = new FileReader();

		reader.onloadend = function () {
			DeserializeGame(this.result);
		};

		reader.readAsText(saveFile[0]);
	}

	function prepareSaveDetails(forceRun) {
		const saveDetails = getSaveDetails();
		if (saveDetails == null || saveDetails.id !== Story.domId || forceRun) {
			const scSaveDetails = Save.get();
			// clone so we don't fill in the shared template and leave ghost saves
			const dolSaveDetails = clone(DEFAULT_DETAILS);
			/* Search SugarCube's autosave property, if it exists, reflect this in the save details. */
			if (scSaveDetails.autosave != null) {
				dolSaveDetails.autosave = {
					title: scSaveDetails.autosave.title,
					date: scSaveDetails.autosave.date,
					metadata: scSaveDetails.autosave.metadata,
				};
				if (dolSaveDetails.autosave.metadata === undefined) {
					dolSaveDetails.autosave.metadata = { saveName: "" };
				}
				if (dolSaveDetails.autosave.metadata.saveName === undefined) {
					dolSaveDetails.autosave.metadata.saveName = "";
				}
			}
			/* Check whether SugarCube's save slots exist and populate save details with them. */
			for (let i = 0; i < scSaveDetails.slots.length; i++) {
				if (scSaveDetails.slots[i] !== null) {
					dolSaveDetails.slots[i] = {
						title: scSaveDetails.slots[i].title,
						date: scSaveDetails.slots[i].date,
						metadata: scSaveDetails.slots[i].metadata,
					};
					if (dolSaveDetails.slots[i].metadata === undefined) {
						dolSaveDetails.slots[i].metadata = { saveName: "old save", saveId: 0 };
					}
					if (dolSaveDetails.slots[i].metadata.saveName === undefined) {
						dolSaveDetails.slots[i].metadata.saveName = "old save";
					}
				} else {
					dolSaveDetails.slots[i] = null;
				}
			}

			localStorage.setItem(KEY_DETAILS, JSON.stringify(dolSaveDetails));
			return true;
		}
		return false;
	}

	function setSaveDetail(saveSlot, metadata, story) {
		const saveDetails = JSON.parse(localStorage.getItem(KEY_DETAILS));
		if (saveSlot === "autosave") {
			saveDetails.autosave = {
				id: Story.domId,
				title: Story.get(V.passage).description(),
				date: Date.now(),
				metadata,
			};
		} else {
			const slot = parseInt(saveSlot);
			saveDetails.slots[slot] = {
				id: Story.domId,
				title: Story.get(V.passage).description(),
				date: Date.now(),
				metadata,
			};
		}
		localStorage.setItem(KEY_DETAILS, JSON.stringify(saveDetails));
	}

	function getSaveDetails(saveSlot) {
		if (Object.hasOwn(localStorage, KEY_DETAILS)) {
			const saveDetails = JSON.parse(localStorage.getItem(KEY_DETAILS));
			if (typeof saveSlot === "number") {
				if (saveDetails != null) {
					return saveDetails.slots[saveSlot];
				}
			} else {
				return saveDetails;
			}
		}
		return null;
	}

	function deleteSaveDetails(saveSlot) {
		const saveDetails = JSON.parse(localStorage.getItem(KEY_DETAILS));
		if (saveSlot === "autosave") {
			saveDetails.autosave = null;
		} else {
			const slot = parseInt(saveSlot);
			saveDetails.slots[slot] = null;
		}
		localStorage.setItem(KEY_DETAILS, JSON.stringify(saveDetails));
	}

	function deleteAllSaveDetails() {
		localStorage.setItem(KEY_DETAILS, JSON.stringify(DEFAULT_DETAILS));
	}

	function returnSaveData() {
		return Save.get();
	}

	function resetSaveMenu() {
		Wikifier.wikifyEval("<<resetSaveMenu>>");
	}

	function ironmanAutoSave() {
		const saveSlot = 8;
		const success = Save.slots.save(saveSlot, null, {
			saveId: V.saveId,
			saveName: V.saveName,
			ironman: V.ironmanmode,
		});
		if (success) {
			const save = Save.slots.get(saveSlot);
			const metadata = { saveId: V.saveId, saveName: V.saveName };
			if (V.ironmanmode) {
				Object.assign(metadata, {
					ironman: V.ironmanmode,
					signature: V.ironmanmode ? IronMan.getSignature(save) : false,
					schema: IronMan.schema,
				});
			}
			setSaveDetail(saveSlot, metadata);
		}
	}

	Macro.add("incrementautosave", {
		handler() {
			if (!V.ironmanmode) V.saveDetails.auto.count++;
		},
	});

	/**
	 * Compress a game state (not delta-encoded: {title, variables, prng, pull}) using most recent dictionary.
	 * Can throw an error.
	 *
	 * @param {object} state
	 */
	function compressState(state) {
		const dictionary = COMPRESSOR_DICTIONARIES[COMPRESSOR_CURRENT_DICTIONARY_ID];
		const compressor = new JsonCompressor(dictionary);
		const zstate = compressor.compress(state);
		zstate.dictionary = COMPRESSOR_CURRENT_DICTIONARY_ID;
		zstate.title =
				"이 세이브는 압축되어 있어 이전 버전의 Degrees of Lewdity와 호환되지 않습니다. 더 오래된 게임 빌드에서 이 세이브를 불러오려면 내보내기 기능을 사용하세요.";
		zstate.variables = {};
		if (shouldVerifyCompression()) {
			// Sanity check
			const uzstate = decompressState(zstate);
			if (JSON.stringify(state) !== JSON.stringify(uzstate)) {
					throw new Error("압축 해제 확인에 실패했습니다");
			}
		}
		return zstate;
	}

	/**
	 * Decompress the saved state using the dictionary it was compressed with.
	 * Can throw an error.
	 *
	 * @param {object} zstate
	 */
	function decompressState(zstate) {
		if (!("dictionary" in zstate)) throw new Error("불러올 수 없습니다 - 압축된 세이브에 사전 정보가 없습니다");
		const dicid = zstate.dictionary;
		if (!(dicid in COMPRESSOR_DICTIONARIES))
			throw new Error(
					"세이브 압축을 해제할 수 없습니다 - 사전 " +
					JSON.stringify(dicid) +
						"이 현재 게임 버전에서 알 수 없습니다. (구버전 게임에서 신버전 세이브를 불러오려는 건가요?)"
			);
		const dictionary = COMPRESSOR_DICTIONARIES[dicid];
		const decompressor = new JsonDecompressor(dictionary);
		return decompressor.decompress(zstate);
	}
	function enableCompression() {
		V.compressSave = true;
	}
	function disableCompression() {
		V.compressSave = false;
	}
	function isCompressionEnabled() {
		// for now, save compressor and delta-encoder work against each other, leading to bigger saves when both are active
		// todo: make them friends?
		return V.compressSave && State.history.length === 1;
	}

	/**
	 * Compress a SaveObject (the one with metadata and delta-encoded history), if the compression is enabled.
	 * If compression fails, report and error and do nothing.
	 * This function returns nothing, it modifies the saveObj parameter.
	 *
	 * @param {object} saveObj
	 */
	function compressIfNeeded(saveObj) {
		if (!saveObj.metadata) saveObj.metadata = {};
		saveObj.metadata.jsoncompressed = 0;
		if (!isCompressionEnabled()) return;
		try {
			saveObj.state.history = saveObj.state.history.map(state => compressState(state));
			saveObj.metadata.jsoncompressed = 1;
		} catch (e) {
			DOL.Errors.report("압축할 수 없습니다 - " + e);
			console.error(e);
			// Just return, the saveObj won't be modified
		}
	}
	function looksLikeCompressedSave(state) {
		return state.compressed === 1 && Array.isArray(state.values) && typeof state.values === "object" && typeof state.dictionary === "string";
	}
	/**
	 * Decompress a SaveObject (the one with metadata and delta-encoded history), if it is compressed.
	 *
	 * @param {object} saveObj
	 */
	function decompressIfNeeded(saveObj) {
		const isCompressed = (saveObj.metadata && saveObj.metadata.jsoncompressed === 1) || looksLikeCompressedSave(saveObj.state.history[0]);
		if (!isCompressed) return;
		let dictOverride = saveObj.state.history[0].dictionary;
		saveObj.state.history = saveObj.state.history.map(state => {
			state.dictionary = dictOverride;
			if (JsonDecompressor.isCompressed(state)) {
				// decompressing with the wrong dictionary can throw or produce nonsense, treat both as a failed attempt
				const tryDecompress = () => {
					try {
						const result = decompressState(state);
						return result.variables && result.variables.saveVersions ? result : null;
					} catch {
						return null;
					}
				};
				let decompressed = tryDecompress();
				// if that failed, the dictionary might be mislabeled, so try the others until one works
				const otherDicts = Object.keys(COMPRESSOR_DICTIONARIES).filter(d => d !== dictOverride);
				for (let k = 0; k < otherDicts.length && !decompressed; k++) {
					state.dictionary = otherDicts[k];
					decompressed = tryDecompress();
					if (decompressed) dictOverride = otherDicts[k];
				}
				if (!decompressed)
					throw new Error("게임의 어떤 사전으로도 저장 파일을 압축 해제할 수 없습니다 (저장 파일 이름은 " + JSON.stringify(dictOverride) + ") 입니다.)");
				return decompressed;
			} else return state;
		});
	}

	return Object.freeze({
		save,
		load,
		delete: deleteSave,
		import: importSave,
		getSaves: returnSaveData,
		resetMenu: resetSaveMenu,
		getVersion: getSaveVersion,
		loadHandler,
		enableCompression,
		disableCompression,
		isCompressionEnabled,
		compressState,
		decompressState,
		compressIfNeeded,
		decompressIfNeeded,
		SaveDetails: Object.freeze({
			prepare: prepareSaveDetails,
			set: setSaveDetail,
			get: getSaveDetails,
			delete: deleteSaveDetails,
			deleteAll: deleteAllSaveDetails,
		}),
		IronMan: Object.freeze({
			autoSave: ironmanAutoSave,
		}),
		Utils: Object.freeze({
			parseVer: parseVersion,
		}),
	});
})(Story, Save);
window.DoLSave = DoLSave;

/* Legacy references, references to the global namespace should be avoided, and thus this is considered deprecated usage. */
window.prepareSaveDetails = DoLSave.SaveDetails.prepare;
window.setSaveDetail = DoLSave.SaveDetails.set;
window.getSaveDetails = DoLSave.SaveDetails.get;
window.deleteSaveDetails = DoLSave.SaveDetails.delete;
window.deleteAllSaveDetails = DoLSave.SaveDetails.deleteAll;
window.returnSaveDetails = DoLSave.getSaves;
window.resetSaveMenu = DoLSave.resetMenu;
window.ironmanAutoSave = DoLSave.IronMan.autoSave;
window.loadSave = DoLSave.load;
window.save = DoLSave.save;
window.deleteSave = DoLSave.delete;
window.importSave = DoLSave.import;
window.SerializeGame = Save.serialize;
window.DeserializeGame = Save.deserialize;

window.getSaveData = function () {
	const compressionWasEnabled = DoLSave.isCompressionEnabled();
	DoLSave.disableCompression();
	const input = document.getElementById("saveDataInput");
	input.value = Save.serialize();
	if (compressionWasEnabled) DoLSave.enableCompression();
};

window.loadSaveData = function () {
	const input = document.getElementById("saveDataInput");
	const result = Save.deserialize(input.value);
	if (result === null) {
		input.value = "유효하지 않은 세이브입니다.";
	}
};

window.clearTextBox = function (id) {
	document.getElementById(id).value = "";
};

window.topTextArea = function (id) {
	const textArea = document.getElementById(id);
	textArea.scroll(0, 0);
};

window.bottomTextArea = function (id) {
	const textArea = document.getElementById(id);
	textArea.scroll(0, textArea.scrollHeight);
};

window.copySavedata = function (id) {
	const saveData = document.getElementById(id);
	saveData.focus();
	saveData.select();

	try {
		document.execCommand("copy");
	} catch (err) {
		const copyTextArea = document.getElementById("CopyTextArea");
		copyTextArea.value = "복사 오류";
		console.log("복사할 수 없습니다: ", err);
	}
};

window.importSettings = function (data, type) {
	let reader;
	switch (type) {
		case "text":
			V.importString = compatibilityConversion(document.getElementById("settingsDataInput")?.value);
			Wikifier.wikifyEval('<<displaySettings "importConfirmDetails">>');
			break;
		case "file":
			reader = new FileReader();
			reader.addEventListener("load", function (e) {
				// eslint-disable-next-line no-undef
				V.importString = compatibilityConversion(e.target?.result);
				Wikifier.wikifyEval('<<displaySettings "importConfirmDetails">>');
			});
			reader.readAsBinaryString(data[0]);
			break;
		case "function":
			importSettingsData(data);
			break;
	}
};

function compatibilityConversion(rawData) {
	let processed;

	try {
		processed = JSON.parse(rawData);
	} catch {
		return rawData;
	}
	if (!processed || typeof processed !== "object") return rawData;

	const map = {
		alluremod: { key: "allureModifier", invert: false },
		analdisable: { key: "analEnabled", invert: true },
		analdoubledisable: { key: "analDoubleEnabled", invert: true },
		analingusdisablegiving: { key: "analingusGivingEnabled", invert: true },
		analingusdisablereceiving: { key: "analingusReceivingEnabled", invert: true },
		asphyxiaLvl: { key: "asphyxiaLevel", invert: false },
		baseNpcPregnancyChance: { key: "baseNpcPregnancyChance", invert: false },
		basePlayerPregnancyChance: { key: "basePlayerPregnancyChance", invert: false },
		beastmalechance: { key: "beastMaleChance", invert: false },
		beastMaleChanceFemale: { key: "beastMaleChanceFemale", invert: false },
		beastMaleChanceMale: { key: "beastMaleChanceMale", invert: false },
		beastMaleChanceSplit: { key: "beastMaleChanceSplit", invert: false },
		beedisable: { key: "beesEnabled", invert: true },
		bestialitydisable: { key: "bestialityEnabled", invert: true },
		blackchance: { key: "darkSkinChance", invert: false },
		bodywritingLvl: { key: "bodyWritingLevel", invert: false },
		breast_mod: { key: "breastModifier", invert: false },
		breastfeedingdisable: { key: "breastFeedingEnabled", invert: true },
		cbchance: { key: "maleNPCVaginaChance", invert: false },
		cheatdisabletoggle: { key: "cheatsEnabledToggle", invert: true },
		checkstyle: { key: "skillCheckStyle", invert: false },
		clothesPrice: { key: "clothingCostModifier", invert: false },
		clothesPriceLewd: { key: "lewdClothingCostModifier", invert: false },
		clothesPriceSchool: { key: "schoolClothingCostModifier", invert: false },
		clothesPriceUnderwear: { key: "underwearCostModifier", invert: false },
		condomChance: { key: "condomChance", invert: false },
		condomLvl: { key: "condomLevel", invert: false },
		condomUseChanceCon: { key: "condomUseChanceConsensual", invert: false },
		condomUseChanceRape: { key: "condomUseChanceRape", invert: false },
		cycledisable: { key: "fertilityCycleEnabled", invert: true },
		dgchance: { key: "femaleNPCPenisChance", invert: false },
		facesitdisable: { key: "facesitEnabled", invert: true },
		footdisable: { key: "footFetishEnabled", invert: true },
		forcedcrossdressingdisable: { key: "forcedCrossdressingEnabled", invert: true },
		furniturePriceFactor: { key: "furnitureCostModifier", invert: false },
		horsedisable: { key: "horsesEnabled", invert: true },
		humanPregnancyMonths: { key: "humanPregnancyMonths", invert: false },
		hypnosisdisable: { key: "hypnosisEnabled", invert: true },
		incompletePregnancyDisable: { key: "incompletePregnancyEnabled", invert: true },
		lurkerdisable: { key: "lurkersEnabled", invert: true },
		malechance: { key: "maleChance", invert: false },
		maleChanceFemale: { key: "maleChanceFemale", invert: false },
		maleChanceMale: { key: "maleChanceMale", invert: false },
		maleChanceSplit: { key: "maleChanceSplit", invert: false },
		malevictimchance: { key: "maleVictimChance", invert: false },
		monsterchance: { key: "monsterChance", invert: false },
		monsterhallucinations: { key: "monsterHallucinationsOnly", invert: false },
		multipleWardrobes: { key: "multipleWardrobes", invert: false },
		npcPregnancyDisable: { key: "npcPregnancyEnabled", invert: true },
		npcVirginityChance: { key: "npcVirginChanceStudent", invert: false },
		npcVirginityChanceAdult: { key: "npcVirginChanceAdult", invert: false },
		NudeGenderDC: { key: "nudeGenderPerception", invert: false },
		parasitedisable: { key: "parasitesEnabled", invert: true },
		parasitepregdisable: { key: "parasitePregnancyEnabled", invert: true },
		pbdisable: { key: "pubicHairEnabled", invert: true },
		penis_mod: { key: "penisModifier", invert: false },
		plantdisable: { key: "plantsEnabled", invert: true },
		playerPregnancyBeastDisable: { key: "playerPregnancyBeastEnabled", invert: true },
		playerPregnancyEggLayingDisable: { key: "playerPregnancyEggLayingEnabled", invert: true },
		playerPregnancyHumanDisable: { key: "playerPregnancyHumanEnabled", invert: true },
		pregnancyspeechdisable: { key: "pregnancySpeechEnabled", invert: true },
		pregnancytype: { key: "pregnancyType", invert: false },
		rentmod: { key: "rentCostModifier", invert: false },
		ruinedorgasmdisable: { key: "ruinedOrgasmEnabled", invert: true },
		slimedisable: { key: "slimesEnabled", invert: true },
		slugdisable: { key: "slugsEnabled", invert: true },
		spiderdisable: { key: "spidersEnabled", invert: true },
		statdisable: { key: "blindStatsEnabled", invert: false },
		straponchance: { key: "straponChance", invert: false },
		swarmdisable: { key: "swarmsEnabled", invert: true },
		tending_yield_factor: { key: "tendingYieldModifier", invert: false },
		tentacledisable: { key: "tentaclesEnabled", invert: true },
		toydildodisable: { key: "toyDildoEnabled", invert: true },
		toymultiplepenetration: { key: "toyMultiplePenetrationEnabled", invert: true },
		toywhipdisable: { key: "toyWhipEnabled", invert: true },
		transformdisable: { key: "transformAnimalEnabled", invert: true },
		transformdisabledivine: { key: "transformDivineEnabled", invert: true },
		vaginaldoubledisable: { key: "vaginalDoubleEnabled", invert: true },
		voredisable: { key: "voreEnabled", invert: true },
		waspdisable: { key: "waspsEnabled", invert: true },
		watersportsdisable: { key: "watersportsEnabled", invert: true },
		wolfPregnancyWeeks: { key: "wolfPregnancyWeeks", invert: false },
	};

	processed.general.settings ??= {};

	for (const legacyKey in map) {
		if (!(legacyKey in processed.general)) continue;
		const { key, invert } = map[legacyKey];
		const legacyValue = processed.general[legacyKey];

		if (typeof legacyValue === "boolean" && invert) {
			processed.general.settings[key] ??= !legacyValue;
		} else {
			processed.general.settings[key] ??= legacyValue;
		}
		delete processed.general[legacyKey];
	}

	if (!processed.pregnancyChancePercent) {
		const settings = processed.general.settings;
		if (settings.basePlayerPregnancyChance !== undefined) {
			settings.basePlayerPregnancyChance = legacyPregnancyChanceToPercent(settings.basePlayerPregnancyChance, 100);
		}
		if (settings.baseNpcPregnancyChance !== undefined) {
			settings.baseNpcPregnancyChance = legacyPregnancyChanceToPercent(settings.baseNpcPregnancyChance, 20);
		}
	}

	// A settings file exported before NNPC and generic pregnancy became separate toggles carries only
	// the one flag. It governed both kinds of NPC, so both inherit it.
	const incoming = processed.general.settings;
	if (incoming.npcPregnancyEnabled !== undefined && incoming.nnpcPregnancyEnabled === undefined) {
		incoming.nnpcPregnancyEnabled = incoming.npcPregnancyEnabled;
	}

	return JSON.stringify(processed);
}

/**
 * Using the incoming configuration object, replace all active variables (V | $ | State.variables)
 *
 * @param {string} data
 */
function importSettingsData(data) {
	if (data == null) {
		return;
	}
	let overrides;
	// console.log("json",JSON.parse(result));
	if (V.importString) {
		overrides = JSON.parse(V.importString);
		delete V.importString;
	} else {
		overrides = JSON.parse(data);
	}
	if (V.passage === "Start" && overrides.starting != null) {
		overrides.starting = settingsConvert(false, "starting", overrides.starting);
	}
	if (overrides.general != null) {
		overrides.general = settingsConvert(false, "general", overrides.general);
	}

	/**
	 * @param {object} source
	 * @param {object} target
	 * @param {string} key
	 * @returns {any?}
	 */
	const validateAndSet = (source, target, key) => {
		if (!validateValue(source[key], target[key])) {
			console.debug(`검증 실패 - 키 ${key} 소스`, source, "대상", target);
			return null;
		}
		return target[key];
	};

	/**
	 * @param {object} source
	 * @param {object} target
	 * @param {string} key
	 * @returns {any?}
	 */
	const setValue = (source, target, key) => {
		target[key] = source[key];
		return target[key];
	};

	if (V.passage === "Start" && overrides.starting != null) {
		const startingConfig = settingsObjects("starting");

		traversePair(startingConfig, overrides.starting, "root", settingContainers, validateAndSet);
		traversePair(overrides.starting, V, "root", settingContainers, setValue);
	}

	if (overrides.general != null) {
		const listObject = settingsObjects("general");
		const listKey = Object.keys(listObject);
		const namedObjects = ["map", "shopDefaults", "settings", "options", "wardrobeDefaults"];
		// correct swapped min/max values
		if (overrides.general.breastsizemin > overrides.general.breastsizemax) {
			const temp = overrides.general.breastsizemin;
			overrides.general.breastsizemin = overrides.general.breastsizemax;
			overrides.general.breastsizemax = temp;
		}
		if (overrides.general.penissizemin > overrides.general.penissizemax) {
			const temp = overrides.general.penissizemin;
			overrides.general.penissizemin = overrides.general.penissizemax;
			overrides.general.penissizemax = temp;
		}
		for (let i = 0; i < listKey.length; i++) {
			if (namedObjects.includes(listKey[i]) && overrides.general[listKey[i]] != null) {
				const itemKey = Object.keys(listObject[listKey[i]]);
				for (let j = 0; j < itemKey.length; j++) {
					if (V[listKey[i]][itemKey[j]] != null && overrides.general[listKey[i]][itemKey[j]] != null) {
						if (validateValue(listObject[listKey[i]][itemKey[j]], overrides.general[listKey[i]][itemKey[j]])) {
							V[listKey[i]][itemKey[j]] = overrides.general[listKey[i]][itemKey[j]];
						}
					}
				}
			} else if (!namedObjects.includes(listKey[i])) {
				if (V[listKey[i]] != null && overrides.general[listKey[i]] != null) {
					if (validateValue(listObject[listKey[i]], overrides.general[listKey[i]])) {
						V[listKey[i]] = overrides.general[listKey[i]];
					}
				}
			}
		}
	}

	if (overrides.npc != null) {
		const listObject = settingsObjects("npc");
		// eslint-disable-next-line no-var
		const listKey = Object.keys(listObject);
		// eslint-disable-next-line no-var
		for (let i = 0; i < V.NPCNameList.length; i++) {
			if (overrides.npc[V.NPCNameList[i]] != null) {
				const carriedGender = getActivePregnancies(V.NPCName[i].nam).length ? V.NPCName[i].gender : undefined;
				// eslint-disable-next-line no-var
				for (let j = 0; j < listKey.length; j++) {
					// Overwrite to allow for "none" default value in the start passage to allow for rng to decide
					if (
						V.passage === "Start" &&
						["pronoun", "gender", "skincolour"].includes(listKey[j]) &&
						overrides.npc[V.NPCNameList[i]][listKey[j]] === "none"
					) {
						V.NPCName[i][listKey[j]] = overrides.npc[V.NPCNameList[i]][listKey[j]];
					} else if (validateValue(listObject[listKey[j]], overrides.npc[V.NPCNameList[i]][listKey[j]])) {
						V.NPCName[i][listKey[j]] = overrides.npc[V.NPCNameList[i]][listKey[j]];
					}
				}
				if (carriedGender !== undefined) V.NPCName[i].gender = carriedGender;
			}
		}
	}
}
window.importSettingsData = importSettingsData;

/**
 * @param {object} configuration
 * @param {object} value
 * @returns {boolean}
 */
function validateValue(configuration, value) {
	// console.log("validateValue", keys, value);
	const keyArray = Object.keys(configuration);
	let valid = false;
	if (keyArray.length === 0) {
		valid = true;
	}
	if (keyArray.includes("min")) {
		if (configuration.min <= value && configuration.max >= value) {
			valid = true;
		}
	}
	if (keyArray.includes("decimals") && value != null) {
		// eslint-disable-next-line eqeqeq
		if (value.toFixed(configuration.decimals) != value) {
			valid = false;
		}
	}
	if (keyArray.includes("bool")) {
		if (value === true || value === false) {
			valid = true;
		}
	}
	if (keyArray.includes("boolLetter")) {
		if (value === "t" || value === "f") {
			valid = true;
		}
	}
	if (keyArray.includes("strings") && value != null) {
		if (configuration.strings.includes(value)) {
			valid = true;
		}
	}
	return valid;
}
window.validateValue = validateValue;

function exportSettings(data, type) {
	const output = {
		general: {
			map: {},
			shopDefaults: {},
			options: {},
			settings: {},
			wardrobeDefaults: {},
		},
		npc: {},
	};
	let listObject;
	let listKey;
	if (V.passage === "Start") {
		const startingConfig = settingsObjects("starting");
		const startingOutput = traversePair(startingConfig, V, "root", settingContainers, (source, target, key) => {
			console.debug(source, target, key);
			if (!validateValue(source[key], target[key])) {
				console.debug(`대상 ${key}에 유효한 값이 없습니다:`, target[key], "설정:", source[key]);
				return null;
			}
			return target[key];
		});

		output.starting = startingOutput;
	}

	listObject = settingsObjects("general");
	listKey = Object.keys(listObject);
	const namedObjects = ["map", "shopDefaults", "settings", "options", "wardrobeDefaults"];

	for (let i = 0; i < listKey.length; i++) {
		if (namedObjects.includes(listKey[i]) && V[listKey[i]] != null) {
			const itemKey = Object.keys(listObject[listKey[i]]);
			for (let j = 0; j < itemKey.length; j++) {
				if (V[listKey[i]][itemKey[j]] != null) {
					if (validateValue(listObject[listKey[i]][itemKey[j]], V[listKey[i]][itemKey[j]])) {
						output.general[listKey[i]][itemKey[j]] = V[listKey[i]][itemKey[j]];
					}
				}
			}
		} else if (!namedObjects.includes(listKey[i])) {
			if (V[listKey[i]] != null) {
				if (validateValue(listObject[listKey[i]], V[listKey[i]])) {
					output.general[listKey[i]] = V[listKey[i]];
				}
			}
		}
	}
	listObject = settingsObjects("npc");
	listKey = Object.keys(listObject);
	for (let i = 0; i < V.NPCNameList.length; i++) {
		output.npc[V.NPCNameList[i]] = {};
		for (let j = 0; j < listKey.length; j++) {
			// Overwrite to allow for "none" default value in the start passage to allow for rng to decide
			if (V.passage === "Start" && ["pronoun", "gender", "skincolour"].includes(listKey[j]) && V.NPCName[i][listKey[j]] === "none") {
				output.npc[V.NPCNameList[i]][listKey[j]] = V.NPCName[i][listKey[j]];
			} else if (validateValue(listObject[listKey[j]], V.NPCName[i][listKey[j]])) {
				output.npc[V.NPCNameList[i]][listKey[j]] = V.NPCName[i][listKey[j]];
			}
		}
	}

	if (V.passage === "Start") {
		output.starting = settingsConvert(true, "starting", output.starting);
	}
	output.general = settingsConvert(true, "general", output.general);
	output.pregnancyChancePercent = true;

	// console.log(S);
	const result = JSON.stringify(output);
	if (type === "text") {
		const textArea = document.getElementById("settingsDataInput");
		textArea.value = result;
	} else if (type === "file") {
		const blob = new Blob([result], { type: "text/plain;charset=utf-8" });
		saveAs(blob, "DolSettingsExport.txt");
	}
}
window.exportSettings = exportSettings;

const settingContainers = ["player", "skin", "settings"];

function settingsObjects(type) {
	let result;
	/* boolLetter type also requires the bool type aswell */
	switch (type) {
		case "starting":
			result = {
				bodysize: {
					min: 0,
					max: 3,
					decimals: 0,
					displayName: "몸집:",
					textMap: { 0: "아주 작음", 1: "작음", 2: "보통", 3: "큼" },
					randomize: "characterAppearance",
				},
				facevariant: {
					strings: ["default", "catty", "aloof", "sweet", "foxy", "gloomy"],
					displayName: "인상:",
					textMap: { default: "상냥한", catty: "새침한", aloof: "냉담한", sweet: "다정한", foxy: "여우같은", gloomy: "우울한" },
					randomize: "characterAppearance",
				},
				breastsensitivity: {
					min: 1,
					max: 3,
					displayName: "가슴 민감도:",
					decimals: 0,
					textMap: { 1: "보통", 2: "반응함", 3: "예민함" },
					randomize: "characterTrait",
				},
				genitalsensitivity: {
					min: 1,
					max: 3,
					displayName: "성기 민감도:",
					decimals: 0,
					textMap: { 1: "보통", 2: "반응함", 3: "예민함" },
					randomize: "characterTrait",
				},
				mouthsensitivity: {
					min: 1,
					max: 3,
					decimals: 0,
					displayName: "입 민감도:",
					textMap: { 1: "보통", 2: "반응함", 3: "예민함" },
					randomize: "characterTrait",
				},
				bottomsensitivity: {
					min: 1,
					max: 3,
					decimals: 0,
					displayName: "엉덩이 민감도:",
					textMap: { 1: "보통", 2: "반응함", 3: "예민함" },
					randomize: "characterTrait",
				},
				drunkSensitivity: {
					min: 0.5,
					max: 1.5,
					decimals: 1,
					displayName: "주량:",
					textMap: { 0.5: "알쓰", 1: "보통", 1.5: "술고래" },
					randomize: "characterTrait",
				},
				eyeselect: {
					strings: [
						"purple",
						"dark blue",
						"light blue",
						"amber",
						"hazel",
						"brown",
						"green",
						"lime green",
						"red",
						"pink",
						"black",
						"grey",
						"light grey",
						"random",
					],
					randomize: "characterAppearance",
					displayName: "눈 색:",
				},
				hairselect: {
					strings: [
						"red",
						"jetblack",
						"black",
						"darkbrown",
						"brown",
						"copperbrown",
						"softbrown",
						"lightbrown",
						"burntorange",
						"blond",
						"softblond",
						"platinumblond",
						"ashyblond",
						"strawberryblond",
						"ginger",
						"white",
						"snowwhite",
						"random",
					],
					displayName: "머리색:",
					randomize: "characterAppearance",
				},
				hairlength: { min: 0, max: 400, decimals: 0, displayName: "머리 길이:", randomize: "characterAppearance" },
				awareselect: {
					strings: ["innocent", "knowledgeable"],
					displayName: "성지식:",
					randomize: "characterTrait",
				},
				background: {
					strings: [
						"waif",
						"nerd",
						"athlete",
						"delinquent",
						"promiscuous",
						"exhibitionist",
						"deviant",
						"beautiful",
						"crossdresser",
						"lustful",
						"plantlover",
					],
					displayName: "배경:",
					randomize: "characterTrait",
				},
				startingseason: {
					strings: ["spring", "summer", "autumn", "winter", "random"],
					displayName: "시작 계절:",
				},
				gamemode: { strings: ["normal", "soft", "hard"], displayName: "게임 난이도:" },
				ironmanmode: { bool: false, displayName: "아이언맨 모드:" },
				player: {
					gender: {
						strings: ["m", "f", "n"],
						displayName: "성별:",
						textMap: { m: "남성", f: "여성", n: "둘 다 아님" },
						randomize: "characterAppearance",
					},
					sex: {
						strings: ["m", "f", "h"],
						displayName: "성기:",
						textMap: { m: "자지", f: "보지", h: "후타나리" },
						randomize: "characterAppearance",
					},
					gender_body: {
						strings: ["m", "f", "a"],
						displayName: "신체 유형:",
						textMap: { m: "남성적", f: "여성적", a: "중성적" },
					},
					bodyshape: {
						strings: ["classic", "slender", "curvy", "soft"],
						textMap: { classic: "기본형", slender: "가냘픔", curvy: "곡선적", soft: "부드러움" },
						displayName: "체형:",
						randomize: "characterAppearance",
					},
					skin: {
						color: {
							strings: [
								"light",
								"medium",
								"dark",
								"gyaru",
								"rlight",
								"rmedium",
								"rdark",
								"rgyaru",
								"ylight",
								"ymedium",
								"ydark",
								"ygyaru",
								"glight",
								"gmedium",
								"gdark",
								"ggyaru",
								"blight",
								"bmedium",
								"bdark",
								"bgyaru",
							],
							randomize: "characterAppearance",
							displayName: "자연 피부색:",
						},
					},
					ballsExist: { bool: true, displayName: "고환:", textMap: { true: "있음", false: "없음" }, randomize: "characterAppearance" },
					freckles: {
						bool: true,
						displayName: "주근깨:",
						textMap: { true: "있음", false: "없음" },
						strings: ["random"],
						randomize: "characterAppearance",
					},
					breastsize: {
						min: 0,
						max: 4,
						decimals: 0,
						displayName: "가슴 크기:",
						textMap: { 0: "납작한", 1: "아주 작은", 2: "작은", 3: "봉긋한", 4: "볼륨있는" },
						randomize: "characterAppearance",
					},
					penissize: {
						min: 0,
						max: 2,
						decimals: 0,
						displayName: "자지 크기:",
						textMap: { 0: "매우 작은", 1: "아주 작은", 2: "작은" },
						randomize: "characterAppearance",
					},
					bottomsize: {
						min: 0,
						max: 3,
						decimals: 0,
						displayName: "엉덩이 크기:",
						textMap: { 0: "납작한", 1: "아담한", 2: "둥근", 3: "부드러운" },
						randomize: "characterAppearance",
					},
				},
			};
			break;
		case "general":
			result = {
				settings: {
					analEnabled: { bool: true, displayName: "애널:" },
					analingusGivingEnabled: { bool: true, displayName: "애널링구스(시행):" },
					analingusReceivingEnabled: { bool: true, displayName: "애널링구스(받음):" },
					transformAnimalEnabled: { bool: true, displayName: "동물 변신:" },
					asphyxiaLevel: {
						min: 0,
						max: 4,
						decimals: 0,
						displayName: "질식:",
						textMap: {
							0: "NPC가 당신의 목을 건드리지 않습니다",
							1: "NPC가 호흡을 방해하지 않는 선에서 당신의 목을 잡을 수 있습니다",
							2: "합의된 조우 중 NPC가 당신의 목을 조르려 할 수 있습니다",
							3: "비동의 조우 중 NPC가 당신의 목을 조르려 할 수 있습니다",
						},
					},
					penisModifier: { min: -8, max: 8, decimals: 0, displayName: "NPC 자지 평균 크기:", randomize: "encounter" },
					breastModifier: { min: -12, max: 12, decimals: 0, displayName: "여성 가슴 평균 크기:", randomize: "encounter" },
					rentCostModifier: { min: 0.1, max: 3, decimals: 1, displayName: "베일리의 임대료:", randomize: "gameplay" },
					baseNpcPregnancyChance: { min: 0, max: 100, decimals: 0, displayName: "NPC 기본 임신 확률:", randomize: "gameplay" },
					basePlayerPregnancyChance: { min: 0, max: 100, decimals: 0, displayName: "플레이어 기본 임신 확률:", randomize: "gameplay" },
					beastMaleChanceSplit: { bool: true, displayName: "짐승의 성별 외형별 끌림 분리:" },
					beastMaleChanceMale: { min: 0, max: 100, decimals: 0, displayName: "남성에게 끌리는 짐승:", randomize: "encounter" },
					beastMaleChanceFemale: { min: 0, max: 100, decimals: 0, displayName: "여성에게 끌리는 짐승:", randomize: "encounter" },
					beesEnabled: { bool: true, displayName: "벌:" },
					bestialityEnabled: { bool: true, displayName: "수간:" },
					blindStatsEnabled: { bool: true, displayName: "블라인드 스탯 모드:" },
					bodyWritingLevel: {
						min: 0,
						max: 3,
						decimals: 0,
						displayName: "몸 낙서:",
						textMap: {
							0: "NPC가 당신 몸에 낙서하지 않습니다",
							1: "NPC가 당신 몸에 낙서해도 되는지 물을 수 있습니다",
							2: "NPC가 억지로 당신 몸에 낙서할 수 있습니다",
							3: "NPC가 억지로 당신 몸에 낙서하고 문신을 새길 수 있습니다",
						},
					},
					breastFeedingEnabled: { bool: true, displayName: "모유수유:" },
					cheatsEnabledToggle: { bool: true, displayName: "치트 모드:" },
					condomLevel: {
						min: 0,
						max: 3,
						decimals: 0,
						displayName: "콘돔:",
						textMap: {
							0: "모두가 라텍스와 안전한 성관계에 알레르기가 있습니다",
							1: "당신만 콘돔을 사용할 수 있지만, NPC에게 콘돔을 줄 수 있습니다",
							2: "NPC는 플레이어와 임신이 가능한 경우에만 콘돔을 소지합니다",
							3: "NPC는 원할 때 언제든 콘돔을 소지하고 사용할 수 있습니다",
						},
						randomize: "gameplay",
					},
					clothingCostModifier: { min: 1, max: 10, decimals: 1, displayName: "의류 가격:", randomize: "gameplay" },
					furnitureCostModifier: { min: 0.6, max: 5, decimals: 1, displayName: "가구 가격:", randomize: "gameplay" },
					lewdClothingCostModifier: { min: 0.1, max: 2, decimals: 1, displayName: "선정적인 의류 가격:", randomize: "gameplay" },
					schoolClothingCostModifier: { min: 1, max: 2, decimals: 1, displayName: "교복 가격:", randomize: "gameplay" },
					underwearCostModifier: { min: 1, max: 2, decimals: 1, displayName: "속옷 가격:", randomize: "gameplay" },
					tendingYieldModifier: { min: 1, max: 10, decimals: 1, displayName: "작물 수확량:", randomize: "gameplay" },
					toyDildoEnabled: { bool: true, displayName: "딜도:" },
					transformDivineEnabled: { bool: true, displayName: "신성 변신:" },
					analDoubleEnabled: { bool: true, displayName: "이중 애널:" },
					vaginalDoubleEnabled: { bool: true, displayName: "이중 질 삽입:" },
					allureModifier: { min: 0.2, max: 2, decimals: 1, displayName: "조우율:", randomize: "gameplay" },
					facesitEnabled: { bool: true, displayName: "페이스시팅:" },
					pregnancySpeechEnabled: { bool: true, displayName: "가임/임신 관련 언급:" },
					footFetishEnabled: { bool: true, displayName: "발 페티시:" },
					forcedCrossdressingEnabled: { bool: true, displayName: "강제 크로스드레싱:" },
					horsesEnabled: { bool: true, displayName: "말:" },
					humanPregnancyMonths: { min: 1, max: 9, decimals: 0, displayName: "인간 임신 기간:" },
					hypnosisEnabled: { bool: true, displayName: "최면:" },
					npcVirginChanceAdult: { min: 0, max: 100, decimals: 0, displayName: "성인 NPC가 동정/처녀일 확률:", randomize: "encounter" },
					npcVirginChanceStudent: { min: 0, max: 100, decimals: 0, displayName: "젊은 성인 NPC가 동정/처녀일 확률:", randomize: "encounter" },
					darkSkinChance: { min: 0, max: 100, decimals: 0, displayName: "NPC가 어두운 피부를 가질 확률:", randomize: "encounter" },
					lurkersEnabled: { bool: true, displayName: "럴커:" },
					fertilityCycleEnabled: { bool: true, displayName: "월경 주기:" },
					toyMultiplePenetrationEnabled: { bool: true, displayName: "성인용품 다중 삽입:" },
					multipleWardrobes: { strings: [false, "isolated"], displayName: "여러 옷장:" }, //, "all"
					maleChanceSplit: { bool: true, displayName: "NPC의 성별 외형별 끌림 분리:" },
					npcPregnancyEnabled: { bool: true, displayName: "일반 NPC 임신:" },
                    nnpcPregnancyEnabled: { bool: true, displayName: "주요 NPC/연인 임신:" },
                    analPregnancy: { strings: [false, "exceptional", "always"], displayName: "플레이어 항문 임신:" },
                    npcAnalPregnancyEnabled: { bool: true, displayName: "NPC 항문 임신:" },
					maleChanceMale: { min: 0, max: 100, decimals: 0, displayName: "남성에게 끌리는 NPC:", randomize: "encounter" },
					maleChanceFemale: { min: 0, max: 100, decimals: 0, displayName: "여성에게 끌리는 NPC:", randomize: "encounter" },
					nudeGenderPerception: {
						min: 0,
						max: 2,
						decimals: 0,
						displayName: "나체 성별 인식:",
						textMap: {
							"-1": "NPC가 성별을 인식할 때 성기를 무시하며, 크로스드레싱 경고가 표시되지 않습니다",
							0: "NPC가 성별을 인식할 때 성기를 무시합니다",
							1: "NPC가 당신의 성별을 인식할 때 성기를 고려합니다",
							2: "NPC가 성기를 기준으로 당신의 성별을 판단합니다",
						},
					},
					monsterHallucinationsOnly: {
						bool: true,
						displayName: "환각 중일 때만 짐승을 몬스터로 대체:",
						randomize: "encounter",
					},
					parasitePregnancyEnabled: { bool: true, displayName: "기생충 임신:" },
					parasitesEnabled: { bool: true, displayName: "기생충:" },
					beastMaleChance: {
						min: 0,
						max: 100,
						decimals: 0,
						displayName: "당신에게 끌리는 짐승 중 수컷 비율:",
						randomize: "encounter",
					},
					monsterChance: {
						min: 0,
						max: 100,
						decimals: 0,
						displayName: "몬스터 소년/소녀로 대체되는 짐승 비율:",
						randomize: "encounter",
					},
					maleNPCVaginaChance: { min: 0, max: 100, decimals: 0, displayName: "보지를 가진 남성 비율:", randomize: "encounter" },
					maleVictimChance: { min: 0, max: 100, decimals: 0, displayName: "다른 피해자 중 남성 비율:", randomize: "encounter" },
					maleChance: { min: 0, max: 100, decimals: 0, displayName: "당신에게 끌리는 사람 중 남성 비율:", randomize: "encounter" },
					femaleNPCPenisChance: { min: 0, max: 100, decimals: 0, displayName: "자지를 가진 여성 비율:", randomize: "encounter" },
					straponChance: { min: 0, max: 100, decimals: 0, displayName: "페니스 밴드를 가진 여성 비율:", randomize: "encounter" },
					plantsEnabled: { bool: true, displayName: "식물 마물:" },
					playerPregnancyEggLayingEnabled: { bool: true, displayName: "플레이어 산란:" },
					playerPregnancyBeastEnabled: { bool: true, displayName: "플레이어의 짐승 임신:" },
					playerPregnancyHumanEnabled: { bool: true, displayName: "플레이어의 인간 임신:" },
					pregnancyType: { strings: ["realistic", "fetish"], displayName: "임신 모드:" },
					pubicHairEnabled: { bool: true, displayName: "음모:" },
					ruinedOrgasmEnabled: { bool: true, displayName: "망친 절정:" },
					skillCheckStyle: { strings: ["percentage", "words", "skillname"], randomize: "gameplay", displayName: "스킬 체크 표시:" },
					slimesEnabled: { bool: true, displayName: "슬라임:" },
					slugsEnabled: { bool: true, displayName: "민달팽이:" },
					spidersEnabled: { bool: true, displayName: "거미:" },
					swarmsEnabled: { bool: true, displayName: "무리:" },
					tentaclesEnabled: { bool: true, displayName: "촉수:" },
					voreEnabled: { bool: true, displayName: "보어:" },
					waspsEnabled: { bool: true, displayName: "말벌:" },
					watersportsEnabled: { bool: true, displayName: "워터스포츠:" },
					toyWhipEnabled: { bool: true, displayName: "채찍:" },
					wolfPregnancyWeeks: { min: 2, max: 12, decimals: 0, displayName: "늑대 임신 기간:" },
				},
				blackwolfmonster: {
					min: 0,
					max: 2,
					decimals: 0,
					displayName: "검은 늑대 짐승 유형:",
					textMap: { 0: "항상 짐승", 1: "조건 충족 시 몬스터 소년/소녀", 2: "항상 몬스터 소년/소녀" },
					randomize: "encounter",
				},
				greathawkmonster: {
					min: 0,
					max: 2,
					decimals: 0,
					displayName: "거대 매 짐승 유형:",
					textMap: { 0: "항상 짐승", 1: "조건 충족 시 몬스터 소년/소녀", 2: "항상 몬스터 소년/소녀" },
					randomize: "encounter",
				},
				nightmonstermonster: {
					min: 0,
					max: 2,
					decimals: 0,
					displayName: "밤의 괴물 짐승 유형:",
					textMap: { 0: "항상 짐승", 1: "조건 충족 시 몬스터 소년/소녀", 2: "항상 몬스터 소년/소녀" },
					randomize: "encounter",
				},
				breastsizemin: {
					min: 0,
					max: 4,
					decimals: 0,
					displayName: "가슴 최소 크기:",
					textMap: { 0: "납작함", 1: "봉긋함", 2: "아주 작음", 3: "작음", 4: "탱탱함" },
				},
				breastsizemax: {
					min: 0,
					max: 12,
					decimals: 0,
					displayName: "가슴 최대 크기:",
					textMap: {
						0: "납작함",
						1: "봉긋함",
						2: "아주 작음",
						3: "작음",
						4: "탱탱함",
						5: "적당함",
						6: "풍만함",
						7: "큼",
						8: "넉넉함",
						9: "육중함",
						10: "거대함",
						11: "거대함",
						12: "어마어마함",
					},
				},
				bottomsizemin: {
					min: 0,
					max: 2,
					decimals: 0,
					displayName: "엉덩이 최소 크기:",
					textMap: { 0: "납작한", 1: "아담한", 2: "둥근", 3: "부드러운" },
				},
				bottomsizemax: {
					min: 0,
					max: 8,
					decimals: 0,
					displayName: "엉덩이 최대 크기:",
					textMap: { 0: "납작한", 1: "아담한", 2: "둥근", 3: "부드러운" , 4: "통통한", 5: "꽉 찬", 6: "풍만한", 7: "큰", 8: "거대한" },
				},
				penissizemin: { min: -2, max: 0, decimals: 0, displayName: "자지 최소 크기:", textMap: { 0: "매우 작은", 1: "약간 작은", 2: "작은" } },
				penissizemax: {
					min: 0,
					max: 6,
					decimals: 0,
					displayName: "자지 최대 크기:",
					textMap: { 0: "매우 작은", 1: "약간 작은", 2: "작은", 3: "보통", 4: "큰", 5: "매우 큰", 6: "거대한" },
				},
				confirmSave: { bool: true, displayName: "세이브 확인 요구:" },
				confirmLoad: { bool: true, displayName: "로드 확인 요구:" },
				confirmDelete: { bool: true, displayName: "삭제 확인 요구:" },
				reducedLineHeight: { bool: true, displayName: "줄 높이 축소:" },
				outfitEditorPerPage: { min: 5, max: 20, decimals: 0, displayName: "페이지당 항목 수:" }, //, "all"
				options: {
					neverNudeMenus: { bool: true, displayName: "메뉴에서 플레이어 노출 숨기기:" },
					showCaptionText: { bool: true, displayName: "사이드바 캡션 텍스트 표시:" },
					clothingCaption: { bool: true, displayName: "사이드바 의류 설명 표시:" },
					clothingReplacementWarning: { bool: true, displayName: "의류 교체 경고 활성화:" },
					sidebarStats: { strings: ["disabled", "limited", "all"], displayName: "닫힌 사이드바 스탯:" },
					sidebarTime: { strings: ["disabled", "top", "bottom"], displayName: "닫힌 사이드바 시간:" },
					combatControls: { strings: ["radio", "columnRadio", "lists", "limitedLists"], displayName: "전투 조작:" },
					mapMovement: { bool: true, displayName: "지도 클릭 이동 활성화:" },
					mapTop: { bool: true, displayName: "지도를 지도 링크 위로 이동:" },
					mapMarkers: { bool: true, displayName: "지도에서 클릭 가능 영역 표시:" },
					images: { min: 0, max: 1, decimals: 0, displayName: "이미지:" },
					combatImages: { min: 0, max: 1, decimals: 0, displayName: "전투 이미지:" },
					bodywritingImages: { bool: true, displayName: "몸 낙서 이미지:" },
					silhouetteEnabled: { bool: true, displayName: "NPC 실루엣:" },
					sidebarAnimations: { bool: true, displayName: "사이드바 이미지:" },
					blinkingEnabled: { bool: true, displayName: "눈 깜빡임 애니메이션:" },
					combatAnimations: { bool: true, displayName: "전투 애니메이션:" },
					halfClosedEnabled: { bool: true, displayName: "반쯤 감은 눈:" },
					characterLightEnabled: { bool: true, displayName: "캐릭터 조명:" },
					lightSpotlight: { min: 0, max: 1, decimals: 2, displayName: "스포트라이트:" },
					lightGradient: { min: 0, max: 1, decimals: 2, displayName: "그라데이션:" },
					lightGlow: { min: 0, max: 1, decimals: 2, displayName: "광채:" },
					lightFlat: { min: 0, max: 1, decimals: 2, displayName: "평면광:" },
					lightTFColor: { min: 0, max: 1, decimals: 2, displayName: "천사/악마 변신 색상 요소:" },
					combatLightEnabled: { bool: true, displayName: "캐릭터 조명:" },
					combatLightOffsetY: { min: 0, max: 128, decimals: 0, displayName: "Y 오프셋:" },
					combatLightSpotlight: { min: 0, max: 1, decimals: 2, displayName: "스포트라이트:" },
					combatLightSpotlightX: { min: 0, max: 128, decimals: 0, displayName: "스포트라이트 너비:" },
					combatLightSpotlightY: { min: 0, max: 48, decimals: 0, displayName: "스포트라이트 높이:" },
					combatLightGradient: { min: 0, max: 1, decimals: 2, displayName: "그라데이션:" },
					combatLightGlow: { min: 0, max: 1, decimals: 2, displayName: "광채:" },
					combatLightFlat: { min: 0, max: 1, decimals: 2, displayName: "평면광:" },
					combatLightTFColor: { min: 0, max: 1, decimals: 2, displayName: "천사/악마 변신 색상 요소:" },
					maxStates: { min: 1, max: 20, decimals: 0, displayName: "히스토리 깊이:" },
					historyControls: { bool: true, displayName: "히스토리 조작 표시:" },
					useNarrowMarket: { bool: true, displayName: "시장 인벤토리에 좁은 화면 버전 사용:" },
					skipStatisticsConfirmation: { bool: true, displayName: "추가 스탯 보기 확인 건너뛰기:" },
					passageCount: { strings: ["disabled", "changes", "total"], displayName: "패시지 수 표시:" },
					playtime: { bool: true, displayName: "플레이 시간 표시:" },
					numberify_enabled: { min: 0, max: 1, decimals: 0, displayName: "번호 링크 이동 활성화:" },
					timestyle: { strings: ["military", "ampm"], displayName: "시간 표시 방식:" },
					tipdisable: { boolLetter: true, bool: true, displayName: "사이드바 팁:" },
					pepperSprayDisplay: { strings: ["none", "sprays", "compact"], displayName: "호신 스프레이 표시:" },
					condomsDisplay: { strings: ["none", "standard"], displayName: "콘돔 표시:" },
					closeButtonMobile: { bool: true, displayName: "페이지당 항목 수:" },
					showDebugRenderer: { bool: true, displayName: "렌더러 디버거 활성화:" },
					showCombatTools: { bool: true, displayName: "전투 도구 활성화:" },
					numpad: { bool: true, displayName: "숫자패드 활성화:" },
					traitOverlayFormat: { strings: ["table", "reducedTable", "list"], displayName: "특성 표시:" },
					font: {
						strings: ["", "Arial", "Verdana", "TimesNewRoman", "Georgia", "Garamond", "CourierNew", "LucidaConsole", "Monaco", "ComicSans"],
						displayName: "글꼴:",
					},
					passageLineHeight: { strings: [0, 1, 1.25, 1.5, 1.75, 2], displayName: "패시지 줄 높이:" },
					overlayLineHeight: { strings: [0, 1, 1.25, 1.5, 1.75, 2], displayName: "오버레이 줄 높이:" },
					sidebarLineHeight: { strings: [0, 1, 1.25, 1.5, 1.75, 2], displayName: "사이드바 줄 높이:" },
					passageFontSize: { strings: [0, 10, 12, 14, 16, 18, 20], displayName: "패시지 글자 크기:" },
					overlayFontSize: { strings: [0, 10, 12, 14, 16, 18, 20], displayName: "오버레이 글자 크기:" },
					sidebarFontSize: { strings: [0, 12, 14, 16, 18, 20], displayName: "사이드바 글자 크기:" },
					genderBody: { strings: ["default", "m", "a", "f"], displayName: "표시할 신체 유형:" },
					notesAutoSave: { bool: true, displayName: "메모 자동 저장:" },
					dateFormat: { strings: ["en-GB", "en-US", "zh-CN"], displayName: "날짜 형식:" },
				},
				shopDefaults: {
					alwaysBackToShopButton: { bool: true },
					color: {
						strings: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom", "random"],
					},
					colourItems: { strings: ["disable", "random", "default"] },
					compactMode: { bool: true },
					disableReturn: { bool: true },
					highContrast: { bool: true },
					mannequinGender: { strings: ["same", "opposite", "male", "female"] },
					mannequinGenderFromClothes: { bool: true },
					noHelp: { bool: true },
					noTraits: { bool: true },
					secColor: {
						strings: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom", "random"],
					},
				},
				wardrobeDefaults: {
					showTraits: { bool: false },
					extraInfo: { bool: false },
				},
			};
			break;
		case "npc":
			result = {
				pronoun: { strings: ["m", "f"], displayName: "대명사: ", textMap: { none: "해당 없음", m: "남성", f: "여성" } },
				gender: { strings: ["m", "f"], displayName: "성기: ", textMap: { none: "해당 없음", m: "자지", f: "보지" } },
				skincolour: {
					strings: ["white", "black", "ghost"],
					displayName: "피부색: ",
					textMap: { none: "해당 없음", white: "창백함", black: "어두움", ghost: "유령처럼 창백함" },
				},
				penissize: { min: 0, max: 4, decimals: 0, displayName: "자지 크기: ", textMap: { 0: "해당 없음", 1: "작은", 2: "보통", 3: "큰", 4: "거대한" } },
				breastsize: {
					min: 0,
					max: 12,
					decimals: 0,
					displayName: "가슴 크기: ",
					textMap: {
						none: "해당 없음",
						0: "납작한",
						1: "아주 작은",
						2: "작은",
						3: "봉긋한",
						4: "볼륨있는",
						5: "글래머한",
						6: "꽉 찬",
						7: "풍만한",
						8: "큰",
						9: "커다란",
						10: "거대한",
						11: "엄청난",
						12: "어마어마한"
					},
				},
			};
			break;
	}
	return result;
}
window.settingsObjects = settingsObjects;

/* Converts specific settings to so they don't look so chaotic to players */
function settingsConvert(exportType, type, settings) {
	const listObject = settingsObjects(type);
	const result = settings;
	const keys = Object.keys(listObject);
	for (let i = 0; i < keys.length; i++) {
		if (result[keys[i]] === undefined) continue;
		if (["map", "player", "shopDefaults", "options", "wardrobeDefaults"].includes(keys[i])) {
			const itemKey = Object.keys(listObject[keys[i]]);
			for (let j = 0; j < itemKey.length; j++) {
				if (result[keys[i]][itemKey[j]] === undefined) continue;
				const keyArray = Object.keys(listObject[keys[i]][itemKey[j]]);
				if (exportType) {
					if (keyArray.includes("boolLetter") && keyArray.includes("bool")) {
						if (result[keys[i]][itemKey[j]] === "t") {
							result[keys[i]][itemKey[j]] = true;
						} else if (result[keys[i]][itemKey[j]] === "f") {
							result[keys[i]][itemKey[j]] = false;
						}
					}
				} else {
					if (keyArray.includes("boolLetter") && keyArray.includes("bool")) {
						if (result[keys[i]][itemKey[j]] === true) {
							result[keys[i]][itemKey[j]] = "t";
						} else if (result[keys[i]][itemKey[j]] === false) {
							result[keys[i]][itemKey[j]] = "f";
						}
					}
				}
			}
		} else {
			const keyArray = Object.keys(listObject[keys[i]]);
			if (exportType) {
				if (keyArray.includes("boolLetter") && keyArray.includes("bool")) {
					if (result[keys[i]] === "t") {
						result[keys[i]] = true;
					} else if (result[keys[i]] === "f") {
						result[keys[i]] = false;
					}
				}
			} else {
				if (keyArray.includes("boolLetter") && keyArray.includes("bool")) {
					if (result[keys[i]] === true) {
						result[keys[i]] = "t";
					} else if (result[keys[i]] === false) {
						result[keys[i]] = "f";
					}
				}
			}
		}
	}
	return result;
}
window.settingsConvert = settingsConvert;

window.loadExternalExportFile = function () {
	importScripts("DolSettingsExport.json")
		.then(function () {
			const textArea = document.getElementById("settingsDataInput");
			textArea.value = JSON.stringify(DolSettingsExport);
		})
		.catch(function () {
			// console.log(err);
			const button = document.getElementById("LoadExternalExportFile");
			button.value = "불러오기 오류";
		});
};

/**
 * @param {string} filter
 * @returns {string}
 */
function randomizeSettings(filter) {
	const result = {};

	/**
	 * @param {object} source
	 * @param {string} key
	 * @returns {any?}
	 */
	const setRandomValue = (source, key) => {
		const value = source[key];
		if ((!filter && value.randomize) || (filter && filter === value.randomize)) {
			return randomizeSettingSet(value);
		}
		return null;
	};

	if (V.passage === "Start") {
		const startingConfig = settingsObjects("starting");
		const starting = traverse(startingConfig, "root", settingContainers, setRandomValue);
		result.starting = starting;
	}

	const generalConfig = settingsObjects("general");
	const general = traverse(generalConfig, "root", settingContainers, setRandomValue);
	result.general = general;

	return JSON.stringify(result);
}
window.randomizeSettings = randomizeSettings;

const randomNumber = function (min, max, decimals = 0) {
	const decimalsMult = Math.pow(10, decimals);
	const minMult = min * decimalsMult;
	const maxMult = (max + 1) * decimalsMult;
	const rn = Math.floor(Math.random() * (maxMult - minMult)) / decimalsMult + min;
	return parseFloat(rn.toFixed(decimals));
};

const randomizeSettingSet = function (setting) {
	let result;
	const keys = Object.keys(setting);
	if (keys.includes("min")) {
		result = randomNumber(setting.min, setting.max, setting.decimals);
	}
	if (keys.includes("strings")) {
		result = setting.strings.pluck();
	}
	if (keys.includes("boolLetter")) {
		result = ["t", "f"].pluck();
	}
	if (keys.includes("bool")) {
		result = [true, false].pluck();
	}
	return result;
};

/**
 * instantly moves changes made in the passage into save data without changing the passage
 * WARNING: the game __will__ re-apply passage effects after reload, be sure to account for that or avoid using it
 */
function updateMoment() {
	State.history[State.activeIndex].variables = JSON.parse(JSON.stringify(V));
}
window.updateMoment = updateMoment;

window.isJsonString = function (s) {
	try {
		JSON.parse(s);
	} catch (e) {
		return false;
	}
	return true;
};

/**
 * Recursively traverses an object, reporting an error for any NaN values or null objects or functions\
 * Example: `let result = recurseNaN(a, "a");`.
 *
 * @param {object} obj The head of the object tree.
 * @param {string} path A string to indicate the path, put the object name in quotes.
 * @param {object} result An object to store the results in. - leave blank.
 * @param {Set} hist A set used for Cycle history. - leave blank.
 */

function recurseNaN(obj, path, result = null, hist = null) {
	result = Object.assign({ nulls: [], nan: [], functions: [], cycle: [] }, result);
	if (hist == null) hist = new Set([obj]);
	/* let result = {"nulls" : [], "nan" : [], "cycle" : []}; */
	for (const [key, val] of Object.entries(obj)) {
		const newPath = `${path}.${key}`;
		if (Number.isNaN(val)) {
			result.nan.push(newPath);
			continue;
		}
		if (typeof val === "function") result.functions.push(newPath);
		if (typeof val === "object") {
			if (val === null) {
				result.nulls.push(newPath);
				continue;
			}
		} else {
			continue;
		}
		if (hist.has(val)) {
			result.cycle.push(newPath);
			continue;
		}
		hist.add(val);
		recurseNaN(val, `${newPath}`, result, hist);
	}
	return result;
}
window.recurseNaN = recurseNaN;

/**
 * Recursively traverse target object, finding and returning an object containing all the NaN vars inside.
 *
 * Use with nukeNaNs to re-assign 0 to all bad NaN'd vars.	Use with caution.
 *
 * @param {object} target The object to traverse.	Defaults to V ($).
 * @returns {object} An object containing all the properties/sub-props that were NaN.
 */
function scanNaNs(target = V) {
	// If this gets set to true during function, a NaN was hit within scope.
	let isMutated = false;
	const current = Object.create({});
	// Loop through all properties of the target for NaNs and objects to scan.
	for (const [key, value] of Object.entries(target)) {
		// If value is an object, scan that property.
		if (value && typeof value === "object") {
			const resp = scanNaNs(value);
			// If scanNaNs returns a non-null object, there was a NaN somewhere, so make sure to update current obj.
			if (resp && typeof resp === "object") {
				current[key] = resp;
				isMutated = true;
			}
		} else if (typeof value === "number") {
			// Does what it says on the tin, make sure you only test numbers.
			if (isNaN(value)) {
				// Set property to a default value, likely zero.
				current[key] = 0;
				isMutated = true;
			}
		}
	}
	// Return a fully realised object, indicating there were NaNs, or null, which can be ignored.
	// isMutated controls whether we have encountered NaNs, remember to update where necessary.
	return isMutated ? current : null;
}
window.scanNaNs = scanNaNs;

function nukeNaNs(target = V) {
	for (const key in target) {
		const value = target[key];
		if (typeof value === "object" && value !== null) nukeNaNs(value);
		else if (Number.isNaN(value)) target[key] = 0;
	}
}
window.nukeNaNs = nukeNaNs;
