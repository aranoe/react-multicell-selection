import React, { useContext } from "react";

import { CellData, useMultiCellSelection } from "../useMultiCellSelection";
import { useSelection } from "../useSelection";
import { useSelectionRects } from "../useSelectionRects";
import { useSelectionRectsState } from "../useSelectionRectsState";
import { useSelectionState } from "../useSelectionState";
import { MultiCellSelectionContext } from "./MultiCellSelectionContext";
import { SelectionContext } from "./SelectionContext";
import { SelectionRectsContext } from "./SelectionRectsContext";
import { SelectionRectsStateContext } from "./SelectionRectsStateContext";
import { SelectionStateContext } from "./SelectionStateContext";

export interface MultiCellSelectionProviderProps {
  cells: CellData[][];
}

export const MultiCellSelectionProvider: React.FC<MultiCellSelectionProviderProps> = ({
  children,
  cells
}) => {
  const selectionState = useSelectionState();
  const selectionRectsState = useSelectionRectsState();
  return (
    <SelectionStateContext.Provider value={selectionState}>
      <SelectionRectsStateContext.Provider value={selectionRectsState}>
        <SelectionContextProvider cells={cells}>
          {children}
        </SelectionContextProvider>
      </SelectionRectsStateContext.Provider>
    </SelectionStateContext.Provider>
  );
};

const SelectionContextProvider: React.FC<MultiCellSelectionProviderProps> = ({
  children,
  cells
}) => {
  const selection = useSelection();
  const selectionRects = useSelectionRects();
  return (
    <SelectionContext.Provider value={selection}>
      <SelectionRectsContext.Provider value={selectionRects}>
        <Test cells={cells}>{children}</Test>
      </SelectionRectsContext.Provider>
    </SelectionContext.Provider>
  );
};

const Test: React.FC<MultiCellSelectionProviderProps> = ({
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
