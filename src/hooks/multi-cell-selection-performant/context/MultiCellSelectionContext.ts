import React from "react";

import { UseMultiCellSelection } from "../useMultiCellSelection";

export const MultiCellSelectionContext = React.createContext<
  UseMultiCellSelection
>(null as any);
