<template>
    <main class="content">
        <div id="chart-form" class="mb-20">
            <SelectList
                v-model="compare.selected"
                :select-options="compare.list"
                :label="'Compare:'"
                :static-width="'190px'"
            />

            <SelectList
                v-model="chartType.selected"
                class="pl-20"
                :select-options="chartType.list"
                :label="'Chart type:'"
                :static-width="'80px'"
            />

            <Button
                id="chart-edit-btn"
                class="primary s-size s-text right"
                :ignoreColorMode="true"
                @click="showEditDialog"
            >
                <template v-slot:text>
                    <span id="chart-edit-btn-text">
                        Edit chart
                    </span>

                    <span class="material-icons">
                        edit
                    </span>
                </template>
            </Button>
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
import Button from '@/components/Button.vue'
import Bar from '@/components/charts/Bar.vue'
import Pie from '@/components/charts/Pie.vue'
import Table from '@/components/charts/Table.vue'
import { mapState, mapMutations } from 'vuex'

export default {
    components: {
        SelectList,
        Button,
        Bar,
        Pie,
        Table
    },
    data() {
        return {
            compare: {
                list: ['Population', 'Population density', 'Area'],
                selected: 'Population'
            },
            chartType: {
                list: ['Bar', 'Pie', 'Table'],
                selected: 'Bar'
            },
            chartData: {}
        }
    },
    methods: {
        ...mapMutations('dialog', [
            'setDialog'
        ]),
        updateChartData() {
            this.chartData = {
                countries: this.comparisonList,
                compare: this.compare.selected
            }
        },
        showEditDialog() {
            this.setDialog({
                show: true,
                component: 'EditChart',
                title: 'Edit chart',
                size: {
                    width: '400px',
                    height: 'auto'
                }
            })
        }
    },
    computed: {
        ...mapState('filters', [
            'sortBy'
        ]),
        ...mapState('comparison', [
            'comparisonList'
        ]),
        ...mapState('options', [
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

#chart-form {
    position: relative;
    margin-top: 40px;
}

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