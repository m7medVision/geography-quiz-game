import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import backgroundImage from '../assets/backgrounds/bg.gif'
import femaleChar from '../assets/characters/DeWatermark.ai_1747751052527.png'
import maleChar from '../assets/characters/DeWatermark.ai_1747751085011.png'
import celebrationImage from '../assets/celebrations/fireworks.gif'

// Import all unlocked continent maps for the full world display
import unlockedAfrica from '../assets/maps/unlocked/africa_map.png'
import unlockedAntarctica from '../assets/maps/unlocked/antarctica_map.png'
import unlockedAsia from '../assets/maps/unlocked/asia _map.png'
import unlockedAustralia from '../assets/maps/unlocked/australia_map.png'
import unlockedEurope from '../assets/maps/unlocked/europe_map.png'
import unlockedNorthAmerica from '../assets/maps/unlocked/north_america_map.png'
import unlockedSouthAmerica from '../assets/maps/unlocked/south_america_map.png'
import oceanBackground from '../assets/maps/oceans/title-background.png'

const CelebrationScreen = ({ playerName, characterType, onPlayAgain }) => {
  const characterImage = characterType === 'male' ? maleChar : femaleChar
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  
  // Celebration message
  const celebrationText = `Congratulations, ${playerName}! You've unlocked all continents! 
    You've mastered geography and completed your journey around the world.
    What an incredible achievement!`
  
  // Typing effect
  useEffect(() => {
    if (isTyping) {
      const text = celebrationText
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
  }, [isTyping, celebrationText])
  
  // Define the layers of the world map
  const mapLayers = [
    {
      id: 'background',
      name: 'Background',
      image: oceanBackground,
    },
    { 
      id: 'antarctica',
      name: 'Antarctica', 
      image: unlockedAntarctica,
    },
    { 
      id: 'southAmerica',
      name: 'South America', 
      image: unlockedSouthAmerica,
    },
    { 
      id: 'africa',
      name: 'Africa', 
      image: unlockedAfrica,
    },
    { 
      id: 'australia',
      name: 'Australia', 
      image: unlockedAustralia,
    },
    { 
      id: 'northAmerica',
      name: 'North America', 
      image: unlockedNorthAmerica,
    },
    { 
      id: 'europe',
      name: 'Europe', 
      image: unlockedEurope,
    },
    { 
      id: 'asia',
      name: 'Asia', 
      image: unlockedAsia,
    },
  ]
  
  return (
    <motion.div 
      className="screen celebration-screen"
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
      <div className="content celebration-content">
        <div className="celebration-header">
          <h2 className="celebration-title">World Explorer Champion!</h2>
        </div>
        
        <div className="fireworks-container">
          <img src={celebrationImage} alt="Celebration" className="fireworks-image" />
        </div>
        
        {/* Full unlocked world map display */}
        <div className="unlocked-world-container">
          <div className="map-layers">
            {mapLayers.map((layer) => (
              <div 
                key={layer.id}
                className="continent-layer"
              >
                <img 
                  src={layer.image} 
                  alt={layer.name} 
                  className="continent-image"
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="character-intro">
          <div className="character-avatar">
            <img src={characterImage} alt="Character" className="avatar-image" />
          </div>
          <div className="speech-bubble">
            <p>{displayedText}</p>
            
            {!isTyping && (
              <div className="celebration-buttons">
                <motion.button
                  className="btn primary-btn"
                  onClick={onPlayAgain}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Play Again
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CelebrationScreen 