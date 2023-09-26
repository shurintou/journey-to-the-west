<template>
    <span>{{ tweeningValue }}</span>
</template>

<script lang="ts">
import Vue from 'vue'
const TWEEN = require('@tweenjs/tween.js')

export default Vue.extend({
    data() {
        return {
            tweeningValue: 0,
        }
    },

    props: {
        value: { type: Number, required: true }
    },

    watch: {
        value: function (newValue, oldValue) {
            if (newValue > oldValue && newValue > 0) {
                this.$emit('increased')
            }
            let diff = Math.abs(newValue - oldValue)
            if (diff > 1) {
                this.tween(oldValue, newValue)
            }
            else {
                this.tweeningValue = newValue
            }
        }
    },

    mounted: function () {
        this.tween(0, this.value)
    },

    methods: {
        tween: function (startValue, endValue) {
            var vm = this
            function animate() {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }

            new TWEEN.Tween({ tweeningValue: startValue })
                .to({ tweeningValue: endValue }, 1000)
                .onUpdate(function (object) {
                    vm.tweeningValue = object.tweeningValue.toFixed(0)
                })
                .start()

            animate()
        },
    }
})
</script>