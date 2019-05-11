<template>
  <div></div>
</template>

<script>
  export default {
    name: "js",
    data() {
      return {
        state: {},
        running: true
      }
    },
    props: {
      node: Object
    },
    destroyed() {
      this.running = false;
    }
  }
</script>
