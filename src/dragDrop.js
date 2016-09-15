import Dragula from 'react-dragula';

export default {
  items: Dragula([], {
    accepts(el, target, source, sibling) {
      return el.getAttribute('data-item-id')
        && target.getAttribute('data-list-id');
    },
    moves(el, source, handle, sibling) {
      return handle.classList.contains('item__handle')
    },
    direction: 'vertical'
  }),
  lists: Dragula([], {
    accepts(el, target, source, sibling) {
      return el.classList.contains('list')
        && target.classList.contains('board__items')
    },
    moves(el, source, handle, sibling) {
      return handle.classList.contains('list__title');
    },
    direction: 'horizontal'
  })
};
