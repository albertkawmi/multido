import { connect } from 'react-redux';
import Item from './Item';
import { updateItem, deleteItem } from '../../actions/crud';
import { selectItem } from '../../actions/selection';

const mapStateToProps = ({ selected }, { item }) => ({
  selected: selected.item && selected.item === item.id
});

const mapDispatchToProps = (dispatch, { item, parent }) => ({
  onTextChange: ev => dispatch(
    updateItem({
      ...item,
      text: ev.target.value
    })
  ),
  onToggleCompleted: () => dispatch(
    updateItem({
      ...item,
      completed: !item.completed
    })
  ),
  onSelected: () => dispatch(
    selectItem(item.id)
  ),
  onDelete: () => dispatch(
    deleteItem(item, parent)
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(Item);
