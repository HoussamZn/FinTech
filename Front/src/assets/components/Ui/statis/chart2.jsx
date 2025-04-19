import React ,{ useEffect, useState } from "react";
import axios from "axios";

const EUTHPRICE = import.meta.env.VITE_API_EUTHPRICE;

const Chart2 = () => {
  const [ethStats, setEthStats] = useState(null);
  useEffect(() => {
    axios.get(EUTHPRICE + "/eth-stats") 
      .then((response) => {
        setEthStats(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des statistiques Ethereum :", error);
      });
  }, []);
  return (
    <div className="w-full h-full bg-neutral-100 rounded-lg shadow-sm dark:bg-neutral-800 p-4 md:p-6 flex flex-col justify-evenly">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        Ethereum Statistics
      </h2>

      {ethStats ? (
        <div className="flex flex-col sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-800 dark:text-gray-100">
          {Object.entries(ethStats).map(([key, value]) => (
            <div
              key={key}
              className="p-4 bg-white dark:bg-neutral-700 rounded-lg shadow text-sm"
            >
              <p className="font-medium text-gray-500 dark:text-gray-300 mb-1">{key}</p>
              <p className="xl:text-base font-bold">
                {typeof value === "number"
                  ? (key.toLowerCase().includes("supply") ? `${value.toLocaleString()} ETH` : `$${value.toLocaleString()}`)
                  : value}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">Loading statistics...</p>
      )}
    </div>
  );
};

export default Chart2;
