import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs';
import { Player } from 'src/app/_models/player.model';
import { PlayerService } from 'src/app/_services/player.service';

@Component({
  selector: 'app-player-page',
  templateUrl: './player-page.component.html',
  styleUrls: ['./player-page.component.scss'],
})
export class PlayerPageComponent implements OnInit {
  dataPlayers!: MatTableDataSource<Player>;
  displayedColumns: string[] = ['playerId', 'name'];

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

  clickedRows(row: any) {
    console.log(row);
  }
}
