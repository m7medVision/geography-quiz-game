import { motion } from 'framer-motion'
import backgroundImage from '../assets/backgrounds/bg.gif'
import fireworks from '../assets/celebrations/fireworks.gif'
import femaleChar from '../assets/characters/DeWatermark.ai_1747751052527.png'
import maleChar from '../assets/characters/DeWatermark.ai_1747751085011.png'

const CelebrationScreen = ({ playerName, characterType, playerLevel, onPlayAgain }) => {
  const characterImage = characterType === 'male' ? maleChar : femaleChar

  return (
    <motion.div 
      className="screen celebration-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: 'tween', duration: 0.7 }}
      style={{ 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Fireworks overlay */}
      <motion.div 
        className="fireworks-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <img src={fireworks} alt="Fireworks" className="fireworks-image" />
      </motion.div>

      <div className="content celebration-content">
        <div className="celebration-header">
          <motion.h1 
            className="celebration-title glow"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120, delay: 0.3 }}
          >
            🌍 Congratulations, {playerName}! 🌍
          </motion.h1>
          <motion.h2 
            className="celebration-subtitle"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            You have restored the magic to the entire world map!
          </motion.h2>
        </div>

        <motion.div 
          className="celebration-player-info"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="player-avatar">
            <img src={characterImage} alt="Character" className="avatar-image" />
          </div>
          <div>
            <div className="player-name">{playerName}</div>
            <div className="player-level">Level {playerLevel}</div>
          </div>
        </motion.div>

        <motion.div 
          className="unlocked-world-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, type: 'spring', stiffness: 80 }}
        >
          <div className="unlocked-world-glow"></div>
          <div className="unlocked-world-text">
            <span role="img" aria-label="sparkles">✨</span> All 7 continents are glowing! <span role="img" aria-label="sparkles">✨</span>
          </div>
        </motion.div>

        <motion.div 
          className="celebration-message"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <p>
            The magical map is complete, and the world is shining bright thanks to your knowledge and curiosity.<br/>
            <span className="glow">You are a true Explorer!</span>
          </p>
        </motion.div>

        <div className="celebration-buttons">
          <motion.button 
            className="btn primary-btn"
            onClick={onPlayAgain}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            Play Again
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default CelebrationScreen 