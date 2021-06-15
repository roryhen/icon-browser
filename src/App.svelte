<!-- src/App.svelte -->
<script>
  import ClipboardJS from "clipboard";
  import { onMount } from "svelte";
  // import { paginate, PaginationNav } from "svelte-paginate";
  import { icons } from "./stores.js";
  import IconCard from "./IconCard.svelte";
  import Search from "./Search.svelte";
  import RadioSet from "./RadioSet.svelte";

  let baseUrl = "https://icons.design-flow.io";

  let searchTerm = "";
  $: filteredIcons = $icons.filter((icon) => {
    return icon.iconName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  let currentPage = 1;
  let pageSize = 100;
  let paginatedItems;
  // $: paginatedItems = paginate({ filteredIcons, pageSize, currentPage });

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
</script>

{#if $icons.length}
  <header>
    <Search bind:searchTerm />
    <RadioSet bind:selected={currentSet} sets={iconSets} />
    <RadioSet bind:selected={currentTheme} sets={themes} />
  </header>

  <section class="icon-list">
    {#each filteredIcons as iconData (iconData.id)}
      <IconCard
        {currentTheme}
        {currentSet}
        {baseUrl}
        category={iconData.category}
        iconName={iconData.iconName}
        iconSet={iconData.iconSet}
      />
    {:else}
      <p class="message">No results found!</p>
    {/each}
  </section>

  <!-- <PaginationNav
    totalItems={filteredIcons.length}
    {pageSize}
    {currentPage}
    limit={1}
    showStepOptions={true}
    on:setPage={(e) => (currentPage = e.detail.page)}
  /> -->
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

  .icon-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(7em, 1fr));
    gap: 1.2em;
    justify-content: center;
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
