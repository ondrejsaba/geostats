<template>
  <main class="content">
    <Search />
    <Filters
      v-if="!searchMode"
    />
    <CountriesList />
  </main>
</template>

<script>
import Search from '../components/Search.vue'
import Filters from '../components/Filters.vue'
import CountriesList from '../components/CountriesList.vue'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    Search,
    Filters,
    CountriesList
  },
  computed: {
    ...mapState([
      'searchMode'
    ])
  }
}
</script>