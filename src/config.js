import { PropTypes } from 'react';

export const context = {
  actions: PropTypes.object
};

// TODO: rename rows -> rows
export const templates = {
  spaces: {
    id: 'sp',
    title: '',
    rows: []
  },
  rows: {
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
  lists: 'rows',
  rows: 'spaces'
}
