import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  tournamentName: string;
}

@Component({
  selector: 'app-dialog-new-tournament',
  templateUrl: './dialog-new-tournament.component.html',
  styleUrls: ['./dialog-new-tournament.component.scss']
})
export class DialogNewTournamentComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogNewTournamentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData ,
  ) {
    this.data = {tournamentName: ''}
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
