import { motion } from 'framer-motion'
import backgroundImage from '../assets/backgrounds/bg.gif'
import { useState, useEffect } from 'react';

const IntroScreen = ({ onNext }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = "Welcome to the Geography Quiz Game! Test your knowledge of world geography with fun quizzes and unlock continents as you go!";

  useEffect(() => {
    if (currentIndex < fullText.length) {
      // Randomize typing speed between 20ms and 80ms
      const baseDelay = 20;
      const delayVariance = 60;
      const currentChar = fullText[currentIndex];
      
      // Add extra pause for punctuation and spaces
      let extraDelay = 0;
      if (/[.,!?]/.test(currentChar)) extraDelay = 150;
      if (currentChar === " ") extraDelay = 20;

      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + currentChar);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, baseDelay + Math.random() * delayVariance + extraDelay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  return (
    <motion.div 
      className="screen"
      initial={{ opacity: 0, }}
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
        <div className="intro-container">
          <motion.div 
            className="character-intro"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="character-avatar">
              <div className="avatar-placeholder">👤</div>
            </div>
            <div className="speech-bubble typing-animation">
              <p>{currentText}</p>
            </div>
          </motion.div>
          
          <motion.button 
            className="btn primary-btn next-btn"
            onClick={onNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Next
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default IntroScreen 