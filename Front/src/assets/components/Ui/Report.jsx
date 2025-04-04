import { useState } from "react";
import Chart from "react-apexcharts";

const Report = () => {
  const [chartData] = useState({
    series: [
      {
        name: "Value 1",
        data: [40, 55, 75, 60, 90, 100], // Valeurs fictives
      },
      {
        name: "Value 2",
        data: [20, 45, 65, 50, 80, 95],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        toolbar: { show: false },
      },
      colors: ["#6366F1", "#A855F7"], // Indigo & Purple
      plotOptions: {
        bar: { horizontal: false, columnWidth: "50%" },
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], // Mois fictifs
      },
    },
  });

  return (
    <div className="w-full bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Report</h3>
        <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
          ➕
        </button>
      </div>
      <Chart options={chartData.options} series={chartData.series} type="bar" height={350} />
    </div>
  );
};

export default Report;
