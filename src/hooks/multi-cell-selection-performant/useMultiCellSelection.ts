import React, { useCallback, useContext, useEffect, useRef, useState } from "react";

import { SelectionContext } from "./context/SelectionContext";
import { SelectionStateContext } from "./context/SelectionStateContext";
import { KeyCode } from "./enums/KeyCode";
import { getTopLeftCell } from "./reducer/helper/selection-helper";
import { useGetter } from "./useGetter";
import { convert2DArrayToPastableString, convertStringTo2DArrayOfStrings, copyTextToClipboard } from "./utils/utils";

export interface CellData {
  displayValue: string;
  onPaste: (value: string) => void;
  onCut: () => void;
}

export interface UseMultiCellSelectionParams {
  cells: CellData[][];
}
export type UseMultiCellSelection = ReturnType<typeof useMultiCellSelection>;

export const useMultiCellSelection = ({
  cells
}: UseMultiCellSelectionParams) => {
  const {
    resetSelection,
    isSelected,
    somethingIsSelected
    // getTopLeftCell
  } = useContext(SelectionContext);

  //   const handleDocumentMouseDown = (event: MouseEvent) => {
  //     const noCellClicked = cells.some(row =>
  //       row.some(cell => cell.elementRef.current?.contains(event.target as Node))
  //     );
  //     if (!noCellClicked) resetSelection();
  //   };
  const { state } = useContext(SelectionStateContext);

  const getState = useGetter(state);
  const handleCopy = () => {
    console.log("ctrl+c");
    const arr = getSelectedValuesAs2DArrayOfStrings();
    const clipboardText = convert2DArrayToPastableString(arr);
    copyTextToClipboard(clipboardText);
  };

  const getSelectedValuesAs2DArrayOfStrings = () => {
    return cells
      .map((row, i) => {
        return row
          .filter((column, k) => isSelected(i, k)) // only get cells who are selected
          .map(cell => cell.displayValue); // only get the value of the cells
      })
      .filter(row => row.length > 0); // remove empty rows
  };

  const handlePaste = () => {
    console.log("ctrl+v");
    if (!navigator.clipboard) {
      alert("Your Browser doesn't support the Clipboard API!");
      return;
    }
    navigator.clipboard.readText().then(text => {
      if (!somethingIsSelected()) return;
      const [x, y] = getTopLeftCell(
        getState().primeCells.first,
        getState().primeCells.last
      );
      const arr = convertStringTo2DArrayOfStrings(text);
      arr.forEach((row, i) =>
        row.forEach((cellText, k) => {
          const currentRow = i + x;
          const currentColumn = k + y;
          if (rowAndColumnExists(currentRow, currentColumn))
            cells[currentRow][currentColumn].onPaste(cellText);
        })
      );
    });
  };
  const handleCut = () => {
    console.log("ctrl+x");
    handleCopy();
    cells.forEach((row, i) =>
      row.forEach((cell, k) => {
        if (isSelected(i, k)) cell.onCut();
      })
    );
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.ctrlKey) {
      if (event.keyCode === KeyCode.Copy) handleCopy();
      else if (event.keyCode === KeyCode.Paste) handlePaste();
      else if (event.keyCode === KeyCode.Cut) handleCut();
      //   else if (event.keyCode === KeyCode.Revert) handleRevert();
    } else {
      if (somethingIsSelected()) {
      }
    }
  };

  const rowAndColumnExists = (row: number, column: number) => {
    return cells[row] && cells[row][column];
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  return {};
};
