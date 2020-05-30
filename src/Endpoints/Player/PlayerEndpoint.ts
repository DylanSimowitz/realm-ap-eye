import { Endpoint } from "../Endpoint";
import cheerio from "cheerio";

export interface PlayerEndpointParameters {
  path: PlayerEndpoints;
  name: string;
}

export type PlayerEndpoints =
  | "player"
  | "character-skins-of"
  | "offers-by"
  | "graveyard-of-player"
  | "graveyard-summary-of-player"
  | "pets-of"
  | "fame-history-of-player"
  | "rank-history-of-player"
  | "name-history-of-player"
  | "guild-history-of-player"
  | "pet-graveyard-of"
  | "signature-of-player";

export class PlayerEndpoint extends Endpoint {
  protected path: PlayerEndpoints;
  protected name: PlayerEndpointParameters["name"];
  protected $: CheerioStatic;
  constructor(parameters: PlayerEndpointParameters) {
    super();
    const { name, path } = parameters;
    this.$ = cheerio.load("");
    this.name = name;
    this.path = path;
  }

  public async load() {
    await super.load(this.path, this.name);
    const { $ } = this;
    if ($(".player-not-found").length) throw new Error("Player not found");
  }
}
