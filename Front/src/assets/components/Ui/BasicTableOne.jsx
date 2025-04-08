import React, { useEffect,useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "./table";
import Badge from "./Badge";
import { useAuth } from "../../utils/AuthContext";
import SyncLoader from "react-spinners/SyncLoader";


const GATEAWAY = "http://127.0.0.1:8000/account";
const GET_TRANSACTIONS = GATEAWAY + "/transactions";

// Define the table data
const tableData = [
  {
    id: 1,
    sender: "Houssam",
    receiver: "Bassam",
    date : "01/01/2025",
    Amount: "3.9K$",
    status: "Pending",
  },
  {
    id: 2,
    sender: "Houssam",
    receiver: "Bassam",
    date : "01/01/2025",
    Amount: "3.9K$",
    status: "Done",
  },
  {
    id: 3,
    sender: "Houssam",
    receiver: "Bassam",
    date : "01/01/2025",
    Amount: "3.9K$",
    status: "Rejected",
  },
  
];

export default function BasicTableOne() {
  const [transactions, setTransactions] = useState(null);
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
      setTransactions(data);
      console.log(data);
      
      if (response.ok) {
      } else {
          throw new Error(data.detail);
      }
    } catch (error) {
      console.error("Creation failed:", error);
    }
  }

  return transactionsLoading ? 
    <div className="flex justify-center items-center">
      <SyncLoader color="#4f39f6" size={10} />
    </div> :
   (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-neutral-50 dark:border-gray-700 dark:bg-neutral-900/20">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-neutral-200/50 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Transaction ID
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Sender
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Receiver
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Date
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Amount
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Receipt
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-neutral-200/50 dark:divide-white/[0.05]">
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start font-medium text-gray-800 text-theme-sm dark:text-white/90">
                {transaction.id}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {transaction.sender_account_id}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {transaction.receier_account_id}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {transaction.transaction_date}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {transaction.amount}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      transaction.state === "DONE"
                        ? "success"
                        : transaction.status === "PENDING"
                        ? "warning"
                        : "error"
                    }
                  >
                    {transaction.state}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <div>
                    <a className="rounded-md cursor-pointer bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-neutral-50 shadow-xs duration-200 hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                        Download
                    </a>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}