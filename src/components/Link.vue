<template>
  <g>
    <path
            :d="d"
            :style="app.linkStyle"
            :class="{'stroke-red': selectedLinks[link.id],
              'stroke-blue': !selectedLinks[link.id] && !link.logging,
              'stroke-orange': !selectedLinks[link.id] && link.logging}"
            markerStart="url(#circle)"
            markerEnd="url(#circle)"
            class="pointer"
            id="thePath"
    ></path>
    <path
            :d="d"
            :style="app.linkOverlapStyle"
            class="pointer"
            id="overlapPath"
            @click="selectLink"
    ></path>
  </g>
</template>

<script>

  // import Sleep from "../Sleep";
  const Channel = require("../Channel");

  // const link = {
  //   "direction": "->",
  //   "source": {
  //     "node": "7a5d6030-09f8-11e9-a652-69f737f545b0",
  //     "port": "request"
  //   },
  //   "target": {
  //     "node": "fdff09c0-09f8-11e9-96c1-0118b407cc1e",
  //     "port": "request"
  //   },
  //   "id": "8446b3c0-09fe-11e9-a9c0-c3d13ea80578",
  //   "layer_id": 0
  // }
  export default {
    name: "Link",
    data() {
      return window.data.network[window.data.currentLayer];
    },
    props: {
      link: Object,
      sourceX: Number,
      sourceY: Number,
      targetX: Number,
      targetY: Number
    },
    methods: {
      verticalPosition(index) {
        const buffer = 8;
        return 10 * index + buffer;
      },
      selectLink() {
        if (this.selectedLinks[this.link.id]) {
          this.$delete(this.selectedLinks, this.link.id);
          return false;
        }
        this.$set(this.selectedLinks, this.link.id, this.link)
      }
    },
    computed: {
      d: function () {
        // get port index
        const { source, target } = this.link;
        let source_port_id = Object.keys(this.nodes[source.node].outputs).indexOf(
          source.port
        );
        let target_port_id = Object.keys(this.nodes[target.node].inputs).indexOf(
          target.port
        );

        const n = 50;
        const start = {
          x: this.sourceX,
          y: this.sourceY + this.verticalPosition(source_port_id)
        };
        const handle = {
          start: {
            x: this.sourceX + n,
            y: this.sourceY + this.verticalPosition(source_port_id)
          },
          end: {
            x: this.targetX - n,
            y: this.targetY + this.verticalPosition(target_port_id)
          }
        };
        const end = {
          x: this.targetX,
          y: this.targetY + this.verticalPosition(target_port_id)
        };

        // line is too short, just do a straight line
        if (handle.start.x > handle.end.x) {
          return `M ${start.x},${start.y} L ${end.x},${end.y}`
        }

        return `M${start.x},${start.y} C${handle.start.x},${handle.start.y} ${handle
          .end.x},${handle.end.y} ${end.x},${end.y}`;
      }
    },
    mounted() {
      socket.on("packet:" + this.link.id, data => {
        if (this.link.logging) {
          console.log(data);
        }
        this.$set(this.packets, this.link.id, {
          direction: "right",
          link_id: this.link.id,
          d: this.d
        });
      });
    }
  }
</script>

<style scoped>

</style>