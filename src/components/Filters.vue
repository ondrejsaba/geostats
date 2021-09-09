<template>
    <section id="filters-section" class="center-section mt-20">
        <FilterSelect
            v-for="(filter, id) in filters"
            :key="id"
            :class="{
                primary: id == pickedFilter,
                light: id != pickedFilter
            }"
            @click="setPickedFilter({
                id: id
            })"
        >
            {{ filter.name.en }}
        </FilterSelect>
    </section>
</template>

<script>
import FilterSelect from './FilterSelect.vue'
import FiltersData from '../json/filters.json'
import { mapMutations, mapGetters } from 'vuex'

export default {
    components: {
        FilterSelect
    },
    data() {
        return {
            filters: FiltersData
        }
    },
    methods: {
        ...mapMutations([
            'setPickedFilter'
        ])
    },
    computed: {
        ...mapGetters([
            'pickedFilter'
        ])
    }
}
</script>

<style>
section#filters-section {
    width: fit-content;
}
</style>