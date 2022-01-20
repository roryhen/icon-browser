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
    padding: 2em 1em;
    border-radius: var(--radius-4);
    border: 0;
  }

  button:focus {
    outline: var(--accent-border);
  }

  button:hover {
    background-color: var(--gray-1);
  }

  button:active {
    background-color: var(--gray-3);
  }

  h3 {
    margin: 2rem 0 0;
    font-weight: var(--font-weight-3);
    font-size: var(--font-size-0);
  }

  span {
    font-size: 3rem;
    color: var(--icon-color);
  }

  button {
    --icon-color: var(--gray-7);
  }

  :global(.dark) button {
    --icon-color: var(--gray-3);
  }

  :global(.dark) button:hover {
    background-color: rgb(255 255 255 / 0.05);
  }

  :global(.dark) button:active {
    background-color: rgb(255 255 255 / 0.09);
  }

  :global(.blue) button {
    --icon-color: var(--blue-8);
  }

  :global(.red) button {
    --icon-color: var(--red-8);
  }

  .tooltip::before {
    content: "Copied!";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: var(--size-2) var(--size-3);
    border-radius: var(--radius-round);
    background-color: var(--accent-color-light);
    color: var(--accent-color);
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
