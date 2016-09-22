import uuid from 'uuid';

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
