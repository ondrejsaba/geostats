<template>
    <section
        v-if="filteredCountriesData.length > 0"
        id="countries-list-section"
        class="center-section mt-20"
        :class="{ dark: options.darkMode }"
    >
        <CountryCard
            v-for="country in filteredCountriesData"
            :key="country.name"
            :countryInfo="country"
        />
    </section>
    
    <section
        v-else-if="searchMode"
        class="no-cards"
    >
        <h2>No countries found.</h2>
    </section>

    <section
        v-else
        class="no-cards"
    >
        <h2>Loading, please wait...</h2>
    </section>
</template>

<script>
import CountryCard from './CountryCard.vue'
import { mapMutations, mapState } from 'vuex'

export default {
    components: {
        CountryCard
    },
    methods: {
        ...mapMutations([
            'setFilteredCountriesData'
        ])
    },
    computed: {
        ...mapState([
            'filteredCountriesData',
            'pickedFilter',
            'searchMode',
            'searchQuery',
            'options'
        ])
    },
    mounted() {
        this.$store.dispatch('getCountriesData')
    },
    watch: {
        pickedFilter: function() {
            this.setFilteredCountriesData()
        },
        searchQuery: function() {
            this.setFilteredCountriesData()
        }
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

    &.dark {
        border-top: 1px solid dark(300);
    }
}

section.no-cards {
    text-align: center;
    padding-top: 40px;
    color: light(500);

    h2 {
        font-size: 24px;
    }
}

@import "../sass/_mediaqueries.scss";
</style>