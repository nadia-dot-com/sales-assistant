export enum TabsTriggerValues {
  Description = "description",
  Additional = "additional",
  Ingredients = "ingredients",
  Reviews = "reviews",
}

export interface ParameterRow {
  label: string;
  value: string;
}

export type ProductTabItem =
  | {
      value: TabsTriggerValues;
      label: string;
      content: string;
    }
  | {
      value: TabsTriggerValues.Additional;
      label: string;
      parameters: ParameterRow[];
    };
