import React, { RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";

import { SelectionContext } from "./context/SelectionContext";
import { KeyCode } from "./enums/KeyCode";

export interface UseSelectableCellParams {
  value: string;
  row: number;
  column: number;
  // elementRef: React.MutableRefObject<HTMLElement | null>;
}
export type UseSelectableCell = ReturnType<typeof useSelectableCell>;
export interface ReturnTypeUseSelectableCell {
  selected: boolean;
  active: boolean;
  elementProps: {
    ref: React.RefObject<HTMLElement>;
    onDoubleClick: () => void;
    onMouseEnter: () => void;
    onMouseDown: () => void;
    onKeyDown: (event: any) => void;
  };
}
export const useSelectableCell = (selectableCell: UseSelectableCellParams) => {
  const { row, column } = selectableCell;
  const { startSelecting, setLastCell, isSelected } = useContext(
    SelectionContext
  );
  // const { state } = useContext(SelectionStateContext);
  const elementRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState(false);
  // const checkSelected = () => {
  //   const newSelected = isSelected();
  //   if (newSelected !== selected) setSelected(newSelected);
  // };
  // const isSelected = () => {
  //   return state.selection.some(cell => cell[0] === row && cell[1] === column);
  // };
  // useEffect(() => {
  //   checkSelected();
  // }, [state.selection]);
  // const pevValueRef = useRef(displayValue);
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
    //   pevValueRef.current = displayValue;
    setActive(true);
  };
  const onKeyDown = (event: { keyCode: number }) => {
    if (event.keyCode === KeyCode.Enter && active) setActive(false);
    if (event.keyCode === KeyCode.Escape && active) {
      setActive(false);
      // onPaste(pevValueRef.current);
    }
  };

  const onMouseEnter = () => {
    setLastCell(row, column);
  };

  const onMouseDown = () => {
    performance.now();
    startSelecting(row, column);
  };

  // console.log("re-render selectableCell");
  return {
    //   firstSelected,
    selected: isSelected(row, column),
    active,
    elementProps: {
      ref: elementRef,
      onDoubleClick,
      onMouseEnter,
      onMouseDown,
      onKeyDown
    }
  };
};
