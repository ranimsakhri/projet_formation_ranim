export interface SessionFormation {
  id: number;
  formationId: number;
  formateursIds: number[];
  candidatsIds: number[];
  dateDebut: Date;
  dateFin: Date;
  description: string;
  maxCandidats: number;
}
