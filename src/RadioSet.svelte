<!-- src/RadioSet.svelte -->
<script>
  export let sets = [];
  export let selected;
  export let title;
  let open = false;
</script>

<div class:open>
  {#if title}
    <h3>{title}</h3>
  {/if}
  {#each sets as set}
    <label class:active={selected === set.slug} class="button">
      <input
        type="radio"
        bind:group={selected}
        value={set.slug}
        on:click={() => (open = !open)}
      />
      {set.name}
    </label>
  {/each}
</div>

<style>
  div {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    gap: var(--size-2);
    border: var(--light-border);
    border-radius: var(--radius-round);
    padding: var(--size-2) var(--size-3);
  }

  h3 {
    margin: 0;
    font-size: var(--font-size-0);
  }

  [type="radio"] {
    visibility: hidden;
    position: absolute;
  }

  @media (max-width: 860px) {
    div {
      display: grid;
      grid-template: 1fr / auto auto;
      border-color: transparent;
      padding: var(--size-2) var(--size-1);
    }

    label {
      grid-area: 1 / 2;
    }

    .active {
      z-index: 1;
      padding-right: var(--size-2);
    }

    .open label:not(.active) {
      grid-area: auto / 2;
    }

    .active::after {
      content: "\25C0";
      display: inline-block;
      transform: scale(0.6, 0.8);
      margin-left: var(--size-1);
      transition: transform 0.3s;
    }

    .open .active::after {
      transform: scale(0.8, 0.6) rotate(-90deg);
    }
  }
</style>
