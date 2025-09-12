import { useState } from 'react'
import './App.css'

function Card(){

}

export default function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);





  return (
    <>
      <div className="app-container">
        <div className='header'>
          <div className="title">Pokemon Memory Game</div>
          <div className="score">
            <div>Score: { score }</div>
            <div>Best Score: { bestScore }</div> 
          </div>
          <div className="game">
            generate cards
          </div>
        </div>
      </div>
    </>
  )
}
