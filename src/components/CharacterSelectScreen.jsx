import { motion } from 'framer-motion'
import backgroundImage from '../assets/backgrounds/bg.gif'
import femaleChar from '../assets/characters/DeWatermark.ai_1747751052527.png'
import maleChar from '../assets/characters/DeWatermark.ai_1747751085011.png'

const CharacterSelectScreen = ({ playerName, onSelect }) => {
  const characters = [
    { id: 'male', image: maleChar, label: 'Boy' },
    { id: 'female', image: femaleChar, label: 'Girl' }
  ]
  
  return (
    <motion.div 
      className="screen"
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
      <div className="content">
        <div className="character-select-container">
          <motion.h2 
            className="prompt"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            Choose your character
          </motion.h2>
          
          <motion.div 
            className="characters-grid"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {characters.map(char => (
              <motion.div 
                key={char.id}
                className="character-option"
                onClick={() => onSelect(char.id)}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (char.id === 'male' ? 0 : 0.2) }}
              >
                <div className="character-image-container">
                  <img 
                    src={char.image} 
                    alt={char.label} 
                    className="character-image" 
                  />
                </div>
                <p className="character-label">{char.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default CharacterSelectScreen 