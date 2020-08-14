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
      timer: 1500,
    }
    this.clockify = this.clockify.bind(this);
  }

  clockify() {
    let minutes = Math.floor(this.state.timer / 60);
    let seconds = this.state.timer - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return minutes + ':' + seconds;
  }
  
  render() {
    return (
      <div className='Timer'>
        <SessionLength timerMode={this.state.timerMode} clockify={this.clockify} />
      </div>
    );
  }
}

export default Timer;
