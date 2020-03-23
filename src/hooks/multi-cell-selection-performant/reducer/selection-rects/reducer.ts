import { SelectionRects, SelectionRectsState } from "./types";

export type Action<K, V = void> = V extends void
  ? { type: K }
  : { type: K; payload: V };

export type SelectionRectsActionTypes =
  | Action<"SET_SELECTION_RECTS", { selecitonRect: SelectionRects }>
  | Action<"SET_FIRST_RECT", { first: DOMRect }>
  | Action<"SET_LAST_RECT", { last: DOMRect }>;

export const emptyRect = {
  x: 0,
  y: 0,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: 0,
  height: 0
} as DOMRect;

export const initialSelectionRects = {
  selectionRects: {
    first: undefined as any,
    last: undefined as any
  }
} as SelectionRectsState;

export const useSelectionRectsReducer = (
  state: SelectionRectsState,
  action: SelectionRectsActionTypes
): SelectionRectsState => {
  switch (action.type) {
    case "SET_SELECTION_RECTS":
      return {
        ...state,
        selectionRects: action.payload.selecitonRect
      };
    case "SET_FIRST_RECT":
      return {
        ...state,
        selectionRects: { ...state.selectionRects, first: action.payload.first }
      };
    case "SET_LAST_RECT":
      return {
        ...state,
        selectionRects: { ...state.selectionRects, last: action.payload.last }
      };

    default:
      return state;
  }
};
