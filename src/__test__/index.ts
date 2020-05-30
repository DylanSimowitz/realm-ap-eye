import Player from "..";

(async () => {
  const player = new Player({
    name: "Cutie",
  });
  await player.graveyard.deaths().then((res) => {
    console.log(res[0]);
  });
  await player.player.characters().then((res) => {
    console.log(res[0]);
  });
  await player.player.description().then((res) => {
    console.log(res[0]);
  });
})();
