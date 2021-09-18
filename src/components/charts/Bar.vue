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
        getCountryFlag(name) {
            const data = this.countriesData.filter(country => country.name == name)[0]
            const {flag} = data

            return flag
        },
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
        },
        statsLink(name) {
            const countryId = name.replaceAll(' ', '_')

            this.$router.push({
                name: 'Statistics',
                params: {
                    country: countryId
                }
            })
        },
        getShortenedName(name) {
            return name.length > 14 ? name.substring(0, 14) + "..." : name
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
    height: calc(100% - 160px);
    padding-left: 100px;
    margin: calc(100px - 20px) auto;

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
            color: light(100);
        }

        &:active {
            cursor: default;
        }
    }
}
</style>