<template>
  <div class="coin_block">
      <div class="coin_inner">
        <div
            v-for="coin in coins"
            :key="coin.CoinInfo.Id"
        >
          <coin-rate-block-inner
              :coin-name="coin.CoinInfo.Name"
              :coin-price="coin.Price.USD"
              @getChartData="getChartData"
          />
        </div>
      </div>
  </div>
</template>

<script>
  import CoinRateBlockInner from "@/components/Coin/CoinRateBlockInner";
  export default {
    name: 'CoinRateBlock',
    components: {CoinRateBlockInner},
    props: {
      coins: {
        type: Array,
        required: true
      }
    },
    methods: {
      getChartData (coinName) {
        this.$emit('getChartData', coinName);
      }
    }
  }
</script>

<style scoped>
  .coin_block {
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-basis: 20%;
  }
  .coin_inner {
    width: fit-content;
  }
  @media screen and (max-width: 768px) {
    .coin_block {
      flex-basis: 45%;
    }
  }
  @media screen and (max-width: 420px) {
    .coin_block {
      flex-basis: 100%;
    }
  }
</style>