export const clonElement = (sourceEle) => {
	return cloneEle(sourceEle);
};

function cloneEle(sourceEle) {
	let tempEle;
	if (sourceEle.childElementCount > 0) {
		tempEle = sourceEle.cloneNode(false);
		for (let i = 0; i < sourceEle.children.length; i++) {
			let child = cloneEle(sourceEle.children[i]);
			// child.addEventListener('click', function(e) {
			// 	sourceEle.children[i].click();
			// 	e.preventDefault();
			// });
			tempEle.appendChild(child);
		}
	} else {
		tempEle = sourceEle.cloneNode(true);
		// tempEle.addEventListener('click', function() {
		// 	sourceEle.click();
		// });
	}
	return tempEle;

}