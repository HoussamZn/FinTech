import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import { FaEthereum } from "react-icons/fa";

const currencies = [
  "eth", "ltc", "bch", "bnb", "eos", "xrp", "xlm", "link", "dot", "yfi",
  "usd", "aed", "ars", "aud", "bdt", "bhd", "bmd", "brl", "cad", "chf", "clp", "cny",
  "czk", "pkr"
];

const Chart1 = () => {
  const [chartData, setChartData] = useState(null);
  const [last, setLast] = useState(0);
  const [currency, setCurrency] = useState("usd");
  const [days, setDays] = useState(1);
  const [timeframe, setTimeframe] = useState('day'); // Default to day
  const [thresholdValue, setThresholdValue] = useState(0); // Added thresholdValue state

  // Mapping timeframe to days
  const timeframeMap = {
    day: 1,
    week: 7,
    month: 30,
    year: 365,
  };

  useEffect(() => {
    const daysToFetch = timeframeMap[timeframe];
    axios.get(`http://localhost:8004/eth-prices/${currency}/${daysToFetch}`)
      .then((response) => {
        const prices = response.data[0];
        const threshold = response.data[1];
        setThresholdValue(threshold); // Set the threshold value from the response

        const values = prices.map(item => (item.price - threshold));
        setLast(values.slice(-1)[0] + threshold);
        const dates = prices.map(item => item.date);

        setChartData({
          series: [{ name: "Ethereum Price", data: values }],
          options: {
            chart: {
              height: 350,
              type: "area",
              zoom: { enabled: true },
            },
            dataLabels: { enabled: false },
            title: { text: " ", align: "left" },
            xaxis: {
              categories: dates,
              labels: { show: false },
              axisTicks: { show: false },
            },
            yaxis: {
              labels: {
                formatter: (value) => `$${(value + threshold).toFixed(2)}`,
              },
            },
            stroke: {
              width: 1,
              curve: "smooth",
              colors: ['#00ff00'],
            },
            plotOptions: {
              line: {
                colors: {
                  threshold: 0,
                  colorAboveThreshold: '#B7EED9',
                  colorBelowThreshold: '#FAD0D2',
                },
              },
            },
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
              y: {
                formatter: (val) => `$${(val + threshold).toFixed(2)}`,
              },
            },
            markers: { size: 0.2 },
            annotations: {
              yaxis: [
                {
                  y: 0,
                  borderColor: "#FF0000",
                  strokeDashArray: 2,
                  label: {
                    text: `${threshold.toFixed(2)}$`,
                    style: {
                      color: "#FF0000",
                      background: "#979DA8aa",
                    },
                  },
                },
              ],
            },
          },
        });
      })
      .catch((error) => {
        console.error("Failed to load ETH prices:", error);
      });
  }, [currency, timeframe]);

  return (
    <div className="w-full h-full bg-neutral-100 rounded-lg shadow-sm dark:bg-neutral-800 p-4 xl:flex flex-col justify-between xl:justify-center">
      <div className="flex flex-col space-y-4 pb-2 xl :flex xl:flex-row xl:justify-between xl:space-y-0">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center">
            <FaEthereum size={32} />
            <h5 className="text-3xl font-bold text-gray-900 dark:text-white">Ethereum</h5>
          </div>
          <span
            className={`bg-green-100 text-xs font-medium inline-flex items-center px-3 py-2 rounded-md xl:ml-0.5
              ${last > thresholdValue ? "text-green-800 dark:text-green-300 bg-green-100" : "text-red-800 dark:text-red-300 bg-red-100"}`}
          >
            
             {last > thresholdValue ? (
              <svg
                className="w-2.5 h-2.5 me-1.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13V1m0 0L1 5m4-4 4 4"
                />
              </svg>
            ) : (
              <svg
                className="w-2.5 h-2.5 me-1.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
              )}
            {last.toFixed(2)}
          </span>
        </div>

        <div className="flex text-xs  xl:text-base flex-row items-center space-x-1 justify-between">
          <div className="flex flex-col xl:flex-row justify-between items-start lg:items-center gap-2">
            <select
              className="border border--indigo-600 dark:border-indigo-600 text-indigo-600 dark:text-green-100 bg-white dark:bg-indigo-600 rounded-lg px-2 py-1  focus:outline-none focus:ring-2 focus:ring--indigo-600 transition duration-200"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              {currencies.map((cur) => (
                <option key={cur} value={cur} className="">
                  Currency: {cur.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <div className="flex rounded-md overflow-hidden border border-indigo-600">
              {["day", "week", "month", "year"].map((period) => (
                <button
                  key={period}
                  className={`py-1 px-2 ${timeframe === period ? "bg-indigo-600 text-white" : "bg-white text-indigo-600"}`}
                  onClick={() => setTimeframe(period)}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {chartData ? (
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="area"
          height={350}
        />
      ) : (
        <div className="flex justify-center items-center h-[350px] text-gray-500 dark:text-gray-300">
          Loading chart...
        </div>
      )}
    </div>
  );
};

export default Chart1;
