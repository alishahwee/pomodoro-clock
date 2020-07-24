import React, { Component } from 'react';
import SessionLength from './SessionLength';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timerOn: false,
      timerMode: 'Session',
    }
  }
  render() {
    return (
      <div className='Timer'>
        <SessionLength timerMode={this.state.timerMode} />
      </div>
    );
  }
}

export default Timer;
