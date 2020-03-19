import { Reducer } from "react";

import { SelectionActionTypes } from "./selection-reducer";

export type Cell = [number, number];

export type PrimeCells = {
  first: Cell;
  last: Cell;
};

export interface SelectionState {
  primeCells: PrimeCells;
  selection: Cell[];
  selecting: boolean;
}

export type SelectionReducerType = Reducer<
  SelectionState,
  SelectionActionTypes
>;
