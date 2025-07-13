import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import Footer from './footer';
import img1 from '../assets/smiski/smiski1.png';
import img2 from '../assets/smiski/smiski2.png';
import img3 from '../assets/smiski/smiski3.png';
import img4 from '../assets/smiski/smiski4.png';

const initialImages = [
  { id: 1, src: img1 },
  { id: 2, src: img2 },
  { id: 3, src: img3 },
  { id: 4, src: img4 },
  { id: 5, src: img1 },
  { id: 6, src: img2 },
  { id: 7, src: img3 },
  { id: 8, src: img4 },
];

const shuffleArray = (array) => {
  return [...array]
    .map((card) => ({ ...card, isFlipped: false, isMatched: false }))
    .sort(() => Math.random() - 0.5);
};

const SmiskiMemoryMatch = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);

  useEffect(() => {
    setCards(shuffleArray(initialImages));
  }, []);

  

  const handleCardClick = (index) => {
    const newCards = [...cards];
    if (
      flippedCards.length < 2 &&
      !newCards[index].isFlipped &&
      !newCards[index].isMatched
    ) {
      newCards[index].isFlipped = true;
      setFlippedCards([...flippedCards, index]);
      setCards(newCards);
    }
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstIndex, secondIndex] = flippedCards;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.src === secondCard.src) {
        const newCards = [...cards];
        newCards[firstIndex].isMatched = true;
        newCards[secondIndex].isMatched = true;
        setMatchedPairs((prev) => prev + 1);
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
  }, [flippedCards, cards]);

  const restartGame = () => {
    setCards(shuffleArray(initialImages));
    setFlippedCards([]);
    setMatchedPairs(0);
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen text-white text-center font-[Tiny_5] p-5">
      <h1 className='mx-auto text-text-secondary text-xl text-bold mb-12'> Memory Game</h1>

      <div className="flex flex-wrap justify-center gap-5 mb-5">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(index)}
            className="w-40 h-40 cursor-pointer perspective"
          >
            <div
              className={`card-inner ${card.isFlipped || card.isMatched ? 'flipped' : ''}`}
            >
              {/* Front side (face down) */}
              <div className="card-face card-front">
                🎴
              </div>

              {/* Back side (face up) */}
              <div className="card-face card-back">
                <img
                  src={card.src}
                  alt="Smiski"
                  className="w-[90%] h-[90%] object-contain rounded-md"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {matchedPairs === initialImages.length / 2 && (
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
    <Footer />
    </>
  );
};

export default SmiskiMemoryMatch;
