import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Import available map assets
import africaMap from '../assets/maps/unlocked/africa_map.png';
import europeMap from '../assets/maps/unlocked/europe_map.png';
import northAmericaMap from '../assets/maps/unlocked/north_america_map.png';
import oceanBackground from '../assets/maps/oceans/title-background.png';

const DragDropGame = ({ items, mapType, targetPositions, onComplete }) => {
  const [placedItems, setPlacedItems] = useState({});
  const [availableItems, setAvailableItems] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [attempts, setAttempts] = useState(0);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );
  
  // Initialize the game
  useEffect(() => {
    if (!items) return;
    
    // Shuffle items
    const shuffledItems = [...items].sort(() => Math.random() - 0.5);
    setAvailableItems(shuffledItems.map((item, index) => ({ id: index, text: item })));
    setPlacedItems({});
    setIsCorrect(null);
    setAttempts(0);
  }, [items]);
  
  // Get the appropriate map background based on the type
  const getMapBackground = () => {
    switch (mapType) {
      case 'continents':
        return africaMap; // Fallback to Africa map
      case 'oceans':
        return oceanBackground;
      case 'compass':
        return europeMap; // Fallback to Europe map
      case 'north_america':
        return northAmericaMap;
      default:
        return africaMap; // Default fallback
    }
  };
  
  // Handle when a draggable item is dropped
  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    // If dropped on a target
    if (over && over.id.toString().startsWith('target-')) {
      const targetId = over.id.toString().replace('target-', '');
      const itemId = active.id;
      
      // Update placed items
      setPlacedItems(prev => {
        // Remove the item from any previous target
        const newPlaced = { ...prev };
        Object.keys(newPlaced).forEach(key => {
          if (newPlaced[key] === itemId) {
            delete newPlaced[key];
          }
        });
        
        // Place in new target
        newPlaced[targetId] = itemId;
        return newPlaced;
      });
    }
  };
  
  // Check if all placements are correct
  const checkAnswers = () => {
    const numPlaced = Object.keys(placedItems).length;
    
    // Not all items are placed
    if (numPlaced !== items.length) {
      return false;
    }
    
    // Check if items are placed in the correct targets
    let correct = true;
    Object.entries(placedItems).forEach(([targetId, itemId]) => {
      const targetIndex = parseInt(targetId);
      const correctItemText = targetPositions[targetIndex];
      const placedItemText = availableItems.find(item => item.id === itemId)?.text;
      
      if (correctItemText !== placedItemText) {
        correct = false;
      }
    });
    
    return correct;
  };
  
  // Submit the answer
  const handleCheck = () => {
    const isAllCorrect = checkAnswers();
    setIsCorrect(isAllCorrect);
    setAttempts(prev => prev + 1);
    
    if (isAllCorrect) {
      setTimeout(() => onComplete(true), 1500);
    } else if (attempts >= 2) {
      // If failed 3 times, show the correct answers and mark as incorrect
      setTimeout(() => onComplete(false), 1500);
    }
  };
  
  // Reset placements
  const handleReset = () => {
    setPlacedItems({});
    setIsCorrect(null);
  };
  
  return (
    <div className="drag-drop-game" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <DndContext 
        sensors={sensors} 
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div 
          className="map-container" 
          style={{ 
            backgroundImage: `url(${getMapBackground()})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            flex: '1',
            position: 'relative',
            minHeight: '200px'
          }}
        >
          {/* Drop zones */}
          {targetPositions && targetPositions.map((item, index) => (
            <motion.div
              key={`target-${index}`}
              id={`target-${index}`}
              className={`drop-target ${placedItems[index] !== undefined ? 'filled' : ''} ${
                isCorrect !== null ? 
                  (placedItems[index] !== undefined && 
                   availableItems.find(i => i.id === placedItems[index])?.text === item ? 
                    'correct' : 'incorrect') : 
                  ''
              }`}
              style={{
                position: 'absolute',
                top: `${(index + 1) * 15}%`, 
                left: `${(index + 1) * 15}%`
              }}
              whileHover={{ scale: 1.05 }}
            >
              {placedItems[index] !== undefined && (
                <div className="placed-item">
                  {availableItems.find(item => item.id === placedItems[index])?.text}
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        <div 
          className="draggable-items" 
          style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center', 
            gap: '10px', 
            padding: '10px',
            maxHeight: 'fit-content',
            overflow: 'visible'
          }}
        >
          {availableItems.map(item => (
            <DraggableItem
              key={item.id}
              id={item.id}
              text={item.text}
              disabled={Object.values(placedItems).includes(item.id) || isCorrect !== null}
            />
          ))}
        </div>
      </DndContext>
      
      <div className="drag-drop-controls" style={{ display: 'flex', justifyContent: 'center', gap: '10px', padding: '10px' }}>
        <motion.button
          className="btn primary-btn"
          onClick={handleCheck}
          disabled={Object.keys(placedItems).length !== items.length || isCorrect !== null}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Check Answers
        </motion.button>
        
        <motion.button
          className="btn secondary-btn"
          onClick={handleReset}
          disabled={Object.keys(placedItems).length === 0 || isCorrect === true}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Reset
        </motion.button>
      </div>
      
      {isCorrect !== null && (
        <div className={`feedback ${isCorrect ? 'correct-feedback' : 'incorrect-feedback'}`}>
          {isCorrect ? 'Correct! All items placed correctly!' : `Try again! (${3 - attempts} attempts left)`}
        </div>
      )}
    </div>
  );
};

// Draggable item component
const DraggableItem = ({ id, text, disabled }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: disabled ? 0.5 : 1,
    padding: '10px 15px',
    background: '#4a90e2',
    color: 'white',
    borderRadius: '5px',
    cursor: disabled ? 'not-allowed' : 'grab',
    userSelect: 'none',
    margin: '5px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
  };
  
  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className={`draggable-item ${disabled ? 'disabled' : ''}`}
      {...attributes}
      {...(!disabled && listeners)}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
    >
      {text}
    </motion.div>
  );
};

export default DragDropGame; 