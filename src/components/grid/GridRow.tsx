import React from "react";
import { useFluentFormItem } from "react-fluent-form";

import { PersonFormItem } from "../../forms/personForm";
import { useSelectableRow } from "../../hooks/multi-cell-selection/useSelectableRow";
import { GridItem } from "./GridItem";

interface GridRowProps {
  row: number;
  formItem: PersonFormItem;
}
export const GridRow = ({ row, formItem }: GridRowProps) => {
  const fluentformItem = useFluentFormItem(formItem);
  // const fieldData = useFieldData(fluentformItem);
  const { selectRow } = useSelectableRow(row);
  const removeRow = () => {
    fluentformItem.removeSelf();
  };
  return (
    <tr>
      <td onClick={selectRow} style={{ cursor: "pointer" }}>
        {row}
      </td>
      <GridItem
        field={fluentformItem.fields.firstName}
        row={row}
        column={0}
        onPaste={(value: string) => {
          console.log(fluentformItem.key);
          fluentformItem.setValues({ firstName: value });
        }}
        onCut={() => fluentformItem.setValues({ firstName: "" })}
      />
      <GridItem
        field={fluentformItem.fields.lastName}
        row={row}
        column={1}
        onPaste={(value: string) =>
          fluentformItem.setValues({ lastName: value })
        }
        onCut={() => fluentformItem.setValues({ lastName: "" })}
      />
      <GridItem
        field={fluentformItem.fields.age}
        row={row}
        column={2}
        onPaste={(value: string) => fluentformItem.setValues({ age: value })}
        onCut={() => fluentformItem.setValues({ age: "" })}
      />
      <td>
        <button onClick={removeRow}>remove row</button>
      </td>
    </tr>
  );
};
