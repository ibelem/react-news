import React, {Component} from 'react';
import '../App.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/fontawesome-free-solid';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import classNames from 'classnames';

import { Button } from '../Buttons';

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse(),
};

const Sort = ({ sortKey, onSort, children, activeSortKey }) => {
  const sortClass = classNames('button-inline', { 'button-active' 
  : sortKey === activeSortKey});
  const faicon = 'faicon';
 
  return (
    <div>
      { 
        sortKey === activeSortKey ? <FontAwesomeIcon className={faicon} icon={faSort} size="1x" /> : ''
      }
      <Button 
        className = {sortClass}
        onClick={()=> onSort(sortKey)}>
        {children}
      </Button>
    </div>
  );
};


Sort.prototypes = {
  onSort: PropTypes.func,
  sortKey: PropTypes.string,
  activeSortKey: PropTypes.string,
  children: PropTypes.node,
};

class Table extends Component { 
  constructor(props){
    super(props);
    this.state = {
      sortKey: 'NONE',
      isSortReverse: false,
    };
    this.onSort = this.onSort.bind(this);
  }

  onSort(sortKey) {
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
    this.setState({ sortKey, isSortReverse });
  }

  render() {
    const {
      list, 
      onDismiss 
    } = this.props;

    const {
      sortKey, 
      isSortReverse, 
    } = this.state;
  
    const smallColumn = {
      width: '10%',
    };

    const sortedList = SORTS[sortKey](list);
    const reverseSortedList = isSortReverse 
      ? sortedList.reverse()
      : sortedList;

    return (
      <div className='table'>
        <div className='table-header'>
          <span style={{ width: '20%' }}>
            <Sort
              sortKey= {'TITLE'}
              onSort={this.onSort}
              activeSortKey = {sortKey}
            >
              Title
            </Sort>
          </span>
          <span style={{ width: '20%' }}>
            <Sort
              sortKey= {'AUTHOR'}
              onSort={this.onSort}
              activeSortKey = {sortKey}
            >
              Author
            </Sort>
          </span>
          <span style={{ width: '20%' }}>
            <Sort
              sortKey= {'COMMENTS'}
              onSort={this.onSort}
              activeSortKey = {sortKey}
            >
              Comments
            </Sort>
          </span>
          <span style={{ width: '20%' }}>
            <Sort
              sortKey= {'POINTS'}
              onSort={this.onSort}
              activeSortKey = {sortKey}
            >
              Points
            </Sort>
          </span>
        </div>
        {
          // list.filter(isSearched(pattern)).map(item =>
          reverseSortedList.map(item =>
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
  }
}     

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
  onSort: PropTypes.func,
  isSortReverse: PropTypes.bool,
  sortKey: PropTypes.string,
};

export default Table;