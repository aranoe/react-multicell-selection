import React, { useReducer } from "react";

import { initialPrimeCells, useSelectionReducer } from "./reducer/selection-reducer";
import { SelectionReducerType } from "./reducer/selection-types";

export type UseSelectionState = ReturnType<typeof useSelectionState>;
export const useSelectionState = () => {
  const [state, dispatch] = useReducer<SelectionReducerType>(
    useSelectionReducer,
    {
      primeCells: initialPrimeCells,
      selection: [],
      selecting: false
    }
  );

  return {
    dispatch,
    state
  };
};
