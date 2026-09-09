/**
 * ?stroke - Selects from various adjectives and verbs to return
 *            a phrase such as: "passionately caress".
 */
Template.add("stroke", function () {
	const adjective = V.consensual === 1 ? either("열정적으로", "부드럽게") : either("조심스럽게");
	const verb = V.consensual === 1 ? either("쓰다듬는다", "어루만진다", "만진다", "주무른다", "끌어안는다") : either("쓰다듬는다", "만진다");
	return `${adjective} ${verb}`;
});

/* ?alongside */
Template.add("alongside", () =>
	either("나란히", "나란히", "박자에 맞춰", "마구잡이로", "리듬에 맞춰", "짓눌러대며", "밀어붙이며")
);

/* ?orgasmMoans */
Template.add("orgasmMoans", () => either("신음한다", "끙끙댄다", "헐떡인다", "한숨을 내쉰다", "비명을 지른다", "흐느낀다", "웃음을 터뜨린다"));
