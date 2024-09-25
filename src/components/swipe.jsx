import React, { useState, useRef } from 'react';
import './swipe.css';

const SwipeButton = ({ onComplete }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(0);
  const buttonRef = useRef(null);
  const containerRef = useRef(null);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDrag = (e) => {
    if (!isDragging) return;

    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const buttonWidth = buttonRef.current.offsetWidth;

    const newXPosition = Math.min(
      Math.max(0, e.clientX - container.offsetLeft - buttonWidth / 2),
      containerWidth - buttonWidth
    );

    setPosition(newXPosition);
  };

  const handleDragEnd = () => {
    setIsDragging(false);

    const containerWidth = containerRef.current.offsetWidth;
    const buttonWidth = buttonRef.current.offsetWidth;

    if (position > (containerWidth - buttonWidth) * 0.8) {
      setPosition(containerWidth - buttonWidth);
      onComplete();
    } else {
      setPosition(0);
    }
  };

  return (
    <div className='swipe_block'>

    <div
      className="swipe-button-container"
      ref={containerRef}
      onMouseMove={handleDrag}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      style={{
          background: `linear-gradient(to right, #ffffff ${((position + 25) / containerRef.current?.offsetWidth) * 100}%, #73796d 0%)`,
        }}
        >
      <div
        className="swipe-button"
        ref={buttonRef}
        style={{ transform: `translateX(${position}px)` }}
        onMouseDown={handleDragStart}
        >
        ➔ {}
          </div>
          <span className='swipe_heading'>swipe right</span>
      </div>


    </div>
  );
};

export default SwipeButton;
