<script>
    export let theme;
    export let category;
    export let iconName;
    export let iconSet;
    export let currentSet;

    let baseUrl = document.location.origin

    let tooltip;
    let formattedName = iconName.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
</script>

{#if iconSet === currentSet}
<button class="icon-card" class:tooltip>
    <img
        src="{baseUrl}/icons/{theme}/{category}/{iconName}/{iconSet}/24px.svg"
        alt="{formattedName} icon"
        width="48"
        height="48"
    />
    <h3>{formattedName}</h3>
</button>
{/if}

<style>
    button {
        position: relative;
        padding: 2em 1em;
        width: 9em;
        border: 1px solid rgb(0 0 0 / 0.3);
        border-radius: 2em;
        background: none;
        outline: none;
        font-family: "IBM Plex Mono", Helvetica, Arial, sans-serif;
    }

    button:focus {
        border-color: rgb(0 0 250 / 0.3);
    }

    button:hover {
        background: rgb(0 0 0 / 0.03);
    }

    button:active {
        background: rgb(0 0 0 / 0.06);
    }

    h3 {
        margin: 1em 0 0.2em;
        font-size: 1em;
    }

    :global(body.dark) h3 {
        color: rgb(255 255 255 / 0.9);
    }

    .tooltip::before {
        content: "Copied!";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #d7e6fc;
        padding: 0.5em 1.3em;
        border-radius: 2em;
        font-size: 1em;
        color: #0075fe;
        pointer-events: none;
        animation: 0.5s ease-out 1.5s 1 forwards fadeOut;
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
</style>
