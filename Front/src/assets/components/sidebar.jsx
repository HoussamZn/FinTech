import { useState,useEffect } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { IoHomeSharp } from "react-icons/io5";
import { Link ,useLocation} from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import ThemeSwitch from './Ui/themeSwitch'
import { useAuth } from "../utils/AuthContext";


import { LuBox } from "react-icons/lu"; 

import { IoSettingsOutline } from "react-icons/io5";
import { TbTransactionBitcoin } from "react-icons/tb";
import { GoBell } from "react-icons/go";
import { TbPresentationAnalytics } from "react-icons/tb";

import logo from "../images/logo.png";


const navigation = [
  { name: 'Dashboard', href: '/dash' },
  { name: 'Statistics', href: '/dash/statis' },
  { name: 'Transactions', href: '/dash/transactions' },
  { name: 'Setting', href: '/dash/settings' },
]

const SIDEBAR_LINKS = [
  { id: 1, path: "/dash", name: "Dashboard", icon: LuBox }, 
  { id: 2, path: "/dash/statis", name: "Statistics", icon: TbPresentationAnalytics }, 
  { id: 3, path: "/dash/transactions", name: "Transaction", icon: TbTransactionBitcoin }, 
  { id: 5, path: "/dash/settings", name: "Settings", icon: IoSettingsOutline }, 
];

export default function SideBar({side,setSide}) {
  const authContext = useAuth();
  const [activeLink, setActiveLink] = useState(-1);
  const location = useLocation(); // <-- Hook to get current location

  // Effect to set the active link based on the current URL path
  useEffect(() => {
    const currentPath = location.pathname;
    const activeIndex = SIDEBAR_LINKS.findIndex(link => link.path === currentPath);
    setActiveLink(activeIndex !== -1 ? activeIndex : 0); // Default to 0 if not found
  }, [location]);

  const handleActiveLink = (index) => {
      setActiveLink(index);
  };

  function closeSide() {
    setSide(false);
  }

  const handleLogout = async (e) => {
    e.preventDefault();
    await authContext.logout();
    navigate("/"); // Redirect on successful login
  };

  return(
    <>
    {/* Large screen sidebar */}
    <div className={`hidden z-50 flex-col sticky top-0 left-0 min-h-screen w-64 bg-neutral-100 dark:bg-neutral-900 bg-opacity-100 text-neutral-900 dark:text-neutral-50 p-5  justify-between transform transition-transform duration-300 lg:flex shadow-md`}>
      {/* logo */}
      <div className="flex mb-10 justify-center">
        <a href="/">
          <img  src={logo} alt="logo" className="w-15 hidden md:flex duration-1000 hover:rotate-360" />
          <img  src={logo} alt="logo" className="w-8 flex md:hidden" />
        </a>
      </div>

      {/* Items */}
      <div className='flex flex-1 flex-col justify-between'>
      {/* top section */}
      <ul className="space-y-6">
          {SIDEBAR_LINKS.map((link, index) => (
              <li 
              key={index} 
              className={`font-medium rounded-md py-2 px-5 duration-200 ${activeLink === index ? "bg-indigo-100 dark:bg-indigo-400" : "hover:bg-gray-200 dark:hover:bg-gray-800 "}`}
              >
                  <Link to={link.path} className="flex justify-center md:justify-start items-center md:space-x-5 text-gray-600 dark:text-gray-200" 
                    onClick={() => handleActiveLink(index)}>
                    <span>{link.icon()}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-300 hidden md:flex">{link.name}</span>
                  </Link>
              </li>
          ))}
      </ul>
      
      {/* logout section (bottom) */}
      <ul>
        <li onClick={handleLogout}
          className={`font-medium rounded-md py-2 px-5 duration-200 hover:bg-gray-200 dark:hover:bg-gray-800 `}>
          <Link  className="flex justify-center md:justify-start items-center md:space-x-5 text-gray-600 dark:text-gray-200" >
              <FiLogOut size={20} />
              <span className="text-sm text-gray-500 dark:text-gray-300 hidden md:flex">Logout</span>
          </Link>
        </li>
      </ul>

      </div>
    </div>


    {/* mobile navbar dialog */}
    <Dialog open={side} onClose={() => setSide(false)} className='lg:hidden'>
    <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed flex flex-col inset-y-0 right-0 z-50 w-full overflow-y-auto bg-neutral-100/80 dark:bg-neutral-900/80 backdrop-blur-2xl px-6 py-6 sm:max-w-sm shadow-md">
            {/* header */}
            <div className="flex items-center justify-between">
                {/* logo button */}
                <a href="#" className="-m-1.5 p-1.5">
                    <span className="sr-only">Your Company</span>
                    <img
                        alt=""
                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                        className="h-8 w-auto"
                    />
                </a>
                {/* close button */}
                <button
                    type="button"
                    onClick={closeSide}
                    className="-m-2.5 rounded-md p-2.5 text-neutral-900 dark:text-neutral-50 duration-200 hover:text-indigo-600 hover:-translate-y-0.5"
                >
                    <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
            </div>

            {/* Content */}
            <div className='flex flex-1 mt-6 flex-wrap flex-col justify-between '>
                {/* top side */}
                <div className="-my-6 divide-y divide-neutral-900/30 dark:divide-neutral-50/30">
                    {/* items */}
                    <div className="space-y-2 py-6">
                      {SIDEBAR_LINKS.map((link, index) => (
                        <a
                        key={index}
                        href={link.path}
                        className="-mx-3 flex justify-center rounded-lg px-3 py-2 text-base/7 font-semibold duration-200 text-neutral-900 dark:text-neutral-50 hover:text-indigo-600 hover:-translate-y-0.5"
                        >
                        {link.name}
                        </a>
                      ))}

                      <a
                        href="/dash"
                        className="-mx-3 flex justify-center rounded-lg px-3 py-2 text-base/7 font-semibold duration-200 text-neutral-900 dark:text-neutral-50 hover:text-indigo-600 hover:-translate-y-0.5"
                        >
                        Profile
                      </a>

                      <a
                        href="/dash"
                        className="-mx-3 flex justify-center rounded-lg px-3 py-2 text-base/7 font-semibold duration-200 text-neutral-900 dark:text-neutral-50 hover:text-indigo-600 hover:-translate-y-0.5"
                        >
                        Notification
                      </a>
                    </div>

                    {/* Login button */}
                    <div className="py-6">
                        <a
                            onClick={handleLogout}
                            className="-mx-3 flex justify-center rounded-lg text-base/7 font-semibold duration-200 text-neutral-900 dark:text-neutral-50 hover:text-indigo-600 hover:-translate-y-0.5 cursor-pointer"
                        >
                            Logout
                        </a>
                    </div>
                </div>

                {/* bottom side */}
                <div className='flex justify-center'>
                    <ThemeSwitch withLabel={true} />
                </div>

            </div>

        </DialogPanel>
    </Dialog>
    </>
  );
}