<template>
  <div>
    <div v-if="cryptoInfo.length" class="main_wrapper">
      <coin-rate-block
          v-for="(items,i) in cryptoInfo"
          :key="i"
          :coins="items"
          @getChartData="getChartData"
      />
    </div>
    <static-radio v-model="isStatic"/>
    <div class="chart_wrapper">
      <LineChart
          :history-data="chartData"
          :key="changed"
          :isStatic="isStatic"
      />
    </div>
  </div>
</template>

<script>
import LineChart from "@/components/Charts/LineChart";
import CoinRateBlock from "@/components/Coin/CoinRateBlock";
import { getCoinNames, getCoinInfo, getChartData } from "@/api/coin";
import {transformDate} from "@/utils/helpers";
import StaticRadio from "@/components/common/StaticRadio";

export default {
  name: 'CoinRate',
  components: {StaticRadio, CoinRateBlock, LineChart },
  props: {
    msg: String
  },
  data: () => ({
    cryptoInfo: [],
    chartData: {
      dates: [],
      data: [],
      coinName: ''
    },
    testObj: {
      dates: [],
      data: [],
      coinName: ''
    },
    changed: false,
    ccStreamer: null,
    isStatic: 'static'
  }),
  async created () {
    await this.getInfo();
  },
  watch: {
    chartData: {
      deep: true,
      handler () {
        this.changed = !this.changed;
      }
    }
  },
  methods: {
    async getInfo () {
      const coinNames = await getCoinNames();
      this.cryptoInfo = await getCoinInfo(coinNames);
      await this.setDefaultChart();
    },
    async getChartData (coinName) {
      if (this.isStatic === 'static')  {
        this.chartData = await getChartData(coinName);
      } else {
        if (this.chartData.coinName !== coinName) {
          if (this.ccStreamer) {
            this.ccStreamer.close();
          }
          this.chartData = { dates: [], data: [], coinName: '' };
          await this.startStream(coinName)
        }
      }
    },
    async setDefaultChart () {
      const { Name } = this.cryptoInfo.flat().find((el,i) => i === 0).CoinInfo;
      this.chartData = await getChartData(Name);
    },
    startStream (name) {
      this.streamOnOpen(name);
      this.streamOnMessage(name);
    },
    streamOnOpen (name) {
      const apiKey = "f9fa984c86c2d934edff8143cb905e0cb38d16a2b1465e567b8cef2a5c00dd67";
      this.ccStreamer = new WebSocket('wss://streamer.cryptocompare.com/v2?api_key=' + apiKey);
      this.ccStreamer.onopen = (function onStreamOpen() {
        const subs = this.isStatic === 'live' ? `5~CCCAGG~${name}~USD` : `24~CCCAGG~${name}~USD~m`
        const subRequest = {
          "action": "SubAdd",
          "subs": [subs]
        };
        this.ccStreamer.send(JSON.stringify(subRequest));
      }).bind(this)
    },
    streamOnMessage (name) {
      this.ccStreamer.onmessage = (function onStreamMessage(event) {
        const message = JSON.parse(event.data);

        const price = this.isStatic === 'live' ? 'PRICE' : 'FIRSTPRICE';
        const time = this.isStatic === 'live' ? 'LASTUPDATE' : 'FIRSTTS'

        if (+message[price] && +message[time]) {
          this.chartData.dates.push(transformDate(message[time]))
          this.chartData.data.push(message[price])
          this.chartData.coinName = name;
        }
      }).bind(this)
    }
  }
}
</script>

<style scoped>
  .main_wrapper {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    background-color: rgba(221,221,221,0.3);
    box-shadow: 0px 0px 6px 1px lightsteelblue;
    padding: 10px;
    border-radius: 90px;
  }
  .chart_wrapper {
    margin: 15px 0 30px;
  }
</style>

