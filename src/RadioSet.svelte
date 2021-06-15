<script>
  export let sets;
  export let selected;
</script>

<section>
  {#each sets as set}
    <label class:active={selected === set.slug}>
      <input type="radio" bind:group={selected} value={set.slug} />
      {set.name}
    </label>
  {/each}
</section>

<style>
  section {
    display: flex;
    flex-flow: row wrap;
    gap: 1em;
    font-size: 0.9rem;
  }

  label {
    padding: 0.5em 1.3em;
    border-radius: 2em;
    color: #0075fe;
    padding: 3px 12px;
    border: 1px solid #d7e6fc;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0);
    transition: background-color 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
      color 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    white-space: nowrap;
    font-size: 1em;
    line-height: 1.1;
  }

  label:hover {
    background: #d7e6fc;
  }

  [type="radio"] {
    visibility: hidden;
    position: absolute;
  }

  label.active {
    border-width: 1px;
    border-color: #0075fe;
    background-color: #e8effe;
  }

  :global(body.dark) label:not(.active) {
    color: #d7e6fc;
  }

  :global(body.dark) label:hover {
    color: #0075fe;
  }
</style>
