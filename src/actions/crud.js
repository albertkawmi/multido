import crud from 'redux-crud';
import cuid from 'cuid';
import { templates, parent } from '../config';

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

export const createFor = entityType => parentId => (dispatch, getState) => {
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

export const deleteFor = entityType => (item, parentId) => (dispatch, getState) => {
	const {
		deleteStart,
		deleteSuccess,
		deleteError
	} = crud.actionCreatorsFor(entityType);
	const parentType = 'lists';
	const updateParent = updateFor(parentType);
	const startAction = deleteStart(item);
	dispatch(startAction);
	try {
		const successAction = deleteSuccess(item);
		dispatch(successAction);
		const existingParent = getState()[parentType][parentId];
		const updatedParent = {
			...existingParent,
			[entityType]: existingParent[entityType].filter(
				id => id !== item.id
			)
		};
		return updateParent(updatedParent)(dispatch, getState);
	} catch (error) {
		const errorAction = deleteError(error);
		dispatch(errorAction);
	}
};

export const createItem = createFor('items');
export const updateItem = updateFor('items');
export const deleteItem = deleteFor('items');

export const createList = createFor('lists');
export const updateList = updateFor('lists');

export const createRow = createFor('rows');
export const updateRow = updateFor('rows');

export const createSpace = createFor('spaces');
export const updateSpace = updateFor('spaces');
