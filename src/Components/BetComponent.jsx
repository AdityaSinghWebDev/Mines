import React, { useEffect, useState } from 'react';
import betSound from '../Audio/bet.mp3';
import { useMine } from '../Context/MineContext';
import './BetComponent.css';

export default function BetComponent() {

  let {start,setStart,setGameEnd,mine,setMine,totalAmount,setTotalAmount,amount,setAmount,setRandomMine,handleCashout,
        clicked,setClicked,setRevealMine,profit,setProfit,safeClicked,setSafeClicked}=useMine();

  let [amountError,setAmountError]=useState('');
  let [mineError,setMineError]=useState('');


  useEffect(()=>{
    if(start){
      let uniqueRandom=new Set();
      while(uniqueRandom.size<mine){
        let random=Math.floor(Math.random()*25);
        uniqueRandom.add(random);
      }
      setRandomMine([...uniqueRandom]);
    }
  },[start,mine]);

  
  let handleAmount=(value)=>{
    if(/^\d*\.?\d{0,2}$/.test(value)){
      setAmount(parseFloat(value));
    }
  }


  let handleHalf=()=>{
    if(amount==='') return;
    amount/2>1?setAmount(parseFloat((amount/2).toFixed(2))):setAmount(1);
  }

  let handleDouble=()=>{
    if(amount==='') return;
    amount*2<totalAmount?setAmount(parseFloat((amount*2).toFixed(2))):setAmount(totalAmount);
  }


  let handleBet=()=>{
    if(!start){
      if(amount>=1&&amount<=totalAmount)
      {
        setAmountError('');
        if(mine){
          setStart(true);
          setGameEnd(false);
          setRandomMine([]);
          setRevealMine(Array(25).fill(false));
          setClicked(Array(25).fill(false));
          setMineError('');
          setTotalAmount(parseFloat((totalAmount-amount).toFixed(2)));
          setProfit(0);
          setSafeClicked(0);
          new Audio(betSound).play();
        }
        else{
          setMineError('**Select number of Mines');
        }
      }
      else{
        setAmountError('**Enter a valid amount');
      }
    }
  }
  

  let selectMines=Array(24).fill(null).map((_,i)=>(
    <option className='selectMines' key={i} value={i+1}>{i+1}</option>
  ));


  return (
    <div className='betContainer'>
      <div className='amountTitle'>Bet Amount</div>
      <input className='betAmount' type='number' value={amount} onChange={(e)=>handleAmount(e.target.value)} disabled={start}/>
      <button className='setBet' onClick={handleHalf} disabled={start}>0.5x</button>
      <button className='setBet' onClick={handleDouble} disabled={start}>2x</button>
      {amountError&&<div className='error'>{amountError}</div>}
      {start
        ?<><div className='minesInfo'>Mines</div>
          <div className='minesNumber'>{mine}</div>
          <div className='minesInfo'>Safe Tiles</div>
          <div className='minesNumber'>{25-safeClicked-mine}</div>
          <div className='minesInfo'>Profit</div>
          <div className='minesNumber'>{profit}</div>
        </>
        :<>
          <div className='minesInfo'>Mines</div>
          <select className="betMines" onChange={(e)=>setMine(e.target.value)} value={mine||''}>
            <option value="" hidden />
            {selectMines}
          </select>
        </>
      }
      {mineError&&<div className='error'>{mineError}</div>}
      {start
        ?<button className='cashoutButton' onClick={()=>handleCashout()} disabled={clicked.filter((v)=>v).length===0}>Cashout</button>
        :<button className='betButton' onClick={handleBet} disabled={!(amount>=1&&amount<=totalAmount&&mine)}>Bet</button>
      }
    </div>
  )
}
