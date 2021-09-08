<template>
    <section id="countries-list-section" class="center-section mt-50">
        <CountryCard
            v-for="country in countriesData"
            :key="country"
        >
            {{ country.name }}
        </CountryCard>
    </section>
</template>

<script>
import CountryCard from './CountryCard.vue'
import { mapGetters } from 'vuex'

export default {
    components: {
        CountryCard
    },
    computed: {
        ...mapGetters([
            'countriesData'
        ])
    },
    mounted() {
        this.$store.dispatch('getCountriesData')
    }
}
</script>

<style lang="scss">
#countries-list-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
}
</style>