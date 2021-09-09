<template>
    <div
        class="country-card"
        v-if="pickedFilter == countryFilter || pickedFilter == 'world'"
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
            <div class="btn light s-size s-text">
                Statistics
                <span class="material-icons">
                    trending_up
                </span>
            </div>

            <div class="btn primary s-size s-text ml-10">
                Add to comparison
                <span class="material-icons">
                    add
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
    computed: {
        ...mapGetters([
            'pickedFilter'
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
    border-radius: 8px;

    h2 {
        margin: 0;
        padding: 25px 0 25px;
        text-align: center;
        line-height: 30px;
        font-size: 24px;
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