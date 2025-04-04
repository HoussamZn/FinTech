import { useState } from 'react';
import { IoPersonSharp } from "react-icons/io5";
import { IoIosArrowDropdown } from "react-icons/io";

const Transaction = () => {
  const [transactions] = useState([
    {
      id: 1,
      title: 'Hanaa Belaid',
      amount: 150.99,
      due_date: 'April 15, 2025',
    },
    {
      id: 2,
      title: 'Meriem Belaid',
      amount: 90.99,
      due_date: 'April 20, 2025',
    },
    {
      id: 3,
      title: 'Yassine Belaid',
      amount: 120.99,
      due_date: 'April 25, 2025',
    },
  ]);

  return (
    <div className="w-full h-full bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow-lg p-6 flex flex-col">
      {/* En-tête */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Transactions</h3>
        <button 
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
          disabled
        >
          <IoIosArrowDropdown className="w-6 h-6 text-gray-800 dark:text-white" />
        </button>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div 
            key={transaction.id} 
            className="flex justify-between items-center p-4 bg-gray-900/50 backdrop-blur-md rounded-xl text-white opacity-80"
          >
            <div className="flex items-center space-x-4">
              <IoPersonSharp className="w-6 h-6" />
              <p className="text-sm">
                {transaction.title} <span className="text-xs text-gray-300">due {transaction.due_date}</span>
              </p>
            </div>
            <div className="text-lg font-bold text-red-600">${transaction.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transaction;
