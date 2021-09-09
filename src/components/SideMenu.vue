<template>
    <div id="side-menu">

    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import "../sass/_variables.scss";

#side-menu {
    position: fixed;
    z-index: 75;
    width: 400px;
    height: calc(100% - 60px);
    top: 60px;
    background-color: light(100);
    border-top: 1px solid darken(light(200), 7.5%);
}
</style>