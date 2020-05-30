import { PlayerPage } from "./Pages/Player";
import { PlayerSkinsPage } from "./Pages/Skins";
import { PlayerGraveyardPage } from "./Pages/Graveyard";

export class Player {
  private pages: {
    player: PlayerPage;
    skins: PlayerSkinsPage;
    graveyard: PlayerGraveyardPage;
  };
  constructor(parameters: { name: string }) {
    this.pages = {
      player: new PlayerPage(parameters),
      skins: new PlayerSkinsPage(parameters),
      graveyard: new PlayerGraveyardPage(parameters),
    };
  }

  public get player(): PlayerPage {
    return this.pages.player;
  }

  public get skins(): PlayerSkinsPage {
    return this.pages.skins;
  }

  public get graveyard(): PlayerGraveyardPage {
    return this.pages.graveyard;
  }
}
