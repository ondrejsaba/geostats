<template>
    <section id="search-section">
        <input
            type="text"
            class="search mt-20"
            :class="{
                dark: options.darkMode
            }"
            placeholder="Search for countries"
            v-model="query"
        >

        <span class="material-icons" id="search-icon">
            search
        </span>

        <span
            class="material-icons"
            :class="{
                hide: !searchMode
            }"
            id="reset-icon"
            @click="resetSearchQuery"
        >
            close
        </span>
    </section>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
    methods: {
        ...mapMutations([
            'setSearchMode',
            'setSearchQuery'
        ]),
        resetSearchQuery() {
            this.setSearchQuery({
                query: ''
            })
        }
    },
    computed: {
        ...mapState([
            'searchMode',
            'searchQuery',
            'options'
        ]),
        query: {
            get() {
                return this.searchQuery
            },
            set(value) {
                this.setSearchQuery({
                    query: value
                })
            }
        }
    }
}
</script>

<style lang="scss">
@import "../sass/_variables.scss";

#search-section {
    position: relative;
}

.searchbar-icon {
    position: absolute;
    z-index: 25;
    font-size: 22px;
    color: light(300);
}

#search-icon {
    @extend .searchbar-icon;
    left: 50px;
    top: 10px;
}

#reset-icon {
    @extend .searchbar-icon;
    right: 50px;
    top: 10px;
    cursor: pointer;
}

input[type=text].search {
    display: block;
    position: relative;
    width: calc(100% - 120px);
    height: 40px;
    margin: 0 auto;
    border: 1px solid light(200);
    border-radius: 40px;
    color: light(500);
    font-size: 22px;
    font-family: 'Inter';
    padding-left: 40px;

    &::placeholder {
        color: light(300);
    }

    &:focus {
        border: 1px solid light(400);
        outline: none;

        & + #search-icon {
            color: light(400);
        }
    }

    &.dark {
        background-color: lighten(dark(100), 5%);
        border: 1px solid dark(300);

        &:focus {
            border: 1px solid light(200);

            & + #search-icon {
                color: light(200);
            }
        }
    }
}
</style>