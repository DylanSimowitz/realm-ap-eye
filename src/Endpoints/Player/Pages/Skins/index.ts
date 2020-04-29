import { PlayerEndpoint } from "../../PlayerEndpoint";
import { PlayerSkinsHelper } from "./PlayerSkinsHelper";

export interface SkinsPageParameters {
  name: string;
}

export type CharacterClass =
  | "rogue"
  | "archer"
  | "wizard"
  | "priest"
  | "warrior"
  | "knight"
  | "paladin"
  | "assassin"
  | "necromancer"
  | "huntress"
  | "mystic"
  | "trickster"
  | "sorcerer"
  | "ninja"
  | "samurai";

export type SkinDetails = {
  name: string;
  unlocked: boolean;
};

export interface Skins {
  rogue: SkinDetails[];
  archer: SkinDetails[];
  wizard: SkinDetails[];
  priest: SkinDetails[];
  warrior: SkinDetails[];
  knight: SkinDetails[];
  paladin: SkinDetails[];
  assassin: SkinDetails[];
  necromancer: SkinDetails[];
  huntress: SkinDetails[];
  mystic: SkinDetails[];
  trickster: SkinDetails[];
  sorcerer: SkinDetails[];
  ninja: SkinDetails[];
  samurai: SkinDetails[];
}

export class PlayerSkinsPage extends PlayerEndpoint {
  constructor(parameters: SkinsPageParameters) {
    super({ ...parameters, path: "character-skins-of" });
  }
  public async skins(): Promise<Skins> {
    await this.load(this.path, this.name);
    const { $ } = this;
    return PlayerSkinsHelper.all($);
  }
}
