import { useState } from 'react';
import { FaRegPlusSquare } from "react-icons/fa";
import { AiFillAlert } from "react-icons/ai";

const Subscriptions = () => {
  const [subscriptions] = useState([
    {
      id: 1,
      title: 'Netflix',
      amount: 15.99,
      due_date: 'April 15, 2025',
    },
    {
      id: 2,
      title: 'Spotify',
      amount: 9.99,
      due_date: 'April 20, 2025',
    },
    {
      id: 3,
      title: 'Amazon Prime',
      amount: 12.99,
      due_date: 'April 25, 2025',
    },
  ]);

  return (
    <div className="w-full h-full bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow-lg p-6 flex flex-col">
      {/* En-tête */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Subscriptions</h3>
        <button 
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
          disabled
        >
          <FaRegPlusSquare className="w-6 h-6 text-gray-800 dark:text-white" />
        </button>
      </div>

      {/* Liste des abonnements */}
      <div className="space-y-4">
        {subscriptions.map((subscription) => (
          <div 
            key={subscription.id} 
            className="flex justify-between items-center p-4 bg-gray-900/50 backdrop-blur-md rounded-xl text-white opacity-80"
          >
            <div className="flex items-center space-x-4">
              <AiFillAlert className="w-6 h-6" />
              <p className="text-sm">
                {subscription.title} <span className="text-xs text-gray-300">due {subscription.due_date}</span>
              </p>
            </div>
            <div className="text-lg font-bold">${subscription.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;
