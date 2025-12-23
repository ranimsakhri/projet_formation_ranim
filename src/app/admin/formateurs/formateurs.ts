import { Component, OnInit } from '@angular/core';
import { Formateur } from '../../shared/models/formateur.model';
import { FormateurService } from '../../core/services/formateur';

@Component({
  selector: 'app-formateurs',
  templateUrl: './formateurs.component.html',
  styleUrls: ['./formateurs.component.scss']
})
export class FormateursComponent implements OnInit {
  formateurs: Formateur[] = [];
  filteredFormateurs: Formateur[] = [];
  searchTerm: string = '';
  showForm = false;
  currentFormateur: Formateur | null = null;
  isEditMode = false;

  constructor(private formateurService:FormateurService) {}

  ngOnInit(): void {
    this.loadFormateurs();
  }

  loadFormateurs(): void {
    this.formateurService.getAllFormateurs().subscribe(formateurs => {
      this.formateurs = formateurs;
      this.filteredFormateurs = formateurs;
    });
  }

  onSearch(): void {
    if (!this.searchTerm) {
      this.filteredFormateurs = this.formateurs;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredFormateurs = this.formateurs.filter(formateur =>
      formateur.nom.toLowerCase().includes(term) ||
      formateur.prenom.toLowerCase().includes(term) ||
      formateur.email.toLowerCase().includes(term) ||
      formateur.specialites.some(s => s.toLowerCase().includes(term))
    );
  }

  addFormateur(): void {
    this.currentFormateur = null;
    this.isEditMode = false;
    this.showForm = true;
  }

  editFormateur(formateur: Formateur): void {
    this.currentFormateur = { ...formateur };
    this.isEditMode = true;
    this.showForm = true;
  }

  deleteFormateur(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce formateur ?')) {
      this.formateurService.deleteFormateur(id).subscribe(() => {
        this.loadFormateurs();
      });
    }
  }

  viewCV(cvUrl: string): void {
    window.open(cvUrl, '_blank');
  }

  onFormSubmit(formateur: Formateur): void {
    if (this.isEditMode && this.currentFormateur) {
      this.formateurService.updateFormateur(this.currentFormateur.id, formateur)
        .subscribe(() => {
          this.loadFormateurs();
          this.showForm = false;
        });
    } else {
      this.formateurService.createFormateur(formateur).subscribe(() => {
        this.loadFormateurs();
        this.showForm = false;
      });
    }
  }

  onFormCancel(): void {
    this.showForm = false;
  }
}