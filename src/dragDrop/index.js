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
  direction = 'vertical'
}) => (ComponentToWrap) => {
  const WrappedComponent = ensureClassComponent(ComponentToWrap);

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
    rootEl = null

    componentWillMount() {
      dndStore[containerType].on('drop', (el, target, source) => {
        if (!target || !source) return;
        const targetId = target.getAttribute(CONTAINER_ID);
        /**
         * NOTE:
         * the on 'drop' handler fires for _ALL_ containers
         * the next line prevents any further work being done for
         * unrelated containers.
         *
         * TODO: investigate if this should be further optimised
         */
        if (targetId !== this.props[idProp]) return;

        // update the list of ids in the target container
        const updatedTargetElements = getAttrValues(DRAGGABLE_ID, target);
        // update the list of ids in the source container (if different to target)
        const sourceId = source.getAttribute(CONTAINER_ID);
        const updatedSourceElements = sourceId === targetId
          ? updatedTargetElements
          : getAttrValues(DRAGGABLE_ID, source);

        // TODO: remove log
        // console.log('DROP:', this.props[idProp], targetId, sourceId);
        this.props.onDrop({
          source: { id: sourceId, elements: updatedSourceElements },
          target: { id: targetId, elements: updatedTargetElements }
        });
      })
    }
    componentWillUnmount() {
      // TODO: confirm that no further clean-up is needed
      const { containers } = dndStore[containerType];
      containers.splice(
        containers.indexOf(this.rootEl),
        1
      );
    }
    rootRef(component) {
      const el = ReactDOM.findDOMNode(component);
      if (!el) return;
      const id = this.props[idProp];
      el.setAttribute(CONTAINER_TYPE, containerType)
      el.setAttribute(CONTAINER_ID, id);
      const { containers } = dndStore[containerType];
      this.rootEl = el;
      const existingIndex = containers.findIndex(
        existing => existing.getAttribute(CONTAINER_ID) === id
      );
      if (existingIndex > -1) {
        containers[existingIndex] = el;
      } else {
        containers.push(el);
      }
      // TODO: remove log
      // console.log(
      //   containerType,
      //   el.getAttribute(CONTAINER_ID),
      //   dndStore[containerType].containers.length
      // );
    }
    render() {
      return (
        <WrappedComponent
          {...this.props}
          ref={this.rootRef.bind(this)}
          key={`${containerType}-${this.props.children.length}`} />
      );
    }
  };
}

export const dndElement = ({
  idProp = 'id',
  type
}) => (ComponentToWrap) => {
  const WrappedComponent = ensureClassComponent(ComponentToWrap);

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

function getAttrValues(attr, el) {
  // TODO: using something custom instead of 'id'
  // can't 100% rely on 'id' being unique
  const originalId = el.getAttribute('id');
  // an ID attribute is used to select only direct child elements
  let tempId;
  if (!originalId) {
    tempId = `TEMP_ID_${Date.now()}`
    el.setAttribute('id', tempId);
  }

  // find matching elements and map to the required attr
  const scopeId = originalId || tempId;
  const matchingAttrs = Array
    // TODO: does it _have_ to be immediate children?
    .from(el.querySelectorAll(`#${scopeId} > [${attr}]`))
    .map(el => el.getAttribute(attr));

  // remove the tempId, if needed
  if (!originalId) el.removeAttribute('id');

  return matchingAttrs;
}

/**
 * This is needed so that we can attach a ref to get the root DOM node
 * for drag-and-drop purposes
 */
function ensureClassComponent(ComponentToWrap) {
  const isStateless = typeof ComponentToWrap.prototype.render !== 'function';

  return isStateless
    ? convertToClass(ComponentToWrap)
    : ComponentToWrap;
}

function convertToClass(StatelessComponent) {
  return class extends Component {
    render = () => <StatelessComponent {...this.props} />;
  };
}
