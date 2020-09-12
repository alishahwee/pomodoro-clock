import React, { Component } from 'react';
import SessionLength from './SessionLength';
import TimerLengthControl from './TimerLengthControl';
import accurateInterval from 'accurate-interval';

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
      intervalID: undefined,
    };
    this.controlTimer = this.controlTimer.bind(this);
    this.beginCountdown = this.beginCountdown.bind(this);
    this.switchTimer = this.switchTimer.bind(this);
    this.decreaseTimer = this.decreaseTimer.bind(this);
    this.controlLength = this.controlLength.bind(this);
    this.setBreakLength = this.setBreakLength.bind(this);
    this.setSessionLength = this.setSessionLength.bind(this);
    this.clockify = this.clockify.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const timerOnDidUpdate = prevState.timerOn !== this.state.timerOn;

    if (this.state.timerOn && timerOnDidUpdate) {
      this.setState({
        btnState: 'Stop',
      });
    } else if (timerOnDidUpdate) {
      this.setState({
        btnState: 'Start',
      });
    }
  }

  controlTimer() {
    if (this.state.timerOn) {
      this.state.intervalID && this.state.intervalID.clear(); // Stop timer
      this.setState({ timerOn: false, });
    } else {
      this.beginCountdown(); // Start timer
      this.setState({ timerOn: true, });
    }
  }

  beginCountdown() {
    this.setState({
      intervalID: accurateInterval(this.decreaseTimer, 1000),
    });
  }

  switchTimer() {
    // TODO
  }

  decreaseTimer() {
    this.setState((prevState) => ({timer: prevState.timer - 1}));
  }

  resetTimer() {
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      btnState: 'Start',
      timerOn: false,
      timerMode: 'Session',
      timer: 1500,
      intervalID: undefined,
    });
    this.state.intervalID && this.state.intervalID.clear();
  }

  controlLength() {
    if (this.state.timerOn) return; // Disable if timer is on

  }

  setBreakLength(e) {
    const currentLength = this.state.breakLength;
    const value = e.currentTarget.value;

    if (value === '-' && currentLength !== 1) {
      this.setState((prevState) => ({ breakLength: prevState.breakLength - 1 }));
    } else if (value === '+' && currentLength !== 60) {
      this.setState((prevState) => ({ breakLength: prevState.breakLength + 1 }));
    }
  }

  setSessionLength(e) {
    const currentLength = this.state.breakLength;
    const value = e.currentTarget.value;

    if (value === '-' && currentLength !== 1) {
      this.setState((prevState) => ({ sessionLength: prevState.sessionLength - 1 }));
    } else if (value === '+' && currentLength !== 60) {
      this.setState((prevState) => ({ sessionLength: prevState.sessionLength + 1 }));
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
          controlTimer={this.controlTimer}
          resetTimer={this.resetTimer}
        />
        <TimerLengthControl
          titleId='break-label'
          minId='break-decrement'
          addId='break-increment'
          lengthId='break-length'
          title='Break Length'
          length={this.state.breakLength}
          setLength={this.setBreakLength}
        />
        <TimerLengthControl
          titleId='session-label'
          minId='session-decrement'
          addId='session-increment'
          lengthId='session-length'
          title='Session Length'
          length={this.state.sessionLength}
          setLength={this.setSessionLength}
        />
        <audio
          id='beep'
          preload='auto'
          src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'
          ref={(audio) => {
            this.audioBeep = audio;
          }}
        />
      </div>
    );
  }
}

export default Timer;
