import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './public/home/home';
import { FormationsComponent } from './public/formations/formations';
import { FormationDetailComponent } from './public/formation-detail/formation-detail';
import { InscriptionComponent } from './public/inscription/inscription';
import { AdminHomeComponent } from './admin/admin-home/admin-home';
import { CandidatsComponent } from './admin/candidats/candidats';
import { FormateursComponent } from './admin/formateurs/formateurs';
import { FormationsAdminComponent } from './admin/formations-admin/formations-admin';
import { SessionsComponent } from './admin/sessions/sessions';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'formations', component:FormationsComponent },
  { path: 'formation/:id', component: FormationDetailComponent },
  { path: 'inscription/:sessionId', component:InscriptionComponent},
  
  { 
    path: 'admin-space', 
    children: [
      { path: '', component: AdminHomeComponent },
      { path: 'candidats', component:CandidatsComponent },
      { path: 'formateurs', component: FormateursComponent },
      { path: 'formations', component: FormationsAdminComponent},
      { path: 'sessions', component: SessionsComponent}
    ]
  },
  
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }