import { OptionalRestAreaField } from "./RestAreaField";

export type RestAreaFilter = {
  hasFields: OptionalRestAreaField[];
  hasNotFields: OptionalRestAreaField[];
  autoroutes: string[];
};
