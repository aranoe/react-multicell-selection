import { useReducer } from "react";

import { initialSelectionRects, useSelectionRectsReducer } from "./reducer/selection-rects/reducer";
import { SelectionRectsReducerType } from "./reducer/selection-rects/types";

export type UseSelectionRectsState = ReturnType<typeof useSelectionRectsState>;
export const useSelectionRectsState = () => {
  const [state, dispatch] = useReducer<SelectionRectsReducerType>(
    useSelectionRectsReducer,
    initialSelectionRects
  );
  console.log("rect", state);
  return {
    dispatch,
    state
  };
};
