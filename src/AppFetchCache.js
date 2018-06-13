import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'react';
const DEFAULT_HPP = '3';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

// const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase());

const Button = ({ onClick, className, children }) => {
  return (
    <button onClick={onClick} className={className} type='button'>{children}</button>
  );
};

const Search = ({value, onChange, onSubmit, children}) => {
  return (
    <form onSubmit={onSubmit}>
      <input type='text' value={value} onChange={onChange} />
      <button type='submit'>{ children }</button>
    </form>
  );
};

const Table = ({ list, pattern, onDismiss }) => {
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
              <button onClick={() => onDismiss(item.objectID)} type='button' className='button-inline'>
                Dismiss
              </button>
            </span>
          </div>
        )
      }
    </div>
  );
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: null,
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
    const { searchKey, results } = this.state;
    const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
    const updatedHits = [...oldHits, ...hits];
  
    this.setState({
      results: {
        ...results, 
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    const URL = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`;
    console.log(URL);

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
    const { searchTerm, results, searchKey, error } = this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0;
    const list = (results && results[searchKey] && results[searchKey].hits) || [];
    console.log(this.state);

    return (
      <div className='page'>
        <div className='interactions'>
          <Search value={searchTerm} onChange={this.onSearchChange} onSubmit={this.onSearchSubmit}>
          Search
          </Search>
        </div>
        { error ? <div className='page'>{ error.toString() }</div>
          : <Table list={list} onDismiss={this.onDismiss} />
        }
        <div className='interactions'>
          <Button onClick={()=> this.fetchSearchTopStories(searchKey, page + 1)}>
          More 
          </Button>
        </div>
      </div>
    );
  }
}

export default App;