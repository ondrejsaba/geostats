<template>
    <section id="countries-list-section" class="center-section mt-20">
        <CountryCard
            v-for="country in countriesData"
            :key="country.name"
            :countryInfo="country"
        />
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
@import "../sass/_variables.scss";

#countries-list-section {
    display: flex;
    flex-wrap: wrap;
    border-top: 1px solid light(200);
    padding-top: 20px;
}
</style>