import crud from 'redux-crud';

export default {
    boards: crud.Map.reducersFor('boards'),
    lists: crud.Map.reducersFor('lists'),
    items: crud.Map.reducersFor('items')
};
