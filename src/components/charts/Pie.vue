<template>
    <div
        class="chart"
        :class="{
            dark: options.darkMode
        }"
    >
        <div id="pie-chart-box" ref="pieChartBox">
            <div
                id="pie-chart"
                :style="{
                    width: size,
                    height: size,
                    background: conicGradient
                }"
            ></div>
        </div>

        <div id="pie-chart-info">
            <div id="pie-countries-info-container">
                <div
                    class="pie-country-info clickable"
                    v-for="country in graphData"
                    :key="country.label"
                    :style="{
                        backgroundColor: chartColors[country.label]
                    }"
                    @click="statsLink(country.label)"
                >
                    <h2 class="country-label">
                        <img class="label-flag" :src="getCountryFlag(country.label)">

                        {{ country.label }}
                    </h2>

                    <p class="country-value">
                        {{ convertLongNumber(country.value) }}

                        <span class="country-value-percentage">
                            ({{ portionPercentage(country.value).toFixed(2) }}%)
                        </span>
                    </p>
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
        data: Object,
        type: String
    },
    data() {
        return {
            size: '0px'
        }
    },
    methods: {
        setPieChartDimensions() {
            const parentSize = {
                width: this.$refs.pieChartBox.offsetWidth - 100,
                height: this.$refs.pieChartBox.offsetHeight - 100
            }

            if (parentSize.width > parentSize.height) {
                this.size = parentSize.height
            } else {
                this.size = parentSize.width
            }

            this.size += 'px'
        },
        portionPercentage(value) {
            return (value / this.valuesCombined) * 100
        },
        sortGraphData() {
            this.graphData.sort((a, b) => {
                return a.value < b.value ? 1 : -1
            })
        }
    },
    computed: {
        ...mapState('comparison', [
            'comparisonList',
            'chartColors'
        ]),
        ...mapState('options', [
            'options'
        ]),
        valuesCombined() {
            return this.graphData.reduce((total, current) => {
                return total + current.value
            }, 0)
        },
        conicGradient() {
            const gradientStops = this.graphData.map(({ value }) => {
                return this.portionPercentage(value)
            }).map((value, index) => {
                let offset = this.graphData.reduce((total, { value: currentValue }, currentIndex) => {
                    return currentIndex < index ? total + currentValue : total
                }, 0)
                offset = this.portionPercentage(offset)

                return offset + value
            })

            let gradientStyle = 'conic-gradient('

            gradientStops.forEach((stop, index) => {
                gradientStyle += this.chartColors[this.graphData[index].label] + ' 0 ' + stop + '%'
                gradientStyle += index < gradientStops.length - 1 ? ',' : ')'
            })

            return gradientStyle
        }
    },
    watch: {
        graphData: {
            handler: function() {
                this.sortGraphData()
            },
            deep: true
        }
    },
    mounted() {
        this.setPieChartDimensions()
        window.addEventListener('resize', this.setPieChartDimensions)
    },
    unmounted() {
        window.removeEventListener('resize', this.setPieChartDimensions)
    }
}
</script>

<style lang="scss">
@import "../../sass/_variables.scss";

#pie-chart-box {
    position: relative;
    display: inline-block;
    width: calc(100% - 400px);
    height: 100%;
    box-sizing: border-box;
}

#pie-chart-info {
    position: relative;
    display: inline-block;
    vertical-align: top;
    width: 400px;
    height: 100%;
    box-sizing: border-box;
}

#pie-countries-info-container {
    position: absolute;
    width: calc(100% - 80px);
    height: fit-content;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    .pie-country-info {
        position: relative;
        flex-basis: 100%;
        width: 100%;
        height: 70px;
        color: light(100);

        .country-label {
            margin: 0;
            width: 300px;
            font-size: 18px;
            line-height: 20px;
            font-weight: 500;
            padding: 10px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

        .label-flag {
            display: inline;
            height: 14px;
            border: 1px solid light(100);
        }

        .country-value {
            margin: 0;
            line-height: 20px;
            padding: 0 10px 0 10px;

            .country-value-percentage {
                font-size: 12px;
            }
        }
    }
}

#pie-chart {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    border: 1px solid darken(light(200), 5%);
    border-radius: 50%;
}

.chart {
    &.dark {
        #pie-chart {
            border: 1px solid dark(300);
            box-shadow: 2px 2px 32px dark(200);
        }
    }
}
</style>