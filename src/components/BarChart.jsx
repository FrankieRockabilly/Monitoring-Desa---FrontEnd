import { useEffect, useState } from 'react'
import axios from 'axios'

// Import Chart.js dan react-chartjs-2
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'


// Daftarkan components yang dipakai ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const BarChart = () => {
  const [chartData, setChartData] = useState(null)

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/program', { withCredentials: true })
      const data = response.data

      // Buat array 12 bulan (index 0 = Januari)
      const bulanLabels = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
      ]

      // Inisialisasi array untuk hitung jumlah laporan per bulan
      const jumlahPerBulan = new Array(12).fill(0)

      data.forEach(item => {
        if (item.tanggal) {
          const monthIndex = new Date(item.tanggal).getMonth() // 0-11
          jumlahPerBulan[monthIndex] += 1
        }
      })

      // Set data chart
      setChartData({
        labels: bulanLabels,
        datasets: [
          {
            label: "Jumlah Program per Bulan",
            data: jumlahPerBulan,
            backgroundColor: 'rgba(100, 180, 100, 0.6)',
            barThickness: 60,      // tebal bar dalam pixel (ubah sesuai kebutuhan)
            maxBarThickness: 50 ,   // maksimal tebal bar
            borderRadius : 5
          }
        ]

      })

    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  if (!chartData) return <div>Loading chart...</div>

  return (
    <div className='w-full h-full flex justify-between items-start gap-5 p-5'>
      <div className='w-full border '>
        {/* <h2>Bar Chart Jumlah Program per Bulan</h2> */}
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: {
                display: true,
                text: 'Jumlah Program yang Dilaporkan per Bulan'
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1
                }
              }
            }
          }}
        />
      </div>
      
    </div>
  )
}

export default BarChart
