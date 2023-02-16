import { TournamentPlayer } from "./tournament-player";

export interface Tournament {
  id: number;
  name: string;
  players: TournamentPlayer[];
}
