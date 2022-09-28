import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';

function Carousel() {
    const AutoplaySlider = withAutoplay(AwesomeSlider);
  return (
    <div className="">
    <AutoplaySlider
    play={true}
    cancelOnInteraction={false} // should stop playing on user interaction
    interval={6000}
    className="h-675"
  >
    <div>
        <img  src="./image/rochan.png" alt="" height="500px"/>
    </div>
    <div>
        <img className="" src="./image/anubhav.png" alt="" height="500px"/>
    </div>
    
  </AutoplaySlider>
  </div>
  )
}

export default Carousel