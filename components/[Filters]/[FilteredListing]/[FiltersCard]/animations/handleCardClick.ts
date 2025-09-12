"use client";

import { Dispatch, SetStateAction } from "react";

/**
 * Handles card click: stops animation and updates state.
 *
 * @param setShowAnimation - Setter function for animation state
 */
export const handleCardClick = (
  setShowAnimation: Dispatch<SetStateAction<boolean>>
): void => {
  setShowAnimation(false);
};
