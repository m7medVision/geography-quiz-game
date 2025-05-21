import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import backgroundImage from '../assets/backgrounds/bg.gif'
import femaleChar from '../assets/characters/DeWatermark.ai_1747751052527.png'
import maleChar from '../assets/characters/DeWatermark.ai_1747751085011.png'
import celebrationImage from '../assets/celebrations/fireworks.gif'

// Define continent unlock order for messaging
const continentUnlockOrder = [
  'asia', 
  'europe', 
  'africa', 
  'northAmerica', 
  'southAmerica', 
  'australia', 
  'antarctica'
]

const ResultsScreen = ({ playerName, characterType, continent, score, totalQuestions, onReplay, onNextContinent }) => {
  const characterImage = characterType === 'male' ? maleChar : femaleChar
  const isPassing = score >= Math.ceil(totalQuestions / 2)
  const [isTyping, setIsTyping] = useState(true)
  const [displayedText, setDisplayedText] = useState('')
  
  // Get the next continent for unlock messaging
  const currentIndex = continentUnlockOrder.indexOf(continent)
  const nextContinent = currentIndex < continentUnlockOrder.length - 1 
    ? continentUnlockOrder[currentIndex + 1]
    : null
  
  // Format continent name for display
  const formatContinentName = (name) => {
    if (!name) return '';
    
    // Handle special case for continents with capital in the middle
    if (name === 'northAmerica') return 'North America';
    if (name === 'southAmerica') return 'South America';
    
    // Otherwise capitalize first letter
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
  
  const formattedContinent = formatContinentName(continent)
  const formattedNextContinent = formatContinentName(nextContinent)
  
  // Prepare result messages based on score
  const resultText = isPassing 
    ? `Congratulations, ${playerName}!
      You scored ${score}/${totalQuestions} on the ${formattedContinent} quiz.
      ${nextContinent ? `You've unlocked ${formattedNextContinent}!` : 'You\'ve unlocked all continents!'}
      Would you like to replay this quiz or explore another continent?`
    : `Nice try, ${playerName}!
      You scored ${score}/${totalQuestions} on the ${formattedContinent} quiz.
      You need at least ${Math.ceil(totalQuestions / 2)}/${totalQuestions} to unlock the next continent.
      Would you like to try again?`
  
  // Text typing effect
  useEffect(() => {
    if (isTyping) {
      const text = resultText
      let currentIndex = 0
      
      const typingInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex))
          currentIndex++
        } else {
          setIsTyping(false)
          clearInterval(typingInterval)
        }
      }, 30)
      
      return () => clearInterval(typingInterval)
    }
  }, [isTyping, resultText])
  
  return (
    <motion.div 
      className="screen results-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: 'tween', duration: 0.5 }}
      style={{ 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="content results-content">
        <div className="results-header">
          <h2 className="results-title">{isPassing ? 'Great Job!' : 'Try Again'}</h2>
          <div className="score-display large">Score: {score}/{totalQuestions}</div>
        </div>
        
        {isPassing && (
          <div className="celebration-container">
            <motion.img 
              src={celebrationImage} 
              alt="Celebration" 
              className="celebration-image"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 8 }}
            />
          </div>
        )}
        
        <div className="character-intro">
          <div className="character-avatar">
            <img src={characterImage} alt="Character" className="avatar-image" />
          </div>
          <div className="speech-bubble">
            <p>{displayedText}</p>
          </div>
        </div>
        
        <div className="results-buttons">
          <motion.button 
            className="btn secondary-btn"
            onClick={onReplay}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Replay Quiz
          </motion.button>
          
          <motion.button 
            className="btn primary-btn"
            onClick={onNextContinent}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!isPassing && currentIndex === 0}
          >
            World Map
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default ResultsScreen 