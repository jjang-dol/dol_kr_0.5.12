Weather.Renderer.Layers = (() => {
	const layers = new Map();

	function addLayer(params) {
		if (!StartConfig.enableImages) return [];

		const optionalParams = {
			defaultParameters: {},
		};
		params = { ...optionalParams, ...params };

		if (layers.has(params.name)) {
			console.error(new Error(`이름이 '${params.name}'인 레이어가 이미 존재하며 덮어씁니다.`));
		}

		if (!params.effects) {
			console.error(new Error(`레이어 '${params.name}'에 효과가 없습니다.`));
			return;
		}
		const layer = new Weather.Renderer.Layer(params.name, params.blur, params.zIndex, params.animation);
		params.effects.map(p => layer.addEffect(p.effect, p.params, p.bindings, p.drawCondition, p.compositeOperation));
		layers.set(params.name, layer);

		return layer.loadPromises;
	}

	return {
		layers,
		add: addLayer,
	};
})();
