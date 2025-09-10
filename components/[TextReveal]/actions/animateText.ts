import gsap from "gsap";

export const animateText = (element: HTMLElement | null): void => {
  if (!element) return;

  gsap.set(element, { perspective: 800 });

  gsap.fromTo(
    element.querySelectorAll<HTMLElement>(".letter"),
    {
      opacity: 0,
      rotationY: 30,
      y: 5,
      transformOrigin: "center",
    },
    {
      opacity: 1,
      rotationY: 0,
      y: 0,
      stagger: 0.03,
      duration: 5,
      ease: "power2.out",
    }
  );
};
