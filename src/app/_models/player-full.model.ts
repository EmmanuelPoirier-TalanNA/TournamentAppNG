import { TournamentOfPlayer } from './tournament-of-player.model';

export interface PlayerFull {
  playerId: number;
  pseudo: string;
  role: string;
  tournaments: TournamentOfPlayer[];
}
