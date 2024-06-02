"use client";

import { useState, useRef, useEffect } from "react";

type LoadingComponentProps = {
    type?: 'default' | 'spotify-to-apple' | 'apple-to-spotify',
    speed?: string,
    size?: 'small' | 'large',
    [key: string]: any,
  };
  
  const LoadingComponent: React.FC<LoadingComponentProps> = ({ type = 'spotify-to-apple', speed = '1s', size = 'small' }, ...rest) => {
    const [sequence, setSequence] = useState(0)

    useEffect(() => {
        const thisInterval = setInterval(() => {
            const currentSequence = sequence + 1
            setSequence(currentSequence % 4)
        }, 500)
        return () => clearInterval(thisInterval);
    }, [sequence])

    return ( type == "apple-to-spotify" ? 
        <div className={`m-auto flex grid-cols-4 ${size == 'small' ? "gap-1" : "gap-2"} w-max`} {...rest}>
            {/* <img src="loading-1.svg" className={(sequence != 0 ? `opacity-50 grayscale-[100%] brightness-[430%]` : `opacity-100 grayscale-[0%]`) + ` transition-all transition-[-webkit-filter] duration-[100ms] ${size == "small" ? "max-w-5" : "max-w-10"}`} alt="" />
            <img src="loading-2.svg" className={(sequence != 1 ? "opacity-50 brightness-[100%]" : "opacity-100 brightness-[300%]") + `transition-all transition-[-webkit-filter] duration-[100ms] ${size == "small" ? "max-w-4" : "max-w-8"}`}  alt="" />
            <img src="loading-3.svg" className={(sequence != 2 ? "opacity-50 brightness-[100%]" : "opacity-100 brightness-[300%]") + `transition-all transition-[-webkit-filter] duration-[100ms] ${size == "small" ? "max-w-4" : "max-w-8"}`} alt="" />
            <img src="loading-4.svg" className={(sequence != 3 ? `opacity-50 grayscale-[100%] brightness-[430%]` : `opacity-100 grayscale-[0%]`) + ` transition-all transition-[-webkit-filter] duration-[100ms] ${size == "small" ? "max-w-5" : "max-w-10"}`} alt="" /> */}
            <img src="loading-1.svg" className={`animate-fadeInOut1  ${size == "small" ? "max-w-5" : "max-w-10"}`} alt="" />
            <img src="loading-2.svg" className={`animate-fadeInOut2  ${size == "small" ? "max-w-4" : "max-w-8"}`}  alt="" />
            <img src="loading-3.svg" className={`animate-fadeInOut3  ${size == "small" ? "max-w-4" : "max-w-8"}`} alt="" />
            <img src="loading-4.svg" className={`animate-fadeInOut4  ${size == "small" ? "max-w-5" : "max-w-10"}`} alt="" />
        </div>
        : 
        <div className={`m-auto flex grid-cols-4 ${size == 'small' ? "gap-1" : "gap-2"}`}  {...rest}>
            <img src="loading-4.svg" className={`animate-fadeInOut1  ${size == "small" ? "max-w-5" : "max-w-10"}`} alt="" />
            <img src="loading-3.svg" className={`animate-fadeInOut2  ${size == "small" ? "max-w-4" : "max-w-8"}`}  alt="" />
            <img src="loading-2.svg" className={`animate-fadeInOut3  ${size == "small" ? "max-w-4" : "max-w-8"}`}  alt="" />
            <img src="loading-1.svg" className={`animate-fadeInOut4  ${size == "small" ? "max-w-5" : "max-w-10"}`} alt="" />
        </div>
        
        
        );
        
  };

  export default LoadingComponent;