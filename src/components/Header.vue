<template>
  <header>
    <h1 class="header">
      <a :href="link" target="_blank" class="link">
        {{ title }}
      </a>
    </h1>
  </header>
</template>

<script>
  export default {
    data: () => ({
      link: 'https://min-api.cryptocompare.com/',
      title: 'CryptoCompare API'
    })
  }
</script>

<style lang="scss" scoped>
  .header {
    text-align: center;
  }
  .link {
    color: #000;
    text-decoration: none;
    transition: color .1s linear;

    &:hover {
      color: #2554FF;
    }
  }
</style>