<template>
  <div class="radio_wrapper">
    <div v-for="item in radio" :key="item.value">
      <input
          v-model="content"
          :id="item.label"
          :value="item.value"
          type="radio"
          @input="handleInput">
      <label :for="item.label">{{ item.label }}</label>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'StaticRadio',
    prop: ['value'],
    data () {
      return {
        content: this.value,
        radio: [{
          label: 'Static',
          value: 'static'
        }, {
          label: 'Socket (only for BTC, BSV)',
          value: 'socket'
        }, {
          label: 'Socket Live (only for BTC)',
          value: 'live'
        }]
      }
    },
    mounted () {
      this.content = 'static';
    },
    methods: {
      handleInput (event) {
        this.$emit('input', event.target.value)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .radio_wrapper {
    display: flex;
    flex-direction: column;
    margin: 20px 0 0;
    label,
    input {
      cursor: pointer;
    }
  }
</style>