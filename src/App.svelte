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

  let currentIconSet = 'materialicons';
  let isDarkTheme = false;
  $: currentTheme = isDarkTheme ? 'dark' : 'light';
  $: if (isDarkTheme) {
    document.body.classList.add('dark')
  } else {
    document.body.classList.remove('dark')
  }

  async function getIconProps() {
    const res = await fetch("/icons/data.json");
    const json = await res.json();
    const [dir, stats] = await json;
    let icons = dir.contents.flatMap(cats => {
      return cats.contents.map(icon => {
        return {
          theme: 'light',
          category: cats.name,
          iconName: icon.name,
          iconSet: icon.contents
        }
      });
    })
    return icons
  }

  async function getIconPropsText() {
    const res = await fetch("/icons/data.txt");
    const text = await res.text();
    return text.trim().split('\n').slice(0,80).map(line => {
      let dirs = line.split('/');
      return {
          category: dirs[1],
          iconName: dirs[2],
          iconSet: dirs[3]
        }
    });
  }
  
  let iconProps = getIconPropsText();
</script>

<header>
  <!-- <label for="icon-search">Search coming soon!</label>
  <input type="search" id="icon-search" /> -->
  <label for="theme-switch">Light/Dark</label>
  <input type="checkbox" id="theme-switch" bind:checked={isDarkTheme}>
</header>

{#await iconProps then props}
  <section class="icon-list">
    {#each props as {category, iconName, iconSet}}
      <IconCard 
      theme={currentTheme} 
      category={category} 
      iconName={iconName} 
      iconSet={iconSet} 
      currentSet={currentIconSet} 
      />
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
  :global(body) {
    background-color: rgb(238 238 238);
		color: rgb(0 0 0 / 0.5);
  }
  :global(body.dark) {
		background-color: rgb(51 51 51);
		color: rgb(255 255 255 / 0.9);
	}
</style>
