import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import backgroundImage from '../assets/backgrounds/bg.gif'
import femaleChar from '../assets/characters/DeWatermark.ai_1747751052527.png'
import maleChar from '../assets/characters/DeWatermark.ai_1747751085011.png'

// Import celebration assets
import fireworks from '../assets/celebrations/fireworks.gif'

// Import continent maps for composite world display
import backgroundMap from '../assets/maps/oceans/title-background.png'
import unlockedAfrica from '../assets/maps/unlocked/africa_map.png'
import unlockedAntarctica from '../assets/maps/unlocked/antarctica_map.png'
import unlockedAsia from '../assets/maps/unlocked/asia _map.png'
import unlockedAustralia from '../assets/maps/unlocked/australia_map.png'
import unlockedEurope from '../assets/maps/unlocked/europe_map.png'
import unlockedNorthAmerica from '../assets/maps/unlocked/north_america_map.png'
import unlockedSouthAmerica from '../assets/maps/unlocked/south_america_map.png'

const CelebrationScreen = ({ playerName, characterType, playerLevel, onPlayAgain, onResetGame }) => {
  const characterImage = characterType === 'male' ? maleChar : femaleChar
  const [isTyping, setIsTyping] = useState(true)
  const [displayedText, setDisplayedText] = useState('')
  
  // Define the layers of the world map
  const mapLayers = [
    {
      id: 'background',
      name: 'Background',
      image: backgroundMap,
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
  
  const celebrationText = `Congratulations, ${playerName}!
    You have reached Level ${playerLevel} and unlocked every continent in the world!
    You are a true Geography Master! 🎉
    What would you like to do next?`
  
  // Typing effect for text
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
      }, 40)
      
      return () => clearInterval(typingInterval)
    }
  }, [isTyping, celebrationText])
  
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
      <div className="fireworks-container">
        <img src={fireworks} alt="Fireworks" className="fireworks-image" />
      </div>
      
      <div className="content celebration-content">
        <div className="celebration-header">
          <motion.h1 
            className="celebration-title glow"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 10 }}
          >
            World Explorer Champion!
          </motion.h1>
          
          <div className="player-info celebration-player-info">
            <div className="player-avatar">
              <img src={characterImage} alt="Character" className="avatar-image" />
            </div>
            <div className="player-stats">
              <h3 className="player-name">{playerName}</h3>
              <div className="player-level">Level {playerLevel} - Geography Master</div>
              <div className="player-progress">All continents unlocked!</div>
            </div>
          </div>
        </div>
        
        <div className="character-intro">
          <div className="character-avatar">
            <img src={characterImage} alt="Character" className="avatar-image" />
          </div>
          <div className="speech-bubble">
            <p>{displayedText}</p>
          </div>
        </div>
        
        <motion.div 
          className="unlocked-world-container"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: 'spring', damping: 12 }}
        >
          {/* Composite world map using all continent layers */}
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
        </motion.div>
        
        <div className="celebration-buttons">
          <motion.button 
            className="btn primary-btn"
            onClick={onPlayAgain}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Play Again
          </motion.button>
          <motion.button 
            className="btn secondary-btn"
            onClick={onResetGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Reset Game
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default CelebrationScreen 