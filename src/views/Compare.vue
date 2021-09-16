<template>
    <main class="content">
        {{ comparisonList }}
    </main>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState([
            'comparisonList'
        ])
    }
}
</script>

<style>

</style>