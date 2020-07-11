import React from 'react';
import Timer from './Timer';
import TimerLengthControl from './TimerLengthControl';

class Clock extends React.Component {
  render() {
    return (
      <div className='Clock'>
        <Timer />
        <TimerLengthControl />
      </div>
    );
  }
}

export default Clock;
