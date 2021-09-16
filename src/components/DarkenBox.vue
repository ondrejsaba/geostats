<template>
    <div id="darken-box">
        <slot></slot>
    </div>
</template>

<style lang="scss">
@import "../sass/_variables.scss";

#darken-box {
    position: fixed;
    z-index: 200;
    width: 100%;
    height: calc(100vh - 60px);
    left: 0;
    top: 60px;
    background-color: rgba(dark(300), 0.5);
}
</style>