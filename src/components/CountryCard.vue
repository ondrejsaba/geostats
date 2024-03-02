<template>
    <div
        class="country-card"
        :class="{ dark: options.darkMode }"
    >
        <router-link
            :to="{
                name: 'Statistics',
                params: {
                    country: countryRoute
                }
            }"
        >
            <h2>
                <img
                    class="inline-flag"
                    :src="countryInfo.flag"
                >

                {{ countryInfo.name }}
            </h2>

            <div
                class="card-flag"
                :style="{
                    backgroundImage: 'url(' + countryInfo.flag + ')'
                }"
            >
            </div>
        </router-link>

        <div class="btns-wrapper">
            <router-link
                :to="{
                    name: 'Statistics',
                    params: {
                        country: countryRoute
                    }
                }"
            >
                <Button class="statistics-btn s-size s-text">
                    <template v-slot:text>
                        <span class="text">
                            {{ messages.countryCard.statistics }}
                        </span>
                        
                        <span class="material-icons">
                            trending_up
                        </span>
                    </template>
                </Button>
            </router-link>

            <Button
                class="comparison-add-btn s-size s-text ml-10"
                :class="{
                    primary: !isBeingCompared && comparisonList.length < 6,
                    inactive: !isBeingCompared && comparisonList.length >= 6,
                    red: isBeingCompared
                }"
                :ignoreColorMode="true"
                @click="addToComparisonList"
            >
                <template v-slot:text>
                    <span v-if="!isBeingCompared" class="text">
                        {{ messages.countryCard.compareAdd }}
                    </span>

                    <span v-else class="text">
                        {{ messages.countryCard.compareRemove }}
                    </span>

                    <span class="material-icons">
                        {{ isBeingCompared ? 'remove' : 'add' }}
                    </span>
                </template>

                <template v-if="!isBeingCompared && comparisonList.length >= 6" v-slot:hint>
                    {{ messages.countryCard.tooMany }}
                </template>
            </Button>
        </div>
    </div>
</template>

<script>
import Button from './Button.vue'
import { mapState, mapMutations } from 'vuex'

export default {
    components: {
        Button
    },
    props: {
        countryInfo: Object
    },
    methods: {
        ...mapMutations('comparison', [
            'modifyComparisonList'
        ]),
        addToComparisonList() {
            if (this.comparisonList.length < 6 || this.comparisonList.includes(this.countryInfo.name)) {
                this.modifyComparisonList({
                    countryName: this.countryInfo.name
                })
            }
        }
    },
    computed: {
        ...mapState('search', [
            'searchMode',
            'searchQuery'
        ]),
        ...mapState('options', [
            'options'
        ]),
        ...mapState('comparison', [
            'comparisonList'
        ]),
        ...mapState('filters', [
            'pickedFilter'
        ]),
        ...mapState('messages', [
            'messages'
        ]),
        isBeingCompared() {
            return this.comparisonList.includes(this.countryInfo.name)
        },
        countryRoute() {
            return this.countryInfo.name.replaceAll(' ', '_')
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
        color: dark(100);

        .inline-flag {
            display: none;
            height: 18px;
            padding-right: 10px;
        }
    }

    &:not(:nth-child(3n+0)) {
        margin-right: 20px;
    }

    &.dark {
        border: 1px solid dark(300);
        background-color: dark(100);

        h2 {
            color: light(100);
        }

        .card-flag {
            border: none;
        }
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
    border: 1px solid light(200);
}

.btns-wrapper {
    display: block;
    margin: -50px auto 20px;
    margin-top: -50px;
    width: fit-content;
}

@import "../sass/_mediaqueries.scss";
</style>