const ImageCache = (() => {
	const cacheEntries = new Map();

	function getOrCreate(src) {
		if (!src) {
			throw new Error("ImageCache: src는 비어 있지 않은 문자열이어야 합니다.");
		}

		const existing = cacheEntries.get(src);
		if (existing) {
			return existing.promise;
		}

		const image = new Image();
		let resolvePromise;
		let rejectPromise;
		const promise = new Promise((resolve, reject) => {
			resolvePromise = resolve;
			rejectPromise = reject;
		});

		const cacheEntry = { image, promise };
		cacheEntries.set(src, cacheEntry);

		image.onload = () => resolvePromise(image);
		image.onerror = () => {
			cacheEntries.delete(src);
			rejectPromise(new Error(`경로 ${src}의 이미지를 불러올 수 없습니다`));
		};
		image.src = src;

		return cacheEntry.promise;
	}

	return {
		getOrCreate,
	};
})();

window.ImageCache = ImageCache;
