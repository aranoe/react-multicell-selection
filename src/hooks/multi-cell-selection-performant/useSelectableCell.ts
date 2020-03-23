import React, { RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";

import { SelectionContext } from "./context/SelectionContext";
import { SelectionRectsContext } from "./context/SelectionRectsContext";
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
export const useSelectableCell = <T extends HTMLElement>(
  selectableCell: UseSelectableCellParams
) => {
  const { row, column } = selectableCell;
  const { startSelecting, setLastCell } = useContext(SelectionContext);

  const { setFirstRect, setLastRect, setSelecitonRect } = useContext(
    SelectionRectsContext
  );
  const elementRef = useRef<T>(null);
  const [active, setActive] = useState(false);

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
    setLastCell(row, column, elementRef);
  };

  const onMouseDown = () => {
    startSelecting(row, column, elementRef);
    if (elementRef.current)
      setFirstRect(elementRef.current.getBoundingClientRect());
  };

  // console.log("re-render selectableCell");
  return {
    //   firstSelected,
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
