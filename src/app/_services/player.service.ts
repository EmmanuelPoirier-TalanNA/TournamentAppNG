import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PlayerFull } from '../_models/player-full.model';
import { Player } from '../_models/player.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.baseUrl + 'Player');
  }

  getPlayerById(playerId: number): Observable<PlayerFull> {
    return this.http.get<PlayerFull>(this.baseUrl + 'Player/' + playerId);
  }
}
