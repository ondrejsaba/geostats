<template>
    <div id="edit-chart-dialog">
        <div
            id="compared-countries-list"
            :class="{
                dark: options.darkMode
            }"
        >
            <div
                v-for="(country, index) in comparisonList"
                class="compared-countries-item"
                :key="country"
            >
                <img
                    :src="getCountryFlag(country)"
                    class="inline-flag"
                >

                {{ getShortenedName(country) }}

                <div class="compared-countries-item-btns">
                    <Button
                        class="s-size s-text mr-5"
                        :class="{
                            inactive: index == 0
                        }"
                        :icon="'arrow_upward'"
                        @click="moveCountry(country, 'up')"
                    />

                    <Button
                        class="s-size s-text mr-5"
                        :class="{
                            inactive: index == comparisonList.length - 1
                        }"
                        :icon="'arrow_downward'"
                        @click="moveCountry(country, 'down')"
                    />

                    <Button
                        v-if="comparisonList.length > 2"
                        class="red s-size s-text"
                        :ignoreColorMode="true"
                        :icon="'delete'"
                        @click="removeFromComparison(country)"
                    />
                </div>
            </div>
        </div>

        <Button
            class="red s-size s-text center mb-10"
            :ignoreColorMode="true"
            :icon="'delete'"
            @click="removeAllCountries"
        >
            <template v-slot:text>
                Remove all countries
            </template>
        </Button>
    </div>
</template>

<script>
import Button from '@/components/Button.vue'
import { mapState, mapMutations } from 'vuex'

export default {
    components: {
        Button
    },
    methods: {
        ...mapMutations([
            'modifyComparisonList',
            'setComparisonList',
            'setDialog'
        ]),
        getShortenedName(name) {
            return name.length > 14 ? name.substring(0, 14) + "..." : name
        },
        getCountryFlag(name) {
            const data = this.countriesData.filter(country => country.name == name)[0]

            const { flag } = data
            return flag
        },
        moveCountry(country, direction) {
            let list = [...this.comparisonList]
            const countryIndex = list.indexOf(country)

            if (
                direction == 'up' && countryIndex > 0
                || direction == 'down' && countryIndex != this.comparisonList.length -1
            ) {
                const moveToPosition = countryIndex + (direction == 'up' ? (-1) : 1)

                const savedCountry = list[moveToPosition]
                list[moveToPosition] = country
                list[countryIndex] = savedCountry

                this.setComparisonList(list)
            }
        },
        removeFromComparison(country) {
            this.modifyComparisonList({
                countryName: country
            })
        },
        removeAllCountries() {
            this.setDialog({
                show: false
            })

            setTimeout(() => {
                this.setComparisonList([])

                this.$router.push({
                    name: 'Home'
                })
            }, 200)
        }
    },
    computed: {
        ...mapState([
            'countriesData',
            'comparisonList',
            'options'
        ])
    }
}
</script>

<style lang="scss" scoped>
@import "../../sass/variables";

#compared-countries-list {
    width: calc(100% - 20px);
    height: auto;
    border: 1px solid dark(200);
    margin: 10px;

    .compared-countries-item {
        width: calc(100% - 10px);
        height: 40px;
        line-height: 40px;
        padding-left: 10px;
        font-size: 18px;
        background-color: lighten(dark(100), 5%);

        &:not(:first-of-type) {
            border-top: 1px solid dark(200);
        }

        .inline-flag {
            height: 12px;
            padding-right: 5px;
        }

        .compared-countries-item-btns {
            width: auto;
            height: 100%;
            padding: 0 5px 0 5px;
            border-left: 1px solid dark(200);
            float: right;
        }
    }
}
</style>