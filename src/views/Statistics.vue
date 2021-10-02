<template>
    <section
        class="stats-box"
        :class="{ dark: options.darkMode }"
        v-if="countryInfoLoaded"
    >
        <h2 id="countryNameText">
            <img
                class="country-icon"
                :src="countryInfo.flag"
                :alt="countryName"
            >
            {{ countryName }}
        </h2>

        <p
            v-for="(stat, statName) in displayedStats"
            :key="statName"
        >
            <span class="material-icons">
                {{ stat.icon }}
            </span>

            <span class="bold pr-10">{{ messages.statistics[statName] }}:</span>
            
            {{ stat.value }}
        </p>

        <p>
            <span class="material-icons">
                flag
            </span>

            <span class="bold pr-10">{{ messages.statistics.neighboringCountries }}:</span>

            <span v-if="neighborFlags.length > 0">
                <img
                    v-for="neighbor in neighborFlags"
                    class="country-icon smaller"
                    :src="neighbor.flag"
                    :key="neighbor.name"
                    :alt="neighbor.name"
                >
            </span>

            <span v-else>
                none
            </span>
        </p>
    </section>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    data() {
        return {
            displayedStats: {}
        }
    },
    methods: {
        ...mapActions('data', [
            'getCountriesData'
        ]),

        // saves the stats after getting data from the api
        getStats() {
            const {
                region,
                subregion,
                capital,
                population,
                area,
                timezones,
                currencies: [{
                    code,
                    name
                }]
            } = this.countryInfo

            this.displayedStats = {
                'continent': {
                    icon: 'public',
                    value: region
                },
                'region': {
                    icon: 'place',
                    value: subregion
                },
                'capital': {
                    icon: 'home',
                    value: capital
                },
                'population': {
                    icon: 'sentiment_satisfied',
                    value: population
                },
                'area': {
                    icon: 'layers',
                    value: `${area} km2`
                },
                'populationDensity': {
                    icon: 'groups',
                    value: `${(population / area).toFixed(2)}/km2`
                },
                'timezones': {
                    icon: 'schedule',
                    value: timezones.length > 1 ? timezones.join(', ') : timezones.join('')
                },
                'currency': {
                    icon: 'payments',
                    value: `${name} (${code})`
                }
            }
        }
    },
    computed: {
        ...mapState('data', [
            'countriesData'
        ]),
        ...mapState('options', [
            'options'
        ]),
        ...mapState('messages', [
            'messages'
        ]),

        // gets the name of the country based on the route
        countryName() {
            return this.$route.params.country.replaceAll('_', ' ')
        },

        // is the countriesData variable filled with data from the rest countries API?
        countryInfoLoaded() {
            return this.countriesData.length > 0
        },

        /* filters out the countriesData variable and returns only
        info about the current country (based on the route) */
        countryInfo() {
            return this.countriesData.filter(country => country.name == this.countryName)[0]
        },

        neighborFlags() {
            if (!this.countryInfo.borders) {
                return false
            }

            const neighborObjects = this.countryInfo.borders.map(countryCode => {
                return this.countriesData.filter(country => {
                    return country.alpha3Code == countryCode
                })
            }).map(country => country[0]).filter(country => country !== undefined)

            const neighborFlags = neighborObjects.map(country => {
                return {
                    name: country.name,
                    flag: country.flag
                }
            })

            return neighborFlags
        }
    },
    watch: {
        countryInfoLoaded: function() {
            /* when the countriesData variable is filled with data, then get
            the important data and save it to the displayedStats variable */
            this.getStats()
        }
    },
    mounted() {
        // if there was no prior communication with the API, then get the data
        if (!this.countryInfoLoaded) {
            this.getCountriesData()
        } else {
            this.getStats()
        }
    }
}
</script>

<style lang="scss">
@import "../sass/_variables.scss";

section.stats-box {
    position: absolute;
    top: calc(50% + 60px);
    left: 50%;
    max-width: calc(70% - 80px);
    width: fit-content;
    height: fit-content;
    transform: translateX(-50%) translateY(calc(-50% - 60px));
    text-align: center;

    h2 {
        font-size: 32px;
        line-height: 32px;
    }

    .country-icon {
        height: 24px;
        padding-right: 10px;

        &.smaller {
            height: 18px;
        }
    }

    p {
        font-size: 22px;

        span.material-icons {
            padding-right: 10px;
            vertical-align: top;
        }
    }

    &.dark {
        color: light(100);
    }
}

@import "../sass/_mediaqueries.scss";
</style>