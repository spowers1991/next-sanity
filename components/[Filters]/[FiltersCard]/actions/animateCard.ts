import gsap from "gsap";

export const animateCard = (element: HTMLDivElement, index: number) => {
  // Set initial state
  gsap.set(element, { opacity: 0, y: 30 });

  // Animate y and opacity with stagger effect
  const tl = gsap.timeline({ delay: index * 0.05 });

  tl.to(element, {
    y: 0,
    duration: 0.35,
    ease: "power2.out",
  }).to(
    element,
    {
      opacity: 1,
      duration: 1.0,
      ease: "power1.out",
    },
    0 // start at same time as translation
  );

  return tl;
};
