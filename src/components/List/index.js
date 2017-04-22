import { connect } from 'react-redux';
import List from './List';
import { createItem, updateList } from '../../actions/crud';
import { handleItemDrop } from '../../actions/dragDrop';

const mapStateToProps = (state, ownProps) => ({
  items: ownProps.list.items.map(itemId => state.items[itemId])
});

const mapDispatchToProps = (dispatch, { list }) => ({
  onListTitleChange: ev => dispatch(
    updateList({ ...list, title: ev.target.value })
  ),
  onItemCreated: () => dispatch(
    createItem(list.id)
  ),
  onItemDrop: dropInfo => dispatch(
    handleItemDrop(dropInfo)
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
