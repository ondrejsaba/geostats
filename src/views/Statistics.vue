<template>
    <section
        class="stats-box"
        :class="{ dark: options.darkMode }"
        v-if="countryInfoLoaded"
    >
        <h2 id="countryNameText">
            <img
                class="countryIcon"
                :src="countryInfo.flag"
                :alt="countryName"
            >
            {{ countryName }}
        </h2>

        <p
            v-for="(statValue, statName) in displayedStats"
            :key="statName"
        >
            <span class="material-icons">
                {{ statIcons[statName] }}
            </span>

            <span class="bold pr-10">{{ statName }}:</span> {{ statValue }}
        </p>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            displayedStats: {},
            statIcons: {
                'Region': 'public',
                'Subregion': 'place',
                'Capital': 'home',
                'Population': 'sentiment_satisfied',
                'Area': 'layers',
                'Timezones': 'schedule',
                'Currency': 'payments',
                'Neighboring countries': 'flag'
            }
        }
    },
    methods: {
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
                }],
                borders
            } = this.countryInfo

            this.displayedStats = {
                'Region': region,
                'Subregion': subregion,
                'Capital': capital,
                'Population': population,
                'Area': `${area} km2`,
                'Timezones': timezones,
                'Currency': `${name} (${code})`,
                'Neighboring countries': borders
            }
        }
    },
    computed: {
        ...mapGetters([
            'countriesData',
            'options'
        ]),
        countryName() {
            return this.$route.params.country.replaceAll('_', ' ')
        },
        countryInfoLoaded() {
            return this.countriesData.length > 0
        },
        countryInfo() {
            return this.countriesData.filter(country => country.name == this.countryName)[0]
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
            this.$store.dispatch('getCountriesData')
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
    max-width: calc(100% - 80px);
    width: fit-content;
    height: fit-content;
    transform: translateX(-50%) translateY(calc(-50% - 60px));
    text-align: center;

    h2 {
        font-size: 32px;
        line-height: 32px;

        .countryIcon {
            height: 24px;
            padding-right: 10px;
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
</style>