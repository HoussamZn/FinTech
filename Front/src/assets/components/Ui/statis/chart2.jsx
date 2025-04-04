import React, { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";

const Chart2 = () => {
  const chartRef = useRef(null);
  const [chartSize, setChartSize] = useState(getChartSize());

  function getChartSize() {
    return window.innerWidth < 768 ? 250 : 320;
  }

  useEffect(() => {
    function handleResize() {
      setChartSize(getChartSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function getChartOptions() {
    return {
      series: [44, 55, 41, 17],
      colors: ["#FF9F43", "#1C84FF", "#F39C12", "#F4B400"],
      chart: {
        type: "donut",
        height: chartSize,
        width: "100%",
      },
      stroke: {
        show: false,
      },
      plotOptions: {
        pie: {
          donut: {
            size: "75%",
            labels: {
              show: true,
              total: {
                show: true,
                label: "Total",
              },
            },
          },
        },
      },
      labels: ["Direct", "Referral", "Social", "Organic"],
      legend: {
        position: "bottom",
      },
    };
  }

  useEffect(() => {
    if (chartRef.current) {
      const chart = new ApexCharts(chartRef.current, getChartOptions());
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [chartSize]);

  return (
    <div className="w-full h-full bg-neutral-100 rounded-lg shadow-sm dark:bg-neutral-800 p-4 md:p-6 flex flex-col justify-evenly">
      <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
        Website traffic
      </h5>
      <div ref={chartRef}></div>
    </div>
  );
};

export default Chart2;
