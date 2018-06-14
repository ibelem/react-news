import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';


const list = [
  {
    title: '中国',
    url: 'https://facebook.github.io/react',
    author: '民族',
    num_comments: 3,
    points: 4,
    objectID: 1,
  },
  {
    title: '世界',
    url: 'https://github.com/reactjs/redux',
    author: '全球',
    num_comments: 20,
    points: 5,
    objectID: 2,
  },
  {
    title: 'React',
    url: 'https://github.com/reactjs/redux',
    author: 'Daniel',
    num_comments: 2,
    points: 5,
    objectID: 3,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 4,
  },
];

const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list,
      searchTerm: ''
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onClickMe1 = this.onClickMe1.bind(this); //FB preferred
    //this.onClickMe2 - No necessary to bind here
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onClickMe1() {
    console.log(this);
  }

  onClickMe2 = () => {
    console.log(this);
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value })
  }

  // render() {
  //   return (
  //     <div className='App'>
  //       { this.state.list.map(item =>  
  //         <div key={item.objectID}>
  //           <span><a href={item.url}>{item.objectID} {item.title}</a></span> 
  //           <span>{item.author}</span> 
  //           <span>{item.num_comments}</span> 
  //           <span>{item.points}</span>
  //           <span>
  //             <button onClick={ () => this.onDismiss(item.objectID)} type='button'>
  //              Dismiss
  //             </button>
  //           </span>
  //         </div>
  //       )}
  //   );
  // }

  render() {
    const { searchTerm, list } = this.state;
    return (
      <div className='App'>
        {list.map(item => {
          const onHandlerDismiss = () => {
            this.onDismiss(item.objectID)
          }

          return (
            <div key={item.objectID}>
              <span><a href={item.url}>{item.objectID} {item.title}</a></span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
              <span>
                <button onClick={onHandlerDismiss} type='button'>
                  Dismiss
              </button>
              </span>
            </div>
          )

        }

        )}

        <button onClick={() => this.onClickMe1()} type='button'>
          Click Me 1
        </button>

        <button onClick={this.onClickMe2} type='button'>
          Click Me 2
        </button>

        <button onClick={console.log('CHINA3')} type='button'>
          Click Me 3
        </button>

        <button onClick={() => { console.log('CHINA4') }} type='button'>
          Click Me 4
        </button>

        <form>
          <input type='text' onChange={ this.onSearchChange } value={searchTerm} />
        </form>
        { list.filter(isSearched(this.state.searchTerm)).map(
          item => item.title
        )}
      </div>
    );
  }
}

export default App;
