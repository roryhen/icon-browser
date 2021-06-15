<!-- src/Toggle.svelte -->
<script>
  let themes = ["light", "dark", "red", "blue"];
  export let themeColor = themes[0];

  $: if (themeColor === "Dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }

  function properName(string) {
    return string[0].toUpperCase() + string.slice(1);
  }
</script>

<div class={themeColor}>
  {#each themes as theme}
    <input type="radio" bind:group={themeColor} value={theme} id={theme} />
    <label for={theme}>{properName(theme)}</label>
  {/each}
</div>

<!-- <style>
  :root {
    --pad: 4px;
    /* The width of the toggle */
    --width: 160px;
  }

  div {
    position: relative;
    display: flex;
    padding: var(--pad);
    width: var(--width);
    background: #bbb;
    border: 0;
    border-radius: 2em;
    outline: 0;
    line-height: 1;
    font-size: 0.9rem;
    font-family: inherit;
  }

  div input {
    position: relative;
    padding: var(--pad) 1em;
    transition: color 200ms;
    flex: 1 1 0;
  }

  div input:first-child {
    color: #222;
  }

  div::before {
    position: absolute;
    content: "";
    top: var(--pad);
    left: var(--pad);
    width: calc(50% - var(--pad));
    height: calc(1em + var(--pad) * 2);
    background: #fff;
    border-radius: 2em;
    transition: transform 200ms ease-in-out;
  }

  div.on::before {
    transform: translatex(100%);
  }

  div.on span:nth-child(2) {
    color: #222;
  }

  div.on span:first-child {
    color: #888;
  }

  :global(body.dark) button {
    background: #666;
  }

  :global(body.dark) button::before {
    background: #222;
  }

  :global(body.dark) button.on span:nth-child(2) {
    color: #fff;
  }

  :global(body.dark) button.on span:first-child {
    color: #bbb;
  }
</style> -->
