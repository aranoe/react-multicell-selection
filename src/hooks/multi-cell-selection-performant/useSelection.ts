import React, { useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";

import { SelectionStateContext } from "./context/SelectionStateContext";
import { useGetter } from "./useGetter";

export type Cell = [number, number];

export type UseSelection = ReturnType<typeof useSelection>;

export type PrimeCells = {
  first: Cell;
  last: Cell;
};

export const useSelection = () => {
  const { state, dispatch } = useContext(SelectionStateContext);

  const getState = useGetter(state);

  // const calculateSelection = () => {
  //   const [x1, y1] = getTopLeftCell();
  //   const [x2, y2] = getBottomRightCell();

  //   const selection: Cell[] = [];

  //   for (let i = x1; i <= x2; i++) {
  //     for (let k = y1; k <= y2; k++) {
  //       selection.push([i, k]);
  //     }
  //   }
  //   return selection;
  // };
  //   const selectRow = (row: number) => {
  //     setFirstSelectedCell([row, 0]);
  //     setLastSelectedCell([row, cells[row].length - 1]);
  //   };
  const startSelecting = (row: number, column: number) => {
    dispatch({
      type: "SET_PRIME_CELLS",
      payload: { primeCells: { first: [row, column], last: [row, column] } }
    });
    dispatch({
      type: "START_SELECTING",
      payload: { startingCell: [row, column] }
    });
    document.addEventListener("mouseup", stopSelecting);
  };

  const stopSelecting = () => {
    dispatch({ type: "STOP_SELECTING" });
    document.removeEventListener("mouseup", stopSelecting);
  };

  // const getTopLeftCell = useCallback(() => {
  //   const [x1, y1] = getState().primeCells.first;
  //   const [x2, y2] = getState().primeCells.last;

  //   return [Math.min(x1, x2), Math.min(y1, y2)];
  // }, [...getState().primeCells.first, ...getState().primeCells.last]);

  // const getBottomRightCell = useCallback(() => {
  //   const [x1, y1] = getState().primeCells.first;
  //   const [x2, y2] = getState().primeCells.last;

  //   return [Math.max(x1, x2), Math.max(y1, y2)];
  // }, [...getState().primeCells.first, ...getState().primeCells.last]);

  const setLastCell = (row: number, column: number) => {
    if (getState().selecting)
      dispatch({
        type: "SET_LAST_PRIME_CELL",
        payload: { last: [row, column] }
      });
  };

  const resetSelection = () => {
    dispatch({ type: "RESET_PRIME_CELLS" });
  };

  const somethingIsSelected = useCallback(() => {
    const [x, y] = getState().primeCells.first;
    return x !== -1 && y !== -1;
  }, [...getState().primeCells.first]);

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
