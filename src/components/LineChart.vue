<script>
import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Array || Object,
      required: false
    },
    chartLabels: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        },
        legend: {
          display: false
        },
        responsive: true,
        animation: {
          // duration: 10,
          easing: 'easeOutQuad'
        },
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Harvest'
        }
      }
    }
  },
  mounted() {
    this.renderChart(
      {
        labels: this.chartLabels,
        datasets: [
          {
            label: 'Quantity',
            borderColor: '#FFA500',
            pointBackgroundColor: 'black',
            borderWidth: 1,
            pointBorderColor: '#FFA500',
            backgroundColor: '#FFA500',
            data: this.chartData
          }
        ]
      },
      this.options
    )
  }
}
</script>
