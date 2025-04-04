
export default function Settings() {
    return (
        <>
        <div className="flex flex-col bg-neutral-100 dark:bg-neutral-800 shadow-md rounded-lg divide-y gap-5 divide-neutral-300 dark:divide-neutral-700">
            {/* General section*/}
            <div className="flex flex-col gap-5 sm:flex-row p-10 pb-8">
                {/* left section*/}
                <div className="flex flex-col w-full sm:w-1/3">
                    <h1 className="text-base font-semibold tracking-tight text-balance text-neutral-900 dark:text-neutral-50 ">
                    Personal Information
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
                            First Name
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

                        <div className="flex-1">
                        <label htmlFor="name" className="block text-sm/6 font-medium text-neutral-900 dark:text-neutral-50">
                            Last Name
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

                    <div className="flex gap-2">
                        <div className="flex-1">
                        <label htmlFor="name" className="block text-sm/6 font-medium text-neutral-900 dark:text-neutral-50">
                            Email adress
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
                        Save 
                    </a>
                    </div>
                </div>
            </div>

            {/* password section*/}
            <div className="flex flex-col gap-5 sm:flex-row p-10 pb-8">
                {/* left section*/}
                <div className="flex flex-col w-full sm:w-1/3">
                    <h1 className="text-base font-semibold tracking-tight text-balance text-neutral-900 dark:text-neutral-50 ">
                    Change password
                    </h1>
                    <p className=" text-sm font-medium text-pretty text-neutral-400 dark:text-neutral-500">
                    Update your password associated with your account.
                    </p>
                </div>
                {/* Right section*/}
                <div className="flex-1 flex flex-col gap-10">
                    <div className="flex gap-2">
                        <div className="flex-1">
                        <label htmlFor="name" className="block text-sm/6 font-medium text-neutral-900 dark:text-neutral-50">
                        Current password
                        </label>
                        <div className="mt-2">
                            <input
                            id="name"
                            name="name"
                            type="password"
                            required
                            placeholder="********"
                            className="block w-full rounded-md bg-neutral-200 dark:bg-neutral-900/80 px-3 py-1.5 text-base text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-900/30 dark:placeholder:text-neutral-50/30  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex-1">
                        <label htmlFor="name" className="block text-sm/6 font-medium text-neutral-900 dark:text-neutral-50">
                        New password
                        </label>
                        <div className="mt-2">
                            <input
                            id="name"
                            name="name"
                            type="password"
                            required
                            placeholder="********"
                            className="block w-full rounded-md bg-neutral-200 dark:bg-neutral-900/80 px-3 py-1.5 text-base text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-900/30 dark:placeholder:text-neutral-50/30  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex-1">
                        <label htmlFor="name" className="block text-sm/6 font-medium text-neutral-900 dark:text-neutral-50">
                        Confirm password
                        </label>
                        <div className="mt-2">
                            <input
                            id="name"
                            name="name"
                            type="password"
                            required
                            placeholder="********"
                            className="block w-full rounded-md bg-neutral-200 dark:bg-neutral-900/80 px-3 py-1.5 text-base text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-900/30 dark:placeholder:text-neutral-50/30  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                        </div>
                    </div>
                    <div>
                    <a className="rounded-md cursor-pointer bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-neutral-50 shadow-xs duration-200 hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Save 
                    </a>
                    </div>
                </div>
            </div>

            {/* password section*/}
            <div className="flex flex-col gap-5 sm:flex-row p-10 pb-8">
                {/* left section*/}
                <div className="flex flex-col w-full sm:w-1/3">
                    <h1 className="text-base font-semibold tracking-tight text-balance text-neutral-900 dark:text-neutral-50 ">
                    Delete account
                    </h1>
                    <p className=" text-sm font-medium text-pretty text-neutral-400 dark:text-neutral-500">
                    No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this account will be deleted permanently.
                    </p>
                </div>
                {/* Right section*/}
                <div className="flex-1 flex flex-col gap-10">
                    <div>
                    <a className="rounded-md cursor-pointer bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-neutral-50 shadow-xs duration-200 hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                        Yes , delete my account 
                    </a>
                    </div>
                </div>
            </div>
            
        </div>

        </>
    )
}