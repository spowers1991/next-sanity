"use client";

import gsap from "gsap";

/**
 * Animate a card into view with separate durations for translation and opacity.
 *
 * @param card - The card element reference
 * @param index - Used for stagger delay
 * @returns GSAP Timeline instance
 */
export const animateCard = (card: HTMLDivElement, index: number = 0): gsap.core.Timeline => {
  const tl = gsap.timeline({ delay: index * 0.1 });

  // Translation (y) animation
  tl.fromTo(
    card,
    { y: 10 },
    {
      y: 0,
      duration: 0.35,
      ease: "power2.out",
    }
  );

  // Opacity animation (starts at same time)
  tl.fromTo(
    card,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.0,
      ease: "power1.out",
    },
    0 // start at same time as the translation
  );

  return tl;
};
