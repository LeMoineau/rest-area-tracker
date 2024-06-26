export default interface RestArea {
  id: string;
  autoroute: string;
  sens: string;
  aire: string;
  type: "Repos" | "Service";
  localisation: string;
  equipement_aire_de_repos: "Oui{string}" | "Non{string}";
  carburant?: string;
  recharge_electrique?: "Oui" | "Non";
  restauration: string;
  autres: string;
  commentaires: string;
}