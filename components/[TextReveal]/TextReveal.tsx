"use client"

import React, { useEffect, useRef } from "react";
import { animateText } from "@/components/[TextReveal]/actions/animateText";

interface AnimatedTextProps {
  text: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text }) => {
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    animateText(textRef.current);
  }, []);

  const words = text.split(" ");

  return (
    <div className="container mx-auto">
      <div ref={textRef} className="perspective-container">
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="word inline-block">
            {word.split("").map((letter, letterIndex) => (
              <span key={letterIndex} className="letter inline-block">
                {letter}
              </span>
            ))}&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnimatedText;
