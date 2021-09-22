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
            :static-width="'190px'"
            :label="'Sort by:'"
        />

        <SortDirection />
    </section>
</template>

<script>
import FilterSelect from './FilterSelect.vue'
import SelectList from './SelectList.vue'
import SortDirection from './SortDirection.vue'
import FiltersData from '../json/filters.json'
import { mapMutations, mapActions, mapState } from 'vuex'

export default {
    components: {
        FilterSelect,
        SelectList,
        SortDirection
    },
    data() {
        return {
            filters: FiltersData,
            sortOptions: ['Population', 'Population density', 'Area', 'Name'],
            filterSelectListOptions: [...Object.keys(FiltersData)]
        }
    },
    methods: {
        ...mapMutations('filters', [
            'setPickedFilter',
            'setSortBy'
        ]),
        ...mapActions('data', [
            'setFilteredCountriesData'
        ]),
        countryIdToName(id) {
            return FiltersData[id].name.en
        }
    },
    computed: {
        ...mapState('options', [
            'options'
        ]),
        pickedFilter: {
            get() {
                return this.$store.state.filters.pickedFilter
            },
            set(value) {
                this.setPickedFilter({id: value})
            }
        },
        sortBy: {
            get() {
                return this.$store.state.filters.sortBy
            },
            set(value) {
                this.setSortBy({sort: value})
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

#filter-select-list {
    display: none;
}
</style>