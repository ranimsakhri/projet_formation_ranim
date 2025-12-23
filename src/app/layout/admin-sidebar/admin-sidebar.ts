import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.html',
  styleUrls: ['./admin-sidebar.scss']
})
export class AdminSidebarComponent {
  menuItems = [
    { path: '/admin-space', icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
    { path: '/admin-space/candidats', icon: 'fas fa-users', label: 'Candidats' },
    { path: '/admin-space/formateurs', icon: 'fas fa-chalkboard-teacher', label: 'Formateurs' },
    { path: '/admin-space/formations', icon: 'fas fa-graduation-cap', label: 'Formations' },
    { path: '/admin-space/sessions', icon: 'fas fa-calendar-alt', label: 'Sessions' }
  ];
}