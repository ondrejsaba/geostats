<template>
    <main class="content">
        <div class="center mt-20 mb-20">
            <SelectList
                v-model="compare.selected"
                class="mr-20"
                :select-options="compare.list"
                :label="'Compare:'"
                :static-width="'190px'"
            />

            <SelectList
                v-model="chartType.selected"
                :select-options="chartType.list"
                :label="'Chart type:'"
                :static-width="'80px'"
            />
        </div>

        <component
            :is="chartType.selected"
            :class="{
                dark: options.darkMode
            }"
            :data="chartData"
        />
    </main>
</template>

<script>
import SelectList from '@/components/SelectList.vue'
import Bar from '@/components/charts/Bar.vue'
import Pie from '@/components/charts/Pie.vue'
import { mapState } from 'vuex'

export default {
    components: {
        SelectList,
        Bar,
        Pie
    },
    data() {
        return {
            compare: {
                list: ['Population', 'Population density', 'Area'],
                selected: 'Population'
            },
            chartType: {
                list: ['Bar', 'Pie'],
                selected: 'Bar'
            },
            chartData: {}
        }
    },
    methods: {
        updateChartData() {
            this.chartData = {
                countries: this.comparisonList,
                compare: this.compare.selected
            }
        }
    },
    computed: {
        ...mapState([
            'comparisonList',
            'sortBy',
            'options'
        ])
    },
    watch: {
        comparisonList: function() {
            this.updateChartData()
        },
        compare: {
            handler: function() {
                this.updateChartData()
            },
            deep: true,
            immediate: true
        }
    },
    mounted() {
        /* set the compare variable to be the same
        as the sortBy variable in case it is set
        and the countries are comparable by that metric */
        if (this.sortBy != 'Name') {
            this.compare.selected = this.sortBy
        }

        /* go back if the view is accessed by the link,
        but the user doesn't have any countries
        in their comparison list */
        if (this.comparisonList.length == 0) {
            this.$router.push({name: 'Home'})
        }
    }
}
</script>

<style lang="scss">
@import "../sass/_variables.scss";

.chart {
    position: relative;
    width: 100%;
    height: calc(100vh - 200px);
    border: 1px solid light(200);
    border-radius: 6px;
    box-sizing: border-box;
    color: dark(100);

    &.dark {
        border: 1px solid dark(300);
        color: light(100);
        background-color: dark(100);
    }
}
</style>