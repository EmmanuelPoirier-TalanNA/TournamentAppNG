import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Player } from '../_models/player.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;

  private currentPlayerSource = new BehaviorSubject<Player | null>(null);
  currentPlayer$ = this.currentPlayerSource.asObservable();

  constructor(private http: HttpClient) {}

  register(model: any) {
    return this.http
      .post<Player>(this.baseUrl + 'Account/Register', model)
      .pipe(
        map((player) => {
          if (player) {
            this.setCurrentPlayer(player);
          }
        })
      );
  }

  setCurrentPlayer(player: Player) {
    localStorage.setItem('player', JSON.stringify(player));
    this.currentPlayerSource.next(player);
  }

  logout() {
    localStorage.removeItem('player');
    this.currentPlayerSource.next(null);
  }

  login(loginDto: any) {
    return this.http.post<Player>(this.baseUrl + 'account/login', loginDto)
    .pipe(
      map((response: Player) => {
        const player = response;
        if (player) {
          this.setCurrentPlayer(player);
        }
        return player;
      })
    );
  }
}
