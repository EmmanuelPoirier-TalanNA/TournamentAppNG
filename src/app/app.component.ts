import { Component, OnInit } from '@angular/core';
import { TournamentService } from './_services/tournament.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'TournamentAppNG';

  constructor() {}
  ngOnInit(): void {
  }
}
