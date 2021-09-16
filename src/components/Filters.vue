<template>
    <section id="filters-section" class="center-section mt-20">
        <FilterSelect
            v-for="(filter, id) in filters"
            :key="id"
            :class="{
                primary: id == pickedFilter,
                light: id != pickedFilter && !options.darkMode,
                dark: id != pickedFilter && options.darkMode
            }"
            @click="setPickedFilter({
                id: id
            })"
        >
            {{ filter.name.en }}
        </FilterSelect>
    </section>

    <section id="sort-section" class="center-section mt-20">
        <SelectList
            v-model="sortBy"
            :select-options="sortOptions"
            :static-width="'120px'"
            :label="'Sort by:'"
        />
    </section>
</template>

<script>
import FilterSelect from './FilterSelect.vue'
import SelectList from './SelectList.vue'
import FiltersData from '../json/filters.json'
import { mapMutations, mapGetters } from 'vuex'

export default {
    components: {
        FilterSelect,
        SelectList
    },
    data() {
        return {
            filters: FiltersData,
            sortOptions: ['Name', 'Population', 'Area']
        }
    },
    methods: {
        ...mapMutations([
            'setPickedFilter',
            'setFilteredCountriesData'
        ])
    },
    computed: {
        ...mapGetters([
            'pickedFilter',
            'options'
        ]),
        sortBy: {
            get() {
                return this.$store.state.sortBy
            },
            set(value) {
                this.$store.commit('setSortBy', {sort: value})
                this.setFilteredCountriesData()
            }
        }
    }
}
</script>

<style lang="scss">
@import "../sass/_variables.scss";

section#filters-section, section#sort-section {
    width: fit-content;
}
</style>