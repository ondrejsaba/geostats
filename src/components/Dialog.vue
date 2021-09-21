<template>
    <div
        class="dialog"
        :class="{
            dark: options.darkMode
        }"
        :style="{
            width: dialog.size.width,
            height: dialog.size.height
        }"
    >
        <div class="dialog-title">
            {{ dialog.title }}

            <Button
                class="borderless right"
                :ignoreColorMode="true"
                @click="closeDialog"
            >
                <template v-slot:text>
                    <span class="material-icons">
                        close
                    </span>
                </template>
            </Button>
        </div>

        <div class="dialog-form">
            <component :is="dialog.component"></component>
        </div>
    </div>
</template>

<script>
import EditChart from '@/components/dialogs/EditChart.vue'
import Button from '@/components/Button.vue'
import { mapState, mapMutations } from 'vuex'

export default {
    components: {
        EditChart,
        Button
    },
    methods: {
        ...mapMutations('dialog', [
            'setDialog'
        ]),
        closeDialog() {
            this.setDialog({
                show: false
            })
        }
    },
    computed: {
        ...mapState('options', [
            'options'
        ]),
        ...mapState('dialog', [
            'dialog'
        ])
    }
}
</script>

<style lang="scss">
@import "../sass/variables";

.dialog {
    position: absolute;
    z-index: 225;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    border-radius: 6px;
    color: dark(100);
    background-color: light(100);
    border: 1px solid light(300);

    &.dark {
        color: light(100);
        background-color: dark(100);
        border: 1px solid dark(300);

        .dialog-title {
            border-bottom: 1px solid dark(200);

            .btn {
                color: light(100);
            }
        }

        .dialog-form {
            background-color: lighten(dark(100), 2%);
        }
    }

    .dialog-title {
        width: 100%;
        height: 40px;
        border-bottom: 1px solid light(300);
        box-sizing: border-box;
        font-size: 24px;
        font-weight: 600;
        line-height: 40px;
        text-align: left;
        padding-left: 10px;
    }

    .dialog-form {
        position: relative;
        overflow: hidden;
        width: 100%;
        height: calc(100% - 40px);
        background-color: light(100);
        border-radius: 0 0 6px 6px;
    }
}
</style>