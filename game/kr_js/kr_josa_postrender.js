/* Korean josa post-render engine */
(function () {
	"use strict";

	let josaTimer = null;
	let koreanPostRenderObserver = null;
	let koreanPostRenderObserverTimer = null;

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

	function findLastNonSpaceCharBeforeNode(node, root) {
		let cur = node;

		while (cur && cur !== root) {
			let prev = cur.previousSibling;

			while (prev) {
				const text = (prev.textContent || "").replace(/\s+$/g, "");

				if (text) {
					if (prev.nodeType === Node.TEXT_NODE) {
						prev.nodeValue = prev.nodeValue.replace(/\s+$/g, "");
					} else {
						const lastText = findLastTextNode(prev);
						if (lastText) {
							lastText.nodeValue = lastText.nodeValue.replace(/\s+$/g, "");
						}
					}

					return text[text.length - 1];
				}

				if (prev.nodeType === Node.TEXT_NODE) {
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
					lastChar = left[left.length - 1];
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

	function getKoreanPostRenderRoots() {
		return [
			document.getElementById("passages"),
			document.getElementById("ui-bar"),
			document.getElementById("sidebar"),
			document.getElementById("stats"),
			document.getElementById("ui-dialog"),
			document.getElementById("ui-dialog-body")
		].filter(Boolean);
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

	function installKoreanPostRenderObserver() {
        if (koreanPostRenderObserver || typeof MutationObserver === "undefined") return;

        koreanPostRenderObserver = new MutationObserver(function (mutations) {
            cancelAnimationFrame(koreanPostRenderObserverTimer);

            koreanPostRenderObserverTimer = requestAnimationFrame(function () {
                for (const mutation of mutations) {
                    if (
                        mutation.type === "characterData" &&
                        nodeNeedsKoreanPostRender(mutation.target)
                    ) {
                        const container = mutation.target.parentElement || document.getElementById("passages");
                        runKoreanPostRender(container, true);
                    }

                    for (const node of mutation.addedNodes || []) {
                        if (nodeNeedsKoreanPostRender(node)) {
                            runKoreanPostRender(node, true);
                        }
                    }
                }
            });
        });

        // 수정된 부분: body 전체가 아닌, 필요한 영역만 각각 개별 감시
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

		if (koreanPostRenderObserver) {
			koreanPostRenderObserver.disconnect();
		}

		runDisplayTranslation(root, allowDetached);
		runJosa(root);

		if (koreanPostRenderObserver) {
			const roots = getKoreanPostRenderRoots();
			roots.forEach(observedRoot => {
				koreanPostRenderObserver.observe(observedRoot, {
					childList: true,
					characterData: true,
					subtree: true
				});
			});
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