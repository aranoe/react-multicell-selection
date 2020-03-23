import "./App.css";

import React from "react";

import { GridRow } from "./components/grid-performant/GridRow";
import { PersonFormValues, usePersonFormArray } from "./forms/personForm";
import { SelectionBox } from "./hooks/multi-cell-selection-performant/components/SelectionBox/SelectionBox";
import { MultiCellSelectionProvider } from "./hooks/multi-cell-selection-performant/context/MultiCellSelectionProvider";
import { CellData } from "./hooks/multi-cell-selection-performant/useMultiCellSelection";

// import { MultiCellSelectionContext } from "./hooks/multi-cell-selection-performant/MultiCellSelectionContext";
const heads = ["Firstname", "Last"];
const persons: PersonFormValues[] = [
  {
    firstName: "Jill",
    lastName: "Smith",
    age: "54"
  },
  {
    firstName: "Micheal",
    lastName: "Moe",
    age: "43"
  },
  {
    firstName: "Thomas",
    lastName: "Proud",
    age: "26"
  },
  {
    firstName: "Jeff",
    lastName: "Miles",
    age: "87"
  },
  {
    firstName: "Samantha",
    lastName: "Jones",
    age: "19"
  }
];

function App() {
  const arr: PersonFormValues[] = [];
  Array.from({ length: 100 }).forEach(_ => arr.push(...persons));
  const { addForm, formArray, getFormStateByKey } = usePersonFormArray(arr);

  const addRow = () => {
    addForm();
  };

  const data: CellData[][] = formArray.map(arr => [
    {
      displayValue: getFormStateByKey(arr.key)?.values.firstName ?? "",
      onPaste: (value: string) =>
        arr.stateManager.setValues(arr.key, { firstName: value }),
      onCut: () => arr.stateManager.setValues(arr.key, { firstName: "" })
    },
    {
      displayValue: getFormStateByKey(arr.key)?.values.lastName ?? "",
      onPaste: (value: string) =>
        arr.stateManager.setValues(arr.key, { lastName: value }),
      onCut: () => arr.stateManager.setValues(arr.key, { lastName: "" })
    },
    {
      displayValue: getFormStateByKey(arr.key)?.values.age ?? "",
      onPaste: (value: string) =>
        arr.stateManager.setValues(arr.key, { age: value }),
      onCut: () => arr.stateManager.setValues(arr.key, { age: "" })
    }
  ]);

  return (
    <MultiCellSelectionProvider cells={data}>
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
            {formArray.map((item, i) => (
              <GridRow
                row={i}
                key={item.key}
                formItem={item}
                formState={getFormStateByKey(item.key)}
              />
            ))}
          </tbody>
        </table>
        <SelectionBox />
      </div>
    </MultiCellSelectionProvider>
  );
}

export default App;
