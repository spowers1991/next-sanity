"use client";

import React, { createContext, useContext, useState } from "react";
import type { Movie } from "../types/Movie";

interface MoviesContextValue {
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const MoviesContext = createContext<MoviesContextValue | undefined>(undefined);

export function MoviesProvider({
  initialMovies,
  children,
}: {
  initialMovies: Movie[];
  children: React.ReactNode;
}) {
  const [movies, setMovies] = useState<Movie[]>(initialMovies || []);

  return (
    <MoviesContext.Provider value={{ movies, setMovies }}>
      {children}
    </MoviesContext.Provider>
  );
}

export function useMovies() {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error("useMovies must be used within a MoviesProvider");
  }
  return context;
}
