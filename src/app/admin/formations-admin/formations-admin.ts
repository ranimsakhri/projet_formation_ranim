import { Component, OnInit } from '@angular/core';
import { Formation } from '../../shared/models/formation.model';
import { FormationService } from '../../core/services/formation';
import { FormationForm } from "../../shared/components/formation-form/formation-form";

@Component({
  selector: 'app-formations-admin',
  templateUrl: './formations-admin.html',
  styleUrls: ['./formations-admin.scss'],
  imports: [FormationForm]
})
export class FormationsAdminComponent implements OnInit {
  formations: Formation[] = [];
  filteredFormations: Formation[] = [];
  searchTerm: string = '';
  showForm = false;
  currentFormation: Formation | null = null;
  isEditMode = false;

  constructor(private formationService: FormationService) {}

  ngOnInit(): void {
    this.loadFormations();
  }

  loadFormations(): void {
    this.formationService.getAllFormations().subscribe(formations => {
      this.formations = formations;
      this.filteredFormations = formations;
    });
  }

  onSearch(): void {
    if (!this.searchTerm) {
      this.filteredFormations = this.formations;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredFormations = this.formations.filter(formation =>
      formation.titre.toLowerCase().includes(term) ||
      formation.description.toLowerCase().includes(term) ||
      formation.tags.some(tag => tag.toLowerCase().includes(term))
    );
  }

  addFormation(): void {
    this.currentFormation = null;
    this.isEditMode = false;
    this.showForm = true;
  }

  editFormation(formation: Formation): void {
    this.currentFormation = { ...formation };
    this.isEditMode = true;
    this.showForm = true;
  }

  deleteFormation(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
      this.formationService.deleteFormation(id).subscribe(() => {
        this.loadFormations();
      });
    }
  }

  viewProgram(programUrl: string): void {
    window.open(programUrl, '_blank');
  }

  onFormSubmit(formation: Formation): void {
    if (this.isEditMode && this.currentFormation) {
      this.formationService.updateFormation(this.currentFormation.id, formation)
        .subscribe(() => {
          this.loadFormations();
          this.showForm = false;
        });
    } else {
      this.formationService.createFormation(formation).subscribe(() => {
        this.loadFormations();
        this.showForm = false;
      });
    }
  }

  onFormCancel(): void {
    this.showForm = false;
  }
}