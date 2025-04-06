import { useState } from "react";
import { useAuth } from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login({inLogin}) {
  const [isSignUp, setIsSignUp] = useState(!inLogin);

  const [credentials, setCredentials] = useState({ username: "", password: "" });
    const authContext = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await authContext.login(credentials);
        navigate("/dash"); // Redirect on successful login
    };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-5 lg:px-2">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl/9 font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          {isSignUp ? "Create an account" : "Sign in to your account"}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          {isSignUp && (
            <div>
              <label htmlFor="name" className="block text-sm/6 font-medium text-neutral-900 dark:text-neutral-50">
                Full Name
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
          )}
          
          <div>
          <label htmlFor="email" className="block text-sm/6 font-medium text-neutral-900 dark:text-neutral-50">
          Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                required
                placeholder="email@email.mail"
                className="block w-full rounded-md bg-neutral-200 dark:bg-neutral-900/80 px-3 py-1.5 text-base text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-900/30 dark:placeholder:text-neutral-50/30  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                name="username"
                onChange={handleChange}
                />
            </div>
          </div>

          <div>
          <label htmlFor="password" className="block text-sm/6 font-medium text-neutral-900 dark:text-neutral-50">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                required
                placeholder="**********"
                className="block w-full rounded-md bg-neutral-200 dark:bg-neutral-900/80 px-3 py-1.5 text-base text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-900/30 dark:placeholder:text-neutral-50/30  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                name="password"
                onChange={handleChange}
                />
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-neutral-50 shadow-xs duration-200 hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleSubmit}
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-neutral-900 dark:text-neutral-50">
          {isSignUp ? "Already have an account?" : "Not a member?"} 
          <button 
            onClick={() => setIsSignUp(!isSignUp)} 
            className="font-semibold text-indigo-600 duration-200 hover:text-indigo-400 ml-1"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
