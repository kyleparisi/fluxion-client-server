import Vue from "vue";
import _ from "lodash";
Object.defineProperty(Vue.prototype, "_", { value: _ });
import App from "./App.vue";

const jsConf = require("./components/modules/js.conf.json");
const pugConf = require("./components/modules/pug.conf.json");
const nodeTypes = {
  js: jsConf,
  pug: pugConf
};

Vue.config.productionTip = false;

window.data = {
  currentLayer: 0,
  mouse: {
    x: 0,
    y: 0
  },
  network: [],
  search: {
    show: false,
    nodes: {
      js: "A generic node that you can program",
      pug: "Render a pug template"
    }
  }
};
window.engine = {
  inputs: {},
  outputs: {}
};

function addNode(type = "js") {
  const nodeType = _.get(nodeTypes, type, {
    "module": type,
    "name": type,
    "inputs": {},
    "outputs": {}
  });
  const conf = JSON.parse(JSON.stringify(nodeType));
  const nodes = Object.keys(data.network[data.currentLayer].nodes);
  const id = (Number(nodes[nodes.length - 1]) || 0) + 1;
  const newNode = {
    ...conf,
    id,
    layer_id: data.currentLayer,
    position: {
      top: -window.data.network[data.currentLayer].pan.y + 10,
      left: -window.data.network[data.currentLayer].pan.x + 10,
      right: _.get(conf, "position.right", false) || 130
    }
  };
  Vue.set(window.data.network[data.currentLayer].nodes, id, newNode);
  window.data.search.show = !window.data.search.show;
}
window.addNode = addNode;

function removeLink() {
  _.each(window.data.network[window.data.currentLayer].selectedLinks, link => {
    Vue.delete(window.data.network[window.data.currentLayer].links, link.id);
    Vue.delete(window.data.network[window.data.currentLayer].selectedLinks, link.id);
  });
}
window.removeLink = removeLink;
function handleEsc() {
  Vue.set(data.network[data.currentLayer], "selectedLinks", {});
  Vue.set(data.network[data.currentLayer], "addingLink", {});
  data.search.show = false;
}

new Vue({
  render: h => h(App)
}).$mount("#app");

Mousetrap.bind(["ctrl+n", "command+n"], () => window.data.search.show = !window.data.search.show);
Mousetrap.bind(["backspace"], removeLink);
Mousetrap.bind(["esc"], handleEsc);

document.addEventListener('mousemove', function (event) {
  const pan = _.get(data, ["network", data.currentLayer, "pan"], {x: 0, y: 0});
  data.mouse.x = event.clientX - pan.x;
  data.mouse.y = event.clientY - pan.y;
});
