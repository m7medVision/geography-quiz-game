import { useState } from 'react'
import { motion } from 'framer-motion'
import backgroundImage from '../assets/backgrounds/bg.gif'

const NameEntryScreen = ({ onFinish }) => {
  const [name, setName] = useState('')
  
  const handleFinish = () => {
    if (name.trim()) {
      onFinish(name)
    }
  }
  
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
        <div className="name-entry-container">
          <motion.h2 
            className="prompt"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            Enter your name!
          </motion.h2>
          
          <motion.div 
            className="input-container"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="name-input"
              maxLength={20}
            />
          </motion.div>
          
          <motion.button 
            className="btn primary-btn"
            onClick={handleFinish}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            disabled={!name.trim()}
          >
            Finish
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default NameEntryScreen 