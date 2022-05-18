<template>
  <app-header />
  <router-view />
  <app-footer />
</template>

<style lang="scss">
@import "@/styles/styles";
</style>
<script>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>