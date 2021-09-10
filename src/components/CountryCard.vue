<template>
    <div
        class="country-card"
        v-if="canShowCard"
    >
        <h2>{{ countryInfo.name }}</h2>

        <div
            class="card-flag"
            :style="{
                backgroundImage: 'url(' + countryInfo.flag + ')'
            }"
        >
        </div>

        <div class="btns-wrapper">
            <router-link
                :to="{
                    name: 'Statistics',
                    params: {
                        country: countryInfo.name
                    }
                }"
            >
                <div class="btn light s-size s-text">
                    Statistics
                    <span class="material-icons">
                        trending_up
                    </span>
                </div>
            </router-link>

            <div
                class="btn s-size s-text ml-10"
                :class="{
                    primary: !isBeingCompared,
                    red: isBeingCompared
                }"
                @click="modifyComparisonList"
            >
                <span v-if="!isBeingCompared">
                    Add to comparison
                </span>
                <span v-else>
                    Remove
                </span>

                <span class="material-icons">
                    {{ isBeingCompared ? 'remove' : 'add' }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props: [
        'countryInfo'
    ],
    methods: {
        modifyComparisonList() {
            this.$store.commit('modifyComparisonList', {
                countryName: this.countryInfo.name
            })
        }
    },
    computed: {
        ...mapGetters([
            'pickedFilter',
            'searchMode',
            'searchQuery',
            'comparisonList'
        ]),
        countryFilter() {
            if (this.countryInfo.region == 'Americas') {
                if (['Carribean', 'South America'].includes(this.countryInfo.subregion)) {
                    return 'south_america'
                } else {
                    return 'north_america'
                }
            } else {
                return this.countryInfo.region.charAt(0).toLowerCase() + this.countryInfo.region.slice(1)
            }
        },
        canShowCard() {
            if (this.searchMode) {
                // check whether the name of the country contains a part of the current search query
                return this.countryInfo.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            } else {
                return this.pickedFilter == this.countryFilter || this.pickedFilter == 'world'
            }
        },
        isBeingCompared() {
            return this.comparisonList.includes(this.countryInfo.name)
        }
    }
}
</script>

<style lang="scss">
@import "../sass/_variables.scss";

.country-card {
    position: relative;
    flex-basis: calc(33.3% - (40px / 3));
    min-height: 280px;
    margin-bottom: 20px;
    border: 1px solid light(200);
    box-sizing: border-box;
    border-radius: 8px;

    h2 {
        margin: 0;
        padding: 25px 0 25px;
        text-align: center;
        line-height: 30px;
        font-size: 24px;
    }

    &:not(:nth-child(3n+0)) {
        margin-right: 20px;
    }
}

.card-flag {
    display: block;
    width: 80%;
    height: 200px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    margin: 0 auto 80px;
}

.btns-wrapper {
    position: absolute;
    left: 50%;
    bottom: 25px;
    width: fit-content;
    transform: translateX(-50%);
}
</style>