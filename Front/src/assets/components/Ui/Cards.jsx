import { FaArrowCircleRight } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { useAuth } from "../../utils/AuthContext";
import { FaPlusCircle } from "react-icons/fa";
import SyncLoader from "react-spinners/SyncLoader";


const GATEAWAY = import.meta.env.VITE_API_GATEAWAY;
const GET_ACCOUNTS = GATEAWAY + "/account/accs";

const Cards = () => {
    const authContext = useAuth();
    const navigate = useNavigate();
    const [accounts, setAccounts] = useState([]);
    const [accountsLoading, setAccountsLoading] = useState(true);
    const [currentCard, setCurrentCard] = useState(0);

    useEffect(() => {
        const fetchAccounts = async () => {
            setAccountsLoading(true);
            await getAccounts();
            setAccountsLoading(false);
        };
        fetchAccounts();
    }, []);

    const getAccounts = async () => {
        const data = { user_id: authContext.user.id };
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
                console.log("Accounts fetched successfully:", data);
                setAccounts(data);
            } else {
                throw new Error(data.detail);
            }
        } catch (error) {
            console.error("Getting accounts failed:", error);
        }
    };

    const switchCard = () => {
        setCurrentCard((prev) => (prev + 1) % accounts.length);
    };
    const creataccount = () => {
        navigate("/dash/Account");
      };
    const current = accounts[currentCard];

    return (
        <div className="w-full h-full bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow-lg p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Cards Account : {current&& current.name}</h3>
                <div className="flex items-center space-x-2">
                    <button onClick={creataccount} className=" p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
                        <FaPlusCircle className="w-6 h-6 text-gray-800 dark:text-white"/>
                    </button>
                    <button onClick={switchCard} className="  p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
                        <FaArrowCircleRight className="w-6 h-6 text-gray-800 dark:text-white" />
                    </button>
                </div>
            </div>
            {!accountsLoading ? (accounts.length !== 0 ?
            <div className={`space-y-4 aspect-[4/2] bg-gradient-to-r ${current.gradient || "from-blue-400 to-purple-500"} rounded-lg p-4 lg:mx-10`}>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Balance</p>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{current.balance}</div>
                <div className="flex items-center space-x-2 text-lg font-mono text-gray-800 dark:text-white">
                    <span className="tracking-widest">**** **** ****</span>
                    <span>{current.account_number.slice(-4)}</span>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Expires</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{current.expire_date}</p>
                    </div>
                    <div className="flex space-x-1">
                        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                        <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    </div>
                </div>
            </div>
            :
            <div className="flex justify-center items-center h-full">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">makayen walo...</h2>
                
            </div>
            )
            :
            <div className="flex justify-center items-center">
                        <SyncLoader color="#4f39f6" size={10} />
                    </div>
            }
        </div>
    );
};

export default Cards;
