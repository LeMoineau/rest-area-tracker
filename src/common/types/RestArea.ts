export default interface RestArea {
  nom: string;
  type: "Repos" | "Service";
  localisation: string;
  equipement_aire_de_repos: "Oui" | "Non";
  carburant?: string;
  recharge_electrique?: "Oui" | "Non";
  restauration: string;
  autres: string;
  commentaires: string;
}
