/**
 * (Low-level API)
 * Prepare a layer to be rendered.
 *
 * See {@link CompositeLayerSpec} definition for details on options.
 *
 * Arguments are processed depending on their type:
 * String argument is `src` option (image source)
 * Number argument is `z` option (z-index)
 * Object argument is full or partial CompositeLayerSpec object
 * Leftmost arguments have most priority.
 *
 * @example
 * <<run canvaslayer(10, 'img.png', {blendMode:'hard-light', blend:'#00ff00'});>>
 * <<run canvaslayer({z:10, src:'img.png'}, {blendMode:'hard-light', blend:'#00ff00'});>>
 */
function canvaslayer() {
	const layers = T.CanvasLayers;
	if (!layers) throw new Error("'canvasstart' 없이 'canvaslayer()'가 호출되었습니다");

	let theOptions = {};
	for (let i = arguments.length - 1; i >= 0; i--) {
		const arg = arguments[i];
		switch (typeof arg) {
			case "object":
				theOptions = Object.assign(theOptions, arg);
				break;
			case "string":
				theOptions.src = arg;
				break;
			case "number":
				theOptions.z = arg;
				break;
			default:
				throw new Error("잘못된 canvaslayer() 인수 " + i + ": " + typeof arg);
		}
	}

	if (typeof theOptions.src !== "string") {
		console.error(arguments);
		throw new Error("canvaslayer() 옵션에 'src'가 누락되었습니다");
	}
	layers.push(theOptions);
}
window.canvaslayer = canvaslayer;

// use 2x2 pixels in generated images
Renderer.pixelSize = 2;

Renderer.Stats = {
	trace: false,
	traceAnim: false,
	lastLoadTime: 0,
	lastRenderTime: 0,

	logmsgLoad: new ObservableValue(""),
	logmsgRender: new ObservableValue(""),
	logmsgAnimate: new ObservableValue(""),

	nlayers: 0,
	ncached: 0,
};
/**
 * @type {Renderer.RendererListener}
 */
Renderer.defaultListener = {
	error(error) {
		// strip source data
		const msg = (error.stack || error.message || "" + error).replace(/\(?[^( )]*:\d+:\d+\)?/gm, "").replace(/\(?eval at [\w.]+/gm, "");
		Errors.report(msg);
	},
	composeLayers(layers) {
		Renderer.Stats.loadErrors = 0;
		if (Renderer.Stats.trace) {
			console.log(performance.now().toFixed(3), layers.length + "개 레이어 합성 중...");
		}
	},
	processingStep(layer, processing, canvas, dt) {
		Perflog.logWidgetTime("_render:" + processing, dt);
	},
	loadError(layer, src) {
		// logged to console by Renderer itself
		Renderer.Stats.loadErrors++;
		Errors.report("레이어 " + layer + "의 이미지 로드에 실패했습니다: " + src);
	},
	loadingDone(time, layersLoaded) {
		Renderer.Stats.lastLoadTime = time;
		let msg = layersLoaded + "개 이미지를 " + time.toFixed(3) + "ms 만에 로드했습니다";
		if (Renderer.Stats.loadErrors > 0) msg += " (" + Renderer.Stats.loadErrors + "개 실패)";
		Renderer.Stats.logmsgLoad.value = msg;
		if (Renderer.Stats.trace) {
			console.log(performance.now().toFixed(3), msg);
		}
	},
	beforeRender(layers) {
		Renderer.Stats.nlayers = layers.length;
		Renderer.Stats.ncached = 0;
	},
	layerCacheHit(layer) {
		Renderer.Stats.ncached++;
	},
	renderingDone(time) {
		Renderer.Stats.lastRenderTime = time;
		const msg = Renderer.Stats.nlayers + "개 레이어 렌더링 완료 (" + Renderer.Stats.ncached + "개 캐시됨), " + time.toFixed(3) + "ms";
		if (Renderer.Stats.trace) {
			console.log(performance.now().toFixed(3), msg);
		}
		Renderer.Stats.logmsgRender.value = msg;
	},
	keyframe(animation, keyframeIndex, keyframe) {
		if (Renderer.Stats.traceAnim) {
			console.log(
				performance.now().toFixed(3),
				"애니메이션",
				animation,
				"키프레임",
				keyframeIndex,
				"프레임",
				keyframe.frame,
				"지속 시간",
				keyframe.duration
			);
		}
	},
	keyframeRender(spec, cacheHit, cacheRenderTime) {
		if (Renderer.Stats.traceAnim) {
			console.log(
				performance.now().toFixed(3),
				"키프레임 렌더링",
				spec,
				cacheHit ? "캐시 적중, 렌더링 시간 " + cacheRenderTime.toFixed(3) + "ms" : "캐시 미스"
			);
		}
		if (cacheHit && Renderer.Stats.logmsgAnimate) {
			Renderer.Stats.logmsgAnimate.value = "캐시된 키프레임을 " + cacheRenderTime.toFixed(3) + "ms 만에 렌더링했습니다";
		}
	},
	animationStop() {
		if (Renderer.Stats.traceAnim) {
			console.log(performance.now().toFixed(3), "애니메이션 정지");
		}
	},
};

function refreshCanvas(model) {
	requestAnimationFrame(() => {
		const canvasModel = Renderer.locateModel(model, "sidebar");
		if (canvasModel.canvas) {
			Renderer.invalidateLayerCaches(canvasModel.layerList);
			canvasModel.redraw();
		}
	});
}

function refreshModels(e, overlay) {
	if (overlay === "options") {
		refreshCanvas("lighting");
	}
}

/* Events */
$(document).on(":passagestart", () => {
	if (State.current !== State.top) {
		Skin.recache();
	}
});
$(document).on(":onloadsave", () => {
	Skin.recache();
	refreshCanvas("lighting");
});
$(document).on(":enginerestart", () => {
	Skin.recache();
});
$(document).on(":oncloseoverlay", refreshModels);
