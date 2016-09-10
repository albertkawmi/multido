import Dragula from 'react-dragula';

export default {
	items: Dragula([], {
		accepts(el, target, source, sibling) {
			return el.getAttribute('data-item-id')
				&& target.getAttribute('data-list-id');
		}
	})
};