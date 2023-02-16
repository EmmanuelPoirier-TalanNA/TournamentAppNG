import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tournament } from '../_models/tournament';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(this.baseUrl + 'Tournament');
  }

  createTournament(tournamentName: string) {
    var body =  {Name : tournamentName};
    return this.http.post<void>(this.baseUrl + 'Tournament',  body );
  }
}
