import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MemoryMatchGame = ({ pairs, onComplete }) => {
  const [cards, setCards] = useState([]);
  const [flippedIndexes, setFlippedIndexes] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [canFlip, setCanFlip] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [countDown, setCountDown] = useState(10);
  const [isComplete, setIsComplete] = useState(false);


  // Initialize cards
  useEffect(() => {
    if (!pairs) return;
    
    // Create cards from pairs (each pair has two cards)
    let newCards = [];
    pairs.forEach((pair, index) => {
      // First card of the pair
      newCards.push({
        id: `${index}-a`,
        pairId: index,
        content: pair.flag || pair.image || pair.city || pair.river || pair.landmark || pair.country || pair.place,
        type: 'first'
      });
      
      // Second card of the pair
      newCards.push({
        id: `${index}-b`,
        pairId: index,
        content: pair.country || pair.place || pair.city || pair.continent || pair.language,
        type: 'second'
      });
    });
    
    // Shuffle cards
    newCards = shuffleArray(newCards);
    setCards(newCards);
    
    // Reset game state
    setFlippedIndexes([]);
    setMatchedPairs([]);
    setIsComplete(false);
    
    // Show preview
    setShowPreview(true);
    setCountDown(10);
    setCanFlip(false);
  }, [pairs]);

  // Preview countdown timer
  useEffect(() => {
    if (!showPreview) return;

    if (countDown > 0) {
      const timer = setTimeout(() => {
        setCountDown(countDown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // End preview, flip cards back down
      setShowPreview(false);
      setCanFlip(true);
    }
  }, [countDown, showPreview]);

  // Fisher-Yates shuffle
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Handle card click
  const handleCardClick = (index) => {
    // Prevent flipping if:
    // 1. Can't flip yet (during preview)
    // 2. Card is already flipped
    // 3. Card is already matched
    // 4. Two cards are already flipped
    if (
      !canFlip || 
      flippedIndexes.includes(index) || 
      matchedPairs.flat().includes(index) ||
      flippedIndexes.length >= 2
    ) {
      return;
    }

    // Flip the card
    const newFlipped = [...flippedIndexes, index];
    setFlippedIndexes(newFlipped);

    // If two cards are flipped, check for a match
    if (newFlipped.length === 2) {
      const [firstIndex, secondIndex] = newFlipped;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      // Check if the cards are a matching pair
      if (firstCard.pairId === secondCard.pairId) {
        // It's a match!
        setMatchedPairs([...matchedPairs, newFlipped]);
        setFlippedIndexes([]);
        
        // Check if game is complete
        if (matchedPairs.length + 1 === pairs.length) {
          setIsComplete(true);
          setTimeout(() => onComplete(true), 1000);
        }
      } else {
        // Not a match, flip them back over
        setCanFlip(false);
        setTimeout(() => {
          setFlippedIndexes([]);
          setCanFlip(true);
        }, 1000);
      }
    }
  };

  return (
    <div className="memory-match-game">
      {/* Preview/Countdown overlay */}
      {showPreview && (
        <div className="memory-preview-overlay">
          <div className="memory-countdown">
            <p>Study the cards!</p>
            <h2>{countDown}</h2>
          </div>
        </div>
      )}

      {/* Cards grid */}
      <div className="memory-cards-grid">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className={`memory-card ${flippedIndexes.includes(index) || showPreview || matchedPairs.flat().includes(index) ? 'flipped' : ''} ${matchedPairs.flat().includes(index) ? 'matched' : ''}`}
            onClick={() => handleCardClick(index)}
            whileHover={canFlip ? { scale: 1.007 } : {}}
            whileTap={canFlip ? { scale: 0.97 } : {}}
          >
            <div className="card-inner">
              <div className="card-front">
                {card.content && typeof card.content === 'string' && card.content.startsWith('http') ? (
                  <img src={card.content} alt="Memory Card Content" style={{ maxWidth: '100%', maxHeight: '80px', objectFit: 'contain' }} />
                ) : (
                  card.content
                )}
              </div>
              <div className="card-back">
                ?
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Game status */}
      <div className="memory-status">
        <p>Matches: {matchedPairs.length}/{pairs.length}</p>
      </div>
    </div>
  );
};

export default MemoryMatchGame; 