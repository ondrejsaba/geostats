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
            {{ filter }}
        </FilterSelect>
        
        <SelectList
            id="filter-select-list"
            v-model="pickedFilter"
            :select-options="filterSelectListOptions"
            :options-mod="countryIdToName"
            :static-width="'170px'"
            :label="messages.filtersLabels.region"
        />
    </section>

    <section id="sort-section" class="center-section mt-20">
        <SelectList
            v-model="sortBy"
            :select-options="sortOptions"
            :static-width="'190px'"
            :label="messages.filtersLabels.sortBy"
        />

        <SortDirection />
    </section>
</template>

<script>
import FilterSelect from './FilterSelect.vue'
import SelectList from './SelectList.vue'
import SortDirection from './SortDirection.vue'
import { mapMutations, mapActions, mapState } from 'vuex'

export default {
    components: {
        FilterSelect,
        SelectList,
        SortDirection
    },
    data() {
        return {
            filters: {},
            sortOptions: ['Population', 'Population density', 'Area', 'Name'],
            filterSelectListOptions: []
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
            return this.filters[id]
        },
        updateFilters() {
            this.filters = this.messages.filters,
            this.filterSelectListOptions = [...Object.keys(this.filters)]
        }
    },
    computed: {
        ...mapState('options', [
            'options'
        ]),
        ...mapState('messages', [
            'messages'
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
    },
    watch: {
        messages: {
            handler: function() {
                this.updateFilters()
            },
            deep: true
        }
    },
    mounted() {
        this.updateFilters()
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