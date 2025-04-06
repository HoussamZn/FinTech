import React, { useRef, useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import axios from "axios";

const Chart1 = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/eth-prices")
      .then(response => {
        const prices = response.data;

        // Reformat data for ApexCharts
        const dates = prices.map(item => item.date);
        const values = prices.map(item => item.price);

        const options = {
          chart: {
            type: "area",
            height: 250,
            toolbar: { show: false },
          },
          series: [
            {
              name: "Ethereum Price",
              data: values,
              color: "#1D4ED8",
            }
          ],
          xaxis: {
            categories: dates,
            labels: {
              style: { fontSize: "12px", colors: "#6B7280" },
            },
          },
          yaxis: {
            labels: {
              formatter: (value) => `$${value.toFixed(2)}`,
              style: { fontSize: "12px", colors: "#6B7280" },
            },
          },
          dataLabels: { enabled: false },
          stroke: { width: 3, curve: "smooth" },
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.8,
              opacityTo: 0.05,
              stops: [0, 100],
            },
          },
          tooltip: {
            theme: "light",
            y: {
              formatter: (val) => `$${val.toFixed(2)}`,
            },
          },
          markers: {
            size: 5,
            colors: ["#1D4ED8"],
            strokeColors: "#fff",
            strokeWidth: 2,
          },
        };

        if (chartRef.current) {
          const chart = new ApexCharts(chartRef.current, options);
          chart.render();

          return () => chart.destroy(); // Clean up
        }
      })
      .catch(error => {
        console.error("Failed to load ETH prices:", error);
      });
  }, []);

  return (
    <div className="w-full h-full bg-neutral-100 rounded-lg shadow-sm dark:bg-neutral-800 p-4 flex flex-col justify-evenly">
      <div className="flex justify-between pb-2">
        <div>
          <h5 className="text-3xl font-bold text-gray-900 dark:text-white">$ETH</h5>
          <p className="text-base text-gray-500 dark:text-gray-400">Last 30 Days</p>
        </div>
        <div className="flex items-center text-green-500 font-semibold">
          30j
          <svg className="w-3 h-3 ml-1" aria-hidden="true" fill="none" viewBox="0 0 10 14">
            <path stroke="currentColor" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4"/>
          </svg>
        </div>
      </div>
      <div ref={chartRef}></div>
    </div>
  );
};

export default Chart1;
