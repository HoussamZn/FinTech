import React, { useState } from "react";
import { useAuth } from "../../utils/AuthContext";

export default function CreateBankAccount() {
  const authContext = useAuth();
  const user_id = authContext.user?.id; 
  const [formData, setFormData] = useState({
    accountNumber: "",
    name: "",
    bankName: "",
    currency: "",
  });
  
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
  
    const token = localStorage.getItem("token");
    if (!token || !user_id) {
      setError("You are not authenticated. Please log in.");
      return;
    }
  
    const dataToSend = { 
      account_number: formData.accountNumber, 
      name: formData.name, 
      bank_name: formData.bankName, 
      currency: formData.currency, 
      user_id 
    };
  
    // Log the data being sent to check its structure
    console.log("Sending data:", JSON.stringify(dataToSend));
  
    try {
      const response = await fetch("http://127.0.0.1:8000/account/acc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }
  
      setMessage("Account created successfully!");
  
      // Reset form data
      setFormData({
        accountNumber: "",
        name: "",
        bankName: "",
        currency: "",
      });
    } catch (err) {
      setError(err.message);
    }
  };
  

  return (
    <div className="flex flex-col  bg-neutral-100 dark:bg-neutral-800 shadow-md rounded-lg divide-y gap-5 divide-neutral-300 dark:divide-neutral-700">
      <div className="flex flex-col gap-5 sm:flex-row p-10 pb-8">
        {/* Left section */}
        <div className="flex flex-col w-full sm:w-1/3">
          <h1 className="text-base font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
            Create Bank Account
          </h1>
          <p className="text-sm font-medium text-neutral-400 dark:text-neutral-500">
            Fill in the form to add a new bank account to the system.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6">
          <div className="flex flex-row gap-5">
            <div className="flex-1">
              <label
                htmlFor="accountNumber"
                className="block text-sm font-medium text-neutral-900 dark:text-neutral-50"
              >
                Account Number
              </label>
              <input
                type="text"
                id="accountNumber"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                placeholder="123456789"
                className="mt-1 block w-full rounded-md bg-neutral-200 dark:bg-neutral-900/80 px-3 py-2 text-base text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                required
              />
            </div>

            {/* Name */}
            <div className="flex-1">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-neutral-900 dark:text-neutral-50"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="mt-1 block w-full rounded-md bg-neutral-200 dark:bg-neutral-900/80 px-3 py-2 text-base text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                required
              />
            </div>
          </div>

          {/* Bank Name */}
          <div>
            <label
              htmlFor="bankName"
              className="block text-sm font-medium text-neutral-900 dark:text-neutral-50"
            >
              Bank Name
            </label>
            <input
              type="text"
              id="bankName"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              placeholder="BMCE Bank"
              className="mt-1 block w-full rounded-md bg-neutral-200 dark:bg-neutral-900/80 px-3 py-2 text-base text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              required
            />
          </div>

          {/* Currency */}
          <div>
            <label
              htmlFor="currency"
              className="block text-sm font-medium text-neutral-900 dark:text-neutral-50"
            >
              Currency
            </label>
            <input
              type="text"
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              placeholder="MAD"
              className="mt-1 block w-full rounded-md bg-neutral-200 dark:bg-neutral-900/80 px-3 py-2 text-base text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              required
            />
          </div>

          {/* Submit button */}
          <div>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
            >
              Create Account
            </button>
          </div>

          {/* Feedback */}
          {message && <p className="text-green-600 font-semibold">{message}</p>}
          {error && <p className="text-red-500 font-medium">{error}</p>}
        </form>
      </div>
    </div>
  );
}
