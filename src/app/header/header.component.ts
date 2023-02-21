import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { Player } from '../_models/player.model';
import { AccountService } from '../_services/account.service';
import { DialogLoginComponent } from './components/dialog-login/dialog-login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentPlayer$!: Observable<Player | null>;
  constructor(
    private accountService: AccountService,
    private router: Router,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.currentPlayer$ = this.accountService.currentPlayer$;
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

  openDialogLogin(): void {
    const dialogRef = this.dialog.open(DialogLoginComponent);

    dialogRef
      .afterClosed()
      .subscribe((result) => {
        console.log('The dialog was closed : ', result);
      });
  }
}
