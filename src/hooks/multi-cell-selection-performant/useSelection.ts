import React, { MutableRefObject, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";

import { SelectionStateContext } from "./context/SelectionStateContext";
import { useGetter } from "./useGetter";

export type UseSelection = ReturnType<typeof useSelection>;

export const useSelection = () => {
  const { state, dispatch } = useContext(SelectionStateContext);

  const getState = useGetter(state);

  const startSelecting = (
    row: number,
    column: number,
    elementRef: React.RefObject<HTMLElement>
  ) => {
    dispatch({
      type: "SET_PRIME_CELLS",
      payload: {
        primeCells: {
          first: { cell: [row, column], elementRef: elementRef },
          last: { cell: [row, column], elementRef: elementRef }
        }
      }
    });
    dispatch({
      type: "START_SELECTING",
      payload: { startingCell: { cell: [row, column], elementRef: elementRef } }
    });
    document.addEventListener("mouseup", stopSelecting);
  };

  const stopSelecting = () => {
    dispatch({ type: "STOP_SELECTING" });
    document.removeEventListener("mouseup", stopSelecting);
  };

  const setLastCell = (
    row: number,
    column: number,
    elementRef: React.RefObject<HTMLElement>
  ) => {
    if (getState().selecting) {
      dispatch({
        type: "SET_LAST_PRIME_CELL",
        payload: { last: { cell: [row, column], elementRef: elementRef } }
      });
    }
  };

  const resetSelection = () => {
    dispatch({ type: "RESET_PRIME_CELLS" });
  };

  const somethingIsSelected = useCallback(() => {
    const [x, y] = getState().primeCells.first.cell;
    return x !== -1 && y !== -1;
  }, [...getState().primeCells.first.cell]);

  const isSelected = (row: number, column: number) => {
    return getState().selection.some(
      cell => cell[0] === row && cell[1] === column
    );
  };

  return useMemo(
    () => ({
      // calculateSelection,
      getState,
      startSelecting,
      setLastCell,
      stopSelecting,
      resetSelection,
      somethingIsSelected,
      isSelected
      // getTopLeftCell
    }),
    []
  );
};
