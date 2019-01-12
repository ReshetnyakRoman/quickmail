import React from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';
import { animation } from 'config';

function AnimWrapper(props) {
  return (
    <Motion
      defaultStyle={{ x: -50 }}
      style={{ x: spring(0, animation.emailListConfig) }}
    >
      {({ x }) => (
        <div style={{ transform: `translateY(${x}%)` }}>{props.children}</div>
      )}
    </Motion>
  );
}

AnimWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default AnimWrapper;
