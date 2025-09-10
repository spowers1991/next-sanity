import { Dispatch, SetStateAction } from "react";

export const handleCardClick = (
  setShowAnimation: Dispatch<SetStateAction<boolean>>
) => {
  setShowAnimation(false);
};
