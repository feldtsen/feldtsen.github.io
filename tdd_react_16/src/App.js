import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div>
          <h1>Task 16</h1>
        <Button/>
      </div>
    );
  }
}

class Button extends Component {
  render(){
    return(
        <button>Click</button>
    )
  }
}

