<!-- src/Toggle.svelte -->
<script>
  export let toggleOn;
  export let off = "Light";
  export let on = "Dark";
</script>

<button class:on={toggleOn} on:click>
  <span id="toggle-1">{off}</span>
  <span id="toggle-2">{on}</span>
</button>

<style>
  :root {
    --pad: 4px;
    /* The width of the toggle */
    --width: 160px;
  }

  button {
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

  button span {
    position: relative;
    padding: var(--pad) 1em;
    transition: color 200ms;
    flex: 1 1 0;
  }

  button span:first-child {
    color: #222;
  }

  button::before {
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

  button.on::before {
    transform: translatex(100%);
  }

  button.on span:nth-child(2) {
    color: #222;
  }

  button.on span:first-child {
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
</style>
