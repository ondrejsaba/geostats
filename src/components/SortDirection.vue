<template>
    <Button class="ml-10 s-size s-text s-square" @click="setSortDirection">
        <template v-slot:text>
            <span class="material-icons" v-if="sortDirection == 'ascend'">
                arrow_upwards
            </span>

            <span class="material-icons" v-else>
                arrow_downwards
            </span>
        </template>

        <template v-slot:hint>
            <span v-if="sortDirection == 'ascend'">
                Ascending
            </span>

            <span v-else>
                Descending
            </span>
        </template>
    </Button>
</template>

<script>
import Button from './Button.vue'
import { mapActions, mapState } from 'vuex'

export default {
    components: {
        Button
    },
    methods: {
        ...mapActions('filters', [
            'setSortDirection'
        ])
    },
    computed: {
        ...mapState('filters', [
            'sortDirection'
        ])
    }
}
</script>