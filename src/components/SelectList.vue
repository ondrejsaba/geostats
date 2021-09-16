<template>
    <div class="select-list">
        <span
            v-if="label"
            class="label"
            :class="{
                'light-text': options.darkMode
            }"
        >
            {{ label }}
        </span>

        <div
            class="btn select-list m-text s-size"
            :class="{
                'light': !options.darkMode,
                'dark': options.darkMode,
                'bottom-not-rounded': rollOpened
            }"
            :style="{
                width: staticWidth ? staticWidth : 'auto'
            }"
            @click="rollOpened = !rollOpened"
        >
            {{ optionsMod !== undefined ? optionsMod(modelValue) : modelValue }}

            <span
                class="material-icons"
                :class="{
                    'rotate180': !rollOpened
                }"
            >
                arrow_drop_down
            </span>

            <div
                v-if="rollOpened"
                class="roll"
            >
                <div
                    v-for="option in rollOptions"
                    :key="option"
                    class="roll-option"
                    @click="$emit('update:modelValue', option)"
                >
                    {{ optionsMod !== undefined ? optionsMod(option) : option }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    props: {
        'select-options': Array,

        /* Changes the way an option is displayed,
        accepts a function with a value parameter
        that returns a modified version of the
        value */
        'options-mod': Function,
        'static-width': String,
        'label': String,

        // v-model
        'modelValue': String
    },
    data() {
        return {
            rollOpened: false
        }
    },
    computed: {
        ...mapState([
            'options'
        ]),
        rollOptions() {
            return this.selectOptions.filter(option => option != this.modelValue)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../sass/_variables.scss";

#sort-by-container {
    &.dark {
        color: light(100);
    }
}

.select-list {
    display: inline-block;

    span.label {
        padding-right: 10px;

        &.light-text {
            color: light(100);
        }
    }
}
</style>