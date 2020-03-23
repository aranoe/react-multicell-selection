import { Cell } from "../selection/types";

export const getTopLeftCell = (first: Cell, last: Cell) => {
  const [x1, y1] = first;
  const [x2, y2] = last;

  return [Math.min(x1, x2), Math.min(y1, y2)];
};

export const getBottomRightCell = (first: Cell, last: Cell) => {
  const [x1, y1] = first;
  const [x2, y2] = last;

  return [Math.max(x1, x2), Math.max(y1, y2)];
};
export const calculateSelection = (first: Cell, last: Cell) => {
  const [x1, y1] = getTopLeftCell(first, last);
  const [x2, y2] = getBottomRightCell(first, last);

  const selection: Cell[] = [];

  for (let i = x1; i <= x2; i++) {
    for (let k = y1; k <= y2; k++) {
      selection.push([i, k]);
    }
  }
  return selection;
};
