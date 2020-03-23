import React, { PropsWithChildren, useMemo } from "react";
import { FormItem, useFluentFormItem } from "react-fluent-form";

import { PersonFormItem, PersonFormValues } from "../../forms/personForm";
import { GridCell } from "./GridCell";

interface GridRowProps {
  row: number;
  formItem: PersonFormItem;
  formState: FormItem<PersonFormValues, any> | undefined;
}

const areEqual = (
  prevProps: Readonly<PropsWithChildren<GridRowProps>>,
  nextProps: Readonly<PropsWithChildren<GridRowProps>>
): boolean => {
  // console.log("x");
  const prevValues = prevProps.formState?.values;
  const nextValues = nextProps.formState?.values;

  // console.log("first", prevValues === nextValues);
  if (prevValues === nextValues) return true;
  // console.log(
  //   prevValues?.firstName === nextValues?.firstName &&
  //     prevValues?.lastName === nextValues?.lastName &&
  //     prevValues?.age === nextValues?.age
  // );
  return (
    prevValues?.firstName === nextValues?.firstName &&
    prevValues?.lastName === nextValues?.lastName &&
    prevValues?.age === nextValues?.age &&
    prevProps.row === nextProps.row
  );
};

export const GridRow = React.memo(({ row, formItem }: GridRowProps) => {
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
}, areEqual);
