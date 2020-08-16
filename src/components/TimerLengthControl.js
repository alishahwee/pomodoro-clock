import React from 'react';

function TimerLengthControl(props) {
  return (
    <div className='TimerLengthControl'>
      <p id={props.titleId}>{props.title}</p>
      <button
        id={props.minId}
        className="btn-level"
        value="-"
        onClick={props.onClick}
      >
        <i className="fas fa-minus" />
      </button>
      <p id={props.lengthId}>{props.length}</p>
      <button
        id={props.addId}
        className="btn-level"
        value="+"
        onClick={props.onClick}
      >
        <i className="fas fa-plus" />
      </button>
    </div>
  );
}

export default TimerLengthControl;
