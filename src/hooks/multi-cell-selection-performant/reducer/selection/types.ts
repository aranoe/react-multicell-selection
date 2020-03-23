import { Reducer } from "react";

import { SelectionActionTypes } from "./reducer";

export type Cell = [number, number];
export interface PrimeCell {
  cell: Cell;
  elementRef: React.RefObject<HTMLElement> | null;
}
export interface PrimeCells {
  first: PrimeCell;
  last: PrimeCell;
}
export interface SelectionState {
  primeCells: PrimeCells;
  selection: Cell[];
  selecting: boolean;
}

export type SelectionReducerType = Reducer<
  SelectionState,
  SelectionActionTypes
>;
