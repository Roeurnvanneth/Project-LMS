
<script setup>
import {
  Line
} from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
)

const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [{
    label: 'Earnings',
    data: [0, 9000, 7000, 15000, 11000, 20000, 17000, 25000, 21000, 30000, 26000, 40000],
    fill: true,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderColor: '#3b82f6',
    tension: 0.4,
    pointBackgroundColor: '#3b82f6'
  }]
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false
      
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
}
</script>

<template>
  <Line :data="chartData" :options="chartOptions" />
</template>
