import { Component, OnInit } from '@angular/core';
import { Tournament } from 'src/app/_models/tournament';
import { TournamentService } from 'src/app/_services/tournament.service';

@Component({
  selector: 'app-tournament-page',
  templateUrl: './tournament-page.component.html',
  styleUrls: ['./tournament-page.component.scss']
})
export class TournamentPageComponent implements OnInit {

  tournaments?: Tournament[];

  constructor(private tournamentService: TournamentService) {}
  ngOnInit(): void {
    this.tournamentService.getTournaments()
    .subscribe((result) => {
      if (result) {
        this.tournaments = result;
      }
    });
  }
}
