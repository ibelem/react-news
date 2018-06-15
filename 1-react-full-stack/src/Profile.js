import React, { Component } from 'react';
import './App.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [1, 2, 3, 4, 5],
      activeIndex: -1
    };
  }
  activate(index) {
    this.setState({
      activeIndex: index
    });
  }
  render() {
    const { list, activeIndex } = this.state;
    const lis = list.map(
      (item, index) => {
        const cls = index === activeIndex ? 'active': '';
        return(
          <li
            key={index}
            className={cls}
            onClick={()=> this.activate(index)}>{list[index]}
          </li>
        );
      }
    );
    return <ul>{lis}</ul>;
    
  }
}

export default Profile;