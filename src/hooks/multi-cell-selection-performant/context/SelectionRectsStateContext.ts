import React from "react";

import { UseSelectionRectsState } from "../useSelectionRectsState";

export const SelectionRectsStateContext = React.createContext<
  UseSelectionRectsState
>(null as any);
