export type RestAreaField = RequiredRestAreaField | OptionalRestAreaField;

export type RequiredRestAreaField =
  | "id"
  | "autoroute"
  | "sens"
  | "aire"
  | "type"
  | "localisation";

export type OptionalRestAreaField =
  | "carburant"
  | "recharge_electrique"
  | "restauration"
  | "hotellerie"
  | "autres"
  | "commentaires"
  | "img"
  | "equipements_aire_de_repos";
