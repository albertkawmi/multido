import * as actions from '../actions';

export function createDropHandler(parentKey, childKey) {
  return ({ source, target }) => (dispatch, getState) => {
    const parent = getState()[parentKey];
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
    const action = actions[parentKey].updateSuccess;
    if (source.id) dispatch(action(updatedSource));
    if (target.id) dispatch(action(updatedTarget));
  };
}
