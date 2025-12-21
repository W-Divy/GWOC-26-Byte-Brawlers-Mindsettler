// app/components/EmailSubscription.jsx (for App Router)
'use client'; // Required for client-side interactivity

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';


function Kirby({ swallow, spit, onAnimationDone }: { swallow: boolean; spit: boolean; onAnimationDone?: () => void }) {
  const [animationState, setAnimationState] = useState('idle');
  const kirbyRef = useRef(null);

  useEffect(() => {
    if (swallow) {
      playSwallowAnimation();
    } else if (spit) {
      playSpitAnimation();
    }
  }, [swallow, spit ,onAnimationDone]);

  const playSwallowAnimation = () => {
    setAnimationState('swallowing');
    const tl = gsap.timeline();
    
    tl.to(kirbyRef.current, {
      scale: 1.2,
      duration: 0.3
    })
    .to(kirbyRef.current, {
      scale: 1,
      duration: 0.3,
    })
    .call(() => {
        setAnimationState('swallowing');
        setAnimationState('happy');
        setTimeout(() => {
            if (onAnimationDone) onAnimationDone();
        }, 2000);
    });
  };

  const playSpitAnimation = () => {
    setAnimationState('spitting');
    const tl = gsap.timeline();
    
    tl.to(kirbyRef.current, {
      x: -50,
      duration: 0.2
    })
    .to(kirbyRef.current, {
      x: 0,
      duration: 0.2
    })
    .call(() => {
    setAnimationState('spitting');
    //   setAnimationState('angry');
      setTimeout(() => {
        if (onAnimationDone) onAnimationDone();
      }, 2000);
    });
  };

  return (
    <div className="kirby-container" ref={kirbyRef}>
      {/* Simple Kirby SVG representation */}
      <svg width="120" height="120" viewBox="0 0 120 120">
        {/* Kirby body */}
        <circle cx="60" cy="60" r="50" fill="#FFB6C1" />
        {/* Eyes */}
        <circle cx="45" cy="50" r="8" fill="black" />
        <circle cx="75" cy="50" r="8" fill="black" />
        {/* Mouth - changes based on state */}
        {animationState === 'idle' && (
          <path d="M45,75 Q60,85 75,75" stroke="black" fill="transparent" strokeWidth="3" />
        )}
        {animationState === 'swallowing' && (
          <circle cx="60" cy="75" r="15" fill="black" />
        )}
        {animationState === 'spitting' && (
          <path d="M40,70 Q60,60 80,70" stroke="black" fill="transparent" strokeWidth="3" />
        )}
        {animationState === 'happy' && (
          <path d="M45,80 Q60,90 75,80" stroke="black" fill="transparent" strokeWidth="3" />
        )}
        {animationState === 'angry' && (
          <g>
            <path d="M45,70 Q60,60 75,70" stroke="black" fill="transparent" strokeWidth="3" />
            {/* Angry eyebrows */}
            <path d="M40,45 L50,40" stroke="black" strokeWidth="3" />
            <path d="M80,45 L70,40" stroke="black" strokeWidth="3" />
          </g>
        )}
        {/* Cheeks */}
        {animationState === 'happy' && (
          <>
            <circle cx="35" cy="60" r="6" fill="#FF69B4" opacity="0.6" />
            <circle cx="85" cy="60" r="6" fill="#FF69B4" opacity="0.6" />
          </>
        )}
      </svg>
      
      <div className="kirby-status">
        {animationState === 'idle' && 'Kirby is waiting...'}
        {animationState === 'swallowing' && 'Yum! Valid email!'}
        {animationState === 'spitting' && 'Yuck! Invalid email!'}
        {animationState === 'happy' && '♪ Thank you! ♪'}
        {animationState === 'angry' && 'Try again!'}
      </div>
    </div>
  );
}
export default function EmailSubscription() {
  const [emailValue, setEmailValue] = useState('');
  const [emailIsDisabled, setEmailIsDisabled] = useState(false);
  const [emailText, setEmailText] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isNotValid, setIsNotValid] = useState(false);
  
  const textLettersRef = useRef([]);

  const submitMail = () => {
    if (emailValue) {
      const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const valid = emailRegex.test(emailValue);
      setIsValid(valid);
      setIsNotValid(!valid);

      const displayText = emailValue.length > 15 ?
        emailValue.slice(0, 15) + '...' :
        emailValue;
      setEmailText(displayText);
      setEmailValue('');
      setEmailIsDisabled(true);

      // Use setTimeout instead of $nextTick
      setTimeout(() => {
        animateText();
      }, 0);
    }
  };

  const animateText = () => {
    const tlJiggle = gsap.timeline({ 
      delay: 1, 
      defaults: {
        duration: 0.1
      }
    });
    
    tlJiggle
      .to('.input-text-letter', {
        y: () => gsap.utils.random(-6, 4)
      })
      .to('.input-text-letter', {
        y: () => gsap.utils.random(-6, 4)
      })
      .to('.input-text-letter', {
        y: () => gsap.utils.random(-6, 4)
      })
      .to('.input-text-letter', {
        y: () => gsap.utils.random(-6, 4)
      })
      .to('.input-text-letter', {
        y: 0,
        duration: 0.1
      })
      .to('.input-text-letter', {
        delay: 0,
        duration: 0.5,
        ease: 'expo.in',
        x: 300,
        stagger: {
          amount: 0.3,
          from: 'end'
        }
      });
  };

  const reset = () => {
    setEmailIsDisabled(false);
    setIsValid(false);
    setIsNotValid(false);
    setEmailText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      submitMail();
    }
  };

  return (
    <main className="container">
      <div className="input-wrap">
        <svg 
          className="cloudy"
          viewBox="0 0 277 145"
        >
          <path 
            className="cloudy-poofs"
            d="M218,20c-0.74,0-1.47,0.03-2.2,0.06C204.99,7.77,189.16,0,171.5,0c-12.22,0-23.58,3.72-33,10.09 C129.08,3.72,117.72,0,105.5,0C87.84,0,72.01,7.77,61.2,20.06C60.47,20.03,59.74,20,59,20C26.42,20,0,46.42,0,79 c0,32.58,26.42,59,59,59c5.26,0,10.36-0.7,15.21-1.99C83.28,141.7,94,145,105.5,145c12.22,0,23.58-3.72,33-10.09 c9.42,6.37,20.78,10.09,33,10.09c11.5,0,22.22-3.3,31.29-8.99c4.85,1.29,9.95,1.99,15.21,1.99c32.58,0,59-26.42,59-59 C277,46.42,250.58,20,218,20z"
          />
        </svg>
        
        {emailText && (
          <div className="input-text">
            {emailText.split('').map((letter, index) => (
              <span 
                key={index}
                className="input-text-letter"
                ref={el => textLettersRef.current[index] = el}
              >
                {letter}
              </span>
            ))}
          </div>
        )}
        
        <div 
          className={`dreamy-input ${emailIsDisabled ? 'disabled' : ''}`}
        >
          <label 
            className="dreamy-input-label"
            htmlFor="dreamyInput"
          >
            Email
          </label>
          <input 
            id="dreamyInput"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            disabled={emailIsDisabled}
            aria-describedby={isNotValid ? 'dreamyInputErr' : undefined}
            autoComplete="off"
            className="dreamy-input-control"
            type="email"
            onKeyDown={handleKeyDown}
          />
          
          {/* Transition effect for error message */}
          {isNotValid && (
            <div className="error-transition">
              <span 
                id="dreamyInputErr"
                className="dreamy-input-error"
              >
                Please enter a valid email.
              </span>
            </div>
          )}
          
          <button
            aria-label="Subscribe"
            className="dreamy-input-button"
            onClick={submitMail}
            disabled={emailIsDisabled}
          >
            <svg 
              className="dreamy-input-button-svg"
              viewBox="0 0 35 35"
            >
              <path 
                className="dreamy-input-button-star" 
                d="M29.36,23.14l4.63-5.32c2.08-2.39,0.77-6.08-2.39-6.7l-5.23-1.02c-0.23-0.05-0.44-0.19-0.56-0.39l-4.67-7.7 c-1.64-2.69-5.64-2.69-7.27,0l-4.67,7.7c-0.12,0.2-0.33,0.34-0.56,0.39L3.4,11.13c-3.16,0.62-4.47,4.31-2.39,6.7l4.63,5.32 c0.17,0.2,0.24,0.47,0.18,0.73L4.31,29.9c-0.83,3.32,2.61,6.12,5.82,4.74l7.03-3.03c0.22-0.09,0.47-0.09,0.68,0l7.03,3.03 c3.21,1.38,6.65-1.42,5.82-4.74l-1.51-6.04C29.12,23.61,29.18,23.34,29.36,23.14z"
              />
            </svg>
          </button>
        </div>
      </div>
      
      <Kirby 
        swallow={isValid}
        spit={isNotValid}
        onAnimationDone={reset}
      />
    </main>
  );
}