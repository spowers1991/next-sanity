"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { FilterItem } from "@/services/filters/types/FilterItem";
import { useFilters } from "@/lib/filters/state/FiltersContext";
import { animateCard } from "./animations/animateCard";
import { handleCardClick } from "./animations/handleCardClick";

interface FiltersCardProps {
  filteredItem: FilterItem;
  index?: number;
}

const FiltersCard: React.FC<FiltersCardProps> = ({ filteredItem, index = 0 }) => {
  const { STATE_setShowAnimation, STATE_showAnimation } = useFilters();
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!cardRef.current || !STATE_showAnimation) return;

    const tl = animateCard(cardRef.current, index);

    return () => {
      tl.kill();
    };
  }, [STATE_showAnimation, index]);

  return (
    <Link href={`/${filteredItem._type}s/${filteredItem.slug.current}`} className="block">
      <div
        ref={cardRef}
        onClick={() => handleCardClick(STATE_setShowAnimation)}
        className={`bg-white flex flex-col xl:flex-nowrap gap-4 border p-4 h-full min-w-fit cursor-pointer transform ${STATE_showAnimation ? 'opacity-0' : 'opacity-100' }`}
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
