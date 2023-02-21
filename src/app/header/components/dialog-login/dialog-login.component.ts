import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { catchError, of, tap } from 'rxjs';
import { AccountService } from 'src/app/_services/account.service';

export interface DialogLoginData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.scss'],
})
export class DialogLoginComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [Validators.required]);
  loginForm!: FormGroup;
  matcher = new MyErrorStateMatcher();
  errorMessage = '';
  hidePassword = true;
  constructor(
    private accountService: AccountService,
    public dialogRef: MatDialogRef<DialogLoginComponent>,
    @Inject(MAT_DIALOG_DATA) public loginData: DialogLoginData
  ) {
    this.loginData = { email: '', password: '' };
  }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: this.emailFormControl,
      password: this.passwordFormControl,
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onValidClick() {
    this.accountService
      .login(this.loginForm.value)
      .pipe(
        tap((player) => {
          if (player) {
            this.dialogRef.close();
            console.log(player);
          }
        }),
        catchError((err: any) => {
          if (err.error) {
            console.log(err.error);
            this.errorMessage = err.error;
          }
          return of(null);
        })
      )
      .subscribe();
  }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
