import  { useState } from 'react'
import { languages } from "./languages"
import clsx from 'clsx';
import { getFarewellText , getRandomWord } from "./utils"
import Confetti from 'react-confetti'
  
function AssemblyEndGame() {
  //state values
  const [currentWord , setCurrentWord] = useState(() => getRandomWord())
  const [guessedWord , setGuessedWord] = useState([])

  
  // static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  const wrongguessedLetters = guessedWord.filter((letter) => !currentWord.includes(letter)).length
  
  const numGuessesLeft = languages.length - 1
  const isGameWon = currentWord.split("").every((letter) => guessedWord.includes(letter));
  const isGameLost = wrongguessedLetters >= numGuessesLeft ;
  const isGameOver = isGameWon || isGameLost;
  const lastGuessedletter = guessedWord[guessedWord.length -1]
  const lastIncorrectLetter = lastGuessedletter && !currentWord.includes(lastGuessedletter)
  console.log(lastIncorrectLetter)

   function addToKeyboard(letter) {
      setGuessedWord(prevLetter => {
       return prevLetter.includes(letter) ? prevLetter : [...prevLetter , letter]
      }
      )
   }
   const word = currentWord.split("").map((letter,index) => {
    const currentRevealLetter = isGameLost || guessedWord.includes(letter)
      const revealClass = clsx(
        isGameLost && !guessedWord.includes(letter) && "missed-letters"
      )
      return(
      <span key={index} className={revealClass}>{currentRevealLetter ?letter.toUpperCase() : ""}</span>
      )
   })
  

   const keyboardElements = alphabet.split("").map((letter , index) => {
    const isGuessed = guessedWord.includes(letter)
      const iscorrect = isGuessed && currentWord.includes(letter);
      const isWrong = isGuessed && !currentWord.includes(letter)
      const className = clsx({
        correct : iscorrect,
        wrong : isWrong,
        
      })
      return(
        <button onClick={() => addToKeyboard(letter)} disabled={isGameOver} key={index} className={className}>{letter.toUpperCase()}</button>
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
    loose : isGameLost,
    farewell: !isGameOver && lastIncorrectLetter  
  }
  )

  function renderGameStatus() {
    if (!isGameOver && lastIncorrectLetter) {
        return <p className='farewell-message'>{getFarewellText(languages[lastIncorrectLetter -1].name)}</p>
    }

    if (isGameWon) {
        return (
            <>
                <h2>You win!</h2>
                <p>Well done! 🎉</p>
            </>
        )
    } 
     if(isGameLost){
        return (
            <>
                <h2>Game over!</h2>
                <p>You lose! Better start learning Assembly 😭</p>
            </>
        )
    }else{
      return null
    }
}
function startNewGame() {
  setCurrentWord(getRandomWord())
  setGuessedWord([])
}

  return (
    <main>
      {
        isGameWon && <Confetti
        recycle = {false}
        numberOfPieces={1000}
        />
      }
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
                                     {/* Combined visually-hidden aria-live region for status updates */}
       <section 
                className="sr-only" 
                aria-live="polite" 
                role="status"
            >
                <p>
                    {currentWord.includes(lastGuessedletter) ? 
                        `Correct! The letter ${lastGuessedletter} is in the word.` : 
                        `Sorry, the letter ${lastGuessedletter} is not in the word.`
                    }
                    You have {numGuessesLeft} attempts left.
                </p>
                <p>Current word: {currentWord.split("").map(letter => 
                guessedWord.includes(letter) ? letter + "." : "blank.")
                .join(" ")}</p>
            
            </section>
      <section className='whole-letter'>{word}</section>
      <section className='keyboard'>{keyboardElements}</section>
      {isGameOver && <button className="new-game" onClick={startNewGame}>New Game</button>}
    </main>
  )
}

export default AssemblyEndGame