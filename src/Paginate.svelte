<!-- src/Paginate.svelte -->
<script>
  export let items = [];
  export let pageSize = 100;
  export let currentPage = 1;

  $: totalPages = Math.ceil(items.length / pageSize);
  $: range = Array.from({ length: totalPages }, (x, i) => i + 1).filter(
    (page) => {
      const upper = Math.max(currentPage + 3, 6);
      const lower = Math.min(currentPage - 3, totalPages - 5);
      if (lower < page && page < upper) {
        return true;
      }
    }
  );

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

  function withinRange(page) {
    const lower = Math.max(currentPage - 3, 0);
    const upper = Math.min(currentPage + 3, totalPages);
    return lower < page && page > upper;
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
  <button
    disabled={currentPage === 1}
    on:click={downPage}
    class="labeled button"
  >
    <svg
      class="prev svg"
      viewBox="0 0 60 100"
      width="6"
      height="10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline
        stroke="currentColor"
        fill="none"
        stroke-width="16"
        stroke-linecap="round"
        stroke-linejoin="round"
        points="50 90 10 50 50 10"
      />
    </svg>
    <span class="label">Prev</span>
  </button>
  {#each range as page}
    <button
      class:active={currentPage === page}
      on:click={() => setPage(page)}
      class="button"
    >
      {page}
    </button>
  {/each}
  <button
    disabled={currentPage === totalPages}
    on:click={upPage}
    class="labeled button"
  >
    <span class="label">Next</span>
    <svg
      class="next svg"
      viewBox="0 0 60 100"
      width="6"
      height="10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline
        stroke="currentColor"
        fill="none"
        stroke-width="16"
        stroke-linecap="round"
        stroke-linejoin="round"
        points="10 90 50 50 10 10"
      />
    </svg>
  </button>
</div>

<style>
  section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
    gap: var(--size-3);
    justify-content: center;
    padding: 0 var(--size-3);
  }

  .pages {
    position: sticky;
    bottom: 0;
    display: flex;
    justify-content: center;
    gap: var(--size-2);
    padding: var(--size-5) 0 var(--size-7);
    margin: 0 auto;
    background-color: var(--bg-color);
    border-top: var(--light-border);
  }

  button {
    padding: var(--size-2);
    width: 2.5rem;
    height: 2.5rem;
    color: var(--text-color);
    border: var(--light-border);
    font-size: 0.9rem;
  }

  .labeled {
    width: auto;
    padding: var(--size-2) var(--size-4);
  }

  button.active {
    color: var(--accent-color);
    border: var(--accent-border);
    background-color: var(--accent-color-light);
    font-weight: bold;
  }

  button:not([disabled]):hover {
    background-color: var(--gray-2);
  }

  button[disabled] {
    color: var(--gray-3);
  }

  :global(.dark) button:not([disabled]):hover {
    background-color: var(--gray-8);
  }

  :global(.dark) button[disabled] {
    color: var(--gray-8);
    border-color: var(--gray-8);
  }

  .prev {
    margin-right: 0.2rem;
  }

  .next {
    margin-left: 0.2rem;
  }

  .warn {
    color: orange;
    font-weight: bold;
  }

  @media (max-width: 430px) {
    .labeled {
      padding: 0;
      width: 2.5rem;
    }

    .svg {
      margin: 0;
    }

    .label {
      display: none;
    }
  }
</style>
