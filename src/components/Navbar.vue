<template>
    <nav>
        <div class="btn borderless mt-10 ml-10" @click="setMenuOpened">
            <span class="material-icons">
                {{ menuIcon }}
            </span>
        </div>

        <div id="title" class="pl-10">
            Geostats 🌍
        </div>
    </nav>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
    methods: {
        ...mapMutations([
            'setMenuOpened'
        ])
    },
    computed: {
        ...mapGetters([
            'menuOpened'
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
    
    #title {
        display: inline-block;
        height: 60px;
        line-height: 60px;
        font-size: 24px;
        font-weight: 600;
    }
}
</style>