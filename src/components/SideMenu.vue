<template>
    <div
        id="side-menu"
        :class="{ dark: options.darkMode }"
        @click="updateValues"
    >
        <div
            class="menu-option"
            v-for="(optionSettings, changedOption) in menuOptions"
            :key="changedOption"
            @click="changeOption({
                option: changedOption,
                value: optionSettings.newValue
            })"
        >
            {{ optionSettings.text }}

            <div class="option-data">
                {{ optionSettings.shownData }}
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
    data() {
        return {
            menuOptions: {}
        }
    },
    methods: {
        ...mapActions('messages', [
            'setMessages'
        ]),
        ...mapMutations('options', [
            'changeOption'
        ]),
        updateValues() {
            this.setMessages()

            this.menuOptions = {
                darkMode: {
                    text: this.messages.menu.colorMode,
                    shownData: this.colorModeIcon,
                    newValue: !this.options.darkMode
                },
                language: {
                    text: this.messages.menu.language,
                    shownData: this.selectedLanguageIcon,
                    newValue: this.nextLanguage
                }
            }
        }
    },
    computed: {
        ...mapState('options', [
            'options'
        ]),
        ...mapState('messages', [
            'messages'
        ]),
        colorModeIcon() {
            return this.options.darkMode ? '🌙' : '☀️'
        },
        nextLanguage() {
            const languageCodes = ['en', 'cz']
            const currentIndex = languageCodes.indexOf(this.options.language)

            if (currentIndex < languageCodes.length - 1) {
                return languageCodes[currentIndex + 1]
            } else {
                return languageCodes[0]
            }
        },
        selectedLanguageIcon() {
            const languageToCountry = {
                'en': '🇬🇧',
                'cz': '🇨🇿'
            }

            return languageToCountry[this.options.language]
        }
    },
    mounted() {
        this.updateValues()
    }
}
</script>

<style lang="scss">
@import "../sass/_variables.scss";

#side-menu {
    position: fixed;
    z-index: 250;
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
    user-select: none;

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
        width: 60px;
        text-align: center;
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