(function () {
	"use strict";

	let josaTimer = null;
	let koreanPostRenderObserver = null;
	let koreanPostRenderObserverTimer = null;

	// runKoreanPostRender가 만든 DOM 수정 자체가 옵저버를 다시 깨우지 않도록 막는 재진입 방지 플래그.
	// 예전에는 매번 disconnect()/observe()를 호출해서 같은 일을 했는데, 옵저버를 실제로
	// 끊었다 붙였다 하는 건 비용이 있어서 훨씬 가벼운 불리언 체크로 대체함.
	let isApplyingKoreanPostRender = false;

	function trSelectPost(word, type) {
		if (!word || typeof word !== "string" || word.length === 0) return "";

		const lastChar = word.charCodeAt(word.length - 1);

		if (lastChar < 0xAC00 || lastChar > 0xD7A3) {
			switch (type) {
				case "은는": return "는";
				case "이가": return "가";
				case "을를": return "를";
				case "와과": return "와";
				case "으로로": return "로";
				case "아야": return "야";
				case "이나나": return "나";
				case "이": return "";
				case "이었였": return "였";
				default: return "";
			}
		}

		const batchim = (lastChar - 0xAC00) % 28;
		const hasBatchim = batchim !== 0;
		const isRieul = batchim === 8;

		switch (type) {
			case "은는": return hasBatchim ? "은" : "는";
			case "이가": return hasBatchim ? "이" : "가";
			case "을를": return hasBatchim ? "을" : "를";
			case "와과": return hasBatchim ? "과" : "와";
			case "으로로": return hasBatchim && !isRieul ? "으로" : "로";
			case "아야": return hasBatchim ? "아" : "야";
			case "이나나": return hasBatchim ? "이나" : "나";
			case "이": return hasBatchim ? "이" : "";
			case "이었였": return hasBatchim ? "이었" : "였";
			default: return "";
		}
	}

	function shouldSkipTextNode(node) {
		const p = node.parentNode;
		if (!p) return true;

		if (p.closest?.([
			"script",
			"style",
			"textarea",
			"input",
			"code",
			"pre",
			"tw-storydata",
			"tw-passagedata",
			"tw-tag"
		].join(","))) {
			return true;
		}

		return false;
	}

	function findLastTextNode(el) {
		const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
		let last = null;
		let node;

		while ((node = walker.nextNode())) {
			if (!shouldSkipTextNode(node)) {
				last = node;
			}
		}

		return last;
	}

	// 조사 판정 시 무시할 문자들 - 공백 외에, 인용부호/괄호류가 실제 단어 끝 글자와
	// 조사 마커(【...】) 사이에 끼어있어도 그 안쪽의 진짜 마지막 글자를 보고 판정하도록 함.
	// (예: "예쁨"【이가】 -> 닫는 큰따옴표 말고 "쁨"을 보고 받침 판정)
	const JOSA_IGNORABLE_CHAR_RE = /["'“”‘’()（）\[\]{}]/;

	// 문자열 끝에서부터 JOSA_IGNORABLE_CHAR_RE에 해당하는 문자를 건너뛰고,
	// 실제로 받침 판정에 쓸 수 있는 첫 글자를 반환한다. 전부 무시 대상이면 "".
	function getEffectiveLastChar(str) {
		for (let i = str.length - 1; i >= 0; i--) {
			if (!JOSA_IGNORABLE_CHAR_RE.test(str[i])) return str[i];
		}
		return "";
	}

	function findLastNonSpaceCharBeforeNode(node, root) {
		let cur = node;

		while (cur && cur !== root) {
			let prev = cur.previousSibling;

			while (prev) {
				const text = (prev.textContent || "").replace(/\s+$/g, "");

				if (text) {
					const effectiveChar = getEffectiveLastChar(text);

					if (prev.nodeType === Node.TEXT_NODE) {
						prev.nodeValue = prev.nodeValue.replace(/\s+$/g, "");
					} else {
						const lastText = findLastTextNode(prev);
						if (lastText) {
							lastText.nodeValue = lastText.nodeValue.replace(/\s+$/g, "");
						}
					}

					if (effectiveChar) return effectiveChar;
					// text가 전부 무시 대상 문자(따옴표/괄호 등)뿐이었던 경우,
					// 그 앞의 형제 노드로 계속 거슬러 올라간다.
				} else if (prev.nodeType === Node.TEXT_NODE) {
					prev.nodeValue = "";
				}

				prev = prev.previousSibling;
			}

			cur = cur.parentNode;
		}

		return "";
	}

	function walkTextNodes(root) {
		if (!root) return;

		const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
		const nodes = [];
		let node;

		while ((node = walker.nextNode())) {
			if (shouldSkipTextNode(node)) continue;

			if (node.nodeValue && /【[^】]+】/.test(node.nodeValue)) {
				nodes.push(node);
			}
		}

		for (const n of nodes) {
			const original = n.nodeValue;

			const replaced = original.replace(/\s*【([^】]+)】/g, function (match, type, offset) {
				const left = original.slice(0, offset).replace(/\s+$/g, "");

				let lastChar = "";
				if (left) {
					lastChar = getEffectiveLastChar(left);
					if (!lastChar) {
						lastChar = findLastNonSpaceCharBeforeNode(n, root);
					}
				} else {
					lastChar = findLastNonSpaceCharBeforeNode(n, root);
				}

				return trSelectPost(lastChar, type.trim());
			});

			if (replaced !== original) {
				n.nodeValue = replaced;
			}
		}
	}

	// 대상 루트 엘리먼트 목록을 매번 getElementById로 다시 찾지 않도록 캐시.
	// 이 6개 컨테이너는 게임 세션 내내 교체되지 않는 고정 UI 뼈대라 캐시가 안전하지만,
	// 혹시라도 사라지는 경우(예: 오버레이 재구성)에 대비해 연결 상태를 확인 후 필요할 때만 다시 조회한다.
	const _rootIds = ["passages", "ui-bar", "sidebar", "stats", "ui-dialog", "ui-dialog-body"];
	let _cachedRoots = [];

	function getKoreanPostRenderRoots() {
		// 이미 찾아둔 요소 중 여전히 DOM에 붙어있는 것만 유지.
		_cachedRoots = _cachedRoots.filter(el => el.isConnected);

		// 아직 못 찾은(또는 이번에 새로 사라진) id만 다시 조회한다.
		// #ui-dialog/#customOverlay를 담는 컨테이너 등은 저널/특징 탭 등을
		// 처음 열 때가 되어서야 생성되므로, 매번 누락분만 재조회해야
		// 나중에 생긴 요소도 감시 대상에 포함된다.
		const foundIds = new Set(_cachedRoots.map(el => el.id));
		for (const id of _rootIds) {
			if (foundIds.has(id)) continue;
			const el = document.getElementById(id);
			if (el) _cachedRoots.push(el);
		}

		return _cachedRoots;
	}

	function nodeNeedsKoreanPostRender(node) {
		if (!node) return false;

		if (node.nodeType === Node.TEXT_NODE) {
			return /【[^】]+】|[A-Za-z]/.test(node.nodeValue || "");
		}

		if (node.nodeType === Node.ELEMENT_NODE) {
			if (node.closest?.("script,style,textarea,input,select,option,code,pre,tw-storydata,tw-passagedata,tw-tag")) {
				return false;
			}
			return /【[^】]+】|[A-Za-z]/.test(node.textContent || "");
		}

		return false;
	}

	// 옵저버 콜백이 연속으로 여러 번 불릴 때(예: 저널 탭 전환 시 title/content가
	// 별도 뮤테이션 배치로 잡히는 경우), 아래에서 매번 rAF를 취소하고 다시 예약하는데
	// 이때 mutations를 클로저로만 들고 있으면 취소된 이전 배치의 뮤테이션이 그냥
	// 버려진다. 그래서 처리될 때까지 누적해서 들고 있는 배열을 따로 둔다.
	let pendingKoreanPostRenderMutations = [];

	function installKoreanPostRenderObserver() {
		if (typeof MutationObserver === "undefined") return;

		// 옵저버 '객체'는 최초 1회만 생성한다.
		if (!koreanPostRenderObserver) {
			koreanPostRenderObserver = new MutationObserver(function (mutations) {
				// 우리 스스로가 만든 변경이면 무시 (재진입 방지). disconnect/observe를 매번
				// 호출하는 대신 이 플래그 체크 한 번으로 대체해서 옵저버 자체는 계속 켜둔 채로 둔다.
				if (isApplyingKoreanPostRender) return;

				pendingKoreanPostRenderMutations.push(...mutations);

				cancelAnimationFrame(koreanPostRenderObserverTimer);

				koreanPostRenderObserverTimer = requestAnimationFrame(function () {
					// 실제로 변경된 부분만 처리한다. 예전에는 이 다음에 무조건
					// runKoreanPostRenderAll()로 6개 루트 전체(현재 패시지 전문 포함)를
					// 매번 다시 훑었는데, 사이드바 수치 같은 작은 변경 하나에도 전체
					// 재스캔이 걸려서 렉의 주 원인이었음. 바뀐 부분만 좁게 처리하도록 수정.
					//
					// childList 변경은 추가된 노드 하나하나를 따로 판단하지 않고,
					// 자식이 바뀐 컨테이너(mutation.target) 자체를 통째로 재처리한다.
					// 개별 addedNode 단위로 "번역이 필요한가"를 판단하면, 무거운 위젯이
					// 내부적으로 여러 단계에 걸쳐 내용을 조립하거나 최상위 노드 구조가
					// 예상과 다를 때 놓칠 수 있음 (예: 캐릭터/저널 탭). 컨테이너 자체는
					// 대개 #customOverlayContent처럼 범위가 작아서 통째로 훑어도 비용이
					// 크지 않다.
					const mutationsToProcess = pendingKoreanPostRenderMutations;
					pendingKoreanPostRenderMutations = [];

					const targets = new Set();
					for (const mutation of mutationsToProcess) {
						if (mutation.type === "characterData") {
							if (nodeNeedsKoreanPostRender(mutation.target)) {
								targets.add(mutation.target.parentElement);
							}
						} else if (mutation.addedNodes.length || mutation.removedNodes.length) {
							targets.add(mutation.target);
						}
					}

					for (const target of targets) {
						if (target) runKoreanPostRender(target, true);
					}
				});
			});
		}

		// #ui-dialog/#ui-dialog-body, #customOverlay 등은 저널 등의 다이얼로그/오버레이를
		// 처음 열 때가 되어서야 생성되므로, 옵저버 객체는 한 번만 만들되 루트 attach(observe
		// 호출)는 이 함수가 호출될 때마다 다시 시도해서 나중에 생긴 요소도 감시 대상에
		// 포함시킨다. 이미 관찰 중인 요소에 다시 observe()를 걸어도 안전(idempotent)하다.
		const roots = getKoreanPostRenderRoots();
		roots.forEach(root => {
			if (root) {
				koreanPostRenderObserver.observe(root, {
					childList: true,
					characterData: true,
					subtree: true
				});
			}
		});
	}

	function runJosa(root) {
		if (!root) {
			for (const eachRoot of getKoreanPostRenderRoots()) {
				runJosa(eachRoot);
			}
			return;
		}

		walkTextNodes(root);
	}

	function runDisplayTranslation(root, allowDetached = false) {
		if (!root) return;

		if (
			window.KR &&
			typeof window.KR.translateVisibleText === "function"
		) {
			window.KR.translateVisibleText(root, allowDetached);
		}
	}

	function runKoreanPostRender(root, allowDetached = false) {
		if (!root) return;

		isApplyingKoreanPostRender = true;
		try {
			runDisplayTranslation(root, allowDetached);
			runJosa(root);
		} finally {
			isApplyingKoreanPostRender = false;
		}
	}

	function runKoreanPostRenderAll() {
		for (const root of getKoreanPostRenderRoots()) {
			runKoreanPostRender(root, false);
		}
	}

	function scheduleKoreanPostRender(root, allowDetached = false) {
		cancelAnimationFrame(josaTimer);
		josaTimer = requestAnimationFrame(function () {
			if (root) {
				runKoreanPostRender(root, allowDetached);
			} else {
				runKoreanPostRenderAll();
			}
		});
	}

	if (typeof setup !== "undefined") {
		setup.trSelectPost = trSelectPost;
		setup.runJosa = runJosa;
		setup.runKoreanPostRender = runKoreanPostRender;
	}

	window.runJosa = runJosa;
	window.runKoreanPostRender = runKoreanPostRender;
	window.scheduleKoreanPostRender = scheduleKoreanPostRender;

	$(document).on(":passagerender", function (ev) {
		installKoreanPostRenderObserver();

		let root = ev.content;
		if (root && root.jquery) root = root[0];

		if (root) {
			runKoreanPostRender(root, true);
		}
	});

	$(document).on(":passagedisplay :passageend", function () {
		installKoreanPostRenderObserver();
		requestAnimationFrame(runKoreanPostRenderAll);
	});

	$(installKoreanPostRenderObserver);
})();
