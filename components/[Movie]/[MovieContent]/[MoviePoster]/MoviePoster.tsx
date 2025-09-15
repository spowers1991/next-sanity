// MoviePoster.tsx
"use client";
import Image from "next/image";

export type MoviePosterProps = {
  title: string;
  posterUrl: string;
};

export default function MoviePoster({ title, posterUrl }: MoviePosterProps) {
  return (
    <div className="w-full">
      <Image
        src={posterUrl}
        alt={title}
        width={500}
        height={750}
        className="w-full h-auto rounded-2xl shadow-lg object-cover"
        priority
      />
    </div>
  );
}
