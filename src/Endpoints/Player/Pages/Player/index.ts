import { PlayerEndpoint } from "../../PlayerEndpoint";
import { PlayerStatsHelper } from "./PlayerStatsHelper";

export interface PlayerPageParameters {
  name: string;
}

export interface PlayerStats {
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
  public async stats(): Promise<PlayerStatsHelper> {
    await this.load(this.path, this.name);
    const { $ } = this;
    return {
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
    await this.load(this.path, this.name);
    const { $ } = this;
    return $(selector)
      .map((_, el) => {
        return $(el).text();
      })
      .get() as string[];
  }

  public async characters() {
    // return super.table(this.path, this.name);
  }
}
