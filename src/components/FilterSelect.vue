<template>
    <div class="btn s-text s-size filter-select">
        <slot></slot>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import "../sass/_variables.scss";

.filter-select {
    &:not(:first-of-type) {
        margin-left: 10px;
    }

    &:not(.primary) {
        &:hover {
            background-color: darken(light(100), 1%);
            border: 1px solid light(300);
        }

        &:active {
            background-color: darken(light(100), 2%);
        }
    }
}
</style>