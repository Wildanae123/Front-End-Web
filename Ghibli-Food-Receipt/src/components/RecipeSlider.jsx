// src/components/RecipeSlider.jsx
import React, { useState } from 'react';

function RecipeSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="recipe-slider">
      <button onClick={prevSlide} className="slider-button prev">
        &#10094;
      </button>
      <img 
        src={images[currentIndex]} 
        alt={`Ghibli food slide ${currentIndex + 1}`} 
        className="slider-image"
      />
      <button onClick={nextSlide} className="slider-button next">
        &#10095;
      </button>
    </div>
  );
}

export default RecipeSlider;