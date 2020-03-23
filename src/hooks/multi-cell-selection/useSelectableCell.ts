import React, { useContext, useEffect, useMemo, useRef, useState } from "react";

import { KeyCode } from "./enums/KeyCode";
import { MultiCellSelectionContext } from "./MultiCellSelectionContext";

export interface SelectableCell {
  row: number;
  column: number;
  displayValue: string;
  onPaste: (value: string) => void;
  onCut: () => void;
  elementRef: React.MutableRefObject<HTMLElement | null>;
}
export type UseSelectableCell = ReturnType<typeof useSelectableCell>;

export const useSelectableCell = (selectableCell: SelectableCell) => {
  const { row, column, displayValue, elementRef, onPaste } = selectableCell;
  const {
    startSelecting,
    stopSelecting,
    selecting,
    isSelected,
    setLastCell,
    registerCell,
    isFirstSelectedCell,
    selection
  } = useContext(MultiCellSelectionContext);
  const selected = useMemo(() => isSelected(row, column), [selection]);
  const firstSelected = isFirstSelectedCell(row, column);
  const [active, setActive] = useState(false);
  const pevValueRef = useRef(displayValue);
  useEffect(() => {
    if (active) document.addEventListener("mousedown", handleDocumentMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleDocumentMouseDown);
    };
  }, [active]);

  const handleDocumentMouseDown = (event: MouseEvent) => {
    if (!elementRef.current?.contains(event.target as Node)) setActive(false);
  };
  const onDoubleClick = () => {
    pevValueRef.current = displayValue;
    setActive(true);
  };
  const onKeyDown = (event: { keyCode: number }) => {
    if (event.keyCode === KeyCode.Enter && active) setActive(false);
    if (event.keyCode === KeyCode.Escape && active) {
      setActive(false);
      onPaste(pevValueRef.current);
    }
  };
  useEffect(() => {
    registerCell(selectableCell);
  }, []);

  const onMouseEnter = () => {
    if (selecting) setLastCell(row, column);
  };

  const onMouseDown = () => {
    startSelecting(row, column);
  };

  const onMouseUp = () => {
    stopSelecting();
  };

  return {
    firstSelected,
    selected,
    active,
    displayValue,
    elementProps: {
      ref: elementRef,
      onDoubleClick,
      onMouseEnter,
      onMouseDown,
      onMouseUp,
      onKeyDown
    }
  };
};
