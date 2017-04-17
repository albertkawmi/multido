import { PropTypes } from 'react';

export const context = {
  actions: PropTypes.object
};

export const templates = {
  board: {
    id: 'bd',
    title: '',
    lists: []
  },
  list: {
    id: 'ls',
    title: '',
    items: []
  },
  item: {
    id: 'i',
    text: '',
    completed: false
  }
};
