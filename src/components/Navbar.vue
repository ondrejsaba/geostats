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

            <router-link
                v-if="comparisonList.length && $route.name != 'Compare'"
                :to="{ name: 'Compare' }"
            >
                <div class="btn primary right m-text mt-10">
                    Compare countries ({{ comparisonList.length }})

                    <span class="material-icons">
                        bar_chart
                    </span>

                    <div class="hint hint-bottom" v-if="!comparisonList.length">
                        There are no countries in your comparison list.
                    </div>
                </div>
            </router-link>

            <router-link
                v-else-if="['Compare', 'Statistics'].includes($route.name)"
                :to="{ name: 'Home' }"
            >
                <Button class="right m-text mt-10">
                    <template v-slot:text>
                        Back

                        <span class="material-icons">
                            arrow_forward
                        </span>
                    </template>
                </Button>
            </router-link>
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
        ])
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
    z-index: 100;
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