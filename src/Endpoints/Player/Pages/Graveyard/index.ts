import { PlayerEndpoint } from "../../PlayerEndpoint";

export interface PlayerPageParameters {
  name: string;
}

export interface PlayerGraveyardResponse {
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

export interface CharacterStats {
  hp: number;
  mp: number;
  att: number;
  def: number;
  spd: number;
  vit: number;
  wis: number;
  dex: number;
}

export type PlayerGraveyardHeading =
  | "diedOn"
  | "character"
  | "class"
  | "level"
  | "baseFame"
  | "totalFame"
  | "exp"
  | "equipment"
  | "stats"
  | "killedBy";

export class PlayerGraveyardPage extends PlayerEndpoint {
  constructor(parameters: PlayerPageParameters) {
    super({ ...parameters, path: "graveyard-of-player" });
  }

  public async deaths() {
    await this.load(this.path, this.name);
    const headings: (keyof PlayerGraveyardResponse)[] = [
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
    ];
    return this.table<PlayerGraveyardResponse>(headings, (idx, el) => {
      const { $ } = this;
      let data: any = {};
      $(el)
        .find("td")
        .each((idx, el) => {
          const key = headings[idx];
          switch (key) {
            case "character":
              break;
            case "level":
            case "baseFame":
            case "totalFame":
            case "exp":
              data[key] = Number($(el).text());
              break;
            case "equipment":
              data[key] = $(el)
                .find("span.item")
                .map((idx, el) => {
                  return $(el).attr("title");
                })
                .get();
              break;
            case "stats":
              const stats = JSON.parse(
                $(el).find("span.player-stats").attr("data-stats")!
              );
              data[key] = {
                hp: stats[0],
                mp: stats[1],
                att: stats[2],
                def: stats[3],
                spd: stats[4],
                vit: stats[5],
                wis: stats[6],
                dex: stats[7],
              };
              break;
            default:
              data[key] = $(el).text();
              break;
          }
        });
      return data;
    });
  }
}
