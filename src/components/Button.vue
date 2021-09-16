<template>
    <div
        class="btn"
        :class="{
            dark: options.darkMode && !ignoreColorMode,
            light: !options.darkMode && !ignoreColorMode
        }"
    >
        <slot name="text">
            Button
        </slot>

        <div v-if="$slots.hint" class="hint hint-bottom">
            <slot name="hint"></slot>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    props: {
        ignoreColorMode: Boolean
    },
    computed: {
        ...mapState([
            'options'
        ])
    }
}
</script>