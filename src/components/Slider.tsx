
import { useRef, useEffect } from 'react';

import { slidingImages } from '../constants/constants';
import SliderItem from './SliderItem';

const Slider = () => {

  
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const sliderContainerRef = useRef<HTMLDivElement | null>(null);
  const sliderPrevButtonRef = useRef<HTMLButtonElement | null>(null);
  const sliderNextButtonRef = useRef<HTMLButtonElement | null>(null);


  let currentSlidePos = 0;

  useEffect(() => {
    
    if (!sliderRef.current || !sliderContainerRef.current || !sliderNextButtonRef.current || !sliderPrevButtonRef.current) {
      return;
    }

    const sliderContainer = sliderContainerRef.current;
    const sliderPrevButton = sliderPrevButtonRef.current;
    const sliderNextButton = sliderNextButtonRef.current;

    // Fetch the item count from CSS variable --slider-item
    const totalVisibleItems = parseInt(getComputedStyle(sliderRef.current).getPropertyValue("--slider-item"), 10);

    // Rest of your slider initialization code
    const totalSliderItems = sliderContainer.childElementCount - totalVisibleItems;

    const slideNext = function () {
      currentSlidePos++;

      // Cast the element as HTMLElement
      const currentSlide = sliderContainer.children[currentSlidePos] as HTMLElement;
      sliderContainer.style.transform = `translateX(-${currentSlide.offsetLeft}px)`;

      if (currentSlidePos >= totalSliderItems) {
        sliderNextButton.setAttribute("disabled", "true");
      }
      if (currentSlidePos > 0) {
        sliderPrevButton.removeAttribute("disabled");
      }
    }

    const slidePrev = function () {
      currentSlidePos--;

      const currentSlide = sliderContainer.children[currentSlidePos] as HTMLElement;
      sliderContainer.style.transform = `translateX(-${currentSlide.offsetLeft}px)`;

      if (currentSlidePos <= 0) {
        sliderPrevButton.setAttribute("disabled", "true");
      }
      if (currentSlidePos < totalSliderItems) {
        sliderNextButton.removeAttribute("disabled");
      }
    }

    sliderNextButton?.addEventListener("click", slideNext);
    sliderPrevButton?.addEventListener("click", slidePrev)
    

    const dontHaveExtraItem = totalSliderItems <= 0;
    if (dontHaveExtraItem) {
      sliderNextButton.setAttribute("disabled", "true");
    }
    sliderPrevButton.setAttribute("disabled", "true");
    return () => {
      // Cleanup any event listeners if needed
      sliderNextButton?.removeEventListener("click", slideNext);
      sliderPrevButton?.removeEventListener("click", slidePrev);
    }
  }, [currentSlidePos])
  

  return (

    <div ref={sliderRef} className="slider poster-slider">

      <div ref={sliderContainerRef} className="slider-container">

        {slidingImages.map(img => (
          <SliderItem
            key={img.key}
            src={img.image}
            width={img.width}
            height={img.height}
          />
        ))}
        
      </div>

      <button ref={sliderPrevButtonRef} className="btn-icon slider-control prev">
        <span className="material-symbols-outlined">chevron_left</span>
      </button>

      <button ref={sliderNextButtonRef} className="btn-icon slider-control next">
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </div>
  )
}

export default Slider