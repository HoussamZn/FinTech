import React, { useRef, useEffect } from "react";
import ApexCharts from "apexcharts";

const Chart5 = () => {
  const chartRef = useRef(null);

  const getChartOptions = () => ({
    series: [90, 85, 70],
    colors: ["#1C64F2", "#16BDCA", "#FDBA8C"],
    chart: {
      height: "350px",
      width: "100%",
      type: "radialBar",
      sparkline: { enabled: true },
    },
    plotOptions: {
      radialBar: {
        track: { background: "#E5E7EB" },
        dataLabels: { show: false },
        hollow: { margin: 0, size: "32%" },
      },
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: { left: 2, right: 2, top: -23, bottom: -20 },
    },
    labels: ["Done", "In progress", "To do"],
    legend: { show: true, position: "top", fontFamily: "Inter, sans-serif" },
    tooltip: { enabled: true, x: { show: false } },
    yaxis: {
      show: false,
      labels: { formatter: (value) => `${value}%` },
    },
  });

  useEffect(() => {
    if (chartRef.current) {
      const chart = new ApexCharts(chartRef.current, getChartOptions());
      chart.render();

      return () => chart.destroy(); // Nettoyage
    }
  }, []);

  return (
    <div className="w-full h-full bg-neutral-100 rounded-lg shadow-sm dark:bg-neutral-800 p-4 ">
      {/* En-tête */}
      <div className="flex justify-between mb-3">
        <div className="flex items-center">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1">
            Your team's progress
          </h5>
        </div>
      </div>


      {/* Graphique */}
      <div ref={chartRef} className="mt-4"></div>
    </div>
  );
};

export default Chart5;
