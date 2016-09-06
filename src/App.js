import React, { Component } from 'react';
import Dragula from 'react-dragula';
import ReactDOM from 'react-dom';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: {
        hash0: [
          'hash1',
          'hash2',
          'hash3',
        ],
        hash4: [
          'hash5',
          'hash6',
          'hash7',
        ]
      },
      items: {
        hash1: <ToggleItem>Item for hash 1</ToggleItem>,
        hash2: <ToggleItem>Item for hash 2</ToggleItem>,
        hash3: <ToggleItem>Item for hash 3</ToggleItem>,
        hash5: <ToggleItem>Item for hash 5</ToggleItem>,
        hash6: <ToggleItem>Item for hash 6</ToggleItem>,
        hash7: <ToggleItem>Item for hash 7</ToggleItem>
      }
    };
    this.initDragula = this.initDragula.bind(this);
  }
  componentWillMount() {
    setInterval(() => {
      this.setState({
        items: {
          ...this.state.items,
          hash2: <ToggleItem>Random item {Math.floor(Math.random() * 10)}</ToggleItem>
        }
      });
    }, 5000);
    this.drake = Dragula([], {
      accepts() {
        return true;
      }
    });
    this.drake.on('drop', (el, target, source) => {
      if (!target) return;
      const targetId = target.getAttribute('data-id');
      const newTarget = Array.from(target.children)
          .map(child => child.getAttribute('data-id'));
      const updatedLists = {
        [targetId]: newTarget
      };
      if (source) {
        const sourceId = source.getAttribute('data-id');
        const newSource = Array.from(source.children)
          .map(child => child.getAttribute('data-id'));
        updatedLists[sourceId] = newSource;
      }
      this.setState({
        lists: {
          ...this.state.lists,
          ...updatedLists
        }
      });
    });
  }
  componentWillUpdate(nextProps, nextState) {
    console.debug(nextState);
  }
  componentWillUnmount() {
    this.drake.destroy();
  }
  initDragula(container) {
    if (container) {
      this.drake.containers.push(container);
    }
  }
  render() {
    return (
      <div className="container">
        {Object.keys(this.state.lists).map(listId =>
          <DragAndDropList
            key={listId + Date.now()} // changing key forces re-render whole component
            listId={listId}
            init={this.initDragula}
            list={this.state.lists[listId]}
            items={this.state.items}
          />
        )}
      </div>
    );
  }
}

class ToggleItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    }
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({ active: !this.state.active})
  }
  render() {
    return (
      <span style={{
        color: this.props.active
          ? 'green'
          : 'black'
      }}>
        <input type="checkbox" onChange={this.toggle}/>
        {this.props.children}
      </span>
    );
  }
}

class DragAndDropList extends Component {
  shouldComponentUpdate() {
    return true;
  }
  render() {
    const { list, listId, items, init } = this.props;
    return (
      <ul className="dnd" ref={el => init(el)} data-id={listId}>
        {list.map(id => <li key={id} data-id={id}>{items[id]}</li>)}
      </ul>
    );
  }
}
