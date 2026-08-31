/* eslint-disable no-unsafe-finally */
/**
 * ############# PURE EVIL ###################
 * Overwrites JSON.parse and JSON.stringify to
 * encode object class information.
 *
 * We make a best attempt to support all JSON features
 * and be as unobtrusive as possible, but still, monkey
 * patching is dangerous.
 *
 * User beware. Here be dragons.
 */
/*
JSON.debug = {};

// Keep the old versions around
JSON.debug.parse = JSON.parse.bind(JSON);
JSON.debug.stringify = JSON.stringify.bind(JSON);

// We use this to prevent us from spamming the log if a
// specific class isn't able to be found in the serialiser
// Also contains a count of the number of non-serialised object
// for a given classname/path
JSON.debug.stringifyMissingClasses = {};
JSON.debug.stringifyClasses = {};
JSON.debug.parseMissingClasses = {};
JSON.debug.parseClasses = {};

JSON.proto = Object.freeze({
	key: "__json_class__",
	path: "__json_class_path__",
	reviver: "__json_class_reviver__",
});
JSON.stringify = function (o, userReplacer, ...args) {
	return JSON.debug.stringify.call(
		this,
		o,
		(key, val) => {
			let nextVal = val;
			try {
				if (val && typeof val === "object" && val.constructor !== Object && !Array.isArray(val)) {
					const classCtor = Object.getPrototypeOf(val).constructor;
					const classPath = classCtor.prototype[JSON.proto.path] || classCtor.name;
					if (JSON.debug.getFromPath(classPath)) {
						nextVal = {
							[JSON.proto.key]: classPath,
							...val,
						};
						if (!JSON.debug.stringifyClasses[classPath]) {
							console.log(`클래스 ${classPath} 객체를 직렬화합니다`);
							JSON.debug.stringifyClasses[classPath] = 0;
						}
						JSON.debug.stringifyClasses[classPath]++;
					} else {
						if (!JSON.debug.stringifyMissingClasses[classPath]) {
							console.warn(`클래스 ${classPath} 객체 직렬화에 실패했습니다. 다음과 같은 객체는 건너뜁니다`, val);
							JSON.debug.stringifyMissingClasses[classPath] = 0;
						}
						JSON.debug.stringifyMissingClasses[classPath]++;
					}
				}
			} catch (e) {
				console.error(`JSON.parse에서 치명적인 오류가 발생했습니다. 계속 진행을 시도합니다`, e);
			} finally {
				return userReplacer ? userReplacer(key, nextVal) : nextVal;
			}
		},
		...args
	);
};
JSON.debug.getFromPath = function getFromPath(path) {
	return (path || "").split(".").reduce((nextObj, nextPathPart) => {
		return (nextObj || {})[nextPathPart];
	}, window);
};

JSON.parse = function (string, userReviver, ...args) {
	return JSON.debug.parse.call(
		this,
		string,
		(key, val) => {
			let nextVal = val;
			const className = val[JSON.proto.key];
			if (className) {
				const maybeClass = JSON.debug.getFromPath(className);
				if (maybeClass && (typeof maybeClass === "object" || typeof maybeClass === "function")) {
					nextVal = JSON.revive(maybeClass, val);
					if (!JSON.debug.parseClasses[className]) {
						console.log(`클래스 ${className} 객체를 복원했습니다`, maybeClass);
						JSON.debug.parseClasses[className] = 0;
					}
					JSON.debug.parseClasses[className]++;
				} else {
					if (!JSON.debug.parseMissingClasses[className]) {
						console.warn(`클래스 ${className} 인스턴스 파싱에 실패했습니다. 다음과 같은 객체는 건너뜁니다`, val, maybeClass);
						JSON.debug.parseMissingClasses[className] = 0;
					}
					JSON.debug.parseMissingClasses[className]++;
				}
			}
			delete nextVal[JSON.proto.key];
			return userReviver ? userReviver(key, nextVal) : nextVal;
		},
		...args
	);
};
JSON.revive = function (reviverClass, data) {
	let nextVal = Object.create(
		reviverClass.prototype,
		Object.entries(data).reduce((acc, [key, val]) => {
			acc[key] = { value: val, configurable: true, writeable: true, enumerable: true };
			return acc;
		}, {})
	);
	if (reviverClass[JSON.proto.reviver]) {
		try {
			nextVal = reviverClass[JSON.proto.reviver].call(nextVal);
		} catch (e) {
			console.error(`사용자 정의 클래스 ${reviverClass.name} 복원에 실패했습니다`, e);
		}
	}
	return nextVal;
};
*/
