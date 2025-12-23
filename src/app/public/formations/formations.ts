import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Formation } from '../../shared/models/formation.model';
import { FormationService } from '../../core/services/formation';

@Component({
  selector: 'app-formations',
  templateUrl: './formations.html',
  styleUrls: ['./formations.scss']
})
export class FormationsComponent implements OnInit {
  formations: Formation[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';

  constructor(
    private formationService: FormationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedCategory = params['categorie'] || '';
      this.loadFormations();
    });
  }

  loadFormations(): void {
    this.formationService.searchFormations(this.searchTerm, this.selectedCategory)
      .subscribe(formations => {
        this.formations = formations;
      });
  }

  onSearch(): void {
    this.loadFormations();
  }
}