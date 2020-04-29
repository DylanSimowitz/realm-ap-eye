export class PlayerStatsHelper {
  private static selectors = {
    characters: "table.summary tr:nth-child(1) td:last-of-type",
    skins: "table.summary tr:nth-child(2) td:last-of-type .numeric",
    fame: "table.summary tr:nth-child(3) td:last-of-type .numeric",
    exp: "table.summary tr:nth-child(4) td:last-of-type .numeric",
    rank: "table.summary tr:nth-child(5) td:last-of-type",
    accountFame: "table.summary tr:nth-child(6) td:last-of-type .numeric",
    guild: "table.summary tr:nth-child(7) td:last-of-type",
    guildRank: "table.summary tr:nth-child(8) td:last-of-type",
    created: "table.summary tr:nth-child(9) td:last-of-type",
    lastSeen: "table.summary tr:nth-child(10) td:last-of-type .timeago",
  };
  static characters($: CheerioStatic) {
    return Number($(this.selectors.characters).text());
  }
  static skins($: CheerioStatic) {
    return Number($(this.selectors.skins).text());
  }
  static fame($: CheerioStatic) {
    return Number($(this.selectors.fame).text());
  }
  static exp($: CheerioStatic) {
    return Number($(this.selectors.exp).text());
  }
  static rank($: CheerioStatic) {
    return Number($(this.selectors.rank).text());
  }
  static accountFame($: CheerioStatic) {
    return Number($(this.selectors.accountFame).text());
  }
  static guild($: CheerioStatic) {
    return $(this.selectors.guild).text();
  }
  static guildRank($: CheerioStatic) {
    return $(this.selectors.guildRank).text();
  }
  static created($: CheerioStatic) {
    return $(this.selectors.created).text();
  }
  static lastSeen($: CheerioStatic) {
    return $(this.selectors.lastSeen).text() || "hidden";
  }
}
