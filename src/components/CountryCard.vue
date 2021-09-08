<template>
    <div class="country-card">
        <slot></slot>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import "../sass/_variables.scss";

.country-card {
    flex-basis: calc(33.3% - 20px);
    height: 300px;
    margin-bottom: 20px;
    border: 1px solid light(200);
}
</style>