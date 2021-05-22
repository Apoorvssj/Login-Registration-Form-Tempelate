// This file is the login page

import Lottie from "lottie-react-web";
import { toast } from "react-toastify";
import Link from "next/link";
import loginAnim from "../animations/login-animation.json";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/tokenAction";
import { useRouter } from "next/router";

let initialValues = {
  // nameValue: "",
  email: "",
  password: "",
};

const Login = () => {
  //state for lottie animation starting on every click
  const [onClick, setIsClicked] = useState(true);

  //to dispatch action
  const dispatch = useDispatch();

  const { push } = useRouter();

  //state
  const [values, setValue] = useState(initialValues);

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setValue({
      ...values,
      [name]: value, //here [] signifies to use name variable defined above => const { name, value } = e.target; naming convection dictates in a dictionary/object => {} its keys are defined as => []
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (values.email != "" && values.password != "" && values.password != "") {
      //fetch function
      //you have to set  NEXT_PUBLIC_BACKEND_API_PATH in your .env.local file (in root directory of your app) where your port should be same as that of backend api port
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_PATH}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.error) {
            toast.error(result.error);
          }
          dispatch(login(result?.token));
          push("/loggedin");
        })
        .catch((err) => console.log(err));
    } else {
      toast.warning("Please fill all feilds.");
    }
  };

  // trying full grid structure, just for fun
  return (
    <div
      style={{ background: `url("/abstract.png")`, objectFit: "cover" }}
      className="card-shadow h-screen w-screen grid place-items-center"
    >
      <div className="card z-10 shadow-xl rounded-lg h-4/5 w-4/5 overflow-hidden backdrop-filter backdrop-blur-lg grid grid-cols-1 md:grid-cols-3 xl:w-3/5 md:w-11/12 lg:w-4/5">
        <div className="hidden md:grid">
          <div
            className="w-full h-full bg-white bg-opacity-60 flex flex-row justify-center items-center "
            onClick={() => setIsClicked(!onClick)}
          >
            <Lottie
              direction={onClick ? 1 : -1}
              options={{
                animationData: loginAnim,
                autoplay: true,
                loop: false,
              }}
            />
          </div>
        </div>
        <div className="bg-gray-800 bg-opacity-20 col-span-1 grid grid-rows-6 justify-items-center items-center sm:items-start md:col-span-2">
          <div className="justify-self-end pr-4 self-start pt-4 ">
            <div className="bg-white bg-opacity-60 w-max rounded-lg p-1">
              <span className="text-black shadow-2xl">
                Don't have a account?
              </span>
              <Link href={`/register`}>
                <span className="text-blue-700 cursor-pointer font-semibold ">
                  {" "}
                  register
                </span>
              </Link>
            </div>
          </div>
          <div className=" w-5/6 h-full row-span-4 bg-black bg-opacity-70 rounded-xl grid content-around justify-items-center shadow-2xl sm:w-4/5">
            <h3 className=" text-xl text-white sm:text-2xl md:text-3xl">
              Login
            </h3>
            <form
              onSubmit={submitHandler}
              className=" grid content-around w-5/6 gap-y-8 sm:w-4/6"
            >
              <div className="flex  w-full justify-center">
                <div className="flex flex-col w-3/4 sm:w-full">
                  <label htmlFor="name" className="text-white">
                    Enter email
                  </label>
                  <input
                    name="email"
                    value={values.email}
                    onChange={handleInputChange}
                    type="text"
                    id="name"
                    className=" p-2 rounded-lg"
                  />
                </div>
              </div>
              <div className="flex  w-full justify-center">
                <div className="flex flex-col w-3/4 sm:w-full">
                  <label htmlFor="password" className="text-white">
                    Enter password
                  </label>
                  <input
                    name="password"
                    value={values.password}
                    onChange={handleInputChange}
                    type="text"
                    id="password"
                    className="p-2 rounded-lg"
                  />
                </div>
              </div>
              <button
                type="submit"
                className=" w-3/5 py-3 items-end justify-self-center text-white bg-blue-600 rounded-lg mt-2"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
