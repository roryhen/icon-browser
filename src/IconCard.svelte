<!-- src/IconCard.svelte -->
<script>
  export let currentTheme;
  export let currentSet;
  export let baseUrl;

  export let category;
  export let iconName;
  export let iconSet;

  let withDashes = {
    materialicons: "material-icons",
    materialiconsoutlined: "material-icons-outlined",
    materialiconsround: "material-icons-round",
    materialiconssharp: "material-icons-sharp",
    materialiconstwotone: "material-icons-two-tone",
  };

  let tooltip;
  let formattedName = iconName
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
  $: iconSlug = `${baseUrl}/${currentTheme}/${category}/${iconName}/${iconSet}/24px.svg`;

  $: if (currentTheme) {
    document.body.classList.remove("dark", "blue", "red");
    switch (currentTheme) {
      case "dark":
        document.body.classList.add("dark");
        break;
      case "blue":
        document.body.classList.add("blue");
        break;
      case "red":
        document.body.classList.add("red");
        break;
    }
  }
</script>

<button class="icon-card" class:tooltip data-clipboard-text={iconSlug}>
  <span class={withDashes[currentSet]}>{iconName}</span>
  <h3>{formattedName}</h3>
</button>

<style>
  button {
    position: relative;
    padding: 1.2em 1em;
    border: none;
    background: none;
    outline: none;
    font-family: "IBM Plex Mono", Helvetica, Arial, sans-serif;
  }

  button:focus {
    outline: rgb(0 150 250 / 0.6) solid 1px;
  }

  button:hover {
    background: rgb(0 0 0 / 0.03);
  }

  button:active {
    background: rgb(0 0 0 / 0.06);
  }

  span {
    font-size: 3rem;
    color: var(--icon-color);
  }

  :global(body.dark) button {
    --icon-color: #e7e9ec;
  }

  :global(body.blue) button {
    --icon-color: #133df6;
  }

  :global(body.red) button {
    --icon-color: #ff331f;
  }

  :global(body.dark) button:hover {
    background: rgb(255 255 255 / 0.03);
  }

  :global(body.dark) button:active {
    background: rgb(255 255 255 / 0.06);
  }

  h3 {
    margin: 1em 0 0.2em;
    line-height: 1.5;
    font-family: inherit;
    font-size: 0.9em;
    font-weight: 400;
  }

  .tooltip::before {
    content: "Copied!";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #d7e6fc;
    padding: 0.5em 1.3em;
    border-radius: 2em;
    font-size: 1em;
    color: #0075fe;
    pointer-events: none;
    animation: 0.5s ease-out 1.5s 1 forwards fadeOut;
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
</style>
