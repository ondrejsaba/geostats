<template>
    <nav>
        <div class="btn borderless mt-10 ml-10">
            <span class="material-icons">
                menu
            </span>
        </div>

        <div id="title" class="pl-10">
            Geostats
        </div>
    </nav>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import "../sass/_variables.scss";

nav {
    width: 100%;
    height: 60px;
    border-bottom: 1px solid light(200);
    
    #title {
        display: inline-block;
        height: 60px;
        line-height: 60px;
        font-size: 24px;
        font-weight: 600;
    }
}
</style>