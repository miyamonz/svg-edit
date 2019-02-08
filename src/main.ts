import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import tmpViewbox from "./viewbox";

window.onkeyup = (e: KeyboardEvent) => {
  if (e.key === "Shift") {
    store.dispatch("updateEditState", false);
  }
};
window.onkeydown = (e: KeyboardEvent) => {
  if (e.key === "Shift") {
    store.dispatch("updateEditState", true);
    return;
  }
  if (e.key === "Escape" || e.key === "Enter") {
    store.dispatch("exitDrawPath");
    return;
  }

  if (e.code === "Space" && e.shiftKey) {
    const b = store.state.editState.showCommandPalette;
    store.commit("setShowCommandPalette", !b);
  }
};

window.addEventListener("wheel", e => {
  e.preventDefault();
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

const fixSize = () => {
  const w = window.innerWidth;
  const h = window.innerHeight;

  const sm = document.querySelector(".side-menu");
  if (!sm) return;
  const sw = sm.getBoundingClientRect().width;
  store.commit("setSize", {
    width: w - sw,
    height: h
  });
  tmpViewbox.viewbox = store.state.editState.viewbox;
};
fixSize();

window.onresize = fixSize;
