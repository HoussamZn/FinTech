import React from 'react';
import { useState,useEffect } from "react";
import { useAuth } from "../../utils/AuthContext";
import Chart1 from '../Ui/statis/chart1';
import Chart2 from '../Ui/statis/chart2';
import Web3 from 'web3';
import Alert from '../Ui/Alert';
import SyncLoader from 'react-spinners/SyncLoader';

const GATEAWAY = "http://127.0.0.1:8000/user";
const UPDATE_WALLET = GATEAWAY + "/addwallet";

const Statistics = () => {
  const [walletError, setWalletlError] = useState(null);
  const [walletLoading, setWalletLoading] = useState(false);

  const authContext = useAuth();
  const [account, setAccount] = useState('');
  const [txHash, setTxHash] = useState('');
  const [credentials, setCredentials] = useState({receiver:"",amount:""});

  useEffect(() => {
      setAccount(authContext.user.wallet);
  }, [authContext.user]);


  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }; 

  const walletUpdate = async(acc) => {
    const send = {
      "wallet":acc,
      "id":authContext.user.id
    }
    const jsonToSend = JSON.stringify(send); 
    console.log(jsonToSend);
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(UPDATE_WALLET, {
            method: 'PUT',
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
            body: jsonToSend,
        });

        const data = await response.json();
        if (response.ok) {
          setWalletlError({type:"success",message:data.message});
        } else {
          setWalletlError({type:"error",message:data.detail});
          throw new Error(data.detail);
        }
    } catch (error) {
        console.error("Update failed:", error);
    }
  }

  const connectWallet = async () => {
    if (window.ethereum) {
      setWalletLoading(true);
      const web3 = new Web3(window.ethereum);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      await walletUpdate(accounts[0]);
      setWalletLoading(false);
    } else {
      setWalletlError({type:"error",message:"MetaMask not detected"});
    }
  };

  const sendTransaction = async (e) => {
    e.preventDefault();
    setWalletlError(null);
    if (!window.ethereum) return setWalletlError({type:"error",message:"Install MetaMask"});

    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();

    const txParams = {
      from: accounts[0],
      to: credentials.receiver,
      value: web3.utils.toWei(credentials.amount, 'ether')
    };

    try {
      const tx = await web3.eth.sendTransaction(txParams);
      setTxHash(tx.transactionHash);
    } catch (err) {
      console.error(err);
      setWalletlError({type:"error",message:"Recheck the inserted wallet adress !"});
    }
  };
  

  return (
    <div >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="w-full sm:h-full lg:col-span-3">
          <Chart1 />
        </div>
        <div className="w-full sm:h-full">
          <Chart2 />
        </div>
      </div>
      <div className="flex flex-col bg-neutral-100 dark:bg-neutral-800 shadow-md rounded-lg divide-y gap-5 divide-neutral-300 dark:divide-neutral-700 mt-3">
        <div className="flex flex-col gap-5 sm:flex-row p-10 pb-8">
          {/* left section*/}
          <div className="flex flex-col w-full sm:w-1/3">
              <h1 className="text-base font-semibold tracking-tight text-balance text-neutral-900 dark:text-neutral-50 ">
              Blockchain Transaction
              </h1>
              <p className=" text-sm font-medium text-pretty text-neutral-400 dark:text-neutral-500">
              Make Ethereum transaction with your metamask wallet
              </p>
          </div>
          {/* Right section*/}
          <form onSubmit={sendTransaction} className="flex-1 flex flex-col gap-5" >
              <div className="flex flex-col gap-5 sm:flex-row">
                  <div className="flex-1">
                  <label htmlFor="receiver" className="block text-sm/6 font-medium text-neutral-900 dark:text-neutral-50">
                    Wallet address
                  </label>
                  <div className="mt-2">
                      <input
                      id="receiver"
                      name="receiver"
                      type="text"
                      required
                      placeholder="Receiver"
                      onChange={handleChange}
                      className="block w-full rounded-md bg-neutral-200 dark:bg-neutral-900/80 px-3 py-1.5 text-base text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-900/30 dark:placeholder:text-neutral-50/30  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                  </div>
                  </div>
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
                      placeholder="Amount"
                      onChange={handleChange}
                      onWheel={(e) => e.target.blur()}
                      onKeyDown={(e) => {
                          if (['e', 'E', '+', '-'].includes(e.key)) {
                          e.preventDefault();
                          }
                      }}
                      className="block w-full rounded-md bg-neutral-200 dark:bg-neutral-900/80 px-3 py-1.5 text-base text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-900/30 dark:placeholder:text-neutral-50/30  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                  </div>
                  </div>
              </div>
              {walletError && <Alert variant={walletError.type} title={walletError.type} message={walletError.message} duration={3000} />}
              {walletLoading && 
                  <div className="flex justify-center items-center">
                      <SyncLoader color="#4f39f6" size={10} />
                  </div>
              }
              <div>
              <div className='flex flex-row justify-between'>
                <button disabled={!account}  type="submit" className="rounded-md cursor-pointer bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-neutral-50 shadow-xs duration-200 hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Submit 
                </button>
                {!account ? 
                <button onClick={connectWallet} className="rounded-md cursor-pointer bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-neutral-50 shadow-xs duration-200 hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Connect 
                </button>
                :
                <div className="rounded-md cursor-pointer bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-neutral-50 shadow-xs duration-200 hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Wallet Connected
                </div>
                }
              </div>
              </div>
          </form>
      </div>
    </div>

    </div>
  );
};

export default Statistics;