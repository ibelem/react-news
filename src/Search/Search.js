import React from 'react';
import '../App.css';
import { SubmitButton } from '../Buttons';

const Search = ({value, onChange, onSubmit, children}) => {
  return (
    <form onSubmit={onSubmit}>
      <input type='text' value={value} onChange={onChange} />
      <SubmitButton>{ children }</SubmitButton>
    </form>
  );
};

export default Search;