import React from 'react';

function TimerLengthControl(props) {
  return (
    <div className='TimerLengthControl'>
      <p id={props.titleId} className='TimerLengthControl__title'>
        {props.title}
      </p>
      <div className='TimerLengthControl__controls'>
        <button
          id={props.minId}
          className='TimerLengthControl__controls__btn TimerLengthControl__controls__btn--left'
          value='-'
          onClick={props.onClick}
        >
          <i className='fas fa-minus' />
        </button>
        <div className="TimerLengthControl__controls__length">
          <span id={props.lengthId}>{props.length}</span>
        </div>
        <button
          id={props.addId}
          className='TimerLengthControl__controls__btn TimerLengthControl__controls__btn--right'
          value='+'
          onClick={props.onClick}
        >
          <i className='fas fa-plus' />
        </button>
      </div>
    </div>
  );
}

export default TimerLengthControl;
