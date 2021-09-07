<template>
  <Navbar />

  <router-view />
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  components: {
    Navbar
  }
}
</script>

<style lang="scss">
@import "./sass/_classes.scss";

body {
  margin: 0;
}

#app {
  font-family: Inter, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
