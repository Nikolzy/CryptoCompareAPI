<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    historyData: {
      type: Object,
      required: true,
      default () {
        return {
          dates: [],
          data: [],
          coinName: ''
        }
      }
    },
    isStatic: {
      type: String,
      required: true,
      default: 'static'
    }
  },
  data () {
    return {
      chartData: {
        labels: this.historyData.dates,
        datasets: [
          {
            label: this.historyData.coinName,
            data: this.historyData.data,
            fill: false,
            borderColor: '#2554FF',
            backgroundColor: '#2554FF',
            borderWidth: 1
          }
        ]
      },
      options: {
        animation: {
          duration: this.isStatic === 'live' ? 0 : 1000 // general animation time
        },
        scales: {
          yAxes: [{
            gridLines: {
              display: true
            }
          }],
          xAxes: [ {
            display: false,
            gridLines: {
              display: false
            }
          }]
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>