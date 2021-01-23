<template>
  <div>
    <Header />
    <CoinRate />
  </div>
</template>

<script>
import CoinRate from "@/components/Coin/CoinRate";
import Header from "@/components/Header";

export default {
  name: 'CoinInfo',
  components: { Header, CoinRate }
}
</script>
