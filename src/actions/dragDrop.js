import { updateFor } from './crud';

export function createDropHandler(parentKey, childKey) {
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

    const exSourceCompare = existingSource[childKey].toString();
    const updSourceCompare = updatedSource[childKey].toString();
    const exTargetCompare = existingTarget[childKey].toString();
    const updTargetCompare = updatedTarget[childKey].toString();

    const shouldUpdateSource = source.id
      && exSourceCompare !== updSourceCompare;

    const shouldUpdateTarget = target.id
      && target.id !== source.id
      && exTargetCompare !== updTargetCompare;

    try {
      const update = updateFor(parentKey);
      if (shouldUpdateSource) update(updatedSource)(dispatch, getState);
      if (shouldUpdateTarget) update(updatedTarget)(dispatch, getState);
    } catch (error) {
      console.error(error);
    }
  };
}
