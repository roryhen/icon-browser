<!-- src/SlideToggle.svelte -->
<script>
export let toggleOn;
export let off = 'Light';
export let on = 'Dark';
</script>

<button class="slide-toggle" class:on="{toggleOn}" on:click>
	<span id="toggle-1">{off}</span>
	<span id="toggle-2">{on}</span>
</button>

<style>
button {
	font-family: inherit;
}

.slide-toggle {
	position: relative;
	display: flex;
	justify-content: space-evenly;
	padding: 0.6em 0.3em;
	width: 14em;
	background: #bbb;
	border: 0;
	border-radius: 2em;
	outline: 0;
	font-size: 0.9rem;
	line-height: 1;
}

.slide-toggle span {
	position: relative;
	flex: 50%;
	padding: 0 1.6em;
	transition: color 200ms;
}

.slide-toggle span:first-child {
	color: #222;
}

.slide-toggle::before {
	position: absolute;
	content: "";
	top: 0.3em;
	left: 0.3em;
	width: 50%;
	height: 1.6em;
	background: #fff;
	border-radius: 2em;
	transition: transform 200ms ease-in-out;
}

.slide-toggle.on::before {
	transform: translatex(calc(100% - 0.6em));
}

.slide-toggle.on span:nth-child(2) {
	color: #222;
}

.slide-toggle.on span:first-child {
	color: #888;
}

:global(body.dark) .slide-toggle {
	background: #666;
}

:global(body.dark) .slide-toggle::before {
	background: #222;
}

:global(body.dark) .slide-toggle.on span:nth-child(2) {
	color: #fff;
}

:global(body.dark) .slide-toggle.on span:first-child {
	color: #bbb;
}
</style>