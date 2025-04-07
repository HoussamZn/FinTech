import { useState,useEffect } from "react";
import { useAuth } from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import Alert from "../Ui/Alert";
import SyncLoader from "react-spinners/SyncLoader";




export default function Login({inLogin}) {
  const [isSignUp, setIsSignUp] = useState(!inLogin);
  const [loading, setLoading] = useState(false);


  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const authContext = useAuth();
  
  const navigate = useNavigate();

  const handleChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true);
      const test = await authContext.login(credentials);
      setLoading(false);
      if(test){
        navigate("/dash"); 
      }
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    if(credentials.password !== credentials.password2){
      authContext.setError({type:"error",message:"Passwords do not match !"});
      return;
    }
    setLoading(true);
    const test = await authContext.register(credentials);
    setLoading(false);
    if(test){
      navigate("/dash"); 
    } 
  };

  return (
    <>
      {isSignUp ? 
      <form onSubmit={handleRegister}>
        <div className="flex min-h-full flex-1 flex-col justify-center pt-5 lg:px-2">
          {/* Title */}
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center text-2xl/9 font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            Create an account
            </h2>
          </div>

          {/* Content */}
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-4">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm/6 font-medium text-neutral-900 dark:text-neutral-50">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="HoussamZitan"
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md bg-neutral-200 dark:bg-neutral-900/80 px-3 py-1.5 text-base text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-900/30 dark:placeholder:text-neutral-50/30  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
              </div>
            </div>
            
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-neutral-900 dark:text-neutral-50">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="email@email.mail"
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md bg-neutral-200 dark:bg-neutral-900/80 px-3 py-1.5 text-base text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-900/30 dark:placeholder:text-neutral-50/30  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
              </div>
            </div>

            {/* CIN */}
            <div>
              <label htmlFor="CIN" className="block text-sm/6 font-medium text-neutral-900 dark:text-neutral-50">
                CIN
              </label>
              <div className="mt-2">
                <input
                  id="CIN"
                  type="text"
                  name="CIN"
                  placeholder="Z661188"
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md bg-neutral-200 dark:bg-neutral-900/80 px-3 py-1.5 text-base text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-900/30 dark:placeholder:text-neutral-50/30  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
              </div>
            </div>

            {/* password */}
            <div>
            <label htmlFor="password" className="block text-sm/6 font-medium text-neutral-900 dark:text-neutral-50">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="**************"
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md bg-neutral-200 dark:bg-neutral-900/80 px-3 py-1.5 text-base text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-900/30 dark:placeholder:text-neutral-50/30  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
              </div>
            </div>

            {/* password 2 */}
            <div>
            <label htmlFor="password2" className="block text-sm/6 font-medium text-neutral-900 dark:text-neutral-50">
              Confirm password
              </label>
              <div className="mt-2">
                <input
                  id="password2"
                  type="password"
                  name="password2"
                  placeholder="**************"
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md bg-neutral-200 dark:bg-neutral-900/80 px-3 py-1.5 text-base text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-900/30 dark:placeholder:text-neutral-50/30  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
              </div>
            </div>
            {authContext.error && <Alert variant={authContext.error.type} title={authContext.error.type} message={authContext.error.message} duration={3000} />}
            {loading && 
              <div className="flex justify-center items-center">
                  <SyncLoader color="#4f39f6" size={10} />
              </div>
            }
    
            {/* Submit button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-neutral-50 shadow-xs duration-200 hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>

            {/* already */}
            <p className="text-center text-sm/6 text-neutral-900 dark:text-neutral-50">
              Already have an account?
              <button 
                onClick={() => setIsSignUp(!isSignUp)} 
                className="font-semibold text-indigo-600 duration-200 hover:text-indigo-400 ml-1"
              >
                Sign In
              </button>
            </p>
          </div>
        </div> 
      </form>

      :
      
      <form onSubmit={handleLogin}>
        <div className="flex min-h-full flex-1 flex-col justify-center pt-5 lg:px-2">
          {/* Title */}
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center text-2xl/9 font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
              Sign in to your account
            </h2>
          </div>

          {/* Content */}
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-4">
            
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm/6 font-medium text-neutral-900 dark:text-neutral-50">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="HoussamZitan"
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md bg-neutral-200 dark:bg-neutral-900/80 px-3 py-1.5 text-base text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-900/30 dark:placeholder:text-neutral-50/30  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
              </div>
            </div>

            {/* password */}
            <div>
            <label htmlFor="password" className="block text-sm/6 font-medium text-neutral-900 dark:text-neutral-50">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="**************"
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md bg-neutral-200 dark:bg-neutral-900/80 px-3 py-1.5 text-base text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-900/30 dark:placeholder:text-neutral-50/30  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
              </div>
            </div>
            {authContext.error && <Alert variant="error" title="Error" message={authContext.error.message} duration={3000} />}
            {loading && 
              <div className="flex justify-center items-center">
                  <SyncLoader color="#4f39f6" size={10} />
              </div>
            }

            {/* Submit button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-neutral-50 shadow-xs duration-200 hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign In
              </button>
            </div>

            {/* already */}
            <p className="text-center text-sm/6 text-neutral-900 dark:text-neutral-50">
              Not a member?
              <button 
                onClick={() => setIsSignUp(!isSignUp)} 
                className="font-semibold text-indigo-600 duration-200 hover:text-indigo-400 ml-1"
                >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </form>
      }

    </>
  );
}
