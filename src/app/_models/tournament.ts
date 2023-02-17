import { TournamentPlayer } from "./tournament-player";

export interface Tournament {
  id: number;
  name: string;
  closed: boolean;
  players: TournamentPlayer[];
}
