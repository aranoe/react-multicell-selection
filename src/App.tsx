import "./App.css";

import React from "react";

import { GridRow } from "./components/grid/GridRow";
import { PersonFormValues, usePersonFormArray } from "./forms/personForm";
import { MultiCellSelectionContext } from "./hooks/multi-cell-selection/MultiCellSelection";
import { useMultiCellSelection } from "./hooks/multi-cell-selection/useMultiCellSelection";

const heads = ["Firstname", "Last"];
const persons: PersonFormValues[] = [
  {
    firstName: "Jill",
    lastName: "Smith",
    age: "54"
  },
  {
    firstName: "Mike",
    lastName: "Aton",
    age: "67"
  },
  {
    firstName: "Jennifer",
    lastName: "Fergosen",
    age: "20"
  }
];
function App() {
  const multiCellSelection = useMultiCellSelection();
  const arr: PersonFormValues[] = [];
  Array.from({ length: 20 }).forEach(_ => arr.push(...persons));
  const personFormArray = usePersonFormArray(arr);

  const addRow = () => {
    personFormArray.addForm();
  };

  return (
    <MultiCellSelectionContext.Provider value={multiCellSelection}>
      <div className="App">
        <table className="person-table">
          <thead>
            <tr>
              <th></th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Age</th>
              <th>
                <button onClick={addRow}>add row</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {personFormArray.formArray.map((item, i) => (
              <GridRow row={i} key={item.key} formItem={item} />
            ))}
          </tbody>
        </table>
      </div>
    </MultiCellSelectionContext.Provider>
  );
}

export default App;
