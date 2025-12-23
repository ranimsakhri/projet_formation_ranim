import { Component, OnInit } from '@angular/core';
import { Dashboard} from '../../core/services/dashboard';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.html',
  styleUrls: ['./admin-home.scss']
})
export class AdminHomeComponent implements OnInit {
  stats = {
    totalCandidats: 0,
    totalFormateurs: 0,
    totalFormations: 0,
    totalSessions: 0,
    sessionsEnCours: 0
  };

  recentSessions: any[] = [];

  constructor(private dashboardService:Dashboard) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.dashboardService.getStats().subscribe(stats => {
      this.stats = stats;
    });

    this.dashboardService.getRecentSessions().subscribe(sessions => {
      this.recentSessions = sessions;
    });
  }
}