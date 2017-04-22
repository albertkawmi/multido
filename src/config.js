import { PropTypes } from 'react';

export const context = {
  actions: PropTypes.object
};

// TODO: rename boards -> rows
export const templates = {
  spaces: {
    id: 'sp',
    title: '',
    boards: []
  },
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
