import React,{ createContext, useContext, useState } from "react";
import cashoutSound from '../Audio/cashout.mp3';

export let MineContext=createContext();

export let useMine=()=>{
  return useContext(MineContext);
}

export let MineProvider=({children})=>{
  let [start,setStart]=useState(false);
  let [gameEnd,setGameEnd]=useState(false);
  let [totalAmount,setTotalAmount]=useState(1000);
  let [mine,setMine]=useState('');
  let [amount,setAmount]=useState('');
  let [randomMine,setRandomMine]=useState([]);
  let [clicked,setClicked]=useState(Array(25).fill(false));
  let [revealMine,setRevealMine]=useState(Array(25).fill(false));
  let [safeClicked,setSafeClicked]=useState(0);
  let [profit,setProfit]=useState(0);

  let handleCashout=()=>{
    setTotalAmount(parseFloat((totalAmount+profit+amount).toFixed(2)));
    setStart(false);
    setRevealMine(Array(25).fill(true));
    new Audio(cashoutSound).play();
  }
  
  return(
    <MineContext.Provider value={{start,setStart,gameEnd,setGameEnd,mine,setMine,totalAmount,setTotalAmount,amount,setAmount,handleCashout,
      randomMine,setRandomMine,clicked,setClicked,safeClicked,setSafeClicked,revealMine,setRevealMine,profit,setProfit}} >
      {children}
    </MineContext.Provider>
  )
}