import Vue from 'vue';
import {clonElement} from '../utils/utils.js';

Vue.directive('table', {
	inserted: function(el, binding) {
		let table = clonElement(el);
		el.appendChild(table);
		console.log(table);
		// let table = el.querySelector('.table');
		// let tempTable = table.cloneNode(true);
		// tempTable.querySelector('tbody').remove();
		// tempTable.style.position = 'fixed';
		// tempTable.style.top = '0';
		// tempTable.style.left = el.offsetLeft + 'px';
		// tempTable.style.display = 'none';
		// el.appendChild(tempTable);
		// window.addEventListener('scroll', function(e) {
		// 	if (document.body.scrollTop > table.offsetTop) {
		// 		tempTable.style.display = 'table';
		// 	} else {
		// 		tempTable.style.display = 'none';
		// 	}
		// })
		// console.log(binding);
	}
});