<script>
  import { Line } from 'vue-chartjs'

  export default {
    name: "chartjs",
    extends: Line,
    props: {
      title: String,
      node: Object,
      labels: Array,
      datasets: Array
    },
    mounted () {
      this.renderChart({
        labels: this.labels,
        datasets: this.datasets
      }, {responsive: true, maintainAspectRatio: false, title: {display: true, text: this.title}})
    }
  }
</script>
