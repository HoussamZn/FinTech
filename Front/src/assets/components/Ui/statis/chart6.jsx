import React, { useRef, useEffect } from "react";
import ApexCharts from "apexcharts";

const Chart6 = () => {
  const chartRef = useRef(null);

  const getChartOptions = () => ({
    chart: {
      height: 250,
      type: "line",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    series: [
      {
        name: "Income",
        data: [0, 27000, 25000, 27000, 40000],
      },
      {
        name: "Outcome",
        data: [19500, 10000, 19000, 17500, 26000],
      },
      {
        name: "Others",
        data: [8000, 2200, 6000, 9000, 10000],
      },
    ],
    colors: ["#2563EB", "#22d3ee", "#d1d5db"],
    stroke: {
      curve: "straight",
      width: [4, 4, 4],
      dashArray: [0, 0, 4],
    },
    grid: {
      strokeDashArray: 0,
      borderColor: "#e5e7eb",
      padding: {
        top: -20,
        right: 0,
      },
    },
    xaxis: {
      type: "category",
      categories: [
        "25 January 2023",
        "28 January 2023",
        "31 January 2023",
        "1 February 2023",
        "3 February 2023",
      ],
      labels: {
        style: {
          colors: "#9ca3af",
          fontSize: "13px",
          fontFamily: "Inter, ui-sans-serif",
        },
      },
    },
    yaxis: {
      min: 0,
      max: 40000,
      tickAmount: 4,
      labels: {
        formatter: (value) => (value >= 1000 ? `${value / 1000}k` : value),
        style: {
          colors: "#9ca3af",
          fontSize: "12px",
          fontFamily: "Inter, ui-sans-serif",
        },
      },
    },
    tooltip: {
      enabled: true,
    },
  });

  useEffect(() => {
    if (chartRef.current) {
      const chart = new ApexCharts(chartRef.current, getChartOptions());
      chart.render();
      return () => chart.destroy();
    }
  }, []);

  return (
    <div className="w-full h-full bg-neutral-100 rounded-lg shadow-sm dark:bg-neutral-800 p-4 flex flex-col justify-evenly">
      <div className="flex justify-between pb-2">
        <div>
          <h5 className="text-3xl font-bold text-gray-900 dark:text-white">$12,423</h5>
          <p className="text-base text-gray-500 dark:text-gray-400">Sales this week</p>
        </div>
        <div className="flex items-center text-green-500 font-semibold">
          23%
          <svg className="w-3 h-3 ml-1" aria-hidden="true" fill="none" viewBox="0 0 10 14">
            <path stroke="currentColor" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4"/>
          </svg>
        </div>
      </div>
      <div ref={chartRef} className="mt-4"></div>
    </div>
  );
};

export default Chart6;
