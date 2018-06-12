import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


const list = [
  { title: 'React',
    url: 'https://facebook.github.io/react',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  { title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 100,
  },  
];

class App extends Component {

  constructor(pros) {
    super(pros);
  }

  render() {
    return (
      <div className='App'>
        { list.map(item =>  
          <div key={item.objectID}>
            <a href={item.url}>{item.objectID} {item.title}</a><br/>
            <span>{item.num_comments}</span><br/>
            <span>{item.points}</span>
          </div>
        )}
      </div>
    );
  }
}

export default App;
