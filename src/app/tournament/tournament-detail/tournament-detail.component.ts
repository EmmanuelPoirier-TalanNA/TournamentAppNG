
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { map, of, switchMap, tap } from 'rxjs';
import { Tournament } from 'src/app/_models/tournament';
import { TournamentPlayer } from 'src/app/_models/tournament-player';
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
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private route: ActivatedRoute,
    private tournamentService: TournamentService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}
  ngAfterViewInit(): void {
    let tournamentId = this.route.snapshot.params['tournamentId'];
    this.tournamentService.currentTournaments$
      .pipe(
        switchMap((tournaments) => {
          if (tournaments?.length) {
            this.tournament = tournaments?.find(
              (t) => t.id === parseInt(tournamentId)
            );
            return of(this.tournament);
          } else {
            return this.getTournament(tournamentId);
          }
        })
      )
      .subscribe((res) => {
        if (res) {
          this.displayActions(res);
          this.dataSource = new MatTableDataSource<TournamentPlayer>(
            res.players
          );
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
  }

  ngOnInit(): void {}

  displayActions(tournament: Tournament) {
    this.displayedColumns = this.displayedColumns.filter(
      (c) => c !== 'actions'
    );
    if (tournament.closed === false) {
      this.displayedColumns.push('actions');
    }
  }

  getTournament(id: number) {
    return this.tournamentService.getTournament(id).pipe(
      tap((t) => {
        this.tournament = t;
      })
    );
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

}
