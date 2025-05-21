import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { questions } from './questions'
import './App.css'

// Import components
import TitleScreen from './components/TitleScreen'
import IntroScreen from './components/IntroScreen'
import NameEntryScreen from './components/NameEntryScreen'
import CharacterSelectScreen from './components/CharacterSelectScreen'
import GameScreen from './components/GameScreen'
import WorldMapScreen from './components/WorldMapScreen'
import QuizScreen from './components/QuizScreen'
import ResultsScreen from './components/ResultsScreen'
import CelebrationScreen from './components/CelebrationScreen'

function App() {
  // Game state
  const [gameStage, setGameStage] = useState(1) // Stages 1-9 (9 is the celebration screen)
  const [playerName, setPlayerName] = useState('')
  const [characterType, setCharacterType] = useState(null)
  const [selectedContinent, setSelectedContinent] = useState(null)
  const [quizResults, setQuizResults] = useState({})
  const [unlockedContinents, setUnlockedContinents] = useState(['asia'])
  
  // All continents list
  const allContinents = ['asia', 'europe', 'africa', 'northAmerica', 'southAmerica', 'australia', 'antarctica']
  
  // Check if all continents are unlocked
  const areAllContinentsUnlocked = allContinents.every(continent => 
    unlockedContinents.includes(continent)
  )
  
  // Effect to check if all continents are unlocked after any unlock
  useEffect(() => {
    if (areAllContinentsUnlocked && gameStage === 6) {
      // If we're on the world map and all continents are unlocked,
      // proceed to the celebration screen
      setGameStage(9)
    }
  }, [unlockedContinents, areAllContinentsUnlocked, gameStage])
  
  // Stage handlers
  const handleStartGame = () => {
    setGameStage(2)
  }
  
  const handleIntroComplete = () => {
    setGameStage(3)
  }
  
  const handleNameSubmit = (name) => {
    setPlayerName(name)
    setGameStage(4)
  }
  
  const handleCharacterSelect = (character) => {
    setCharacterType(character)
    setGameStage(5)
  }
  
  const handleNextInGame = () => {
    // Proceed to the world map screen (stage 6)
    setGameStage(6)
  }
  
  const handleContinentSelect = (continent) => {
    setSelectedContinent(continent)
    // Proceed to quiz screen (stage 7)
    setGameStage(7)
  }
  
  const handleFinishQuiz = (continent, score, totalQuestions) => {
    // Save the quiz results
    setQuizResults({
      continent,
      score,
      totalQuestions
    })
    
    // If score is at least half, unlock the continent
    if (score >= Math.ceil(totalQuestions / 2) && !unlockedContinents.includes(continent)) {
      const newUnlockedContinents = [...unlockedContinents, continent]
      setUnlockedContinents(newUnlockedContinents)
    }
    
    // Proceed to results screen (stage 8)
    setGameStage(8)
  }
  
  const handleReplayQuiz = () => {
    // Go back to the quiz screen for the same continent
    setGameStage(7)
  }
  
  const handleNextContinent = () => {
    // Go back to the world map screen
    setGameStage(6)
  }
  
  const handlePlayAgain = () => {
    // Reset game state
    setUnlockedContinents(['asia'])
    setSelectedContinent(null)
    setQuizResults({})
    // Go back to the world map screen
    setGameStage(6)
  }
  
  // For debugging - uncomment to test the celebration screen
  // const debugUnlockAll = () => {
  //   setUnlockedContinents(allContinents)
  // }
  
  // Render appropriate stage
  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {gameStage === 1 && (
          <TitleScreen key="title" onStart={handleStartGame} />
        )}
        
        {gameStage === 2 && (
          <IntroScreen key="intro" onNext={handleIntroComplete} />
        )}
        
        {gameStage === 3 && (
          <NameEntryScreen key="name" onFinish={handleNameSubmit} />
        )}
        
        {gameStage === 4 && (
          <CharacterSelectScreen 
            key="character" 
            playerName={playerName}
            onSelect={handleCharacterSelect} 
          />
        )}
        
        {gameStage === 5 && (
          <GameScreen 
            key="game"
            playerName={playerName}
            characterType={characterType}
            onNext={handleNextInGame}
          />
        )}
        
        {gameStage === 6 && (
          <WorldMapScreen 
            key="world-map"
            playerName={playerName}
            characterType={characterType}
            unlockedContinents={unlockedContinents}
            onSelectContinent={handleContinentSelect}
          />
        )}
        
        {gameStage === 7 && (
          <QuizScreen 
            key="quiz"
            playerName={playerName}
            characterType={characterType}
            currentContinent={selectedContinent}
            questions={questions}
            onFinishQuiz={handleFinishQuiz}
          />
        )}
        
        {gameStage === 8 && (
          <ResultsScreen 
            key="results"
            playerName={playerName}
            characterType={characterType}
            continent={quizResults.continent}
            score={quizResults.score}
            totalQuestions={quizResults.totalQuestions}
            onReplay={handleReplayQuiz}
            onNextContinent={handleNextContinent}
          />
        )}
        
        {gameStage === 9 && (
          <CelebrationScreen
            key="celebration"
            playerName={playerName}
            characterType={characterType}
            onPlayAgain={handlePlayAgain}
          />
        )}
      </AnimatePresence>
      
      {/* Debug button - uncomment for testing */}
      {/* {gameStage === 6 && (
        <button 
          onClick={debugUnlockAll} 
          style={{position: 'absolute', bottom: 10, right: 10}}
        >
          Debug: Unlock All
        </button>
      )} */}
    </div>
  )
}

export default App
