import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { catchError, of, switchMap, take, tap } from 'rxjs';
import { Player } from 'src/app/_models/player.model';
import { Tournament } from 'src/app/_models/tournament';
import { TournamentPlayer } from 'src/app/_models/tournament-player';
import { AccountService } from 'src/app/_services/account.service';
import { TournamentService } from 'src/app/_services/tournament.service';

@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.scss'],
})
export class TournamentDetailComponent implements OnInit, AfterViewInit {
  tournament?: Tournament;
  displayedColumns: string[] = ['playerId', 'name', 'score', 'actions'];
  dataSource!: MatTableDataSource<TournamentPlayer>;
  currentPlayer!: Player | null;
  registeredInTournament: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private route: ActivatedRoute,
    private tournamentService: TournamentService,
    private accountService: AccountService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}
  ngAfterViewInit(): void {
    let tournamentId = parseInt(this.route.snapshot.params['tournamentId']);
    this.getTournament(tournamentId);
  }

  getTournament(tournamentId: number) {
    this.tournamentService.currentTournaments$
      .pipe(
        switchMap((tournaments) => {
          if (tournaments?.length) {
            let tournament = tournaments?.find((t) => t.id === tournamentId);
            return of(tournament);
          } else {
            return this.tournamentService.getTournament(tournamentId);
          }
        }),
        switchMap((tournament) => {
          if (tournament) {
            this.tournament = tournament;
            this.displayActions(tournament);
            this.dataSource = new MatTableDataSource<TournamentPlayer>(
              tournament.players
            );
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            return this.getPlayer();
          }
          return of(null);
        })
      )
      .subscribe();
  }

  ngOnInit(): void {}

  getPlayer() {
    return this.accountService.currentPlayer$.pipe(
      take(1),
      tap((player) => {
        this.currentPlayer = player;
        this.checkPlayerInTournament();
        if (this.tournament) {
          this.displayActions(this.tournament);
        }
      })
    );
  }

  private checkPlayerInTournament() {
    this.registeredInTournament = false;
    if (this.tournament?.players.length) {
      let registered = this.tournament.players.find(
        (p) => p.playerId === this.currentPlayer?.playerId
      );
      if (registered) {
        this.registeredInTournament = true;
      }
    }
  }

  displayActions(tournament: Tournament) {
    this.displayedColumns = this.displayedColumns.filter(
      (c) => c !== 'actions'
    );
    if (tournament.closed === false && this.currentPlayer?.role === 'Admin') {
      this.displayedColumns.push('actions');
    }
  }

  addPoints(playerId: number, points: string) {
    let nbPoints = parseInt(points);
    if (this.tournament) {
      this.tournamentService
        .addPointsToPlayer(this.tournament.id, playerId, nbPoints)
        .pipe(
          tap((res) => {
            let player = this.tournament?.players.find(
              (p) => p.playerId === playerId
            );
            if (player) {
              player.score += nbPoints;
            }
          })
        )
        .subscribe();
    }
  }

  closeTournament() {
    if (this.tournament) {
      this.tournament.closed = !this.tournament.closed;
      this.displayActions(this.tournament);
      this.tournamentService
        .closeTournament(this.tournament.id, this.tournament.closed)
        .subscribe(() => {});
    }
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  registerInTournament() {
    if (this.tournament && this.currentPlayer) {
      this.tournamentService
        .addPlayers(this.tournament.id, [this.currentPlayer.playerId])
        .pipe(
          switchMap(() => {
            return this.tournamentService.getTournaments().pipe(
              tap((tournaments) => {
                this.checkPlayerInTournament();
              })
            );
          }),
          catchError((err: any) => {
            console.log(err);
            return of(null);
          })
        )
        .subscribe();
    }
  }
}
