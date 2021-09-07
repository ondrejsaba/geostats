<template>
    <section id="filters-section" class="mt-20">
        <FilterSelect
            v-for="filter in filters"
            :key="filter.id"
            :class="{
                primary: filter.id == pickedFilter
            }"
            @click="setPickedFilter({
                id: filter.id
            })"
        >
            {{ filter.display }}
        </FilterSelect>
    </section>
</template>

<script>
import FilterSelect from './FilterSelect.vue'
import { mapMutations, mapGetters } from 'vuex'

export default {
    components: {
        FilterSelect
    },
    data() {
        return {
            filters: [
                {id: 'world', display: 'World'},
                {id: 'asia', display: 'Asia'},
                {id: 'africa', display: 'Africa'},
                {id: 'europe', display: 'Europe'},
                {id: 'north_america', display: 'North America'},
                {id: 'south_america', display: 'South America'},
                {id: 'australia', display: 'Australia'}
            ]
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

<style lang="scss">
@import "../sass/_variables.scss";

#filters-section {
    position: relative;
    display: block;
    width: calc(100% - 80px);
    margin: 0 auto;
}
</style>