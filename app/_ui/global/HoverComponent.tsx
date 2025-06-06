import React, { useState, UIEvent } from "react";
import clsx from "clsx"; // Make sure you have clsx installed: npm install clsx

interface HoverComponentProps{
  src: string;
}

const HoverComponent = ({src} : HoverComponentProps) => {
  const [imageSrc, setImageSrc] = useState("");
  const [showImage, setShowImage] = useState(false)

  const handleMouseEnter = () => {
    setImageSrc(src); // Your image URL
    setShowImage(true)
  };
  const handleMouseLeave = () => {
    setImageSrc(src); // Your image URL
    setShowImage(false)
  };


  return (
    <div 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave} 
      style={{width: '25px', height: '25px', border: '1px solid black' }}
    >
      <img src="/show-image.svg"/>

      {imageSrc != "" ? (
        <img src={imageSrc} alt="Hover to load" style={showImage ? { left: "80px", top: "30px", position: "fixed", maxWidth: '100%', maxHeight: '100%'} : {display : "none"}} />
      ) : (
        <img src={imageSrc} alt="Hover to load" style={showImage ? { left: "80px", top: "30px", position: "fixed", maxWidth: '100%', maxHeight: '100%'} : {display : "none"}} />
      )}
    </div>
  );
};

export default HoverComponent;
