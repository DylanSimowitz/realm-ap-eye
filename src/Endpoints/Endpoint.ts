import cheerio from "cheerio";
import fetch from "node-fetch";
import camelcase from "camelcase";
import { Cache } from "../Util/Cache";

export abstract class Endpoint extends Cache {
  protected readonly url = "https://www.realmeye.com/";
  private _endpoint = this.url;
  private documents: { [key: string]: string } = {};
  protected abstract $: CheerioStatic;
  constructor() {
    super();
  }
  private async fetchDocument() {
    if (this.documents[this._endpoint]) {
      return this.documents[this._endpoint];
    }
    const document = await fetch(this._endpoint).then((response) =>
      response.text()
    );
    this.documents[this._endpoint] = document;

    return document;
  }
  protected loadDocument() {
    const document = cheerio.load(this.documents[this._endpoint]);
    this.$ = document;
  }
  protected async load(...args: string[]) {
    if (args.length) this.endpoint = args.join("/");
    await this.fetchDocument();
    await this.loadDocument();
  }
  private tableKeys(): string[] {
    const { $ } = this;
    return $("#e th")
      .map((idx, el) => {
        let title = "";
        if ($(el).find("abbr").length) {
          let temp = $($(el).find("abbr")[0]).attr("title");
          if (temp) title = temp;
        } else {
          title = $(el).text();
        }
        title = camelcase(title);
        return title;
      })
      .get();
  }
  protected expire(endpoint = this._endpoint) {
    delete this.documents[endpoint];
  }
  protected set endpoint(value: string) {
    this._endpoint = this.url + value;
  }

  protected get endpoint(): string {
    return this._endpoint;
  }

  public async table<T>(
    headings: string[] = this.tableKeys(),
    each: (index: number, element: CheerioElement) => T
  ) {
    const { $ } = this;
    const table: T[] = $("#e tbody tr").map(each).get();
    return table;
  }
}
