import React, { PropsWithChildren, useCallback, useMemo } from "react";

import { ReturnTypeUseSelectableCell, useSelectableCell, UseSelectableCellParams } from "../useSelectableCell";

// export interface WithSelectableCellProps extends ReturnTypeUseSelectableCell {
//   value: string;
// }

export function withSelectableCell<T extends ReturnTypeUseSelectableCell>(
  WrappedComponent: React.FC<T>
) {
  return ({ row, column, value }: UseSelectableCellParams) => {
    const selectableCell = useSelectableCell({
      value,
      row,
      column
    });
    //@ts-ignore
    return <WrappedComponent {...selectableCell} />;
  };
}
