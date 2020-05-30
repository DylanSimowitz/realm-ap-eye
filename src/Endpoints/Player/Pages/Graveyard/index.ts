import { CharacterStats } from "./../types";
import { PlayerEndpoint } from "../../PlayerEndpoint";

export interface PlayerPageParameters {
  name: string;
}

export interface PlayerGraveyardResponse {
  [index: string]: any;
  diedOn: string;
  character: undefined;
  class: string;
  level: number;
  baseFame: number;
  totalFame: number;
  exp: number;
  equipment: string[];
  stats: CharacterStats;
  killedBy: string;
}

export class PlayerGraveyardPage extends PlayerEndpoint {
  constructor(parameters: PlayerPageParameters) {
    super({ ...parameters, path: "graveyard-of-player" });
  }

  public async deaths(
    headings: Extract<keyof PlayerGraveyardResponse, string>[] = [
      "diedOn",
      "character",
      "class",
      "level",
      "baseFame",
      "totalFame",
      "exp",
      "equipment",
      "stats",
      "killedBy",
    ]
  ) {
    await this.load();
    return this.table<PlayerGraveyardResponse>(headings);
  }
}
