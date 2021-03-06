import React, { Component } from 'react';

class TextArea extends Component {
  componentDidMount() {
    this.updateHeight(true);
  }
  componentDidUpdate() {
    this.updateHeight();
  }
  handleChange = (ev) => {
    const { onChange } = this.props
    if (onChange) onChange(ev);

    this.updateHeight();
  }
  updateHeight = (firstRender) => {
    if (!this.ref) return;

    let { borderTopWidth, borderBottomWidth } = window.getComputedStyle(this.ref);
    borderTopWidth = parseInt(borderTopWidth, 10);
    borderBottomWidth = parseInt(borderBottomWidth, 10);

    this.ref.rows = '1';
    this.ref.style.minHeight = '0';
    this.ref.style.resize = 'none';
    if (!firstRender) this.ref.style.height = 'auto';
    this.ref.style.height = (this.ref.scrollHeight + borderTopWidth + borderBottomWidth) + 'px';
  }
  render() {
    return (
      <textarea
        {...this.props}
        ref={el => { this.ref = el; }}
        onChange={this.handleChange}
      />
    );
  }
}

export default TextArea;
