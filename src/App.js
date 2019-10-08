import React from 'react';
import {Main} from './components/Main'
import './App.css';
import {BlockchainHandler} from './components/blockchain/BlockchainHandler'

function App() {
    let handler = new BlockchainHandler();
    handler.loadTasks().then((val) => console.log(val));
  return (
    <>
      <Main />
    </>
  );
}

export default App;
