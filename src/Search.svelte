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
    border: 1px solid rgba(0, 0, 0, 0.3);
    outline: none;
    font-family: inherit;
    font-size: 0.9rem;
  }

  input:focus {
    border-color: rgba(0, 150, 250, 0.6);
  }

  label {
    position: absolute;
    visibility: hidden;
    height: 0;
  }

  :global(body.dark) input {
    background-color: rgba(0, 0, 0, 0.2);
    color: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.5);
  }

  :global(body.dark) input::placeholder {
    color: rgba(255, 255, 255, 0.9);
  }
</style>
