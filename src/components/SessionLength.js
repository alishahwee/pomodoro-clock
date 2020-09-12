import React from 'react';

function SessionLength(props) {
  return (
    <div className='SessionLength'>
      <p id='timer-label' className='SessionLength__label'>
        {props.timerMode}
      </p>
      <span id='time-left' className='SessionLength__time'>
        {props.clockify()}
      </span>
      <div className='SessionLength__controls'>
        <button
          id='start_stop'
          className='SessionLength__controls__btn SessionLength__controls__btn--start-stop'
          onClick={props.controlTimer}
        >
          {props.btnState}
        </button>
        <button
          id='reset'
          className='SessionLength__controls__btn SessionLength__controls__btn--reset'
        >
          <i className='fas fa-redo' />
        </button>
      </div>
    </div>
  );
}

export default SessionLength;
