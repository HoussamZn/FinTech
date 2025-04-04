import React, { useRef, useEffect } from "react";
import ApexCharts from "apexcharts";

const Chart1 = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const options = {
        chart: {
          type: "area",
          height: 250,
          toolbar: { show: false },
        },
        series: [
          {
            name: "Developer Edition",
            data: [140, 130, 120, 100, 80, 90, 110],
            color: "#1D4ED8",
          },
          {
            name: "Designer Edition",
            data: [40, 30, 50, 60, 50, 70, 90],
            color: "#8B5CF6",
          },
        ],
        xaxis: {
          categories: ["01 Feb", "02 Feb", "03 Feb", "04 Feb", "05 Feb", "06 Feb"],
          labels: {
            style: { fontSize: "12px", colors: "#6B7280" },
          },
        },
        yaxis: {
          labels: {
            formatter: (value) => `$${value}`,
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
            formatter: (val) => `$${val}`,
          },
        },
        markers: {
          size: 5,
          colors: ["#1D4ED8", "#8B5CF6"],
          strokeColors: "#fff",
          strokeWidth: 2,
        },
      };

      const chart = new ApexCharts(chartRef.current, options);
      chart.render();

      return () => {
        chart.destroy();
      };
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
      <div ref={chartRef} ></div> 
    </div>
  );
};

export default Chart1;
