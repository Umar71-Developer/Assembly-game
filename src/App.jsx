import  { useState } from 'react'
import { languages } from "./languages"
import clsx from 'clsx';
 
function AssemblyEndGame() {
  const [currentWord , setCurrentWord] = useState("react")
  const [guessedWord , setGuessedWord] = useState([])

  console.log(guessedWord)

  const alphabet = "abcdefghijklmnopqrstuvwxyz"

   function addToKeyboard(letter) {
      setGuessedWord(prevLetter => {
       return prevLetter.includes(letter) ? prevLetter : [...prevLetter , letter]
      }
      )
   }
   const word = currentWord.split("").map((letter,index) => {
      
      return(
      <span key={index} className='letter'>{letter.toUpperCase()}</span>
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

  const languageElements = languages.map(lang => {
    const styles = {
      backgroundColor : lang.backgroundColor,
      color : lang.color
    }
    return(
      <span key={lang.name} className='chip' style={styles}>{lang.name}</span>
    )
  })
  return (
    <main>
      <header>
      <h1>Assembly Endgame</h1>
      <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>
      <section className="winner-text">
        <h2>You win! </h2>
        <p>Well done! 🎉</p>
      </section>
      <section className='language-chips'>
      {languageElements}
      </section>
      <section className='whole-letter'>{word}</section>
      <section className='keyboard'>{keyboardElements}</section>
      <button className="new-game">New Game</button>
    </main>
  )
}

export default AssemblyEndGame