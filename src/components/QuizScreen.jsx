import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import backgroundImage from '../assets/backgrounds/bg.gif'
import femaleChar from '../assets/characters/DeWatermark.ai_1747751052527.png'
import maleChar from '../assets/characters/DeWatermark.ai_1747751085011.png'

// Import game components
import MemoryMatchGame from './MemoryMatchGame'
import MatchPairsGame from './MatchPairsGame'

const QuizScreen = ({ playerName, characterType, currentContinent, questions, onFinishQuiz }) => {
  const characterImage = characterType === 'male' ? maleChar : femaleChar
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)
  const [score, setScore] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [textInput, setTextInput] = useState('')
  const [difficulty, setDifficulty] = useState('easy')
  
  // Get the appropriate difficulty level for current progress
  useEffect(() => {
    const continentKey = currentContinent;
    
    // Check if the continent exists in questions
    if (questions[continentKey]) {
      // Determine difficulty based on score or default to easy
      // This is a simple implementation - you could enhance this
      // to be based on player progress or other game state
      setDifficulty('easy');
    } else {
      setDifficulty('easy'); // Default fallback
    }
  }, [currentContinent, questions]);
  
  // Get questions for the selected continent and difficulty
  const continentKey = currentContinent;
  const continentQuestions = questions[continentKey] && questions[continentKey][difficulty] 
    ? questions[continentKey][difficulty] 
    : [];
  
  const currentQuestion = continentQuestions[currentQuestionIndex];
  
  // Prepare question text
  const questionText = currentQuestion 
    ? `Question ${currentQuestionIndex + 1}/${continentQuestions.length}: ${currentQuestion.question}` 
    : 'Loading question...';
  
  // Text typing effect
  useEffect(() => {
    if (isTyping) {
      const text = questionText;
      let currentIndex = 0;
      
      const typingInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
        }
      }, 30);
      
      return () => clearInterval(typingInterval);
    }
  }, [isTyping, questionText]);
  
  // Reset typing state when question changes
  useEffect(() => {
    setIsTyping(true);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setTextInput('');
  }, [currentQuestionIndex]);
  
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    
    // Check if the answer is correct based on question type
    if (currentQuestion.type === 'multiple-choice' || currentQuestion.type === 'true-false') {
      const isAnswerCorrect = answer === currentQuestion.answer;
      setIsCorrect(isAnswerCorrect);
      
      if (isAnswerCorrect) {
        setScore(score + 1);
      }
    }
  };
  
  const handleGameComplete = (success) => {
    setIsCorrect(success);
    
    if (success) {
      setScore(score + 1);
    }
    
    // Auto advance to next question after a delay
    setTimeout(() => {
      handleNextQuestion();
    }, 2000);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < continentQuestions.length - 1) {
      // Go to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Finish the quiz
      onFinishQuiz(currentContinent, score, continentQuestions.length);
    }
  };
  
  // Render different question types
  const renderQuestionContent = () => {
    if (!currentQuestion) return null;
    
    switch (currentQuestion.type) {
      case 'multiple-choice':
        return (
          <div className="question-content multiple-choice">
            <div className="options-container">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={index}
                  className={`option-btn ${selectedAnswer === option ? 'selected' : ''} 
                             ${isCorrect !== null && option === currentQuestion.answer ? 'correct' : ''}
                             ${isCorrect === false && selectedAnswer === option ? 'incorrect' : ''}`}
                  onClick={() => isCorrect === null && handleAnswerSelect(option)}
                  whileHover={{ scale: 1.007 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isCorrect !== null}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </div>
        );
      
      case 'true-false':
        return (
          <div className="question-content true-false">
            <div className="options-container">
              <motion.button
                className={`option-btn ${selectedAnswer === true ? 'selected' : ''} 
                          ${isCorrect !== null && currentQuestion.answer === true ? 'correct' : ''}
                          ${isCorrect === false && selectedAnswer === true ? 'incorrect' : ''}`}
                onClick={() => isCorrect === null && handleAnswerSelect(true)}
                whileHover={{ scale: 1.007 }}
                whileTap={{ scale: 0.98 }}
                disabled={isCorrect !== null}
              >
                True
              </motion.button>
              <motion.button
                className={`option-btn ${selectedAnswer === false ? 'selected' : ''} 
                          ${isCorrect !== null && currentQuestion.answer === false ? 'correct' : ''}
                          ${isCorrect === false && selectedAnswer === false ? 'incorrect' : ''}`}
                onClick={() => isCorrect === null && handleAnswerSelect(false)}
                whileHover={{ scale: 1.007 }}
                whileTap={{ scale: 0.98 }}
                disabled={isCorrect !== null}
              >
                False
              </motion.button>
            </div>
          </div>
        );
      
      case 'fill-blank':
        return (
          <div className="question-content fill-blank">
            <input
              type="text"
              className="fill-blank-input"
              placeholder="Type your answer..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              disabled={isCorrect !== null}
            />
            <motion.button
              className="btn primary-btn check-btn"
              onClick={() => {
                const isAnswerCorrect = textInput.toLowerCase().trim() === currentQuestion.answer.toLowerCase().trim();
                setIsCorrect(isAnswerCorrect);
                setSelectedAnswer(textInput);
                if (isAnswerCorrect) {
                  setScore(score + 1);
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!textInput || isCorrect !== null}
            >
              Check
            </motion.button>
          </div>
        );
      
      case 'match-flag':
      case 'match-image':
        return (
          <div className="question-content memory-match">
            <MemoryMatchGame 
              pairs={currentQuestion.pairs} 
              onComplete={handleGameComplete} 
            />
          </div>
        );
      
      case 'match':
        return (
          <div className="question-content match-pairs">
            <MatchPairsGame 
              pairs={currentQuestion.pairs} 
              onComplete={handleGameComplete} 
            />
          </div>
        );
      
      default:
        return <div>Question type not supported.</div>;
    }
  };
  
  return (
    <motion.div 
      className="screen quiz-screen"
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
      <div className="content quiz-content">
        <div className="quiz-header">
          <h2 className="continent-title">{currentContinent}</h2>
          <div className="score-display">Score: {score}/{continentQuestions.length}</div>
        </div>
        
        <div className="character-intro">
          <div className="character-avatar">
            <img src={characterImage} alt="Character" className="avatar-image" />
          </div>
          <div className="speech-bubble">
            <p>{displayedText}</p>
            
            {!isTyping && renderQuestionContent()}
            
            {isCorrect !== null && !['match-flag', 'match-image', 'match'].includes(currentQuestion?.type) && (
              <div className="feedback-container">
                <p className={`feedback ${isCorrect ? 'correct-feedback' : 'incorrect-feedback'}`}>
                  {isCorrect ? 'Correct!' : `Incorrect. The answer is ${currentQuestion.answer}.`}
                </p>
                <motion.button 
                  className="btn secondary-btn next-btn"
                  onClick={handleNextQuestion}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentQuestionIndex < continentQuestions.length - 1 ? 'Next Question' : 'See Results'}
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default QuizScreen 