import { Reducer } from "react";

import { SelectionRectsActionTypes } from "./reducer";

export type Cell = [number, number];

export type SelectionRects = {
  first: React.RefObject<HTMLElement>;
  last: React.RefObject<HTMLElement>;
};

export interface SelectionRectsState {
  selectionRects: SelectionRects;
}

export type SelectionRectsReducerType = Reducer<
  SelectionRectsState,
  SelectionRectsActionTypes
>;
