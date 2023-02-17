import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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
  displayedColumns: string[] = ['id', 'name', 'score', 'actions'];
  dataSource!: MatTableDataSource<TournamentPlayer>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private tournamentService: TournamentService
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
          this.dataSource = new MatTableDataSource<TournamentPlayer>(
            res.players
          );
          this.dataSource.paginator = this.paginator;
        }
      });
  }

  ngOnInit(): void {}

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
}
