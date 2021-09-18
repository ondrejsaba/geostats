<template>
    <div class="chart">
        <div id="x-axis">
            <div
                class="line"
                v-for="(value, index) in xAxisValues"
                :style="{
                    bottom: `${index*20}%`
                }"
                :key="index"
            >
                <div class="desc">
                    {{ value }}
                </div>
            </div>
        </div>

        <div id="y-axis">
            <div
                class="bar"
                v-for="(bar, index) in graphData"
                :key="bar.label"
                :style="{
                    height: `${100 / (graphMax / bar.value)}%`,
                    backgroundColor: barColors[index]
                }"
            >
                <div class="desc">
                    {{ bar.label }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    props: {
        data: Object,
        type: String
    },
    data() {
        return {
            graphData: [],
            lines: 6,
            barColors: ['#006699', '#6E4673', '#649E0B', '#F6921E', '#D14343', '#00AFAF']
        }
    },
    methods: {
        getCountryData(name) {
            const data = this.countriesData.filter(country => country.name == name)[0]
            const {population, area} = data

            return {
                'Population': population,
                'Area': area,
                'Population density': population / area
            }
        },
        setGraphData() {
            this.graphData = []

            this.data.countries.forEach(country => {
                this.graphData.push({
                    label: country,
                    value: this.getCountryData(country)[this.data.compare]
                })
            })
        },
        convertLongNumber(number) {
            let n = number.toString()
            let convertParams = {
                divide: 1,
                suffix: ''
            }

            if (n.length >= 10 && n.length <= 12) {
                convertParams = {
                    divide: 10**9,
                    suffix: 'B'
                }
            } else if (n.length >= 7 && n.length <= 9) {
                convertParams = {
                    divide: 10**6,
                    suffix: 'M'
                }
            } else if (n.length >= 4 && n.length <= 6) {
                convertParams = {
                    divide: 10**3,
                    suffix: 'K'
                }
            }

            n = (number / convertParams.divide).toString()

            if (n.includes('.')) {
                n = n.substring(0, n.indexOf('.') + 2)
            }

            n += convertParams.suffix

            return n
        }
    },
    computed: {
        ...mapState([
            'countriesData'
        ]),
        graphMax() {
           return Math.max(...this.graphData.map(bar => bar.value))
        },
        xAxisValues() {
            let values = [...Array(this.lines - 1).keys()].map(value => value + 1).map(value => {
                return this.graphMax * (value / (this.lines - 1))
            }).map(value => Math.ceil(value)).map(value => this.convertLongNumber(value))

            values.unshift('0')

            return values
        }
    },
    watch: {
        data: {
            handler: function() {
                this.setGraphData()
            },
            deep: true
        }
    },
    mounted() {
        this.setGraphData()
    }
}
</script>

<style lang="scss">
@import "../../sass/_variables.scss";

#x-axis {
    position: relative;
    width: calc(100% - 200px);
    height: calc(100% - 200px);
    padding-left: 100px;
    margin: 100px auto;

    .line {
        position: absolute;
        width: calc(100% - 100px);
        height: 1px;
        background-color: lighten(dark(100), 10%);

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
    width: calc(100% - 170px);
    height: calc(100% - 200px);
    left: 120px;
    top: 100px;

    .bar {
        position: relative;
        flex-grow: 1;
        box-sizing: border-box;
        text-align: center;

        .desc {
            position: absolute;
            width: 100%;
            height: 20px;
            bottom: -30px;
        }
    }
}
</style>