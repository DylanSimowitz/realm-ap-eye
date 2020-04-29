import { Player } from "./Endpoints/Player";

async function main() {
  try {
    const player = await new Player({
      name: "Ukunavi",
    }).ready();
    // console.log(await player.player.description());
    // console.log(await player.player.stats());
    const skins = await player.skins.skins();
    console.log(Object.keys(skins));

    console.log(
      Object.keys(skins).map((key) => {
        //@ts-ignore
        return skins[key].filter((skin) => skin.unlocked).length;
      })
    );

    // console.log(await player.stats());
    // const player = await new PlayerPage({
    //   name: "TehNubShow",
    // });
    // console.log(await player.description());
  } catch (error) {
    console.error(error.message);
  }
}
main();
