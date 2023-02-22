import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './_shared/shared.module';
import { HomeComponent } from './home/home.component';
import { TournamentPageComponent } from './tournament/tournament-page/tournament-page.component';
import { TournamentCardComponent } from './tournament/components/tournament-card/tournament-card.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DialogNewTournamentComponent } from './tournament/components/dialog-new-tournament/dialog-new-tournament.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TournamentDetailComponent } from './tournament/tournament-detail/tournament-detail.component';
import { SampleComponent } from './sample/sample.component';
import { RegisterComponent } from './register/register.component';
import { DialogLoginComponent } from './header/components/dialog-login/dialog-login.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { PlayerPageComponent } from './player/player-page/player-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    TournamentPageComponent,
    TournamentCardComponent,
    DialogNewTournamentComponent,
    TournamentDetailComponent,
    SampleComponent,
    RegisterComponent,
    DialogLoginComponent,
    PlayerPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
