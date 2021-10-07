<template>
    <div
        class="btn"
        :class="{
            dark: options.darkMode && !ignoreColorMode,
            light: !options.darkMode && !ignoreColorMode
        }"
    >
        <span class="btn-text">
            <slot v-if="$slots.text" name="text">
                Button
            </slot>
        </span>

        <span v-if="icon" class="material-icons btn-icon">
            {{ icon }}
        </span>

        <div v-if="$slots.hint" class="hint hint-bottom">
            <slot name="hint"></slot>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    props: {
        ignoreColorMode: {
            type: Boolean,
            required: false
        },
        icon: {
            type: String,
            required: false
        }
    },
    computed: {
        ...mapState('options', [
            'options'
        ])
    }
}
</script>