Weather.Renderer.Effects = (() => {
	const effects = new Map();

	function addEffect(params) {
		const optionalParams = {
			defaultParameters: {},
		};
		params = { ...optionalParams, ...params };

		if (effects.has(params.name)) {
			console.error("Effects", `이름이 '${params.name}'인 효과가 이미 존재하며 덮어씁니다.`);
		}
		effects.set(params.name, params);
	}

	return {
		effects,
		add: addEffect,
	};
})();
