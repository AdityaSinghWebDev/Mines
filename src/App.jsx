import React from 'react';
import './App.css'
import Mine from './MainFile/Mine';
import { MineProvider } from './Context/MineContext';

function App() {

  return (
    <MineProvider >
      <Mine />
    </MineProvider>
  )
}

export default App;
