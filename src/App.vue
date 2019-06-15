<template>
  <div id="root" class="h-100 sans-serif bg-black-passive">
    <Welcome v-if="!network.length"></Welcome>
    <Layout v-else></Layout>
  </div>
</template>

<script>
import Welcome from "@/components/Welcome";
import Layout from '@/components/Layout';

export default {
  name: "app",
  components: {
    Layout,
    Welcome
  },
  data() {
    return window.data;
  }
};
</script>

<style></style>
