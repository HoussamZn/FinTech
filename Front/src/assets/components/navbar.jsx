'use client'

import { useState,useEffect } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Login from './Login/Login'
import { PiPiggyBankFill } from "react-icons/pi";
import ThemeSwitch from './Ui/themeSwitch'
import profil from "../images/profil.png";
import ProfileCard from './Ui/ProfileCard';
import { useAuth } from '../utils/AuthContext'

//no login
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/#About' },
  { name: 'Contact', href: '/#Contact' },
]

//login
const navigationLeft = [
    { name: 'Dashboard', href: '/dash' },
    { name: 'Notification', href: '/dash' },
]


function Navbar({isNotHero, isOpen,setIsOpen,setSide ,inLogin , setInLogin}) {
    const { user,logout,setError } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isProfileCardVisible, setIsProfileCardVisible] = useState(false);  
    const [isScrolled, setIsScrolled] = useState(false);
    const navbarBgClass = (isNotHero || isScrolled) && (isNotHero ? 'bg-neutral-100 dark:bg-neutral-900 shadow-lg ':'bg-neutral-100/80 dark:bg-neutral-900/80 shadow-lg backdrop-blur-2xl');

    useEffect(() => {
        const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    
    const handleProfileClick = () => {
        setIsProfileCardVisible(!isProfileCardVisible);
      };

    function openFromMobile() {
        setInLogin(true);
        setMobileMenuOpen(false)
        setIsOpen(true)
    }

    function open() {
        setInLogin(true);
        setIsOpen(true);
    }

    function close() {
        setError(null);
        setIsOpen(false);
    }

    return (
        <>
        <header className={`fixed inset-x-0 top-0 z-20 transition-all duration-200 ${navbarBgClass}`}>
            {/* the bar */}
            <nav aria-label="Global" className="flex items-center justify-between p-4 lg:px-8">

            {/* logo */}
            <div className="flex lg:flex-1">
                <a href="/" className="-m-1.5 p-1.5">
                <PiPiggyBankFill  className='text-indigo-600 h-8 w-auto duration-600 hover:rotate-[-360deg] '/>
                </a>
            </div>

            {/* mobile sidebar button */}
            {isNotHero && (
                <div className="flex lg:hidden">
                <button
                type="button"
                onClick={() => setSide(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-neutral-900 dark:text-neutral-50 duration-200 hover:text-indigo-600 hover:-translate-y-0.5"
                >
                <Bars3Icon aria-hidden="true" className="size-6" />
                </button>
                </div>
            )}
            
            {/* mobile navbar button */}
            {!isNotHero && (<div className="flex lg:hidden">
                <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-neutral-900 dark:text-neutral-50 duration-200 hover:text-indigo-600 hover:-translate-y-0.5"
                >
                <Bars3Icon aria-hidden="true" className="size-6" />
                </button>
            </div>)}
            
            {/* navabr items left */}
            <div className="hidden lg:flex lg:gap-x-12">
                {!isNotHero && navigation.map((item) => (
                <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-neutral-900 dark:text-neutral-50 duration-200 hover:text-indigo-600 hover:-translate-y-0.5">
                    {item.name}
                </a>
                ))}
                {user && (!isNotHero && navigationLeft.map((item) => (
                <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-neutral-900 dark:text-neutral-50 duration-200 hover:text-indigo-600 hover:-translate-y-0.5">
                    {item.name}
                </a>
                )))}
            </div>

            {/* navabr items right */}
            <div className="hidden lg:flex lg:items-center lg:flex-1 lg:justify-end lg:gap-x-10">
                {/* switch button */}
                <ThemeSwitch withLabel={false} />

                {/* Profil button */}
                {user && <button onClick={handleProfileClick}>
                    <img
                    className="w-8 h-8 rounded-full cursor-pointer hover:shadow-lg hover:shadow-indigo-500 duration-400"
                    src={profil}
                    alt="Profile"
                    />
                </button>}

                {/* login button */}
                {user ? 
                (!isNotHero && <a onClick={logout} className="text-sm/6 font-semibold cursor-pointer text-neutral-900 dark:text-neutral-50 duration-200 hover:text-indigo-600 hover:-translate-y-0.5">
                Log out <span aria-hidden="true">&rarr;</span>
                </a> ):
                <a onClick={open} className="text-sm/6 font-semibold cursor-pointer text-neutral-900 dark:text-neutral-50 duration-200 hover:text-indigo-600 hover:-translate-y-0.5">
                Log in <span aria-hidden="true">&rarr;</span>
                </a>
                }
            </div>

            </nav>

            {/* login card */}
            <Dialog open={isOpen} as="div" className="relative z-50 focus:outline-none" onClose={close} __demoMode >
                <div className="fixed top-10 z-10 w-screen overflow-y-auto md:inset-0">
                    <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full max-w-md rounded-xl bg-neutral-100 dark:bg-neutral-900/50 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 shadow-md">
                        <Login inLogin={inLogin}/>
                    </DialogPanel>
                    </div>
                </div>
            </Dialog>

            {/* mobile navbar dialog */}
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className={`${isOpen ? "blur-md" : "lg:hidden"}`}>
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
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-neutral-900 dark:text-neutral-50 duration-200 hover:text-indigo-600 hover:-translate-y-0.5"
                        >
                            <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className='flex flex-1 mt-6 flex-wrap flex-col justify-between '>
                        {/* top side */}
                        <div className="-my-6 divide-y divide-neutral-900/30 dark:divide-neutral-50/30">
                            {/*no auth needed items */}
                            <div className="space-y-2 py-6">
                            {navigation.map((item) => (
                                <a
                                key={item.name}
                                href={item.href}
                                className="-mx-3 flex justify-center rounded-lg px-3 py-2 text-base/7 font-semibold duration-200 text-neutral-900 dark:text-neutral-50 hover:text-indigo-600 hover:-translate-y-0.5"
                                >
                                {item.name}
                                </a>
                            ))}
                            </div>
                            {/* auth needed items */}
                            {user && <div className="space-y-2 py-6">
                            {navigationLeft.map((item) => (
                                <a
                                key={item.name}
                                href={item.href}
                                className="-mx-3 flex justify-center rounded-lg px-3 py-2 text-base/7 font-semibold duration-200 text-neutral-900 dark:text-neutral-50 hover:text-indigo-600 hover:-translate-y-0.5"
                                >
                                {item.name}
                                </a>
                            ))}
                            </div>}

                            {/* Login button */}
                            <div className="py-6">
                                {user ? 
                                <a
                                    onClick={logout}
                                    className="-mx-3 flex justify-center rounded-lg text-base/7 font-semibold duration-200 text-neutral-900 dark:text-neutral-50 hover:text-indigo-600 hover:-translate-y-0.5 cursor-pointer"
                                >
                                    Log out
                                </a>:
                                <a
                                onClick={openFromMobile}
                                className="-mx-3 flex justify-center rounded-lg text-base/7 font-semibold duration-200 text-neutral-900 dark:text-neutral-50 hover:text-indigo-600 hover:-translate-y-0.5 cursor-pointer"
                                >
                                    Log in
                                </a>
                                }
                            </div>
                        </div>

                        {/* bottom side */}
                        <div className='flex justify-center'>
                            <ThemeSwitch withLabel={true} />
                        </div>

                    </div>

                </DialogPanel>
            </Dialog>
            
            {/* profil card */}
            {isProfileCardVisible && (
                <div className="absolute top-16 right-5 z-10">
                <ProfileCard/>
                </div>
            )}
        </header>
        </>
  )
}

export default Navbar