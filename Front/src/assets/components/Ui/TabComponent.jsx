import React, { useState } from 'react';

const favs = [
    {
        name:'Housam Zitan',
        account : '514641864848484',
    },
    {
        name:'bassam zotia',
        account : '514641864848484',
    },
    {
        name:'Housam ziii',
        account : '514641864848484',
    },
]

const TabComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Favorites');
  const [selectedFav, setSelectedFav] = useState('');

  const handleFavChange = (fav) => {
    setSelectedFav(fav);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full bg-neutral-50 border border-gray-200 rounded-lg dark:bg-neutral-900/20 dark:border-gray-700">
      {/* Mobile select */}
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">Select tab</label>
        <select
          id="tabs"
          className="bg-gray-50 border-0 border-b border-gray-200 text-gray-900 text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={activeTab}
          onChange={(e) => handleTabChange(e.target.value)}
        >
          <option value="Favorites">Favorites</option>
          <option value="Add new">Add new</option>
        </select>
      </div>

      {/* Desktop tabs */}
      <ul className="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-gray-400 rtl:divide-x-reverse" role="tablist">
        <li className="w-full">
          <button
            id="stats-tab"
            type="button"
            role="tab"
            aria-controls="Favorites"
            aria-selected={activeTab === 'Favorites'}
            className={`inline-block w-full p-4 rounded-tl-lg ${activeTab === 'Favorites' ? 'text-blue-600 bg-blue-50 dark:bg-gray-700 dark:text-blue-500' : 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600'} focus:outline-none`}
            onClick={() => handleTabChange('Favorites')}
          >
            Favorites
          </button>
        </li>
        <li className="w-full">
          <button
            id="about-tab"
            type="button"
            role="tab"
            aria-controls="Add new"
            aria-selected={activeTab === 'Add new'}
            className={`inline-block w-full rounded-tr-lg p-4 ${activeTab === 'Add new' ? 'text-blue-600 bg-blue-50 dark:bg-gray-700 dark:text-blue-500' : 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600'} focus:outline-none`}
            onClick={() => handleTabChange('Add new')}
          >
            Add new
          </button>
        </li>
      </ul>

      {/* Tab content */}
      <div className="border-t border-gray-200 dark:border-gray-600">
        {/* Add new Tab */}
        <div
          className={`p-4 rounded-lg md:p-8 ${activeTab !== 'Add new' && 'hidden'}`}
          id="stats"
          role="tabpanel"
          aria-labelledby="stats-tab"
        >
            <div className="flex-1 flex flex-col gap-10">
                <div className="flex flex-col gap-5 sm:flex-row">
                    <div className="flex-1">
                    <label htmlFor="name" className="block text-sm/6 font-medium text-neutral-900 dark:text-neutral-50">
                        Account number
                    </label>
                    <div className="mt-2">
                        <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="151qzd5151"
                        className="block w-full rounded-md bg-neutral-200 dark:bg-neutral-900/80 px-3 py-1.5 text-base text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-900/30 dark:placeholder:text-neutral-50/30  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>
                    </div>

                    <div className="flex-1">
                    <label htmlFor="name" className="block text-sm/6 font-medium text-neutral-900 dark:text-neutral-50">
                        Full name
                    </label>
                    <div className="mt-2">
                        <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Houssam z"
                        className="block w-full rounded-md bg-neutral-200 dark:bg-neutral-900/80 px-3 py-1.5 text-base text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-900/30 dark:placeholder:text-neutral-50/30  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>
                    </div>
                </div>

                <div>
                <a className="rounded-md cursor-pointer bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-neutral-50 shadow-xs duration-200 hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Add 
                </a>
                </div>
            </div>
        </div>

        {/* Favorite Tab */}
        <div
        className={`flex flex-col gap-5 p-4 rounded-lg md:p-8 ${activeTab !== 'Favorites' && 'hidden'}`}
        id="stats"
        role="tabpanel"
        aria-labelledby="stats-tab"
        >
        {/* Search Input */}
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
            </div>
            <input
            type="text"
            placeholder="Search favorites..."
            className="block w-full rounded-lg py-3 pl-10 pr-4 text-base bg-gray-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>

        {/* Favorites */}
        {favs
            .filter(fav => 
            fav.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            fav.account.toString().includes(searchQuery)
            )
            .map((fav) => (
            <div 
                key={fav.account}
                onClick={() => handleFavChange(fav.name)}  
                className={`rounded-lg py-2 px-5 cursor-pointer duration-200 shadow-xs ${
                selectedFav === fav.name 
                    ? 'bg-blue-50 dark:bg-gray-700' 
                    : 'bg-gray-50 hover:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700'
                }`}
            >
                <h1 className={`text-base font-semibold tracking-tight text-balance ${
                selectedFav === fav.name 
                    ? 'text-blue-600 dark:text-blue-500' 
                    : 'text-neutral-900 dark:text-neutral-50'
                }`}>
                {fav.name}
                </h1>
                <p className={`text-sm font-medium text-pretty ${
                selectedFav === fav.name 
                    ? 'text-blue-600/50 dark:text-blue-500/50' 
                    : 'text-neutral-400 dark:text-neutral-500'
                }`}>
                Account number: {fav.account}
                </p>
            </div>
            ))}
        </div>
        
      </div>
    </div>
  );
};

export default TabComponent;