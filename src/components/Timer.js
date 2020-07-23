import React, { Component } from 'react';
import SessionLength from './SessionLength';

class Timer extends Component {
  render() {
    return (
      <div className='Timer'>
        <SessionLength />
      </div>
    );
  }
}

export default Timer;
