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
        
        <SelectList
            id="filter-select-list"
            v-model="pickedFilter"
            :select-options="filterSelectListOptions"
            :options-mod="countryIdToName"
            :static-width="'170px'"
            :label="'Region:'"
        />
    </section>

    <section id="sort-section" class="center-section mt-20">
        <SelectList
            v-model="sortBy"
            :select-options="sortOptions"
            :static-width="'120px'"
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
import { mapMutations, mapState } from 'vuex'

export default {
    components: {
        FilterSelect,
        SelectList,
        SortDirection
    },
    data() {
        return {
            filters: FiltersData,
            sortOptions: ['Population', 'Area', 'Name'],
            filterSelectListOptions: [...Object.keys(FiltersData)]
        }
    },
    methods: {
        ...mapMutations([
            'setPickedFilter',
            'setFilteredCountriesData',
            'setSortBy'
        ]),
        countryIdToName(id) {
            return FiltersData[id].name.en
        }
    },
    computed: {
        ...mapState([
            'options'
        ]),
        pickedFilter: {
            get() {
                return this.$store.state.pickedFilter
            },
            set(value) {
                this.setPickedFilter({id: value})
            }
        },
        sortBy: {
            get() {
                return this.$store.state.sortBy
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