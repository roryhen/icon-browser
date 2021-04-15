<!-- src/App.svelte -->
<script>
  import popularIcons from "./data/popular-icons.js";
  import IconCard from "./IconCard.svelte";

  let inputColor;

  function colorChange(event) {
    inputColor = event.target.value.slice(1);
  }

  /*  new ClipboardJS(".icon-list", {
    target: function (trigger) {
      console.log(trigger);
      return trigger.closest(".icon-card");
    },
  }); */
</script>

<header>
  <label for="icon-search">Search coming soon!</label>
  <input type="search" id="icon-search" />
  <input type="color" id="icon-color" on:change={colorChange} />
</header>
<section class="icon-list">
  {#each popularIcons as title}
    <IconCard iconTitle={title} iconColor={inputColor} />
  {/each}
</section>

<style>
  .icon-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
</style>
