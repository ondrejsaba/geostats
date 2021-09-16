<template>
    <Button
        class="l-text m-size filter-select"
        :ignoreColorMode="true"
    >
        <template v-slot:text>
            <slot></slot>
        </template>
    </Button>
</template>

<script>
import Button from './Button.vue'

export default {
    components: {
        Button
    },
    props: {
        filterName: String
    }
}
</script>

<style lang="scss">
.filter-select {
    &:not(:first-of-type) {
        margin-left: 10px;
    }
}
</style>