import classNames from "classnames";
import React, { useRef } from "react";
import { InputPropsValue } from "react-fluent-form";

import { useSelectableCell } from "../../hooks/multi-cell-selection-performant/useSelectableCell";

interface GridItemProps {
  field: InputPropsValue;
  row: number;
  column: number;
}
export const GridCell = ({ field, row, column }: GridItemProps) => {
  const elementRef = useRef(null);

  const { elementProps, active } = useSelectableCell({
    row,
    column,
    elementRef
  });

  console.log("item");
  return (
    <td
      {...elementProps}
      ref={elementRef}
      className={classNames("item", {
        //   selected,
        //   "first-selected": firstSelected
      })}
    >
      {active ? <input {...field} autoFocus={true}></input> : field.value}
    </td>
  );
};
