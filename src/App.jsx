import  { useState } from 'react'
import { languages } from "./languages"
import clsx from 'clsx';
 
function AssemblyEndGame() {
  //state values
  const [currentWord , setCurrentWord] = useState("react")
  const [guessedWord , setGuessedWord] = useState([])

  
  // static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  const wrongguessedLetters = guessedWord.filter((letter) => !currentWord.includes(letter)).length
  console.log(wrongguessedLetters)

  const isGameWon = currentWord.split("").every((letter) => guessedWord.includes(letter));
  const isGameLost = wrongguessedLetters >= languages.length -1 ;
  const isGameOver = isGameWon || isGameLost;

   function addToKeyboard(letter) {
      setGuessedWord(prevLetter => {
       return prevLetter.includes(letter) ? prevLetter : [...prevLetter , letter]
      }
      )
   }
   const word = currentWord.split("").map((letter,index) => {
      
      return(
      <span key={index} className='letter'>{guessedWord.includes(letter) ?letter.toUpperCase() : ""}</span>
      )
   })
  

   const keyboardElements = alphabet.split("").map((letter , index) => {
    const isGuessed = guessedWord.includes(letter)
      const iscorrect = isGuessed && currentWord.includes(letter);
      const isWrong = isGuessed && !currentWord.includes(letter)
      const className = clsx({
        correct : iscorrect,
        wrong : isWrong
      })
      return(
        <button onClick={() => addToKeyboard(letter)} key={index} className={className}>{letter.toUpperCase()}</button>
      )
   })

  const languageElements = languages.map((lang , index) => {
    const isWrongGuess = index < wrongguessedLetters
    const styles = {
      backgroundColor : lang.backgroundColor,
      color : lang.color
    }
    
    // const classNam = clsx("chip", isWrongGuess && "lost")
    return(
      <span key={lang.name} className={`chip ${isWrongGuess ? "lost" : ""}`} style={styles}>{lang.name}</span>
    )
  })

  const gameStatusClass = clsx("winner-text",
    {won : isGameWon,
    loose : isGameLost}
  )

  function renderGameStatus() {
    if (!isGameOver) {
        return null
    }

    if (isGameWon) {
        return (
            <>
                <h2>You win!</h2>
                <p>Well done! 🎉</p>
            </>
        )
    } else {
        return (
            <>
                <h2>Game over!</h2>
                <p>You lose! Better start learning Assembly 😭</p>
            </>
        )
    }
}

  return (
    <main>
      <header>
      <h1>Assembly Endgame</h1>
      <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>
      <section className={gameStatusClass}>
                {renderGameStatus()}
            </section>
      <section className='language-chips'>
      {languageElements}
      </section>
      <section className='whole-letter'>{word}</section>
      <section className='keyboard'>{keyboardElements}</section>
      {isGameOver && <button className="new-game">New Game</button>}
    </main>
  )
}

export default AssemblyEndGame