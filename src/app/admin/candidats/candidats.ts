import { Component, OnInit } from '@angular/core';
import { Candidat } from '../../shared/models/candidat.model';

@Component({
  selector: 'app-candidats',
  templateUrl: './candidats.component.html',
  styleUrls: ['./candidats.component.scss']
})
export class CandidatsComponent implements OnInit {
  candidats: Candidat[] = [];
  filteredCandidats: Candidat[] = [];
  searchTerm: string = '';
  showForm = false;
  currentCandidat: Candidat | null = null;
  isEditMode = false;

  constructor(private candidatService:CandidatService) {}

  ngOnInit(): void {
    this.loadCandidats();
  }

  loadCandidats(): void {
    this.candidatService.getAllCandidats().subscribe(candidats => {
      this.candidats = candidats;
      this.filteredCandidats = candidats;
    });
  }

  onSearch(): void {
    if (!this.searchTerm) {
      this.filteredCandidats = this.candidats;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredCandidats = this.candidats.filter(candidat =>
      candidat.nom.toLowerCase().includes(term) ||
      candidat.prenom.toLowerCase().includes(term) ||
      candidat.email.toLowerCase().includes(term)
    );
  }

  addCandidat(): void {
    this.currentCandidat = null;
    this.isEditMode = false;
    this.showForm = true;
  }

  editCandidat(candidat: Candidat): void {
    this.currentCandidat = { ...candidat };
    this.isEditMode = true;
    this.showForm = true;
  }

  deleteCandidat(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce candidat ?')) {
      this.candidatService.deleteCandidat(id).subscribe(() => {
        this.loadCandidats();
      });
    }
  }

  onFormSubmit(candidat: Candidat): void {
    if (this.isEditMode && this.currentCandidat) {
      this.candidatService.updateCandidat(this.currentCandidat.id, candidat)
        .subscribe(() => {
          this.loadCandidats();
          this.showForm = false;
        });
    } else {
      this.candidatService.createCandidat(candidat).subscribe(() => {
        this.loadCandidats();
        this.showForm = false;
      });
    }
  }

  onFormCancel(): void {
    this.showForm = false;
  }
}