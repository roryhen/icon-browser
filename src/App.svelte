<!-- src/App.svelte -->
<script>
  import ClipboardJS from "clipboard";
  import { onMount } from "svelte";
  import { icons } from "./stores.js";
  import IconCard from "./IconCard.svelte";
  import Search from "./Search.svelte";
  import RadioSet from "./RadioSet.svelte";
  import Paginate from "./Paginate.svelte";

  // let baseUrl = "https://icons.design-flow.io";
  let baseUrl = "https://storage.googleapis.com/g-icons";

  let searchTerm = "";
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

  let iconSets = [
    {
      name: "Filled",
      slug: "materialicons",
    },
    {
      name: "Outlined",
      slug: "materialiconsoutlined",
    },
    {
      name: "Round",
      slug: "materialiconsround",
    },
    {
      name: "Sharp",
      slug: "materialiconssharp",
    },
    {
      name: "Two tone",
      slug: "materialiconstwotone",
    },
  ];

  $: if (currentSet === "materialiconstwotone") {
    currentTheme = "light";
  }

  let themes = [
    { name: "Light", slug: "light" },
    { name: "Dark", slug: "dark" },
    { name: "Blue", slug: "blue" },
    { name: "Red", slug: "red" },
  ];

  let currentSet = "materialiconsoutlined";
  let currentTheme = "light";
  let currentPage;

  function updatePage() {
    currentPage = 1;
  }
</script>

{#if $icons.length}
  <header>
    <Search bind:searchTerm on:input={updatePage} />
    <RadioSet bind:selected={currentSet} sets={iconSets} />
    <RadioSet bind:selected={currentTheme} sets={themes} />
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
  <p class="loading">Loading...</p>
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

  .loading,
  .message {
    font-weight: 700;
    text-align: center;
    font-size: 1.3em;
  }

  :global(.navigation) header {
    position: sticky;
    top: 89px;
    z-index: 1;
  }
</style>
