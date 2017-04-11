import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Dragula from 'react-dragula';

const DRAGGABLE_TYPE = 'dnd-draggable-type';
const DRAGGABLE_ID = 'dnd-draggable-id';
const CONTAINER_TYPE = 'dnd-container-type';
const CONTAINER_ID = 'dnd-container-id';

const dndStore = {};

export const dndContainer = ({
  idProp = 'id',
  containerType,
  acceptType,
  handleClassName,
  direction = 'vertical',
  onDrop
}) => (WrappedComponent) => {
  if (!dndStore[containerType]) {
    dndStore[containerType] = Dragula([], {
      accepts(el, target) {
        return el.getAttribute(DRAGGABLE_TYPE) === acceptType
          && target.getAttribute(CONTAINER_TYPE) === containerType;
      },
      moves(el, source, handle) {
        if (!handleClassName) return true;
        return handle.classList.contains(handleClassName);
      },
      direction
    });
  }
  return class extends Component {
    componentWillMount() {
      dndStore[containerType].on('drop', (el, target, source) => {
        if (!target || !source) return;
        // update the target list of ids
        const targetId = target.getAttribute(CONTAINER_ID);
        const updatedTargetElements = getElements(target, DRAGGABLE_ID);
        // update the source list of ids
        const sourceId = source.getAttribute(CONTAINER_ID);
        const updatedSourceElements = sourceId === targetId
          ? updatedTargetElements
          : getElements(source, DRAGGABLE_ID);
        // update state with the new lists
        this.props.onDrop({
          source: { id: sourceId, elements: updatedSourceElements },
          target: { id: targetId, elements: updatedTargetElements }
        });
      })
    }
    rootRef(component) {
      const el = ReactDOM.findDOMNode(component);
      if (!el) return;
      el.setAttribute(CONTAINER_TYPE, containerType)
      el.setAttribute(CONTAINER_ID, this.props[idProp]);
      dndStore[containerType].containers.push(el);
    }
    render() {
      return <WrappedComponent
        ref={this.rootRef.bind(this)}
        key={`${containerType}-${this.props.children.length}`}
        {...this.props} />
    }
  };
}

export const dndElement = ({
  idProp = 'id',
  type
}) => (WrappedComponent) => {
  return class extends Component {
    rootRef(component) {
      const el = ReactDOM.findDOMNode(component);
      if (!el) return;
      el.setAttribute(DRAGGABLE_ID, this.props[idProp]);
      el.setAttribute(DRAGGABLE_TYPE, type);
    }
    render() {
      return (
        <WrappedComponent {...this.props} ref={this.rootRef.bind(this)}/>
      );
    }
  }
};

function getElements(el, attr) {
  return Array
    .from(el.querySelectorAll(`[${attr}]`))
    .map(el => el.getAttribute(attr));
}
