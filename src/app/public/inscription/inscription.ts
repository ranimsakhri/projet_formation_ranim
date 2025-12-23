import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionFormation } from '../../shared/models/session.model';
import { SessionService } from '../../core/services/session';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.html',
  styleUrls: ['./inscription.scss']
})
export class InscriptionComponent implements OnInit {
  sessionId!: number;
  session!: SessionFormation;
  inscriptionForm: FormGroup;
  isSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private sessionService: SessionService
  ) {
    this.inscriptionForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      numeroCIN: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]]
    });
  }

  ngOnInit(): void {
    this.sessionId = +this.route.snapshot.params['sessionId'];
    this.loadSession();
  }

  loadSession(): void {
    this.sessionService.getSession(this.sessionId).subscribe(session => {
      this.session = session;
      if (this.session.candidatsIds.length >= this.session.maxCandidats) {
        this.router.navigate(['/formation', this.session.formationId]);
      }
    });
  }

  onSubmit(): void {
    if (this.inscriptionForm.valid) {
      this.isSubmitting = true;
      const candidatData = this.inscriptionForm.value;
      
      this.sessionService.inscrireCandidat(this.sessionId, candidatData)
        .subscribe({
          next: () => {
            alert('Inscription réussie !');
            this.router.navigate(['/formation', this.session.formationId]);
          },
          error: (error) => {
            console.error('Erreur inscription:', error);
            this.isSubmitting = false;
          }
        });
    }
  }

  get remainingPlaces(): number {
    return this.session ? this.session.maxCandidats - this.session.candidatsIds.length : 0;
  }
}