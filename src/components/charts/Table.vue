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
                    Flag
                </div>

                <div class="col-10 col-border">
                    Country name
                </div>

                <div class="col-5 col-border">
                    {{ data.compare }}
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
                    {{ getShortenedName(country.label, 24) }}
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
    computed: {
        ...mapState('comparison', [
            'comparisonList'
        ]),
        ...mapState('options', [
            'options'
        ])
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

        .col-1 {
            position: relative;
            flex-basis: 0;
            flex-grow: 1;
            height: 100%;
            line-height: 80px;
            padding: 0 20px 0 20px;
        }

        .col-5 {
            @extend .col-1;
            flex-grow: 5;
        }

        .col-10 {
            @extend .col-1;
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