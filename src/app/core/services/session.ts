import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionFormation } from '../../shared/models/session.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private apiUrl = 'http://localhost:3000/api/sessions';

  constructor(private http: HttpClient) {}

  getAllSessions(): Observable<SessionFormation[]> {
    return this.http.get<SessionFormation[]>(this.apiUrl);
  }

  getSession(id: number): Observable<SessionFormation> {
    return this.http.get<SessionFormation>(`${this.apiUrl}/${id}`);
  }

  getSessionsByFormation(formationId: number): Observable<SessionFormation[]> {
    return this.http.get<SessionFormation[]>(`${this.apiUrl}/formation/${formationId}`);
  }

  createSession(session: SessionFormation): Observable<SessionFormation> {
    return this.http.post<SessionFormation>(this.apiUrl, session);
  }

  updateSession(id: number, session: SessionFormation): Observable<SessionFormation> {
    return this.http.put<SessionFormation>(`${this.apiUrl}/${id}`, session);
  }

  deleteSession(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  inscrireCandidat(sessionId: number, candidatData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${sessionId}/inscrire`, candidatData);
  }
}