import crud from 'redux-crud';

export default {
    spaces: crud.Map.reducersFor('spaces'),
    rows: crud.Map.reducersFor('rows'),
    lists: crud.Map.reducersFor('lists'),
    items: crud.Map.reducersFor('items'),
};
