import { FaArrowCircleRight } from "react-icons/fa";
import { useState } from "react";


const Cards = () => {
    const cardData = [
        {
            balance: "$22,000",
            lastDigits: "1234",
            expiry: "12/22",
            gradient: "from-cyan-400 to-indigo-700"
        },
        {
            balance: "$15,500",
            lastDigits: "5678",
            expiry: "06/24",
            gradient: "from-green-400 to-blue-700"
        }
    ];

    const [currentCard, setCurrentCard] = useState(0);

    const switchCard = () => {
        setCurrentCard((prev) => (prev + 1) % cardData.length);
    };
  return (
    <div className="w-full h-full bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow-lg p-6 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Cards</h3>
            <button onClick={switchCard} className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
                <FaArrowCircleRight className="w-6 h-6 text-gray-800 dark:text-white" />
            </button>
        </div>
        <div className={`space-y-4 bg-gradient-to-r ${cardData[currentCard].gradient} rounded-lg p-4`}>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Balance</p>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{cardData[currentCard].balance}</div>
            <div className="flex items-center space-x-2 text-lg font-mono text-gray-800 dark:text-white">
                <span className="tracking-widest">**** **** ****</span>
                <span>{cardData[currentCard].lastDigits}</span>
            </div>
            <div className="flex justify-between items-center mt-4">
                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Expires</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{cardData[currentCard].expiry}</p>
                </div>
                <div className="flex space-x-1">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                </div>
            </div>
        </div>
    </div>

  )
}

export default Cards