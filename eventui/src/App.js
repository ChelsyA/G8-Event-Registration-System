import React from 'react';
import './App.css';
import Auxiliary from './hoc/Auxiliary';
import Navbar from './components/Navbar/Navbar';
import FormPanel from './components/Form/Form';

function App() {
  return (
    <Auxiliary>
      <Navbar />
      <FormPanel/>
    </Auxiliary>
  );
}

export default App;
