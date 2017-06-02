import crud from 'redux-crud';
import selectionReducer from './selectionReducer';

export default {
	spaces: crud.Map.reducersFor('spaces'),
	rows: crud.Map.reducersFor('rows'),
	lists: crud.Map.reducersFor('lists'),
	items: crud.Map.reducersFor('items'),
	selected: selectionReducer
};
