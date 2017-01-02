import React, { Component } from 'react';
import { Motion, spring } from 'react-motion'
import SegmentEffect from './components/SegmentEffect';
import MouseFocus from './components/MouseFocus';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <MouseFocus/>
        <SegmentEffect/>
      </div>
    );
  }
}

export default App;
