import { Component, OnInit } from '@angular/core';
import { FormationService } from '../../core/services/formation';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit {
  categories: string[] = [];

  constructor(private formationService: FormationService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.formationService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
}