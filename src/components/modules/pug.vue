<template>
  <div></div>
</template>

<script>
  export default {
    name: "pug",
    data() {
      return window.data.network[window.data.currentLayer]
    },
    props: {
      node: Object
    }
  }
</script>
