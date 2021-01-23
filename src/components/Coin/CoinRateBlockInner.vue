<template>
  <div @click="$emit('getChartData', coinName)" class="coin_wrapper">
      <span>
        {{ coinName }}:
      </span>
      <span>
        {{ coinPrice }} $
      </span>
  </div>
</template>

<script>
export default {
  name: 'CoinRateBlockInner',
  props: {
    coinName: {
      type: String,
      required: true,
      default: ''
    },
    coinPrice: {
      type: Number,
      required: true,
      default: 0
    }
  }
}
</script>

<style scoped lang="scss">
  .coin_wrapper {
    cursor: pointer;
    margin-bottom: 5px;
    transition: color .2s ease-in-out;

    &:hover {
      color: #2554FF;
    }
  }
</style>