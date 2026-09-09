/*
 * As part of various refactors, many global namespace variables were created.
 * This is a single spot to document them and create top-level namespaces.
 */

/**
 * Declare everything in a root namespace so that things can still be found if shadowed and for "documentation" purposes.
 */
window.DOL = {
	// In pseudo-load order

	/**
	 * This is a miniature application reporter app. It helps get detailed error messages to devs.
	 * See file {@link ./01-error/error.js} for more.
	 */
	Errors: {},
	/**
	 * Registry of state schema, used for migrating DoL to new versions.
	 * See {@link ./02-version/.init.js} for more.
	 */
	Versions: {},
	// The following are patches to make javascript execution more consistent (see comment below).
	State,
	setup,
	Wikifier,
	Template,
};

/* Make each of these namespaces available at the top level as well */
window.defineGlobalNamespaces = namespaces => {
	Object.entries(namespaces).forEach(([name, namespaceObject]) => {
		try {
			if (window[name] && window[name] !== namespaceObject) {
				console.warn(
					`${name}【을를】 전역 네임스페이스에 설정하려 했지만 이미 사용 중입니다. 이 할당을 건너뜁니다. 기존 객체:`,
					window[name]
				);
			} else {
				// Make it more difficult to shadow/overwrite things (users can still Object.defineProperty if they really mean it
				Object.defineProperty(window, name, { value: namespaceObject, writeable: false });
			}
		} catch (e) {
			if (window[name] !== namespaceObject) {
				console.error(`전역 네임스페이스 객체 ${name} 설정에 실패했습니다. 계속 진행을 시도합니다. 원본 오류:`, e);
			}
		}
	});
};
defineGlobalNamespaces(DOL);

/*
 * Patches to make javascript execution more consistent
 * OR: Why we alias SugarCube.State as State:
 *
 *
 * When sugarcube executes code, it makes the global value `State`
 * the sugarcube state, but other globals like `SugarCube.State` don't exist
 *
 * By making this alias, if you simply use `State` to refer to state, it does not
 * matter if your code is executing inside of sugarcube or not. It'll always just work
 *
 * To elaborate further, we don't use `SugarCube.State` here as global initialisation is considered
 * sugarcube execution. `SugarCube.State` (currently) does not exist, but `State` (note, *not* window.State)
 * exists.
 */

/** Uncomment the following lines to get a better idea about how sugarcube makes certain globals available. */

/*
function sugarCubeGlobals() {
	return {
		"State": typeof State !== 'undefined' ? State : '',
		"SugarCube": typeof SugarCube !== 'undefined' ? SugarCube : '',
		"SugarCube.State": typeof SugarCube !== 'undefined' ? (SugarCube || {}).State || '' : '',
		"window.State": window.State || '',
		"window.SugarCube": window.SugarCube || '',
		"window.SugarCube.State": (window.SugarCube || {}).State || ''
	}
}
$(document).on(':passageinit', () => {
	console.log(`:passageinit:`, sugarCubeGlobals());
});
$(document).on(':passageend', () => {
	console.log(`:passageend:`, sugarCubeGlobals());
	setTimeout(() => {
		console.log(`:passageend [after]:`, sugarCubeGlobals());
	})
})
*/
