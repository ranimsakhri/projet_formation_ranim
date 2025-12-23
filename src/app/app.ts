import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './layout/header/header';
import { AdminSidebarComponent } from './layout/admin-sidebar/admin-sidebar';

import { HomeComponent } from './public/home/home';
import { FormationsComponent } from './public/formations/formations';
import { FormationDetailComponent } from './public/formation-detail/formation-detail';
import { InscriptionComponent } from './public/inscription/inscription';

import { AdminHomeComponent } from './admin/admin-home/admin-home';
import { CandidatsComponent } from './admin/candidats/candidats';
import { FormateursComponent } from './admin/formateurs/formateurs';
import { FormationsAdminComponent } from './admin/formations-admin/formations-admin';
import { SessionsComponent } from './admin/sessions/sessions';
import { AppRoutingModule } from './app.routes';
import { CandidatForm } from './shared/components/candidat-form/candidat-form';
import { FormateurForm } from './shared/components/formateur-form/formateur-form';
import { FormationForm } from './shared/components/formation-form/formation-form';
import { SessionForm } from './shared/components/session-form/session-form';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AdminSidebarComponent,
    HomeComponent,
    Formations,
    FormationDetail,
    Inscription,
    AdminHome,
    Candidats,
    Formateurs,
    FormationsAdmin,
    Sessions,
    CandidatForm,
    FormateurForm,
    FormationForm,
    SessionForm
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }