import { PropTypes } from 'react';

export const context = {
  actions: PropTypes.object
};

export const templates = {
  boards: {
    id: 'bd',
    title: '',
    lists: []
  },
  lists: {
    id: 'ls',
    title: '',
    items: []
  },
  items: {
    id: 'i',
    text: '',
    completed: false
  }
};

export const parent = {
  items: 'lists',
  lists: 'boards',
  boards: 'spaces'
}
