import { useState,useEffect } from "react";
import { useAuth } from "../../utils/AuthContext";
import Alert from "../Ui/Alert";
import SyncLoader from "react-spinners/SyncLoader";


const GATEAWAY = import.meta.env.VITE_API_GATEAWAY;
const UPDATE_USER = GATEAWAY + "/user/update";
const UPDATE_PASS = GATEAWAY + "/user/password";
const DELETE_USER = GATEAWAY + "/user/delete";



export default function Settings() {
    const authContext = useAuth();
    const [personalError, setPersonalError] = useState(null);
    const [passwordError, setPasswordlError] = useState(null);
    const [passLoading, setPassLoading] = useState(false);
    const [personalLoading, setPersonalLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);


    const [credentials, setCredentials] = useState({id:authContext.user.id, username: authContext.user.username, CIN: authContext.user.CIN, email: authContext.user.email ,number: authContext.user.number});
    const [passwords, setPasswords] = useState({id:authContext.user.id,password:'',new_password:'',new_password2:''});

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    const handlePassChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const personalSubmit = async (e) => {
        e.preventDefault();
        setPasswordlError(null);
        setPersonalError(null);
        setPersonalLoading(true)
        await personalUpdate(credentials);
        setPersonalLoading(false)
    };

    const passwordSubmit = async (e) => {
        e.preventDefault();
        setPersonalError(null);
        setPasswordlError(null);
        if(passwords.new_password !== passwords.new_password2){
            setPasswordlError({type:"error",message:"Passwords do not match !"});
            return;
        }
        setPassLoading(true);
        await passwordlUpdate(passwords);
        setPassLoading(false);
    };

    const deleteSubmit = async (e) => {
        e.preventDefault();
        setPasswordlError(null);
        setPersonalError(null);
        setDeleteLoading(true)
        await deleteUser(authContext.user.id);
        setDeleteLoading(false)
    };

    const personalUpdate = async(credentials) => {
        const jsonToSend = JSON.stringify(credentials); 
        console.log(jsonToSend);
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(UPDATE_USER, {
                method: 'PUT',
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                },
                body: jsonToSend,
            });

            const data = await response.json();
            if (response.ok) {
                setPersonalError({type:"success",message:data.message});
                authContext.logout();
            } else {
                setPersonalError({type:"error",message:data.detail});
                throw new Error(data.detail);
            }
        } catch (error) {
            console.error("Update failed:", error);
        }
    }

    const passwordlUpdate = async(credentials) => {
        const { new_password2, ...sendCredentials } = credentials;
        const jsonToSend = JSON.stringify(sendCredentials); 
        console.log(jsonToSend);
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(UPDATE_PASS, {
                method: 'PUT',
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                },
                body: jsonToSend,
            });

            const data = await response.json();
            if (response.ok) {
                setPasswordlError({type:"success",message:data.message});
            } else {
                setPasswordlError({type:"error",message:data.detail});
                throw new Error(data.detail);
            }
        } catch (error) {
            console.error("Update failed:", error);
        }
    }
    const deleteUser = async(id) => {
        const sendCredentials = {'id':id}
        const jsonToSend = JSON.stringify(sendCredentials); 
        console.log(jsonToSend);
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(DELETE_USER, {
                method: 'DELETE',
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                },
                body: jsonToSend,
            });

            const data = await response.json();
            if (response.ok) {
                setPasswordlError({type:"success",message:data.message});
                authContext.logout();
            } else {
                setPasswordlError({type:"error",message:data.detail});
                throw new Error(data.detail);
            }
        } catch (error) {
            console.error("Delete failed:", error);
        }
    }

    
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
                <form className="flex-1 flex flex-col gap-10" onSubmit={personalSubmit}>
                    <div className="flex flex-col gap-5 sm:flex-row">
                        <div className="flex-1">
                        <label htmlFor="username" className="block text-sm/6 font-medium text-neutral-900 dark:text-neutral-50">
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                            id="username"
                            name="username"
                            type="text"
                            onChange={handleChange}
                            value={credentials.username}
                            placeholder="HoussamZitan"
                            className="block w-full rounded-md bg-neutral-200 dark:bg-neutral-900/80 px-3 py-1.5 text-base text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-900/30 dark:placeholder:text-neutral-50/30  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                        </div>

                        <div className="flex-1">
                        <label htmlFor="CIN" className="block text-sm/6 font-medium text-neutral-900 dark:text-neutral-50">
                            CIN
                        </label>
                        <div className="mt-2">
                            <input
                            id="CIN"
                            name="CIN"
                            type="text"
                            onChange={handleChange}
                            value={credentials.CIN}
                            placeholder="Z15313516"
                            className="block w-full rounded-md bg-neutral-200 dark:bg-neutral-900/80 px-3 py-1.5 text-base text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-900/30 dark:placeholder:text-neutral-50/30  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <div className="flex-1">
                        <label htmlFor="email" className="block text-sm/6 font-medium text-neutral-900 dark:text-neutral-50">
                            Email adress
                        </label>
                        <div className="mt-2">
                            <input
                            id="email"
                            name="email"
                            type="email"
                            onChange={handleChange}
                            value={credentials.email}
                            placeholder="email@email.mail"
                            className="block w-full rounded-md bg-neutral-200 dark:bg-neutral-900/80 px-3 py-1.5 text-base text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-900/30 dark:placeholder:text-neutral-50/30  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <div className="flex-1">
                        <label htmlFor="number" className="block text-sm/6 font-medium text-neutral-900 dark:text-neutral-50">
                            Phone number
                        </label>
                        <div className="mt-2">
                            <input
                            id="number"
                            name="number"
                            type="text"
                            onChange={handleChange}
                            value={credentials.number}
                            placeholder="066654846"
                            className="block w-full rounded-md bg-neutral-200 dark:bg-neutral-900/80 px-3 py-1.5 text-base text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-900/30 dark:placeholder:text-neutral-50/30  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                        </div>
                    </div>
                    {personalError && <Alert variant={personalError.type} title={personalError.type} message={personalError.message} duration={3000} />}
                    {personalLoading && 
                        <div className="flex justify-center items-center">
                            <SyncLoader color="#4f39f6" size={10} />
                        </div>
                    } 
                    <div>
                    <button type="submit" className="rounded-md cursor-pointer bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-neutral-50 shadow-xs duration-200 hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Save 
                    </button>
                    </div>
                </form>
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
                <form onSubmit={passwordSubmit} className="flex-1 flex flex-col gap-10">
                    <div className="flex gap-2">
                        <div className="flex-1">
                        <label htmlFor="password" className="block text-sm/6 font-medium text-neutral-900 dark:text-neutral-50">
                        Current password
                        </label>
                        <div className="mt-2">
                            <input
                            id="password"
                            name="password"
                            type="password"
                            onChange={handlePassChange}
                            required
                            placeholder="********"
                            className="block w-full rounded-md bg-neutral-200 dark:bg-neutral-900/80 px-3 py-1.5 text-base text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-900/30 dark:placeholder:text-neutral-50/30  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex-1">
                        <label htmlFor="new_password" className="block text-sm/6 font-medium text-neutral-900 dark:text-neutral-50">
                        New password
                        </label>
                        <div className="mt-2">
                            <input
                            id="new_password"
                            name="new_password"
                            type="password"
                            onChange={handlePassChange}
                            required
                            placeholder="********"
                            className="block w-full rounded-md bg-neutral-200 dark:bg-neutral-900/80 px-3 py-1.5 text-base text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-900/30 dark:placeholder:text-neutral-50/30  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex-1">
                        <label htmlFor="new_password2" className="block text-sm/6 font-medium text-neutral-900 dark:text-neutral-50">
                        Confirm password
                        </label>
                        <div className="mt-2">
                            <input
                            id="new_password2"
                            name="new_password2"
                            type="password"
                            onChange={handlePassChange}
                            required
                            placeholder="********"
                            className="block w-full rounded-md bg-neutral-200 dark:bg-neutral-900/80 px-3 py-1.5 text-base text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-900/30 dark:placeholder:text-neutral-50/30  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                        </div>
                    </div>
                    {passwordError && <Alert variant={passwordError.type} title={passwordError.type} message={passwordError.message} duration={3000} />}
                    {passLoading && 
                        <div className="flex justify-center items-center">
                            <SyncLoader color="#4f39f6" size={10} />
                        </div>
                    }    
                    <div>
                    <button type="submit" className="rounded-md cursor-pointer bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-neutral-50 shadow-xs duration-200 hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Save 
                    </button>
                    </div>
                </form>
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
                    <button onClick={deleteSubmit} className="rounded-md cursor-pointer bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-neutral-50 shadow-xs duration-200 hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                        Yes , delete my account 
                    </button>
                    </div>
                    {deleteLoading && 
                        <div className="flex justify-center items-center">
                            <SyncLoader color="#4f39f6" size={10} />
                        </div>
                    } 
                </div>
            </div>
            
        </div>

        </>
    )
}