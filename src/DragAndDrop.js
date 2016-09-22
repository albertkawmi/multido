import React, { Component } from 'react';
import Dragula from 'react-dragula';

export default class DragAndDrop extends Component {
  componentWillMount() {
    const { handleClassName } = this.props;
    this.droppable = Dragula([], {
      accepts(el, target, source, sibling) {
        return el.getAttribute('data-draggable-id')
          && target.getAttribute('data-container-id');
      },
      moves(el, source, handle, sibling) {
        return handleClassName
          ? handle.classList.contains(handleClassName)
          : true;
      },
      direction: this.props.direction
    })
    .on('drop', this.onDrop.bind(this));
  }
  onDrop(el, target, source) {
    if (!target || !source) return;
    // update the target list of ids
    const targetId = target.getAttribute('data-container-id');
    const updatedTargetItems = getItems(target, 'data-container-id', 'data-draggable-id');
    // update the source list of ids
    const sourceId = source.getAttribute('data-container-id');
    const updatedSourceItems = getItems(source, 'data-container-id', 'data-draggable-id');
    this.props.onChange({
      source: { id: sourceId, items: updatedSourceItems },
      target: { id: targetId, items: updatedTargetItems }
    });
  }
  render() {
    const { lists } = this.props;
    const arrayOfLists = Object.keys(lists).map(listId => ({
      id: listId,
      items: lists[listId].items
    }));
    return (
      <div>
        {arrayOfLists.map(({ id, items }) => 
          <Container
            id={id}
            containers={this.droppable.containers}
            items={items}
            {...this.props}
            key={`${id}-has-${items.length}-items`} />
        )}
      </div>
    );
  }
}

DragAndDrop.defaultProps = {
  direction: 'vertical'
};

class Container extends Component {
  bindContainer(el) {
    this.props.containers.push(el);
  }
  render() {
    const {
      id,
      items,
      ItemComponent,
      itemClassName,
      ListComponent,
      listClassName
    } = this.props;
    return (
      <ListComponent listId={id}>
        <ul
          data-container-id={id}
          ref={el => this.bindContainer(el)}        
          className={listClassName}>
          {items.map(itemId => (
            <Draggable id={itemId} key={itemId} className={itemClassName}>
              <ItemComponent itemId={itemId} />
            </Draggable>
          ))}
        </ul>
      </ListComponent>
    );
  }
}

const Draggable = ({ id, className, children }) =>
  <li data-draggable-id={id} {...{className}}>
    {children}
  </li>

function getItems(el, parent, child) {
  return Array
    .from(el.querySelectorAll(`[${parent}] > [${child}]`))
    .map(el => el.getAttribute(child));
}
