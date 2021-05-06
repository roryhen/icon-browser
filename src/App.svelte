<!-- src/App.svelte -->
<script>
  import IconCard from "./IconCard.svelte";
  import SlideToggle from "./SlideToggle.svelte";
  import Search from "./Search.svelte";
  import IconSets from "./IconSets.svelte";
  import ClipboardJS from "clipboard";
  import { onMount } from "svelte";

  const HOST = "https://icons.design-flow.io";

  let currentIconSet = "materialiconsoutlined";
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
    <SlideToggle toggleOn={isDarkTheme} on:click={toggleTheme} />
  </header>

  <section class="icon-list">
    {#each filteredIcons as iconData (iconData.id)}
      <IconCard
        theme={isDarkTheme ? "dark" : "light"}
        {...iconData}
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
    flex-flow: column nowrap;
    gap: 1em;
    margin-bottom: 1em;
  }

  .icon-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(8em, 1fr));
    gap: 1.2em;
    justify-content: center;
  }
</style>
