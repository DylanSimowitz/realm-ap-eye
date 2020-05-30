export class PlayerStatsHelper {
  private static selectors = {
    player: "span.entity-name",
    characters: "table.summary tr:contains(Characters) td:last-of-type",
    skins: "table.summary tr:contains(Skins) td:last-of-type .numeric",
    fame: "table.summary tr:contains(Fame) td:last-of-type .numeric",
    exp: "table.summary tr:contains(Exp) td:last-of-type .numeric",
    rank: "table.summary tr:contains(Rank) td:last-of-type",
    accountFame:
      "table.summary tr:contains(Account fame) td:last-of-type .numeric",
    guild: "table.summary tr:contains(Guild)",
    guildRank: "table.summary tr:contains(Guild Rank) td:last-of-type",
    created: "table.summary tr:contains(Created) td:last-of-type",
    lastSeen: "table.summary tr:contains(Last seen) td:last-of-type .timeago",
  };
  static player($: CheerioStatic) {
    return $(this.selectors.player).text();
  }
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
    return $(this.selectors.guild).first().find("td:last-of-type").text();
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
