import { connect } from 'react-redux';
import Row from './Row';
import { createList, updateRow } from '../../actions/crud';
import { handleListDrop } from '../../actions/dragDrop';

const mapStateToProps = (state, { row }) => ({
  lists: row.lists.map(listId => state.lists[listId])
});

const mapDispatchToProps = (dispatch, { row }) => ({
  onTitleChange: ev => dispatch(
    updateRow({ ...row, title: ev.target.value })
  ),
  onListCreated: () => dispatch(
    createList(row.id)
  ),
  onListDrop: dropInfo => dispatch(
    handleListDrop(dropInfo)
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Row);
