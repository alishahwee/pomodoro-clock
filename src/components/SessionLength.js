import React from 'react';

function SessionLength(props) {
  return (
    <div class='SessionLength'>
      <span id='timer-label'>{props.timerMode}</span>
      <span id='time-left'>{props.clockify()}</span>
      <div className='SessionLength__controls'>
        <button id='start_stop'>{props.btnState}</button>
        <i id='reset' className='fas fa-redo' />
      </div>
    </div>
  );
}

export default SessionLength;
