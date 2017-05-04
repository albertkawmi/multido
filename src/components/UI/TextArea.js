import React from 'react';
import Radium from 'radium';
import { TextArea } from 'semantic-ui-react';

const WithRadium = Radium(TextArea);

const Wrapped = (props) =>
  <WithRadium
    {...props}
    autoHeight
    style={{
      ...props.style
    }}
  />

export default Wrapped;
