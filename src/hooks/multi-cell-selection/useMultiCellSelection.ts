import React, { useCallback, useEffect, useRef, useState } from "react";

import { KeyCode } from "./enums/KeyCode";
import { SelectableCell } from "./useSelectableCell";
import { convert2DArrayToPastableString, convertStringTo2DArrayOfStrings, copyTextToClipboard } from "./utils";

interface CellProps {
  elementRef: React.MutableRefObject<HTMLElement | null>;
  displayValue: string;
  onPaste: (value: string) => void;
  onCut: () => void;
}
type Cell = [number, number];
export type UseMultiCellSelection = ReturnType<typeof useMultiCellSelection>;

export const useMultiCellSelection = () => {
  const [selecting, setSelecting] = useState(false);
  let { current: cells } = useRef<CellProps[][]>([]);
  const [firstSelectedCell, setFirstSelectedCell] = useState<Cell>([-1, -1]);
  const [lastSelectedCell, setLastSelectedCell] = useState<Cell>([-1, -1]);
  const [selection, setSelection] = useState<Cell[]>([]);
  const revertStack = useRef<CellProps[][][]>([]);
  const registerCell = ({
    displayValue,
    row,
    column,
    onPaste,
    onCut,
    elementRef
  }: SelectableCell) => {
    registerRow(row);
    if (!cells[row][column])
      cells[row][column] = {
        elementRef,
        displayValue,
        onPaste,
        onCut
      };
  };
  useEffect(() => {
    calculateSelection();
  }, [...firstSelectedCell, ...lastSelectedCell]);

  const calculateSelection = () => {
    const [x1, y1] = getTopLeftCell();
    const [x2, y2] = getBottomRightCell();

    const newSelection: Cell[] = [];

    for (let i = x1; i <= x2; i++) {
      for (let k = y1; k <= y2; k++) {
        newSelection.push([i, k]);
      }
    }

    setSelection(newSelection);
  };
  const registerRow = (row: number) => {
    if (!cells[row]) cells[row] = [];
  };
  const unregisterRow = (row: number) => {
    cells = cells.filter((_, i) => i !== row);
  };
  // useEffect(() => {
  //   document.addEventListener("mousedown", handleDocumentMouseDown);
  //   return () => {
  //     document.addEventListener("mousedown", handleDocumentMouseDown);
  //   };
  // }, []);

  const handleDocumentMouseDown = (event: MouseEvent) => {
    const noCellClicked = cells.some(row =>
      row.some(cell => cell.elementRef.current?.contains(event.target as Node))
    );
    if (!noCellClicked) resetSelection();
  };

  const selectRow = (row: number) => {
    setFirstSelectedCell([row, 0]);
    setLastSelectedCell([row, cells[row].length - 1]);
  };
  const startSelecting = (row: number, column: number) => {
    setFirstSelectedCell([row, column]);
    setLastSelectedCell([row, column]);

    setSelecting(true);
    document.addEventListener("mouseup", stopSelecting);
  };

  const stopSelecting = () => {
    setSelecting(false);
    document.removeEventListener("mouseup", stopSelecting);
  };

  const resetSelection = () => {
    setFirstSelectedCell([-1, -1]);
    setLastSelectedCell([-1, -1]);
  };

  const isSelected = (row: number, column: number) => {
    if (!selecting) return false;
    return selection.some(cell => cell[0] === row && cell[1] === column);
    // const [x1, y1] = getTopLeftCell();
    // const [x2, y2] = getBottomRightCell();

    // return row >= x1 && row <= x2 && column >= y1 && column <= y2;
  };

  const getTopLeftCell = useCallback(() => {
    const [x1, y1] = firstSelectedCell;
    const [x2, y2] = lastSelectedCell;

    return [Math.min(x1, x2), Math.min(y1, y2)];
  }, [firstSelectedCell, lastSelectedCell]);

  const getBottomRightCell = useCallback(() => {
    const [x1, y1] = firstSelectedCell;
    const [x2, y2] = lastSelectedCell;

    return [Math.max(x1, x2), Math.max(y1, y2)];
  }, [firstSelectedCell, lastSelectedCell]);

  const setLastCell = (row: number, column: number) => {
    setLastSelectedCell([row, column]);
  };

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
      const [x, y] = getTopLeftCell();
      const arr = convertStringTo2DArrayOfStrings(text);
      console.table(cells);
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
    revertStack.current.push([...cells]);
    cells.forEach((row, i) =>
      row.forEach((cell, k) => {
        if (isSelected(i, k)) cell.onCut();
      })
    );
  };

  const handleRevert = () => {
    console.log("ctrl+z");
    console.log(revertStack.current[revertStack.current.length - 1]);
    cells = revertStack.current[revertStack.current.length - 1];
  };

  const revertCut = (row: number, colum: number, values: string[][]) => {};
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.ctrlKey) {
      if (event.keyCode === KeyCode.Copy) handleCopy();
      else if (event.keyCode === KeyCode.Paste) handlePaste();
      else if (event.keyCode === KeyCode.Cut) handleCut();
      else if (event.keyCode === KeyCode.Revert) handleRevert();
    } else {
      if (somethingIsSelected()) {
      }
    }
  };
  const isFirstSelectedCell = useCallback(
    (row: number, column: number) => {
      const [x, y] = firstSelectedCell;
      return row === x && column === y;
    },
    [...firstSelectedCell]
  );

  const somethingIsSelected = useCallback(() => {
    const [x, y] = firstSelectedCell;
    return x !== -1 && y !== -1;
  }, [...firstSelectedCell]);

  const rowAndColumnExists = (row: number, column: number) => {
    return cells[row] && cells[row][column];
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  return {
    firstSelectedCell,
    lastSelectedCell,
    selection,
    startSelecting,
    stopSelecting,
    selecting,
    isSelected,
    registerCell,
    setLastCell,
    isFirstSelectedCell,
    resetSelection,
    registerRow,
    unregisterRow,
    selectRow
  };
};
