import crud from 'redux-crud';
import cuid from 'cuid';
import { templates, parent } from '../config';
import { plural } from '../utils';

export const updateFor = entityType => updatedEntity => (dispatch, getState) => {
	const existingEntity = getState()[entityType][updatedEntity.id];
	const {
		updateStart,
		updateSuccess,
		updateError
	} = crud.actionCreatorsFor(entityType);

	const startAction = updateStart(existingEntity);
	dispatch(startAction);

	try {
		const successAction = updateSuccess(updatedEntity);
		return dispatch(successAction);
	} catch (error) {
		const errorAction = updateError(error);
		return dispatch(errorAction);
	}
};

export const create = (type) => (parentId) => (dispatch, getState) => {
	const entityType = plural(type);
	const parentType = parent[entityType];
	const {
		createStart,
		createSuccess,
		createError
	} = crud.actionCreatorsFor(entityType);

	const id = cuid();
	const newEntity = {
		...templates[entityType],
		id
	};

	const startAction = createStart(newEntity);
	dispatch(startAction);

	try {
		const successAction = createSuccess(newEntity, id);
		dispatch(successAction);

		const updateParent = updateFor(parentType);
		const existingParent = getState()[parentType][parentId];
		const updatedParent = {
			...existingParent,
			[entityType]: [...existingParent[entityType], id]
		};
		return updateParent(updatedParent)(dispatch, getState);
	} catch (error) {
		const errorAction = createError(error);
		return dispatch(errorAction);
	}
};
