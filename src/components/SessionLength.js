import React from 'react';

function SessionLength(props) {
  return (
    <div class='SessionLength'>
      <span id='timer-label'>{props.timerMode}</span>
      <span id='time-left'>{props.clockify()}</span>
    </div>
  );
}

export default SessionLength;