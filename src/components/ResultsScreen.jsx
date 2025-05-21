import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import backgroundImage from '../assets/backgrounds/bg.gif'
import femaleChar from '../assets/characters/DeWatermark.ai_1747751052527.png'
import maleChar from '../assets/characters/DeWatermark.ai_1747751085011.png'
import celebrationImage from '../assets/celebrations/fireworks.gif'

const ResultsScreen = ({ playerName, characterType, continent, score, totalQuestions, onReplay, onNextContinent }) => {
  const characterImage = characterType === 'male' ? maleChar : femaleChar
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  
  // Prepare the feedback text based on score
  const isPerfectScore = score === totalQuestions
  const isPassingScore = score >= Math.ceil(totalQuestions / 2)
  
  let feedbackText = ''
  if (isPerfectScore) {
    feedbackText = `Congratulations, ${playerName}! You got a perfect score on ${continent}! 
      You've unlocked all questions for this continent and can now explore more continents!`
  } else if (isPassingScore) {
    feedbackText = `Good job, ${playerName}! You got ${score} out of ${totalQuestions} questions correct for ${continent}.
      You've unlocked this continent and can now explore more or try again to improve your score!`
  } else {
    feedbackText = `Nice try, ${playerName}! You got ${score} out of ${totalQuestions} questions correct for ${continent}.
      Let's review what you got wrong and try again to unlock this continent!`
  }
  
  // Typing effect
  useEffect(() => {
    if (isTyping) {
      const text = feedbackText
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
  }, [isTyping, feedbackText])
  
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
          <h2 className="results-title">Quiz Results</h2>
          <div className="score-display large">
            Score: {score}/{totalQuestions}
          </div>
        </div>
        
        {isPerfectScore && (
          <div className="celebration-container">
            <img src={celebrationImage} alt="Celebration" className="celebration-image" />
          </div>
        )}
        
        <div className="character-intro">
          <div className="character-avatar">
            <img src={characterImage} alt="Character" className="avatar-image" />
          </div>
          <div className="speech-bubble">
            <p>{displayedText}</p>
            
            {!isTyping && (
              <div className="results-buttons">
                <motion.button
                  className="btn primary-btn"
                  onClick={onReplay}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Replay
                </motion.button>
                
                {isPassingScore && (
                  <motion.button
                    className="btn secondary-btn"
                    onClick={onNextContinent}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Next Continent
                  </motion.button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ResultsScreen 