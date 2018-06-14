import React from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import { Button } from '../Buttons';

const Table = ({ list, onDismiss }) => {
  const smallColumn = {
    width: '10%',
  };

  return (
    <div className='table'>
      {
        // list.filter(isSearched(pattern)).map(item =>
        list.map(item =>
          <div key={item.objectID} className='table-row'>
            <span style={{ width: '60%' }}><a href={item.url}>{item.objectID} {item.title}</a></span>
            <span style={ smallColumn }>{item.author}</span>
            <span style={{ width: '5%' }}>{item.num_comments}</span>
            <span style={{ width: '5%' }}>{item.points}</span>
            <span>
              <Button onClick={() => onDismiss(item.objectID)} className='button-inline'>
              Dismiss
              </Button>
            </span>
          </div>
        )
      }
    </div>
  );
};

Table.prototypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape(
      {
        objectID: PropTypes.string.isRequired,
        author: PropTypes.string,
        url: PropTypes.string,
        num_comments: PropTypes.number,
        points: PropTypes.number,
      }
    )
  ).isRequired,
  onDismiss: PropTypes.func,
};

export default Table;