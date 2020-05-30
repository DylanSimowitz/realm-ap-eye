import { PlayerEndpoint } from "../../PlayerEndpoint";
import { PlayerStatsHelper } from "./PlayerStatsHelper";
import { CharacterStats } from "../types";

export interface PlayerPageParameters {
  name: string;
}

export interface PlayerCharacterResponse {
  pet: string;
  character: undefined;
  class: string;
  level: number;
  questsCompleted: string;
  fame: number;
  exp: number;
  place: number;
  equipment: string[];
  stats: CharacterStats;
}

export interface PlayerStats {
  [index: string]: string | number | undefined;
  player: string;
  characters?: number;
  skins?: number;
  fame?: number;
  exp?: number;
  rank?: number;
  accountFame?: number;
  guild?: string;
  guildRank?: string;
  created?: string;
  lastSeen?: string;
}

export class PlayerPage extends PlayerEndpoint {
  constructor(parameters: PlayerPageParameters) {
    super({ ...parameters, path: "player" });
  }
  public async stats(): Promise<PlayerStats> {
    await this.load();
    const { $ } = this;
    return {
      player: PlayerStatsHelper.player($),
      characters: PlayerStatsHelper.characters($),
      skins: PlayerStatsHelper.skins($),
      fame: PlayerStatsHelper.fame($),
      exp: PlayerStatsHelper.exp($),
      rank: PlayerStatsHelper.rank($),
      accountFame: PlayerStatsHelper.accountFame($),
      guild: PlayerStatsHelper.guild($),
      guildRank: PlayerStatsHelper.guildRank($),
      created: PlayerStatsHelper.created($),
      lastSeen: PlayerStatsHelper.lastSeen($),
    };
  }

  public async description() {
    const selector = "#d .description-line";
    await this.load();
    const { $ } = this;
    return $(selector)
      .map((_, el) => {
        return $(el).text();
      })
      .get() as string[];
  }

  public async characters(name = this.name) {
    const headings: (keyof PlayerCharacterResponse)[] = [
      "pet",
      "character",
      "class",
      "level",
      "questsCompleted",
      "fame",
      "exp",
      "place",
      "equipment",
      "stats",
    ];
    await this.load();
    return this.table<PlayerCharacterResponse>(headings);
  }
}
