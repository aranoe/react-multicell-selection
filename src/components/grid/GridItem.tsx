import classNames from "classnames";
import React, { useRef } from "react";
import { InputPropsValue } from "react-fluent-form";

import { useSelectableCell } from "../../hooks/multi-cell-selection/useSelectableCell";

interface GridItemProps {
  field: InputPropsValue;
  onPaste: (value: string) => void;
  onCut: () => void;
  row: number;
  column: number;
}
export const GridItem = ({
  field,
  row,
  column,
  onPaste,
  onCut
}: GridItemProps) => {
  const elementRef = useRef(null);

  const {
    firstSelected,
    selected,
    elementProps,
    active,
    displayValue
  } = useSelectableCell({
    row,
    column,
    displayValue: field.value?.toString() ?? "",
    onPaste,
    onCut,
    elementRef
  });

  return (
    <td
      {...elementProps}
      ref={elementRef}
      className={classNames("item", {
        selected,
        "first-selected": firstSelected
      })}
    >
      {active ? <input {...field} autoFocus={true}></input> : displayValue}
    </td>
  );
};
