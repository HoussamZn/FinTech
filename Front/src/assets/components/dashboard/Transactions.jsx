import BasicTableOne from "../Ui/BasicTableOne"
import TabComponent from "../Ui/TabComponent"
import React, { useState } from 'react';

const accounts = [
    {
        name:'Housam Zitan',
        account : '514641864848484',
        balance : '200.00'
    },
    {
        name:'bassam zotia',
        account : '514641864848484',
        balance : '200.00'
    },
    {
        name:'Housam ziii',
        account : '514641864848484',
        balance : '200.00'
    },
]

export default function Transactions() {
    const [selectedSender, setSelectedSender] = useState('');

    const handleSenderChange = (fav) => {
        setSelectedSender(fav);
    };
    
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
                    {accounts.map((fav)=>(
                        <div onClick={() => handleSenderChange(fav.name)}  className={`flex rounded-lg py-2  px-5 cursor-pointer duration-200 shadow-xs  ${selectedSender === fav.name ? ' bg-blue-50 dark:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100 dark:bg-neutral-900/60 dark:hover:bg-neutral-700'} `}>
                            <div className="flex-1">
                                <h1 className={`text-base font-semibold tracking-tight text-balance ${selectedSender === fav.name ? 'text-blue-600 dark:text-blue-500' : 'text-neutral-900 dark:text-neutral-50'} `}>
                                {fav.name}
                                </h1>
                                <p className={` text-sm font-medium text-pretty ${selectedSender === fav.name ? 'text-blue-600/50 dark:text-blue-500/50 ' : 'text-neutral-400 dark:text-neutral-500'}  `}>
                                Account number : {fav.account}
                                </p>
                            </div>
                            <div className="flex flex-col justify-center">
                                <p className={` text-sm font-medium text-pretty text-green-600  `}>
                                {fav.balance}$
                                </p>
                            </div>
                        </div>
                    ))}
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
                <TabComponent/>
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
                <div className="flex-1 flex flex-col gap-10">
                    <div className="flex flex-col gap-5 sm:flex-row">
                        <div className="flex-1">
                        <label htmlFor="name" className="block text-sm/6 font-medium text-neutral-900 dark:text-neutral-50">
                            Amount
                        </label>
                        <div className="mt-2">
                        <input
                            id="name"
                            name="name"
                            type="number"
                            required
                            placeholder="Amount"
                            className="block w-full rounded-md bg-neutral-200 dark:bg-neutral-900/80 px-3 py-1.5 text-base text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-900/30 dark:placeholder:text-neutral-50/30 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            min="0"
                            step="100"
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
                        <label htmlFor="name" className="block text-sm/6 font-medium text-neutral-900 dark:text-neutral-50">
                            Reason
                        </label>
                        <div className="mt-2">
                            <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            placeholder="Reason"
                            className="block w-full rounded-md bg-neutral-200 dark:bg-neutral-900/80 px-3 py-1.5 text-base text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-900/30 dark:placeholder:text-neutral-50/30  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                        </div>
                    </div>
                    <div>
                    <a className="rounded-md cursor-pointer bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-neutral-50 shadow-xs duration-200 hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Submit 
                    </a>
                    </div>
                </div>
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