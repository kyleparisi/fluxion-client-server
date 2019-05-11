<template>
  <div class="h-100 flex items-center bg-white">
    <div class="w-100 tc">
      <div>Welcome to Fluxion</div>
      <div>
        <div class="pa3 dib">
          <button class="button" @click="newProject">New Project</button>
        </div>
        <div class="pa3 dib">
          <button class="button" @click="openProject">Open Project</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  data() {
    return window.data;
  },
  methods: {
    newProject: function() {
      this.network.push({
        app: {
          style: {
            width: "100%",
            height: "100%",
            transition: "transform 0.2s"
          },
          svgStyle: {
            width: "100%",
            height: "100vh",
            overflow: "visible",
            transition: "transform 0.2s"
          },
          linkStyle: {
            strokeWidth: 1,
            strokeLinejoin: "round",
            strokeLinecap: "round",
            fill: "none"
          },
          linkOverlapStyle: {
            strokeWidth: 50,
            strokeLinejoin: "round",
            strokeLinecap: "round",
            fill: "none",
            stroke: "rgba(230, 230, 230, 0)"
          }
        },
        editor: {
          height: 400
        },
        pan: {
          x: 0,
          y: 0
        },
        scale: 1,
        links: {},
        nodes: {},
        packets: {},
        configuring: {},
        addingLink: {},
        mouseOverPort: "",
        webview: {
          style: {
            width: "320px",
            height: "480px",
            left: "10px",
            top: "10px"
          },
          src: ""
        },
        problem: {},
        selectedLinks: {}
      });
    },
    openProject: function() {}
  }
};
</script>
