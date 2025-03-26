import './App.css';
import Rock from './Images/Rock-emoji.png';
import Paper from './Images/Paper-emoji.png';
import Scissor from './Images/Scissor-emoji.png';
import {useState,useEffect} from 'react';

function App() {
  let [win,setWin] = useState(0);
  let [lose,setLose] = useState(0);
  let [ties,setTies] = useState(0);

  let [isAutoPlaying,setIsAutoPlaying]  = useState(false);
  let [intervalId,setIntervalId] = useState();

useEffect(() => {
  setWin(Number(localStorage.getItem("win")) || 0);
  setLose(Number(localStorage.getItem("lose")) || 0);
  setTies(Number(localStorage.getItem("ties")) || 0);
}, []);

  let [pickedMove,setPickedMove] = useState('');
  let [result,setResult] = useState('');

  return (
    <div tabIndex="0" onKeyDown={playUsingKeyboard}>
      <p className="title">Rock Paper and Scissors</p>
        <div>
          <button onClick={() => game('Rock')} className="moveButton"><img src={Rock} className="playerMove" alt="Rock"/></button>
          <button onClick={() => game('Paper')} className="moveButton"><img src={Paper} className="playerMove" alt="Paper"/></button>
          <button onClick={() => game('Scissor')} className="moveButton"><img src={Scissor} className="playerMove" alt="Scissor"/></button>
        </div>
        <p className="showResult">{result}</p>
        <p className="showPick" dangerouslySetInnerHTML={{ __html: pickedMove }}></p>
        <p className="showScore">Wins : {win}, Lose : {lose}, Ties : {ties}</p>
        <button onClick={reset} className="reset">Reset Score</button>
        <button onClick={autoPlay} className="auto-play">{isAutoPlaying ? "Stop Auto Play" : "Auto Play"}</button>
    </div>
  );


  function game(move){
    const randomNumber = Math.random();
    let computerPick = randomNumber < 0.33 ? "Rock" : randomNumber < 0.66 ? "Paper" : "Scissor";
    
    let result = '';
    if(computerPick === move) result = 'tie';
    else if(move === 'Rock')
        if(computerPick === 'Paper') result = 'lost';
        else result = 'won';
    else if(move === 'Paper')
        if(computerPick === 'Scissor') result = 'lost';
        else result = 'won';
    else if(move === 'Scissor')
        if(computerPick === 'Rock') result = 'lost';
        else result = 'won';
  
        if(result === 'won') {
          setWin(prevWin => {
            const newWin = prevWin + 1;
            localStorage.setItem("win", newWin);  
            return newWin;
          });
        } else if(result === 'lost') {
          setLose(prevLose => {
            const newLose = prevLose + 1;
            localStorage.setItem("lose", newLose);  
            return newLose;
          });
        } else {
          setTies(prevTies => {
            const newTies = prevTies + 1;
            localStorage.setItem("ties", newTies);  
            return newTies;
          });
        }
    
    
    setResult(`Game ${result}`)
    
    let moveImg = move === "Rock" ? Rock : move === "Paper" ? Paper : Scissor;
    let computerImg = computerPick === "Rock" ? Rock : computerPick === "Paper" ? Paper : Scissor;
    setPickedMove(`You <img src="${moveImg}" class="move-icon"/> <img src="${computerImg}" class="move-icon"/> Computer`);
  }

  function reset() {
    localStorage.setItem("win", 0);
    localStorage.setItem("lose", 0);
    localStorage.setItem("ties", 0);
    setWin(0);
    setLose(0);
    setTies(0);
  }

function autoPlay(){
  if(!isAutoPlaying){
    intervalId = setInterval(function(){
      const randomNumber = Math.random();
      let move = randomNumber < 0.33 ? "Rock" : randomNumber < 0.66 ? "Paper" : "Scissor";
      game(move);
    },1000);
    setIntervalId(intervalId);
  }
  else{
    clearInterval(intervalId);
    setIntervalId(null)
  }
  setIsAutoPlaying(!isAutoPlaying);
}

function playUsingKeyboard(event){
  if(event.key == 'r' || event.key == 'R') game('Rock')
  else if(event.key == 'p' || event.key == 'P') game('Paper') 
  else if(event.key == 's' || event.key == 'S') game('Scissor') 
}

}
export default App;
