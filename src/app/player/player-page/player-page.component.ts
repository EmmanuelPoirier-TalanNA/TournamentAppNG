import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, tap } from 'rxjs';
import { PlayerFull } from 'src/app/_models/player-full.model';
import { Player } from 'src/app/_models/player.model';
import { Role } from 'src/app/_models/role.model';
import { TournamentOfPlayer } from 'src/app/_models/tournament-of-player.model';
import { AccountService } from 'src/app/_services/account.service';
import { PlayerService } from 'src/app/_services/player.service';

@Component({
  selector: 'app-player-page',
  templateUrl: './player-page.component.html',
  styleUrls: ['./player-page.component.scss'],
})
export class PlayerPageComponent implements OnInit {
  currentPlayer$!: Observable<Player | null>;
  dataPlayers!: MatTableDataSource<Player>;
  dataTournamentsOfPlayer: MatTableDataSource<TournamentOfPlayer> =
    new MatTableDataSource<TournamentOfPlayer>();
  displayedColumns: string[] = ['playerId', 'name'];
  tournamentsOfPlayerDisplayedColumns: string[] = [
    'tournamentId',
    'name',
    'closed',
    'score',
    'classement',
  ];
  selectedPlayer?: PlayerFull | null = null;
  selectedPlayerRole?: Role;
  selectedPlayerRoleId?: number;

  roles: Role[] = [
    { RoleId: 1, RoleName: 'Admin' },
    { RoleId: 2, RoleName: 'Player' },
  ];

  constructor(
    private playerService: PlayerService,
    private accountService: AccountService,
  ) {}

  ngOnInit(): void {
    this.currentPlayer$ = this.accountService.currentPlayer$;
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
    this.playerService.getPlayerById(row.playerId).subscribe((res) => {
      this.selectedPlayer = res;
      this.selectedPlayerRoleId = this.roles.find(
        (r) => r.RoleName === res.role
      )?.RoleId;
      this.dataTournamentsOfPlayer = new MatTableDataSource<TournamentOfPlayer>(
        res.tournaments
      );
    });
  }

  updateRole() {
    console.log(this.selectedPlayerRoleId);
    var role = this.roles.find(
      (r) => r.RoleId === this.selectedPlayerRoleId
    )?.RoleName;
    if (this.selectedPlayer && role) {
      this.playerService.updateRole({
        PlayerId: this.selectedPlayer.playerId,
        Role: role,
      }).subscribe( isUpdated => {
        if(isUpdated) {
          var playerUpdated = this.dataPlayers.data.filter(p => p.playerId === this.selectedPlayer?.playerId)[0];
          if(playerUpdated && role) {
            playerUpdated.role = role;
          }
        }
      });
    }
  }
}
