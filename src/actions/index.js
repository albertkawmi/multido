import uuid from 'uuid';
import { templates } from '../config';
import crud from 'redux-crud';

export const boards = crud.actionCreatorsFor('boards');
export const lists = crud.actionCreatorsFor('lists');
export const items = crud.actionCreatorsFor('items');

export default function bindActions(app) {
  const update = Object.keys(app.state).reduce((all, entity) => ({
    ...all,
    [entity]: updaterFor(entity)
  }), {});

  return {
    get,
    getState,
    update,
    addItemToList,
    addListToBoard,
    addNewBoard,
    handleDrop
  };

  function get(type, id) {
    return app.state[type][id];
  }

  function getState() {
    return app.state;
  }

  function create(type) {
    const template = templates[type];
    return {
      ...template,
      id: newId(template.id)
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

  function handleDrop(parentKey, childKey) {
    const parent = app.state[parentKey];
    return ({ source, target }) => {
      const updatedSource = {
        [source.id]: {
          ...parent[source.id],
          [childKey]: source.elements
        }
      };
      const updatedTarget = {
          [target.id]: {
            ...parent[target.id],
            [childKey]: target.elements
          }
      };
      app.setState({
        [parentKey]: {
          ...parent,
          ...(source.id && updatedSource),
          ...(target.id && updatedTarget)
        }
      });
    }
  }
}

function newId(prefix) {
  return [
    prefix || '',
    prefix ? '-' : '',
    uuid.v1()
  ].join('');
}
