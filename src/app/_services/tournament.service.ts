import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tournament } from '../_models/tournament';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  baseUrl = environment.apiUrl;
  private currentTournaments = new BehaviorSubject<Tournament[] | null>(null);
  currentTournaments$ = this.currentTournaments.asObservable();

  constructor(private http: HttpClient) {}

  getTournaments(): Observable<Tournament[]> {
    return this.http
      .get<Tournament[]>(this.baseUrl + 'Tournament')
      .pipe(tap((res) => this.currentTournaments.next(res)));
  }

  createTournament(tournamentName: string) {
    var body = { Name: tournamentName };
    return this.http.post<void>(this.baseUrl + 'Tournament', body);
  }

  getTournament(tournamentId: number): Observable<Tournament> {
    return this.http.get<Tournament>(
      this.baseUrl + 'Tournament/' + tournamentId
    );
  }

  addPointsToPlayer(tournamentId: number, playerId: number, points: number) {
    var body = { PlayerId: playerId, PointsAdded: points };
    return this.http.put<void>(
      this.baseUrl + 'Tournament/' + tournamentId + '/AddPoints',
      body
    );
  }

  closeTournament(tournamentId: number, close : boolean) {
    return this.http.put<void>(this.baseUrl + 'Tournament/' + tournamentId + '/Close', {close : close});
  }
}
