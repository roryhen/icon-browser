<!-- src/App.svelte -->
<script>
  import IconCard from "./IconCard.svelte";
  import ClipboardJS from "clipboard";

  let clipboard = new ClipboardJS(".icon-card", {
    text: function (trigger) {
      let button = trigger.closest("button");
      return button.querySelector("img").getAttribute("src");
    },
  });

  clipboard.on("success", function (e) {
    e.trigger.classList.add("tooltip");
    setTimeout(() => {
      e.trigger.classList.remove("tooltip");
    }, 4000);
  });

  async function getIconList() {
    return fetch("https://material-icons.github.io/material-icons/data.json")
      .then((res) => res.json())
      .then((data) => data.icons);
  }
  let iconList = getIconList();
</script>

<header>
  <!-- <label for="icon-search">Search coming soon!</label>
  <input type="search" id="icon-search" /> -->
</header>

{#await iconList then list}
  <section class="icon-list">
    {#each list as { name }}
      <IconCard iconName={name} />
    {/each}
  </section>
{/await}

<style>
  .icon-list {
    display: grid;
    grid-template-columns: repeat(4, min-content);
    gap: 1em;
    justify-content: center;
  }
</style>
