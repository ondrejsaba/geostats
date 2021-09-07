<template>
    <section id="search-section">
        <input
            type="text"
            class="search mt-20"
            placeholder="Search for countries"
        >
    </section>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import "../sass/_variables.scss";

input[type=text].search {
    display: block;
    position: relative;
    width: calc(100% - 100px);
    height: 40px;
    margin: 0 auto;
    border: 1px solid light(200);
    border-radius: 40px;
    font-size: 22px;
    font-family: 'Inter';
    padding-left: 20px;

    &::placeholder {
        color: light(300);
    }
}
</style>