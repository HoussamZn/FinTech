'use client'
import { useState } from "react";
import Navbar from "../navbar"
import Footer from "../footer";
import about from "../../images/about.jpg"

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);
  const [isNotHero, setIsNotHero] = useState(false);
  const [inLogin, setInLogin] = useState(false);

  function openLogin(){
    setInLogin(false);
    setIsOpen(true);
  }


  return (
    <>
    <div className={`bg-neutral-200 dark:bg-neutral-950 duration-1000`}>

      {/* Login Blur */}
      {isOpen && (
          <div className="fixed inset-0 z-30 backdrop-blur-md pointer-events-none"></div>
      )}

      {/* Navbar */}
      <Navbar isNotHero={isNotHero} isOpen={isOpen} setIsOpen={setIsOpen} inLogin={inLogin} setInLogin={setInLogin} />

      <div className={`relative isolate px-6 pt-14 pb-14 lg:px-8 transition-all duration-300`}>
      {/* background shape 1 */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>

        


        {/* hero */}
        <div className="mx-auto max-w-2xl py-32 sm:py-36 lg:py-44">
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-neutral-900 dark:text-neutral-50 sm:text-7xl">
              All Your Finances, One Secure Hub
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-neutral-700 dark:text-neutral-300 sm:text-xl/8">
            Manage all your bank accounts and blockchain transactions in one seamless platform. Stay in control, track every transaction, and simplify your financial life securely and effortlessly.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                onClick={openLogin}
                className="rounded-md cursor-pointer bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-neutral-50 shadow-xs duration-200 hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started 
              </a>
              <a href="#About" className="text-sm/6 font-semibold text-neutral-900 dark:text-neutral-50 duration-200 hover:text-indigo-600 hover:-translate-y-0.5">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* About */}
        <div id="About" className="flex flex-col justify-center items-center py-32 sm:py-36 lg:py-44 text-center  lg:flex-row">
          <div className="w-full flex items-center justify-center sm:w-2/3 lg:w-1/2  xl:w-1/3">
            <img src={about} alt="About section" className="max-w-full max-h-full object-contain rounded-lg" />
          </div>
          <div className="flex-1 text-center py-5 lg:ml-10">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-neutral-900 dark:text-neutral-50 lg:text-5xl">
            A Smarter Way to Manage Your Money
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-neutral-700 dark:text-neutral-300 lg:text-lg">
            Our platform brings together your multiple bank accounts and blockchain transactions into a single, intuitive interface. No more juggling between apps monitor balances, track payments, and stay informed with real-time insights. Built for security, convenience, and financial clarity, we empower you to take full control of your assets in one place.
            </p>

          </div>
        </div>


        {/* About 2*/}
        <div className="pb-24 sm:pb-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base/7 font-semibold text-indigo-600">Transfer faster</h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-neutral-900 dark:text-neutral-100 sm:text-5xl lg:text-balance">
                Everything you need to manage your bank accounts
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                {/* Feature 1 */}
                <div className="relative pl-16">
                  <dt className="text-base/7 font-semibold text-neutral-900 dark:text-neutral-100">
                    <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                      <svg 
                        className="size-6 text-white" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth="1.5" 
                        stroke="currentColor" 
                        aria-hidden="true" 
                        data-slot="icon"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          d="M12 16.5V9.75m0 0l3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" 
                        />
                      </svg>
                    </div>
                    Unified Financial Dashboard
                  </dt>
                  <dd className="mt-2 text-base/7 text-gray-600 dark:text-gray-400">
                    View and manage multiple bank accounts and blockchain wallets in one place.
                  </dd>
                </div>

                {/* Feature 2 */}
                <div className="relative pl-16">
                  <dt className="text-base/7 font-semibold text-neutral-900 dark:text-neutral-100">
                    <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                      <svg 
                        className="size-6 text-white" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth="1.5" 
                        stroke="currentColor" 
                        aria-hidden="true" 
                        data-slot="icon"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" 
                        />
                      </svg>
                    </div>
                    Seamless Transactions
                  </dt>
                  <dd className="mt-2 text-base/7 text-gray-600 dark:text-gray-400">
                    Easily transfer funds between accounts and track both traditional and crypto transactions.
                  </dd>
                </div>

                {/* Feature 3 */}
                <div className="relative pl-16">
                  <dt className="text-base/7 font-semibold text-neutral-900 dark:text-neutral-100">
                    <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                      <svg 
                        className="size-6 text-white" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth="1.5" 
                        stroke="currentColor" 
                        aria-hidden="true" 
                        data-slot="icon"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" 
                        />
                      </svg>
                    </div>
                    Real-Time Insights
                  </dt>
                  <dd className="mt-2 text-base/7 text-gray-600 dark:text-gray-400">
                    Get instant updates on your financial status with comprehensive analytics.
                  </dd>
                </div>

                {/* Feature 4 */}
                <div className="relative pl-16">
                  <dt className="text-base/7 font-semibold text-neutral-900 dark:text-neutral-100">
                    <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                      <svg 
                        className="size-6 text-white" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth="1.5" 
                        stroke="currentColor" 
                        aria-hidden="true" 
                        data-slot="icon"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33" 
                        />
                      </svg>
                    </div>
                    Advanced Security
                  </dt>
                  <dd className="mt-2 text-base/7 text-gray-600 dark:text-gray-400">
                    Protect your assets with encryption, multi-factor authentication, and blockchain security protocols.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>


        
        {/* background shape 2 */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(30%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(30%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>

        {/* background shape 3 */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(80%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(80%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(36rem)] sm:w-[72.1875rem]"
          />
        </div>
    
      </div>
      
      {/* Footer */}
      <Footer/>
    </div>
    </>
  )
}
