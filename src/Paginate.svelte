<!-- src/Paginate.svelte -->
<script>
  export let items = [];
  export let pageSize = 100;
  export let currentPage = 1;

  $: totalPages = Math.ceil(items.length / pageSize);
  $: range = Array.from({ length: totalPages }, (x, i) => i + 1);

  $: upperRange = currentPage * pageSize;
  $: filtered = items.slice(upperRange - pageSize, upperRange);

  $: if (items.length < pageSize) {
    currentPage = 1;
  }

  function upPage() {
    if (currentPage < totalPages) currentPage += 1;
  }

  function downPage() {
    if (currentPage > 1) currentPage -= 1;
  }

  function setPage(n) {
    currentPage = n;
  }
</script>

<section>
  {#each filtered as item (item.id)}
    <slot {item}>Missing template</slot>
  {:else}
    <p class="warn">No items found!</p>
  {/each}
</section>

<div class="pages">
  <button disabled={currentPage === 1} on:click={downPage}>
    &lsaquo; Prev
  </button>
  {#each range as page}
    <button class:active={currentPage === page} on:click={() => setPage(page)}>
      {page}
    </button>
  {/each}
  <button disabled={currentPage === totalPages} on:click={upPage}>
    Next &rsaquo;
  </button>
</div>

<style>
  section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(7em, 1fr));
    gap: 1.2em;
    justify-content: center;
  }
  .pages {
    display: flex;
    justify-content: center;
    flex-flow: row wrap;
    margin-top: 1em;
  }
  .pages button {
    padding: 1em 1.7em;
    margin-right: -1px;
    margin-top: -1px;
    font-family: inherit;
    background: transparent;
    border: 1px solid #999;
  }
  .pages button:hover {
    background-color: rgb(255 255 255 / 0.03);
  }
  .pages button.active {
    color: #0075fe;
    border-color: #0075fe;
    background-color: #e8effe;
    font-weight: bold;
  }
  .warn {
    color: orange;
    font-weight: bold;
  }
  .pages .active + button {
    border-left-color: #0075fe;
  }
  :global(body.dark) button {
    color: var(--text-color);
    border-color: var(--text-color);
  }
</style>
