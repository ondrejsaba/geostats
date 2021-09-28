<template>
    <div class="chart">
        <div
            id="table-chart"
            :class="{
                dark: options.darkMode
            }"
        >
            <div class="row heading">
                <div class="col-1 col-border">
                    {{ messages.compare.table.flag }}
                </div>

                <div class="col-10 col-border">
                    {{ messages.compare.table.countryName }}
                </div>

                <div
                    class="col-5 col-border clickable"
                    @click="changeSortingDirection"
                >
                    {{ data.compare }}

                    <span class="material-icons sort-arrow">
                        <span v-if="sortingDirection == 'descending'">
                            arrow_downward
                        </span>

                        <span v-else>
                            arrow_upward
                        </span>
                    </span>
                </div>
            </div>

            <div
                class="row"
                v-for="country in graphData"
                :key="country.label"
            >
                <div class="col-1 col-border">
                    <img
                        :src="getCountryFlag(country.label)"
                        class="center-flag"
                    >
                </div>

                <div class="col-10 col-border">
                    {{ country.label }}
                </div>

                <div class="col-5 col-border">
                    {{ convertLongNumber(country.value) }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import chart from '@/mixins/chart.js'
import { mapState } from 'vuex'

export default {
    mixins: [
        chart
    ],
    props: {
        data: Object
    },
    data() {
        return {
            sortingDirection: 'descending'
        }
    },
    methods: {
        changeSortingDirection() {
            const switchDirection = {
                'descending': 'ascending',
                'ascending': 'descending'
            }

            this.sortingDirection = switchDirection[this.sortingDirection]
            this.sortGraphData()
        },
        sortGraphData() {
            this.graphData.sort((a, b) => {
                const sortingComparators = {
                    'descending': a.value < b.value ? 1 : -1,
                    'ascending': b.value < a.value ? 1 : -1
                }
                    
                return sortingComparators[this.sortingDirection]
            })
        }
    },
    computed: {
        ...mapState('comparison', [
            'comparisonList'
        ]),
        ...mapState('options', [
            'options'
        ]),
        ...mapState('messages', [
            'messages'
        ])
    },
    watch: {
        data: {
            handler: function() {
                this.sortGraphData()
            },
            deep: true
        }
    },
    mounted() {
        this.sortGraphData()
    }
}
</script>

<style lang="scss">
@import "../../sass/variables";

#table-chart {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% - 200px);
    height: auto;
    border: 1px solid light(200);

    .row {
        display: flex;
        width: 100%;
        height: 80px;
        box-sizing: border-box;
        font-size: 20px;
        
        &:not(:last-of-type) {
            border-bottom: 1px solid light(200);
        }

        .col {
            position: relative;
            flex-basis: 0;
            height: 100%;
            line-height: 80px;
            padding: 0 20px 0 20px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

        .col-1 {
            @extend .col;
            flex-grow: 1;
        }

        .col-5 {
            @extend .col;
            flex-grow: 5;
        }

        .col-10 {
            @extend .col;
            flex-grow: 10;
        }

        .col-border {
            &:not(:first-of-type) {
                border-left: 1px solid light(200);
            }
        }

        .center-flag {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 60%;
        }
    }

    .heading {
        background-color: lighten(light(200), 4%);

        .col-1, .col-5, .col-10 {
            font-weight: 600;

            span.material-icons.sort-arrow {
                float: right;
                line-height: 80px;
            }
        }
    }

    &.dark {
        border: 1px solid dark(300);

        .row {
            background-color: lighten(dark(200), 3%);

            &:not(:last-of-type) {
                border-bottom: 1px solid dark(300);
            }

            .col-border {
                &:not(:first-of-type) {
                    border-left: 1px solid dark(300);
                }
            }
        }

        .heading {
            background-color: dark(200);
        }
    }
}
</style>