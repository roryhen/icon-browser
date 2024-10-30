import { mount } from "svelte";
import App from "./App.svelte";
import "open-props/style";

let app = mount(App, {
  target: document.getElementById("app-root"),
});

export default app;
