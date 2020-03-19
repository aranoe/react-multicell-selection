import React, { useContext } from "react";

import { CellData, useMultiCellSelection } from "../useMultiCellSelection";
import { useSelection } from "../useSelection";
import { MultiCellSelectionContext } from "./MultiCellSelectionContext";
import { SelectionContext } from "./SelectionContext";
import { SelectionStateContext } from "./SelectionStateContext";
import { useSelectionState } from "../useSelectionState";

export interface MultiCellSelectionProviderProps {
  cells: CellData[][];
}
export const SelectionContextProvider: React.FC<MultiCellSelectionProviderProps> = ({
  children,
  cells
}) => {
  const selection = useSelection();

  return (
    <SelectionContext.Provider value={selection}>
      <Test cells={cells}>{children}</Test>
    </SelectionContext.Provider>
  );
};

export const Test: React.FC<MultiCellSelectionProviderProps> = ({
  children,
  cells
}) => {
  const multiCellSelection = useMultiCellSelection({ cells });
  return (
    <MultiCellSelectionContext.Provider value={multiCellSelection}>
      {children}
    </MultiCellSelectionContext.Provider>
  );
};

export const MultiCellSelectionProvider: React.FC<MultiCellSelectionProviderProps> = ({
  children,
  cells
}) => {
  const selectionState = useSelectionState();

  return (
    <SelectionStateContext.Provider value={selectionState}>
      <SelectionContextProvider cells={cells}>
        {children}
      </SelectionContextProvider>
    </SelectionStateContext.Provider>
  );
};
