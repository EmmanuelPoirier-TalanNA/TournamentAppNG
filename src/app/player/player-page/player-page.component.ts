import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs';
import { PlayerFull } from 'src/app/_models/player-full.model';
import { Player } from 'src/app/_models/player.model';
import { TournamentOfPlayer } from 'src/app/_models/tournament-of-player.model';
import { PlayerService } from 'src/app/_services/player.service';

@Component({
  selector: 'app-player-page',
  templateUrl: './player-page.component.html',
  styleUrls: ['./player-page.component.scss'],
})
export class PlayerPageComponent implements OnInit {
  dataPlayers!: MatTableDataSource<Player>;
  dataTournamentsOfPlayer: MatTableDataSource<TournamentOfPlayer> = new MatTableDataSource<TournamentOfPlayer>();
  displayedColumns: string[] = ['playerId', 'name'];
  tournamentsOfPlayerDisplayedColumns: string[] = ['tournamentId', 'name', 'closed', 'score', 'classement'];
  selectedPlayer?: PlayerFull | null = null;

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.playerService
      .getPlayers()
      .pipe(
        tap((res) => {
          if (res) {
            this.dataPlayers = new MatTableDataSource<Player>(res);
          }
        })
      )
      .subscribe();
  }

  clickedRows(row: Player) {
    console.log(row);
    this.playerService.getPlayerById(row.playerId).subscribe((res) => {
      console.log(res);
      this.selectedPlayer = res;
      this.dataTournamentsOfPlayer = new MatTableDataSource<TournamentOfPlayer>(res.tournaments);
    });
  }
}
