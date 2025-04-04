import React, { useRef, useEffect } from "react";
import ApexCharts from "apexcharts";

const Chart4 = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const options = {
        series: [
          {
            name: "Sales",
            data: [450, 650, 700, 850, 1200, 1500],
            color: "#1E40AF",
          },
        ],
        chart: {
          type: "bar",
          height: 350,
          toolbar: { show: false },
        },
        plotOptions: {
          bar: {
            columnWidth: "50%",
            borderRadius: 4,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          labels: {
            style: {
              fontSize: "12px",
              fontFamily: "Inter, sans-serif",
            },
          },
        },
        yaxis: {
          labels: {
            formatter: (value) => "$" + value,
            style: {
              fontSize: "12px",
              fontFamily: "Inter, sans-serif",
            },
          },
        },
        grid: {
          show: true,
          strokeDashArray: 4,
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
    <div className="w-full h-full bg-neutral-100 rounded-lg shadow-sm dark:bg-neutral-800 p-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Sales Over the Last 6 Months
      </h2>
      <div ref={chartRef}></div>
    </div>
  );
};

export default Chart4;
