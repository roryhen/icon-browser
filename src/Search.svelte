<!-- src/Search.svelte -->
<script>
  export let searchTerm = "";
</script>

<label for="icon-search">Search an icon</label>
<input
  type="search"
  id="icon-search"
  bind:value={searchTerm}
  placeholder="Search for an icon..."
/>

<style>
  input {
    padding: 0.6em 0.9em;
    width: 100%;
    border: 1px solid rgb(0 0 0 / 0.3);
    outline: none;
    font-family: inherit;
    font-size: 0.9rem;
  }

  input:focus {
    border-color: rgb(0 150 250 / 0.6);
  }

  label {
    position: absolute;
    height: 0;
    visibility: hidden;
  }
</style>
