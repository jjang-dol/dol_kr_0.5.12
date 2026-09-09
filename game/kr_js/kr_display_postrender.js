/* twine-user-script: kr_display_postrender.js */
(function () {
    "use strict";

    window.KR = window.KR || {};

    function escapeRegExp(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    function buildDisplayMap() {
        const originalDict = window.KR.dict || {};
        const lowerDict = {};
        for (const k in originalDict) {
            const lowerK = k.toLowerCase();
            const val = originalDict[k];

            // 1. 원본 소문자 키 저장
            lowerDict[lowerK] = val;

            // 2. 키에 언더바, 공백, 하이픈이 있다면 대표 변형 4가지를 미리 만들어 저장
            if (lowerK.includes('_') || lowerK.includes(' ') || lowerK.includes('-')) {
                lowerDict[lowerK.replace(/[ _-]/g, ' ')] = val;  // strap on horse cock
                lowerDict[lowerK.replace(/[ _-]/g, '_')] = val;  // strap_on_horse_cock
                lowerDict[lowerK.replace(/[ _-]/g, '-')] = val;  // strap-on-horse-cock
                lowerDict[lowerK.replace(/[ _-]/g, '')] = val;   // straponhorsecock
            }
        }
        return lowerDict;
    }

    // Exact-match lookup (case-insensitive) into the same normalized dictionary
    // used for on-screen translation. Returns the Korean string if a match is
    // found, otherwise undefined. Used e.g. by the clothing shop search box so
    // it can match against Korean item names even though the underlying data
    // (item.name) stays in English.
    window.KR.lookup = function lookup(text) {
        if (!text) return undefined;
        const dict = buildDisplayMap();
        return dict[String(text).toLowerCase()];
    };

    let _cachedRegex = null;
    let _cachedKeyCount = 0;

    function makeRegex(dict) {
        const keys = Object.keys(dict).filter(Boolean);
        if (keys.length === _cachedKeyCount && _cachedRegex) return _cachedRegex;
        _cachedKeyCount = keys.length;

        keys.sort((a, b) => b.length - a.length);

        if (!keys.length) return null;

        _cachedRegex = new RegExp("(^|[^A-Za-z0-9_])(" + keys.map(escapeRegExp).join("|") + ")(?=$|[^A-Za-z0-9_])", "gi");
        return _cachedRegex;
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

    window.KR.translateVisibleText = function translateVisibleText(root, allowDetached = false) {
        if (!root || typeof setup === "undefined") return;

        const allowedRoots = [
            document.getElementById("passages"),
            document.getElementById("ui-bar"),
            document.getElementById("sidebar"),
            document.getElementById("stats"),
            document.getElementById("ui-dialog"),
            document.getElementById("ui-dialog-body")
        ].filter(Boolean);

        if (!allowDetached && !allowedRoots.length) return;

        let safeRoot = root;

        if (
            root === document ||
            root === document.body ||
            root === document.documentElement ||
            root.nodeType === Node.DOCUMENT_NODE
        ) {
            safeRoot = document.getElementById("passages");
            if (!safeRoot) return;
        }

        if (
            !allowDetached &&
            !allowedRoots.some(allowed => safeRoot === allowed || allowed.contains(safeRoot))
        ) {
            return;
        }

        const dict = buildDisplayMap();
        const regex = makeRegex(dict);
        if (!regex) return;
        regex.lastIndex = 0;

        // 인접한 텍스트 노드들을 하나로 병합하여 조합 단어 인식이 가능하게 함
        safeRoot.normalize();

        const walker = document.createTreeWalker(
            safeRoot,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode(node) {
                    if (shouldSkipTextNode(node)) return NodeFilter.FILTER_REJECT;
                    if (!node.nodeValue || !/[A-Za-z]/.test(node.nodeValue)) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        );

        const nodes = [];
        while (walker.nextNode()) nodes.push(walker.currentNode);

        for (const node of nodes) {
            const oldText = node.nodeValue;
            const newText = oldText.replace(regex, function (_, prefix, key) {
                const lowerKey = key.toLowerCase();
                return prefix + (dict[lowerKey] ?? key);
            });

            if (newText !== oldText) {
                node.nodeValue = newText;
            }
        }
    };
})();