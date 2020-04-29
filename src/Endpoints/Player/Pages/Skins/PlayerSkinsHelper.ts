import { SkinDetails, CharacterClass, Skins } from ".";

export class PlayerSkinsHelper {
  private static selectors = {
    rogue: "h4:nth-of-type(1) + .row .col-md-12 .skin",
    archer: "h4:nth-of-type(2) + .row .col-md-12 .skin",
    wizard: "h4:nth-of-type(3) + .row .col-md-12 .skin",
    priest: "h4:nth-of-type(4) + .row .col-md-12 .skin",
    warrior: "h4:nth-of-type(5) + .row .col-md-12 .skin",
    knight: "h4:nth-of-type(6) + .row .col-md-12 .skin",
    paladin: "h4:nth-of-type(7) + .row .col-md-12 .skin",
    assassin: "h4:nth-of-type(8) + .row .col-md-12 .skin",
    necromancer: "h4:nth-of-type(9) + .row .col-md-12 .skin",
    huntress: "h4:nth-of-type(10) + .row .col-md-12 .skin",
    mystic: "h4:nth-of-type(11) + .row .col-md-12 .skin",
    trickster: "h4:nth-of-type(12) + .row .col-md-12 .skin",
    sorcerer: "h4:nth-of-type(13) + .row .col-md-12 .skin",
    ninja: "h4:nth-of-type(14) + .row .col-md-12 .skin",
    samurai: "h4:nth-of-type(15) + .row .col-md-12 .skin",
  };
  private static getSkinDetails(
    $: CheerioStatic,
    characterClass: CharacterClass
  ) {
    return $(this.selectors[characterClass])
      .map(
        (_, el): SkinDetails => {
          return {
            name: $(el).attr("title") || "",
            unlocked: $(el).css("background-position").split(" ")[0] === "0px",
          };
        }
      )
      .get();
  }
  static all($: CheerioStatic): Skins {
    //@ts-ignore
    let skins: Skins = {};
    //@ts-ignore
    Object.keys(this.selectors).map((key: CharacterClass) => {
      skins[key] = this.getSkinDetails($, key);
    });
    return skins;
  }
  static rogue($: CheerioStatic): SkinDetails[] {
    return this.getSkinDetails($, "rogue");
  }
  static archer($: CheerioStatic): SkinDetails[] {
    return this.getSkinDetails($, "archer");
  }
  static wizard($: CheerioStatic): SkinDetails[] {
    return this.getSkinDetails($, "wizard");
  }
  static priest($: CheerioStatic): SkinDetails[] {
    return this.getSkinDetails($, "priest");
  }
  static warrior($: CheerioStatic): SkinDetails[] {
    return this.getSkinDetails($, "warrior");
  }
  static knight($: CheerioStatic): SkinDetails[] {
    return this.getSkinDetails($, "knight");
  }
  static paladin($: CheerioStatic): SkinDetails[] {
    return this.getSkinDetails($, "paladin");
  }
  static assassin($: CheerioStatic): SkinDetails[] {
    return this.getSkinDetails($, "assassin");
  }
  static necromancer($: CheerioStatic): SkinDetails[] {
    return this.getSkinDetails($, "necromancer");
  }
  static huntress($: CheerioStatic): SkinDetails[] {
    return this.getSkinDetails($, "huntress");
  }
  static mystic($: CheerioStatic): SkinDetails[] {
    return this.getSkinDetails($, "mystic");
  }
  static trickster($: CheerioStatic): SkinDetails[] {
    return this.getSkinDetails($, "trickster");
  }
  static sorcerer($: CheerioStatic): SkinDetails[] {
    return this.getSkinDetails($, "sorcerer");
  }
  static ninja($: CheerioStatic): SkinDetails[] {
    return this.getSkinDetails($, "ninja");
  }
  static samurai($: CheerioStatic): SkinDetails[] {
    return this.getSkinDetails($, "samurai");
  }
}
