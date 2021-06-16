import { readable } from 'svelte/store';

export const icons = readable([], async (set) => {
    const res = await fetch(`https://lucid-heyrovsky-a6ebcb.netlify.app/icons/data.txt`);
    const text = await res.text();
    let index = 0;
    set(text.trim().split("\n").map((line) => {
        let dirs = line.split("/");
        return {
          id: index++,
          category: dirs[1],
          iconName: dirs[2],
          iconSet: dirs[3],
        }
    }));
});