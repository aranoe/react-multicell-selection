import { createFormArray, field, useFluentFormArray, UseFluentFormItemArgs } from "react-fluent-form";

export interface PersonFormValues {
  firstName: string;
  lastName: string;
  age: string;
}

export const createPersonFormArrayConfig = (
  initialArray?: PersonFormValues[]
) =>
  createFormArray<PersonFormValues>()({
    firstName: field.text(),
    lastName: field.text(),
    age: field.text()
  }).withInitialArray(initialArray ?? []);

export type PersonFormArrayConfig = ReturnType<
  typeof createPersonFormArrayConfig
>;

export type PersonFormItem = UseFluentFormItemArgs<PersonFormArrayConfig>;
export const usePersonFormArray = (initialArray?: PersonFormValues[]) =>
  useFluentFormArray(createPersonFormArrayConfig(initialArray));
