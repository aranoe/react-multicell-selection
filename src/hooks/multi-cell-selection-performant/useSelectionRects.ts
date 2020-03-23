import React, { useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";

import { SelectionRectsStateContext } from "./context/SelectionRectsStateContext";
import { SelectionStateContext } from "./context/SelectionStateContext";
import { useGetter } from "./useGetter";

export type UseSelectionRects = ReturnType<typeof useSelectionRects>;

export const useSelectionRects = () => {
  const { state, dispatch } = useContext(SelectionRectsStateContext);
  const { state: selectionState } = useContext(SelectionStateContext);

  const getState = useGetter(selectionState);

  const setFirstRect = (first: DOMRect) => {
    if (getState().selecting)
      dispatch({ type: "SET_FIRST_RECT", payload: { first } });
  };
  const setLastRect = (last: DOMRect) => {
    if (getState().selecting)
      dispatch({ type: "SET_LAST_RECT", payload: { last } });
  };

  const setSelecitonRect = (first: DOMRect, last: DOMRect) => {
    if (getState().selecting)
      dispatch({
        type: "SET_SELECTION_RECTS",
        payload: { selecitonRect: { first, last } }
      });
  };

  return useMemo(
    () => ({
      // calculateSelection,
      getState,
      setFirstRect,
      setLastRect,
      setSelecitonRect
      // getTopLeftCell
    }),
    []
  );
};
