import React, { useEffect,useState } from "react";
import { useAuth } from "../../utils/AuthContext";
import BasicTableOne from "../Ui/BasicTableOne";
import TabComponent from "../Ui/TabComponent";
import SyncLoader from "react-spinners/SyncLoader";
import Alert from "../Ui/Alert";

const GATEAWAY = "http://127.0.0.1:8000/account";
const GET_ACCOUNTS = GATEAWAY + "/accs";
const CREATE_TRANS = GATEAWAY + "/transaction";


export default function Transactions() {
    const authContext = useAuth();
    const [credentials, setCredentials] = useState({amount:0,reason:''});
    const [transactionError, setTransactionError] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);



    const [selectedSender, setSelectedSender] = useState(null);
    const [selectedFav, setSelectedFav] = useState(null);
    

    const [accounts, setAccounts] = useState(null);
    const [accountsLoading, setAccountsLoading] = useState(true);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const transactionSubmit = async (e) => {
        e.preventDefault();
        setTransactionError(null);
        setSubmitLoading(true);
        await transactionCreate(credentials);
        setSubmitLoading(false);
    };

    const transactionCreate = async(credentials) => {
        const updatedCredentials = {
            ...credentials,
            sender_account_id: selectedSender,
            receiver_account_number: selectedFav
        };
        const jsonToSend = JSON.stringify(updatedCredentials);
        console.log(jsonToSend);
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(CREATE_TRANS, {
                method: 'POST',
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                },
                body: jsonToSend,
            });

            const data = await response.json();
            if (response.ok) {
                setTransactionError({type:"success",message:data.message});
            } else {
                setTransactionError({type:"error",message:data.detail});
                throw new Error(data.detail);
            }
        } catch (error) {
            console.error("Update failed:", error);
        }
    }

    

    const handleSenderChange = (fav) => {
        setSelectedSender(fav);
    };

    useEffect(() => {
        const fetchAccounts = async () => {
        setAccountsLoading(true);
        await getAccounts();
        setAccountsLoading(false);
        };

        fetchAccounts();
    }, []);

    const getAccounts = async() => {
        const data ={user_id:authContext.user.id}
        const jsonToSend = JSON.stringify(data); 
        console.log(jsonToSend);
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(GET_ACCOUNTS, {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
            body: jsonToSend,
          });
    
          const data = await response.json();
          
          if (response.ok) {
              setAccounts(data);
              console.log(data);
          } else {
              throw new Error(data.detail);
          }
        } catch (error) {
          console.error("Creation failed:", error);
        }
    }
    
    return (
        <>
        <div className="flex flex-col bg-neutral-100 dark:bg-neutral-800 shadow-md rounded-lg divide-y gap-5 divide-neutral-300 dark:divide-neutral-700">
            {/* sender section*/}
            <div className="flex flex-col gap-5 sm:flex-col p-5 pb-8 sm:p-10">
                {/* left section*/}
                <div className="flex flex-col w-full sm:w-1/3">
                    <h1 className="text-base font-semibold tracking-tight text-balance text-neutral-900 dark:text-neutral-50 ">
                    Sender
                    </h1>
                    <p className=" text-sm font-medium text-pretty text-neutral-400 dark:text-neutral-500">
                    Manage your transactions history.
                    </p>
                </div>
                {/* Right section*/}
                <div className="flex flex-col gap-5">
                    {!accountsLoading ? accounts.map((fav)=>(
                        <div key={fav.id} onClick={() => handleSenderChange(fav.id)}  className={`flex rounded-lg py-2  px-5 cursor-pointer duration-200 shadow-xs  ${selectedSender === fav.id ? ' bg-blue-50 dark:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100 dark:bg-neutral-900/60 dark:hover:bg-neutral-700'} `}>
                            <div className="flex-1">
                                <h1 className={`text-base font-semibold tracking-tight text-balance ${selectedSender === fav.id ? 'text-blue-600 dark:text-blue-500' : 'text-neutral-900 dark:text-neutral-50'} `}>
                                {fav.name}
                                </h1>
                                <p className={` text-sm font-medium text-pretty ${selectedSender === fav.id ? 'text-blue-600/50 dark:text-blue-500/50 ' : 'text-neutral-400 dark:text-neutral-500'}  `}>
                                Account number : {fav.account_number}
                                </p>
                            </div>
                            <div className="flex flex-col justify-center">
                                <p className={` text-sm font-medium text-pretty text-green-600  `}>
                                {fav.balance}$
                                </p>
                            </div>
                        </div>
                    ))
                    :
                    <div className="flex justify-center items-center">
                        <SyncLoader color="#4f39f6" size={10} />
                    </div>
                    }
                </div>
            </div>
            {/* select receiver section*/}
            <div className="flex flex-col gap-5 sm:flex-col p-5 pb-8 sm:p-10">
                {/* left section*/}
                <div className="flex flex-col w-full sm:w-1/3">
                    <h1 className="text-base font-semibold tracking-tight text-balance text-neutral-900 dark:text-neutral-50 ">
                    Receiver
                    </h1>
                    <p className=" text-sm font-medium text-pretty text-neutral-400 dark:text-neutral-500">
                    Manage your transactions history.
                    </p>
                </div>
                {/* Right section*/}
                <TabComponent selectedFav={selectedFav} setSelectedFav={setSelectedFav} />
            </div>
            {/* Transaction info section*/}
            <div className="flex flex-col gap-5 sm:flex-row p-10 pb-8">
                {/* left section*/}
                <div className="flex flex-col w-full sm:w-1/3">
                    <h1 className="text-base font-semibold tracking-tight text-balance text-neutral-900 dark:text-neutral-50 ">
                    Transaction
                    </h1>
                    <p className=" text-sm font-medium text-pretty text-neutral-400 dark:text-neutral-500">
                    Use a permanent address where you can receive mail.
                    </p>
                </div>
                {/* Right section*/}
                <form className="flex-1 flex flex-col gap-5" onSubmit={transactionSubmit}>
                    <div className="flex flex-col gap-5 sm:flex-row">
                        <div className="flex-1">
                        <label htmlFor="amount" className="block text-sm/6 font-medium text-neutral-900 dark:text-neutral-50">
                            Amount
                        </label>
                        <div className="mt-2">
                        <input
                            id="amount"
                            name="amount"
                            type="number"
                            required
                            placeholder="0"
                            className="block w-full rounded-md bg-neutral-200 dark:bg-neutral-900/80 px-3 py-1.5 text-base text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-900/30 dark:placeholder:text-neutral-50/30 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            min="0"
                            step="100"
                            onChange={handleChange}
                            onWheel={(e) => e.target.blur()}
                            onKeyDown={(e) => {
                                if (['e', 'E', '+', '-', '.'].includes(e.key)) {
                                e.preventDefault();
                                }
                            }}
                        />
                        </div>
                        </div>

                        <div className="flex-1">
                        <label htmlFor="reason" className="block text-sm/6 font-medium text-neutral-900 dark:text-neutral-50">
                            Reason
                        </label>
                        <div className="mt-2">
                            <input
                            id="reason"
                            name="reason"
                            type="text"
                            required
                            placeholder="Reason"
                            onChange={handleChange}
                            className="block w-full rounded-md bg-neutral-200 dark:bg-neutral-900/80 px-3 py-1.5 text-base text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-900/30 dark:placeholder:text-neutral-50/30  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                        </div>
                    </div>
                    {transactionError && <Alert variant={transactionError.type} title={transactionError.type} message={transactionError.message} duration={3000} />}
                    {submitLoading && 
                        <div className="flex justify-center items-center">
                            <SyncLoader color="#4f39f6" size={10} />
                        </div>
                    }
                    <div>
                    <button type="submit" className="rounded-md cursor-pointer bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-neutral-50 shadow-xs duration-200 hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Submit 
                    </button>
                    </div>
                </form>
            </div>
            {/* history section*/}
            <div className="flex flex-col gap-5 sm:flex-col p-5 pb-8 sm:p-10">
                {/* left section*/}
                <div className="flex flex-col w-full sm:w-1/3">
                    <h1 className="text-base font-semibold tracking-tight text-balance text-neutral-900 dark:text-neutral-50 ">
                    History
                    </h1>
                    <p className=" text-sm font-medium text-pretty text-neutral-400 dark:text-neutral-500">
                    Manage your transactions history.
                    </p>
                </div>
                {/* Right section*/}
                <BasicTableOne/>
            </div>
        </div>

        </>
    )
}