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
            return value / this.valuesCombined
        },
        percentageToDegrees(value) {
            return (value * 360).toFixed(2)
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
            const gradientStops = ''

            return gradientStops
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
    width: calc(100% - 300px);
    height: 100%;
    box-sizing: border-box;
}

#pie-chart-info {
    display: inline-block;
    vertical-align: top;
    width: 300px;
    height: 100%;
    box-sizing: border-box;
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
            border: 1px solid lighten(dark(100), 10%);
        }
    }
}
</style>