import React from 'react';
import bomb from '../images/red_bomb.png';
import diamond from '../images/green_diamond.png';
import mineSound from '../Audio/mine.mp3';
import tingSound from '../Audio/ting.mp3';
import { useMine } from '../Context/MineContext';
import './MineComponent.css';

export default function MineComponent() {

  let {start,setStart,gameEnd,setGameEnd,mine,amount,randomMine,clicked,setClicked,revealMine,handleCashout,
        setRevealMine,setSafeClicked,profit,setProfit}=useMine();

  let mines=Array(25).fill(null).map((_,i)=>(
    <div className={`mines ${revealMine[i]?(clicked[i]?'clicked':'non-clicked'):''}`} key={i} onClick={()=>handleClick(i)}>
      {randomMine.includes(i)
          ?(<img src={bomb} alt="mine" className={`image ${revealMine[i]?(clicked[i]?'clicked-mineImage':'mineImage'):''}`}/>)
          :(<img src={diamond} alt="diamond" className={`image ${revealMine[i]?(clicked[i]?'clicked-diamondImage':'diamondImage'):''}`}/>)
      }
    </div>
  ));


  let handleClick=(i)=>{
  
    if(gameEnd||revealMine[i]||(!start)) return;

    setClicked((prev)=>{
      let newClicked=[...clicked];
      newClicked[i]=true;
      return newClicked;
    });
    
    setRevealMine((prev)=>{
      let newMine=[...revealMine];
      newMine[i]=true;
      return newMine;
    });

    if(randomMine.includes(i)){
      handleMine(i);
    } 
    else{
      handleSafeTiles(i);
    }
  };

  let handleMine=(i)=>{
    setGameEnd(true);
    setTimeout(()=>{
      setStart(false);
      setProfit(0);
      setRevealMine(Array(25).fill(true));
      new Audio(mineSound).play();
    },800);
  }

  let handleSafeTiles=(i)=>{
    setTimeout(()=>{ 
      let newSafe=revealMine.filter((v,index)=>v&&!randomMine.includes(index)).length;
      let newProfit=parseFloat((Math.pow(1.125,newSafe)*amount-amount).toFixed(2));
      setSafeClicked(newSafe);
      setProfit(newProfit);
      if((25-newSafe-mine)===0)
      {
        handleCashout();
      }
      else{
        new Audio(tingSound).play();
      }
    },800);
  }

  return (
    <div className='mineContainer'>
      <div className='mineBox'>{mines}</div>
      {(!start)&&(clicked.filter((v)=>v).length>0)&&(profit===0?<div className='lossInfo'>Loss</div>:<div className='profitInfo'>Profit: {profit}</div>)}
    </div>
  )
}