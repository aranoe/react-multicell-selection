import { PrimeCells } from "../useSelection";
import { calculateSelection } from "./selection-helper";
import { Cell, SelectionState } from "./selection-types";

export type Action<K, V = void> = V extends void
  ? { type: K }
  : { type: K; payload: V };

export type SelectionActionTypes =
  | Action<"SET_PRIME_CELLS", { primeCells: PrimeCells }>
  | Action<"SET_FIRST_PRIME_CELL", { first: Cell }>
  | Action<"SET_LAST_PRIME_CELL", { last: Cell }>
  | Action<"RESET_PRIME_CELLS">
  // | Action<"SET_SELECTION", { selection: Cell[] }>
  | Action<"START_SELECTING", { startingCell: Cell }>
  | Action<"STOP_SELECTING">;

export const initialPrimeCells = {
  first: [-1, -1],
  last: [-1, -1]
} as PrimeCells;

export const useSelectionReducer = (
  state: SelectionState,
  action: SelectionActionTypes
): SelectionState => {
  switch (action.type) {
    case "SET_PRIME_CELLS":
      return {
        ...state,
        primeCells: action.payload.primeCells,
        selection: calculateSelection(
          action.payload.primeCells.first,
          action.payload.primeCells.last
        )
      };
    case "RESET_PRIME_CELLS":
      return { ...state, primeCells: initialPrimeCells, selection: [] };
    case "SET_FIRST_PRIME_CELL":
      return {
        ...state,
        primeCells: { ...state.primeCells, first: action.payload.first },
        selection: calculateSelection(
          action.payload.first,
          state.primeCells.last
        )
      };
    case "SET_LAST_PRIME_CELL":
      return {
        ...state,
        primeCells: { ...state.primeCells, last: action.payload.last },
        selection: calculateSelection(
          state.primeCells.first,
          action.payload.last
        )
      };
    // case "SET_SELECTION":
    //   return { ...state, selection: action.payload.selection };
    case "START_SELECTING":
      return {
        ...state,
        selecting: true,
        primeCells: {
          first: action.payload.startingCell,
          last: action.payload.startingCell
        },
        selection: calculateSelection(
          action.payload.startingCell,
          action.payload.startingCell
        )
      };
    case "STOP_SELECTING":
      return { ...state, selecting: false };
    default:
      return state;
  }
};
