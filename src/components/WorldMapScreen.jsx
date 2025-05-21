import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import backgroundImage from '../assets/maps/oceans/title-background.png'
import femaleChar from '../assets/characters/DeWatermark.ai_1747751052527.png'
import maleChar from '../assets/characters/DeWatermark.ai_1747751085011.png'

// Import continent maps
import lockedAfrica from '../assets/maps/locked/africa_map.png'
import lockedAntarctica from '../assets/maps/locked/antarctica_map.png'
import lockedAsia from '../assets/maps/locked/asia _map.png'
import lockedAustralia from '../assets/maps/locked/australia_map.png'
import lockedEurope from '../assets/maps/locked/europe_map.png'
import lockedNorthAmerica from '../assets/maps/locked/north_america_map.png'
import lockedSouthAmerica from '../assets/maps/locked/south_america_map.png'

// Import unlocked continent maps
import unlockedAfrica from '../assets/maps/unlocked/africa_map.png'
import unlockedAntarctica from '../assets/maps/unlocked/antarctica_map.png'
import unlockedAsia from '../assets/maps/unlocked/asia _map.png'
import unlockedAustralia from '../assets/maps/unlocked/australia_map.png'
import unlockedEurope from '../assets/maps/unlocked/europe_map.png'
import unlockedNorthAmerica from '../assets/maps/unlocked/north_america_map.png'
import unlockedSouthAmerica from '../assets/maps/unlocked/south_america_map.png'

const WorldMapScreen = ({ playerName, characterType, unlockedContinents: propUnlockedContinents, playerLevel, onSelectContinent, onResetGame }) => {
  const characterImage = characterType === 'male' ? maleChar : femaleChar
  const [isTyping, setIsTyping] = useState(true)
  const [displayedText, setDisplayedText] = useState('')
  const [unlockedContinents, setUnlockedContinents] = useState(propUnlockedContinents || ['asia'])
  
  // For the map display
  const mapLayers = [
    {
      id: 'background',
      name: 'Background',
      image: backgroundImage,
      isBackground: true,
    },
    { 
      id: 'antarctica',
      name: 'Antarctica', 
      lockedImage: lockedAntarctica, 
      unlockedImage: unlockedAntarctica,
    },
    { 
      id: 'southAmerica',
      name: 'South America', 
      lockedImage: lockedSouthAmerica, 
      unlockedImage: unlockedSouthAmerica,
    },
    { 
      id: 'africa',
      name: 'Africa', 
      lockedImage: lockedAfrica, 
      unlockedImage: unlockedAfrica,
    },
    { 
      id: 'australia',
      name: 'Australia', 
      lockedImage: lockedAustralia, 
      unlockedImage: unlockedAustralia,
    },
    { 
      id: 'northAmerica',
      name: 'North America', 
      lockedImage: lockedNorthAmerica, 
      unlockedImage: unlockedNorthAmerica,
    },
    { 
      id: 'europe',
      name: 'Europe', 
      lockedImage: lockedEurope, 
      unlockedImage: unlockedEurope,
    },
    { 
      id: 'asia',
      name: 'Asia', 
      lockedImage: lockedAsia, 
      unlockedImage: unlockedAsia,
    },
  ]
  
  // For the continent selection buttons
  const continentButtons = [
    {
      id: 'asia',
      name: 'Asia',
    },
    {
      id: 'europe',
      name: 'Europe',
    },
    {
      id: 'africa',
      name: 'Africa',
    },
    {
      id: 'northAmerica',
      name: 'North America',
    },
    {
      id: 'southAmerica',
      name: 'South America',
    },
    {
      id: 'australia',
      name: 'Australia',
    },
    {
      id: 'antarctica',
      name: 'Antarctica',
    },
  ]
  
  const promptText = `Welcome back, ${playerName}!
    Level: ${playerLevel}
    Unlocked: ${unlockedContinents.length} of 7 continents.
    Click on a continent to start answering questions about it!`
  
  // Typing effect for text
  useEffect(() => {
    if (isTyping) {
      const text = promptText
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
  }, [isTyping, promptText])
  
  // Update unlockedContinents when propUnlockedContinents changes
  useEffect(() => {
    if (propUnlockedContinents) {
      setUnlockedContinents(propUnlockedContinents)
    }
  }, [propUnlockedContinents])
  
  const handleContinentSelect = (continentId) => {
    // Check if the continent is unlocked or it's Asia (which is the starting point according to wireframe)
    if (unlockedContinents.includes(continentId) || continentId === 'asia') {
      // If not already unlocked, add to unlocked continents
      if (!unlockedContinents.includes(continentId)) {
        setUnlockedContinents([...unlockedContinents, continentId])
      }
      
      // Call the parent handler with the selected continent
      onSelectContinent(continentId)
    }
  }
  
  return (
    <motion.div 
      className="screen world-map-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: 'tween', duration: 0.5 }}
    >
      <div className="content world-map-content">
        <div className="world-map-header">
          <div className="player-info">
            <div className="player-avatar">
              <img src={characterImage} alt="Character" className="avatar-image" />
            </div>
            <div className="player-stats">
              <h3 className="player-name">{playerName}</h3>
              <div className="player-level">Level {playerLevel}</div>
              <div className="player-progress">Unlocked: {unlockedContinents.length}/7 continents</div>
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
        
        <div className="world-map-container">
          {/* Layered map display */}
          <div className="map-layers">
            {mapLayers.map((layer) => (
              <div 
                key={layer.id}
                className="continent-layer"
              >
                <img 
                  src={layer.isBackground ? layer.image : 
                       unlockedContinents.includes(layer.id) ? layer.unlockedImage : 
                       layer.lockedImage} 
                  alt={layer.name} 
                  className="continent-image"
                />
              </div>
            ))}
          </div>
          
          {/* Continent selection buttons */}
          <div className="continent-buttons">
            {continentButtons.map((continent) => (
              <motion.button
                key={continent.id}
                className={`continent-btn ${unlockedContinents.includes(continent.id) || continent.id === 'asia' ? 'unlocked' : 'locked'}`}
                onClick={() => handleContinentSelect(continent.id)}
                whileHover={unlockedContinents.includes(continent.id) || continent.id === 'asia' ? { scale: 1.05 } : {}}
                whileTap={unlockedContinents.includes(continent.id) || continent.id === 'asia' ? { scale: 0.95 } : {}}
                disabled={!unlockedContinents.includes(continent.id) && continent.id !== 'asia'}
              >
                {continent.name}
                {!unlockedContinents.includes(continent.id) && continent.id !== 'asia' && (
                  <span className="btn-lock-icon">🔒</span>
                )}
              </motion.button>
            ))}
          </div>
          
          {/* Reset game button */}
          <div className="world-map-footer">
            <motion.button 
              className="btn secondary-btn reset-btn"
              onClick={onResetGame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Reset Game
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default WorldMapScreen 