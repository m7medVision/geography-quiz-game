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
  const [playerLevel, setPlayerLevel] = useState(1)
  
  // All continents list in unlocking order
  const continentUnlockOrder = [
    'asia', 
    'europe', 
    'africa', 
    'northAmerica', 
    'southAmerica', 
    'australia', 
    'antarctica'
  ]
  
  // Load saved player data from localStorage on initial load
  useEffect(() => {
    const savedPlayerData = localStorage.getItem('geographyQuizPlayerData')
    
    if (savedPlayerData) {
      const parsedData = JSON.parse(savedPlayerData)
      
      // Load saved data if it exists
      if (parsedData.playerName) setPlayerName(parsedData.playerName)
      if (parsedData.characterType) setCharacterType(parsedData.characterType)
      if (parsedData.unlockedContinents && parsedData.unlockedContinents.length) {
        setUnlockedContinents(parsedData.unlockedContinents)
      }
      if (parsedData.playerLevel) setPlayerLevel(parsedData.playerLevel)
      
      // If player has saved data, skip to world map if character already selected
      if (parsedData.playerName && parsedData.characterType && gameStage === 1) {
        setGameStage(6) // Skip to world map screen
      }
    }
  }, [])
  
  // Save player data whenever relevant states change
  useEffect(() => {
    if (playerName && characterType) {
      const playerData = {
        playerName,
        characterType,
        unlockedContinents,
        playerLevel
      }
      
      localStorage.setItem('geographyQuizPlayerData', JSON.stringify(playerData))
    }
  }, [playerName, characterType, unlockedContinents, playerLevel])
  
  // Check if all continents are unlocked
  const areAllContinentsUnlocked = continentUnlockOrder.every(continent => 
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
    
    // If score is at least half, unlock the next continent in sequence
    if (score >= Math.ceil(totalQuestions / 2)) {
      // Find the current index of the continent in the unlock order
      const currentIndex = continentUnlockOrder.indexOf(continent)
      
      // If there's a next continent to unlock
      if (currentIndex >= 0 && currentIndex < continentUnlockOrder.length - 1) {
        const nextContinent = continentUnlockOrder[currentIndex + 1]
        
        // Only add to unlocked continents if it's not already unlocked
        if (!unlockedContinents.includes(nextContinent)) {
          const newUnlockedContinents = [...unlockedContinents, nextContinent]
          setUnlockedContinents(newUnlockedContinents)
          
          // Increase player level when unlocking a new continent
          setPlayerLevel(prevLevel => prevLevel + 1)
        }
      }
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
    setPlayerLevel(1)
    
    // Save the reset data to localStorage
    const resetData = {
      playerName,
      characterType,
      unlockedContinents: ['asia'],
      playerLevel: 1
    }
    localStorage.setItem('geographyQuizPlayerData', JSON.stringify(resetData))
    
    // Go back to the world map screen
    setGameStage(6)
  }
  
  // Clear saved game data and reset to beginning
  const handleResetGame = () => {
    localStorage.removeItem('geographyQuizPlayerData')
    setPlayerName('')
    setCharacterType(null)
    setUnlockedContinents(['asia'])
    setSelectedContinent(null)
    setQuizResults({})
    setPlayerLevel(1)
    setGameStage(1)
  }
  
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
            playerLevel={playerLevel}
            onSelectContinent={handleContinentSelect}
            onResetGame={handleResetGame}
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
            playerLevel={playerLevel}
            onPlayAgain={handlePlayAgain}
            onResetGame={handleResetGame}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
