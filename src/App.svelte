<!-- src/App.svelte -->
<script>
  import IconCard from "./IconCard.svelte";
  import Toggle from "./Toggle.svelte";
  import Search from "./Search.svelte";
  import IconSets from "./IconSets.svelte";
  import ClipboardJS from "clipboard";
  import { onMount } from "svelte";

  const HOST = "https://icons.design-flow.io";

  let currentIconSet;
  let isDarkTheme = false;
  let searchTerm = "";
  let iconProps = [];
  $: filteredIcons = iconProps.filter((icon) => {
    return icon.iconName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  let clipboard = new ClipboardJS(".icon-card", {
    text: function (trigger) {
      let button = trigger.closest("button");
      return button.querySelector("img").getAttribute("src");
    },
  });

  clipboard.on("success", function (e) {
    e.trigger.classList.add("tooltip");
    setTimeout(() => {
      e.trigger.classList.remove("tooltip");
    }, 4000);
  });

  function toggleTheme(e) {
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle("dark");
  }

  onMount(async () => {
    const res = await fetch(`${HOST}/icons/data.txt`);
    const text = await res.text();
    let index = 0;
    iconProps = text
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
      });
  });
</script>

{#if iconProps}
  <header>
    <Search bind:searchTerm />
    <IconSets bind:currentIconSet />
    <Toggle toggleOn={isDarkTheme} on:click={toggleTheme} />
  </header>

  <section class="icon-list">
    {#each filteredIcons as iconData (iconData.id)}
      <IconCard
        theme={isDarkTheme ? "dark" : "light"}
        category={iconData.category}
        iconName={iconData.iconName}
        iconSet={iconData.iconSet}
        currentSet={currentIconSet}
        baseUrl={HOST}
      />
    {/each}
  </section>
{:else}
  <p style="text-align: center;">Loading...</p>
{/if}

<style>
  header {
    display: flex;
    align-items: center;
    flex-flow: row wrap;
    justify-content: space-between;
    gap: 0.7em;
    margin-bottom: 0.9em;
  }

  .icon-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(7em, 1fr));
    gap: 1.2em;
    justify-content: center;
  }

  :global(.navigation) header {
    position: sticky;
    top: 89px;
    z-index: 1;
  }
</style>
