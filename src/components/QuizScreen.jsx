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
  const [allQuestions, setAllQuestions] = useState([])
  
  // Load ALL questions from all difficulty levels for the current continent
  useEffect(() => {
    const continentKey = currentContinent;
    
    if (questions[continentKey]) {
      let combinedQuestions = [];
      
      // Get questions from all difficulty levels
      const difficulties = ['easy', 'medium', 'hard'];
      
      difficulties.forEach(difficulty => {
        if (questions[continentKey][difficulty]) {
          // Add difficulty property to each question
          const questionsWithDifficulty = questions[continentKey][difficulty].map(question => ({
            ...question,
            difficulty: difficulty
          }));
          combinedQuestions = [...combinedQuestions, ...questionsWithDifficulty];
        }
      });
      
      // Shuffle the combined questions to mix difficulties
      const shuffledQuestions = shuffleArray(combinedQuestions);
      setAllQuestions(shuffledQuestions);
    } else {
      setAllQuestions([]);
    }
  }, [currentContinent, questions]);
  
  // Fisher-Yates shuffle function
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  
  const currentQuestion = allQuestions[currentQuestionIndex];
  
  // Get difficulty display info
  const getDifficultyInfo = (difficulty) => {
    switch(difficulty) {
      case 'easy':
        return { label: 'Easy Question', color: '#4CAF50', emoji: '😊' };
      case 'medium':
        return { label: 'Medium Question', color: '#FF9800', emoji: '🤔' };
      case 'hard':
        return { label: 'Hard Question', color: '#F44336', emoji: '😤' };
      default:
        return { label: 'Question', color: '#2196F3', emoji: '❓' };
    }
  };
  
  // Prepare question text with difficulty indicator
  const questionText = currentQuestion 
    ? `Question ${currentQuestionIndex + 1}/${allQuestions.length}: ${currentQuestion.question}` 
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
    if (currentQuestionIndex < allQuestions.length - 1) {
      // Go to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Finish the quiz
      onFinishQuiz(currentContinent, score, allQuestions.length);
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
          <div className="score-display">Score: {score}/{allQuestions.length}</div>
        </div>
        
        {/* Difficulty indicator */}
        {currentQuestion && (
          <div className="difficulty-indicator">
            <motion.div 
              className="difficulty-badge"
              style={{ 
                backgroundColor: getDifficultyInfo(currentQuestion.difficulty).color,
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 'bold',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px'
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              <span>{getDifficultyInfo(currentQuestion.difficulty).emoji}</span>
              <span>{getDifficultyInfo(currentQuestion.difficulty).label}</span>
            </motion.div>
          </div>
        )}
        
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
                  {currentQuestionIndex < allQuestions.length - 1 ? 'Next Question' : 'See Results'}
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