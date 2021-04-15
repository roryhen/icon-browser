<script>
    export let iconTitle;
    export let iconColor;
    let formattedTitle = iconTitle
        .replace(/\b\w/g, (l) => l.toUpperCase())
        .replaceAll("-", " ");
</script>

<div class="icon-card">
    <img
        id={`id-${iconTitle}`}
        src="https://img.icons8.com/material-outlined/{iconColor}/72/{iconTitle}/"
        alt={formattedTitle}
    />
    <h3>{formattedTitle}</h3>
    <button data-clipboard-target={`#id-${iconTitle}`}>copy</button>
</div>
