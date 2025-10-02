"use client";

import React from "react";
import Link from "next/link";
import type { Movie } from "@/services/sanity/movie/types/Movie";
import { useFilters } from "@/lib/filters/state/FiltersContext";

interface PostItemProps {
  item: Movie;
}

const MenuItem: React.FC<PostItemProps> = ({ item }) => {
  const { STATE_setShowAnimation } = useFilters();

  const handleClick = () => {
    STATE_setShowAnimation(false);
  };

  return (
    <li key={item._id} className="hover:underline">
        <Link href={`/${item._type}s/${item?.slug?.current}`}>
            <div onClick={handleClick}>
                {
                    item.title ? item.title : item.name
                }
            </div>
        </Link>
    </li>
  );
};

export default MenuItem;
