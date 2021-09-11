<template>
    <section id="search-section">
        <input
            type="text"
            class="search mt-20"
            :class="{ dark: options.darkMode }"
            placeholder="Search for countries"
            v-model="query"
        >

        <span class="material-icons" id="search-icon">
            search
        </span>
    </section>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
    methods: {
        ...mapMutations([
            'setSearchMode',
            'setSearchQuery'
        ])
    },
    computed: {
        ...mapGetters([
            'searchQuery',
            'options'
        ]),
        query: {
            get() {
                return this.searchQuery
            },
            set(value) {
                this.$store.commit('setSearchQuery', {query: value})
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

#search-icon {
    position: absolute;
    z-index: 25;
    font-size: 22px;
    color: light(300);
    left: 50px;
    top: 10px;
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