<template>
    <div class="chart">
        <div id="pie-chart-box" ref="pieChartBox">
            <div
                id="pie-chart"
                :style="{
                    width: size.width,
                    height: size.height
                }"
            ></div>
        </div>

        <div id="pie-chart-info">
            
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: Object,
        type: String
    },
    data() {
        return {
            size: {
                width: '0px',
                height: '0px'
            }
        }
    },
    methods: {
        setPieChartDimensions() {
            this.size = {
                width: this.$refs.pieChartBox.offsetWidth + 'px',
                height: this.$refs.pieChartBox.offsetHeight + 'px'
            }

            if (this.size.width < this.size.height) {
                this.size.height = this.size.width
            }
        }
    },
    mounted() {
        this.setPieChartDimensions()
        window.addEventListener('resize', this.setPieChartDimensions)
    },
    unmounted() {
        window.removeEventListener('resize', this.setPieChartDimensions)
    }
}
</script>

<style lang="scss">
@import "../../sass/_variables.scss";

#pie-chart-box {
    display: inline-block;
    width: calc(100% - 300px);
    height: 100%;
    box-sizing: border-box;
    border: 1px solid red;
}

#pie-chart-info {
    display: inline-block;
    vertical-align: top;
    width: 300px;
    height: 100%;
    box-sizing: border-box;
    border: 1px solid blue;
}

#pie-chart {
    box-sizing: border-box;
    border: 1px solid lime;
}
</style>