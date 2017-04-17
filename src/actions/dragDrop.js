import * as actions from '../actions';

export const handleDrop = (parentKey, childKey) => ({ source, target }) => (dispatch, getState) => {
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
  source.id && dispatch(action(updatedSource));
  target.id && dispatch(action(updatedTarget));
}
