import { useState, useEffect } from 'react';
import { IoPersonSharp } from "react-icons/io5";
import SyncLoader from "react-spinners/SyncLoader";
import { useAuth } from "../../utils/AuthContext";

const GATEAWAY = import.meta.env.VITE_API_GATEAWAY;
const GET_TRANSACTIONS = GATEAWAY + "/account/transactions";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionsLoading, setTransactionsLoading] = useState(true);
  const authContext = useAuth();

  useEffect(() => {
      const fetchTransactions = async () => {
      setTransactionsLoading(true);
      await getTransactions();
      setTransactionsLoading(false);
      };
  
      fetchTransactions();
    }, []);
  
    const getTransactions = async() => {
      const data ={user_id:authContext.user.id}
      const jsonToSend = JSON.stringify(data); 
      console.log(jsonToSend);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(GET_TRANSACTIONS, {
          method: 'POST',
          headers: { 
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}` 
          },
          body: jsonToSend,
        });
  
        const data = await response.json();
        
        if (response.ok) {
          const data_ = data.slice(0, 3);
          setTransactions(data_);
        } else {
            throw new Error(data.detail);
        }
      } catch (error) {
        console.error("getting transaction failed:", error);
      }
    };

  return (
    <div className="w-full h-full bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow-xl p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">Transactions History</h3>
        
      </div>

    
      {transactionsLoading ? (
          <div className="flex h-full flex-col justify-center items-center">
            <SyncLoader color="#4f39f6" size={10} />
          </div>
      ) : transactions.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300 italic">No transactions found.</p>
      ) : (
        <div className="space-y-4 overflow-y-auto">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex justify-between items-center p-4 bg-indigo-100/60 dark:bg-neutral-900/60 backdrop-blur-md rounded-xl text-white"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-sm">
                  <IoPersonSharp className="w-5 h-5 text-gray-400 dark:text-amber-50" />
                  <span className="font-medium text-gray-400 dark:text-amber-50">{transaction.sender_account_id} → {transaction.receier_account_id}</span>
                </div>
                <div className="text-xs text-gray-400 dark:text-amber-50">
                  {transaction.transaction_date} • {transaction.transaction_type}
                </div>
              </div>
              <div className="text-lg font-bold text-red-400">${transaction.amount}</div>
            </div>
          ))}
        </div>
      )}
    </div>

  );
};

export default Transaction;
