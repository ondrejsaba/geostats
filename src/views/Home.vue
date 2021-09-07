<template>
  <main class="content">
    <Search />
    <Filters />
    <CountriesList />
  </main>
</template>

<script>
import Search from '../components/Search.vue'
import Filters from '../components/Filters.vue'
import CountriesList from '../components/CountriesList.vue'

export default {
  name: 'Home',
  components: {
    Search,
    Filters,
    CountriesList
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
  padding-top: 60px;
}
</style>