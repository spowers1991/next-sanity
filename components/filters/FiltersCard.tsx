"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { FilteredItem } from "./types/FilteredItem";
import { useFilters } from "./state/FiltersContext";
import gsap from "gsap";

interface FiltersCardProps {
  filteredItem: FilteredItem;
  index?: number;
}

const FiltersCard: React.FC<FiltersCardProps> = ({ filteredItem, index = 0 }) => {
  const { STATE_setShowAnimation, STATE_showAnimation } = useFilters();
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleClick = () => {
    STATE_setShowAnimation(false);
  };

  useEffect(() => {
    if (!cardRef.current || !STATE_showAnimation) return;

    // Set initial state
    gsap.set(cardRef.current, { opacity: 0, y: 30 });

    // Animate y and opacity with different durations
    const tl = gsap.timeline({ delay: index * 0.05 });

    tl.to(cardRef.current, {
      y: 0,
      duration: 0.35,       // quick slide
      ease: "power2.out"
    }).to(
      cardRef.current,
      {
        opacity: 1,
        duration: 1.0,       // slower fade
        ease: "power1.out"
      },
      0 // start at same time as translation
    );

    // Cleanup on unmount
    return () => {
      tl.kill();
    };
  }, [STATE_showAnimation, index]);

  return (
    <Link href={`/${filteredItem._type}s/${filteredItem.slug.current}`} className="block">
      <div
        ref={cardRef}
        onClick={handleClick}
        className="
          bg-white flex flex-col xl:flex-nowrap gap-4 border p-4 h-full min-w-fit cursor-pointer
          transform
        "
      >
        <div className="m-auto">
          <div className="flex gap-3 items-top text-[#555] text-center text-xl font-bold">
            {filteredItem.title}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FiltersCard;
