import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

const Button = ({ onClick, className, children }) => {
  return (
    <button onClick={onClick} className={className} type='button'>{children}</button>
  );
};

Button.prototypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
};

Button.defaultProps = {
  className: '',
};

export default Button;