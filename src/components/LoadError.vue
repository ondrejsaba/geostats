<template>
    <div id="load-error">
        <h2>There was an error while retrieving countries data from an external API.</h2>

        <Button
            class="center"
            :icon="'arrow_forward'"
            @click="tryToGetData"
        >
            <template v-slot:text>
                Try again
            </template>
        </Button>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import Button from '@/components/Button.vue';

export default {
    components: {
        Button
    },
    methods: {
        ...mapActions('data', [
            'getCountriesData'
        ]),
        ...mapMutations('data', [
            'setDataError'
        ]),
        tryToGetData() {
            this.setDataError({
                value: false
            })
            this.getCountriesData()
        }
    },
    computed: {
        ...mapState('options', [
            'options'
        ])
    }
}
</script>

<style lang="scss">
@import '../sass/variables';

#load-error {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: calc(100% - 50px);
    padding: 0 25px 0 25px;

    h2 {
        color: light(500);
        text-align: center;
        font-size: 24px;
    }
}
</style>