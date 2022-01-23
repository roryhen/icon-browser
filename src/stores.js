import { readable } from "svelte/store";

export const icons = readable([], function start(set) {
  let index = 0;
  fetch(`/data.txt`)
    .then((res) => res.text())
    .then((text) => {
      set(
        text
          .trim()
          .split("\n")
          .map((line) => {
            let dirs = line.split("/");
            return {
              id: index++,
              category: dirs[1],
              iconName: dirs[2],
              iconSet: dirs[3],
            };
          })
      );
    });
  return function stop() {
    console.log("Unsubscribed to icon store");
  };
});
