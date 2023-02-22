import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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

}
