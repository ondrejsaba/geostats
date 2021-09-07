<template>
  <main class="content">
    <searchbar />
  </main>
</template>

<script>
import Search from '../components/Search.vue'

export default {
  name: 'Home',
  components: {
    'searchbar': Search
  }
}
</script>

<style lang="scss">
@import "../sass/_variables.scss";

main.content {
  display: block;
  width: 70%;
  height: auto;
  margin: 0 auto;
}
</style>