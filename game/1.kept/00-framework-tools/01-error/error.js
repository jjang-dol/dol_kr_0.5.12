/**
 * Error reporter utility that provides enriched error messages to the user as a simple sugarcube plugin app.
 */
Errors.config = {
	// TODO: link this to an environment variable
	// for the time being, it can be enabled on console via `Errors.config.debug = true`
	debug: false,
	maxLogs: 100,
	showReporterSelector: ".error-reporter-btn",
};

Errors.log = [];

Errors.registerMessage = (message, copyData, noClone) => {
	while (Errors.log.length >= Errors.config.maxLogs) Errors.log.shift();
	const error = { message, copyData };
	if (noClone) Errors.log.push(error);
	else Errors.log.push(JSON.parse(JSON.stringify(error)));
	return error;
};

Errors.report = (message, copyData, noClone) => {
	let error;
	try {
		error = Errors.registerMessage(message, copyData, noClone);
	} catch (e) {
		console.error(`오류 로그를 추가하지 못했습니다. 심각한 문제가 발생했습니다: `, message, copyData, e);
		alert(`치명적인 오류가 발생했습니다. 이 문제를 개발진에게 제보해 주세요. [Errors.report/registerMessage]`);
		return;
	}
	try {
		const showBtn = document.querySelector(Errors.config.showReporterSelector);
		if (showBtn) showBtn.classList.remove("hidden");
		if (Errors.Reporter.visible()) {
			if (Errors.log.length < Errors.config.maxLogs) {
				Errors.Reporter.messagesContainer().append(Errors.Reporter.createEntry(error));
			} else {
				Errors.Reporter.update();
			}
		}
	} catch (e) {
		console.error(`오류 콘솔을 렌더링하고 여는 데 실패했습니다. \n렌더링 오류: `, e, `\n\n오류 로그: `, Errors.log);
		alert(`치명적인 오류가 발생했습니다. 이 문제를 개발진에게 제보해 주세요. [Errors.report/displayMessage]`);
	}
};

{
	/**
	 * Reporter DOM
	 * These are utilities for making a plain old javascript "app" that displays and manages errors.
	 */
	// making an additional namespace for this app. Note the scoping
	const Reporter = (Errors.Reporter = {});

	Reporter.visible = function () {
		return !Reporter.reporterContainer().classList.contains("hidden");
	};

	Reporter.reporterContainer = function getReporter() {
		let reporterContainer = document.getElementById("error-reporter-container");
		if (!reporterContainer) {
			reporterContainer = document.createElement("div");
			reporterContainer.id = "error-reporter-container";
			reporterContainer.className = "hidden";
			reporterContainer.innerHTML = `
				<div class="pane">
					<h3>오류:</h3>
					<div class="messages"></div>
					<div class="actions">
						<div class="button close" onclick="Errors.Reporter.hide()">닫기</div>
						<div class="button close" onclick="Errors.Reporter.hide(true)">지우기</div>
						<div class="button copy" onclick="Errors.Reporter.copyAll()">복사</div>
						<textarea class="copy-area hidden" spellcheck="false"></textarea>
					</div>
				</div>`;
			document.querySelector("#story").insertAdjacentElement("afterbegin", reporterContainer);
		}
		return reporterContainer;
	};

	Reporter.messagesContainer = () => {
		return Reporter.reporterContainer().querySelector(`.messages`);
	};

	Reporter.paneContainer = () => {
		return Reporter.reporterContainer().querySelector(`.pane`);
	};

	Reporter.copyArea = () => {
		return Reporter.reporterContainer().querySelector(".copy-area");
	};

	Reporter.toggle = () => {
		if (Reporter.visible()) {
			Reporter.hide();
		} else {
			Reporter.show();
		}
	};

	Reporter.show = () => {
		Reporter.reporterContainer().classList.remove("hidden");
		Reporter.update();
	};

	Reporter.update = () => {
		const reports = Reporter.messagesContainer();
		reports.innerHTML = "";
		for (const error of Errors.log) {
			reports.append(Reporter.createEntry(error));
		}
	};

	Reporter.hide = andClear => {
		Reporter.reporterContainer().classList.add("hidden");
		Reporter.copyArea().classList.add("hidden");
		if (andClear) {
			Errors.log.splice(0);
			const showBtn = document.querySelector(Errors.config.showReporterSelector);
			if (showBtn) showBtn.classList.add("hidden");
		}
	};

	Reporter.createEntry = error => {
		const div = document.createElement("div");
		div.className = "message-entry";
		div.textContent = error.message;
		if (error.copyData !== undefined) {
			div.innerHTML += "<br><br>" + formatErrorObj(error.copyData);
		}
		return div;
	};

	Reporter.copyAll = function () {
		const copyButton = Reporter.reporterContainer().querySelector(".button.copy");
		const copyArea = Reporter.copyArea();
		try {
			let copyResult = "";
			Errors.log.forEach(e => {
				copyResult += e.message;
				if (e.copyData !== undefined) copyResult += " : " + formatErrorObj(e.copyData);
				copyResult += " ;\n";
			});
			copyResult = copyResult.replace(/\n$/, ""); // remove the trailing newline
			copyArea.textContent = copyResult;
			copyArea.classList.remove("hidden");
			copyArea.focus();
			copyArea.select();
			document.execCommand("copy");
			copyButton.textContent = "복사 완료";
		} catch (e) {
			copyButton.textContent = "복사 실패";
			alert(
				`클립보드에 복사하지 못했습니다. 텍스트 영역에서 직접 복사해 보세요. 아무것도 나타나지 않았다면 개발자 콘솔의 Errors.log에서 직접 복사해 주세요.`
			);
		}
		setTimeout(() => {
			copyButton.textContent = "복사";
		}, 5000);
	};
}

function formatErrorObj(obj) {
	/* turns object into a prettified JSON string for display */
	return JSON.stringify(obj, (key, value) => {
		/* custom replacer function to keep stuff from turning into null */
		if (Number.isNaN(value)) return "NaN";
		else if (value === undefined) return "Undefined";
		else if (value === Infinity) return "Infinity";
		else return value;
	}).replace(/([,:;])/g, "$1 "); // add spaces after commas, colons, and semicolons
}
window.formatErrorObj = formatErrorObj;
