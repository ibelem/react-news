import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/fontawesome-free-solid';
import './App.css';
import { 
  DEFAULT_QUERY,
  DEFAULT_HPP,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP,
} from './constants';
import { Button } from './Buttons';
import { Search } from './Search';
import { Table } from './Table';

// const Loading = () =>
//   <div><FontAwesomeIcon icon={faSpinner} spin size="2x" /></div>;

const withLoading = (Component) => ({isLoading, ...rest}) =>
  isLoading ? <div><FontAwesomeIcon icon={faSpinner} spin size="2x" /></div>
    : <Component { ...rest } />;

const ButtonWithLoading = withLoading(Button);


const updateSearchTopStoriesState = (hits, page) => (prevState) => {
  const { searchKey, results } = prevState;
  const oldHits = results && results[searchKey] 
    ? results[searchKey].hits 
    : [];
  const updatedHits = [
    ...oldHits, 
    ...hits
  ];

  return {
    results: {
      ...results, 
      [searchKey]: { hits: updatedHits, page },
    },
    isLoading: false
  };
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: null,
      isLoading: false,
    };

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
  }

  setSearchTopStories(result) {
    const { hits, page } = result;
    this.setState(updateSearchTopStoriesState(hits, page));
  }
    
  fetchSearchTopStories(searchTerm, page = 0) {
    // const URL = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`;
    // console.log(URL);
    this.setState({ isLoading: true });
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response=> response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => this.setState({ error: e }));
  }

  onDismiss(id) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);

    this.setState({ 
      results: { 
        ...results, 
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onSearchSubmit(event){
    const {searchTerm} = this.state;
    this.setState({ searchKey: searchTerm });
    if(this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
    event.preventDefault();
  }

  componentDidMount() {
    const {searchTerm} = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }

  // render() {
  //   const { searchTerm, result } = this.state;
  //   if(!result) { return null; }
  //   console.log(this.state);

  //   return (
  //     <div className='page'>
  //       <div className='interactions'>
  //         <Search value={searchTerm} onChange={this.onSearchChange} onSubmit={this.onSearchSubmit}>
  //         Search
  //         </Search>
  //       </div>
  //       { 
  //         result && <Table list={result.hits} pattern={searchTerm} onDismiss={this.onDismiss} />
  //       }
  //     </div>
  //   );
  // }
 

  render() {
    const { searchTerm, results, 
      searchKey, error, isLoading, 
      // sortKey, isSortReverse
    } = this.state;

    const page = (results && results[searchKey] && results[searchKey].page) || 0;
    const list = (results && results[searchKey] && results[searchKey].hits) || [];
    // console.log(this.state);

    return (
      <div className='page'>
        <div className='interactions'>
          <Search value={searchTerm} onChange={this.onSearchChange} onSubmit={this.onSearchSubmit}>
          Search
          </Search>
        </div>
        { error ? <div className='page'>{ error.toString() }</div>
          : <Table list={list} 
            // sortKey={sortKey}
            // isSortReverse = {isSortReverse}
            // onSort={this.onSort} 
            onDismiss={this.onDismiss} />
        }
        <div className='interactions'>
          <ButtonWithLoading
            isLoading={isLoading}
            onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
            More
          </ButtonWithLoading>
        </div>
      </div>
    );
  }
}

export default App;
export {
  Button,
  Search,
  Table,
};