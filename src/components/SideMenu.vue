<template>
    <div id="side-menu" :class="{ dark: options.darkMode }">
        <div
            class="menu-option"
            @click="changeOption({
                option: 'darkMode',
                value: !options.darkMode
            })"
        >
            Color mode:

            <div class="option-data">
                {{ colorModeIcon }}
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
    methods: {
        ...mapMutations([
            'changeOption'
        ])
    },
    computed: {
        ...mapGetters([
            'options'
        ]),
        colorModeIcon() {
            return this.options.darkMode ? '🌙' : '☀️'
        }
    }
}
</script>

<style lang="scss">
@import "../sass/_variables.scss";

#side-menu {
    position: fixed;
    z-index: 75;
    width: 350px;
    height: calc(100% - 60px);
    top: 60px;
    background-color: light(100);
    border-top: 1px solid darken(light(200), 7.5%);

    &.dark {
        background-color: dark(200);
        border-top: 1px solid dark(300);
        border-right: 1px solid dark(300);

        .menu-option {
            color: light(100);
            border-bottom: 1px solid dark(300);

            .option-data {
                border-left: 1px solid dark(300);
            }
        }
    }
}

.menu-option {
    position: relative;
    width: calc(100% - 20px);
    height: 60px;
    border-bottom: 1px solid darken(light(200), 7.5%);
    cursor: pointer;
    color: dark(100);
    line-height: 60px;
    font-size: 20px;
    font-weight: 500;
    padding-left: 20px;

    &:hover {
        background-color: blue(100);
        color: light(100);
    }

    &:active {
        background-color: blue(200);
    }

    .option-data {
        position: absolute;
        top: 0;
        right: 0;
        padding: 0 20px 0 20px;
        border-left: 1px solid darken(light(100), 7.5%);
    }

    &:hover .option-data {
        border-left: 1px solid blue(200) !important;
    }

    &:active .option-data {
        border-left: 1px solid blue(300) !important;
    }
}
</style>