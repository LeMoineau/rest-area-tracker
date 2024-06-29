import {
  OptionalRestAreaField,
  RestAreaField,
} from "../../types/RestAreaField";

export const OPTIONAL_REST_AREA_FIELDS_LABEL: {
  [field in OptionalRestAreaField]: string;
} = {
  autres: "Autres",
  carburant: "Carburant",
  commentaires: "Commentaires",
  hotellerie: "Hotellerie",
  img: "Image",
  equipements_aire_de_repos: "Equipement d'aire de repos",
  recharge_electrique: "Recharge électrique",
  restauration: "Restauration",
};

export const REST_AREA_FIELDS_LABEL: { [field in RestAreaField]: string } = {
  id: "Id",
  aire: "Nom",
  autoroute: "Autoroute",
  localisation: "Localisation",
  sens: "Sens",
  type: "Type",
  ...OPTIONAL_REST_AREA_FIELDS_LABEL,
};
