import { Component, OnInit } from '@angular/core';
import { SessionFormation } from '../../shared/models/session.model';
import { Formation } from '../../shared/models/formation.model';
import { Formateur } from '../../shared/models/formateur.model';
import { SessionService } from '../../core/services/session';
import { FormationService } from '../../core/services/formation';
import { FormateurService } from '../../core/services/formateur';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit {
  sessions: SessionFormation[] = [];
  formations: Formation[] = [];
  formateurs: Formateur[] = [];
  filteredSessions: SessionFormation[] = [];
  searchTerm: string = '';
  showForm = false;
  currentSession: SessionFormation | null = null;
  isEditMode = false;

  constructor(
    private sessionService: SessionService,
    private formationService: FormationService,
    private formateurService: FormateurService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.sessionService.getAllSessions().subscribe(sessions => {
      this.sessions = sessions;
      this.filteredSessions = sessions;
    });

    this.formationService.getAllFormations().subscribe(formations => {
      this.formations = formations;
    });

    this.formateurService.getAllFormateurs().subscribe(formateurs => {
      this.formateurs = formateurs;
    });
  }

  onSearch(): void {
    if (!this.searchTerm) {
      this.filteredSessions = this.sessions;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredSessions = this.sessions.filter(session => {
      const formation = this.formations.find(f => f.id === session.formationId);
      return formation?.titre.toLowerCase().includes(term) ||
             session.description.toLowerCase().includes(term);
    });
  }

  addSession(): void {
    this.currentSession = null;
    this.isEditMode = false;
    this.showForm = true;
  }

  editSession(session: SessionFormation): void {
    this.currentSession = { ...session };
    this.isEditMode = true;
    this.showForm = true;
  }

  deleteSession(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette session ?')) {
      this.sessionService.deleteSession(id).subscribe(() => {
        this.loadData();
      });
    }
  }

  getFormationTitre(formationId: number): string {
    const formation = this.formations.find(f => f.id === formationId);
    return formation ? formation.titre : 'N/A';
  }

  getFormateursNames(formateursIds: number[]): string {
    const names = formateursIds.map(id => {
      const formateur = this.formateurs.find(f => f.id === id);
      return formateur ? `${formateur.prenom} ${formateur.nom}` : '';
    }).filter(name => name);
    
    return names.length > 0 ? names.join(', ') : 'Aucun';
  }

  onFormSubmit(session: SessionFormation): void {
    if (this.isEditMode && this.currentSession) {
      this.sessionService.updateSession(this.currentSession.id, session)
        .subscribe(() => {
          this.loadData();
          this.showForm = false;
        });
    } else {
      this.sessionService.createSession(session).subscribe(() => {
        this.loadData();
        this.showForm = false;
      });
    }
  }

  onFormCancel(): void {
    this.showForm = false;
  }
}