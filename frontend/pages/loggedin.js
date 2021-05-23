// This file will check if a person is logged in or not on the basis of jwt token, which is done by checkLogin.js in backend api (using loggedIn middleware)

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/tokenAction";
import teenWalking from "../animations/teen-walking.json";
import Lottie from "lottie-react-web";
import { motion } from "framer-motion";
import {
  cardAnimation,
  innerCardAnimation,
  hover,
  popUp,
  fade,
} from "../animations/animations";

const LoggedIn = () => {
  const selector = useSelector((state) => state.token);

  const [user, setUser] = useState({});

  useEffect(() => {
    if (selector) {
      //fetch function
      //you have to set  NEXT_PUBLIC_BACKEND_API_PATH in your .env.local file (in root directory of your app) where your port should be same as that of backend api port
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_PATH}/check`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: selector,
        },
      })
        .then((res) => res.json())
        .then((result) => setUser(result))
        .catch((err) => console.log(err));
    } else {
      setUser(null);
    }
  }, []);

  const dispatch = useDispatch();
  const { push } = useRouter();
  const onLogoutHandler = () => {
    dispatch(logout());
    push("/login");
  };

  return (
    <div
      style={{ background: `url("/abstract2.png") no-repeat` }}
      className="card-shadow h-screen w-screen flex flex-row justify-center items-center"
    >
      <motion.div
        className="card z-10 flex flex-row   w-4/5 h-4/5 shadow-xl rounded-lg overflow-hidden backdrop-filter backdrop-blur-lg xl:w-3/5 md:w-11/12 lg:w-4/5"
        variants={cardAnimation}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        <div className="hidden md:w-2/5 md:flex">
          <div className="w-full h-full bg-white bg-opacity-60 flex flex-row justify-center items-center ">
            <Lottie
              options={{
                animationData: teenWalking,
                autoplay: true,
                loop: true,
              }}
            />
          </div>
        </div>
        <div className="w-full  bg-gray-800 bg-opacity-20 flex flex-col items-center justify-around md:w-3/5">
          <motion.div
            className="w-4/5 h-4/5 flex flex-col items-center justify-evenly bg-black bg-opacity-70 rounded-xl shadow-2xl"
            variants={innerCardAnimation}
          >
            {user ? (
              <div className="flex flex-col w-full h-full justify-around items-center">
                <motion.div
                  className="bg-white bg-opacity-60 w-3/5 rounded-lg p-1"
                  variants={popUp}
                >
                  <span className="text-black shadow-2xl text-2xl">
                    YAY!!! ,{" "}
                    <span className="text-white font-semibold">
                      {user.username}
                    </span>{" "}
                    <br /> You are Logged in....
                  </span>
                </motion.div>

                <div className="flex justify-center w-full">
                  <motion.button
                    className=" w-3/5 py-4 text-white bg-blue-600 rounded-lg"
                    onClick={onLogoutHandler}
                    variants={fade}
                    whileHover={hover}
                    whileTap={{ scale: 1 }}
                  >
                    Logout
                  </motion.button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col w-full h-full justify-center items-center">
                <motion.div
                  className="bg-white bg-opacity-60 w-3/5 rounded-lg p-1"
                  variants={popUp}
                >
                  <span className="text-black shadow-2xl text-xl sm:text-2xl">
                    You should be Logged In...
                  </span>
                </motion.div>
                <Link href={"/login"}>
                  <motion.span
                    className="text-blue-700 text-xl font-semibold cursor-pointer"
                    variants={popUp}
                    whileHover={hover}
                  >
                    Go to Login!!
                  </motion.span>
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoggedIn;
