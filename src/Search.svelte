<!-- src/Search.svelte -->
<script>
  export let searchTerm = "";
</script>

<div>
  <label for="icon-search">Search for an icon</label>
  <input
    type="search"
    id="icon-search"
    bind:value={searchTerm}
    placeholder="Search for an icon..."
    on:input
  />
</div>

<style>
  div {
    position: relative;
    width: 100%;
  }

  input {
    padding: 0.6em 0.9em;
    width: 100%;
    border: var(--light-border);
    outline: none;
    font-family: inherit;
    font-size: 0.9rem;
  }

  input:focus,
  :global(.dark) input:focus {
    border-color: var(--accent-color);
  }

  label {
    position: absolute;
    visibility: hidden;
    height: 0;
  }

  :global(.dark) input {
    background-color: var(--gray-8);
    border-color: var(--gray-6);
  }

  :global(.dark) input,
  :global(.dark) input::placeholder {
    color: var(--gray-0);
  }
</style>
