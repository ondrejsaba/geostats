<template>
    <div class="chart">
        <div id="x-axis">
            <div
                class="line"
                v-for="(value, index) in xAxisValues"
                :key="index"
                :style="{
                    bottom: `${index*20}%`
                }"
                :class="{
                    dark: options.darkMode
                }"
            >
                <div class="desc">
                    {{ value }}
                </div>
            </div>
        </div>

        <div id="y-axis">
            <div
                class="bar"
                v-for="bar in graphData"
                :key="bar.label"
                :style="{
                    height: `${100 / (graphMax / bar.value)}%`,
                    backgroundColor: chartColors[bar.label]
                }"
                :class="{
                    dark: options.darkMode
                }"
                @click="statsLink(bar.label)"
            >
                <div class="desc">
                    <img
                        :src="getCountryFlag(bar.label)"
                        class="label-flag"
                    >

                    <span class="label">
                        {{ getShortenedName(bar.label) }}
                    </span>
                </div>

                <div class="stat-inside">
                    {{ convertLongNumber(bar.value) }}
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
    data() {
        return {
            lines: 6
        }
    },
    computed: {
        ...mapState('options', [
            'options'
        ]),
        xAxisValues() {
            let values = [...Array(this.lines - 1).keys()].map(value => value + 1).map(value => {
                return this.graphMax * (value / (this.lines - 1))
            }).map(value => Math.ceil(value)).map(value => this.convertLongNumber(value))

            values.unshift('0')

            return values
        }
    }
}
</script>

<style lang="scss">
@import "../../sass/_variables.scss";

#x-axis {
    position: relative;
    width: calc(100% - 200px);
    height: calc(100% - 160px);
    padding-left: 100px;
    margin: calc(100px - 20px) auto;

    .line {
        position: absolute;
        width: calc(100% - 100px);
        height: 1px;
        background-color: darken(light(200), 5%);

        &.dark {
            background-color: lighten(dark(100), 10%);
        }

        .desc {
            position: absolute;
            width: 100px;
            height: 20px;
            line-height: 20px;
            left: -100px;
            top: -10px;
            font-size: 16px;
            font-weight: 600;
        }
    }
}

#y-axis {
    position: absolute;
    display: flex;
    align-items: flex-end;
    gap: 50px;
    width: calc(100% - 200px);
    height: calc(100% - 160px);
    left: 150px;
    top: calc(100px - 20px);

    .bar {
        position: relative;
        flex-grow: 1;
        box-sizing: border-box;
        text-align: center;
        cursor: pointer;

        transition: height 0.2s ease;

        .desc {
            position: absolute;
            width: 100%;
            height: 20px;
            bottom: -30px;

            .label-flag {
                height: 14px;
            }

            .label {
                padding-left: 10px;
            }
        }

        .stat-inside {
            position: absolute;
            width: fit-content;
            left: 50%;
            top: -30px;
            transform: translateX(-50%);
            font-size: 18px;
            font-weight: 300;
            color: dark(100);
        }

        &:active {
            cursor: default;
        }

        &.dark {
            .stat-inside {
                color: light(100);
            }
        }
    }
}
</style>