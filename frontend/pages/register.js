// This file is the registration page

import Lottie from "lottie-react-web";
import { toast } from "react-toastify";
import Link from "next/link";
import registerAnim from "../animations/registration-animation.json";
import { useState } from "react";
import Otp from "../src/components/Otp";

//NEW INPUT CHANGE HANDLER OPTIMIZED APPROACH BY NOT USING MULTIPLE STATES, BUT JUST ONE FOR ALL INPUTS, like this =
//state
// const [user, setUser] = useState({});
// const [name, setName] = useState("");
// const [email, setEmail] = useState("");
// const [password, setPassword] = useState("");

//becoz as soon as componenet renders , user will be logged out(as all values will again set to initial),thats why is is outside Register
export let initialValues = {
  username: "",
  email: "",
  password: "",
  otp: "",
};

const Register = () => {
  //state for lottie animation starting on every click
  const [onClick, setIsClicked] = useState(true);

  const [Openotp, setOpenotp] = useState(false);

  const [values, setValue] = useState(initialValues);

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setValue({
      ...values,
      [name]: value, //here [] signifies to use name variable defined above => const { name, value } = e.target; naming convection dictates in a dictionary/object => {} its keys are defined as => []
    });
  };

  const otpHandler = (e) => {
    e.preventDefault();
    if (values.email != "" && values.password != "" && values.password != "") {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_PATH}/otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email }),
      })
        .then((res) => res.json())
        .then((result) => {
          // console.log(result);
          if (!result.error) {
            setOpenotp(true);
          } else {
            toast.error(result.error);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.warning("Please fill all feilds.");
    }
  };

  // trying full flex structure, just for fun
  return (
    <div
      style={{ background: `url("/abstract.png")`, objectFit: "cover" }}
      className="card-shadow h-screen w-screen flex flex-row justify-center items-center"
    >
      {Openotp && (
        <Otp
          values={values}
          handleInputChange={handleInputChange}
          setOpenotp={setOpenotp}
          setValue={setValue}
        />
      )}
      <div className="card z-10 flex flex-row   w-4/5 h-4/5 shadow-xl rounded-lg overflow-hidden backdrop-filter backdrop-blur-lg xl:w-3/5 md:w-11/12 lg:w-4/5">
        <div className="hidden md:w-2/5 md:flex">
          <div
            className="w-full h-full bg-white bg-opacity-60 flex flex-row justify-center items-center "
            onClick={() => setIsClicked(!onClick)}
          >
            <Lottie
              direction={onClick ? 1 : -1}
              options={{
                animationData: registerAnim,
                autoplay: true,
                loop: false,
              }}
            />
          </div>
        </div>
        <div className="w-full  bg-gray-800 bg-opacity-20 flex flex-col items-center justify-around md:w-3/5">
          <div className=" flex justify-end w-full pr-4 ">
            <div className="bg-white bg-opacity-60 w-max rounded-lg p-1">
              <span className="text-black shadow-2xl">
                Already have an acount?
              </span>
              <Link href={`/login`}>
                <span className="text-blue-700 cursor-pointer font-semibold ">
                  {" "}
                  login
                </span>
              </Link>
            </div>
          </div>
          {
            //<div className="flex items-center w-full h-1/6"></div>
          }
          <div className="w-4/5 h-4/5 flex flex-col items-center justify-evenly bg-black bg-opacity-70 rounded-xl shadow-2xl">
            <h3 className=" text-xl  text-white sm:text-2xl md:text-3xl">
              Create an account
            </h3>
            <form
              onSubmit={otpHandler}
              className="flex flex-col justify-evenly h-4/6 w-4/6"
            >
              <div className="flex flex-col">
                <label htmlFor="name" className="text-white">
                  Enter name
                </label>
                <input
                  name="username"
                  value={values.username}
                  onChange={handleInputChange}
                  type="text"
                  id="name"
                  className="p-2 rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="text-white">
                  Enter email
                </label>
                <input
                  name="email"
                  value={values.email}
                  onChange={handleInputChange}
                  type="text"
                  id="email"
                  className="p-2 rounded-lg"
                />
              </div>
              <div className="flex flex-col">
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
              <div className="flex justify-center w-full">
                <button
                  type="submit"
                  className=" w-3/5 py-4 text-white bg-blue-600 rounded-lg"
                >
                  Generate Otp
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
