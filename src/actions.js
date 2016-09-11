import uuid from 'uuid';

const ITEM_ID = 'data-item-id';
const LIST_ID = 'data-list-id';
const BOARD_ID = 'data-board-id';

export default function bindActions(app) {
  return {
    getBoard,
    createList,
    getList,
    getItem,
    addItemToList,
    addListToBoard,
    updateListTitle,
    createItem,
    updateItem,
    toggleItem,
    handleItemDropped,
    handleListDropped
  }

  function getBoard(id) {
    return app.state.boards[id];
  }

  function getList(id) {
    return app.state.lists[id];
  }

  function getItem(id) {
    return app.state.items[id];
  }

  function createItem() {
    const id = newId('item');
    return {
      id,
      text: '',
      completed: false
    };
  }

  function createList() {
    const id = newId('list');
    return {
      id,
      title: '',
      items: []
    };
  }

  function addListToBoard(boardId) {
    const newList = createList();
    app.setState({
      lists: {
        ...app.state.lists,
        [newList.id]: newList
      },
      boards: {
        ...app.state.boards,
        [boardId]: {
          ...app.state.boards[boardId],
          lists: [
            ...app.state.boards[boardId].lists,
            newList.id
          ]
        }
      }
    })
  }

  function updateItem(id, newValue) {
    app.setState({
      items: {
        ...app.state.items,
        [id]: {
          ...app.state.items[id],
          text: newValue
        }
      }
    });
  }

  function updateListTitle(id, newValue) {
    app.setState({
      lists: {
        ...app.state.lists,
        [id]: {
          ...app.state.lists[id],
          title: newValue
        }
      }
    });
  }

  function addItemToList(listId) {
    const newItem = createItem();
    app.setState({
      items: {
        ...app.state.items,
        [newItem.id]: newItem
      },
      lists: {
        ...app.state.lists,
        [listId]: {
          ...app.state.lists[listId],
          items: [
            ...app.state.lists[listId].items,
            newItem.id
          ]
        }
      }
    })
  }

  function toggleItem(id) {
    app.setState({
      items: {
        ...app.state.items,
        [id]: {
          ...app.state.items[id],
          completed: !app.state.items[id].completed
        }
      }
    });
  }

  function handleItemDropped(el, target, source /*, sibling */) {
    if (!target || !source) return;
    // update the target list of ids
    const targetId = target.getAttribute(LIST_ID);
    const updatedTargetItems = getItems(target, ITEM_ID);
    // update the source list of ids
    const sourceId = source.getAttribute(LIST_ID);
    const updatedSourceItems = getItems(source, ITEM_ID);
    // update state with the new lists
    app.setState({
      lists: {
        ...app.state.lists,
        [sourceId]: {
          ...app.state.lists[sourceId],
          items: updatedSourceItems
        },
        [targetId]: {
          ...app.state.lists[targetId],
          items: updatedTargetItems
        }
      }
    });
  }

  function handleListDropped(el, target, source) {
    if (!target || !source) return;
    // update the target board
    const targetId = target.getAttribute(BOARD_ID);
    const updatedTargetItems = getItems(target, LIST_ID);
    // update the source board
    const sourceId = source.getAttribute(BOARD_ID);
    const updatedSourceItems = getItems(source, LIST_ID);
    // update state with the new boards
    app.setState({
      boards: {
        ...app.state.boards,
        [sourceId]: {
          ...app.state.boards[sourceId],
          lists: updatedSourceItems
        },
        [targetId]: {
          ...app.state.boards[targetId],
          lists: updatedTargetItems
        },
      }
    });
  }
}

function getItems(el, attr) {
  return Array
    .from(el.querySelectorAll(`[${attr}]`))
    .map(el => el.getAttribute(attr));
}

function newId(prefix) {
  return [ 
    prefix || '',
    prefix ? '-' : '',
    uuid.v1()
  ].join('');
}
