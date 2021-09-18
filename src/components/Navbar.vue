<template>
    <nav :class="{ dark: options.darkMode }">
        <div id="nav-container">
            <div class="btn borderless mt-10" @click="setMenuOpened">
                <span class="material-icons">
                    {{ menuIcon }}
                </span>
            </div>

            <router-link :to="{ name: 'Home' }">
                <div id="title" class="pl-10">
                    Geostats 🌍
                </div>
            </router-link>

            <Button
                v-if="comparisonList.length && $route.name == 'Home'"
                class="right m-text mt-10"
                :class="{
                    primary: comparisonList.length >= 2,
                    dark: comparisonList.length == 1 && options.darkMode,
                    light: comparisonList.length == 1 && !options.darkMode
                }"
                :ignoreColorMode="true"
                @click="compare"
            >
                <template v-slot:text>
                    Compare countries ({{ comparisonList.length }})

                    <span class="material-icons">
                        bar_chart
                    </span>
                </template>

                <template v-if="comparisonList.length == 1" v-slot:hint>
                    Add one more country to compare.
                </template>
            </Button>

            <Button
                v-if="$route.name != 'Home'"
                class="right m-text mt-10"
                @click="goBack"
            >
                <template v-slot:text>
                    Back

                    <span class="material-icons">
                        arrow_forward
                    </span>
                </template>
            </Button>
        </div>
    </nav>
</template>

<script>
import Button from './Button.vue'
import { mapMutations, mapState } from 'vuex'

export default {
    components: {
        Button
    },
    methods: {
        ...mapMutations([
            'setMenuOpened'
        ]),
        compare() {
            if (this.comparisonList.length >= 2 && this.$route.name == 'Home') {
                this.$router.push({ name: 'Compare' })
            }
        },
        goBack() {
            window.history.length ? this.$router.go(-1) : this.$router.push({ name: 'Home' })
        }
    },
    computed: {
        ...mapState([
            'menuOpened',
            'comparisonList',
            'options'
        ]),
        menuIcon() {
            return this.menuOpened ? 'close' : 'menu'
        }
    }
}
</script>

<style lang="scss">
@import "../sass/_variables.scss";

nav {
    position: fixed;
    z-index: 300;
    margin: 0;
    width: 100%;
    height: 60px;
    border-bottom: 1px solid light(200);
    box-sizing: border-box;
    background-color: light(100);
    user-select: none;
    
    #nav-container {
        display: block;
        width: calc(100% - 20px);
        margin: 0 auto;

        #title {
            display: inline-block;
            height: 60px;
            line-height: 60px;
            font-size: 24px;
            font-weight: 600;
            color: dark(400);
        }
    }

    &.dark {
        background-color: dark(300);
        border-bottom: dark(400);
        
        #nav-container {
            #title, .btn {
                color: light(100);
            }
        }
    }
}
</style>