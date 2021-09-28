<template>
    <main class="content">
        <div id="chart-form" class="mb-20">
            <SelectList
                v-model="compare.selected"
                :select-options="compare.list"
                :label="messages.compare.compare.label"
                :static-width="'190px'"
            />

            <SelectList
                v-model="chartType.selected"
                class="pl-20"
                :select-options="chartType.list"
                :label="messages.compare.chartType.label"
                :static-width="'100px'"
            />

            <Button
                id="chart-edit-btn"
                class="primary s-size s-text right"
                :ignoreColorMode="true"
                @click="showEditDialog"
            >
                <template v-slot:text>
                    <span id="chart-edit-btn-text">
                        {{ messages.compare.editChart }}
                    </span>

                    <span class="material-icons">
                        edit
                    </span>
                </template>
            </Button>
        </div>

        <component
            :is="getChartComponent"
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
        ...mapMutations('comparison', [
            'setComparisonList'
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
                title: this.messages.editChartDialog.title,
                size: {
                    width: '400px',
                    height: 'auto'
                }
            })
        },
        updateSelectLists() {
            this.compare.list = this.messages.compare.compare.options
            this.chartType.list = this.messages.compare.chartType.options

            const listNames = ['compare', 'chartType']

            listNames.forEach(list => {
                const sortByLanguage = Object.keys(this.allMessages).filter(lang => {
                    return this.allMessages[lang].compare[list].options.includes(this[list].selected)
                }).join()

                const optionIndex = this.allMessages[sortByLanguage].compare[list].options.indexOf(this[list].selected)

                this[list].selected = this.messages.compare[list].options[optionIndex]
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
        ]),
        ...mapState('messages', [
            'messages',
            'allMessages'
        ]),
        getChartComponent() {
            const optionIndex = this.chartType.list.indexOf(this.chartType.selected)
            return this.allMessages.en.compare.chartType.options[optionIndex]
        }
    },
    watch: {
        comparisonList: function() {
            this.updateChartData()
        },
        compare: {
            handler: function() {
                this.updateChartData()

                if (this.chartType.selected == 'Table') {
                    // sort the comparison list
                }
            },
            deep: true,
            immediate: true
        },
        messages: {
            handler: function() {
                setTimeout(this.updateSelectLists, 0)
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
    overflow: hidden;

    &.dark {
        border: 1px solid dark(300);
        color: light(100);
        background-color: dark(100);
    }
}
</style>