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
    this.switchMode = this.switchMode.bind(this);
    this.decreaseTimer = this.decreaseTimer.bind(this);
    this.setBreakLength = this.setBreakLength.bind(this);
    this.setSessionLength = this.setSessionLength.bind(this);
    this.clockify = this.clockify.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    // Change button label based on timer being on or off
    if (prevState.timerOn !== this.state.timerOn) {
      if (this.state.timerOn) {
        this.setState({
          btnState: 'Stop',
        });
      } else {
        this.setState({
          btnState: 'Start',
        });
      }
    }

    // Buzz when timer hits zero
    if (this.state.timer === 0) {
      this.alarm.play();
    }

    // Alternate timer mode whenever break/session hits zero
    if (this.state.timer < 0) {
      if (this.state.timerMode === 'Session') {
        this.state.intervalID && this.state.intervalID.clear();
        this.beginCountdown();
        this.switchMode(this.state.breakLength, 'Break');
      } else if (this.state.timerMode === 'Break') {
        this.state.intervalID && this.state.intervalID.clear();
        this.beginCountdown();
        this.switchMode(this.state.sessionLength, 'Session');
      }
    }

    // Change timer length based on mode when timer is off
    if (!this.state.timerOn) {
      if (prevState.breakLength !== this.state.breakLength) {
        if (this.state.timerMode === 'Break') {
          this.setState({ timer: this.state.breakLength * 60 });
        }
      } else if (prevState.sessionLength !== this.state.sessionLength) {
        if (this.state.timerMode === 'Session') {
          this.setState({ timer: this.state.sessionLength * 60 });
        }
      }
    }
  }

  controlTimer() {
    if (this.state.timerOn) {
      this.state.intervalID && this.state.intervalID.clear(); // Stop timer
      this.setState({ timerOn: false });
    } else {
      this.beginCountdown(); // Start timer
      this.setState({ timerOn: true });
    }
  }

  // Use Accurate-Timer to call decreaseTimer every one second and assign it to state
  beginCountdown() {
    this.setState({
      intervalID: accurateInterval(this.decreaseTimer, 1000),
    });
  }

  switchMode(time, mode) {
    this.setState({
      timer: time * 60,
      timerMode: mode,
    });
  }

  // Decrease timer (sec) by one
  decreaseTimer() {
    this.setState((prevState) => ({ timer: prevState.timer - 1 }));
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
    this.alarm.pause();
    this.alarm.currentTime = 0;
  }

  setBreakLength(e) {
    if (this.state.timerOn) return; // Disable if timer is on
    const currentLength = this.state.breakLength;
    const value = e.currentTarget.value;

    if (value === '-' && currentLength !== 1) {
      this.setState((prevState) => ({
        breakLength: prevState.breakLength - 1,
      }));
    } else if (value === '+' && currentLength !== 60) {
      this.setState((prevState) => ({
        breakLength: prevState.breakLength + 1,
      }));
    }
  }

  setSessionLength(e) {
    if (this.state.timerOn) return; // Disable if timer is on
    const currentLength = this.state.sessionLength;
    const value = e.currentTarget.value;

    if (value === '-' && currentLength !== 1) {
      this.setState((prevState) => ({
        sessionLength: prevState.sessionLength - 1,
      }));
    } else if (value === '+' && currentLength !== 60) {
      this.setState((prevState) => ({
        sessionLength: prevState.sessionLength + 1,
      }));
    }
  }

  // Turn seconds into analog time
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
            this.alarm = audio;
          }}
        />
      </div>
    );
  }
}

export default Timer;
