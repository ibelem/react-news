import React, { Component } from 'react';
import './App.css';


const list = [
  {
    title: '俄罗斯',
    url: 'https://facebook.github.io/react',
    author: '北极',
    num_comments: 3,
    points: 4,
    objectID: 123,
  },
  {
    title: '火星',
    url: 'https://github.com/reactjs/redux',
    author: '面壁',
    num_comments: 20,
    points: 5,
    objectID: 204,
  },
  {
    title: 'VUE',
    url: 'https://github.com/reactjs/redux',
    author: 'Issac',
    num_comments: 2,
    points: 5,
    objectID: 309,
  },
  {
    title: 'Nuxt',
    url: 'https://github.com/reactjs/redux',
    author: 'Illos',
    num_comments: 2,
    points: 5,
    objectID: 469,
  },
];

const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase());

// class Search extends Component {
//   render(){
//     const { value, onChange, children } = this.props;
//     return (
//       <form>
//         { children } <input type='text' value={value} onChange={onChange} />
//       </form>
//     );
//   }
// }

// 重构为函数式无状态组件
// function Search(props) {
//   const { value, onChange, children } = props;
//   return (
//     <form>
//       { children } <input type='text' value={value} onChange={onChange} />
//     </form>
//   );
// }

// function Search({value, onChange, children}) {
//   return (
//     <form>
//       { children } <input type='text' value={value} onChange={onChange} />
//     </form>
//   );
// }

const Search = ({value, onChange, children}) => {
  return (
    <form>
      { children } <input type='text' value={value} onChange={onChange} />
    </form>
  );
};

// class Table extends Component {
//   render(){
//     const { list, pattern, onDismiss } = this.props;
//     return (
//       <div>
//         {
//           list.filter(isSearched(pattern)).map(item =>
//             <div key={item.objectID}>
//               <span><a href={item.url}>{item.objectID} {item.title}</a></span>
//               <span>{item.author}</span>
//               <span>{item.num_comments}</span>
//               <span>{item.points}</span>
//               <span>
//                 <button onClick={() => onDismiss(item.objectID)} type='button'>
//                   Dismiss
//                 </button>
//               </span>
//             </div>
//           )
//         }
//         <Button onClick={()=> { console.log('CHINA5'); }}>Click Me 5</Button>
//       </div>
//     );
//   }
// }

// function Table ({ list, pattern, onDismiss }) {
//   return (
//     <div>
//       {
//         list.filter(isSearched(pattern)).map(item =>
//           <div key={item.objectID}>
//             <span><a href={item.url}>{item.objectID} {item.title}</a></span>
//             <span>{item.author}</span>
//             <span>{item.num_comments}</span>
//             <span>{item.points}</span>
//             <span>
//               <button onClick={() => onDismiss(item.objectID)} type='button'>
//                 Dismiss
//               </button>
//             </span>
//           </div>
//         )
//       }
//       <Button onClick={()=> { console.log('CHINA5'); }}>Click Me 5</Button>
//     </div>
//   );
// }
const Table = ({ list, pattern, onDismiss }) => {
  const smallColumn = {
    width: '10%',
  };

  return (
    <div className='table'>
      {
        list.filter(isSearched(pattern)).map(item =>
          <div key={item.objectID} className='table-row'>
            <span style={{ width: '20%' }}><a href={item.url}>{item.objectID} {item.title}</a></span>
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
      <Button onClick={()=> { console.log('CHINA5'); }}>Click Me 5</Button>
    </div>
  );
};

// class Button extends Component {
//   render() {
//     const { onClick, className, children } = this.props;
//     return (
//       <button onClick={onClick} className={className} type='button'>{children}</button>
//     );
//   }
// }

// function Button ({ onClick, className, children }) {
//   return (
//     <button onClick={onClick} className={className} type='button'>{children}</button>
//   );
// }

const Button = ({ onClick, className, children }) => {
  return (
    <button onClick={onClick} className={className} type='button'>{children}</button>
  );
};

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list,
      searchTerm: ''
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    const { searchTerm, list } = this.state;
    return (
      <div className='page'>
        <div className='interactions'>
          <Search value={searchTerm} onChange={this.onSearchChange}>
          Search2
          </Search>
        </div>
        <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />
      </div>
    );
  }
}

export default App;
