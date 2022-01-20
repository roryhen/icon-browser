<!-- src/App.svelte -->
<script>
  import ClipboardJS from "clipboard";
  import { onMount } from "svelte";
  import { icons } from "./stores.js";
  import IconCard from "./IconCard.svelte";
  import Search from "./Search.svelte";
  import RadioSet from "./RadioSet.svelte";
  import Paginate from "./Paginate.svelte";
  import Spinner from "./Spinner.svelte";

  let baseUrl = "/icons";
  let currentSet = "materialiconsoutlined";
  let currentTheme = "light";
  let currentPage;
  let searchTerm = "";

  let iconSets = [
    { name: "Filled", slug: "materialicons" },
    { name: "Outlined", slug: "materialiconsoutlined" },
    { name: "Round", slug: "materialiconsround" },
    { name: "Sharp", slug: "materialiconssharp" },
  ];

  let themes = [
    { name: "Light", slug: "light" },
    { name: "Dark", slug: "dark" },
    { name: "Blue", slug: "blue" },
    { name: "Red", slug: "red" },
  ];

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function shuffle(array) {
    filteredIcons = shuffleArray(array);
  }

  function updatePage() {
    currentPage = 1;
  }

  if (__SNOWPACK_ENV__.MODE === "development") {
    baseUrl = __SNOWPACK_ENV__.STORAGE_URL;
  } else if (process.env.STORAGE_URL) {
    baseUrl = process.env.STORAGE_URL;
  }

  $: filteredIcons = $icons.filter((icon) => {
    return (
      icon.iconName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      icon.iconSet === currentSet
    );
  });

  onMount(() => {
    let clipboard = new ClipboardJS(".icon-card");

    clipboard.on("success", function (e) {
      e.trigger.classList.add("tooltip");
      setTimeout(() => {
        e.trigger.classList.remove("tooltip");
      }, 4000);
    });
  });
</script>

<h1>ICON BROWSER</h1>
<p class="instructions">Tap/Click an icon below to get a shareable URL</p>

{#if $icons.length}
  <header>
    <Search bind:searchTerm on:input={updatePage} />
    <RadioSet bind:selected={currentSet} sets={iconSets} title={"Style"} />
    <RadioSet bind:selected={currentTheme} sets={themes} title={"Theme"} />
    <button class="button" on:click={shuffle(filteredIcons)}
      ><span class="material-icons-outlined">shuffle</span></button
    >
  </header>

  {#if filteredIcons.length}
    <Paginate items={filteredIcons} {currentPage} let:item>
      <IconCard
        {currentTheme}
        {currentSet}
        {baseUrl}
        category={item.category}
        iconName={item.iconName}
        iconSet={item.iconSet}
      />
    </Paginate>
  {:else}
    <p class="message">No results found!</p>
  {/if}
{:else}
  <p class="loading"><Spinner /></p>
{/if}

<style>
  h1 {
    text-align: center;
    margin: var(--size-6) 0 0;
  }

  .instructions {
    text-align: center;
    font-size: var(--font-size-0);
    margin: 0 0 var(--size-4);
    opacity: 0.6;
  }

  header {
    position: sticky;
    top: 0;
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    justify-content: center;
    gap: var(--size-2);
    padding: var(--size-3);
    background: var(--bg-color);
    border-bottom: var(--light-border);
    margin-bottom: var(--size-5);
    z-index: 1;
  }

  button {
    width: 43px;
    height: 43px;
    padding: var(--size-2);
  }

  button > span {
    font-size: var(--font-size-4);
  }

  .message {
    font-weight: 700;
    text-align: center;
    font-size: var(--font-size-4);
    margin: var(--size-4) 0;
  }
</style>
