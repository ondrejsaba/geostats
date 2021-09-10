<template>
    <main class="content">
        {{ comparisonList }}
    </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters([
            'comparisonList'
        ])
    }
}
</script>

<style>

</style>