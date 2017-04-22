import { updateFor } from './crud';

function createDropHandler(parentKey, childKey) {
  return ({ source, target }) => (dispatch, getState) => {
    const parent = getState()[parentKey];

    const existingSource = parent[source.id];
    const updatedSource = {
      ...existingSource,
      [childKey]: source.elements
    };

    const existingTarget = parent[target.id];
    const updatedTarget = {
      ...existingTarget,
      [childKey]: target.elements
    };

    const shouldUpdateTarget = target.id !== source.id;

    try {
      const update = updateFor(parentKey);
      update(updatedSource)(dispatch, getState);
      if (shouldUpdateTarget) update(updatedTarget)(dispatch, getState);
    } catch (error) {
      console.error(error);
    }
  };
}

export const handleItemDrop = createDropHandler('lists', 'items');
export const handleListDrop = createDropHandler('boards', 'lists');
