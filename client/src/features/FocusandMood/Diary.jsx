// App.jsx
import React, { useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { ReactSketchCanvas } from 'react-sketch-canvas';
import "./Diary.css";

const Sticker = ({ emoji, onDragStart }) => (
  <div
    draggable
    onDragStart={(e) => onDragStart(e, emoji)}
    style={{ fontSize: "2rem", cursor: "grab", marginRight: 10 }}
  >
    {emoji}
  </div>
);

const DiaryPage = React.forwardRef(({ pageNum, stickers, setStickers, drawingsRef, notes, setNotes }, ref) => {
  const handleDrop = (e) => {
    const emoji = e.dataTransfer.getData("emoji");
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setStickers((prev) => [...prev, { page: pageNum, emoji, x, y }]);
  };

  return (
    <div
      ref={ref}
      className="page"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="page-header">📘 Page {pageNum + 1}</div>

      <div className="draw-area">
        <p className="section-label">🖊 Draw on this page:</p>
        <ReactSketchCanvas
          ref={(el) => (drawingsRef.current[pageNum] = el)}
          width={400}
          height={200}
          strokeWidth={3}
          strokeColor="black"
          style={{ border: "1px solid #ccc", borderRadius: 4 }}
        />
      </div>

      <div className="note-area">
        <p className="section-label">📝 Write Notes:</p>
        <textarea
          rows="4"
          style={{ width: "100%" }}
          value={notes[pageNum] || ""}
          onChange={(e) => setNotes({ ...notes, [pageNum]: e.target.value })}
        />
      </div>

      {stickers.filter((s) => s.page === pageNum).map((s, i) => (
        <div
          key={i}
          style={{ position: "absolute", top: s.y, left: s.x, fontSize: "2rem" }}
        >
          {s.emoji}
        </div>
      ))}
    </div>
  );
});

export default function Diary() {
  const bookRef = useRef();
  const drawingsRef = useRef([]);
  const [pages, setPages] = useState([{}]);
  const [stickers, setStickers] = useState([]);
  const [notes, setNotes] = useState({});

  const addPage = () => setPages([...pages, {}]);
  const nextPage = () => bookRef.current.pageFlip().flipNext();
  const prevPage = () => bookRef.current.pageFlip().flipPrev();

  const handleDragStart = (e, emoji) => e.dataTransfer.setData("emoji", emoji);

  return (
    <div className="diary-container">
      <div className="book-wrapper">
        <div className="book-spine"></div>
        <HTMLFlipBook
          className="book"
          width={500}
          height={600}
          size="stretch"
          maxShadowOpacity={0.5}
          ref={bookRef}
          showCover={false}
        >
          {pages.map((_, index) => (
            <DiaryPage
              key={index}
              pageNum={index}
              stickers={stickers}
              setStickers={setStickers}
              drawingsRef={drawingsRef}
              notes={notes}
              setNotes={setNotes}
            />
          ))}
        </HTMLFlipBook>
      </div>

      <div className="controls">
        <button onClick={prevPage}>← Prev</button>
        <button onClick={addPage}>➕ New Page</button>
        <button onClick={nextPage}>Next →</button>
      </div>

      <div className="sticker-panel">
        <Sticker emoji="😊" onDragStart={handleDragStart} />
        <Sticker emoji="😐" onDragStart={handleDragStart} />
        <Sticker emoji="😢" onDragStart={handleDragStart} />
        <Sticker emoji="🌈" onDragStart={handleDragStart} />
        <Sticker emoji="⭐" onDragStart={handleDragStart} />
      </div>
    </div>
  );
}
