import cheerio from "cheerio";
import fetch from "node-fetch";
import { Cache } from "@hokify/node-ts-cache";
import { cacheStrategy } from "../Util";

export abstract class Endpoint {
  protected readonly url = "https://www.realmeye.com/";
  private _endpoint = this.url;
  protected abstract $: CheerioStatic;

  @Cache(cacheStrategy, { ttl: 60 * 5 })
  private async fetchDocument(url = this._endpoint) {
    const document = await fetch(this._endpoint).then((response) =>
      response.text()
    );
    return document;
  }

  protected async loadDocument() {
    const document = await this.fetchDocument(this._endpoint);
    this.$ = cheerio.load(document);
  }

  protected async load(...args: string[]) {
    if (args.length) this.endpoint = args.join("/");
    await this.loadDocument();
  }

  public set endpoint(value: string) {
    this._endpoint = this.url + value;
  }

  public get endpoint(): string {
    return this._endpoint;
  }

  public async table<T>(headings: string[]): Promise<T[]> {
    const { $ } = this;
    const table: T[] = $("#e tbody tr")
      .map((_, el) => {
        let data: any = {};
        $(el)
          .find("td")
          .each((idx, el) => {
            const key = headings[idx];
            switch (key) {
              case "pet":
                break;
              case "character":
                break;
              case "level":
              case "baseFame":
              case "fame":
              case "place":
              case "totalFame":
              case "exp":
                data[key] = Number($(el).text());
                break;
              case "equipment":
                data[key] = $(el)
                  .find("span.item")
                  .map((_, el) => {
                    return $(el).attr("title");
                  })
                  .get();
                break;
              case "stats":
                const arr =
                  $(el).find("span.player-stats").attr("data-stats") ??
                  "[0,0,0,0,0,0,0,0]";
                const stats = JSON.parse(arr);
                const max = $(el).find("span.player-stats").text();
                data[key] = {
                  hp: stats[0],
                  mp: stats[1],
                  att: stats[2],
                  def: stats[3],
                  spd: stats[4],
                  vit: stats[5],
                  wis: stats[6],
                  dex: stats[7],
                  max,
                };
                break;
              default:
                data[key] = $(el).text();
                break;
            }
          });
        return data;
      })
      .get();
    return table;
  }
}
