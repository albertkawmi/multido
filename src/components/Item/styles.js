const textAreaBase = {
  width: '100%',
  padding: '0.5rem',
  margin: '0 0.5rem',
  border: 0,
  background: 'none',
  fontFamily: 'Helvetica, Arial, sans-serif',
  fontSize: '1rem',
};

const textAreaFocus = {
  ':focus': {
    background: 'lightyellow',
  },
};

export const getTextAreaStyle = (completed) => ({
  ...textAreaBase,
  ...textAreaFocus,
  ...(completed && {
    color: 'gray',
    textDecoration: 'line-through',
  }),
});
