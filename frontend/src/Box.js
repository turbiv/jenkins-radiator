import React, {PropTypes} from 'react';
import {Col} from 'react-flexbox-grid';
import box from './box.scss';

const Box = (props) => {
  return (
    <Col {...props}>
      <div className = {box[props.type || 'box']}>
        {props.children}
      </div>
    </Col>
  );
};



export default Box;