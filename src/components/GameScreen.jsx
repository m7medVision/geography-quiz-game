import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import backgroundImage from '../assets/backgrounds/bg.gif'
import femaleChar from '../assets/characters/DeWatermark.ai_1747751052527.png'
import maleChar from '../assets/characters/DeWatermark.ai_1747751085011.png'

const GameScreen = ({ playerName, characterType, onNext }) => {
  const characterImage = characterType === 'male' ? maleChar : femaleChar
  const characterName = characterType === 'male' ? 'Leo' : 'Lina'
  const [isTyping, setIsTyping] = useState(true)
  const [displayedText, setDisplayedText] = useState('')
  
  const welcomeText = `Hi ${playerName}! I'm ${characterName}, your adventure buddy. The world needs our help! The magic map has lost its power, and the only way to bring it back is by exploring each continent and answering questions to unlock them. We'll start with one continent, but every time you answer questions correctly, you'll unlock more of the map. By the end of our journey, we'll light up the whole world together!`
  
  useEffect(() => {
    if (isTyping) {
      const text = welcomeText
      let currentIndex = 0
      
      const typingInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex))
          currentIndex++
        } else {
          setIsTyping(false)
          clearInterval(typingInterval)
        }
      }, 40)
      
      return () => clearInterval(typingInterval)
    }
  }, [isTyping, welcomeText])
  
  return (
    <motion.div 
      className="screen"
      initial={{ opacity: 0}}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: 'tween', duration: 0.5 }}
      style={{ 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="content">
        <div className="game-container">
          <div className="character-intro">
            <div className="character-avatar">
              <img src={characterImage} alt="Character" className="avatar-image" />
            </div>
            <div className="speech-bubble">
              <p>{displayedText}</p>
            </div>
              {!isTyping && (
                <motion.button 
                  className="btn secondary-btn next-btn"
                  onClick={onNext}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Next
                </motion.button>
              )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default GameScreen 