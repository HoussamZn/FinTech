'use client'
import { Children, useState } from "react";
import Navbar from "../navbar"
import SideBar from "../sidebar";
import Footer from "../footer";
import { Outlet } from "react-router-dom";


export default function Dashboard({}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isNotHero, setIsNotHero] = useState(true);
  const [side, setSide] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-neutral-200 dark:bg-neutral-950">
      <div className="flex flex-1">
        <div className="lg:w-64 flex-shrink-0">
          <SideBar side={side} setSide={setSide} />
        </div>
        
        {/* Content area */}
        <div className={`relative isolate px-6 py-20 lg:px-10 flex-1 min-w-0`}>
          {/* navbar */}
          <Navbar isNotHero={isNotHero} isOpen={isOpen} setIsOpen={setIsOpen} setSide={setSide}/>
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
          {/* background shape 2 */}
          <div
              aria-hidden="true"
              className="absolute inset-x-0 top-[calc(50%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(50%-30rem)]"
            >
              <div
                style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
                className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              />
          </div>
          
          {/* Contents */}
          <Outlet/>
            
        </div>
      </div>
      {/* footer */}
      <Footer/>
    </div>
  )
}