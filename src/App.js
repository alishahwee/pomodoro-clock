import React from 'react';
import Header from './components/Header';
import Timer from './components/Timer';

function App() {
  return (
    <div className='App'>
      <Header />
      <Timer />
      <p className="footer">
        design and code by{' '}
        <a
          href='https://github.com/alishahwee'
          target='_blank'
          rel='noopener noreferrer'
        >
          Alisha Hwee
        </a>
      </p>
    </div>
  );
}

export default App;
