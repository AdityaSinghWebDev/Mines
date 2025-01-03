import React from 'react';
import './Mine.css';
import BetComponent from '../Components/BetComponent';
import MineComponent from '../Components/MineComponent';
import { useMine } from '../Context/MineContext';

export default function Mine() {
  let {totalAmount}=useMine();
  return(
    <div className='container'>
      <h1 className='gameTitle'>Mines</h1>
      <div className='totalAmount'>Total:{totalAmount}</div>
      <div className='gameContainer'>
        <BetComponent />
        <MineComponent />
      </div>
    </div>
  );
}

