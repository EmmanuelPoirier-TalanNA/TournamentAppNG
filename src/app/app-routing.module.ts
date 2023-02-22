import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlayerPageComponent } from './player/player-page/player-page.component';
import { RegisterComponent } from './register/register.component';
import { SampleComponent } from './sample/sample.component';
import { TournamentDetailComponent } from './tournament/tournament-detail/tournament-detail.component';
import { TournamentPageComponent } from './tournament/tournament-page/tournament-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'player',
    children: [
      { path: '', component: PlayerPageComponent },
    ],
  },
  { path: 'register', component: RegisterComponent },
  { path: 'sample', component: SampleComponent },
  {
    path: 'tournament',
    children: [
      { path: '', component: TournamentPageComponent },
      { path: ':tournamentId', component: TournamentDetailComponent }, //, resolve: {member: MemberDetailedResolver}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
