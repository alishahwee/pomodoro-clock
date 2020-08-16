import React, { Component } from 'react';
import SessionLength from './SessionLength';
import TimerLengthControl from './TimerLengthControl';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      btnState: 'Start',
      timerOn: false,
      timerMode: 'Session',
      timer: 1500,
    };
    this.clockify = this.clockify.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState === this.state) return;
    if (prevState.timerOn) {
      this.setState({
        btnState: 'Stop',
      });
    } else {
      this.setState({
        btnState: 'Start',
      });
    }
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
        <SessionLength
          timerMode={this.state.timerMode}
          clockify={this.clockify}
          btnState={this.state.btnState}
        />
        <TimerLengthControl
          titleId='break-label'
          minId='break-decrement'
          addId='break-increment'
          lengthId='break-length'
          title='Break Length'
          length={this.state.breakLength}
        />
        <TimerLengthControl
          titleId='session-label'
          minId='session-decrement'
          addId='session-increment'
          lengthId='session-length'
          title='Session Length'
          length={this.state.sessionLength}
        />
      </div>
    );
  }
}

export default Timer;
