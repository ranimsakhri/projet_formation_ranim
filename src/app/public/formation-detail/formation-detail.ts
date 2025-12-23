import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Formation } from '../../shared/models/formation.model';
import { SessionFormation } from '../../shared/models/session.model';
import { Formateur } from '../../shared/models/formateur.model';
import { FormationService } from '../../core/services/formation';

import { FormateurForm } from '../../shared/components/formateur-form/formateur-form';
import { SessionService } from '../../core/services/session';

@Component({
  selector: 'app-formation-detail',
  templateUrl: './formation-detail.html',
  styleUrls: ['./formation-detail.scss']
})
export class FormationDetailComponent implements OnInit {
  formation!: Formation;
  sessions: SessionFormation[] = [];
  formateursMap: Map<number, Formateur> = new Map();

  constructor(
    private route: ActivatedRoute,
    private formationService: FormationService,
    private sessionService: SessionService,
    private formateurService: FormateurForm
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.loadFormation(id);
  }

  loadFormation(id: number): void {
    this.formationService.getFormation(id).subscribe(formation => {
      this.formation = formation;
      this.loadSessions(id);
    });
  }

  loadSessions(formationId: number): void {
    this.sessionService.getSessionsByFormation(formationId).subscribe(sessions => {
      this.sessions = sessions;
      this.loadFormateurs(sessions);
    });
  }

  loadFormateurs(sessions: SessionFormation[]): void {
    const formateurIds = new Set<number>();
    sessions.forEach(session => {
      session.formateursIds.forEach(id => formateurIds.add(id));
    });

    formateurIds.forEach(id => {
      this.formateurService.getFormateur(id).subscribe(formateur => {
        this.formateursMap.set(id, formateur);
      });
    });
  }

  getFormateurNames(formateursIds: number[]): string {
    return formateursIds.map(id => {
      const formateur = this.formateursMap.get(id);
      return formateur ? `${formateur.prenom} ${formateur.nom}` : '';
    }).filter(name => name).join(', ');
  }

  getRemainingPlaces(session: SessionFormation): number {
    return session.maxCandidats - session.candidatsIds.length;
  }

  viewProgram(): void {
    window.open(this.formation.programmePdf, '_blank');
  }
}