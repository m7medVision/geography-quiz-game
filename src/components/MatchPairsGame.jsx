import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MatchPairsGame = ({ pairs, onComplete }) => {
  const [leftItems, setLeftItems] = useState([]);
  const [rightItems, setRightItems] = useState([]);
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [matches, setMatches] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  // Initialize the game
  useEffect(() => {
    if (!pairs) return;
    
    // Create left and right sides
    const left = [];
    const right = [];
    
    pairs.forEach((pair, index) => {
      // Get all the keys and values from the pair object
      const pairKeys = Object.keys(pair);
      
      // Smart extraction based on known patterns
      let leftValue, rightValue;
      
      // Define which properties typically go on which side
      const leftSideProps = ['city', 'capital', 'landmark', 'place', 'flag', 'image', 'river', 'animal', 'feature'];
      const rightSideProps = ['country', 'continent', 'language', 'description', 'category'];
      
      // Find the left and right properties
      const leftProp = pairKeys.find(key => leftSideProps.includes(key));
      const rightProp = pairKeys.find(key => rightSideProps.includes(key));
      
      if (leftProp && rightProp) {
        leftValue = pair[leftProp];
        rightValue = pair[rightProp];
      } else {
        // Fallback to first two properties if no semantic match
        const values = Object.values(pair);
        leftValue = values[0];
        rightValue = values[1];
      }
      
      left.push({
        id: index,
        text: leftValue
      });
      
      right.push({
        id: index,
        text: rightValue
      });
    });
    
    // Shuffle both arrays
    setLeftItems(shuffleArray([...left]));
    setRightItems(shuffleArray([...right]));
    setMatches([]);
    setSelectedLeft(null);
    setSelectedRight(null);
    setIsComplete(false);
    setIsCorrect(null);
  }, [pairs]);

  // Fisher-Yates shuffle
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Handle item selection on the left
  const handleLeftSelect = (item) => {
    // If this item is already matched, ignore
    if (matches.some(match => match.leftId === item.id)) {
      return;
    }
    
    setSelectedLeft(item);
    
    // If we already have a right item selected, check for a match
    if (selectedRight) {
      checkForMatch(item, selectedRight);
    }
  };
  
  // Handle item selection on the right
  const handleRightSelect = (item) => {
    // If this item is already matched, ignore
    if (matches.some(match => match.rightId === item.id)) {
      return;
    }
    
    setSelectedRight(item);
    
    // If we already have a left item selected, check for a match
    if (selectedLeft) {
      checkForMatch(selectedLeft, item);
    }
  };
  
  // Check if selected items form a match
  const checkForMatch = (leftItem, rightItem) => {
    // If they have the same ID, they match
    if (leftItem.id === rightItem.id) {
      // Add the match
      const newMatches = [...matches, { leftId: leftItem.id, rightId: rightItem.id }];
      setMatches(newMatches);
      
      // Clear selections
      setSelectedLeft(null);
      setSelectedRight(null);
      
      // Check if the game is complete
      if (newMatches.length === pairs.length) {
        setIsComplete(true);
        setIsCorrect(true);
        setTimeout(() => onComplete(true), 1000);
      }
    } else {
      // Not a match, deselect after a delay
      setTimeout(() => {
        setSelectedLeft(null);
        setSelectedRight(null);
      }, 1000);
    }
  };
  
  return (
    <div className="match-pairs-game">
      <div className="match-columns">
        <div className="left-column">
          {leftItems.map((item) => (
            <motion.div
              key={`left-${item.id}`}
              className={`match-item left-item ${
                selectedLeft?.id === item.id ? 'selected' : ''
              } ${
                matches.some(match => match.leftId === item.id) ? 'matched' : ''
              }`}
              onClick={() => !matches.some(match => match.leftId === item.id) && handleLeftSelect(item)}
              whileHover={{ scale: 1.007 }}
              whileTap={{ scale: 0.97 }}
            >
              {item.text && typeof item.text === 'string' && item.text.startsWith('http') ? (
                <img src={item.text} alt="Match Item" style={{ maxWidth: '100%', maxHeight: '50px', objectFit: 'contain' }} />
              ) : (
                item.text
              )}
            </motion.div>
          ))}
        </div>
        
        <div className="match-lines">
          {matches.map((match, index) => {
            // Find positions of matched items to draw lines
            const leftItemIndex = leftItems.findIndex(item => item.id === match.leftId);
            const rightItemIndex = rightItems.findIndex(item => item.id === match.rightId);
            
            return (
              <svg key={index} className="match-line">
                <line 
                  x1="0" 
                  y1={(leftItemIndex * 60) + 30} 
                  x2="100%" 
                  y2={(rightItemIndex * 60) + 30}
                  stroke="#4facfe"
                  strokeWidth="2"
                />
              </svg>
            );
          })}
        </div>
        
        <div className="right-column">
          {rightItems.map((item) => (
            <motion.div
              key={`right-${item.id}`}
              className={`match-item right-item ${
                selectedRight?.id === item.id ? 'selected' : ''
              } ${
                matches.some(match => match.rightId === item.id) ? 'matched' : ''
              }`}
              onClick={() => !matches.some(match => match.rightId === item.id) && handleRightSelect(item)}
              whileHover={{ scale: 1.007 }}
              whileTap={{ scale: 0.97 }}
            >
              {item.text && typeof item.text === 'string' && item.text.startsWith('http') ? (
                <img src={item.text} alt="Match Item" style={{ maxWidth: '100%', maxHeight: '50px', objectFit: 'contain' }} />
              ) : (
                item.text
              )}
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="match-status">
        <p>Matches: {matches.length}/{pairs.length}</p>
      </div>
      
      {isComplete && (
        <div className="feedback correct-feedback">
          Great job! All pairs matched correctly!
        </div>
      )}
    </div>
  );
};

export default MatchPairsGame; 