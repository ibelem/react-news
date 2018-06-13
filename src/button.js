import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Button extends Component {
  render() {
    const { onClick, className, children } = this.pros;
    return (
      <button onClick={onClick} className={className} type='button'>{children}</button>
    );
  }
}

export default App;
