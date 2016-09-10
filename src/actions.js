const ITEM_ID = 'data-item-id';
const LIST_ID = 'data-list-id';

export default function bindActions(app) {
  const state = app.state;
  const setState = app.setState.bind(app);

  return {
    createList,
    toggleItem,
    updateAllLists,
    handleItemDropped,
    getBoard,
    getList,
    getItem,
  }

  function getBoard(id) {
    return state.boards[id];
  }

  function getList(id) {
    return state.lists[id];
  }

  function getItem(id) {
    return state.items[id];
  }

  function createList(id, items) {
    setState({
      lists: {
        ...state.lists,
        [id]: items
      }
    });
  }

  function updateAllLists(listsThatChanged) {
    setState({
      lists: {
        ...state.lists,
        ...listsThatChanged
      }
    });
  }

  function toggleItem(id) {
    setState({
      items: {
        ...state.items,
        [id]: {
          ...state.items[id],
          completed: !state.items[id].completed
        }
      }
    });
  }

  function handleItemDropped(el, target, source /*, sibling */) {
    // if no target we can't do anything
    if (!target) return;
    // update the target list of ids
    const targetId = target.getAttribute(LIST_ID);
    const updatedTarget = Array.from(target.children)
      .map(child => child.getAttribute(ITEM_ID));
    const updatedLists = {
      [targetId]: updatedTarget
    };
    // update the source list of ids
    if (source) {
      const sourceId = source.getAttribute(LIST_ID);
      const updatedSource = Array.from(source.children)
        .map(child => child.getAttribute(ITEM_ID));
      updatedLists[sourceId] = updatedSource;
    }
    // update state with the new lists
    updateAllLists(updatedLists);
  }
}
