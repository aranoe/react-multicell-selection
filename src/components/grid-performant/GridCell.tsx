import classNames from "classnames";
import React, { PropsWithChildren, useRef } from "react";
import { InputPropsValue } from "react-fluent-form";

import { useSelectableCell } from "../../hooks/multi-cell-selection-performant/useSelectableCell";

interface GridItemProps {
  field: InputPropsValue;
  row: number;
  column: number;
}

const areEqual = (
  prevProps: Readonly<PropsWithChildren<GridItemProps>>,
  nextProps: Readonly<PropsWithChildren<GridItemProps>>
): boolean => {
  const { field: prevField } = prevProps;
  const { field: nextField } = nextProps;

  return (
    prevField.value === nextField.value &&
    prevProps.row === nextProps.row &&
    prevProps.column === nextProps.column
  );
};

export const GridCell = React.memo(({ field, row, column }: GridItemProps) => {
  // const elementRef = useRef<HTMLTableDataCellElement>(null);

  const { elementProps, active } = useSelectableCell<HTMLTableDataCellElement>({
    value: field.value?.toString() ?? "",
    row,
    column
  });

  // console.log("item", elementRef.current?.getBoundingClientRect());
  return (
    <td
      {...elementProps}
      // ref={elementRef}
      className={classNames("item", {
        // selected
        //   "first-selected": firstSelected
      })}
    >
      {active ? <input {...field} autoFocus={true}></input> : field.value}
    </td>
  );
}, areEqual);
