import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { dndContainer } from 'react-dragula-hoc';
import List from '../List';

const ContainerRow = ({ children }) => <section className="row__items">{children}</section>;

const DndRow = dndContainer({
  containerType: 'rows',
  acceptType: 'lists',
  handleClassName: 'list__title',
  direction: 'horizontal'
})(ContainerRow);

class Row extends Component {
  componentDidUpdate() {
    if (this.shouldScroll) {
      this.rootEl.scrollLeft = this.rootEl.scrollWidth;
      this.shouldScroll = false;
    }
  }
  onNewListClicked() {
    this.shouldScroll = true;
    this.props.onListCreated();
  }
  handleRef(component) {
    this.rootEl = ReactDOM.findDOMNode(component);
  }
  render() {
    const {
      row: { id: rowId, title },
      lists,
      onListDrop,
      onTitleChange,
    } = this.props;
    return (
      <div className="row">
        <input
          className="row__title"
          value={title}
          onChange={onTitleChange}
          placeholder="Untitled Row"
        />
        <DndRow ref={this.handleRef.bind(this)} id={rowId} onChange={onListDrop}>
          {lists.map(
            list => <List list={list} id={list.id} key={list.id} />
          )}
        </DndRow>
        <button
          className="row__new-list"
          onClick={this.onNewListClicked.bind(this)} >
          + New List
        </button>
      </div>
    );
  }
}

export default Row;
