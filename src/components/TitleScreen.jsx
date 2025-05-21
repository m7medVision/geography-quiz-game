import { motion } from 'framer-motion'
import backgroundImage from '../assets/backgrounds/bg.gif'

const TitleScreen = ({ onStart }) => {
  return (
    <motion.div 
      className="screen overflow-hidden" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      style={{ 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="content">
        <motion.h1 
          className="title"
          initial={{ y: -30 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <span className="glow">Geography Quiz Game</span>
        </motion.h1>
        
        <motion.button 
          className="btn primary-btn"
          onClick={onStart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 30 }} // Changed: Removed y: 50
          animate={{ opacity: 1, y: 0 }}   // Changed: Removed y: 0
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Start
        </motion.button>
      </div>
    </motion.div>
  )
}

export default TitleScreen 