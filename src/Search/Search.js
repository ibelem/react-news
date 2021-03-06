import React from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import { SubmitButton } from '../Buttons';

const Search = ({value, onChange, onSubmit, children}) => {
  return (
    <form onSubmit={onSubmit}>
      <input type='text' value={value} onChange={onChange} />
      <SubmitButton>{ children }</SubmitButton>
    </form>
  );
};

Search.prototypes = {
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  value: PropTypes.string,
  children: PropTypes.node,
};

export default Search;