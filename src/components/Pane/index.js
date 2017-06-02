import React from 'react';
import { connect } from 'react-redux';

const Pane = ({ item }) =>
	item ?
		<div className="pane">
			<h3>{item.text}</h3>
			<p>ID: {item.id}</p>
		</div>
	:
		<div className="pane">
			<p>Double-click an item's handle to select it.</p>
		</div>

const mapStateToProps = ({ selected, items }) => ({
	item: items[selected.item]
});

export default connect(mapStateToProps)(Pane);
