import React from 'react';
import '../App.css';

const SubmitButton = ({ children }) => {
  return (
    <button type='submit'>{children}</button>
  );
};

export default SubmitButton;