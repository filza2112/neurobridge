import React, { useState, useEffect } from 'react';
import img1 from '../assets/smiski/smiski1.png';
import img2 from '../assets/smiski/smiski2.png';
import img3 from '../assets/smiski/smiski3.png';
import img4 from '../assets/smiski/smiski4.png';


const smiskiImages = [
  { id: 1, src: {img1}, isFlipped: false, isMatched: false },
  { id: 2, src: {img2}, isFlipped: false, isMatched: false },
  { id: 3, src: {img3}, isFlipped: false, isMatched: false },
  { id: 4, src: {img4}, isFlipped: false, isMatched: false },
  { id: 5, src: {img1}, isFlipped: false, isMatched: false },
  { id: 6, src: {img2}, isFlipped: false, isMatched: false },
  { id: 7, src: {img3}, isFlipped: false, isMatched: false },
  { id: 8, src: {img4}, isFlipped: false, isMatched: false },
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
    if (flippedCards.length < 2 && !newCards[index].isFlipped && !newCards[index].isMatched) {
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
    <div className="min-h-screen bg-black text-center font-[Tiny_5] p-5 text-white">
      <h2 className="text-2xl mb-5">Smiski Memory Match</h2>
      
      <div className="flex flex-wrap justify-center gap-5 mb-5">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(index)}
            className={`w-48 h-48 cursor-pointer border-2 border-[#8ca1a5] rounded-lg shadow-md transition-transform duration-300 perspective relative ${
              card.isFlipped || card.isMatched ? 'scale-105' : ''
            }`}
          >
            <div className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${card.isFlipped ? 'rotate-y-180' : ''}`}>
              {/* Front */}
              <div className="absolute w-full h-full rounded-lg backface-hidden bg-[#a34141] flex items-center justify-center shadow-md">
                {(card.isFlipped || card.isMatched) && (
                  <img
                    src={card.src}
                    alt="Smiski"
                    className="w-[90%] h-[90%] object-cover rounded-md"
                  />
                )}
              </div>
              {/* Back */}
              <div className="absolute w-full h-full rounded-lg backface-hidden bg-[#ececf1] text-black text-2xl flex items-center justify-center transform rotate-y-180">
                {!card.isFlipped && !card.isMatched && '🎴'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {matchedPairs === smiskiImages.length / 2 && (
        <div className="mt-5">
          <h3 className="text-lg mb-2">🎉 Congratulations! You matched all pairs! 🎉</h3>
          <button
            onClick={restartGame}
            className="bg-[#f4f7f7] text-yellow-900 px-5 py-2 rounded-md text-base hover:bg-[#4a7781] transition-colors duration-300"
          >
            Play Again!
          </button>
        </div>
      )}
    </div>
  );
};

export default SmiskiMemoryMatch;
