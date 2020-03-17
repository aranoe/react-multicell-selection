import { useMemo } from "react";
import {
  ExtractErrorsType,
  ExtractFieldsType,
  ExtractValuesType,
  FormConfig,
  MappedFields,
  UseFluentForm,
} from "react-fluent-form";

export type FieldData<Config extends FormConfig> = {
  [field in keyof ExtractFieldsType<Config>]: {
    field: MappedFields<ExtractFieldsType<Config>>[field];
    errors: ExtractErrorsType<Config>[field];
    validity: boolean | undefined;
    touched: boolean | undefined;
    value: ExtractValuesType<Config>[field];
  };
};

export const useFieldData = <Config extends FormConfig>({
  fields,
  errors,
  validity,
  touched,
  values
}: UseFluentForm<Config>): FieldData<Config> => {
  return useMemo(() => {
    const fieldData = {} as FieldData<Config>;
    const fieldKeys = Object.keys(fields) as Array<keyof FieldData<Config>>;
    for (const key of fieldKeys) {
      fieldData[key] = {
        field: fields[key],
        errors: errors[key],
        validity: validity[key],
        touched: touched[key],
        value: values[key]
      };
    }
    return fieldData;
  }, [fields, errors, validity, touched, values]);
};
