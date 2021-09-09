<template>
    <div class="btn l-text m-size filter-select">
        <slot></slot>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.filter-select {
    &:not(:first-of-type) {
        margin-left: 10px;
    }
}
</style>