import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TournamentPageComponent } from './tournament/tournament-page/tournament-page.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'tournament', component: TournamentPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
