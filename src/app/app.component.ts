import { Component, OnInit } from '@angular/core';
import { Player } from './_models/player.model';
import { AccountService } from './_services/account.service';
import { TournamentService } from './_services/tournament.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'TournamentAppNG';

  constructor(private accountService: AccountService) {}
  ngOnInit(): void {
    this.checkLocalStorage();
  }
  checkLocalStorage() {
    var playerJson = localStorage.getItem('player');
    if (playerJson) {
      this.accountService.setCurrentPlayer(JSON.parse(playerJson) as Player);
    }
  }
}
