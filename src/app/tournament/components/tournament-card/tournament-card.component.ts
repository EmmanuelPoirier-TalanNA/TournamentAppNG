import { Component, Input } from '@angular/core';
import { Tournament } from 'src/app/_models/tournament';

@Component({
  selector: 'app-tournament-card',
  templateUrl: './tournament-card.component.html',
  styleUrls: ['./tournament-card.component.scss']
})
export class TournamentCardComponent {

  @Input() tournament! : Tournament;

}
