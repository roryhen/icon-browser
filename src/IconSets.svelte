<script>
  export let currentIconSet;

  export let iconSets = [
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
</script>

<section class="icon-sets">
  {#each iconSets as set}
    <label>
      <input type="radio" bind:group={currentIconSet} value={set.slug} />
      {set.name}
    </label>
  {/each}
</section>
