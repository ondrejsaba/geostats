<template>
    <div
        id="darken-box"
        @click="hideDarkenBox"
    >
        <slot></slot>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    methods: {
        hideDarkenBox() {
            const hideComponents = {
                'menu/setMenuOpened': {
                    if: this.menuOpened,
                    params: false
                },
                'dialog/setDialog': {
                    if: this.dialog.show,
                    params: {
                        show: false
                    }
                }
            }

            Object.entries(hideComponents).forEach(([method, args]) => {
                if (args.if) {
                    if (args.params) {
                        this.$store.commit(method, args.params)
                    } else {
                        this.$store.commit(method)
                    }
                }
            })
        }
    },
    computed: {
        ...mapState('menu', [
            'menuOpened'
        ]),
        ...mapState('dialog', [
            'dialog'
        ])
    }
}
</script>

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