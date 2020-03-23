import { calculateSelection } from "../helper/selection-helper";
import { PrimeCell, PrimeCells, SelectionState } from "./types";

export type Action<K, V = void> = V extends void
  ? { type: K }
  : { type: K; payload: V };

export type SelectionActionTypes =
  | Action<"SET_PRIME_CELLS", { primeCells: PrimeCells }>
  | Action<"SET_FIRST_PRIME_CELL", { first: PrimeCell }>
  | Action<"SET_LAST_PRIME_CELL", { last: PrimeCell }>
  | Action<"RESET_PRIME_CELLS">
  // | Action<"SET_SELECTION", { selection: Cell[] }>
  | Action<"START_SELECTING", { startingCell: PrimeCell }>
  | Action<"STOP_SELECTING">;

export const initialPrimeCells = {
  first: { cell: [-1, -1], elementRef: undefined as any },
  last: { cell: [-1, -1], elementRef: undefined as any }
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
          action.payload.primeCells.first.cell,
          action.payload.primeCells.last.cell
        )
      };
    case "RESET_PRIME_CELLS":
      return { ...state, primeCells: initialPrimeCells, selection: [] };
    case "SET_FIRST_PRIME_CELL":
      return {
        ...state,
        primeCells: { ...state.primeCells, first: action.payload.first },
        selection: calculateSelection(
          action.payload.first.cell,
          state.primeCells.last.cell
        )
      };
    case "SET_LAST_PRIME_CELL":
      return {
        ...state,
        primeCells: { ...state.primeCells, last: action.payload.last },
        selection: calculateSelection(
          state.primeCells.first.cell,
          action.payload.last.cell
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
        selection: [action.payload.startingCell.cell]
      };
    case "STOP_SELECTING":
      return { ...state, selecting: false };
    default:
      return state;
  }
};
