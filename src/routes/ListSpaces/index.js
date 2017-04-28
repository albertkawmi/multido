import { connect } from 'react-redux';
import ListSpaces from './ListSpaces';

const mapStateToProps = (state, ownProps) => ({
  spaces: Object.values(state.spaces)
});

export default connect(mapStateToProps)(ListSpaces);
