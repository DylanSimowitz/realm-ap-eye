import { PlayerPage } from "./Pages/Player";
import { PlayerSkinsPage } from "./Pages/Skins";

export class Player {
  private pages: {
    player: PlayerPage;
    skins: PlayerSkinsPage;
  };
  constructor(parameters: { name: string }) {
    this.pages = {
      player: new PlayerPage(parameters),
      skins: new PlayerSkinsPage(parameters),
    };
  }

  public get player(): PlayerPage {
    return this.pages.player;
  }

  public get skins(): PlayerSkinsPage {
    return this.pages.skins;
  }

  public async ready() {
    await this.pages.player.ready();
    return this;
  }
}
