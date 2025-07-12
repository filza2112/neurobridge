// src/components/SmiskiMemoryMatch.js
import React, { useState, useEffect } from 'react';
import "./Memory.css";
import img1 from './smiski/smiski1.png'

const smiskiImages = [
  { id: 1, src: {img1}, isFlipped: false, isMatched: false },
  { id: 2, src: './smiski/smiski2.png', isFlipped: false, isMatched: false },
  { id: 3, src: './smiski/smiski3.png', isFlipped: false, isMatched: false },
  { id: 4, src: './smiski/smiski4.png', isFlipped: false, isMatched: false },
  // Duplicate each image for pairs
  { id: 5, src: '/smiski/smiski1.png', isFlipped: false, isMatched: false },
  { id: 6, src: '/smiski/smiski2.png', isFlipped: false, isMatched: false },
  { id: 7, src: '/smiski/smiski3.png', isFlipped: false, isMatched: false },
  { id: 8, src: '/smiski/smiski4.png', isFlipped: false, isMatched: false },
];

const SmiskiMemoryMatch = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);

  useEffect(() => {
    setCards(shuffleArray([...smiskiImages]));
  }, []);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleCardClick = (index) => {
    const newCards = [...cards];
    if (flippedCards.length < 2 && !newCards[index].isFlipped) {
      newCards[index].isFlipped = true;
      setFlippedCards([...flippedCards, index]);
      setCards(newCards);
    }
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstIndex, secondIndex] = flippedCards;
      if (cards[firstIndex].src === cards[secondIndex].src) {
        const newCards = [...cards];
        newCards[firstIndex].isMatched = true;
        newCards[secondIndex].isMatched = true;
        setMatchedPairs(matchedPairs + 1);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          const newCards = [...cards];
          newCards[firstIndex].isFlipped = false;
          newCards[secondIndex].isFlipped = false;
          setCards(newCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards, matchedPairs]);

  const restartGame = () => {
    const resetCards = smiskiImages.map(card => ({ ...card, isFlipped: false, isMatched: false }));
    setCards(shuffleArray([...resetCards]));
    setFlippedCards([]);
    setMatchedPairs(0);
  };

  return (
    <div className="smiski-memory-match">
      <h2>Smiski Memory Match</h2>
      <div className="cards-grid">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${card.isFlipped ? 'flipped' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            {card.isFlipped || card.isMatched ? (
              <img src={card.src} alt="Smiski" />
            ) : (
              <div className="card-back"></div>
            )}
          </div>
        ))}

        
      {/* </div>
      {matchedPairs === smiskiImages.length / 2 && <h3>You matched all pairs!</h3>}
    </div> */}
    </div>
      {matchedPairs === smiskiImages.length / 2 && (
        <div className="congratulations">
          <h3>congratulations! you matched all pairs!</h3>
          <button onClick={restartGame}>play again!</button>
        </div>
      )}
    </div>
  );
};

export default SmiskiMemoryMatch;

