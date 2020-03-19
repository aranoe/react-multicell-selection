import React from "react";
import { useFluentFormItem } from "react-fluent-form";

import { PersonFormItem } from "../../forms/personForm";
import { GridCell } from "./GridCell";

interface GridRowProps {
  row: number;
  formItem: PersonFormItem;
}
export const GridRow = ({ row, formItem }: GridRowProps) => {
  const fluentformItem = useFluentFormItem(formItem);
  // const fieldData = useFieldData(fluentformItem);
  const removeRow = () => {
    fluentformItem.removeSelf();
  };
  console.log("row");
  return (
    <tr>
      <td style={{ cursor: "pointer" }}>{row}</td>
      <GridCell field={fluentformItem.fields.firstName} row={row} column={0} />
      <GridCell field={fluentformItem.fields.lastName} row={row} column={1} />
      <GridCell field={fluentformItem.fields.age} row={row} column={2} />
      <td>
        <button onClick={removeRow}>remove row</button>
      </td>
    </tr>
  );
};
