import './App.css';
import Rock from './Images/Rock-emoji.png';
import Paper from './Images/Paper-emoji.png';
import Scissor from './Images/Scissor-emoji.png';
import { use, useState } from 'react';


function App() {
  let [win,setWin] = useState(0);
  let [lose,setLose] = useState(0);
  let [ties,setTies] = useState(0);
  let [pickedMove,setPickedMove] = useState('');
  let [result,setResult] = useState('');

  return (
    <>
      <p className="title">Rock Paper and Scissors</p>
        <div>
          <button onClick={() => game('Rock')} className="moveButton"><img src={Rock} className="playerMove"/></button>
          <button onClick={() => game('Paper')} className="moveButton"><img src={Paper} className="playerMove"/></button>
          <button onClick={() => game('Scissor')} className="moveButton"><img src={Scissor} className="playerMove"/></button>
        </div>
        <p className="showResult">{result}</p>
        <p className="showPick" dangerouslySetInnerHTML={{ __html: pickedMove }}></p>
        <p className="showScore">Wins : {win}, Lose : {lose}, Ties : {ties}</p>
        <button onclick="reset()" className="reset">Reset Score</button>
        <button onclick="autoPlay()" className="auto-play">Auto Play</button>
    </>
  );


  function game(move){
    const randomNumber = Math.random();
    let computerPick = randomNumber < 0.33 ? "Rock" : randomNumber < 0.66 ? "Paper" : "Scissor";
    
    let result = '';
    if(computerPick == move) result = 'tie';
    else if(move == 'Rock')
        if(computerPick == 'Paper') result = 'lost';
        else result = 'won';
    else if(move == 'Paper')
        if(computerPick == 'Scissor') result = 'lost';
        else result = 'won';
    else if(move == 'Scissor')
        if(computerPick == 'Rock') result = 'lost';
        else result = 'won';
  
    if(result == 'won') setWin(++win);
    else if(result == 'lost') setLose(++lose);
    else setTies(++ties); 
    // localStorage.setItem('score',JSON.stringify(score));
    setResult(`Game ${result}`)
    
    let moveImg = move === "Rock" ? Rock : move === "Paper" ? Paper : Scissor;
    let computerImg = computerPick === "Rock" ? Rock : computerPick === "Paper" ? Paper : Scissor;
    setPickedMove(`You <img src="${moveImg}" class="move-icon"/> <img src="${computerImg}" class="move-icon"/> Computer`);
  }
}
export default App;
