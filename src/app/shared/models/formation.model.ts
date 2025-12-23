export interface Formation {
  id: number;
  titre: string;
  description: string;
  chargeHoraire: number;
  programmePdf: string;
  niveau: 'débutant' | 'intermédiaire' | 'avancé';
  tags: string[];
  categories: string[];
}
