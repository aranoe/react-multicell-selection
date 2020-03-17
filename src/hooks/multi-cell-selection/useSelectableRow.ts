import { useContext, useEffect } from "react";

import { MultiCellSelectionContext } from "./MultiCellSelection";

export const useSelectableRow = (row: number) => {
  const { registerRow, unregisterRow, selectRow } = useContext(
    MultiCellSelectionContext
  );

  useEffect(() => {
    registerRow(row);
    return () => unregisterRow(row);
  }, []);

  return {
    selectRow: () => selectRow(row)
  };
};
