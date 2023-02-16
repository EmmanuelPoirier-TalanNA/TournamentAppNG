import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { switchMap, tap } from 'rxjs';
import { Tournament } from 'src/app/_models/tournament';
import { TournamentService } from 'src/app/_services/tournament.service';
import { DialogNewTournamentComponent } from '../components/dialog-new-tournament/dialog-new-tournament.component';

@Component({
  selector: 'app-tournament-page',
  templateUrl: './tournament-page.component.html',
  styleUrls: ['./tournament-page.component.scss'],
})
export class TournamentPageComponent implements OnInit {
  tournaments?: Tournament[];

  constructor(
    private tournamentService: TournamentService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getTournaments().subscribe();
  }

  getTournaments() {
    return this.tournamentService.getTournaments().pipe(
      tap((result) => {
        if (result) {
          this.tournaments = result;
        }
      })
    );
  }

  openDialogNewTournament(): void {
    const dialogRef = this.dialog.open(DialogNewTournamentComponent);

    dialogRef
      .afterClosed()
      .pipe(
        switchMap((name) => {
          return this.createTournament(name);
        }),
        switchMap(() => this.getTournaments())
      )
      .subscribe((result) => {
        console.log('The dialog was closed : ', result);
      });
  }

  createTournament(name: string) {
    return this.tournamentService.createTournament(name);
  }
}
