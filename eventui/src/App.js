import React from 'react';
import './App.css';
import Beverage from './components/Beverage';
import Auxiliary from './hoc/Auxiliary';

function App() {
  return (
    <Auxiliary>
      <Beverage />
    </Auxiliary>
  );
}

export default App;
