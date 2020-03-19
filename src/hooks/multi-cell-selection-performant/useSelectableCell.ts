import React, { RefObject, useContext, useEffect, useMemo, useState } from "react";

import { SelectionContext } from "./context/SelectionContext";
import { KeyCode } from "./enums/KeyCode";

export interface UseSelectableCellParams {
  row: number;
  column: number;
  elementRef: React.MutableRefObject<HTMLElement | null>;
}

export const useSelectableCell = (selectableCell: UseSelectableCellParams) => {
  const { row, column, elementRef } = selectableCell;
  const { startSelecting, setLastCell, isSelected } = useContext(
    SelectionContext
  );

  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState(false);
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
    startSelecting(row, column);
  };

  console.log("re-render selectableCell");
  return useMemo(
    () => ({
      //   firstSelected,
      selected,
      active,
      elementProps: {
        ref: elementRef,
        onDoubleClick,
        onMouseEnter,
        onMouseDown,

        onKeyDown
      }
    }),
    [active, selected]
  );
};
