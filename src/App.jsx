import  { useState } from 'react'
import { languages } from "./languages"
 
function AssemblyEndGame() {
  const [currentWord , setCurrentWord] = useState("react")

console.log(currentWord)
   const word = currentWord.split("").map((letter,index) => {
      return(
      <span key={index} className='letter'>{letter.toUpperCase()}</span>
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
    </main>
  )
}

export default AssemblyEndGame