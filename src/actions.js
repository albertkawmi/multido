import uuid from 'uuid';

const ITEM_ID = 'data-item-id';
const LIST_ID = 'data-list-id';
const BOARD_ID = 'data-board-id';

const templates = {
  board: {
    id: 'board-0',
    title: '',
    lists: []
  },
  list: {
    id: 'list-0',
    title: '',
    items: [] 
  },
  item: {
    id: 'item-0',
    text: '',
    completed: false
  }
};

export default function bindActions(app) {
  const update = Object.keys(app.state).reduce((all, entity) => ({
    ...all,
    [entity]: updaterFor(entity)
  }), {});

  return {
    get,
    update,
    addItemToList,
    addListToBoard,
    addNewBoard,
    handleItemDropped,
    handleListDropped
  };

  function get(type, id) {
    return app.state[type][id];
  }

  function create(type) {
    return {
      ...templates[type],
      id: newId(type)
    };
  }

  function updaterFor(entity) {
    return (id, newProps) => app.setState({
      [entity]: {
        ...app.state[entity],
        [id]: {
          ...app.state[entity][id],
          ...newProps
        }
      }
    });
  }

  function addNewBoard() {
    const newBoard = create('board');
    app.setState({
      boards: {
        ...app.state.boards,
        [newBoard.id]: newBoard
      }
    });
  }

  function addListToBoard(boardId) {
    const newList = create('list');
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

  function addItemToList(listId) {
    const newItem = create('item');
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
