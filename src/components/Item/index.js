import { connect } from 'react-redux';
import Item from './Item';
import { updateItem } from '../../actions/crud';

const mapDispatchToProps = (dispatch, { item }) => ({
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
  )
});

export default connect(null, mapDispatchToProps)(Item);
